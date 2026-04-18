import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Presentation, RefreshCw, Copy, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ActionBarProps {
  result: { image_url: string } | null;
  downloadPNG: () => void;
  downloadPPT: () => void;
  generateDiagram: () => void;
  loading: boolean;
  prompt: string;
}

export function ActionBar({ result, downloadPNG, downloadPPT, generateDiagram, loading, prompt }: ActionBarProps) {
  const [copied, setCopied] = React.useState(false);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt || 'Generated Diagram');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 bg-[#0c0c11]/80 backdrop-blur-3xl rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
      >
        <div className="flex items-center gap-1">
          <ActionButton 
            icon={<Download className="w-4 h-4" />} 
            label="PNG" 
            onClick={downloadPNG} 
          />
          <ActionButton 
            icon={<Presentation className="w-4 h-4" />} 
            label="Export PPT" 
            onClick={downloadPPT} 
            primary
          />
          
          <div className="w-px h-6 bg-border mx-1" />

          <ActionButton 
            icon={copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} 
            label={copied ? "Copied" : "Copy Prompt"} 
            onClick={handleCopy} 
          />
          
          <ActionButton 
            icon={<RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />} 
            label="Regenerate" 
            onClick={generateDiagram} 
            disabled={loading}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ActionButton({ icon, label, onClick, primary, disabled }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 font-medium px-4 py-2.5 rounded-full transition-all text-sm group relative overflow-hidden",
        primary 
          ? "bg-animated-gradient text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
          : "text-muted-foreground hover:text-white hover:bg-white/5",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", disabled && "group-hover:scale-100")}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
