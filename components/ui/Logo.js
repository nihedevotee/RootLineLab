'use client';

import Link from 'next/link';

export default function Logo({ light = false, className = '' }) {
  const textColor = light ? 'text-white' : 'text-[#0B2A33]';
  const labColor = light ? 'text-[#99CB5B]' : 'text-[#146375]';
  const strokeColor = light ? '#D4EA50' : '#3C8D70';
  const sproutColor = light ? '#99CB5B' : '#146375';

  return (
    <Link
      href="/"
      aria-label="Rootline Lab Home"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-full p-1 transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      {/* Root/Sprout Icon Mark */}
      <span className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#146375] to-[#0B2A33] shadow-sm shadow-[#146375]/20 group-hover:shadow-md group-hover:shadow-[#3C8D70]/30 transition-all duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3"
          aria-hidden="true"
        >
          {/* Main rising root stem */}
          <path
            d="M6 19C8 16 11 14 12 11V4"
            stroke={strokeColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Branching sprout right */}
          <path
            d="M12 11C13.5 9 16 8 18 9"
            stroke={sproutColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle bud on branch */}
          <circle cx="18.5" cy="8.5" r="1.5" fill="#D4EA50" />
          {/* Top bud */}
          <circle cx="12" cy="3.5" r="1.5" fill="#99CB5B" />
        </svg>
      </span>

      {/* Typography: "Rootline" semibold + "Lab" lighter */}
      <span className="text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-200">
        <span className={textColor}>Rootline</span>{' '}
        <span className={`font-light tracking-wide ${labColor}`}>Lab</span>
      </span>
    </Link>
  );
}
