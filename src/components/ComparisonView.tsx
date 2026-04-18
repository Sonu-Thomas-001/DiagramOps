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
  };

  const handleEdgeChange = (index: number, value: string) => {
    if (!setExtractedData || !extractedData) return;
    const newEdges = [...extractedData.edges];
    newEdges[index] = { ...newEdges[index], label: value };
    setExtractedData({ ...extractedData, edges: newEdges });
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        </div>
      </div>
    </motion.section>
  );
}
