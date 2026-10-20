'use client';

import { motion, useReducedMotion } from 'framer-motion';
import BrowserMockup from '@/components/mockups/BrowserMockup';
import PhoneMockup from '@/components/mockups/PhoneMockup';
import DashboardMockup from '@/components/mockups/DashboardMockup';

export default function HeroCluster() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16 lg:mt-20 select-none">
      {/* Background Soft Glow Blobs */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[300px] bg-gradient-to-r from-[#146375]/30 via-[#3C8D70]/25 to-[#D4EA50]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Cluster Grid Layout */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8">
        {/* Main Center Dashboard / Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[65%] z-10"
        >
          <BrowserMockup
            url="https://rootlinelab.com/cloud-platform"
            title="Enterprise Cloud Platform"
          />
        </motion.div>

        {/* Floating Mobile Phone Mockup Overlaying */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: shouldReduceMotion ? 0 : [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            scale: { duration: 0.8, delay: 0.4 },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="relative lg:absolute lg:-right-6 lg:-bottom-10 z-20 shrink-0"
        >
          <PhoneMockup appName="Rootline Hub" />
        </motion.div>
      </div>

      {/* Floating Status Pill Floating Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="hidden md:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0E3D47]/90 border border-[#3C8D70]/40 shadow-xl backdrop-blur-md text-xs text-white absolute -bottom-6 left-4 z-30"
      >
        <span className="w-2 h-2 rounded-full bg-[#D4EA50] animate-ping" />
        <span className="font-mono text-[#F5EFB3]/90">Continuous deployment pipeline active</span>
      </motion.div>
    </div>
  );
}
