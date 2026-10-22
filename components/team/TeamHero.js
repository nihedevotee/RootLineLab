'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import RootSystemSVG from '@/components/team/RootSystemSVG';
import { useMediaQuery, useRenderTier } from '@/components/team/useTeamState';

const RootSystemCanvas = dynamic(() => import('@/components/team/RootSystemCanvas'), { ssr: false });

const headline = ['The people', 'behind the', 'systems'];

export default function TeamHero({ members, activeIndex, onHover, onSelect }) {
  const tier = useRenderTier();
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [glFailed, setGlFailed] = useState(false);

  const hydrated = tier !== 'pending';
  const useGL = (tier === 'gl' || tier === 'gl-lite') && !glFailed && !reducedMotion;

  return (
    <section
      aria-labelledby="team-title"
      className="team-hero dark-section relative isolate overflow-hidden bg-[#0E3D47] text-[#FBFAF2]"
    >
      <div className="team-columns" aria-hidden="true" />

      <div className="team-shell relative grid min-h-[100svh] grid-cols-1 content-end pt-28 pb-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:content-stretch lg:pt-32">
        {/* Sheet header */}
        <div className="team-meta col-span-full mb-auto flex items-center justify-between border-b border-white/15 pb-3">
          <span>Sheet 00 — Leadership</span>
          <span className="hidden sm:inline">Rootline Lab drawing set</span>
          <span>06 sheets</span>
        </div>

        {/* Root system visual */}
        <div className="relative col-span-full h-[46svh] min-h-[300px] lg:absolute lg:inset-x-0 lg:top-24 lg:bottom-0 lg:h-auto">
          {useGL && (
            <RootSystemCanvas
              members={members}
              activeIndex={activeIndex}
              reducedMotion={reducedMotion}
              quality={tier === 'gl' ? 'full' : 'lite'}
              onHover={onHover}
              onSelect={onSelect}
              onFallback={() => setGlFailed(true)}
            />
          )}
          {hydrated && !useGL && (
            <RootSystemSVG
              members={members}
              activeIndex={activeIndex}
              onSelect={onSelect}
              className="absolute inset-0 h-full w-full lg:left-[48%] lg:w-[50%]"
            />
          )}
        </div>

        {/* Title block */}
        <div className="relative z-10 lg:col-span-6 lg:row-start-2 lg:self-end">
          <p className="team-kicker fade-late" style={{ '--delay': '0.1s' }}>
            Six leaders · one root system
          </p>
          <h1 id="team-title" className="team-display mt-6">
            {headline.map((line, i) => (
              <span key={line} className="mask-line" style={{ '--i': i }}>
                <span>
                  {line}
                  {i === headline.length - 1 ? <span className="text-[#D4EA50]">.</span> : ' '}
                </span>
              </span>
            ))}
          </h1>
          <p className="fade-late mt-8 max-w-md text-base leading-relaxed text-[#F5EFB3]/85 sm:text-lg" style={{ '--delay': '0.55s' }}>
            Rootline Lab is led by six people across leadership, engineering, product and quality.
            These are the names behind the software we build.
          </p>

          {/* Legend — the accessible way into every profile; mirrors the nodes in the drawing */}
          <ol className="team-legend fade-late mt-10 grid grid-cols-2 gap-x-6 sm:grid-cols-3" style={{ '--delay': '0.75s' }}>
            {members.map((m, i) => (
              <li key={m.slug}>
                <button
                  type="button"
                  className="team-legend__item"
                  aria-label={`${m.name}, ${m.role}. Open profile`}
                  data-active={activeIndex === i ? 'true' : 'false'}
                  onMouseEnter={() => onHover(i)}
                  onMouseLeave={() => onHover(-1)}
                  onFocus={() => onHover(i)}
                  onBlur={() => onHover(-1)}
                  onClick={() => onSelect(m.slug)}
                >
                  <span className="team-legend__index">{m.index}</span>
                  <span className="team-legend__name">{m.shortName || m.name}</span>
                  <span className="team-legend__code">{m.code}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Title block footer */}
        <div className="team-meta relative z-10 col-span-full mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-3">
          <span>Dhaka · 23.8103° N, 90.4125° E</span>
          <span className="hidden md:inline">Drawn from the six roots of the studio</span>
          <a href="#founders" className="team-meta__link">
            Scroll to sheets ↓
          </a>
        </div>
      </div>
    </section>
  );
}
