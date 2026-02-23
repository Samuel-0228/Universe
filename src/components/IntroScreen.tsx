import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="relative flex items-center justify-center w-80 h-80">
        {/* Solar Rotation Simulation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-blue-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-gold-500/10 rounded-full"
        />
        
        {/* Emblem */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 w-40 h-40 bg-contain bg-center bg-no-repeat shadow-[0_0_50px_rgba(30,58,138,0.5)] rounded-full border-2 border-blue-900/30"
          style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/47a915ec-86af-4b0e-937c-242f75156964/aau-emblem-9abfa81a-1771847863737.webp')` }}
        />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-center mt-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white mb-2">
          Savvy-AAU
        </h1>
        <p className="text-blue-400 font-light tracking-widest text-sm uppercase">
          The Digital Infrastructure of Addis Ababa University
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ delay: 3, duration: 1.5, repeat: 0 }}
        className="absolute bottom-10 text-xs text-gray-500"
      >
        Initializing Institutional Protocols...
      </motion.div>
    </motion.div>
  );
};