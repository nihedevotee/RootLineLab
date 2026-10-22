import { buildRootSystem, projectRootSystem } from '@/lib/rootSystem';

/**
 * Flat drawing of the same root network. Used when WebGL is unavailable,
 * on small screens, and for visitors who prefer reduced motion.
 */
export default function RootSystemSVG({ members, activeIndex = -1, onSelect, className = 'absolute inset-0 h-full w-full' }) {
  const drawing = projectRootSystem(buildRootSystem(members, { planar: true, maxDepth: 3 }));

  return (
    <svg
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid meet"
      className={`root-svg ${className}`}
      data-active={activeIndex >= 0 ? 'true' : 'false'}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="40" y1={drawing.surfaceY} x2="960" y2={drawing.surfaceY} className="root-svg__surface" />
      {drawing.paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          pathLength="1"
          className={`root-svg__path root-svg__path--d${Math.min(p.depth, 3)}`}
          data-hi={p.member >= 0 && p.member === activeIndex ? 'true' : undefined}
          style={{ '--delay': `${(p.delay * 0.8).toFixed(2)}s`, '--dur': `${(p.duration * 0.8).toFixed(2)}s` }}
        />
      ))}
      {drawing.nodes.map((n) => (
        <g
          key={n.slug}
          className="root-svg__node"
          data-hi={n.index === activeIndex ? 'true' : undefined}
          style={{ '--delay': `${(n.birth * 0.8).toFixed(2)}s` }}
          onClick={onSelect ? () => onSelect(n.slug) : undefined}
        >
          <circle cx={n.x} cy={n.y} r="11" className="root-svg__ring" />
          <circle cx={n.x} cy={n.y} r="3.5" className="root-svg__core" />
          {/* Index only: names live in the legend, where they stay legible at any width */}
          <text x={n.x + 20} y={n.y + 9} className="root-svg__label">
            {members[n.index].index}
          </text>
        </g>
      ))}
    </svg>
  );
}
