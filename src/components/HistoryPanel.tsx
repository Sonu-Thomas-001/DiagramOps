import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, LayoutTemplate, Clock, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

export type HistoryItem = {
  id: string;
  type: 'text' | 'image';
  prompt?: string;
  originalImage?: string;
  resultImage: string;
  timestamp: number;
};

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onSelect, onClear }: HistoryPanelProps) {
  return (
    <div className="w-full h-full flex flex-col p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
            <History className="w-8 h-8 text-primary" />
            Generation History
          </h2>
          <p className="text-muted-foreground text-sm">Your previously generated architecture diagrams are saved locally.</p>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 font-medium px-4 py-2 bg-destructive/10 hover:bg-destructive/20 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-card/50 rounded-3xl border border-border/50 border-dashed">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No history yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center">
            As you generate or redesign diagrams, they will automatically appear here for quick access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(item)}
                className="group cursor-pointer bg-card rounded-2xl border border-border/60 hover:border-primary/50 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-video w-full relative bg-muted/20 flex items-center justify-center p-4 overflow-hidden">
                  <img 
                    src={item.resultImage} 
                    alt="History" 
                    className="w-full h-full object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors" />
                </div>
                <div className="p-4 bg-card border-t border-border/40">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {item.type}
                    </span>
                    <span className="text-xs text-muted-foreground/60 font-medium">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {item.type === 'text' ? item.prompt : 'Image Redesign'}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
