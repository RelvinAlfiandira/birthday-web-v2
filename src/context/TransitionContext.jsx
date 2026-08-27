import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionContext = createContext(null);

const EASE = [0.83, 0, 0.17, 1];

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle'); 

  const transitionTo = useCallback((path) => {
    setPhase('closing');
    setPendingPath(path);
  }, []);

  const [pendingPath, setPendingPath] = useState(null);

  const handleClosed = () => {
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
    setPhase('opening');
  };

  const handleOpened = () => {
    setPhase('idle');
  };

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}

      <AnimatePresence>
        {phase === 'closing' && (
          <div className="fixed inset-0 z-[999] flex">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              onAnimationComplete={handleClosed}
              className="w-1/2 h-full bg-gradient-to-br from-pink-100 via-rose-200 to-rose-300"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-1/2 h-full bg-gradient-to-bl from-pink-100 via-rose-200 to-rose-300"
            />
          </div>
        )}

        {phase === 'opening' && (
          <div className="fixed inset-0 z-[999] flex">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: EASE }}
              onAnimationComplete={handleOpened}
              className="w-1/2 h-full bg-gradient-to-br from-pink-100 via-rose-200 to-rose-300"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-1/2 h-full bg-gradient-to-bl from-pink-100 via-rose-200 to-rose-300"
            />
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition harus dipakai di dalam TransitionProvider');
  return ctx;
}