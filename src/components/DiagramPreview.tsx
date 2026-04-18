import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Loader2, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';

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
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button onClick={() => handleZoom(-0.25)} className="p-2 bg-secondary rounded-md hover:bg-neutral-800 text-foreground transition-colors"><ZoomOut className="w-4 h-4" /></button>
          <span className="w-12 text-center text-[13px] font-medium">{Math.round(scale * 100)}%</span>
          <button onClick={() => handleZoom(0.25)} className="p-2 bg-secondary rounded-md hover:bg-neutral-800 text-foreground transition-colors"><ZoomIn className="w-4 h-4" /></button>
          <div className="w-px h-5 bg-border mx-2" />
          <button onClick={toggleFullscreen} className="p-2 bg-card border border-border text-foreground rounded-md hover:bg-neutral-800 transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="w-full h-full overflow-auto flex items-center justify-center p-8 custom-scrollbar"
        >
          <img 
            src={result.image_url} 
            alt="Fullscreen Diagram" 
            style={{ transform: `scale(${scale})`, transition: 'transform 0.1s ease-out' }}
            className="max-w-none shadow-2xl rounded-lg border border-border cursor-grab active:cursor-grabbing"
            draggable={false}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full flex-1 flex flex-col p-6 min-h-[500px] relative z-10 max-w-7xl mx-auto"
    >
      <div className="w-full h-full flex-1 bg-card rounded-xl border border-border shadow-sm flex flex-col relative overflow-hidden group/canvas">
        
        {/* Top Bar */}
        <div className="h-12 border-b border-border bg-secondary flex items-center px-4 gap-4 sticky top-0 z-10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <div className="mx-auto text-[13px] font-medium text-muted-foreground ml-auto mr-auto absolute left-1/2 -translate-x-1/2">
            Preview Output
          </div>
          <div className="ml-auto opacity-0 group-hover/canvas:opacity-100 transition-opacity">
            {result && !loading && (
              <button onClick={toggleFullscreen} className="p-1.5 hover:bg-neutral-800 text-muted-foreground hover:text-foreground rounded-md transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6 flex items-center justify-center bg-background relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-2xl aspect-[16/9] bg-secondary border border-border flex flex-col items-center justify-center relative overflow-hidden rounded-lg shadow-sm"
              >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-card to-transparent z-0" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                   <Loader2 className="w-6 h-6 text-foreground animate-spin" />
                  <div className="text-center">
                    <p className="text-foreground text-[14px] font-medium mb-0.5">Synthesizing Architecture</p>
                    <p className="text-[13px] text-muted-foreground">Applying layout engines and tokens...</p>
                  </div>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-full max-w-4xl bg-secondary p-1.5 rounded-lg border border-border transition-transform duration-300 hover:border-neutral-700 cursor-zoom-in group shadow-md"
                onClick={toggleFullscreen}
              >
                <div className="relative rounded overflow-hidden">
                  <img 
                    src={result.image_url} 
                    alt="Generated Architecture" 
                    className="w-full h-auto"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-foreground text-background px-3 py-1.5 rounded text-[13px] font-medium shadow-sm flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5" /> Expand
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm flex flex-col items-center relative z-10"
              >
                <div className="w-16 h-16 bg-secondary border border-border rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-foreground text-[14px] font-medium mb-1">Ready to Render</h3>
                <p className="text-muted-foreground text-[13px]">
                  Provide your system specifications or upload an image to begin.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
