'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

let lenis = null;

/** The active smooth-scroll instance (null on touch devices, reduced motion, or before mount). */
export const getLenis = () => lenis;

/**
 * Inertial wheel scrolling: each wheel notch sets a target and the page eases toward it with
 * frame-rate independent exponential damping, so a mouse wheel glides instead of stepping.
 * Touch keeps the platform's native momentum, and reduced motion keeps native scrolling.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer = null;

    const mount = () => {
      if (lenis || !fine.matches || reduce.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.11,
        wheelMultiplier: 1,
        anchors: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
      // Scroll locks (menu overlay, modals, profile dialog) hand control back to the native scroller.
      const sync = () => {
        const html = document.documentElement;
        const locked =
          html.classList.contains('rl-scroll-lock') ||
          document.body.style.overflow === 'hidden' ||
          Boolean(document.querySelector('dialog:modal'));
        if (locked && !lenis.isStopped) lenis.stop();
        else if (!locked && lenis.isStopped) lenis.start();
      };
      observer = new MutationObserver(sync);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
      sync();
    };

    const unmount = () => {
      observer?.disconnect();
      observer = null;
      lenis?.destroy();
      lenis = null;
    };

    const update = () => (fine.matches && !reduce.matches ? mount() : unmount());
    update();
    fine.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
      unmount();
    };
  }, []);

  // A new page starts from rest: drop any momentum left over from the previous one.
  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  return null;
}
