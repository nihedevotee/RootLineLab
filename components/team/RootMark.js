import { buildRootMark } from '@/lib/rootSystem';

const TICKS = Array.from({ length: 18 }, (_, i) => ({ x: 18 + i * 9.6, major: i % 5 === 0 }));

/**
 * A member's "root signature" — a deterministic line drawing generated from their slug.
 * Stands in for a portrait until real photography is supplied.
 * Paths are merged per depth (8 elements instead of ~60) to keep the DOM light.
 */
export default function RootMark({ slug, index, tone = 'ink', className = '' }) {
  const mark = buildRootMark(slug);
  const byDepth = [0, 1, 2, 3].map((depth) => mark.paths.filter((p) => Math.min(p.depth, 3) === depth));
  const ticks = TICKS.map((t) => `M${t.x} ${mark.surface}V${mark.surface + (t.major ? 5 : 2.5)}`).join('');

  return (
    <svg
      viewBox="0 0 200 250"
      className={`root-mark root-mark--${tone} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Ground line with survey ticks */}
      <path d={`M14 ${mark.surface}H186${ticks}`} className="root-mark__surface" />

      {byDepth.map((paths, depth) =>
        paths.length ? (
          <path
            key={depth}
            d={paths.map((p) => p.d).join('')}
            pathLength="1"
            className={`root-mark__path root-mark__path--d${depth}`}
            style={{ '--delay': `${(depth * 0.28).toFixed(2)}s` }}
          />
        ) : null
      )}

      <circle cx={mark.node.x} cy={mark.node.y} r="7" className="root-mark__ring" />
      <circle cx={mark.node.x} cy={mark.node.y} r="2.6" className="root-mark__node" />
      {index && (
        <text x={mark.node.x + 12} y={mark.node.y + 3.5} className="root-mark__label">
          {index}
        </text>
      )}
    </svg>
  );
}
