'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/site';
import { APPLE_EASE } from '@/lib/animations';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

export default function MenuOverlay({ isOpen, onClose }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      // Focus first link in overlay
      setTimeout(() => {
        if (overlayRef.current) {
          const firstLink = overlayRef.current.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      }, 100);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const overlayVariants = {
    closed: {
      opacity: 0,
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      transition: { duration: 0.5, ease: APPLE_EASE },
    },
    open: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { duration: 0.6, ease: APPLE_EASE },
    },
  };

  const navListVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, x: -30 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: APPLE_EASE },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-40 bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] flex flex-col justify-between overflow-y-auto overscroll-contain pt-24 pb-8 px-6 sm:px-12 lg:px-20"
        >
          {/* Main Content: Left Navigation Links & Right Info Panel */}
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-auto">
            {/* 10 Links Staggered */}
            <motion.nav
              variants={navListVariants}
              initial="closed"
              animate="open"
              className="lg:col-span-8 flex flex-col space-y-1 sm:space-y-2"
              aria-label="Main menu links"
            >
              {siteConfig.navLinks.map((item, index) => {
                const isActive = pathname === item.href;
                const isAnyHovered = hoveredIndex !== null;
                const isCurrentHovered = hoveredIndex === index;

                return (
                  <motion.div key={item.href} variants={navItemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`group flex items-baseline gap-4 sm:gap-6 py-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4EA50] rounded-xl ${
                        isAnyHovered && !isCurrentHovered ? 'opacity-35' : 'opacity-100'
                      }`}
                    >
                      {/* Index Number (01-10) */}
                      <span className="font-mono text-xs sm:text-sm tracking-widest text-[#99CB5B] group-hover:text-[#D4EA50] transition-colors duration-200">
                        {item.index}
                      </span>

                      {/* Link Title */}
                      <span
                        className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-300 transform group-hover:translate-x-3 sm:group-hover:translate-x-5 ${
                          isActive
                            ? 'text-[#D4EA50] underline decoration-[#99CB5B] decoration-2 underline-offset-8'
                            : 'text-white group-hover:text-[#D4EA50]'
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Subtle Arrow on hover */}
                      <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#D4EA50] -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Right Side / Mobile Bottom Panel */}
            <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-[#99CB5B] mb-2 font-semibold">
                  About the Studio
                </p>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                  {siteConfig.tagline}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4EA50] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono text-neutral-400">Headquarters</p>
                    <p className="text-sm font-semibold text-white">{siteConfig.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#99CB5B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono text-neutral-400">Direct Inquiries</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-[#D4EA50] hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <p className="text-xs font-mono text-[#D4EA50]">Got a project in mind?</p>
                <p className="text-xs text-neutral-300">
                  We schedule complimentary discovery sessions to review technical architectures.
                </p>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-[#146375] text-[#FBFAF2] hover:bg-[#3C8D70] transition-colors"
                >
                  Book Discovery Call
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar in Overlay */}
          <div className="max-w-7xl w-full mx-auto border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400 gap-3">
            <span>© 2026 Rootline Lab Software Ltd.</span>
            <span className="font-mono text-[#99CB5B]">Dhaka — Global Delivery</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
