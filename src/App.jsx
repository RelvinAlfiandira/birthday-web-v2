import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TransitionProvider } from './context/TransitionContext';

// Import Keempat Halaman
import CountdownPage from './pages/CountdownPage';
import PasswordPage from './pages/PasswordPage';
import WishPage from './pages/WishPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
     <TransitionProvider>
      <Routes>
        <Route path="/" element={<CountdownPage />} />

        <Route path="/unlock" element={<PasswordPage />} />

        <Route path="/wish" element={<WishPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
     </TransitionProvider>
    </BrowserRouter>
  );
}