import { memo } from 'react';
import SheetRule from '@/components/team/SheetRule';

const WIDTH = 1200;
const TRUNK = { x: 600, y: 54 };
const END_Y = 300;

function branch(i, count) {
  const x = (i + 0.5) * (WIDTH / count);
  const midY = TRUNK.y + (END_Y - TRUNK.y) * 0.55;
  return `M${TRUNK.x} ${TRUNK.y + 40} C ${TRUNK.x} ${midY}, ${x} ${midY - 30}, ${x} ${END_Y}`;
}

function CollectiveDiagram({ members }) {
  return (
    <section aria-labelledby="collective-title" className="bg-[#FBFAF2] text-[#0B2A33]">
      <div className="team-shell py-24 sm:py-32 lg:py-40">
        <SheetRule id="collective-title" sheet="Sheet 07 — Assembly" title="One root system" />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12">
          <p className="text-xl leading-relaxed text-[#0B2A33]/85 sm:text-2xl lg:col-span-7 lg:text-[1.65rem] lg:leading-[1.45]">
            Leadership and management set the direction. Software engineering and application
            development build it. Product engineering and design shape how it works. Quality
            assurance and DevOps keep it running.{' '}
            <span className="text-[#146375]">One studio, grown from six roots.</span>
          </p>
        </div>

        {/* Assembly drawing: the trunk and its six roots (decorative; the list below carries the content) */}
        <div className="collective mt-16 lg:mt-24">
          <div className="sd-grow hidden md:block">
          <svg
            viewBox={`0 0 ${WIDTH} ${END_Y + 12}`}
            className="collective__svg block w-full"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="0" y1={TRUNK.y} x2={WIDTH} y2={TRUNK.y} className="collective__surface" />
            <line x1={TRUNK.x} y1={TRUNK.y} x2={TRUNK.x} y2={TRUNK.y + 40} className="collective__trunk" />
            <circle cx={TRUNK.x} cy={TRUNK.y} r="5" className="collective__trunk-node" />
            <text x={TRUNK.x + 14} y={TRUNK.y - 12} className="collective__label">
              ROOTLINE LAB
            </text>
            {members.map((m, i) => (
              <g key={m.slug}>
                <path d={branch(i, members.length)} pathLength="1" className="collective__branch" />
                <circle cx={(i + 0.5) * (WIDTH / members.length)} cy={END_Y} r="4" className="collective__node" />
              </g>
            ))}
          </svg>
          </div>

          <ol className="collective__list grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-6">
            {members.map((m) => (
              <li key={m.slug} className="collective__item">
                <span className="team-meta text-[#146375]">
                  {m.index} · {m.code}
                </span>
                <span className="collective__discipline">{m.discipline}</span>
                <span className="collective__person">{m.shortName || m.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default memo(CollectiveDiagram);
