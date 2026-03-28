import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
        <p>© {new Date().getFullYear()} DiagramOps. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
