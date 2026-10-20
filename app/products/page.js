import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import BrowserMockup from '@/components/mockups/BrowserMockup';
import PhoneMockup from '@/components/mockups/PhoneMockup';
import DashboardMockup from '@/components/mockups/DashboardMockup';
import ErpMockup from '@/components/mockups/ErpMockup';
import { productPlatforms, technologiesWeUse } from '@/data/products';
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Network,
  Layers,
  Palette,
  Cloud,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Products & Platforms — Rootline Lab',
  description:
    'Explore the foundational platforms we build: Enterprise ERP suites, multi-tenant SaaS foundations, digital commerce, appointment hubs, and modern tech stacks.',
};

const techIconMap = {
  Code2,
  Server,
  Database,
  Smartphone,
  Network,
  Layers,
  Palette,
  Cloud,
};

export default function ProductsPage() {
  const renderMockup = (type) => {
    switch (type) {
      case 'erp':
        return <ErpMockup />;
      case 'dashboard':
        return <DashboardMockup />;
      case 'phone':
        return (
          <div className="flex justify-center">
            <PhoneMockup appName="Rootline Appointments" />
          </div>
        );
      case 'browser':
      default:
        return (
          <BrowserMockup
            url="https://platform.rootlinelab.com"
            title="Unified Commerce & Order Engine"
          />
        );
    }
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0E3D47]/80 text-[#D4EA50] border border-[#3C8D70]/60 mb-6">
              Platform Blueprints & Architecture
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Battle-tested platforms built for modern enterprises.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#F5EFB3]/90 max-w-2xl mx-auto leading-relaxed font-light">
              We engineer scalable software platforms and deployment blueprints tailored to your operations. All platforms are modular, fully owned by you, and customized without vendor lock-in.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. LARGE APPLE-STYLE PRODUCT TILES */}
      <Section theme="light" py="lg">
        <Container>
          <SectionHeading
            kicker="Platforms We Build"
            title="Tailored enterprise software blueprints."
            subhead="Each platform is architected with modern JavaScript, scalable database partitioning, and automated deployment."
          />

          <div className="space-y-16 lg:space-y-24">
            {productPlatforms.map((prod, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-[#EEF3EE]/40 border border-[#146375]/15 p-8 sm:p-12 lg:p-16 shadow-lg overflow-hidden"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Text Details */}
                    <div
                      className={`lg:col-span-6 space-y-6 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <RevealOnScroll>
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#146375]/10 text-[#146375] uppercase tracking-wider mb-2">
                          {prod.badge}
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2A33] tracking-tight leading-[1.1]">
                          {prod.name}
                        </h2>

                        <p className="text-sm sm:text-base font-semibold text-[#146375]">
                          {prod.tagline}
                        </p>

                        <p className="text-sm sm:text-base text-[#0B2A33]/80 leading-relaxed font-normal">
                          {prod.description}
                        </p>

                        {/* Features */}
                        <div className="pt-2 space-y-2.5">
                          {prod.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B2A33]/90"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="pt-4 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-[#0B2A33]/60 font-semibold mr-1">
                            Stack:
                          </span>
                          {prod.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#FBFAF2] border border-[#146375]/15 text-[#0B2A33]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4">
                          <Button
                            href="/contact"
                            variant="primary"
                            size="md"
                            iconRight={<ArrowRight className="w-4 h-4" />}
                          >
                            Inquire About This Platform
                          </Button>
                        </div>
                      </RevealOnScroll>
                    </div>

                    {/* CSS UI Mockup */}
                    <div
                      className={`lg:col-span-6 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <RevealOnScroll delay={0.15}>
                        {renderMockup(prod.mockupType)}
                      </RevealOnScroll>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. TECHNOLOGIES WE USE GRID */}
      <Section theme="mist" py="lg" className="border-t border-[#146375]/10">
        <Container>
          <SectionHeading
            kicker="Modern Tech Stack"
            title="Technologies we use & champion."
            subhead="We choose modern, proven technologies with strong communities, rapid execution velocity, and long-term security support."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologiesWeUse.map((tech, idx) => {
              const Icon = techIconMap[tech.icon] || Code2;
              return (
                <RevealOnScroll
                  key={tech.name}
                  delay={idx * 0.06}
                  className="bg-[#FBFAF2] p-7 rounded-3xl border border-[#146375]/15 hover:border-[#146375]/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <span className="w-12 h-12 rounded-2xl bg-[#EEF3EE] text-[#146375] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </span>
                    <h3 className="text-lg font-bold text-[#0B2A33] tracking-tight mb-1">
                      {tech.name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#3C8D70] font-semibold mb-3">
                      {tech.category}
                    </p>
                    <p className="text-xs sm:text-sm text-[#0B2A33]/80 leading-relaxed font-normal">
                      {tech.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. CTA BAND */}
      <CTABand
        title="Ready to deploy a custom platform for your company?"
        subtitle="Schedule an engineering discovery session to discuss system blueprints and data models."
      />
    </>
  );
}
