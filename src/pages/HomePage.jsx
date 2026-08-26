import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Image as ImageIcon, Calendar, Star, Quote } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ucapanData } from '../data/ucapanData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      {/* Navbar Component */}
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 space-y-16 relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* HERO SECTION */}
        <section className="text-center space-y-6 pt-6 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-pink-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrating {ucapanData.nama}'s Birthday</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100"
          >
            A Life Worth <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              Celebrating.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed"
          >
            Galeri momen manis, memori terbaik, dan doa penuh rasa hangat yang dikumpulkan khusus untuk merayakan hari kelahiranmu.
          </motion.p>
        </section>

        {/* MEMORIES SECTION (BENTO GRID LAYOUT) */}
        <section className="space-y-6 z-10 relative" aria-label="Memories Gallery">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
              <ImageIcon className="w-4 h-4" />
              <span>Memories Gallery</span>
            </div>
            <span className="text-xs text-slate-500">Momen Indah Bersama</span>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bento Item 1: Foto Utama Large */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:col-span-2 md:row-span-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative group min-h-[300px] sm:min-h-[400px]"
            >
              <img 
                src={ucapanData.foto[0]} 
                alt="Memory 1" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">Favorite Moment</span>
                <h2 className="text-xl font-bold text-white">Senyuman Terbaik 🎉</h2>
              </div>
            </motion.div>

            {/* Bento Item 2: Quote / Pesan Pendek */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4"
            >
              <Quote className="w-8 h-8 text-pink-500/40" />
              <p className="text-slate-300 text-sm italic font-light">
                "Terima kasih telah menjadi sosok yang selalu membawa keceriaan dan hangat di setiap momen."
              </p>
              <div className="flex items-center gap-1.5 text-xs text-pink-400 font-medium">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Special Wish</span>
              </div>
            </motion.div>

            {/* Bento Item 3: Foto 2 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative group min-h-[200px]"
            >
              <img 
                src={ucapanData.foto[1]} 
                alt="Memory 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Bento Item 4: Foto 3 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative group min-h-[200px]"
            >
              <img 
                src={ucapanData.foto[2]} 
                alt="Memory 3" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Bento Item 5: Stat/Card Info Tambahan */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:col-span-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="font-bold text-slate-100 text-base">Semoga Langkah Baru Ini Penuh Berkah</h2>
                <p className="text-xs text-slate-400">Selalu sehat, bahagia, dan tercapai semua cita-citamu.</p>
              </div>
              <div className="p-3 bg-pink-500 text-white rounded-2xl shrink-0">
                <Star className="w-6 h-6 fill-current" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500 space-y-2">
        <p>Made with ❤️ for {ucapanData.nama}'s Birthday</p>
        <p className="text-[11px] text-slate-600">© {new Date().getFullYear()} SpecialDay. All rights reserved.</p>
      </footer>
    </div>
  );
}