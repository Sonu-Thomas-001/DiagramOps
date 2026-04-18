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
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1 bg-card border border-border rounded-full shadow-lg"
      >
        <div className="flex items-center gap-0.5">
          <ActionButton 
            icon={<Download className="w-3.5 h-3.5" />} 
            label="PNG" 
            onClick={downloadPNG} 
          />
          <ActionButton 
            icon={<Presentation className="w-3.5 h-3.5" />} 
            label="Export PPT" 
            onClick={downloadPPT} 
            primary
          />
          
          <div className="w-px h-4 bg-border mx-1" />

          <ActionButton 
            icon={copied ? <CheckCircle2 className="w-3.5 h-3.5 text-foreground" /> : <Copy className="w-3.5 h-3.5" />} 
            label={copied ? "Copied" : "Copy Prompt"} 
            onClick={handleCopy} 
          />
          
          <ActionButton 
            icon={<RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />} 
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
        "flex items-center gap-1.5 font-medium px-3 py-1.5 rounded-full transition-all text-[13px] group",
        primary 
          ? "bg-foreground text-background hover:bg-neutral-200" 
          : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
