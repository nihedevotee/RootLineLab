import { memo } from 'react';
import MemberPlate from '@/components/team/MemberPlate';
import SheetRule from '@/components/team/SheetRule';

function FounderSheets({ founders, onSelect }) {
  const [lead, partner] = founders;

  return (
    <section id="founders" aria-labelledby="founders-title" className="bg-[#FBFAF2] text-[#0B2A33] scroll-mt-24">
      <div className="team-shell py-24 sm:py-32 lg:py-40">
        <SheetRule id="founders-title" sheet="Sheets 01–02" title="Founders" />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-24 lg:mt-20 lg:grid-cols-12">
          <FounderSheet member={lead} onSelect={onSelect} className="lg:col-span-7" />
          {partner && (
            <FounderSheet member={partner} onSelect={onSelect} className="lg:col-span-5 lg:mt-56" />
          )}
        </div>
      </div>
    </section>
  );
}

function FounderSheet({ member, onSelect, className = '' }) {
  return (
    <article className={`founder-sheet group relative ${className}`}>
      <MemberPlate member={member} className="sd-clip aspect-[4/5]" />

      <div className="mt-8 grid grid-cols-[auto_1fr] items-baseline gap-x-5">
        <span className="team-index">{member.index}</span>
        <h3 className="team-name sd-mask">
          <span>{member.name}</span>
        </h3>
        <p className="col-start-2 mt-4 text-base font-medium text-[#146375] sm:text-lg">{member.role}</p>
        <button
          type="button"
          onClick={() => onSelect(member.slug)}
          className="team-open col-start-2 mt-6"
          aria-label={`Open profile: ${member.name}, ${member.role}`}
        >
          <span>Open profile</span>
          <span className="team-open__arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

export default memo(FounderSheets);
