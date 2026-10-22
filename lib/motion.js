// Motion tokens for the team experience — the single source the JS layers read from.
// The CSS layer mirrors these as custom properties in app/team-experience.css (:root).
//
// Layers, cheapest first:
//   1. CSS        — entrances, scroll-driven reveals, hover. Transform/opacity only (compositor).
//   2. WebGL      — the root system (RootSystemCanvas). One rAF loop, render-on-demand when still.
//   3. rAF / JS   — pointer-following only (directors preview), stopped when idle.
// framer-motion stays reserved for the rest of the site; nothing here needs per-frame React work.

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1], // --ease-out-expo — every entrance and hover
  inOutQuart: [0.76, 0, 0.24, 1], // --ease-in-out-quart — the profile wipe
};

export const DURATION = {
  fast: 0.35, // --dur-fast — colour, opacity
  base: 0.7, // --dur-base — movement
  slow: 1.15, // --dur-slow — display type
};

/** Per-frame lerp factors (fraction of remaining distance per frame at 60fps). */
export const FOLLOW = {
  parallax: 0.045, // 3D tilt toward the cursor
  preview: 0.14, // trailing preview plate in the directors index
};

export const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
