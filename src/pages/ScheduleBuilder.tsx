import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Share2, Download, ArrowRight } from 'lucide-react';
import { saveSchedule, getScheduleById } from '@/lib/storage';
import { getSymbolById } from '@/data/symbolLibrary';
import { useToast } from '@/hooks/use-toast';
import type { VisualSchedule, ScheduleStep, Symbol } from '@/types';
import SymbolPicker from '@/components/therapy/SymbolPicker';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ScheduleBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [scheduleName, setScheduleName] = useState('My Daily Schedule');
  const [steps, setSteps] = useState<ScheduleStep[]>([]);
  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);
  const [scheduleId] = useState(searchParams.get('id') || `schedule-${Date.now()}`);

  useEffect(() => {
    const existingId = searchParams.get('id');
    if (existingId) {
      const schedule = getScheduleById(existingId);
      if (schedule) {
        setScheduleName(schedule.name);
        setSteps(schedule.steps);
      }
    }
  }, [searchParams]);

  const handleAddStep = () => {
    setIsSymbolPickerOpen(true);
  };

  const handleSymbolSelect = (symbol: Symbol) => {
    const newStep: ScheduleStep = {
      id: `step-${Date.now()}`,
      symbolId: symbol.id,
      order: steps.length,
      completed: false
    };
    setSteps([...steps, newStep]);
    setIsSymbolPickerOpen(false);
  };

  const handleRemoveStep = (stepId: string) => {
    const newSteps = steps.filter(s => s.id !== stepId).map((s, index) => ({
      ...s,
      order: index
    }));
    setSteps(newSteps);
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    
    const reorderedSteps = newSteps.map((s, i) => ({ ...s, order: i }));
    setSteps(reorderedSteps);
  };

  const handleSave = () => {
    if (steps.length === 0) {
      toast({
        title: 'Cannot Save',
        description: 'Please add at least one step to the schedule.',
        variant: 'destructive'
      });
      return;
    }

    const schedule: VisualSchedule = {
      id: scheduleId,
      name: scheduleName,
      steps,
      createdAt: searchParams.get('id') ? getScheduleById(scheduleId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveSchedule(schedule);
    toast({
      title: 'Schedule Saved',
      description: 'Your visual schedule has been saved successfully.'
    });
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('schedule-preview');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`${scheduleName}.pdf`);

    toast({
      title: 'PDF Exported',
      description: 'Your schedule has been exported as PDF.'
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view/schedule/${scheduleId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied',
      description: 'Share link copied to clipboard. You can share this via WhatsApp.'
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl xl:text-4xl font-bold mb-2">Visual Schedule Creator</h1>
            <p className="text-muted-foreground">
              Build step-by-step routines and schedules for daily activities
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="schedule-name">Schedule Name</Label>
                    <Input
                      id="schedule-name"
                      value={scheduleName}
                      onChange={(e) => setScheduleName(e.target.value)}
                      placeholder="Enter schedule name"
                    />
                  </div>
                  <div>
                    <Button onClick={handleAddStep} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Step
                    </Button>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      💡 Tip: Add steps in order to create a daily routine. Parents can tap through each step on mobile.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {steps.length > 0 && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Steps ({steps.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {steps.map((step, index) => {
                        const symbol = getSymbolById(step.symbolId);
                        return (
                          <div
                            key={step.id}
                            className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                          >
                            <div className="flex flex-col gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => handleMoveStep(index, 'up')}
                                disabled={index === 0}
                              >
                                <GripVertical className="w-3 h-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => handleMoveStep(index, 'down')}
                                disabled={index === steps.length - 1}
                              >
                                <GripVertical className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                              {symbol && (
                                <img
                                  src={symbol.imageUrl}
                                  alt={symbol.labels.english}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <span className="text-sm flex-1 font-medium">
                              {index + 1}. {symbol?.labels.english}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleRemoveStep(step.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="xl:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div id="schedule-preview" className="bg-background p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">{scheduleName}</h2>
                    {steps.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <p className="mb-4">No steps added yet</p>
                        <Button onClick={handleAddStep}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Step
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {steps.map((step, index) => {
                          const symbol = getSymbolById(step.symbolId);
                          const isLast = index === steps.length - 1;
                          return (
                            <div key={step.id}>
                              <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-card">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                                  {index + 1}
                                </div>
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                  {symbol && (
                                    <img
                                      src={symbol.imageUrl}
                                      alt={symbol.labels.english}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-semibold">
                                    {symbol?.labels.english}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {symbol?.labels.hindi} • {symbol?.labels.regional}
                                  </p>
                                </div>
                              </div>
                              {!isLast && (
                                <div className="flex justify-center py-2">
                                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isSymbolPickerOpen} onOpenChange={setIsSymbolPickerOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Select a Symbol for This Step</DialogTitle>
          </DialogHeader>
          <SymbolPicker onSelect={handleSymbolSelect} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
