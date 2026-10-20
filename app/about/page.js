import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import { siteConfig } from '@/data/site';
import {
  Compass,
  Code2,
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'About Us — Rootline Lab',
  description:
    'Rootline Lab — Building smart software for modern businesses. Based in Dhaka, Bangladesh, building resilient technology for companies worldwide.',
};

const values = [
  {
    icon: Code2,
    title: 'Clarity Over Complexity',
    description:
      'We write clean, readable code and design intuitive user interfaces. If a system requires a 50-page manual to understand, we consider the architecture unfinished.',
  },
  {
    icon: ShieldCheck,
    title: 'Radical Ownership',
    description:
      'We treat every client codebase as if it were our own startup. We provide complete IP ownership, clean version histories, and transparent technical documentation.',
  },
  {
    icon: Zap,
    title: 'Speed with Precision',
    description:
      'Velocity matters, but hasty technical debt cripples businesses. We move quickly by building on proven modular foundations rather than cutting architectural corners.',
  },
  {
    icon: Compass,
    title: 'Honest Advisory',
    description:
      'We tell you if a simpler off-the-shelf tool or low-code solution solves your problem before writing thousands of lines of custom code. Your capital efficiency comes first.',
  },
];

const teamPlaceholders = [
  {
    initials: 'TK',
    role: 'Lead Architect & Systems Engineer',
    focus: 'Distributed Backends & ERP Architecture',
  },
  {
    initials: 'RS',
    role: 'Staff Frontend Engineer',
    focus: 'Next.js, Interaction Design & Accessibility',
  },
  {
    initials: 'MN',
    role: 'Principal Product Designer',
    focus: 'Design Systems & Workflow Prototyping',
  },
  {
    initials: 'AI',
    role: 'Lead QA & Reliability Engineer',
    focus: 'Automated Testing & Security Hardening',
  },
];

