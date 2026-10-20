'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { siteConfig } from '@/data/site';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative bg-gradient-to-b from-[#0E3D47] to-[#0A2D35] text-[#FBFAF2] pt-20 sm:pt-28 pb-12 overflow-hidden border-t border-[#3C8D70]/30 select-none">
      {/* Background soft canopy glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#146375]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3C8D70]/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Logo light />
            <p className="text-[#F5EFB3]/85 text-sm sm:text-base leading-relaxed max-w-sm font-light">
              {siteConfig.tagline} We engineer resilient web applications, custom software, and digital platforms that accelerate modern business growth.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <MapPin className="w-4 h-4 text-[#D4EA50] shrink-0" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#99CB5B] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[#D4EA50] hover:underline font-medium"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#99CB5B] mb-4 font-semibold">
              Services
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {siteConfig.footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#99CB5B] mb-4 font-semibold">
              Company
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {siteConfig.footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#99CB5B] mb-4 font-semibold">
              Resources
            </p>
            <ul className="space-y-2.5 text-sm text-[#F5EFB3]/75">
              {siteConfig.footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4EA50]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lower Row: Legal + Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EFB3]/70">
          <p>© {currentYear} Rootline Lab. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Dhaka, Bangladesh</span>
            <span className="text-[#3C8D70]">•</span>
            <span className="text-[#99CB5B] font-mono">Status: All systems operational</span>
          </div>
        </div>

        {/* Big Faded Wordmark Flourish at the bottom */}
        <div className="mt-12 pt-4 flex justify-center overflow-hidden pointer-events-none select-none">
          <span className="text-[13vw] font-black tracking-tighter leading-none text-white/[0.03] uppercase whitespace-nowrap">
            ROOTLINE LAB
          </span>
        </div>
      </div>
    </footer>
  );
}
