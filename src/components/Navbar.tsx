import React from 'react';
import { Layers, Github } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-sm shadow-blue-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">DiagramOps</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900 transition-colors">Home</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Docs</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
            <Github className="w-5 h-5" />
          </a>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
}
