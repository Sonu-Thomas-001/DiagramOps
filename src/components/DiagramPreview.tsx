import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface DiagramPreviewProps {
  loading: boolean;
  result: { image_url: string } | null;
  mode: 'text' | 'image';
  uploadedImage: string | null;
}

export function DiagramPreview({ loading, result, mode, uploadedImage }: DiagramPreviewProps) {
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
          <div className="mx-auto text-xs font-medium text-slate-400">Preview</div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
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
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
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
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-slate-100">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <h3 className="text-slate-900 font-semibold text-xl mb-2">No Diagram Yet</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Enter your system requirements or upload an image above to generate a professional architecture diagram.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
