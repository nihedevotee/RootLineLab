import TeamExperience from '@/components/team/TeamExperience';
import CTABand from '@/components/sections/CTABand';
import { team, publicLinks } from '@/data/team';
import { siteConfig } from '@/data/site';

export const metadata = {
  title: 'Leadership Team',
  description:
    'Meet the six people who lead Rootline Lab — founders and directors across software engineering, application development, product design, and quality assurance.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: `Leadership Team | ${siteConfig.name}`,
    description: 'The people behind the systems at Rootline Lab, Dhaka.',
    url: `${siteConfig.url}/team`,
  },
};

export default function TeamPage() {
  // Only confirmed facts: names and titles, plus portfolio links the company has verified.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    employee: team.map((m) => {
      const sameAs = publicLinks(m)
        .filter((l) => l.kind === 'portfolio')
        .map((l) => l.href);
      return {
        '@type': 'Person',
        name: m.name,
        jobTitle: m.role,
        worksFor: { '@type': 'Organization', name: siteConfig.name },
        ...(sameAs.length ? { sameAs } : {}),
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <TeamExperience />
      <CTABand
        title="Work with the people behind the systems."
        subtitle="Share what you are building. Our leads review every submission and schedule a discovery call within 24 hours."
      />
    </>
  );
}
