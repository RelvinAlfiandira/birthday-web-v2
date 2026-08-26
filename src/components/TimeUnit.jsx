import React from 'react';
import { motion } from 'framer-motion';

export default function TimeUnit({ value, label }) {
  return (
    <div className="relative group rounded-3xl p-5 sm:p-7 text-center flex flex-col items-center justify-center overflow-hidden shadow-2xl backdrop-blur-md bg-white/20 border border-white/40 shadow-pink-500/5">
      
    {/* Reflection Highlight (Kilauan Atas) */}
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-white/60 via-white/20 to-transparent rounded-full blur-sm pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      {/* Glow Ambient Soft */}
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-pink-400/20 rounded-full blur-xl pointer-events-none" />

      {/* Angka Utama (Dibuat lebih ramping & soft) */}
      <span className="relative z-10 text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-slate-800 via-rose-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm font-sans">
        {String(value).padStart(2, '0')}
      </span>

      {/* Label (Hari, Jam, Menit, Detik) */}
      <span className="relative z-10 text-[10px] sm:text-xs font-semibold text-rose-800/80 uppercase tracking-widest mt-2 px-3 py-0.5 rounded-full bg-white/40 border border-white/60">
        {label}
      </span>
    </div>
  );
}