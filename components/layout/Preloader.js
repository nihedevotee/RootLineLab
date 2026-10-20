'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion or has visited during this session, skip
    if (shouldReduceMotion) return;

    try {
      const hasSeen = sessionStorage.getItem('rootline_preloader_seen');
      if (hasSeen) return;
    } catch {
      // sessionStorage unavailable
      return;
    }

    const startTimer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    const startTime = Date.now();
    const duration = 1200; // ~1.2s

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          try {
            sessionStorage.setItem('rootline_preloader_seen', 'true');
          } catch {
            // ignore
          }
        }, 300);
      }
    }, 25);

    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [shouldReduceMotion]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-[100] bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] flex flex-col justify-between p-8 sm:p-12 pointer-events-none select-none"
      >
        {/* Top brand mark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4EA50] animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              Rootline Lab Initialization
            </span>
          </div>
          <span className="text-xs font-mono text-[#99CB5B]">Dhaka, BD</span>
        </div>

        {/* Center Logo & Progress */}
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-2 rounded-3xl bg-[#146375]/30 border border-[#3C8D70]/40 shadow-xl">
            <Image
              src="/icon-192.png"
              alt="Rootline Lab"
              width={72}
              height={72}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Rootline <span className="font-light text-[#99CB5B]">Lab</span>
          </h1>

          {/* Progress bar and counter */}
          <div className="w-64 mx-auto space-y-2">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#146375] via-[#3C8D70] to-[#D4EA50]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-neutral-400">
              <span>Smart Software</span>
              <span className="text-[#D4EA50] font-semibold">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright note */}
        <div className="text-center text-[11px] text-neutral-500 font-mono">
          Building smart software for modern businesses.
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
