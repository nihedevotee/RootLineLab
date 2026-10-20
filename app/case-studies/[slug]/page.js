import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import { caseStudies } from '@/data/caseStudies';
import {
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return { title: 'Case Study Not Found | Rootline Lab' };
  }

  return {
    title: `${study.title} — Case Study | Rootline Lab`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#06161B] via-[#0B2A33] to-[#06161B] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default">
          <RevealOnScroll className="max-w-4xl mx-auto text-center">
            {/* Back link */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4EA50] hover:text-white transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to all case studies</span>
            </Link>

            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#146375]/50 text-[#D4EA50] border border-[#3C8D70]/40">
                {study.industry}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15">
                Sample Project Architecture
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              {study.title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
              {study.summary}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. SPECIFICATION OVERVIEW STRIP */}
      <section className="bg-[#FBFAF2] border-b border-[#146375]/15 py-6">
        <Container size="default">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div>
              <p className="font-mono text-[#146375] uppercase text-[11px] font-semibold">Service Domain</p>
              <p className="font-bold text-[#0B2A33] mt-0.5">{study.service}</p>
            </div>
            <div>
              <p className="font-mono text-[#146375] uppercase text-[11px] font-semibold">Industry Sector</p>
              <p className="font-bold text-[#0B2A33] mt-0.5">{study.industry}</p>
            </div>
            <div>
              <p className="font-mono text-[#146375] uppercase text-[11px] font-semibold">Delivery Type</p>
              <p className="font-bold text-[#0B2A33] mt-0.5">Custom Software / Web App</p>
            </div>
            <div>
              <p className="font-mono text-[#146375] uppercase text-[11px] font-semibold">Project Status</p>
              <p className="font-bold text-[#3C8D70] mt-0.5">Representative Architecture</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CASE STUDY BREAKDOWN (Challenge -> Solution -> Result) */}
      <Section theme="light" py="lg">
        <Container size="narrow">
          <div className="space-y-16">
            {/* Notice for the website owner */}
            <div className="p-4 rounded-2xl bg-[#EEF3EE] border border-[#146375]/15 text-xs text-[#0B2A33]/80">
              <span className="font-semibold text-[#146375]">Note for Rootline Lab:</span> This is a realistic sample project structure. As you deliver real production engagements, replace the content in <code className="font-mono bg-white px-1.5 py-0.5 rounded text-[#146375]">/data/caseStudies.js</code> with verified client milestones.
            </div>

            {/* 1. The Challenge */}
            <RevealOnScroll className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-red-700 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-200 inline-block">
                01 • The Challenge
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A33] tracking-tight">
                Operational bottlenecks & user friction
              </h2>
              <p className="text-base sm:text-lg text-[#0B2A33]/85 leading-relaxed font-normal">
                {study.challenge}
              </p>
            </RevealOnScroll>

            {/* 2. The Solution */}
            <RevealOnScroll className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#146375] font-bold bg-[#146375]/10 px-3 py-1 rounded-full border border-[#146375]/20 inline-block">
                02 • Our Solution & Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A33] tracking-tight">
                Technical strategy & implementation
              </h2>
              <p className="text-base sm:text-lg text-[#0B2A33]/85 leading-relaxed font-normal">
                {study.solution}
              </p>
            </RevealOnScroll>

            {/* Deliverables Delivered */}
            <RevealOnScroll className="p-8 rounded-3xl bg-[#EEF3EE]/50 border border-[#146375]/15 space-y-4">
              <h3 className="text-lg font-bold text-[#0B2A33] tracking-tight">
                Core Deliverables Provided
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B2A33]">
                    <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* 3. The Result */}
            <RevealOnScroll className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3C8D70] font-bold bg-[#3C8D70]/10 px-3 py-1 rounded-full border border-[#3C8D70]/30 inline-block">
                03 • Measurable Outcomes
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A33] tracking-tight">
                Business impact achieved
              </h2>
              <p className="text-base sm:text-lg text-[#0B2A33]/85 leading-relaxed font-normal">
                {study.result}
              </p>

              {/* Highlights */}
              <div className="pt-2 space-y-2.5">
                {study.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-[#0B2A33]">
                    <span className="w-2 h-2 rounded-full bg-[#146375]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Technologies Used Grid */}
            <RevealOnScroll className="pt-8 border-t border-[#146375]/15 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold">
                Technologies & Tools Employed:
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.techUsed.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-[#EEF3EE] border border-[#146375]/15 text-[#0B2A33]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* 4. CTA BAND */}
      <CTABand
        title={`Ready to build a customized ${study.service.toLowerCase()}?`}
        subtitle="Schedule a consultation with our software architects in Dhaka."
      />
    </>
  );
}
