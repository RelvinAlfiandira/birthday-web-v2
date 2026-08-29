import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { toPng } from 'html-to-image';
import useSequentialTypewriter from '../hooks/useSequentialTypewriter';
import SnowEffect from './SnowEffect';

export default function LetterContent({ title, body, footer, onContinue }) {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { typed, activeIndex, isDone } = useSequentialTypewriter([title, body, footer], {
    speed: 55,
    speedVariance: 35,
    gap: 700,
  });

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = 'surat-ucapan.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mengunduh surat:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden">
      {/* Backdrop: blur + SnowEffect */}
      <div className="absolute inset-0 bg-rose-50 overflow-hidden">
        <div className="absolute inset-0 blur-sm scale-110">
          <SnowEffect />
        </div>
      </div>

      {/* Wrapper scroll — hanya vertikal, tidak pernah horizontal */}
      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md sm:max-w-xl lg:max-w-3xl my-auto"
        >
          <div
            ref={cardRef}
            className="relative rounded-2xl shadow-2xl shadow-pink-500/20 overflow-hidden"
            style={{
              backgroundColor: '#fffdf8',
              backgroundImage: `
                linear-gradient(90deg, transparent 46px, #f3a5b8 46px, #f3a5b8 47px, transparent 47px),
                repeating-linear-gradient(
                  #fffdf8,
                  #fffdf8 31px,
                  #dbe8f4 32px
                )
              `,
              backgroundPosition: '0 8px',
            }}
          >
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.06)]" />

            <div className="relative z-10 p-6 sm:p-10 lg:p-12 pl-14 sm:pl-16 lg:pl-20 pb-10 sm:pb-14 lg:pb-16">
              <h2
                className="font-lora text-xl sm:text-2xl lg:text-3xl font-bold text-rose-900 whitespace-pre-wrap"
                style={{ lineHeight: '32px' }}
              >
                {typed[0]}
                {activeIndex === 0 && <span className="animate-pulse">|</span>}
              </h2>

              {activeIndex >= 1 && (
                <p
                  className="font-lora text-slate-700 text-sm sm:text-base lg:text-lg whitespace-pre-wrap"
                  style={{ lineHeight: '32px', marginTop: '32px' }}
                >
                  {typed[1]}
                  {activeIndex === 1 && <span className="animate-pulse">|</span>}
                </p>
              )}

              {activeIndex >= 2 && (
                <p
                  className="font-lora text-slate-500 text-xs sm:text-sm lg:text-base italic whitespace-pre-wrap"
                  style={{ lineHeight: '32px', marginTop: '64px' }}
                >
                  {typed[2]}
                  {activeIndex === 2 && <span className="animate-pulse">|</span>}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-5 py-2.5 rounded-2xl bg-white/60 border border-white/70 backdrop-blur-md text-rose-700 text-sm font-semibold shadow-md hover:bg-white/80 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Menyimpan...' : 'Unduh Surat'}</span>
            </motion.button>

            {isDone && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onContinue}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold shadow-lg shadow-pink-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}