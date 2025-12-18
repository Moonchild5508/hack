import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createActivity } from '@/db/api';
import SymbolPicker from '@/components/therapy/SymbolPicker';
import { getSymbolById } from '@/data/symbolLibrary';
import type { Symbol, MatchingQuestion, MatchingOption } from '@/types';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

export default function MatchingActivityBuilder() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activityName, setActivityName] = useState('');
  const [questions, setQuestions] = useState<MatchingQuestion[]>([]);
  const [showSymbolPicker, setShowSymbolPicker] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [pickingFor, setPickingFor] = useState<'left' | 'right'>('left');
  const [saving, setSaving] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion: MatchingQuestion = {
      id: `q-${Date.now()}`,
      leftSymbolId: '',
      rightOptions: [],
      correctOptionId: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handlePickSymbol = (questionIndex: number, type: 'left' | 'right') => {
    setCurrentQuestionIndex(questionIndex);
    setPickingFor(type);
    setShowSymbolPicker(true);
  };

  const handleSymbolSelected = (symbol: Symbol) => {
    if (currentQuestionIndex === null) return;

    const updatedQuestions = [...questions];
    const question = updatedQuestions[currentQuestionIndex];

    if (pickingFor === 'left') {
      question.leftSymbolId = symbol.id;
    } else {
      const newOption: MatchingOption = {
        id: `opt-${Date.now()}`,
        symbolId: symbol.id
      };
      question.rightOptions.push(newOption);
      
      // If this is the first option, make it the correct answer
      if (question.rightOptions.length === 1) {
        question.correctOptionId = newOption.id;
      }
    }

    setQuestions(updatedQuestions);
    setShowSymbolPicker(false);
    setCurrentQuestionIndex(null);
  };

  const handleRemoveOption = (questionIndex: number, optionId: string) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    question.rightOptions = question.rightOptions.filter(opt => opt.id !== optionId);
    
    // If we removed the correct answer, set a new one
    if (question.correctOptionId === optionId && question.rightOptions.length > 0) {
      question.correctOptionId = question.rightOptions[0].id;
    }
    
    setQuestions(updatedQuestions);
  };

  const handleSetCorrectAnswer = (questionIndex: number, optionId: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOptionId = optionId;
    setQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    if (!profile) return;

    if (!activityName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an activity name',
        variant: 'destructive'
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one question',
        variant: 'destructive'
      });
      return;
    }

    // Validate all questions
    for (const question of questions) {
      if (!question.leftSymbolId) {
        toast({
          title: 'Error',
          description: 'All questions must have a left symbol',
          variant: 'destructive'
        });
        return;
      }
      if (question.rightOptions.length < 2) {
        toast({
          title: 'Error',
          description: 'Each question must have at least 2 answer options',
          variant: 'destructive'
        });
        return;
      }
      if (!question.correctOptionId) {
        toast({
          title: 'Error',
          description: 'Each question must have a correct answer selected',
          variant: 'destructive'
        });
        return;
      }
    }

    setSaving(true);

    const activity = await createActivity({
      therapist_id: profile.id,
      name: activityName,
      type: 'matching',
      content: { questions }
    });

    setSaving(false);

    if (activity) {
      toast({
        title: 'Success',
        description: 'Matching activity created successfully'
      });
      navigate('/therapist-dashboard');
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create activity',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/therapist-dashboard')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Create Matching Activity</h1>
        <p className="text-muted-foreground">Create a matching activity with multiple choice questions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Activity Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Match Food Items"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {questions.map((question, qIndex) => {
          const leftSymbol = question.leftSymbolId ? getSymbolById(question.leftSymbolId) : null;

          return (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveQuestion(qIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Select a symbol to match and provide answer options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Symbol to Match *</Label>
                  {leftSymbol ? (
                    <div className="mt-2 p-4 border rounded-lg flex items-center gap-4">
                      <img
                        src={leftSymbol.imageUrl}
                        alt={leftSymbol.labels.english}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{leftSymbol.labels.english}</p>
                        <p className="text-sm text-muted-foreground">{leftSymbol.labels.hindi}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePickSymbol(qIndex, 'left')}
                        className="ml-auto"
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="mt-2 w-full"
                      onClick={() => handlePickSymbol(qIndex, 'left')}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Select Symbol
                    </Button>
                  )}
                </div>

                <div>
                  <Label>Answer Options * (at least 2 required)</Label>
                  <div className="mt-2 space-y-2">
                    {question.rightOptions.map((option) => {
                      const symbol = getSymbolById(option.symbolId);
                      if (!symbol) return null;

                      const isCorrect = question.correctOptionId === option.id;

                      return (
                        <div
                          key={option.id}
                          className={`p-3 border rounded-lg flex items-center gap-3 ${isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}`}
                        >
                          <img
                            src={symbol.imageUrl}
                            alt={symbol.labels.english}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{symbol.labels.english}</p>
                            <p className="text-sm text-muted-foreground">{symbol.labels.hindi}</p>
                          </div>
                          <div className="flex gap-2">
                            {!isCorrect && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetCorrectAnswer(qIndex, option.id)}
                              >
                                Set as Correct
                              </Button>
                            )}
                            {isCorrect && (
                              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                ✓ Correct Answer
                              </span>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveOption(qIndex, option.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handlePickSymbol(qIndex, 'right')}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddQuestion}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => navigate('/therapist-dashboard')}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Activity
            </>
          )}
        </Button>
      </div>

      {showSymbolPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>Select a Symbol</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => setShowSymbolPicker(false)}
              >
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <SymbolPicker onSelect={handleSymbolSelected} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
