import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function UnlockedCard({ onContinue}) {
    return (
        <motion.div
        key="unlocked"
        initial={{ opacity:0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{duration: 0.5}}
        className="relative text-center space-y-6 bg-white/20 border border-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-pink-500/10 overflow-hidden"
        >
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-white/70 via-white/20 to-transparent rounded-full blur-2xl pointer-events-none"/>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-40/25 rounded-full blur-2xl pointer-events-none"/>


            <div className="relative z-10 space-y-2">
                <h2 className="text-2xl font-lora font-bold text-rose-800">Waktunya Tiba!</h2>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Hari yang ditunggu-tunggu telah tiba! Silahkan klik tombol lanjut untuk melihat ucapan istimewa.
                </p>
            </div>

            <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="relative z-10 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
                <span>Lanjut</span>
                <ArrowRight size={20} className="w-4 h-4" />
            </motion.button>
        </motion.div>
    )
}