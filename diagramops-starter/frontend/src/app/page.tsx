'use client';
import { useState } from 'react';
import { Wand2, Download, Presentation, Layers, Loader2, Code2 } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('minimal');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ image_url: string; diagram_data: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateDiagram = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || 'Failed to generate diagram');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPNG = async () => {
    if (!result?.image_url) return;
    
    // If it's a data URI, download directly
    if (result.image_url.startsWith('data:image')) {
      const a = document.createElement('a');
      a.href = result.image_url;
      a.download = 'architecture.png';
      a.click();
      return;
    }

    // If it's a URL, fetch and trigger download to avoid CORS issues on canvas
    try {
      const response = await fetch(result.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'architecture.png';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open(result.image_url, '_blank');
    }
  };

  const downloadPPT = async () => {
    if (!result?.image_url) return;
    try {
      const res = await fetch('http://localhost:8000/api/download/ppt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image_data: result.image_url,
          title: "System Architecture"
        })
      });
      
      if (!res.ok) throw new Error('Failed to generate PPT');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'architecture_diagram.pptx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Error downloading PPT: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">DiagramOps</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
          <a href="#" className="hover:text-slate-900 transition-colors">API</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Input Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Design Architecture</h1>
            <p className="text-slate-500 text-sm">Describe your system in plain English, and we'll generate a presentation-ready diagram.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">System Description</label>
              <textarea
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-400"
                rows={6}
                placeholder="e.g., A scalable microservices architecture with an API Gateway, 3 Node.js services, a Redis cache, and a PostgreSQL database..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Visual Style</label>
              <div className="grid grid-cols-3 gap-2">
                {['minimal', 'aws', 'dark'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg capitalize border transition-all ${
                      style === s 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateDiagram}
              disabled={loading || !prompt.trim()}
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              {loading ? 'Generating...' : 'Generate Diagram'}
            </button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Output Display */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col overflow-hidden">
            {/* Output Toolbar */}
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
              <span className="text-sm font-semibold text-slate-700">Preview</span>
              <div className="flex gap-3">
                <button 
                  onClick={downloadPNG}
                  disabled={!result}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> PNG
                </button>
                <button 
                  onClick={downloadPPT}
                  disabled={!result}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
                >
                  <Presentation className="w-3.5 h-3.5" /> Export PPT
                </button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
              {loading ? (
                <div className="flex flex-col items-center gap-4 text-slate-400 animate-pulse">
                  <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="text-sm font-medium">Analyzing architecture & rendering...</p>
                </div>
              ) : result ? (
                <div className="w-full max-w-3xl bg-white p-2 rounded-xl shadow-xl border border-slate-200/60 animate-in fade-in zoom-in-95 duration-500">
                  <img 
                    src={result.image_url} 
                    alt="Generated Architecture" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-slate-900 font-medium mb-1">No Diagram Yet</h3>
                  <p className="text-slate-500 text-sm">Enter your system requirements on the left to generate a professional architecture diagram.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
