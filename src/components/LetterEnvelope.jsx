import React from 'react';
import { motion } from 'framer-motion';

export default function LetterEnvelope({ isOpen, onClick, closedSrc, openSrc, size = 220 }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isOpen}
      aria-label="Buka surat"
      className="cursor-pointer relative"
      whileTap={{ scale: isOpen ? 1 : 0.95 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={!isOpen ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 1.4, repeat: isOpen ? 0 : Infinity, ease: 'easeInOut' }}
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-white/70 via-white/20 to-transparent rounded-full blur-xl pointer-events-none" />

        <motion.img
          key={isOpen ? 'open' : 'closed'}
          src={isOpen ? openSrc : closedSrc}
          alt="Surat"
          initial={{ opacity: 0, rotateY: isOpen ? -90 : 0, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </motion.div>
    </motion.button>
  );
}