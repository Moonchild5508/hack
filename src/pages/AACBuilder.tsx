import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Save, Volume2, Plus, Share2, Download, Grid3x3 } from 'lucide-react';
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
  const [gridSize, setGridSize] = useState<'2x2' | '3x3' | '4x4' | 'custom'>('3x3');
  const [customRows, setCustomRows] = useState(3);
  const [customCols, setCustomCols] = useState(3);
  const [cells, setCells] = useState<AACCell[]>([]);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);
  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);
  const [showCustomGridDialog, setShowCustomGridDialog] = useState(false);
  const [boardId] = useState(searchParams.get('id') || `aac-${Date.now()}`);

  useEffect(() => {
    const existingId = searchParams.get('id');
    if (existingId) {
      const board = getAACBoardById(existingId);
      if (board) {
        setBoardName(board.name);
        setGridSize(board.gridSize);
        if (board.gridSize === 'custom' && board.customRows && board.customCols) {
          setCustomRows(board.customRows);
          setCustomCols(board.customCols);
        }
        setCells(board.cells);
      }
    } else {
      initializeCells(gridSize);
    }
  }, [searchParams]);

  const initializeCells = (size: '2x2' | '3x3' | '4x4' | 'custom', rows?: number, cols?: number) => {
    let cellCount: number;
    let gridRows: number;
    let gridCols: number;

    if (size === 'custom') {
      gridRows = rows || customRows;
      gridCols = cols || customCols;
      cellCount = gridRows * gridCols;
    } else {
      const gridSizes = { '2x2': 4, '3x3': 9, '4x4': 16 };
      cellCount = gridSizes[size];
      const sizeNum = parseInt(size.charAt(0));
      gridRows = sizeNum;
      gridCols = sizeNum;
    }

    const newCells: AACCell[] = Array.from({ length: cellCount }, (_, i) => ({
      id: `cell-${i}`,
      label: '',
      audioText: ''
    }));
    setCells(newCells);
    
    if (size === 'custom') {
      setCustomRows(gridRows);
      setCustomCols(gridCols);
    }
  };

  const handleGridSizeChange = (size: '2x2' | '3x3' | '4x4' | 'custom') => {
    if (size === 'custom') {
      setShowCustomGridDialog(true);
    } else {
      setGridSize(size);
      initializeCells(size);
    }
  };

  const handleCustomGridApply = () => {
    if (customRows < 1 || customRows > 10 || customCols < 1 || customCols > 10) {
      toast({
        title: 'Invalid Grid Size',
        description: 'Grid size must be between 1x1 and 10x10',
        variant: 'destructive'
      });
      return;
    }
    setGridSize('custom');
    initializeCells('custom', customRows, customCols);
    setShowCustomGridDialog(false);
    toast({
      title: 'Grid Size Updated',
      description: `Grid set to ${customRows}×${customCols}`
    });
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
      customRows: gridSize === 'custom' ? customRows : undefined,
      customCols: gridSize === 'custom' ? customCols : undefined,
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
    if (gridSize === 'custom') {
      return `grid-cols-${customCols}`;
    }
    const cols = { '2x2': 'grid-cols-2', '3x3': 'grid-cols-3', '4x4': 'grid-cols-4' };
    return cols[gridSize];
  };

  const getGridStyle = () => {
    if (gridSize === 'custom') {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${customCols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${customRows}, minmax(0, 1fr))`
      };
    }
    return {};
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
                    <Select value={gridSize} onValueChange={(value) => handleGridSizeChange(value as '2x2' | '3x3' | '4x4' | 'custom')}>
                      <SelectTrigger id="grid-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2x2">2×2 (4 cells)</SelectItem>
                        <SelectItem value="3x3">3×3 (9 cells)</SelectItem>
                        <SelectItem value="4x4">4×4 (16 cells)</SelectItem>
                        <SelectItem value="custom">
                          Custom Size {gridSize === 'custom' && `(${customRows}×${customCols})`}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {gridSize === 'custom' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Current: {customRows}×{customCols} ({customRows * customCols} cells)
                      </p>
                    )}
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
                    <div 
                      className={gridSize !== 'custom' ? `grid ${getGridCols()} gap-4` : 'gap-4'}
                      style={gridSize === 'custom' ? getGridStyle() : {}}
                    >
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

      <Dialog open={showCustomGridDialog} onOpenChange={setShowCustomGridDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Grid Size</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-rows">Number of Rows</Label>
              <Input
                id="custom-rows"
                type="number"
                min="1"
                max="10"
                value={customRows}
                onChange={(e) => setCustomRows(parseInt(e.target.value) || 1)}
                placeholder="Enter rows (1-10)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-cols">Number of Columns</Label>
              <Input
                id="custom-cols"
                type="number"
                min="1"
                max="10"
                value={customCols}
                onChange={(e) => setCustomCols(parseInt(e.target.value) || 1)}
                placeholder="Enter columns (1-10)"
              />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Preview: {customRows}×{customCols} grid with {customRows * customCols} cells
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCustomGridDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCustomGridApply}>
                <Grid3x3 className="w-4 h-4 mr-2" />
                Apply Grid
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
