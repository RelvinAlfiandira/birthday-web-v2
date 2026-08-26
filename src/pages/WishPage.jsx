import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Play, Pause, Volume2, ArrowRight, Gift } from 'lucide-react';
import { ucapanData } from '../data/ucapanData';

export default function WishPage() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Memicu efek confetti otomatis saat halaman dibuka
  useEffect(() => {
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'],
    });
  };

  // Toggle Pemutar Musik
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log('Autoplay error/blocked:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 relative overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* Element Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Element Audio Player Tersembunyi */}
      <audio ref={audioRef} src={ucapanData.musikUrl} loop />

      {/* Header Section */}
      <header className="w-full max-w-md flex items-center justify-between pt-4 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-pink-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Birthday Wish</span>
        </div>

        {/* Floating Toggle Audio Control */}
        <button
          onClick={toggleMusic}
          className={`p-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-medium cursor-pointer ${
            isPlaying
              ? 'bg-pink-500/10 border-pink-500/30 text-pink-400 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-100'
          }`}
          aria-label="Toggle Musik"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="hidden sm:inline">{isPlaying ? 'Musik Nyala' : 'Putar Musik'}</span>
        </button>
      </header>

      {/* Main Wish Card */}
      <section className="w-full max-w-md my-auto z-10 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden space-y-6"
        >
          {/* Badge Usia Baru */}
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-xs font-semibold text-pink-300">
            Turning {ucapanData.umur} Years Old ✨
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
              Happy Birthday, <br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                {ucapanData.nama}! 🎉
              </span>
            </h1>
          </div>

          {/* Isi Pesan Ucapan */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light italic bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60">
            "{ucapanData.pesan}"
          </p>

          {/* Group Tombol Aksi */}
          <div className="space-y-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerConfetti}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-pink-400 rounded-2xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>Tiup Konfeti Lagi!</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/home')}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-semibold shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lihat Galeri Kenangan</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="pb-6 text-center z-10">
        <p className="text-xs text-slate-500">
          Semoga hari ini penuh dengan kebahagiaan ❤️
        </p>
      </footer>
    </main>
  );
}