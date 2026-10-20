'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Modal from '@/components/ui/Modal';
import CTABand from '@/components/sections/CTABand';
import { industries } from '@/data/industries';
import {
  ShoppingBag,
  Activity,
  GraduationCap,
  Building2,
  Factory,
  Truck,
  UtensilsCrossed,
  Landmark,
  Rocket,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const industryIconMap = {
  ShoppingBag,
  Activity,
  GraduationCap,
  Building2,
  Factory,
  Truck,
  UtensilsCrossed,
  Landmark,
  Rocket,
  HeartHandshake,
};

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const openIndustryModal = (ind) => {
    setSelectedIndustry(ind);
  };

  const closeIndustryModal = () => {
    setSelectedIndustry(null);
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0E3D47]/80 text-[#D4EA50] border border-[#3C8D70]/60 mb-6">
              Industry Domain Mastery
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Deep domain context across 10 vital industries.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#F5EFB3]/90 max-w-2xl mx-auto leading-relaxed font-light">
              Software only delivers value when it understands the nuances of your sector. Discover how we tailor architectures to your business environment.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. INDUSTRIES INTERACTIVE GRID */}
      <Section theme="light" py="lg">
        <Container>
          <SectionHeading
            kicker="Domain Solutions"
            title="Tailored architectures for specialized sectors."
            subhead="Click on any sector card to review operational workflows, system blueprints, and measurable business impact."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {industries.map((ind, idx) => {
              const Icon = industryIconMap[ind.icon] || Sparkles;

              return (
                <RevealOnScroll
                  key={ind.id}
                  delay={idx * 0.05}
                  className="group bg-[#FBFAF2] rounded-3xl p-7 sm:p-8 border border-[#146375]/15 hover:border-[#146375]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-12 h-12 rounded-2xl bg-[#EEF3EE] text-[#146375] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#146375] group-hover:text-[#FBFAF2] transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </span>
                      <span className="text-[11px] font-mono text-[#146375] px-2.5 py-0.5 rounded-full bg-[#EEF3EE]">
                        Sector 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B2A33] tracking-tight mb-2">
                      {ind.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#0B2A33]/80 leading-relaxed font-normal mb-6">
                      {ind.shortHelp}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#146375]/10">
                    <button
                      type="button"
                      onClick={() => openIndustryModal(ind)}
                      className="w-full py-2.5 px-4 rounded-full bg-[#EEF3EE] hover:bg-[#146375] hover:text-[#FBFAF2] text-xs font-semibold text-[#146375] transition-colors duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146375]"
                    >
                      <span>Explore Sector Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. MODAL FOR INDUSTRY DETAILS */}
      <Modal
        isOpen={Boolean(selectedIndustry)}
        onClose={closeIndustryModal}
        title={selectedIndustry ? `${selectedIndustry.name} Blueprint` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedIndustry && (
          <div className="space-y-6 text-left">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#146375] font-semibold mb-1">
                How We Empower This Sector
              </p>
              <p className="text-sm sm:text-base text-[#0B2A33]/90 leading-relaxed">
                {selectedIndustry.howWeHelp}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EEF3EE] border border-[#146375]/15 space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#3C8D70] font-bold block">
                Primary Business Impact:
              </span>
              <p className="text-sm font-semibold text-[#0B2A33]">
                {selectedIndustry.impact}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[#146375] font-semibold">
                Representative Software Blueprints:
              </p>
              <div className="space-y-2">
                {selectedIndustry.exampleSolutions.map((sol, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B2A33]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#146375]/10">
              <span className="text-xs text-[#0B2A33]/70 font-mono">
                Have a specialized {selectedIndustry.name} project?
              </span>
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                onClick={closeIndustryModal}
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Discuss {selectedIndustry.name} Project
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 4. CTA BAND */}
      <CTABand
        title="Need software tailored to your specific industry constraints?"
        subtitle="We examine your industry workflows, compliance requirements, and user touchpoints."
      />
    </>
  );
}
