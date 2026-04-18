import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Loader2, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '../lib/utils';

interface DiagramPreviewProps {
  loading: boolean;
  result: { image_url: string } | null;
  mode: 'text' | 'image';
  uploadedImage: string | null;
}

export function DiagramPreview({ loading, result, mode, uploadedImage }: DiagramPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) setScale(1);
  };

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };

  if (isFullscreen && result) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button onClick={() => handleZoom(-0.25)} className="p-2 bg-muted rounded-full hover:bg-muted/80 text-foreground transition-colors"><ZoomOut className="w-5 h-5" /></button>
          <span className="w-12 text-center text-sm font-medium">{Math.round(scale * 100)}%</span>
          <button onClick={() => handleZoom(0.25)} className="p-2 bg-muted rounded-full hover:bg-muted/80 text-foreground transition-colors"><ZoomIn className="w-5 h-5" /></button>
          <div className="w-px h-6 bg-border mx-2" />
          <button onClick={toggleFullscreen} className="p-2 bg-destructive/10 text-destructive rounded-full hover:bg-destructive/20 transition-colors">
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full h-full overflow-auto flex items-center justify-center p-8 custom-scrollbar"
        >
          <img 
            src={result.image_url} 
            alt="Fullscreen Diagram" 
            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
            className="max-w-none shadow-2xl rounded-2xl cursor-grab active:cursor-grabbing"
            draggable={false}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full flex-1 flex flex-col p-6 min-h-[500px] relative z-10"
    >
      <div className="w-full h-full flex-1 bg-[#0c0c11]/60 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden group/canvas">
        
        {/* Top Bar */}
        <div className="h-12 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center px-4 gap-4 sticky top-0 z-10 transition-colors">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-auto mr-auto absolute left-1/2 -translate-x-1/2">
            Preview Output
          </div>
          <div className="ml-auto opacity-0 group-hover/canvas:opacity-100 transition-opacity">
            {result && !loading && (
              <button onClick={toggleFullscreen} className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6 flex items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-3xl aspect-[16/9] glass rounded-2xl flex flex-col items-center justify-center relative overflow-hidden bg-card"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary/5 to-transparent z-0" />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="w-16 h-16 bg-background border-[3px] border-border border-t-primary rounded-full animate-spin shadow-sm"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-semibold tracking-tight text-lg mb-1">Synthesizing Architecture</p>
                    <p className="text-sm font-medium text-muted-foreground">Applying layout engines and design tokens...</p>
                  </div>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-5xl glass p-2 rounded-[24px] shadow-2xl border border-border/60 transition-transform duration-500 hover:scale-[1.01] cursor-zoom-in group"
                onClick={toggleFullscreen}
              >
                <div className="relative rounded-xl overflow-hidden bg-background">
                  <img 
                    src={result.image_url} 
                    alt="Generated Architecture" 
                    className="w-full h-auto"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-background/80 glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="w-4 h-4" /> Click to expand
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white/5 text-muted-foreground/50 rounded-[32px] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.02)] border border-white/5 relative overflow-hidden group">
                  <ImageIcon className="w-10 h-10 transition-transform group-hover:scale-110 duration-300" />
                </div>
                <h3 className="text-white font-bold tracking-tight text-xl mb-2 flex items-center gap-2">Ready to Render</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Provide your system specifications or upload an image to begin the generation process.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
