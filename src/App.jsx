import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Keempat Halaman
import CountdownPage from './pages/CountdownPage';
import PasswordPage from './pages/PasswordPage';
import WishPage from './pages/WishPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman 1: Hitung Mundur */}
        <Route path="/" element={<CountdownPage />} />

        {/* Halaman 2: Input PIN 6 Angka */}
        <Route path="/unlock" element={<PasswordPage />} />

        {/* Halaman 3: Kartu Ucapan & Confetti */}
        <Route path="/wish" element={<WishPage />} />

        {/* Halaman 4: Navbar, Hero, & Galeri Foto */}
        <Route path="/home" element={<HomePage />} />

        {/* Fallback Route: Redirect URL yang tidak dikenal kembali ke Halaman Utama */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}