const principles = [
  'Zero lock-in: You own 100% of the repository, assets, and database schemas.',
  'Direct engineer communication: No game of telephone through account managers.',
  'Performance budgets: Sub-second page loads and 90+ Lighthouse targets as defaults.',
  'Security first: Encrypted secrets, sanitized inputs, and hardened cloud boundaries.',
];

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0E3D47]/80 text-[#D4EA50] border border-[#3C8D70]/60 mb-6">
              Studio Philosophy
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Rootline Lab — Building smart software for modern businesses.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#F5EFB3]/90 max-w-2xl mx-auto leading-relaxed font-light">
              We are an engineering studio founded on the conviction that software should simplify business operations, not complicate them.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. STORY SECTION */}
      <Section theme="light" py="lg">
        <Container size="narrow">
          <RevealOnScroll className="space-y-6 text-[#0B2A33]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#146375] font-semibold block">
              Our Story & Origins
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Why we founded Rootline Lab
            </h2>
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#0B2A33]/85 font-normal">
              <p>
                Too much software today is either bloated, overpriced, or abandoned shortly after deployment. Businesses are repeatedly forced into expensive commercial subscriptions with features they never touch, or left with fragile custom code that only a single vanished freelancer understood.
              </p>
              <p>
                We established <strong>Rootline Lab</strong> in Dhaka to provide a trustworthy, rigorous alternative. We approach software development not as a quick gig, but as long-term digital craftsmanship.
              </p>
              <p>
                The name &quot;Rootline&quot; stems from nature: the strength of a tree is determined by the depth and resilience of its root network. In software engineering, your foundations—clean architecture, secure databases, maintainable code—determine how far and fast your company can grow.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* 3. MISSION & VISION */}
      <Section theme="mist" py="lg" className="border-y border-[#146375]/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealOnScroll className="bg-[#FBFAF2] p-8 sm:p-12 rounded-3xl border border-[#146375]/15 shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#146375] font-semibold">
                Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2A33] tracking-tight">
                To turn ambitious business ideas into dependable digital infrastructure.
              </h3>
              <p className="text-sm sm:text-base text-[#0B2A33]/80 leading-relaxed font-normal">
                We empower forward-thinking operators, growing retailers, and modern founders with custom websites and applications engineered to eliminate manual bottlenecks and scale smoothly.
              </p>
            </RevealOnScroll>

            <RevealOnScroll
              delay={0.15}
              className="bg-gradient-to-br from-[#146375] via-[#125360] to-[#0E3D47] text-white p-8 sm:p-12 rounded-3xl border border-[#3C8D70]/40 shadow-xl space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4EA50] font-semibold">
                Our Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                To become South Asia’s benchmark for engineering rigor and design clarity.
              </h3>
              <p className="text-sm sm:text-base text-[#F5EFB3]/85 leading-relaxed font-light">
                Proving that a studio based in Dhaka can deliver global-standard software architecture, pixel-perfect user experiences, and transparent client partnerships.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* 4. CORE VALUES */}
      <Section theme="light" py="lg">
        <Container>
          <SectionHeading
            kicker="What Drives Us"
            title="Core values embedded into every commit."
            subhead="These guiding principles define how we communicate, how we architect systems, and how we treat our partners."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <RevealOnScroll
                  key={val.title}
                  delay={idx * 0.1}
                  className="bg-[#FBFAF2] p-8 rounded-3xl border border-[#146375]/15 hover:border-[#146375]/40 transition-all duration-300 shadow-xs flex items-start gap-5"
                >
                  <span className="w-12 h-12 rounded-2xl bg-[#EEF3EE] text-[#146375] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-[#0B2A33] tracking-tight mb-2">
                      {val.title}
                    </h4>
                    <p className="text-sm text-[#0B2A33]/80 leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. PRINCIPLES ("How We Work") */}
      <Section theme="mist" py="lg" className="border-t border-[#146375]/10">
        <Container size="narrow">
          <SectionHeading
            kicker="Operating Standards"
            title="How we work with our clients"
            subhead="Clear expectations ensure seamless collaboration across every development sprint."
          />
          <div className="space-y-4">
            {principles.map((pr, i) => (
              <RevealOnScroll
                key={i}
                delay={i * 0.08}
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#FBFAF2] border border-[#146375]/15 shadow-xs"
              >
                <CheckCircle className="w-5 h-5 text-[#3C8D70] shrink-0" />
                <span className="text-sm sm:text-base font-medium text-[#0B2A33]">{pr}</span>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. TEAM PLACEHOLDERS (No fake bios as required) */}
      <Section theme="light" py="lg">
        <Container>
          <SectionHeading
            kicker="Leadership & Craft"
            title="Our Engineering Leads"
            subhead="A tight-knit collective of software architects, product designers, and reliability specialists."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamPlaceholders.map((member, idx) => (
              <RevealOnScroll
                key={idx}
                delay={idx * 0.08}
                className="bg-[#EEF3EE]/50 border border-[#146375]/15 rounded-3xl p-6 text-center space-y-4 hover:bg-[#FBFAF2] transition-colors"
              >
                {/* Initials Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#146375] to-[#0E3D47] text-[#D4EA50] font-mono font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                  {member.initials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#146375]">{member.role}</h4>
                  <p className="text-xs font-mono text-[#3C8D70] font-medium mt-1">
                    {member.focus}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. BASED IN DHAKA, BUILDING FOR THE WORLD */}
      <Section theme="dark" py="lg">
        <Container size="narrow" className="text-center">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#146375]/50 text-[#D4EA50] border border-[#3C8D70]/40 text-xs font-mono tracking-widest uppercase mb-6">
              <MapPin className="w-4 h-4" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Rooted in Dhaka. Engineering for the world.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light mb-8 max-w-xl mx-auto">
              Our engineering studio operates out of Dhaka, working in time-zone harmony with clients across Asia, the Middle East, Europe, and North America.
            </p>
            <Button
              href="/contact"
              variant="lime"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Start a Conversation
            </Button>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* 8. CTA BAND */}
      <CTABand />
    </>
  );
}
