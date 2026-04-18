import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
<<<<<<< HEAD
import { Image as ImageIcon, Loader2, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
=======
import { Image as ImageIcon, Loader2 } from 'lucide-react';
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512

interface DiagramPreviewProps {
  loading: boolean;
  result: { image_url: string } | null;
  mode: 'text' | 'image';
  uploadedImage: string | null;
}

export function DiagramPreview({ loading, result, mode, uploadedImage }: DiagramPreviewProps) {
<<<<<<< HEAD
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

=======
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
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
=======
      transition={{ delay: 0.2 }}
      className="max-w-6xl mx-auto px-4 pb-12 w-full"
    >
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden min-h-[500px] flex flex-col relative group">
        
        {/* Top Bar (Mac style) */}
        <div className="h-12 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm flex items-center px-4 gap-2 sticky top-0 z-10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
          </div>
          <div className="mx-auto text-xs font-medium text-slate-400">Preview</div>
        </div>

        {/* Canvas Area */}
<<<<<<< HEAD
        <div className="flex-1 p-6 flex items-center justify-center bg-background relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

=======
        <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] relative overflow-hidden">
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
<<<<<<< HEAD
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
=======
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-6 text-slate-400"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="w-20 h-20 bg-white border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin relative z-10 shadow-sm"></div>
                </div>
                <div className="text-center">
                  <p className="text-slate-900 font-semibold text-lg mb-1">Rendering Diagram</p>
                  <p className="text-sm font-medium">Processing image generation...</p>
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
<<<<<<< HEAD
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
=======
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full max-w-4xl bg-white p-2 rounded-2xl shadow-2xl border border-slate-200/60 transition-transform duration-500 hover:scale-[1.02] cursor-zoom-in"
              >
                <img 
                  src={result.image_url} 
                  alt="Generated Architecture" 
                  className="w-full h-auto rounded-xl"
                />
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm flex flex-col items-center relative z-10"
              >
<<<<<<< HEAD
                <div className="w-16 h-16 bg-secondary border border-border rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-foreground text-[14px] font-medium mb-1">Ready to Render</h3>
                <p className="text-muted-foreground text-[13px]">
                  Provide your system specifications or upload an image to begin.
=======
                <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-slate-100">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <h3 className="text-slate-900 font-semibold text-xl mb-2">No Diagram Yet</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Enter your system requirements or upload an image above to generate a professional architecture diagram.
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
