'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import MenuOverlay from '@/components/layout/MenuOverlay';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Scroll hide / show and backdrop trigger
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Backdrop blur activation
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (only after scrolling past 80px)
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY.current && !isMenuOpen) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Determine dark mode context for navbar logo / text contrast
  // Home hero is dark, services/about etc have different headers.
  const isDarkHero = pathname === '/' && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled && !isMenuOpen
            ? 'bg-[#FBFAF2]/85 backdrop-blur-md border-b border-[#146375]/10 shadow-xs py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo light={isDarkHero || isMenuOpen} />

          {/* Right Controls: Contact Button + Animated Hamburger Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              href="/contact"
              variant={isDarkHero || isMenuOpen ? 'lime' : 'primary'}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Start a project
            </Button>

            {/* Menu Trigger Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 ${
                isMenuOpen
                  ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-[#D4EA50]'
                  : isDarkHero
                  ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-[#D4EA50]'
                  : 'bg-[#EEF3EE] text-[#0B2A33] hover:bg-[#146375] hover:text-[#FBFAF2] focus-visible:ring-[#146375]'
              }`}
            >
              {/* Animated Hamburger / X lines */}
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 transform origin-center ${
                    isMenuOpen
                      ? 'rotate-45 translate-y-[7px] bg-[#D4EA50]'
                      : 'bg-current'
                  }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-200 ${
                    isMenuOpen ? 'opacity-0 scale-0' : 'bg-current'
                  }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 transform origin-center ${
                    isMenuOpen
                      ? '-rotate-45 -translate-y-[7px] bg-[#D4EA50]'
                      : 'bg-current'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
