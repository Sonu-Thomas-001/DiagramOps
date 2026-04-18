import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Image as ImageIcon, History, Settings, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setActiveTab: (tab: 'text' | 'image' | 'history' | 'templates') => void;
  generateDiagram: () => void;
}

export function CommandPalette({ isOpen, setIsOpen, setActiveTab, generateDiagram }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  // Handle Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const actions = [
    { id: 'generate', icon: Sparkles, label: 'New Text Diagram', action: () => { setActiveTab('text'); setIsOpen(false); } },
    { id: 'redesign', icon: ImageIcon, label: 'Redesign Image', action: () => { setActiveTab('image'); setIsOpen(false); } },
    { id: 'history', icon: History, label: 'View History', action: () => { setActiveTab('history'); setIsOpen(false); } },
    { id: 'quick-gen', icon: Sparkles, label: 'Quick Generate Current', action: () => { generateDiagram(); setIsOpen(false); }, isPrimary: true },
  ];

  const filteredActions = query 
    ? actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : actions;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 pointer-events-auto"
          />

          {/* Palette */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-0 top-[15%] max-w-xl mx-auto z-50 pointer-events-auto"
          >
            <div className="bg-card rounded-xl shadow-2xl border border-border/60 overflow-hidden flex flex-col">
              
              <div className="flex items-center px-4 py-3 border-b border-border/40">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium"
                />
                <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                {filteredActions.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">No results found.</div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Actions</div>
                    {filteredActions.map((action, i) => (
                      <button
                        key={action.id}
                        onClick={action.action}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left group",
                          action.isPrimary 
                            ? "bg-primary/5 text-primary hover:bg-primary/10" 
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <action.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2 border-t border-border/40 bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
                <span>Use keyboard shortcuts for faster navigation</span>
                <span className="font-sans font-semibold">Ctrl + K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
