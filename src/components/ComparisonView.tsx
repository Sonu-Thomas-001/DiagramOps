import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Download, Wand2, Maximize2, Minimize2, Edit3, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export function ComparisonView({
  originalImage, redesignedImage, extractedData, setExtractedData, onGenerate, isGenerating
}: any) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleNodeChange = (index: number, val: string) => {
    const newData = { ...extractedData };
    newData.nodes[index].label = val;
    setExtractedData(newData);
  };

  const handleEdgeChange = (index: number, val: string) => {
    const newData = { ...extractedData };
    newData.edges[index].label = val;
    setExtractedData(newData);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col p-6 max-w-7xl mx-auto"
    >
      <div className="w-full bg-card rounded-xl border border-border shadow-sm min-h-[600px] flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <div className="h-12 border-b border-border bg-secondary flex items-center px-4 gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <div className="mx-auto text-[13px] font-medium text-muted-foreground mr-auto">
            Review & Refine Architecture
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 flex flex-col lg:flex-row gap-6 bg-background">
          <AnimatePresence mode="wait">
            {!redesignedImage ? (
              <motion.div className="flex-1 flex flex-col lg:flex-row gap-6 w-full">
                {/* Left: Original Image Preview */}
                <div className="w-full lg:w-1/2 flex flex-col gap-3 h-full max-h-[600px]">
                  <div className="w-full flex-1 bg-secondary rounded-lg border border-border flex flex-col relative overflow-hidden items-center justify-center p-4">
                    <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain blur-[2px] opacity-50" />
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                       <span className="bg-card border border-border px-4 py-2 rounded-md text-sm font-medium shadow-sm">
                         Analyzing Image Data...
                       </span>
                    </div>
                  </div>
                </div>
                
                {/* Right: Extracted Data Editor */}
                <div className="w-full lg:w-1/2 flex flex-col h-full max-h-[600px]">
                  <div className="w-full flex-1 bg-card rounded-lg border border-border flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-secondary">
                      <Edit3 className="w-4 h-4 text-foreground" />
                      <h3 className="text-[14px] font-medium text-foreground">Extracted Content</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-background">
                      {extractedData ? (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <h4 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">Nodes</h4>
                            {extractedData.nodes.map((node: any, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                                <input 
                                  type="text" 
                                  value={node.label} 
                                  onChange={(e) => handleNodeChange(i, e.target.value)}
                                  className="flex-1 bg-card border border-border hover:border-neutral-700 rounded-md px-3 py-1.5 text-[13px] focus:outline-none focus:border-neutral-500 transition-colors text-foreground"
                                />
                              </div>
                            ))}
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">Relationships</h4>
                            {extractedData.edges.map((edge: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 bg-secondary border border-border rounded-md p-2">
                                <div className="flex-1 text-[12px] text-muted-foreground truncate font-medium bg-card px-2 py-1 rounded" title={edge.from}>{edge.from}</div>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                <div className="flex-1 text-[12px] text-muted-foreground truncate font-medium bg-card px-2 py-1 rounded" title={edge.to}>{edge.to}</div>
                                <input 
                                  type="text" 
                                  value={edge.label || ''} 
                                  onChange={(e) => handleEdgeChange(i, e.target.value)}
                                  placeholder="Connection..."
                                  className="flex-1 bg-card border border-border hover:border-neutral-700 rounded-md px-2 py-1 text-[12px] focus:outline-none focus:border-neutral-500 transition-colors ml-2"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                           Extracting data...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="comparison"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex-1 flex flex-col border border-border rounded-lg overflow-hidden relative group/slider bg-secondary"
              >
                <div 
                  ref={containerRef}
                  className="relative w-full flex-1 touch-none select-none overflow-hidden cursor-ew-resize"
                  onPointerDown={() => setIsDragging(true)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={() => setIsDragging(false)}
                  onPointerLeave={() => setIsDragging(false)}
                >
                  <img src={originalImage} alt="Original" className="absolute inset-0 w-full h-full object-contain pointer-events-none p-4" />
                  
                  <div 
                    className="absolute inset-0 w-full h-full bg-secondary overflow-hidden" 
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img src={redesignedImage} alt="Redesigned Layer" className="absolute inset-0 w-full h-full object-contain pointer-events-none p-4" />
                  </div>
                  
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-foreground cursor-ew-resize z-20 transition-all hover:w-1 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center shadow-lg">
                      <div className="flex gap-1">
                        <div className="w-0.5 h-3 bg-muted-foreground rounded-full" />
                        <div className="w-0.5 h-3 bg-muted-foreground rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur text-foreground px-3 py-1 rounded text-[12px] font-medium border border-border pointer-events-none z-10 shadow-sm">
                    Original
                  </div>
                  <div className="absolute top-4 right-4 bg-foreground/90 backdrop-blur text-background px-3 py-1 rounded text-[12px] font-medium shadow-sm pointer-events-none z-10">
                    Redesigned
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
