'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import FilterChips from '@/components/ui/FilterChips';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import { caseStudies } from '@/data/caseStudies';
import { ChevronRight, ArrowRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const filterCategories = [
  'All Sectors',
  'Retail & E-commerce',
  'Healthcare & Clinics',
  'Logistics & Fleet',
];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState('All Sectors');

  const filteredStudies =
    activeCategory === 'All Sectors'
      ? caseStudies
      : caseStudies.filter((cs) => cs.industry === activeCategory);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#06161B] via-[#0B2A33] to-[#06161B] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#146375]/50 text-[#D4EA50] border border-[#3C8D70]/40 mb-6">
              Engineering Case Studies
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Realistic blueprints of our technical executions.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
              Explore how we solve operational bottlenecks through custom software engineering, modern web applications, and database synchronization.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. FILTERABLE GRID */}
      <Section theme="light" py="lg">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#146375] font-semibold mb-1 block">
                Representative Projects
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A33] tracking-tight">
                Architectural Breakdowns
              </h2>
            </div>

            {/* Filter Chips */}
            <FilterChips
              categories={filterCategories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredStudies.map((study) => (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-full bg-[#FBFAF2] rounded-3xl p-8 border border-[#146375]/15 hover:border-[#146375]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#146375] bg-[#EEF3EE] px-3 py-1 rounded-full">
                          {study.industry}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#146375]/10 text-[#146375]">
                          Sample Project
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#0B2A33] tracking-tight mb-3 group-hover:text-[#146375] transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-xs font-mono text-[#3C8D70] font-semibold mb-4">
                        Service: {study.service}
                      </p>

                      <p className="text-sm text-[#0B2A33]/80 leading-relaxed font-normal mb-6">
                        {study.summary}
                      </p>

                      {/* Result Highlights */}
                      <div className="space-y-2 mb-6">
                        {study.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#0B2A33]/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D70] shrink-0 mt-1.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {study.techUsed.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#EEF3EE] text-[#0B2A33]/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#146375]/10">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="text-xs font-semibold uppercase tracking-wider text-[#146375] group-hover:text-[#3C8D70] inline-flex items-center gap-1.5"
                      >
                        <span>Inspect Full Blueprint</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      {/* 3. CTA BAND */}
      <CTABand
        title="Want to architect a system like these for your business?"
        subtitle="Book a technical discovery session with our engineering team in Dhaka."
      />
    </>
  );
}
