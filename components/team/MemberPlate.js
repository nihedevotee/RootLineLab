import { memo } from 'react';
import Image from 'next/image';
import DrawingFrame from '@/components/team/DrawingFrame';
import RootMark from '@/components/team/RootMark';

/** Portrait plate for one member: the photo when supplied, the root signature until then. */
function MemberPlate({ member, tone = 'ink', animate = false, sizes = '(min-width: 1024px) 40vw, 90vw', className = '' }) {
  return (
    <DrawingFrame
      tone={tone}
      className={className}
      caption={`Fig. ${member.index} — ${member.portrait ? 'Portrait' : 'Root signature'}`}
      meta={member.code}
    >
      {member.portrait ? (
        <Image
          src={member.portrait}
          alt={`Portrait of ${member.name}, ${member.role}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <RootMark
          slug={member.slug}
          index={member.index}
          tone={tone}
          className={animate ? 'root-mark--animate' : ''}
        />
      )}
    </DrawingFrame>
  );
}

export default memo(MemberPlate);
