import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { getAACBoardById } from '@/lib/storage';
import { getSymbolById } from '@/data/symbolLibrary';
import { speak } from '@/lib/tts';
import type { AACBoard, AACCell } from '@/types';

export default function ViewAAC() {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<AACBoard | null>(null);

  useEffect(() => {
    if (id) {
      const loadedBoard = getAACBoardById(id);
      if (loadedBoard) {
        setBoard(loadedBoard);
      }
    }
  }, [id]);

  const handleCellClick = (cell: AACCell) => {
    if (cell.audioText) {
      speak(cell.audioText);
    }
  };

  const getGridCols = () => {
    if (!board) return 'grid-cols-3';
    const cols = { '2x2': 'grid-cols-2', '3x3': 'grid-cols-3', '4x4': 'grid-cols-4' };
    return cols[board.gridSize];
  };

  if (!board) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">AAC Board not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl xl:text-4xl font-bold mb-2">{board.name}</h1>
          <p className="text-sm text-muted-foreground">
            Tap on any symbol to hear it speak
          </p>
        </div>

        <Card>
          <CardContent className="p-4 xl:p-8">
            <div className={`grid ${getGridCols()} gap-3 xl:gap-4`}>
              {board.cells.map((cell) => {
                const symbol = cell.symbolId ? getSymbolById(cell.symbolId) : null;
                return (
                  <button
                    key={cell.id}
                    onClick={() => handleCellClick(cell)}
                    className="aspect-square border-2 border-border rounded-xl overflow-hidden bg-card hover:border-primary hover:scale-105 transition-all active:scale-95"
                    disabled={!cell.symbolId}
                  >
                    {symbol ? (
                      <div className="relative w-full h-full">
                        <img
                          src={symbol.imageUrl}
                          alt={cell.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-background/95 p-2 xl:p-3">
                          <p className="font-bold text-sm xl:text-base text-center mb-1">
                            {cell.label}
                          </p>
                          <div className="flex justify-center">
                            <Volume2 className="w-5 h-5 xl:w-6 xl:h-6 text-primary" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <span className="text-xs">Empty</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Created with Therapy Activity Authoring Studio
          </p>
        </div>
      </div>
    </div>
  );
}
