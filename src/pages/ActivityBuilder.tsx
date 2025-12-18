import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Save, Plus, Trash2, Share2, Download } from 'lucide-react';
import { saveActivity, getActivityById } from '@/lib/storage';
import { getSymbolById } from '@/data/symbolLibrary';
import { useToast } from '@/hooks/use-toast';
import type { Activity, ActivityElement, Symbol } from '@/types';
import SymbolPicker from '@/components/therapy/SymbolPicker';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ActivityBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [activityName, setActivityName] = useState('My Activity');
  const [activityType, setActivityType] = useState<'matching' | 'sorting' | 'choice'>('matching');
  const [elements, setElements] = useState<ActivityElement[]>([]);
  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);
  const [activityId] = useState(searchParams.get('id') || `activity-${Date.now()}`);

  useEffect(() => {
    const existingId = searchParams.get('id');
    if (existingId) {
      const activity = getActivityById(existingId);
      if (activity) {
        setActivityName(activity.name);
        setActivityType(activity.type as 'matching' | 'sorting' | 'choice');
        setElements(activity.elements);
      }
    }
  }, [searchParams]);

  const handleAddElement = () => {
    setIsSymbolPickerOpen(true);
  };

  const handleSymbolSelect = (symbol: Symbol) => {
    const newElement: ActivityElement = {
      id: `element-${Date.now()}`,
      type: 'symbol',
      symbolId: symbol.id,
      position: { x: 0, y: elements.length * 120 }
    };
    setElements([...elements, newElement]);
    setIsSymbolPickerOpen(false);
  };

  const handleRemoveElement = (elementId: string) => {
    setElements(elements.filter(e => e.id !== elementId));
  };

  const handleSave = () => {
    if (elements.length === 0) {
      toast({
        title: 'Cannot Save',
        description: 'Please add at least one element to the activity.',
        variant: 'destructive'
      });
      return;
    }

    const activity: Activity = {
      id: activityId,
      name: activityName,
      type: activityType,
      elements,
      createdAt: searchParams.get('id') ? getActivityById(activityId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveActivity(activity);
    toast({
      title: 'Activity Saved',
      description: 'Your activity has been saved successfully.'
    });
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('activity-preview');
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
    pdf.save(`${activityName}.pdf`);

    toast({
      title: 'PDF Exported',
      description: 'Your activity has been exported as PDF.'
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view/activity/${activityId}`;
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
            <h1 className="text-3xl xl:text-4xl font-bold mb-2">Activity Builder</h1>
            <p className="text-muted-foreground">
              Create custom matching, sorting, and choice activities with drag-and-drop interface
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input
                      id="activity-name"
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                      placeholder="Enter activity name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-type">Activity Type</Label>
                    <Select value={activityType} onValueChange={(value) => setActivityType(value as 'matching' | 'sorting' | 'choice')}>
                      <SelectTrigger id="activity-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matching">Matching Activity</SelectItem>
                        <SelectItem value="sorting">Sorting Activity</SelectItem>
                        <SelectItem value="choice">Choice Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button onClick={handleAddElement} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Symbol
                    </Button>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      💡 Tip: Add symbols to create your activity. You can export as PDF or share a link with parents.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {elements.length > 0 && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Elements ({elements.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {elements.map((element) => {
                        const symbol = element.symbolId ? getSymbolById(element.symbolId) : null;
                        return (
                          <div
                            key={element.id}
                            className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                          >
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
                              {symbol?.labels.english}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleRemoveElement(element.id)}
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
                  <CardTitle>Activity Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div id="activity-preview" className="bg-background p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-2 text-center">{activityName}</h2>
                    <p className="text-center text-muted-foreground mb-6 capitalize">
                      {activityType} Activity
                    </p>
                    {elements.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <p className="mb-4">No elements added yet</p>
                        <Button onClick={handleAddElement}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Symbol
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                        {elements.map((element) => {
                          const symbol = element.symbolId ? getSymbolById(element.symbolId) : null;
                          return (
                            <div
                              key={element.id}
                              className="aspect-square rounded-xl border-2 border-border overflow-hidden bg-card hover:border-primary transition-colors"
                            >
                              {symbol && (
                                <div className="relative w-full h-full">
                                  <img
                                    src={symbol.imageUrl}
                                    alt={symbol.labels.english}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-background/95 p-3 text-center">
                                    <p className="font-semibold text-sm">{symbol.labels.english}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {symbol.labels.hindi}
                                    </p>
                                  </div>
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
            <DialogTitle>Select a Symbol</DialogTitle>
          </DialogHeader>
          <SymbolPicker onSelect={handleSymbolSelect} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
