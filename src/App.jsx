import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransitionProvider } from './context/TransitionContext';
import { MusicProvider } from './context/MusicContext';
import MusicPlayer from './components/MusicPlayer';
import { ucapanData } from './data/ucapanData';

import CountdownPage from './pages/CountdownPage';
import PasswordPage from './pages/PasswordPage';
import WishPage from './pages/WishPage';
import HomePage from './pages/HomePage';

function GlobalMusicPlayer() {
  const location = useLocation();
  const showPlayer = location.pathname === '/wish' || location.pathname === '/home';

  if (!showPlayer) return null;
  return <MusicPlayer />;
}

export default function App() {
  return (
    <BrowserRouter>
      <MusicProvider 
      src={ucapanData.musikUrl}
      title="Risk It All"
      subtitle="Bruno Mars">
        <TransitionProvider>
          <Routes>
            <Route path="/" element={<CountdownPage />} />
            <Route path="/unlock" element={<PasswordPage />} />
            <Route path="/wish" element={<WishPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <GlobalMusicPlayer />
        </TransitionProvider>
      </MusicProvider>
    </BrowserRouter>
  );
}