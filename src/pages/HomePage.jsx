import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote, Star, ArrowDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import SnowEffect from '../components/SnowEffect';
import { ucapanData } from '../data/ucapanData';

export default function HomePage() {
  return (
    <div className="relative bg-rose-50 text-slate-800 selection:bg-pink-500 selection:text-white">
      <Navbar />

      {/* Background & SnowEffect — fixed, satu instance untuk seluruh halaman */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <SnowEffect count={20} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Wrapper scroll — halus, snap hanya membantu (proximity), tidak memaksa */}
      <main className="home-scroll relative z-10 h-screen overflow-y-auto snap-y snap-proximity">
        {/* ===================== SECTION 1: HERO ===================== */}
        <section
          id="hero"
          className="h-screen w-full snap-start flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 border border-white/50 backdrop-blur-md text-xs font-semibold text-pink-600 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrating {ucapanData.nama}'s Birthday</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-lora text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-center text-rose-900"
          >
            A Life Worth <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              Celebrating.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed text-center mt-6"
          >
            Galeri momen manis, memori terbaik, dan doa penuh rasa hangat yang dikumpulkan khusus untuk merayakan hari kelahiranmu.
          </motion.p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 text-slate-400"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </section>

        {/* ===================== SECTION 2: UCAPAN KHUSUS ===================== */}
        <section
          id="wish"
          className="h-screen w-full snap-start flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-2xl bg-white/25 border border-white/50 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-pink-500/15 overflow-hidden"
          >
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-white/70 via-white/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-400/25 rounded-full blur-2xl pointer-events-none" />

            <Quote className="relative z-10 w-9 h-9 text-pink-400 mx-auto mb-6" />

            <p className="relative z-10 font-lora text-lg sm:text-2xl italic text-rose-900 leading-relaxed">
              "Terima kasih telah menjadi sosok yang selalu membawa keceriaan dan hangat di setiap momen."
            </p>

            <div className="relative z-10 flex items-center justify-center gap-1.5 text-xs text-pink-600 font-medium mt-6">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Special Wish</span>
            </div>

            <div className="relative z-10 mt-8 pt-8 border-t border-white/50 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl shrink-0 shadow-md shadow-pink-500/30">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Semoga Langkah Baru Ini Penuh Berkah</h3>
                <p className="text-xs text-slate-500">Selalu sehat, bahagia, dan tercapai semua cita-citamu.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===================== SECTION 3: GALERI ===================== */}
        <section
          id="gallery"
          className="h-screen w-full snap-start flex flex-col items-center justify-center px-6 py-20 sm:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="font-lora text-2xl sm:text-3xl font-bold text-rose-900">Memories Gallery</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Momen Indah Bersama</p>
          </motion.div>

          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="md:col-span-2 bg-white/20 border border-white/40 backdrop-blur-md rounded-3xl overflow-hidden relative group min-h-[220px] sm:min-h-0"
            >
              <img
                src={ucapanData.foto[0]}
                alt="Memory 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs font-semibold text-pink-300 uppercase tracking-widest">Favorite Moment</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Senyuman Terbaik 🎉</h3>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/20 border border-white/40 backdrop-blur-md rounded-3xl overflow-hidden relative group min-h-[140px] sm:min-h-0"
              >
                <img
                  src={ucapanData.foto[1]}
                  alt="Memory 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="bg-white/20 border border-white/40 backdrop-blur-md rounded-3xl overflow-hidden relative group min-h-[140px] sm:min-h-0"
              >
                <img
                  src={ucapanData.foto[2]}
                  alt="Memory 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6 sm:mt-8">
            Made with ❤️ for {ucapanData.nama}'s Birthday
          </p>
        </section>
      </main>

      {/* Styling scrollbar tema pink/rose — khusus wrapper .home-scroll */}
      <style>{`
        .home-scroll {
          scrollbar-width: thin;
          scrollbar-color: #f472b6 #fce7f3;
        }
        .home-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .home-scroll::-webkit-scrollbar-track {
          background: #fce7f3;
        }
        .home-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f472b6, #e11d48);
          border-radius: 9999px;
        }
        .home-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #ec4899, #be123c);
        }
      `}</style>
    </div>
  );
}