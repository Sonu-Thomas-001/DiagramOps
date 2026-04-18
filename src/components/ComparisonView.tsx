<<<<<<< HEAD
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
=======
import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Wand2, Edit3, ArrowRight } from 'lucide-react';

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
  
  const handleNodeChange = (index: number, value: string) => {
    if (!setExtractedData || !extractedData) return;
    const newNodes = [...extractedData.nodes];
    newNodes[index] = { ...newNodes[index], label: value };
    setExtractedData({ ...extractedData, nodes: newNodes });
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
  };

  const handleNodeChange = (index: number, val: string) => {
    const newData = { ...extractedData };
    newData.nodes[index].label = val;
    setExtractedData(newData);
  };

<<<<<<< HEAD
  const handleEdgeChange = (index: number, val: string) => {
    const newData = { ...extractedData };
    newData.edges[index].label = val;
    setExtractedData(newData);
  };

=======
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
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
          </div>
          <div className="mx-auto text-xs font-medium text-slate-400">
            {redesignedImage ? 'Comparison View' : 'Review Extracted Data'}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] relative overflow-hidden">
          <motion.div 
            key="side-by-side"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center"
          >
            {/* Left: Original Image */}
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-3 sticky top-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Original</span>
              <img src={originalImage} alt="Original" className="w-full h-auto rounded-2xl border border-slate-200 shadow-sm opacity-80" />
            </div>
            
            {/* Right: Redesigned Image OR Extracted Data Editor */}
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-3">
              {redesignedImage ? (
                <>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Redesigned</span>
                  <div className="w-full bg-white p-2 rounded-2xl shadow-2xl border border-blue-200/60 transition-transform duration-500 hover:scale-[1.02] cursor-zoom-in">
                    <img src={redesignedImage} alt="Redesigned" className="w-full h-auto rounded-xl" />
                  </div>
                </>
              ) : extractedData ? (
                <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 flex flex-col h-full max-h-[600px]">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                    <Edit3 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-slate-800">Review & Edit Content</h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                    {/* Nodes */}
                    {extractedData.nodes && extractedData.nodes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Components</h4>
                        <div className="space-y-2">
                          {extractedData.nodes.map((node: any, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                              <input 
                                type="text" 
                                value={node.label} 
                                onChange={(e) => handleNodeChange(i, e.target.value)}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Edges */}
                    {extractedData.edges && extractedData.edges.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Connections</h4>
                        <div className="space-y-2">
                          {extractedData.edges.map((edge: any, i: number) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2">
                              <div className="flex-1 text-xs text-slate-500 truncate" title={edge.from}>{edge.from}</div>
                              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                              <div className="flex-1 text-xs text-slate-500 truncate" title={edge.to}>{edge.to}</div>
                              <input 
                                type="text" 
                                value={edge.label || ''} 
                                onChange={(e) => handleEdgeChange(i, e.target.value)}
                                placeholder="Label (optional)"
                                className="flex-1 bg-white border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <button
                      onClick={onGenerate}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                      {isGenerating ? 'Generating Redesign...' : 'Generate Redesign'}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
        </div>
      </div>
    </motion.section>
  );
}
