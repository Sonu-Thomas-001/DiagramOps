import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Loader2, Wand2, Edit3, ArrowRight, RefreshCcw, GripVertical } from 'lucide-react';
import { cn } from '../lib/utils';

interface ComparisonViewProps {
  originalImage: string;
  redesignedImage: string | null;
  extractedData?: any;
  setExtractedData?: (data: any) => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

export function ComparisonView({ 
  originalImage, 
  redesignedImage, 
  extractedData, 
  setExtractedData, 
  onGenerate, 
  isGenerating 
}: ComparisonViewProps) {
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleNodeChange = (index: number, value: string) => {
    if (!setExtractedData || !extractedData) return;
    const newNodes = [...extractedData.nodes];
    newNodes[index] = { ...newNodes[index], label: value };
    setExtractedData({ ...extractedData, nodes: newNodes });
  };

  const handleEdgeChange = (index: number, value: string) => {
    if (!setExtractedData || !extractedData) return;
    const newEdges = [...extractedData.edges];
    newEdges[index] = { ...newEdges[index], label: value };
    setExtractedData({ ...extractedData, edges: newEdges });
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    let clientX = 0;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as React.MouseEvent).clientX;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full flex-1 flex flex-col p-6 relative z-10"
    >
      <div className="w-full bg-[#0c0c11]/60 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[600px] flex flex-col relative overflow-hidden group/canvas">
        
        {/* Top Bar */}
        <div className="h-12 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center px-4 gap-4 sticky top-0 z-20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-10">
            {redesignedImage ? 'Interactive Comparison' : 'Review Extraction'}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] relative overflow-hidden">
          
          <motion.div 
            key="comparison-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center"
          >
            {/* If we have a redesigned image, show Slider, else show split screen for editing */}
            {redesignedImage ? (
              <div className="w-full flex flex-col items-center gap-6">
                
                {/* 
                  Slider Component 
                */}
                <div 
                  ref={sliderRef}
                  className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-border/50 shadow-2xl glass cursor-ew-resize select-none"
                  onMouseMove={handleMove}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onTouchMove={handleMove}
                  onTouchEnd={() => setIsDragging(false)}
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  {/* Underneath: Original Image */}
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="absolute inset-0 w-full h-full object-contain bg-background" 
                    draggable={false}
                  />

                  {/* Top Layer: Redesigned Image */}
                  <div 
                    className="absolute inset-0 overflow-hidden bg-background"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img 
                      src={redesignedImage} 
                      alt="Redesigned" 
                      className="absolute inset-0 w-full h-full object-contain" 
                      draggable={false}
                    />
                  </div>

                  {/* Slider Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10 hidden md:block"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white text-slate-800 rounded-full shadow-lg flex items-center justify-center">
                      <GripVertical className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Mobile slider indicator (always show center handle if not dragging) */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow z-20">Original</div>
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow text-primary z-20">Redesigned</div>
                </div>

                <button
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-full shadow hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                >
                  <RefreshCcw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
                  {isGenerating ? 'Enhancing...' : 'Enhance Again'}
                </button>

              </div>
            ) : extractedData ? (
              <>
                {/* Left: Original Image */}
                <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
                  <div className="inline-flex px-3 py-1 bg-muted/30 border border-border/50 text-muted-foreground text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                    Original
                  </div>
                  <div className="w-full aspect-[4/3] bg-background/50 rounded-xl border border-border/40 shadow flex items-center justify-center p-2 mt-2">
                    <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain rounded-lg opacity-80 mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                </div>
                
                {/* Right: Extracted Data Editor */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full max-h-[600px] relative z-10">
                  <div className="w-full flex-1 bg-[#13131a]/80 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/5 p-6 flex flex-col relative overflow-hidden">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5 relative z-10">
                      <Edit3 className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold tracking-tight">Review & Edit Content</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                      {/* Nodes */}
                      {extractedData.nodes && extractedData.nodes.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-mono font-bold text-muted-foreground">{extractedData.nodes.length}</span>
                            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Components</h4>
                          </div>
                          <div className="space-y-2">
                            {extractedData.nodes.map((node: any, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                <input 
                                  type="text" 
                                  value={node.label} 
                                  onChange={(e) => handleNodeChange(i, e.target.value)}
                                  className="flex-1 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Edges */}
                      {extractedData.edges && extractedData.edges.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3 mt-4">
                            <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-mono font-bold text-muted-foreground">{extractedData.edges.length}</span>
                            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Connections</h4>
                          </div>
                          <div className="space-y-2">
                            {extractedData.edges.map((edge: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-2.5 hover:bg-black/40 transition-colors">
                                <div className="flex-1 text-xs text-muted-foreground truncate font-medium bg-white/5 px-2 py-1.5 rounded-lg" title={edge.from}>{edge.from}</div>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                                <div className="flex-1 text-xs text-muted-foreground truncate font-medium bg-white/5 px-2 py-1.5 rounded-lg" title={edge.to}>{edge.to}</div>
                                <input 
                                  type="text" 
                                  value={edge.label || ''} 
                                  onChange={(e) => handleEdgeChange(i, e.target.value)}
                                  placeholder="Connects via..."
                                  className="flex-1 bg-black/40 border border-white/5 hover:border-white/10 rounded-lg flex-1 px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium ml-2"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-4 border-t border-border/40">
                      <button
                        onClick={onGenerate}
                        disabled={isGenerating}
                        className="group w-full relative flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background font-semibold rounded-xl shadow hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-animated-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-2">
                          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                          {isGenerating ? 'Generating Redesign...' : 'Generate Architecture Diagram'}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
