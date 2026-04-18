import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Upload, X, HelpCircle } from 'lucide-react';
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
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
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
    <div className="w-full max-w-3xl mx-auto flex flex-col pt-24 pb-12 px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-3">
          {mode === 'text' ? 'Design Systems with Precision' : 'Redesign Architecture'}
        </h1>
        <p className="text-[15px] text-muted-foreground max-w-lg mx-auto">
          {mode === 'text' 
            ? 'Describe your system architecture in plain text. We translate it into crisp, presentation-ready vector diagrams.'
            : 'Upload whiteboard sketches or complex diagrams. We restructure them into clean, modern designs.'}
        </p>
      </motion.div>

      {/* Main Input Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className={cn(
          "w-full bg-card rounded-xl border border-border transition-all duration-200",
          isFocused ? "shadow-[0_0_0_1px_rgba(255,255,255,0.1)] border-neutral-700" : "shadow-sm hover:border-neutral-800"
        )}
      >
        {mode === 'text' ? (
          <div className="flex flex-col relative w-full">
            <textarea
              ref={textareaRef}
              className="w-full p-5 text-foreground bg-transparent font-sans text-base focus:outline-none resize-none placeholder:text-muted-foreground min-h-[120px]"
              placeholder="e.g., User → API Gateway → Microservices → Database..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            
            <div className="px-3 py-3 flex items-center justify-between border-t border-border">
              <div className="flex gap-2">
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(suggestion)}
                    className="text-[13px] px-3 py-1.5 rounded-md border border-transparent bg-secondary text-muted-foreground hover:text-foreground hover:bg-neutral-800 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <button
                onClick={generateDiagram}
                disabled={loading || !prompt.trim()}
                className="flex items-center justify-center px-4 py-1.5 bg-foreground text-background font-medium text-[13px] rounded-md hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="p-1 min-h-[240px] flex flex-col relative"
            onDragEnter={preventDefaults} onDragLeave={preventDefaults} onDragOver={preventDefaults} onDrop={handleDrop}
          >
            {uploadedImage ? (
              <div className="relative w-full h-[240px] flex items-center justify-center bg-secondary rounded-lg overflow-hidden group">
                <img src={uploadedImage} alt="Uploaded" className="max-h-full max-w-full object-contain" />
                <button 
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-3 right-3 p-1.5 bg-background border border-border text-foreground rounded-md transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full min-h-[240px] border border-dashed border-border hover:border-neutral-600 hover:bg-secondary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-muted-foreground mb-3" />
                <p className="text-foreground text-[14px] font-medium mb-1">Click or drag image to upload</p>
                <p className="text-muted-foreground text-[13px]">PNG, JPG up to 10MB</p>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/png, image/jpeg, image/jpg" className="hidden" />
              </div>
            )}
            
            {uploadedImage && (
              <div className="px-3 py-3 flex justify-end border-t border-border mt-1">
                <button
                  onClick={generateDiagram}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-1.5 bg-foreground text-background font-medium text-[13px] rounded-md hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Redesigning...' : 'Redesign Image'}
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive-foreground text-[13px] rounded-md"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Keyboard Hint */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Press</span>
        <kbd className="font-sans px-1.5 py-0.5 border border-border rounded text-[11px] bg-secondary">Cmd</kbd>
        <span>+</span>
        <kbd className="font-sans px-1.5 py-0.5 border border-border rounded text-[11px] bg-secondary">Enter</kbd>
        <span>to generate</span>
      </div>
    </div>
  );
}
