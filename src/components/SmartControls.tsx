import React from 'react';
import { motion } from 'motion/react';
import { Settings2, Layout, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export type SmartControlsState = {
  style: string;
  layout: string;
  improveSpacing: boolean;
  addGrouping: boolean;
};

type SmartControlsProps = {
  controls: SmartControlsState;
  setControls: React.Dispatch<React.SetStateAction<SmartControlsState>>;
  isMobilePane?: boolean;
};

export function SmartControls({ controls, setControls, isMobilePane = false }: SmartControlsProps) {
  const styles = [
    { id: 'minimal', label: 'Minimalist' },
    { id: 'aws', label: 'Cloud / AWS' },
    { id: 'dark', label: 'Dark Mode Tech' }
  ];

  const layouts = [
    { id: 'vertical', label: 'Vertical' },
    { id: 'horizontal', label: 'Horizontal' },
  ];

  return (
    <div className={cn(
      "flex flex-col gap-6 p-5 h-full overflow-y-auto w-full",
      !isMobilePane && "glass-panel w-72 hidden lg:flex z-10"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Settings2 className="w-5 h-5 text-muted-foreground" />
        <h3 className="font-semibold text-lg tracking-tight">Smart Controls</h3>
      </div>

      {/* Style Selector */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <ImageIcon className="w-4 h-4" />
          Visual Style
        </div>
        <div className="grid grid-cols-1 gap-2">
          {styles.map(s => (
            <button
              key={s.id}
              onClick={() => setControls(prev => ({ ...prev, style: s.id }))}
              className={cn(
                "px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border text-left",
                controls.style === s.id 
                  ? "border-primary bg-primary text-primary-foreground shadow-sm" 
                  : "border-border/50 hover:border-primary/50 bg-card hover:bg-muted"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/40 w-full my-1" />

      {/* Layout Options */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Layout className="w-4 h-4" />
          Layout
        </div>
        <div className="grid grid-cols-2 gap-2">
          {layouts.map(l => (
            <button
              key={l.id}
              onClick={() => setControls(prev => ({ ...prev, layout: l.id }))}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border text-center",
                controls.layout === l.id 
                 ? "border-primary bg-primary text-primary-foreground shadow-sm" 
                 : "border-border/50 hover:border-primary/50 bg-card hover:bg-muted"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/40 w-full my-1" />

      {/* Toggles */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
          <SlidersHorizontal className="w-4 h-4" />
          Optimizations (Prompt Modifiers)
        </div>
        
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium group-hover:text-primary transition-colors">Improve Spacing</span>
          <div className={cn(
            "w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5",
            controls.improveSpacing ? "bg-blue-500" : "bg-muted-foreground/30"
          )}>
            <motion.div 
              layout
              className="w-4 h-4 bg-white rounded-full shadow-sm"
              animate={{ x: controls.improveSpacing ? 16 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={controls.improveSpacing}
            onChange={(e) => setControls(prev => ({ ...prev, improveSpacing: e.target.checked }))}
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium group-hover:text-primary transition-colors">Auto-Group Nodes</span>
          <div className={cn(
            "w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5",
            controls.addGrouping ? "bg-blue-500" : "bg-muted-foreground/30"
          )}>
            <motion.div 
              layout
              className="w-4 h-4 bg-white rounded-full shadow-sm"
              animate={{ x: controls.addGrouping ? 16 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={controls.addGrouping}
            onChange={(e) => setControls(prev => ({ ...prev, addGrouping: e.target.checked }))}
          />
        </label>
      </div>

    </div>
  );
}
