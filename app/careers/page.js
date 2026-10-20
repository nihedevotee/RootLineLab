'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import { openPositions, perksAndBenefits, hiringSteps } from '@/data/jobs';
import { siteConfig } from '@/data/site';
import {
  Sparkles,
  Clock,
  TrendingUp,
  Laptop,
  BookOpen,
  Users,
  ChevronDown,
  Mail,
  MapPin,
  CheckCircle2,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const perkIconMap = {
  Sparkles,
  Clock,
  TrendingUp,
  Laptop,
  BookOpen,
  Users,
};

export default function CareersPage() {
  const [expandedJobId, setExpandedJobId] = useState(openPositions[0].id);

  const toggleJob = (id) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#06161B] via-[#0B2A33] to-[#06161B] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#146375]/50 text-[#D4EA50] border border-[#3C8D70]/40 mb-6">
              Engineering Careers
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Build meaningful software with engineers who care.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
              We are a team of product craftspeople in Dhaka solving real technical and operational challenges. No bureaucracy. No politics. Just great software.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. CULTURE & PERKS */}
      <Section theme="light" py="lg">
        <Container>
          <SectionHeading
            kicker="Studio Life"
            title="A craft-first environment built for sustained focus."
            subhead="We foster high autonomy, continuous technical learning, and genuine work-life balance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {perksAndBenefits.map((perk, idx) => {
              const Icon = perkIconMap[perk.icon] || Sparkles;
              return (
                <RevealOnScroll
                  key={perk.title}
                  delay={idx * 0.08}
                  className="bg-[#FBFAF2] p-8 rounded-3xl border border-[#146375]/15 hover:border-[#146375]/40 transition-all duration-300 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="w-12 h-12 rounded-2xl bg-[#EEF3EE] text-[#146375] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </span>
                    <h3 className="text-xl font-bold text-[#0B2A33] tracking-tight mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-[#0B2A33]/80 leading-relaxed font-normal">
                      {perk.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. HIRING PROCESS (4 Steps) */}
      <Section theme="mist" py="lg" className="border-y border-[#146375]/10">
        <Container>
          <SectionHeading
            kicker="Transparent Hiring"
            title="Our four-step evaluation process"
            subhead="We respect your time. Our hiring process is practical, predictable, and focused on actual engineering craft."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringSteps.map((step, idx) => (
              <RevealOnScroll
                key={step.step}
                delay={idx * 0.1}
                className="bg-[#FBFAF2] rounded-3xl p-7 border border-[#146375]/15 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#146375] px-3 py-1 rounded-full bg-[#EEF3EE] inline-block mb-4">
                    Step {step.step}
                  </span>
                  <h4 className="text-xl font-bold text-[#0B2A33] tracking-tight mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0B2A33]/80 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. OPEN POSITIONS (Expandable from /data/jobs.js) */}
      <Section theme="light" py="lg">
        <Container size="default">
          <SectionHeading
            kicker="Join The Team"
            title="Current Open Positions in Dhaka"
            subhead="Click on any opening to view day-to-day responsibilities, requirements, and apply directly via email."
          />

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((job) => {
              const isExpanded = expandedJobId === job.id;
              const mailtoSubject = encodeURIComponent(`Application for ${job.title} — Rootline Lab`);
              const mailtoBody = encodeURIComponent(
                `Hi Rootline Lab Team,\n\nI would like to apply for the ${job.title} position.\n\nPortfolio / GitHub: \nLinkedIn: \nSummary of experience:\n\nThank you!`
              );

              return (
                <div
                  key={job.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#FBFAF2] border-[#146375] shadow-xl'
                      : 'bg-[#EEF3EE]/40 border-[#146375]/15 hover:border-[#146375]/35 shadow-xs'
                  }`}
                >
                  {/* Job Header */}
                  <button
                    type="button"
                    onClick={() => toggleJob(job.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146375]"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-mono bg-[#146375]/10 text-[#146375] font-semibold">
                          {job.department}
                        </span>
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-mono bg-white text-[#0B2A33]/70 border border-[#146375]/15">
                          {job.type}
                        </span>
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-mono bg-white text-[#0B2A33]/70 border border-[#146375]/15">
                          {job.experience}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B2A33] tracking-tight">
                        {job.title}
                      </h3>
                      <p className="text-xs font-mono text-[#3C8D70] font-medium mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.location}</span>
                      </p>
                    </div>

                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-180 bg-[#146375] text-white' : 'bg-[#EEF3EE] text-[#0B2A33]'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="p-6 sm:p-8 pt-0 border-t border-[#146375]/10 space-y-6">
                          <p className="text-sm sm:text-base text-[#0B2A33]/90 pt-4 leading-relaxed">
                            {job.overview}
                          </p>

                          {/* Responsibilities */}
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold">
                              Key Responsibilities:
                            </h4>
                            <div className="space-y-2">
                              {job.responsibilities.map((resp, rIdx) => (
                                <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B2A33]">
                                  <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Requirements */}
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold">
                              Candidate Requirements:
                            </h4>
                            <div className="space-y-2">
                              {job.requirements.map((req, reqIdx) => (
                                <div key={reqIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B2A33]">
                                  <CheckCircle2 className="w-4 h-4 text-[#146375] shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Apply Action */}
                          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#146375]/10">
                            <span className="text-xs font-mono text-[#0B2A33]/70">
                              Send resume & portfolio link directly to our hiring team.
                            </span>

                            <a
                              href={`mailto:${siteConfig.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#146375] hover:bg-[#0B2A33] text-[#FBFAF2] font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm"
                            >
                              <Mail className="w-4 h-4" />
                              <span>Apply via Email</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* "Don't see your role? Send us your CV" */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#EEF3EE] border border-[#146375]/15 text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-[#0B2A33] tracking-tight">
              Don’t see your exact role?
            </h3>
            <p className="text-sm text-[#0B2A33]/80 leading-relaxed">
              We are constantly seeking brilliant engineers, UI/UX designers, and technical writers who take pride in their craft. Send us your CV and a link to your best work.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Open Application / CV Submission — Rootline Lab')}`}
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-[#146375] text-[#FBFAF2] hover:bg-[#0B2A33] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D4EA50]" />
              <span>Send Us Your CV ({siteConfig.email})</span>
            </a>
          </div>
        </Container>
      </Section>

      {/* 5. CTA BAND */}
      <CTABand />
    </>
  );
}
