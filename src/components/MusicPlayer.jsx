import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useDragControls } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Music2, Minus } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export default function MusicPlayer() {
  const { audioRef, isPlaying, isUnlocked, toggle, title, subtitle } = useMusic();
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [side, setSide] = useState('right'); // 'left' | 'right'
  const wasDragging = useRef(false);
  const containerRef = useRef(null);

  // Motion values untuk offset drag — direset ke 0 setiap kali snap ke sisi baru
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const handleTimeUpdate = () => setCurrentTime(el.currentTime);
    const handleLoadedMetadata = () => setDuration(el.duration);

    el.addEventListener('timeupdate', handleTimeUpdate);
    el.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      el.removeEventListener('timeupdate', handleTimeUpdate);
      el.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioRef]);

  // Klik di luar kotak → otomatis minimize
  useEffect(() => {
    if (!isMusicOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsMusicOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMusicOpen]);

  if (!isUnlocked) return null;

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      const targetTime = Math.min(Math.max(audioRef.current.currentTime + seconds, 0), duration);
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDragEnd = (event, info) => {
    const windowWidth = window.innerWidth;
    const pointerX = info.point.x;
    const nextSide = pointerX < windowWidth / 2 ? 'left' : 'right';
    setSide(nextSide);

    // Reset offset drag ke 0 — karena posisi "asal" (left-6/right-6) sudah pindah sesuai `side`,
    // reset ini membuat elemen snap pas ke tepi baru, bukan diam di titik terakhir drag
    x.set(0);
    y.set(0);

    setTimeout(() => {
      wasDragging.current = false;
    }, 50);
  };

  const handleTapOpen = () => {
    if (wasDragging.current) return;
    setIsMusicOpen(true);
  };

  return (
    <motion.div
      ref={containerRef}
      drag
      style={{ x, y }}
      dragMomentum={false}
      dragElastic={0.08}
      // Batas drag mengikuti ukuran viewport — supaya tombol tidak bisa keluar layar
      dragConstraints={{
        top: -(window.innerHeight - 120),
        bottom: 0,
        left: side === 'right' ? -(window.innerWidth - 120) : 0,
        right: side === 'left' ? window.innerWidth - 120 : 0,
      }}
      onDragStart={() => { wasDragging.current = true; }}
      onDragEnd={handleDragEnd}
      className={`fixed bottom-6 z-[1000] cursor-grab active:cursor-grabbing ${
        side === 'right' ? 'right-6' : 'left-6'
      }`}
    >
      <AnimatePresence mode="wait">
        {!isMusicOpen ? (
          <motion.button
            key="circle-player"
            onClick={handleTapOpen}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/30 backdrop-blur-2xl border border-white/60 shadow-xl shadow-pink-500/25 text-pink-600 overflow-hidden"
          >
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-white/90 via-white/30 to-transparent rounded-full blur-md pointer-events-none" />
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: isPlaying ? Infinity : 0, duration: 5, ease: 'linear' }}
              className="relative z-10 flex items-center justify-center"
            >
              <Music2 className="w-6 h-6" strokeWidth={2} />
            </motion.div>
            <span
              className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white z-10 transition-colors ${
                isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'
              }`}
            />
          </motion.button>
        ) : (
          <motion.div
            key="card-player"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-72 sm:w-80 rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-pink-500/25 text-slate-800 overflow-hidden"
          >
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-white/80 via-white/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-pink-400/25 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: isPlaying ? Infinity : 0, duration: 5, ease: 'linear' }}
                  className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center shrink-0 shadow-md shadow-pink-500/40"
                >
                  <Music2 className="w-5 h-5 text-white" strokeWidth={2} />
                </motion.div>

                <div className="flex-1 overflow-hidden">
                  <h4 className="font-semibold text-sm truncate text-slate-800">{title}</h4>
                  <p className="text-xs text-slate-500 truncate">{subtitle}</p>
                </div>

                <button
                  onClick={() => setIsMusicOpen(false)}
                  aria-label="Minimize"
                  className="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-white/50 transition-colors cursor-pointer shrink-0"
                >
                  <Minus className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/50 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono tracking-wide">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => skipTime(-5)}
                  className="p-2 text-slate-500 hover:text-pink-600 hover:bg-white/50 rounded-full transition-all cursor-pointer"
                  title="Mundur 5 Detik"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={toggle}
                  className="p-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full shadow-lg shadow-pink-500/40 transition-all transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => skipTime(5)}
                  className="p-2 text-slate-500 hover:text-pink-600 hover:bg-white/50 rounded-full transition-all cursor-pointer"
                  title="Maju 5 Detik"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}