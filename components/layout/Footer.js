'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { siteConfig } from '@/data/site';
import {
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer
      id="site-footer"
      className="relative bg-[#FBFAF2] text-[#146375] pt-14 sm:pt-20 pb-10 sm:pb-14 border-t border-[#146375]/15 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Responsive for Mobile (sm) to Desktop (lg/xl) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-[#146375]/15">
          {/* Brand & Studio Overview (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <Logo light={false} />

            <p className="text-sm sm:text-base text-[#146375]/80 leading-relaxed font-normal max-w-md">
              {siteConfig.tagline} We engineer resilient web applications, custom software, and digital platforms that accelerate modern business growth.
            </p>

            {/* Direct Studio Contact Details (No fake neighborhoods, clean Dhaka, Bangladesh) */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#146375]/80 font-medium">
                <MapPin className="w-4 h-4 text-[#3C8D70] shrink-0" />
                <span>{siteConfig.location}</span>
              </div>

              {/* Tap-Friendly One-Click Email Copy Widget */}
              <div className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#EEF3EE] border border-[#146375]/15 text-xs">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-[#146375] text-[#FBFAF2] hover:bg-[#3C8D70] transition-colors"
                  aria-label="Send direct email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-mono text-[#146375] text-xs sm:text-[13px] font-semibold hover:underline"
                >
                  {siteConfig.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ml-1 p-1 rounded-full hover:bg-white text-[#3C8D70] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#146375]"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <span className="text-[11px] font-mono text-[#3C8D70] font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Reassurance Micro-Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3EE] text-[#146375] border border-[#146375]/15 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3C8D70]" />
                100% Client Code Ownership
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3EE] text-[#146375] border border-[#146375]/15 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#3C8D70]" />
                Response &lt; 24h
              </span>
            </div>
          </div>

          {/* Navigation Columns (lg:col-span-4) - Clean 2-column grid on mobile (sm) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
            {/* 01 / Services */}
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-[#3C8D70] font-bold flex items-center gap-1.5">
                <span>01</span>
                <span>/</span>
                <span>Services</span>
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {siteConfig.footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[#146375]/75 hover:text-[#146375] hover:translate-x-0.5 transition-all duration-200 inline-block py-0.5 font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 02 / Company & Resources */}
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-[#3C8D70] font-bold flex items-center gap-1.5">
                <span>02</span>
                <span>/</span>
                <span>Company</span>
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {siteConfig.footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[#146375]/75 hover:text-[#146375] hover:translate-x-0.5 transition-all duration-200 inline-flex items-center gap-1.5 py-0.5 font-medium"
                    >
                      <span>{item.name}</span>
                      {item.name === 'Careers' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D4EA50] text-[#146375] uppercase">
                          Hiring
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blog"
                    className="text-[#146375]/75 hover:text-[#146375] hover:translate-x-0.5 transition-all duration-200 inline-block py-0.5 font-medium"
                  >
                    Engineering Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Inquiry Card (lg:col-span-3) - Compact and clean on sm devices */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white border border-[#146375]/15 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3C8D70]" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#3C8D70] font-semibold">
                  Start A Project
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#146375] tracking-tight leading-snug">
                  Have an ambitious project in mind?
                </h4>
                <p className="text-xs text-[#146375]/75 leading-relaxed font-normal mt-1.5">
                  Schedule a conversation with our engineering leads to discuss your requirements and architecture.
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#146375] hover:bg-[#3C8D70] text-[#FBFAF2] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146375]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 border-t border-[#146375]/10 flex items-center justify-between text-[11px] font-mono text-[#146375]/70">
                <span>Dhaka, Bangladesh</span>
                <span className="text-[#3C8D70] font-semibold">● Live Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Legal, Location, Status - Optimized for small screens */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#146375]/70 text-center sm:text-left">
          <p>© {currentYear} Rootline Lab Software Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span>{siteConfig.location}</span>
            <span className="text-[#3C8D70]">•</span>
            <span className="text-[#3C8D70] font-medium">All systems operational</span>
          </div>
        </div>

        {/* Subtle Architectural Wordmark (Clean & unobtrusive) */}
        <div className="mt-8 sm:mt-12 pt-4 flex justify-center overflow-hidden pointer-events-none select-none">
          <span className="text-[11vw] font-black tracking-[-0.04em] leading-none text-[#146375]/[0.035] uppercase whitespace-nowrap">
            ROOTLINE LAB
          </span>
        </div>
      </div>
    </footer>
  );
}
