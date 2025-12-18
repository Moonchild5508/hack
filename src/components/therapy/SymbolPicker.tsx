import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { symbolLibrary, getCategorizedSymbols, searchSymbols } from '@/data/symbolLibrary';
import type { Symbol, LanguageSettings } from '@/types';

interface SymbolPickerProps {
  onSelect: (symbol: Symbol) => void;
  languageSettings?: LanguageSettings;
}

export default function SymbolPicker({ onSelect, languageSettings }: SymbolPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const categorizedSymbols = getCategorizedSymbols();
  const filteredSymbols = searchQuery ? searchSymbols(searchQuery) : symbolLibrary;

  const getDisplayLabel = (symbol: Symbol): string => {
    if (!languageSettings) return symbol.labels.english;
    
    const labels: string[] = [];
    if (languageSettings.english) labels.push(symbol.labels.english);
    if (languageSettings.hindi) labels.push(symbol.labels.hindi);
    if (languageSettings.regional) labels.push(symbol.labels.regional);
    
    return labels.join(' / ') || symbol.labels.english;
  };

  const SymbolCard = ({ symbol }: { symbol: Symbol }) => (
    <button
      onClick={() => onSelect(symbol)}
      className="flex flex-col items-center p-3 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden mb-2 bg-muted">
        <img
          src={symbol.imageUrl}
          alt={symbol.labels.english}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs text-center font-medium line-clamp-2">
        {getDisplayLabel(symbol)}
      </span>
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {searchQuery ? (
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredSymbols.map((symbol) => (
              <SymbolCard key={symbol.id} symbol={symbol} />
            ))}
          </div>
          {filteredSymbols.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No symbols found
            </div>
          )}
        </ScrollArea>
      ) : (
        <Tabs defaultValue="food" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-4 xl:grid-cols-8 mb-4">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="festival">Festival</TabsTrigger>
            <TabsTrigger value="routine">Routine</TabsTrigger>
            <TabsTrigger value="emotion">Emotion</TabsTrigger>
            <TabsTrigger value="action">Action</TabsTrigger>
            <TabsTrigger value="place">Place</TabsTrigger>
            <TabsTrigger value="object">Object</TabsTrigger>
          </TabsList>

          {Object.entries(categorizedSymbols).map(([category, symbols]) => (
            <TabsContent key={category} value={category} className="flex-1">
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
                  {symbols.map((symbol) => (
                    <SymbolCard key={symbol.id} symbol={symbol} />
                  ))}
                </div>
                {symbols.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No symbols in this category
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
