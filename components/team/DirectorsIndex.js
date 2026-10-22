'use client';

import { memo, useEffect, useRef, useState } from 'react';
import MemberPlate from '@/components/team/MemberPlate';
import SheetRule from '@/components/team/SheetRule';
import { FOLLOW } from '@/lib/motion';

function DirectorsIndex({ directors, onSelect }) {
  const [previewIndex, setPreviewIndex] = useState(-1);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const motion = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, live: false });

  // Trailing preview plate (mouse only). Lerped position + a lean proportional to velocity.
  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const m = motion.current;

    const tick = () => {
      const dx = m.tx - m.x;
      const dy = m.ty - m.y;
      m.x += dx * (reduce.matches ? 1 : FOLLOW.preview);
      m.y += dy * (reduce.matches ? 1 : FOLLOW.preview);
      const lean = reduce.matches ? 0 : Math.max(-7, Math.min(7, dx * 0.06));
      preview.style.transform = `translate3d(${m.x.toFixed(1)}px, ${m.y.toFixed(1)}px, 0) rotate(${lean.toFixed(2)}deg)`;
      if (m.live || Math.abs(dx) + Math.abs(dy) > 0.5) m.raf = requestAnimationFrame(tick);
      else m.raf = 0;
    };

    // Target = cursor position inside the list, clamped to the names column so the plate never
    // covers the role text; re-derived on scroll so it stays under a stationary cursor.
    const PLATE = { w: 220, h: 300, offsetX: 28, offsetY: -150 };
    const last = { x: 0, y: 0 };
    const retarget = () => {
      const rect = list.getBoundingClientRect();
      const maxX = rect.width * 0.64 - PLATE.w - PLATE.offsetX;
      m.tx = Math.max(0, Math.min(maxX, last.x - rect.left));
      m.ty = Math.max(-PLATE.offsetY, Math.min(rect.height - PLATE.h - PLATE.offsetY, last.y - rect.top));
      if (!m.raf) m.raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      if (!fine.matches || e.pointerType !== 'mouse') return;
      last.x = e.clientX;
      last.y = e.clientY;
      const firstMove = !m.live;
      m.live = true;
      retarget();
      if (firstMove) {
        // Appear at the cursor rather than gliding in from the previous position.
        m.x = m.tx;
        m.y = m.ty;
      }
    };
    const onLeave = () => {
      m.live = false;
    };
    const onScroll = () => {
      if (m.live) retarget();
    };

    list.addEventListener('pointermove', onMove);
    list.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      list.removeEventListener('pointermove', onMove);
      list.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(m.raf);
    };
  }, []);

  return (
    <section
      aria-labelledby="directors-title"
      className="dark-section relative overflow-hidden bg-[#0E3D47] text-[#FBFAF2]"
    >
      <div className="team-columns" aria-hidden="true" />
      <div className="team-shell relative py-24 sm:py-32 lg:py-40">
        <SheetRule
          id="directors-title"
          sheet="Sheets 03–06"
          title="Directors"
          tone="ink"
          note="Four disciplines that turn a plan into running software — and keep it running."
        />

        <div ref={listRef} className="directors relative mt-12 lg:mt-16">
          <ol className="directors-list">
            {directors.map((member, i) => (
              <li
                key={member.slug}
                className="director-row"
                onMouseEnter={() => setPreviewIndex(i)}
                onMouseLeave={() => setPreviewIndex(-1)}
              >
                <span className="director-row__rule sd-draw" aria-hidden="true" />
                <div className="director-row__grid">
                  <span className="team-index">{member.index}</span>
                  <h3 className="director-row__name sd-mask">
                    <span>{member.name}</span>
                  </h3>
                  <p className="director-row__role">
                    <span className="director-row__discipline">{member.discipline}</span>
                    <span className="director-row__title">{member.role}</span>
                  </p>
                  <span className="director-row__code" aria-hidden="true">
                    {member.code}
                  </span>
                </div>
                {/* Stretched control: the whole row opens the profile */}
                <button
                  type="button"
                  className="director-row__open"
                  onClick={() => onSelect(member.slug)}
                  aria-label={`Open profile: ${member.name}, ${member.role}`}
                >
                  <span className="director-row__arrow" aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ol>

          <div
            ref={previewRef}
            className="directors-preview"
            data-visible={previewIndex >= 0 ? 'true' : 'false'}
            aria-hidden="true"
          >
            {directors.map((member, i) => (
              <div key={member.slug} className="directors-preview__layer" data-active={previewIndex === i ? 'true' : 'false'}>
                <MemberPlate member={member} tone="paper" sizes="240px" className="aspect-[4/5]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(DirectorsIndex);
