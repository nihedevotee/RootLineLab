'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';

// ── ?member= deep link, kept in sync with Back/Forward ────────────────────────
const urlListeners = new Set();

function subscribeUrl(callback) {
  urlListeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    urlListeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

const readMember = () => new URLSearchParams(window.location.search).get('member');
const notifyUrl = () => urlListeners.forEach((listener) => listener());

export function useMemberParam(isValid) {
  const raw = useSyncExternalStore(subscribeUrl, readMember, () => null);
  const pushed = useRef(false);
  const slug = raw && isValid(raw) ? raw : null;

  const open = useCallback(
    (next) => {
      const url = new URL(window.location.href);
      url.searchParams.set('member', next);
      if (readMember()) {
        window.history.replaceState(window.history.state, '', url);
      } else {
        window.history.pushState(window.history.state, '', url);
        pushed.current = true;
      }
      notifyUrl();
    },
    []
  );

  const close = useCallback(() => {
    if (pushed.current) {
      // We added the history entry, so leaving the profile is a real Back step.
      pushed.current = false;
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('member');
    window.history.replaceState(window.history.state, '', url);
    notifyUrl();
  }, []);

  return { slug, open, close };
}

// ── Media queries / capabilities ──────────────────────────────────────────────
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

let webglSupport;
function detectWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement('canvas');
      webglSupport = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

export function useWebGLSupport() {
  return useSyncExternalStore(
    () => () => {},
    detectWebGL,
    () => false
  );
}

/**
 * Rendering tier for the hero, from real capability signals rather than screen width:
 *   'svg'     — no WebGL, Data Saver / 2G, or a low-memory / low-core device
 *   'gl-lite' — WebGL on touch-first devices: capped DPR, render-on-demand, touch gestures
 *   'gl'      — WebGL with a fine pointer: full DPR, cursor parallax, idle drift
 *   'pending' — server render / before hydration
 */
function readRenderTier() {
  if (!detectWebGL()) return 'svg';
  const nav = window.navigator;
  const conn = nav.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return 'svg';
  if ((nav.deviceMemory && nav.deviceMemory < 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency < 4)) return 'svg';
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches ? 'gl' : 'gl-lite';
}

export function useRenderTier() {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    readRenderTier,
    () => 'pending'
  );
}

/** True only after hydration — lets us skip rendering capability-dependent visuals on the server. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
