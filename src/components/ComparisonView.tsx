import React from 'react';
import { motion } from 'motion/react';

interface ComparisonViewProps {
  originalImage: string;
  redesignedImage: string;
}

export function ComparisonView({ originalImage, redesignedImage }: ComparisonViewProps) {
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
          <div className="mx-auto text-xs font-medium text-slate-400">Comparison View</div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] relative overflow-hidden">
          <motion.div 
            key="side-by-side"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col lg:flex-row gap-8 items-center justify-center"
          >
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Original</span>
              <img src={originalImage} alt="Original" className="w-full h-auto rounded-2xl border border-slate-200 shadow-sm opacity-80" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Redesigned</span>
              <div className="w-full bg-white p-2 rounded-2xl shadow-2xl border border-blue-200/60 transition-transform duration-500 hover:scale-[1.02] cursor-zoom-in">
                <img src={redesignedImage} alt="Redesigned" className="w-full h-auto rounded-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
