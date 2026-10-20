'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import { solutions } from '@/data/solutions';
import {
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolutionsPage() {
  const [expandedId, setExpandedId] = useState(solutions[0].id);

  const toggleSolution = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0E3D47]/80 text-[#D4EA50] border border-[#3C8D70]/60 mb-6">
              Problem-First Engineering
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Targeted solutions for your exact operational roadblocks.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#F5EFB3]/90 max-w-2xl mx-auto leading-relaxed font-light">
              You know the operational challenge your business is facing. Here is how we translate that problem into robust, scalable software.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. SOLUTIONS EXPANDABLE CARDS */}
      <Section theme="light" py="lg">
        <Container size="default">
          <SectionHeading
            kicker="Business Outcomes"
            title="Engineered around your challenges, not software buzzwords."
            subhead="Click on any operational problem to inspect our technical approach, involved services, and measurable outcomes."
          />

          <div className="space-y-6 max-w-5xl mx-auto">
            {solutions.map((sol, index) => {
              const isExpanded = expandedId === sol.id;

              return (
                <div
                  key={sol.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#FBFAF2] border-[#146375] shadow-xl'
                      : 'bg-[#EEF3EE]/40 border-[#146375]/15 hover:border-[#146375]/35 shadow-xs'
                  }`}
                >
                  {/* Card Header / Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleSolution(sol.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146375]"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="w-10 h-10 rounded-2xl bg-[#146375] text-[#FBFAF2] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        0{index + 1}
                      </span>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A33] tracking-tight">
                          {sol.title}
                        </h2>
                        <p className="text-xs font-mono text-[#3C8D70] font-medium mt-1">
                          Recommended for: {sol.recommendedFor}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-180 bg-[#146375] text-white' : 'bg-[#EEF3EE] text-[#0B2A33]'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  {/* Expandable Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="p-6 sm:p-8 pt-0 border-t border-[#146375]/10 space-y-6">
                          {/* Problem vs Approach Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            {/* Problem */}
                            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100 space-y-2">
                              <span className="text-xs font-mono uppercase tracking-wider text-red-700 font-bold block">
                                The Operational Bottleneck
                              </span>
                              <p className="text-sm text-[#0B2A33]/90 leading-relaxed">
                                {sol.problem}
                              </p>
                            </div>

                            {/* Our Approach */}
                            <div className="p-5 rounded-2xl bg-[#EEF3EE] border border-[#146375]/15 space-y-2">
                              <span className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold block">
                                Our Engineering Approach
                              </span>
                              <p className="text-sm text-[#0B2A33]/90 leading-relaxed">
                                {sol.approach}
                              </p>
                            </div>
                          </div>

                          {/* Key Outcomes */}
                          <div className="space-y-3">
                            <p className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold">
                              Delivered Business Outcomes:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {sol.keyOutcomes.map((outcome, oIdx) => (
                                <div
                                  key={oIdx}
                                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#146375]/10 text-xs text-[#0B2A33]"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                                  <span>{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Services Involved & CTA */}
                          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#146375]/10">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono text-[#0B2A33]/70 font-semibold mr-1">
                                Services involved:
                              </span>
                              {sol.servicesInvolved.map((svc) => (
                                <span
                                  key={svc}
                                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#146375]/10 text-[#146375]"
                                >
                                  {svc}
                                </span>
                              ))}
                            </div>

                            <Button
                              href="/contact"
                              variant="primary"
                              size="sm"
                              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                            >
                              Discuss This Solution
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. "NOT SURE WHAT YOU NEED?" CTA BAND */}
      <Section theme="cream" py="lg" className="border-t border-[#146375]/10">
        <Container size="narrow" className="text-center">
          <RevealOnScroll className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#146375]/10 text-[#146375] text-xs font-mono uppercase tracking-widest font-semibold">
              <HelpCircle className="w-4 h-4" />
              Technical Advisory
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A33] tracking-tight leading-[1.1]">
              Not sure which software path is right for you?
            </h2>
            <p className="text-base sm:text-lg text-[#0B2A33]/80 max-w-xl mx-auto leading-relaxed font-normal">
              You do not need to prepare technical specifications. Schedule a 30-minute discovery consultation. We listen to your goals and provide an honest assessment of whether you need a website, web app, custom software, or standard off-the-shelf software.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="primary" size="lg">
                Schedule Architecture Consultation ›
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* 4. FINAL CTA BAND */}
      <CTABand />
    </>
  );
}
