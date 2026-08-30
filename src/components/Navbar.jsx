import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Image as ImageIcon } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'wish', label: 'Ucapan', icon: Heart },
  { id: 'gallery', label: 'Galeri', icon: ImageIcon },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/25 backdrop-blur-2xl border border-white/50 shadow-xl shadow-pink-500/15">
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                isActive ? 'text-white' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-active-pill"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-md shadow-pink-500/40"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}