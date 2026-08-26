import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { ucapanData } from '../data/ucapanData';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base">
            SpecialDay<span className="text-pink-500">.</span>
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-100 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ulangi Kejutan</span>
        </button>
      </div>
    </nav>
  );
}