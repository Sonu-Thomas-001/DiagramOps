'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateDiagram = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setImage(data.image_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 md:p-24 flex flex-col items-center bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-2 tracking-tight">DiagramOps</h1>
      <p className="text-gray-500 mb-8">Generate architecture diagrams from text.</p>
      
      <div className="w-full max-w-2xl flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          rows={5}
          placeholder="Describe your architecture (e.g., A scalable microservices architecture with an API Gateway, 3 Node.js services, a Redis cache, and a PostgreSQL database)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="bg-black text-white px-6 py-4 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 transition-all"
          onClick={generateDiagram}
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate Diagram'}
        </button>
        
        {image && (
          <div className="mt-8 border border-gray-200 rounded-xl p-4 bg-gray-50">
            <img src={image} alt="Architecture Diagram" className="w-full h-auto rounded-lg shadow-sm" />
            
            <div className="mt-4 flex gap-4 justify-center">
              <a 
                href={image} 
                download="architecture.png"
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Download PNG
              </a>
              {/* Add PPTX export logic here using pptxgenjs */}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
