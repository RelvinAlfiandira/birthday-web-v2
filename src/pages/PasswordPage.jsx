import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Unlock, Delete, ArrowLeft, ShieldAlert } from 'lucide-react';
import { ucapanData } from '../data/ucapanData';

export default function PasswordPage() {
  const navigate = useNavigate();
  const [pinInput, setPinInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fungsi saat tombol angka diklik
  const handleNumberClick = (num) => {
    if (pinInput.length < 6 && !isSuccess) {
      const newPin = pinInput + num;
      setPinInput(newPin);
      setIsError(false);

      // Jika sudah terisi 6 angka, validasi PIN
      if (newPin.length === 6) {
        validatePin(newPin);
      }
    }
  };

  // Fungsi hapus angka terakhir
  const handleDelete = () => {
    if (!isSuccess) {
      setPinInput((prev) => prev.slice(0, -1));
      setIsError(false);
    }
  };

  // Validasi PIN
  const validatePin = (input) => {
    if (input === ucapanData.pin) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/wish');
      }, 1000); // Tunda 1 detik agar animasi sukses terlihat
    } else {
      setIsError(true);
      setTimeout(() => {
        setPinInput('');
      }, 600); // Reset input setelah efek shake
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 relative overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Back Button */}
      <header className="w-full max-w-md flex items-center justify-between pt-4 z-10">
        <button
          onClick={() => navigate('/')}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all cursor-pointer"
          aria-label="Kembali ke halaman countdown"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          Step 2 of 4
        </span>
      </header>

      {/* PIN Card Section */}
      <section className="w-full max-w-sm my-auto z-10 space-y-8 text-center">
        {/* Lock / Unlock Icon Container */}
        <motion.div
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="inline-flex p-4 rounded-3xl bg-slate-900 border border-slate-800 text-pink-400 shadow-xl"
        >
          {isSuccess ? (
            <Unlock className="w-10 h-10 text-emerald-400 animate-bounce" />
          ) : (
            <Lock className="w-10 h-10 text-pink-400" />
          )}
        </motion.div>

        {/* Title & Instructions */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            {isSuccess ? 'PIN Benar!' : 'Masukkan Kode Akses'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {isSuccess
              ? 'Membuka gerbang ucapan istimewa...'
              : 'Masukkan 6 angka rahasia untuk melanjutkan.'}
          </p>
        </div>

        {/* 6-Digit PIN Indicators */}
        <motion.div
          animate={isError ? { x: [-12, 12, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex justify-center items-center gap-3"
        >
          {[...Array(6)].map((_, index) => {
            const isFilled = index < pinInput.length;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                  isSuccess
                    ? 'bg-emerald-400 border-emerald-400 shadow-lg shadow-emerald-500/50'
                    : isError
                    ? 'bg-rose-500 border-rose-500 shadow-lg shadow-rose-500/50'
                    : isFilled
                    ? 'bg-pink-500 border-pink-500 shadow-md shadow-pink-500/30 scale-110'
                    : 'bg-slate-900 border-slate-700'
                }`}
              />
            );
          })}
        </motion.div>

        {/* Error Feedback Message */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>PIN Salah, silakan coba lagi!</span>
          </motion.div>
        )}

        {/* Digital Numpad Grid */}
        <div className="grid grid-cols-3 gap-3 pt-2 max-w-[280px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              disabled={isSuccess}
              className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100 font-semibold text-xl hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all flex items-center justify-center mx-auto cursor-pointer disabled:opacity-50"
            >
              {num}
            </button>
          ))}

          {/* Empty Space for Grid Balancing */}
          <div className="w-16 h-16" />

          {/* Digit 0 */}
          <button
            onClick={() => handleNumberClick('0')}
            disabled={isSuccess}
            className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100 font-semibold text-xl hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all flex items-center justify-center mx-auto cursor-pointer disabled:opacity-50"
          >
            0
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isSuccess || pinInput.length === 0}
            className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all flex items-center justify-center mx-auto cursor-pointer disabled:opacity-30"
            aria-label="Hapus satu angka"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer Hint */}
      <footer className="pb-6 text-center z-10">
        <p className="text-xs text-slate-600">
          Hint: Tanggal lahir / Hari spesial ({ucapanData.pin})
        </p>
      </footer>
    </main>
  );
}