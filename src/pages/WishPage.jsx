import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { ucapanData } from '../data/ucapanData';
import { useTransition } from '../context/TransitionContext';
import LetterEnvelope from '../components/LetterEnvelope';
import LetterContent from '../components/LetterContent';
import SnowEffect from '../components/SnowEffect';

import envelopeClosed from '../assets/images/letter-close.png';
import envelopeOpen from '../assets/images/letter-open.png';

export default function WishPage() {
  const { transitionTo } = useTransition();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [stage, setStage] = useState('waiting'); // waiting -> idle -> opening -> letterOpen
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
      setStage('idle');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#ec4899', '#e11d48'],
    });
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setStage('opening');

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185', '#ec4899', '#e11d48', '#a855f7'],
    });

    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay error/blocked:', err);
      });
    }

    // Beri jeda supaya animasi flip amplop sempat terlihat, baru surat muncul
    setTimeout(() => setStage('letterOpen'), 2400);
  };

  const handleContinue = () => {
    transitionTo('/home');
  };

  return (
    <main className="h-screen bg-rose-50 text-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-pink-500 selection:text-white">
      <SnowEffect/>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <audio ref={audioRef} src={ucapanData.musikUrl} loop />

      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/30 border border-white/50 backdrop-blur-md text-xs font-medium text-pink-600">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Birthday Wish</span>
        </div>
      </div>

      {/* Amplop + Teks Instruksi */}
      <AnimatePresence>
        {(stage === 'idle' || stage === 'opening') && (
          <motion.div
            key="envelope-wrapper"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="z-10 flex flex-col items-center gap-6"
          >
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            >
              <LetterEnvelope
                isOpen={isEnvelopeOpen}
                onClick={handleOpenEnvelope}
                closedSrc={envelopeClosed}
                openSrc={envelopeOpen}
              />
            </motion.div>

            <AnimatePresence>
              {stage === 'idle' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-lora text-base sm:text-lg text-slate-600 text-center"
                >
                  Klik surat untuk membukanya ✨
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay Isi Surat */}
      {stage === 'letterOpen' && (
        <LetterContent
          title={ ucapanData.surat.judul}
          body={ucapanData.surat.isi}
          footer={ucapanData.surat.footer}
          onContinue={handleContinue}
        />
      )}

      <footer className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center z-10">
        <p className="text-xs text-slate-500">
          Semoga hari ini penuh dengan kebahagiaan ❤️
        </p>
      </footer>
    </main>
  );
}