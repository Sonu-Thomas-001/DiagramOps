<<<<<<< HEAD
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Upload, X, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
=======
import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Wand2, Loader2, Sparkles, UploadCloud, Type, Image as ImageIcon, X } from 'lucide-react';
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512

interface HeroInputProps {
  mode: 'text' | 'image';
  setMode: (m: 'text' | 'image') => void;
  prompt: string;
  setPrompt: (p: string) => void;
  uploadedImage: string | null;
  setUploadedImage: (img: string | null) => void;
  style: string;
  setStyle: (s: string) => void;
  loading: boolean;
  generateDiagram: () => void;
  error: string | null;
}

export function HeroInput({
  mode, setMode, prompt, setPrompt, uploadedImage, setUploadedImage, style, setStyle, loading, generateDiagram, error
}: HeroInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
<<<<<<< HEAD
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
    }
  }, [prompt]);
=======
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center text-center max-w-3xl mx-auto pt-16 pb-12 px-4"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Gemini 2.5 Flash Powered</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
        {mode === 'text' ? 'Generate Architecture' : 'Redesign Architecture'} <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          {mode === 'text' ? 'Diagrams in Seconds' : 'Diagrams with AI'}
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl leading-relaxed">
        {mode === 'text' 
          ? 'Turn your ideas into clean, professional diagrams instantly. Describe your system, and let AI do the heavy lifting.'
          : 'Upload any messy whiteboard sketch or old diagram, and we will transform it into a clean, presentation-ready version.'}
      </p>

      {/* Mode Toggle */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-8 border border-slate-200">
        <button
          onClick={() => setMode('text')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'text' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Type className="w-4 h-4" /> Text to Diagram
        </button>
        <button
          onClick={() => setMode('image')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'image' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ImageIcon className="w-4 h-4" /> Redesign Image
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 transition-all focus-within:shadow-2xl focus-within:shadow-blue-500/10 focus-within:border-blue-300">
        
        {mode === 'text' ? (
          <textarea
            className="w-full p-4 bg-transparent text-slate-800 text-base focus:outline-none resize-none placeholder:text-slate-400 min-h-[120px]"
            placeholder="Describe your system... (e.g., User → API Gateway → Microservices → Database)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        ) : (
          <div className="p-4 min-h-[120px] flex flex-col items-center justify-center">
            {uploadedImage ? (
              <div className="relative w-full">
                <img src={uploadedImage} alt="Uploaded" className="max-h-[200px] mx-auto rounded-xl object-contain" />
                <button 
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 p-1.5 bg-slate-900/50 hover:bg-slate-900 text-white rounded-full backdrop-blur-sm transition-colors"
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
<<<<<<< HEAD
                className="w-full h-full min-h-[240px] border border-dashed border-border hover:border-neutral-600 hover:bg-secondary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-muted-foreground mb-3" />
                <p className="text-foreground text-[14px] font-medium mb-1">Click or drag image to upload</p>
                <p className="text-muted-foreground text-[13px]">PNG, JPG up to 10MB</p>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/png, image/jpeg, image/jpg" className="hidden" />
=======
                className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-slate-700 font-medium mb-1">Click to upload diagram</p>
                <p className="text-slate-400 text-sm">PNG, JPG up to 5MB</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/png, image/jpeg, image/jpg" 
                  className="hidden" 
                />
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
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
<<<<<<< HEAD
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
=======
        
        <div className="flex flex-col sm:flex-row items-center justify-between p-2 gap-4 border-t border-slate-100 mt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select 
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="minimal">Minimal</option>
              <option value="aws">AWS Style</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          <button
            onClick={generateDiagram}
            disabled={loading || (mode === 'text' ? !prompt.trim() : !uploadedImage)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {loading ? 'Processing...' : (mode === 'text' ? 'Generate Diagram' : 'Redesign Diagram')}
          </button>
        </div>
>>>>>>> 9f673154aac585871c4a3622e6dfa4749e99a512
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl max-w-2xl w-full text-left"
        >
          {error}
        </motion.div>
      )}
    </motion.section>
  );
}
