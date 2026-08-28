import React from "react";
import { motion } from "framer-motion";

export default function GiftBox({ isOpen, onClick, size = 160 }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isOpen}
      aria-label="Buka kotak hadiah"
      className="cursor-pointer"
      whileTap={{ scale: isOpen ? 1 : 0.95 }}
    >
      <motion.div
        animate={!isOpen ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 1.4, repeat: isOpen ? 0 : Infinity, ease: "easeInOut" }}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="boxBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow saat kotak terbuka */}
          <motion.circle
            cx="100"
            cy="95"
            r="10"
            fill="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isOpen ? { scale: 6, opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Badan Kotak */}
          <rect x="35" y="95" width="130" height="80" rx="10" fill="url(#boxBody)" />
          <rect x="90" y="95" width="20" height="80" fill="#fecdd3" opacity="0.85" />

          {/* Tutup Kotak — hinge di tepi bawah tutup (y=102) */}
          <motion.g
            style={{ transformOrigin: "100px 102px" }}
            animate={{ rotate: isOpen ? -100 : 0, y: isOpen ? -6 : 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
          >
            <rect x="30" y="78" width="140" height="24" rx="8" fill="url(#lidGrad)" />
            <rect x="90" y="78" width="20" height="24" fill="#fecdd3" opacity="0.85" />
            {/* Pita di atas tutup */}
            <path
              d="M100 78 C85 60, 60 62, 70 78 C60 62, 90 55, 100 78 C110 55, 140 62, 130 78 C140 62, 115 60, 100 78 Z"
              fill="#fda4af"
              stroke="#fb7185"
              strokeWidth="2"
            />
          </motion.g>
        </svg>
      </motion.div>
    </motion.button>
  );
}