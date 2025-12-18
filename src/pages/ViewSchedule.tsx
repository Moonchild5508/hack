import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { getScheduleById } from '@/lib/storage';
import { getSymbolById } from '@/data/symbolLibrary';
import type { VisualSchedule } from '@/types';

export default function ViewSchedule() {
  const { id } = useParams<{ id: string }>();
  const [schedule, setSchedule] = useState<VisualSchedule | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (id) {
      const loadedSchedule = getScheduleById(id);
      if (loadedSchedule) {
        setSchedule(loadedSchedule);
      }
    }
  }, [id]);

  const handleNext = () => {
    if (schedule && currentStep < schedule.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToggleComplete = () => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(currentStep)) {
      newCompleted.delete(currentStep);
    } else {
      newCompleted.add(currentStep);
    }
    setCompletedSteps(newCompleted);
  };

  if (!schedule || schedule.steps.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Schedule not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const step = schedule.steps[currentStep];
  const symbol = getSymbolById(step.symbolId);
  const isCompleted = completedSteps.has(currentStep);
  const progress = ((completedSteps.size / schedule.steps.length) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl xl:text-4xl font-bold mb-2">{schedule.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Step {currentStep + 1} of {schedule.steps.length}
          </p>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completedSteps.size} of {schedule.steps.length} completed ({progress}%)
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 xl:p-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-muted mb-6 relative">
                {symbol && (
                  <>
                    <img
                      src={symbol.imageUrl}
                      alt={symbol.labels.english}
                      className="w-full h-full object-cover"
                    />
                    {isCompleted && (
                      <div className="absolute inset-0 bg-accent/80 flex items-center justify-center">
                        <div className="bg-background rounded-full p-4">
                          <Check className="w-16 h-16 text-accent" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl xl:text-4xl font-bold mb-3">
                  {symbol?.labels.english}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {symbol?.labels.hindi}
                </p>
                <p className="text-lg text-muted-foreground mt-1">
                  {symbol?.labels.regional}
                </p>
              </div>

              <Button
                size="lg"
                variant={isCompleted ? 'outline' : 'default'}
                onClick={handleToggleComplete}
                className="w-full max-w-xs mb-4"
              >
                {isCompleted ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            size="lg"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={currentStep === schedule.steps.length - 1}
            className="flex-1"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Created with Therapy Activity Authoring Studio
          </p>
        </div>
      </div>
    </div>
  );
}
