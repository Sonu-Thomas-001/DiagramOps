import React, { useState } from 'react';
import { Download, Image as ImageIcon, Presentation, Loader2, Wand2, Layers } from 'lucide-react';
import pptxgen from 'pptxgenjs';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate image');
      setGeneratedImage(data.image);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPNG = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = 'architecture-diagram.png';
    a.click();
  };

  const downloadPPTX = () => {
    if (!generatedImage) return;
    const pres = new pptxgen();
    const slide = pres.addSlide();
    
    // Convert base64 data URL to base64 string for pptxgenjs
    const base64Data = generatedImage.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    
    slide.addImage({ data: `image/png;base64,${base64Data}`, x: 0.5, y: 0.5, w: 9, h: 5.06 });
    pres.writeFile({ fileName: 'Architecture_Diagram.pptx' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-[#0a0a0a] font-sans flex flex-col md:flex-row">
      {/* Left Panel - Input */}
      <div className="w-full md:w-1/3 p-8 md:p-12 border-r border-gray-200 bg-white flex flex-col shadow-sm z-10">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">DiagramOps</h1>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-medium mt-1">Architecture Generator</p>
          </div>
        </div>

        <div className="flex-grow flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">System Requirements</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A highly available e-commerce platform with an API Gateway, 3 Node.js microservices (Auth, Orders, Inventory), a Redis cache, and a PostgreSQL database..."
              className="w-full h-56 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm leading-relaxed"
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-black text-white rounded-xl py-4 font-medium flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            {isGenerating ? 'Generating Architecture...' : 'Generate Diagram'}
          </button>
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-start gap-2">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-400">
          Powered by Gemini 3.1 Flash Image
        </div>
      </div>

      {/* Right Panel - Output */}
      <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-center justify-center bg-[#f5f5f4] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        {generatedImage ? (
          <div className="w-full max-w-4xl flex flex-col gap-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
              <img src={generatedImage} alt="Generated Architecture" className="w-full h-auto rounded-xl" />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={downloadPNG} 
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" /> Download PNG
              </button>
              <button 
                onClick={downloadPPTX} 
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <Presentation className="w-4 h-4" /> Export to PPTX
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center text-gray-400 relative z-10">
            <div className="w-24 h-24 rounded-full bg-gray-200/50 flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Diagram Generated</h3>
            <p className="text-sm max-w-sm">Enter your system requirements on the left to generate a professional architecture diagram.</p>
          </div>
        )}
      </div>
    </div>
  );
}
