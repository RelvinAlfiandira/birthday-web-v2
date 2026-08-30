import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Unlock, Delete, ArrowLeft, ShieldAlert } from 'lucide-react';
import { ucapanData } from '../data/ucapanData';
import { useTransition } from '../context/TransitionContext'

export default function PasswordPage() {
  const navigate = useNavigate(); 
  const { transitionTo } = useTransition();
  const [pinInput, setPinInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNumberClick = (num) => {
    if (pinInput.length < 6 && !isSuccess) {
      const newPin = pinInput + num;
      setPinInput(newPin);
      setIsError(false);

      if (newPin.length === 6) {
        validatePin(newPin);
      }
    }
  };

  const handleDelete = () => {
    if (!isSuccess) {
      setPinInput((prev) => prev.slice(0, -1));
      setIsError(false);
    }
  };

  const validatePin = (input) => {
    if (input === ucapanData.pin) {
      setIsSuccess(true);
      setTimeout(() => {
        transitionTo('/wish');
      }, 1000);
    } else {
      setIsError(true);
      setTimeout(() => {
        setPinInput('');
      }, 600);
    }
  };

  return (
    <main className="min-h-screen bg-rose-50 text-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-pink-500 selection:text-white">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <header className="absolute top-4 left-0 right-0 w-full max-w-md mx-auto flex items-center justify-between px-4 z-20">
        <button
          onClick={() => navigate('/')}
          className="p-2.5 rounded-xl bg-white/30 border border-white/50 backdrop-blur-md text-slate-500 hover:text-slate-800 hover:bg-white/50 transition-all cursor-pointer"
          aria-label="Kembali ke halaman countdown"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </header>

      <section className="relative w-full max-w-sm z-10 space-y-5 sm:space-y-6 text-center bg-white/20 border border-white/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-pink-500/10 p-5 sm:p-7">
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-white/70 via-white/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-400/25 rounded-full blur-2xl pointer-events-none" />

        <motion.div
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative z-10 inline-flex p-3 rounded-2xl bg-white/40 border border-white/60 text-pink-500 shadow-md"
        >
          {isSuccess ? (
            <Unlock className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500 animate-bounce" />
          ) : (
            <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-pink-500" />
          )}
        </motion.div>

        <div className="relative z-10 space-y-1">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">
            {isSuccess ? 'PIN Benar!' : 'Masukkan Kode Akses'}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            {isSuccess
              ? 'Membuka gerbang ucapan istimewa...'
              : 'Masukkan 6 angka rahasia untuk melanjutkan.'}
          </p>
        </div>

        <motion.div
          animate={isError ? { x: [-12, 12, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative z-10 flex justify-center items-center gap-3 sm:gap-3"
        >
          {[...Array(6)].map((_, index) => {
            const isFilled = index < pinInput.length;
            return (
              <div
                key={index}
                className={`w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 rounded-full border transition-all duration-300 ${
                  isSuccess
                    ? 'bg-emerald-400 border-emerald-400 shadow-lg shadow-emerald-500/50'
                    : isError
                    ? 'bg-rose-500 border-rose-500 shadow-lg shadow-rose-500/50'
                    : isFilled
                    ? 'bg-pink-500 border-pink-500 shadow-md shadow-pink-500/30 scale-110'
                    : 'bg-white/40 border-slate-300'
                }`}
              />
            );
          })}
        </motion.div>

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex items-center justify-center gap-1.5 text-xs text-rose-500 font-medium"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>PIN Salah, silakan coba lagi!</span>
          </motion.div>
        )}

        <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-2.5 pt-1 max-w-[260px] sm:max-w-[260px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              disabled={isSuccess}
              className="w-14 h-14 sm:w-14 sm:h-14 rounded-xl bg-white/40 border border-white/60 text-slate-800 font-semibold text-lg sm:text-lg hover:bg-white/60 active:scale-95 transition-all flex items-center justify-center mx-auto cursor-pointer disabled:opacity-50"
            >
              {num}
            </button>
          ))}

          <div className="w-14 h-14 sm:w-14 sm:h-14" />

          <button
            onClick={() => handleNumberClick('0')}
            disabled={isSuccess}
            className="w-14 h-14 sm:w-14 sm:h-14 rounded-xl bg-white/40 border border-white/60 text-slate-800 font-semibold text-lg sm:text-lg hover:bg-white/60 active:scale-95 transition-all flex items-center justify-center mx-auto cursor-pointer disabled:opacity-50"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            disabled={isSuccess || pinInput.length === 0}
            className="w-14 h-14 sm:w-14 sm:h-14 rounded-xl bg-white/40 border border-white/60 text-slate-800 font-semibold text-lg sm:text-lg hover:bg-white/60 active:scale-95 transition-all flex items-center justify-center mx-auto cursor"
            aria-label="Hapus satu angka"
          >
            <Delete className="w-5 h-5 sm:w-5 sm:h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}