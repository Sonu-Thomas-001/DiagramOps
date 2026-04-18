import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sparkles, Image as ImageIcon, 
  History, LayoutTemplate, Layers 
} from 'lucide-react';
import { cn } from '../lib/utils';

type SidebarProps = {
  activeTab: 'text' | 'image' | 'history' | 'templates';
  setActiveTab: (tab: 'text' | 'image' | 'history' | 'templates') => void;
};

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'text', icon: Sparkles, label: 'Generate' },
    { id: 'image', icon: ImageIcon, label: 'Redesign' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
  ] as const;

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 80 : 260 }}
      className="hidden md:flex flex-col h-screen glass-panel z-10 transition-all duration-300 relative"
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-border/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-xl shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-lg tracking-tight whitespace-nowrap"
            >
              DiagramOps
            </motion.span>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary-foreground" : "")} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              
              {collapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-primary text-primary-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-animated-gradient shrink-0" />
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium whitespace-nowrap">User Account</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">Pro Plan</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
