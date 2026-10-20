import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Marquee from '@/components/ui/Marquee';
import HeroCluster from '@/components/sections/HeroCluster';
import ServicesBento from '@/components/sections/ServicesBento';
import ProcessSteps from '@/components/sections/ProcessSteps';
import CTABand from '@/components/sections/CTABand';
import { siteConfig } from '@/data/site';
import { caseStudies } from '@/data/caseStudies';
import { industries } from '@/data/industries';
import { ArrowRight, ChevronRight, Sparkles, Layers, Box, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Rootline Lab — Smart Software for Modern Businesses',
  description:
    'At Rootline Lab, we turn ideas into powerful websites, applications, and custom software designed to help businesses grow. Based in Dhaka, Bangladesh.',
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.introCopy,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    sameAs: [],
  };

  return (
    <>
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION (Dark gradient, full viewport) */}
      {/* 1. HERO SECTION (Rich Deep Teal gradient, full viewport) */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] pt-32 sm:pt-40 pb-20 sm:pb-32 flex flex-col justify-between overflow-hidden">
        {/* Soft Ambient Blobs in Canopy Green, Leaf, and Lime */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#3C8D70]/40 via-[#99CB5B]/25 to-[#D4EA50]/20 rounded-full blur-[140px] pointer-events-none" />

        <Container size="default" className="relative z-10 text-center flex-1 flex flex-col justify-center">
          <RevealOnScroll>
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E3D47]/80 border border-[#3C8D70]/60 text-[#D4EA50] text-xs font-mono tracking-widest uppercase mb-8 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dhaka, Bangladesh — Software Engineering Studio</span>
            </div>

            {/* Apple-style massive headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl mx-auto">
              Your business is{' '}
              <span className="text-[#D4EA50] underline decoration-[#99CB5B] decoration-4 underline-offset-8">
                unique
              </span>
              .<br className="hidden sm:inline" /> Your software should be, too.
            </h1>

            {/* Intro Copy */}
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-[#F5EFB3]/90 max-w-3xl mx-auto font-light leading-relaxed">
              At Rootline Lab, we turn ideas into powerful websites, applications, and custom software designed to help businesses grow.
            </p>

            {/* Two CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contact"
                variant="lime"
                size="lg"
                iconRight={<ArrowRight className="w-5 h-5" />}
              >
                Start a project
              </Button>
              <Button
                href="/services"
                variant="dark-secondary"
                size="lg"
              >
                Explore services ›
              </Button>
            </div>
          </RevealOnScroll>

          {/* Floating Device Mockup Cluster */}
          <HeroCluster />
        </Container>
      </section>

      {/* 2. TRUST STRIP (Capabilities Marquee) */}
      <section className="bg-[#0E3D47] border-y border-[#3C8D70]/30 py-5">
        <Marquee items={siteConfig.capabilities} speed={35} />
      </section>

      {/* 3. SERVICES BENTO GRID */}
      <Section id="services-overview" theme="light" py="lg">
        <Container>
          <SectionHeading
            kicker="What We Build"
            title="Comprehensive digital engineering across 11 disciplines."
            subhead="From high-speed web apps and enterprise ERP systems to mobile applications and custom UI/UX design systems."
          />
          <ServicesBento />
        </Container>
      </Section>

      {/* 4. STATEMENT SECTION (Large type scroll reveal) */}
      <Section theme="mist" py="lg" className="border-y border-[#146375]/10">
        <Container size="narrow" className="text-center">
          <RevealOnScroll>
            <span className="text-xs font-mono uppercase tracking-widest text-[#146375] font-semibold mb-6 inline-block">
              Engineered For Longevity
            </span>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B2A33] leading-[1.12]">
              “Ready to turn your business idea into a powerful digital solution?”
            </p>
            <p className="mt-6 text-base sm:text-lg text-[#0B2A33]/80 max-w-xl mx-auto font-normal leading-relaxed">
              We skip buzzword soup and unmaintainable bloat. We write clean, resilient software designed around your actual operational cadence.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Talk to an engineer ›
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* 5. HOW WE WORK (4-Step Process) */}
      <Section id="process" theme="light" py="lg">
        <Container>
          <SectionHeading
            kicker="Our Engineering Methodology"
            title="A clear, four-phase path from discovery to scale."
            subhead="We pair rapid delivery cycles with strict architectural reviews so you always know what is being built and why."
          />
          <ProcessSteps />
        </Container>
      </Section>

      {/* 6. SOLUTIONS + PRODUCTS TEASER (Side by side cards) */}
      <Section theme="light" py="default" className="pt-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Solutions Card */}
            <RevealOnScroll className="group relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#146375] via-[#125360] to-[#0E3D47] text-white overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-[#D4EA50] border border-white/15 mb-6">
                  <Cpu className="w-3.5 h-3.5" />
                  Business-First Architecture
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  Solutions By Business Problem
                </h3>
                <p className="text-[#F5EFB3]/85 text-base leading-relaxed mb-8 font-light">
                  Rather than picking isolated tools, see how we solve operational friction: selling online, automating manual workflows, launching SaaS platforms, or unifying legacy systems.
                </p>
              </div>
              <div className="relative z-10 pt-4">
                <Button
                  href="/solutions"
                  variant="lime"
                  size="md"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Solutions
                </Button>
              </div>
              {/* Background accent ring */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border-[32px] border-white/5 pointer-events-none" />
            </RevealOnScroll>

            {/* Products Card */}
            <RevealOnScroll
              delay={0.15}
              className="group relative rounded-3xl p-8 sm:p-12 bg-[#EEF3EE] text-[#0B2A33] border border-[#146375]/15 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white text-[#146375] border border-[#146375]/15 mb-6 font-semibold">
                  <Box className="w-3.5 h-3.5" />
                  Platforms & Blueprints
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2A33] mb-4">
                  Platforms & Product Blueprints
                </h3>
                <p className="text-[#0B2A33]/80 text-base leading-relaxed mb-8 font-normal">
                  Explore the foundational platforms we build and deploy: Enterprise Resource Planning (ERP) suites, SaaS starters, booking systems, and headless commerce.
                </p>
              </div>
              <div className="relative z-10 pt-4">
                <Button
                  href="/products"
                  variant="primary"
                  size="md"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  View Platforms
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* 7. INDUSTRIES TEASER (Interactive chips row) */}
      <Section theme="mist" py="default" className="border-t border-[#146375]/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#146375] font-semibold mb-2 block">
                Cross-Domain Versatility
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2A33] tracking-tight">
                Industries We Empower
              </h2>
            </div>
            <Link
              href="/industries"
              className="text-sm font-semibold text-[#146375] hover:text-[#3C8D70] inline-flex items-center gap-1 group"
            >
              <span>View all 10 industry blueprints</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries#${ind.id}`}
                className="px-5 py-3 rounded-full bg-[#FBFAF2] hover:bg-[#146375] hover:text-[#FBFAF2] text-[#0B2A33] text-sm font-medium border border-[#146375]/15 transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02]"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. CASE STUDY TEASER (3 cards from data) */}
      <Section theme="light" py="lg">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#146375] font-semibold mb-2 block">
                Proof of Engineering Craft
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A33] tracking-tight">
                Sample Client Case Studies
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="text-sm font-semibold text-[#146375] hover:text-[#3C8D70] inline-flex items-center gap-1 group"
            >
              <span>Explore all case studies</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <RevealOnScroll
                key={study.slug}
                delay={idx * 0.1}
                className="group rounded-3xl bg-[#EEF3EE]/50 border border-[#146375]/15 hover:border-[#146375]/40 hover:bg-[#FBFAF2] transition-all duration-300 p-7 flex flex-col justify-between shadow-xs hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#146375] font-semibold">
                      {study.industry}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#146375]/10 text-[#146375]">
                      Sample Project
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B2A33] tracking-tight mb-3 group-hover:text-[#146375] transition-colors">
                    {study.title}
                  </h3>

                  <p className="text-sm text-[#0B2A33]/80 leading-relaxed mb-6 font-normal">
                    {study.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    {study.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#0B2A33]/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D70]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#146375]/10">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#146375] group-hover:text-[#3C8D70] inline-flex items-center gap-1"
                  >
                    <span>Read Architecture Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. FINAL CTA (Dark Band) */}
      <CTABand />
    </>
  );
}
