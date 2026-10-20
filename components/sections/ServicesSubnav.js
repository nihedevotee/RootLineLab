'use client';

import { useState, useEffect } from 'react';
import { services } from '@/data/services';

export default function ServicesSubnav() {
  const [activeId, setActiveId] = useState(services[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = services.length - 1; i >= 0; i--) {
        const el = document.getElementById(services[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(services[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Services sub-navigation"
      className="sticky top-16 z-30 bg-[#FBFAF2]/90 backdrop-blur-md border-y border-[#146375]/15 py-3 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#146375] font-semibold shrink-0 pr-2 hidden sm:inline">
            Jump to:
          </span>
          {services.map((svc) => {
            const isActive = activeId === svc.id;
            return (
              <a
                key={svc.id}
                href={`#${svc.id}`}
                onClick={(e) => scrollToSection(e, svc.id)}
                className={`text-xs whitespace-nowrap px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 font-medium ${
                  isActive
                    ? 'bg-[#146375] text-[#FBFAF2] shadow-xs'
                    : 'text-[#146375]/75 hover:text-[#146375] hover:bg-[#EEF3EE]'
                }`}
              >
                {svc.title}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
