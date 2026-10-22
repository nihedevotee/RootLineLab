'use client';

import { useCallback, useState } from 'react';
import TeamHero from '@/components/team/TeamHero';
import FounderSheets from '@/components/team/FounderSheets';
import DirectorsIndex from '@/components/team/DirectorsIndex';
import CollectiveDiagram from '@/components/team/CollectiveDiagram';
import ProfileDialog from '@/components/team/ProfileDialog';
import { useMemberParam } from '@/components/team/useTeamState';
import { team, founders, directors, getMember } from '@/data/team';

const isMember = (slug) => Boolean(getMember(slug));

export default function TeamExperience() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { slug, open, close } = useMemberParam(isMember);
  const onHover = useCallback((index) => setActiveIndex(index), []);

  return (
    <>
      <TeamHero members={team} activeIndex={activeIndex} onHover={onHover} onSelect={open} />
      <FounderSheets founders={founders} onSelect={open} />
      <DirectorsIndex directors={directors} onSelect={open} />
      <CollectiveDiagram members={team} />
      <ProfileDialog member={slug ? getMember(slug) : null} members={team} onClose={close} onSelect={open} />
    </>
  );
}
