'use client';

import { memo, useEffect, useRef, useState } from 'react';
import MemberPlate from '@/components/team/MemberPlate';
import { publicLinks } from '@/data/team';
import { siteConfig } from '@/data/site';
import { prefersReducedMotion } from '@/lib/motion';

const LINK_LABEL = { email: 'Email', linkedin: 'LinkedIn', portfolio: 'Portfolio', github: 'GitHub' };
const DISMISS_DISTANCE = 120; // px dragged down before release closes the sheet
const DISMISS_VELOCITY = 0.6; // px/ms flick that closes regardless of distance
const SWIPE_DISTANCE = 70; // px horizontal swipe that pages to the next/previous member

const isSheetLayout = () => window.matchMedia('(max-width: 767px)').matches;

function ProfileDialog({ member, members, onClose, onSelect }) {
  const dialogRef = useRef(null);
  const bodyRef = useRef(null);
  const returnFocus = useRef(null);
  // Keep the last member rendered while the sheet animates closed.
  const [shown, setShown] = useState(member);
  if (member && member !== shown) setShown(member);

  const position = shown ? members.findIndex((m) => m.slug === shown.slug) : -1;
  const prev = position >= 0 ? members[(position - 1 + members.length) % members.length] : null;
  const next = position >= 0 ? members[(position + 1) % members.length] : null;
  const links = shown ? publicLinks(shown) : [];

  // Open with showModal (focus containment + inert page); close via an animated hand-off
  // that waits for the transform to finish, so every browser gets the same exit.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (member) {
      delete dialog.dataset.closing;
      if (!dialog.open) {
        returnFocus.current = document.activeElement;
        document.documentElement.classList.add('rl-scroll-lock');
        dialog.showModal();
      }
      return;
    }
    if (!dialog.open) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      dialog.removeEventListener('transitionend', onEnd);
      clearTimeout(timer);
      dialog.close();
      document.documentElement.classList.remove('rl-scroll-lock');
      delete dialog.dataset.closing;
      dialog.style.transform = '';
      const target = returnFocus.current;
      if (target && typeof target.focus === 'function' && document.contains(target)) {
        target.focus({ preventScroll: true });
      }
    };
    const onEnd = (e) => {
      if (e.target === dialog && e.propertyName === 'transform') finish();
    };
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    dialog.dataset.closing = 'true';
    dialog.addEventListener('transitionend', onEnd);
    const timer = setTimeout(finish, 900);
    return () => {
      dialog.removeEventListener('transitionend', onEnd);
      clearTimeout(timer);
    };
  }, [member]);

  // Never leave the page scroll-locked if the experience unmounts with the sheet open.
  useEffect(() => () => document.documentElement.classList.remove('rl-scroll-lock'), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e) => {
      // Route Escape through the same close path as the button so the URL stays in sync.
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, [onClose]);

  // Bottom-sheet gestures (phones): drag the grab bar down to dismiss.
  const grabDrag = useRef(null);
  const onGrabDown = (e) => {
    if (!isSheetLayout() || e.button > 0 || e.target.closest('button')) return;
    grabDrag.current = { id: e.pointerId, y: e.clientY, t: performance.now(), dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    dialogRef.current.dataset.dragging = 'true';
  };
  const onGrabMove = (e) => {
    const g = grabDrag.current;
    if (!g || g.id !== e.pointerId) return;
    g.dy = Math.max(0, e.clientY - g.y);
    dialogRef.current.style.transform = `translate3d(0, ${g.dy}px, 0)`;
  };
  const onGrabUp = (e) => {
    const g = grabDrag.current;
    if (!g || g.id !== e.pointerId) return;
    grabDrag.current = null;
    const dialog = dialogRef.current;
    const velocity = g.dy / Math.max(performance.now() - g.t, 1);
    delete dialog.dataset.dragging;
    if (g.dy > DISMISS_DISTANCE || velocity > DISMISS_VELOCITY) {
      // Start the exit from where the finger let go, then sync the URL.
      dialog.dataset.closing = 'true';
      dialog.style.transform = '';
      onClose();
    } else {
      dialog.style.transform = ''; // springs back via the CSS transition
    }
  };

  // Horizontal swipe on the sheet body pages between members (phones).
  const swipe = useRef(null);
  const onBodyDown = (e) => {
    if (!isSheetLayout() || e.pointerType === 'mouse') return;
    swipe.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, horizontal: null };
  };
  const onBodyMove = (e) => {
    const s = swipe.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (s.horizontal === null && Math.abs(dx) + Math.abs(dy) > 10) s.horizontal = Math.abs(dx) > Math.abs(dy) * 1.4;
    if (!s.horizontal) return;
    s.dx = dx;
    bodyRef.current.dataset.swiping = 'true';
    for (const child of bodyRef.current.children) child.style.transform = `translate3d(${dx * 0.35}px, 0, 0)`;
  };
  const onBodyUp = (e) => {
    const s = swipe.current;
    if (!s || s.id !== e.pointerId) return;
    swipe.current = null;
    const body = bodyRef.current;
    delete body.dataset.swiping;
    for (const child of body.children) child.style.transform = '';
    if (s.horizontal && Math.abs(s.dx) > SWIPE_DISTANCE) onSelect((s.dx < 0 ? next : prev).slug);
  };

  return (
    <dialog
      ref={dialogRef}
      className="profile-dialog"
      aria-labelledby="profile-name"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {shown && (
        <div className="profile-sheet">
          <div
            className="profile-sheet__grab"
            onPointerDown={onGrabDown}
            onPointerMove={onGrabMove}
            onPointerUp={onGrabUp}
            onPointerCancel={onGrabUp}
          >
            <span className="profile-sheet__handle" aria-hidden="true" />
            <header className="profile-sheet__bar">
              <span className="team-meta">
                Sheet {shown.index} / {String(members.length).padStart(2, '0')} · {shown.code}
              </span>
              <button type="button" onClick={onClose} className="profile-close" autoFocus>
                <span>Close</span>
                <span aria-hidden="true" className="profile-close__x" />
              </button>
            </header>
          </div>

          <div key={shown.slug} className="profile-sheet__content">
            <div
              ref={bodyRef}
              className="profile-sheet__body"
              onPointerDown={onBodyDown}
              onPointerMove={onBodyMove}
              onPointerUp={onBodyUp}
              onPointerCancel={onBodyUp}
            >
              <MemberPlate member={shown} animate sizes="(min-width: 768px) 320px, 80vw" className="profile-sheet__plate aspect-[4/5]" />

              <div className="profile-sheet__text">
                <p className="team-meta text-[#3C8D70] stagger" style={{ '--i': 0 }}>
                  {shown.discipline}
                </p>
                <h2 id="profile-name" className="profile-sheet__name mask-line" style={{ '--i': 1 }}>
                  <span>{shown.name}</span>
                </h2>
                <p className="profile-sheet__role stagger" style={{ '--i': 2 }}>
                  {shown.role}
                </p>
                {shown.bio && (
                  <p className="profile-sheet__bio stagger" style={{ '--i': 3 }}>
                    {shown.bio}
                  </p>
                )}

                <div className="profile-links stagger" style={{ '--i': 4 }}>
                  {links.length > 0 ? (
                    <ul>
                      {links.map((link) => {
                        const external = link.kind !== 'email';
                        return (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              className="profile-link"
                              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              <span className="profile-link__kind">{LINK_LABEL[link.kind]}</span>
                              <span className="profile-link__value">
                                {link.kind === 'email' ? link.label : link.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                              </span>
                              <span className="profile-link__arrow" aria-hidden="true">
                                {external ? '↗' : '→'}
                              </span>
                              {external && <span className="sr-only">(opens in a new tab)</span>}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="profile-links__studio">
                      Reach {shown.shortName || shown.name} through the studio at{' '}
                      <a href={`mailto:${siteConfig.email}`} className="profile-inline-link">
                        {siteConfig.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>
            </div>

            <nav className="profile-sheet__pager" aria-label="Other team members">
              {prev && (
                <button type="button" onClick={() => onSelect(prev.slug)} className="profile-step">
                  <span className="team-meta">← {prev.index}</span>
                  <span>{prev.shortName || prev.name}</span>
                </button>
              )}
              {next && (
                <button type="button" onClick={() => onSelect(next.slug)} className="profile-step profile-step--next">
                  <span className="team-meta">{next.index} →</span>
                  <span>{next.shortName || next.name}</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default memo(ProfileDialog);
