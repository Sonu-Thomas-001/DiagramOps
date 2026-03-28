import React from 'react';
import { motion } from 'motion/react';
import { Download, Presentation, RefreshCw, Image as ImageIcon, FileCode2 } from 'lucide-react';

interface ActionButtonsProps {
  result: { image_url: string } | null;
  downloadPNG: () => void;
  downloadJPG: () => void;
  downloadSVG: () => void;
  downloadPPT: () => void;
  generateDiagram: () => void;
  loading: boolean;
}

export function ActionButtons({ result, downloadPNG, downloadJPG, downloadSVG, downloadPPT, generateDiagram, loading }: ActionButtonsProps) {
  if (!result) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-5xl mx-auto px-4 pb-20 flex flex-wrap items-center justify-center gap-4"
    >
      <button 
        onClick={downloadPNG}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-sm hover:shadow-md"
      >
        <Download className="w-4 h-4" /> PNG
      </button>

      <button 
        onClick={downloadJPG}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-sm hover:shadow-md"
      >
        <ImageIcon className="w-4 h-4" /> JPG
      </button>

      <button 
        onClick={downloadSVG}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-sm hover:shadow-md"
      >
        <FileCode2 className="w-4 h-4" /> SVG
      </button>
      
      <button 
        onClick={downloadPPT}
        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-md shadow-slate-900/20 hover:shadow-lg hover:shadow-slate-900/30"
      >
        <Presentation className="w-4 h-4" /> Export to PPT
      </button>

      <button 
        onClick={generateDiagram}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-sm font-semibold hover:bg-blue-100 hover:-translate-y-1 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Regenerate
      </button>
    </motion.section>
  );
}
