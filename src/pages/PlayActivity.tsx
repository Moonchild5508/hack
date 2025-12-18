import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAssignmentsByChild, getActivity, createActivityResponse, updateAssignmentStatus } from '@/db/api';
import { getSymbolById } from '@/data/symbolLibrary';
import type { Assignment, DBActivity, MatchingQuestion } from '@/types';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PlayActivity() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [activity, setActivity] = useState<DBActivity | null>(null);
  const [questions, setQuestions] = useState<MatchingQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!profile || !assignmentId) return;
    loadActivity();
  }, [profile, assignmentId]);

  const loadActivity = async () => {
    if (!profile || !assignmentId) return;

    setLoading(true);
    const assignments = await getAssignmentsByChild(profile.id);
    const currentAssignment = assignments.find(a => a.id === assignmentId);

    if (!currentAssignment) {
      toast({
        title: 'Error',
        description: 'Assignment not found',
        variant: 'destructive'
      });
      navigate('/child-dashboard');
      return;
    }

    const activityData = await getActivity(currentAssignment.activity_id);
    if (!activityData) {
      toast({
        title: 'Error',
        description: 'Activity not found',
        variant: 'destructive'
      });
      navigate('/child-dashboard');
      return;
    }

    setAssignment(currentAssignment);
    setActivity(activityData);

    // Parse activity content to create questions
    if (activityData.type === 'matching' && activityData.content.questions) {
      setQuestions(activityData.content.questions);
    }

    // Update status to in_progress if not already
    if (currentAssignment.status === 'assigned') {
      await updateAssignmentStatus(currentAssignment.id, 'in_progress');
    }

    setLoading(false);
  };

  const handleAnswerSelect = (optionId: string) => {
    if (showResult) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !questions[currentQuestion]) return;

    const question = questions[currentQuestion];
    const correct = selectedAnswer === question.correctOptionId;

    setIsCorrect(correct);
    setShowResult(true);
    setAnswers({
      ...answers,
      [question.id]: selectedAnswer
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      handleFinishActivity();
    }
  };

  const handleFinishActivity = async () => {
    if (!assignment || !activity || !profile) return;

    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctOptionId) {
        correctCount++;
      }
    });

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // Save response
    await createActivityResponse({
      assignment_id: assignment.id,
      child_id: profile.id,
      activity_id: activity.id,
      answers,
      score: correctCount,
      total_questions: questions.length,
      time_spent_seconds: timeSpent
    });

    // Update assignment status
    await updateAssignmentStatus(assignment.id, 'completed');

    toast({
      title: 'Activity Completed!',
      description: `You got ${correctCount} out of ${questions.length} correct!`
    });

    navigate('/child-dashboard');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Skeleton className="h-8 w-64 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activity || !assignment || questions.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Activity not available</p>
            <Button className="mt-4" onClick={() => navigate('/child-dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const leftSymbol = getSymbolById(question.leftSymbolId);

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{activity.name}</h1>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match the symbol</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Symbol */}
          <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
            {leftSymbol && (
              <>
                <img
                  src={leftSymbol.imageUrl}
                  alt={leftSymbol.labels.english}
                  className="w-48 h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-2xl font-bold">{leftSymbol.labels.english}</p>
                <p className="text-lg text-muted-foreground">{leftSymbol.labels.hindi}</p>
              </>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {question.rightOptions.map((option) => {
              const symbol = getSymbolById(option.symbolId);
              if (!symbol) return null;

              const isSelected = selectedAnswer === option.id;
              const showCorrect = showResult && option.id === question.correctOptionId;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showResult}
                  className={`
                    relative p-6 border-2 rounded-lg transition-all
                    ${isSelected && !showResult ? 'border-primary bg-primary/10' : 'border-border'}
                    ${showCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}
                    ${showIncorrect ? 'border-red-500 bg-red-50 dark:bg-red-950' : ''}
                    ${!showResult ? 'hover:border-primary hover:bg-muted cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  <img
                    src={symbol.imageUrl}
                    alt={symbol.labels.english}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <p className="font-medium text-center">{symbol.labels.english}</p>
                  <p className="text-sm text-muted-foreground text-center">{symbol.labels.hindi}</p>

                  {showCorrect && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  )}
                  {showIncorrect && (
                    <div className="absolute top-2 right-2">
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                size="lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} size="lg">
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'Finish Activity'
                )}
              </Button>
            )}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className={`p-4 rounded-lg text-center ${isCorrect ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
              <p className={`text-lg font-bold ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground mt-1">
                  The correct answer is highlighted in green
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
