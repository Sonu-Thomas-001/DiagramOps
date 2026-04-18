import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Loader2, UploadCloud, X, TerminalSquare, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeroInputProps {
  mode: 'text' | 'image';
  prompt: string;
  setPrompt: (p: string) => void;
  uploadedImage: string | null;
  setUploadedImage: (img: string | null) => void;
  loading: boolean;
  generateDiagram: () => void;
  error: string | null;
}

const SUGGESTIONS = [
  "Scalable e-commerce backend",
  "Serverless image pipeline",
  "Real-time chat architecture"
];

export function HeroInput({
  mode, prompt, setPrompt, uploadedImage, setUploadedImage, loading, generateDiagram, error
}: HeroInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(140, textareaRef.current.scrollHeight)}px`;
    }
  }, [prompt]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const preventDefaults = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };

  const handleDrop = (e: React.DragEvent) => {
    preventDefaults(e);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!loading && (mode === 'text' ? prompt.trim() : uploadedImage)) generateDiagram();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-12 pb-24 px-6 relative z-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>DiagramOps Engine</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-4 leading-tight">
          {mode === 'text' ? 'Design Systems with ' : 'Redesign Architecture with '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            Precision
          </span>
        </h1>
        <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
          {mode === 'text' 
            ? 'Describe your system architecture in plain text. We translate it into presentation-ready vector diagrams.'
            : 'Upload messy whiteboard sketches or outdated diagrams. We reconstruct them into pristine modern designs.'}
        </p>
      </motion.div>

      {/* Main Input Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "w-full bg-[#0c0c11]/80 backdrop-blur-3xl rounded-[32px] border relative group transition-all duration-500 p-2",
          isFocused ? "border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20" : "border-white/10 hover:border-white/20 shadow-2xl"
        )}
      >
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {mode === 'text' ? (
          <div className="flex flex-col relative z-10 glass rounded-[24px] overflow-hidden">
            <textarea
              ref={textareaRef}
              className="w-full p-8 text-foreground bg-transparent font-sans text-xl focus:outline-none resize-none placeholder:text-muted-foreground/40 min-h-[140px]"
              placeholder="Describe your system... (e.g., User → API Gateway → Microservices → Database)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            
            <AnimatePresence>
              {prompt.length === 0 && !isFocused && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute bottom-8 left-8 pointer-events-none text-base text-muted-foreground/30 tracking-wide"
                >
                  <span className="font-semibold text-blue-400/40 mr-2">Try:</span> 
                  scalable e-commerce system
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-6 py-4 flex flex-wrap gap-2 items-center border-t border-white/5 bg-black/20">
              <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mr-2 flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-500" /> Suggestions
              </span>
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground/80 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div 
            className="p-2 flex flex-col items-center justify-center min-h-[300px] relative z-10"
            onDragEnter={preventDefaults} onDragLeave={preventDefaults} onDragOver={preventDefaults} onDrop={handleDrop}
          >
            {uploadedImage ? (
              <div className="relative w-full h-[300px] flex items-center justify-center bg-black/40 rounded-[24px] overflow-hidden group/img border border-white/5">
                <img src={uploadedImage} alt="Uploaded" className="max-h-full max-w-full object-contain shadow-2xl" />
                <motion.button 
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-4 right-4 p-2.5 bg-black/60 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors opacity-0 group-hover/img:opacity-100 shadow-xl"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full min-h-[280px] border-2 border-dashed border-white/10 hover:border-blue-500/50 bg-black/20 hover:bg-blue-500/5 rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-all group/upload"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 flex items-center justify-center mb-6 group-hover/upload:scale-110 group-hover/upload:shadow-[0_0_40px_rgba(59,130,246,0.2)] group-hover/upload:border-blue-500/30 transition-all duration-300">
                  <UploadCloud className="w-10 h-10 text-muted-foreground/50 group-hover/upload:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drag & drop your diagram</h3>
                <p className="text-muted-foreground/60 text-sm font-medium">Or click to browse (PNG, JPG)</p>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/png, image/jpeg, image/jpg" className="hidden" />
              </div>
            )}
          </div>
        )}

        {/* Generate Button Wrapper */}
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={generateDiagram}
            disabled={loading || (mode === 'text' ? !prompt.trim() : !uploadedImage)}
            className="group relative flex items-center justify-center px-10 py-4 bg-white text-black font-bold rounded-full shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_50px_rgba(255,255,255,0.3)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-animated-gradient opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-500" />
            <div className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-500">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              <span className="tracking-wide text-sm">{loading ? 'Synthesizing...' : 'Generate Details'}</span>
              {!loading && <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />}
            </div>
          </button>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-14 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl max-w-2xl w-full text-center shadow-[0_0_20px_rgba(239,68,68,0.1)]"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Keyboard Hint */}
      <div className="mt-14 text-xs font-semibold text-muted-foreground/40 flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-black/20">
        <kbd className="font-sans px-1.5 py-0.5 border border-white/10 rounded bg-white/5 shadow-xs text-muted-foreground">Cmd</kbd>
        <span>+</span>
        <kbd className="font-sans px-1.5 py-0.5 border border-white/10 rounded bg-white/5 shadow-xs text-muted-foreground">Enter</kbd>
        <span className="ml-1 uppercase tracking-widest text-[10px]">to generate</span>
      </div>
    </div>
  );
}
