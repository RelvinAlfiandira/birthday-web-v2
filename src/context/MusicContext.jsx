import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const MusicContext = createContext(null);
const STORAGE_KEY = 'birthday-music-unlocked';

export function MusicProvider({ children, src, title = 'Backsound Music', subtitle = 'Special Wish for You' }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // Baca status dari localStorage saat pertama kali komponen dimuat (termasuk setelah refresh)
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const play = () => {
    setIsUnlocked(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay error/blocked:', err);
      });
      setIsPlaying(true);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) pause();
    else play();
  };

  // Kalau sebelumnya sudah pernah "unlock" (dari refresh), coba lanjutkan play otomatis
  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          // Kalau browser tetap memblokir (misal engagement belum cukup), player tetap
          // ditampilkan (isUnlocked true) tapi status isPlaying dibiarkan false —
          // user tinggal klik tombol play manual sekali
          console.log('Autoplay setelah refresh diblokir:', err);
          setIsPlaying(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // cuma dijalankan sekali saat mount

  return (
    <MusicContext.Provider value={{ audioRef, isPlaying, isUnlocked, play, pause, toggle, title, subtitle }}>
      <audio ref={audioRef} src={src} loop />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within a MusicProvider');
  return ctx;
}