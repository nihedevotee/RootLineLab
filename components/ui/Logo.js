'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ light = false, className = '', height = 38 }) {
  const logoSrc = light ? '/logo-dark.png' : '/logo-light.png';
  const width = Math.round(height * (890 / 263)); // Preserve aspect ratio

  return (
    <Link
      href="/"
      aria-label="Rootline Lab Home"
      className={`inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4EA50] rounded-xl p-1 transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      <Image
        src={logoSrc}
        alt="Rootline Lab"
        width={width}
        height={height}
        priority
        className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-200"
      />
    </Link>
  );
}
