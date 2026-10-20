'use client';

import { useReducedMotion } from 'framer-motion';

export default function Marquee({
  items = [],
  speed = 30, // seconds per loop
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();
  const quadrupledItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 select-none ${className}`}
      aria-label="Capabilities marquee"
    >
      {/* Left/Right Edge Gradient Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-inherit to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-inherit to-transparent pointer-events-none" />

      <div
        className="flex whitespace-nowrap gap-8 sm:gap-12 w-max"
        style={{
          animation: shouldReduceMotion ? 'none' : `marquee ${speed}s linear infinite`,
        }}
      >
        {quadrupledItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-3 text-sm sm:text-base font-medium tracking-wide uppercase text-neutral-400 group hover:text-white transition-colors duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D70]" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
