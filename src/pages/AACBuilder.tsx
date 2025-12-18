import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Save, Volume2, Plus, Share2, Download } from 'lucide-react';
import { saveAACBoard, getAACBoardById } from '@/lib/storage';
import { getSymbolById } from '@/data/symbolLibrary';
import { speak } from '@/lib/tts';
import { useToast } from '@/hooks/use-toast';
import type { AACBoard, AACCell, Symbol } from '@/types';
import SymbolPicker from '@/components/therapy/SymbolPicker';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function AACBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [boardName, setBoardName] = useState('My AAC Board');
  const [gridSize, setGridSize] = useState<'2x2' | '3x3' | '4x4'>('3x3');
  const [cells, setCells] = useState<AACCell[]>([]);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);
  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);
  const [boardId] = useState(searchParams.get('id') || `aac-${Date.now()}`);

  useEffect(() => {
    const existingId = searchParams.get('id');
    if (existingId) {
      const board = getAACBoardById(existingId);
      if (board) {
        setBoardName(board.name);
        setGridSize(board.gridSize);
        setCells(board.cells);
      }
    } else {
      initializeCells(gridSize);
    }
  }, [searchParams]);

  const initializeCells = (size: '2x2' | '3x3' | '4x4') => {
    const gridSizes = { '2x2': 4, '3x3': 9, '4x4': 16 };
    const cellCount = gridSizes[size];
    const newCells: AACCell[] = Array.from({ length: cellCount }, (_, i) => ({
      id: `cell-${i}`,
      label: '',
      audioText: ''
    }));
    setCells(newCells);
  };

  const handleGridSizeChange = (size: '2x2' | '3x3' | '4x4') => {
    setGridSize(size);
    initializeCells(size);
  };

  const handleCellClick = (index: number) => {
    setSelectedCellIndex(index);
    setIsSymbolPickerOpen(true);
  };

  const handleSymbolSelect = (symbol: Symbol) => {
    if (selectedCellIndex === null) return;

    const newCells = [...cells];
    newCells[selectedCellIndex] = {
      ...newCells[selectedCellIndex],
      symbolId: symbol.id,
      label: symbol.labels.english,
      audioText: symbol.labels.english
    };
    setCells(newCells);
    setIsSymbolPickerOpen(false);
    setSelectedCellIndex(null);
  };

  const handleCellLabelChange = (index: number, label: string) => {
    const newCells = [...cells];
    newCells[index] = {
      ...newCells[index],
      label,
      audioText: label
    };
    setCells(newCells);
  };

  const handleCellSpeak = (cell: AACCell) => {
    if (cell.audioText) {
      speak(cell.audioText);
    }
  };

  const handleSave = () => {
    const board: AACBoard = {
      id: boardId,
      name: boardName,
      gridSize,
      cells,
      createdAt: searchParams.get('id') ? getAACBoardById(boardId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveAACBoard(board);
    toast({
      title: 'AAC Board Saved',
      description: 'Your AAC board has been saved successfully.'
    });
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('aac-board-preview');
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
    pdf.save(`${boardName}.pdf`);

    toast({
      title: 'PDF Exported',
      description: 'Your AAC board has been exported as PDF.'
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view/aac/${boardId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied',
      description: 'Share link copied to clipboard. You can share this via WhatsApp.'
    });
  };

  const getGridCols = () => {
    const cols = { '2x2': 'grid-cols-2', '3x3': 'grid-cols-3', '4x4': 'grid-cols-4' };
    return cols[gridSize];
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
            <h1 className="text-3xl xl:text-4xl font-bold mb-2">AAC Board Builder</h1>
            <p className="text-muted-foreground">
              Create communication boards with symbols and audio for AAC therapy
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Board Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="board-name">Board Name</Label>
                    <Input
                      id="board-name"
                      value={boardName}
                      onChange={(e) => setBoardName(e.target.value)}
                      placeholder="Enter board name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="grid-size">Grid Size</Label>
                    <Select value={gridSize} onValueChange={(value) => handleGridSizeChange(value as '2x2' | '3x3' | '4x4')}>
                      <SelectTrigger id="grid-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2x2">2×2 (4 cells)</SelectItem>
                        <SelectItem value="3x3">3×3 (9 cells)</SelectItem>
                        <SelectItem value="4x4">4×4 (16 cells)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      💡 Tip: Click on a cell to add a symbol, then click the speaker icon to hear it speak.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>AAC Board Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div id="aac-board-preview" className="bg-background p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">{boardName}</h2>
                    <div className={`grid ${getGridCols()} gap-4`}>
                      {cells.map((cell, index) => {
                        const symbol = cell.symbolId ? getSymbolById(cell.symbolId) : null;
                        return (
                          <div
                            key={cell.id}
                            className="aspect-square border-2 border-border rounded-xl overflow-hidden bg-card hover:border-primary transition-colors group"
                          >
                            {symbol ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={symbol.imageUrl}
                                  alt={cell.label}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-background/95 p-2">
                                  <Input
                                    value={cell.label}
                                    onChange={(e) => handleCellLabelChange(index, e.target.value)}
                                    className="text-center font-semibold text-sm h-8 mb-1"
                                    placeholder="Label"
                                  />
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="w-full"
                                    onClick={() => handleCellSpeak(cell)}
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleCellClick(index)}
                                className="w-full h-full flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                              >
                                <Plus className="w-8 h-8 mb-2" />
                                <span className="text-sm">Add Symbol</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
