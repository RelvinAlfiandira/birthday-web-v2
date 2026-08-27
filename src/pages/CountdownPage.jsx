import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import SnowEffect from '../components/SnowEffect';
import { ucapanData } from '../data/ucapanData';
import UnlockedCard from '../components/UnlockedCard';
import TimeUnit from '../components/TimeUnit';
import { useTransition } from '../context/TransitionContext';

export default function CountdownPage() {
  const { transitionTo } = useTransition();
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(ucapanData.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsTimeUp(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsTimeUp(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    transitionTo('/unlock');
  };

  return (
    <main className="h-screen bg-rose-50 text-slate-100 flex flex-col p-4 sm:p-6 relative overflow-hidden selection:bg-pink-500 selection:text-white">
      <SnowEffect />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <header className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-lora max-w-2xl mx-auto text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-800"
          >
            Menuju Detik-Detik Spesial Hari Ulang Tahunmu
            <span className="block mt-1 py-6 leading-normal font-lora text-base sm:text-lg md:text-xl font-light text-slate-500">
              Kejutan manis menanti. Rasakan debar bahagia menantikan hari ulang tahunmu yang tak terlupakan
            </span>
          </motion.h1>
        </header>

        <section aria-label="Countdown Timer" className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!isTimeUp ? (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4"
              >
                <TimeUnit value={timeLeft.days} label="Hari" />
                <TimeUnit value={timeLeft.hours} label="Jam" />
                <TimeUnit value={timeLeft.minutes} label="Menit" />
                <TimeUnit value={timeLeft.seconds} label="Detik" />
              </motion.div>
            ) : (
              <UnlockedCard onContinue={handleContinue} />
            )}
          </AnimatePresence>
        </section>
      </div>

      <footer className="pb-6 text-center z-10 space-y-2">
        <p className="text-xs text-slate-500">
          Dibuat dengan penuh rasa hangat untuk {ucapanData.nama}
        </p>
        {!isTimeUp && import.meta.env.DEV && (
          <button
            onClick={handleContinue}
            className="text-[11px] text-slate-600 hover:text-slate-400 transition-colors underline flex items-center gap-1 mx-auto cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>Bypass Timer (Mode Developer)</span>
          </button>
        )}
      </footer>
    </main>
  );
}