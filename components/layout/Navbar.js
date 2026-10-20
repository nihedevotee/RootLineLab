'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import MenuOverlay from '@/components/layout/MenuOverlay';

const navItems = [
  { name: 'Home', href: '/', index: '01' },
  { name: 'Services', href: '/services', index: '02' },
  { name: 'Solutions', href: '/solutions', index: '03' },
  { name: 'Products', href: '/products', index: '04' },
  { name: 'Industries', href: '/industries', index: '05' },
  { name: 'Case Studies', href: '/case-studies', index: '06' },
  { name: 'About', href: '/about', index: '07' },
  { name: 'Blog', href: '/blog', index: '08' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Scroll hide / show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up (after scrolling past 100px)
      if (currentScrollY > 100) {
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

  return (
    <>
      <header
        className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        {/* Floating Translucent Pill Container */}
        <div className="relative flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#146375]/85 hover:bg-[#146375]/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-[#0E3D47]/40 transition-colors duration-300 select-none">
          {/* Left: Official Logo */}
          <div className="shrink-0 pl-1">
            <Logo light height={32} />
          </div>

          {/* Center: Desktop Navigation Links with Active White Pill Capsule */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 mx-2"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return isActive ? (
                <span
                  key={item.href}
                  className="flex items-center gap-1.5 bg-[#FBFAF2] text-[#146375] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  <span className="text-[10px] text-[#3C8D70] font-mono font-medium">
                    {item.index}
                  </span>
                  <span className="border-b-2 border-[#146375] pb-0.5">
                    {item.name}
                  </span>
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/85 hover:text-white text-xs xl:text-[13px] font-medium px-2.5 xl:px-3 py-1.5 rounded-full transition-colors duration-200 hover:bg-white/10 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Contact White Pill Button + Hamburger Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pr-1">
            {/* White Pill Button (Like 'Resume' button in reference) */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#FBFAF2] text-[#146375] hover:bg-[#D4EA50] hover:text-[#146375] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4EA50]"
            >
              Contact
            </Link>

            {/* Menu Button (Hamburger to X) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Close full menu' : 'Open full menu'}
              aria-expanded={isMenuOpen}
              className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4EA50] ${
                isMenuOpen
                  ? 'bg-white/20 text-[#D4EA50]'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <div className="w-4 h-3.5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 transform origin-center ${
                    isMenuOpen
                      ? 'rotate-45 translate-y-[6px] bg-[#D4EA50]'
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
                      ? '-rotate-45 -translate-y-[6px] bg-[#D4EA50]'
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
