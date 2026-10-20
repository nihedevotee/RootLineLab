'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { siteConfig } from '@/data/site';
import {
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  Terminal,
  Cpu,
} from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;
  const [copied, setCopied] = useState(false);
  const [dhakaTime, setDhakaTime] = useState('8:30 PM');

  // Live Dhaka Time (UTC+6)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setDhakaTime(timeString);
      } catch {
        // Fallback for SSR
        setDhakaTime('8:30 PM');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const techBadges = [
    'Next.js 16',
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Python',
    'Docker',
    'AWS Cloud',
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0E3D47] via-[#0A2D35] to-[#072127] text-[#FBFAF2] pt-16 sm:pt-24 pb-12 overflow-hidden border-t border-[#3C8D70]/40 select-none">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#146375]/35 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#3C8D70]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-[#D4EA50]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. TOP TELEMETRY BAR (Studio pulse & local time) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-12 border-b border-white/10 text-xs font-mono">
          {/* Left: Studio Location & Local Time */}
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4EA50] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4EA50]" />
            </span>
            <span className="text-[#F5EFB3]/90">
              DHAKA STUDIO • {dhakaTime} BST (UTC+6)
            </span>
          </div>

          {/* Middle: Code Ownership Guarantee */}
          <div className="hidden lg:flex items-center gap-2 text-white/70">
            <ShieldCheck className="w-4 h-4 text-[#99CB5B]" />
            <span>100% EXCLUSIVE CODE & IP OWNERSHIP • STRICT NDA</span>
          </div>

          {/* Right: Availability Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C8D70]/20 border border-[#3C8D70]/40 text-[#D4EA50]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4EA50] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase">
              Accepting 2026 Client Projects
            </span>
          </div>
        </div>

        {/* 2. MAIN 5-COLUMN EDITORIAL ARCHITECTURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Studio Overview (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo light />
            <p className="text-[#F5EFB3]/85 text-sm sm:text-base leading-relaxed font-light max-w-sm">
              {siteConfig.tagline} We engineer resilient web applications, custom software, and digital platforms that accelerate modern business growth.
            </p>

            {/* Direct Email Copy & Studio Location */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#F5EFB3]/75">
                <MapPin className="w-4 h-4 text-[#D4EA50] shrink-0" />
                <span>Gulshan Tech Corridor • Dhaka, Bangladesh</span>
              </div>

              {/* Fast Copy Email Widget */}
              <div className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/[0.04] border border-white/10 text-xs">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#146375] text-[#D4EA50]">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <span className="font-mono text-[#F5EFB3]/90 text-[11px]">
                  {siteConfig.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ml-1 p-1 rounded-full hover:bg-white/10 text-[#D4EA50] transition-colors focus:outline-none"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <span className="text-[10px] font-mono text-[#99CB5B] font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Engineered Tech Competencies */}
            <div className="pt-2">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#3C8D70] mb-2.5 font-semibold">
                Core Engineering Stack
              </p>
              <div className="flex flex-wrap gap-1.5 max-w-sm">
                {techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.03] border border-white/10 text-[#F5EFB3]/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Services Column (Col 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#99CB5B] font-semibold">
              <span className="text-[#3C8D70]">01 /</span>
              <span>Services</span>
            </div>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#F5EFB3]/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D70] group-hover:bg-[#D4EA50] transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio & Platforms Column (Col 8-9) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#99CB5B] font-semibold">
              <span className="text-[#3C8D70]">02 /</span>
              <span>Studio</span>
            </div>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#F5EFB3]/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D70] group-hover:bg-[#D4EA50] transition-colors" />
                    <span>{item.name}</span>
                    {item.name === 'Careers' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D4EA50] text-[#146375] uppercase">
                        Hiring
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Consultation Glass Card (Col 10-12) */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent border border-[#3C8D70]/40 backdrop-blur-xl shadow-2xl space-y-5 overflow-hidden group">
              {/* Soft card corner glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4EA50]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4EA50]" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4EA50] font-semibold">
                  Start A Project
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white tracking-tight leading-tight">
                  Have an ambitious software project?
                </h4>
                <p className="text-xs text-[#F5EFB3]/80 leading-relaxed font-light mt-2">
                  Consult directly with our engineering leads to validate technical feasibility, architecture, and timeline.
                </p>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#D4EA50] hover:bg-[#99CB5B] text-[#146375] font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#D4EA50]/20 active:scale-95"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#F5EFB3]/70">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#99CB5B]" />
                  <span>Response: &lt; 24h</span>
                </span>
                <span className="text-[#99CB5B]">NDA by default</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. LOWER ROW: METRICS, LEGAL & COPYRIGHT */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F5EFB3]/75 font-normal">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {currentYear} Rootline Lab Software Ltd. All rights reserved.</p>
            <span className="hidden sm:inline text-[#3C8D70]">•</span>
            <span className="text-white/60">
              Registration: Dhaka, Bangladesh
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono">
            <Link
              href="/contact"
              className="hover:text-[#D4EA50] transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-[#3C8D70]">•</span>
            <Link
              href="/contact"
              className="hover:text-[#D4EA50] transition-colors"
            >
              Terms of Engagement
            </Link>
            <span className="text-[#3C8D70]">•</span>
            <span className="flex items-center gap-1.5 text-[#99CB5B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#99CB5B] animate-pulse" />
              <span>Platform SLA: 99.99%</span>
            </span>
          </div>
        </div>

        {/* 4. MONUMENTAL ARCHITECTURAL WATERMARK */}
        <div className="mt-14 pt-6 flex justify-center overflow-hidden pointer-events-none select-none border-t border-white/[0.06]">
          <span className="text-[12.5vw] font-black tracking-[-0.05em] leading-none bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent bg-clip-text text-transparent uppercase whitespace-nowrap">
            ROOTLINE LAB
          </span>
        </div>
      </div>
    </footer>
  );
}
