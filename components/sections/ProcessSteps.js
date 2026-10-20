'use client';

import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { Search, Compass, Code, TrendingUp } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discover',
    icon: Search,
    subtitle: 'Deep operational immersion',
    description:
      'We unpack your actual workflows, data constraints, customer journeys, and commercial goals. No generic templates—we map every requirement before writing a line of code.',
  },
  {
    num: '02',
    title: 'Design',
    icon: Compass,
    subtitle: 'Intuitive architecture & UI',
    description:
      'We create clickable interactive prototypes and scalable design systems. Every user path is scrutinized to eliminate friction, ensuring the product feels obvious from the first click.',
  },
  {
    num: '03',
    title: 'Build',
    icon: Code,
    subtitle: 'Clean, production-grade code',
    description:
      'Engineered with modern JavaScript, Next.js, and secure databases. We write tested, maintainable code with strict version control, high performance, and zero technical debt.',
  },
  {
    num: '04',
    title: 'Grow',
    icon: TrendingUp,
    subtitle: 'Continuous scale & monitoring',
    description:
      'We launch safely with automated CI/CD pipelines, monitor server health 24/7, and partner with you over the long haul to iteratively add features as your business expands.',
  },
];

export default function ProcessSteps() {
  return (
    <div className="relative">
      {/* Animated Connecting Line on Desktop */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#146375]/20 via-[#3C8D70]/40 to-[#146375]/20 -translate-y-12 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <RevealOnScroll
              key={step.num}
              delay={idx * 0.1}
              className="group bg-[#FBFAF2] rounded-3xl p-7 sm:p-8 border border-[#146375]/15 hover:border-[#146375]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step number and icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#146375] px-3 py-1 rounded-full bg-[#EEF3EE] border border-[#146375]/15">
                    {step.num}
                  </span>
                  <span className="w-10 h-10 rounded-2xl bg-[#EEF3EE] text-[#146375] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#146375] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#146375] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#3C8D70] font-semibold mb-4">
                  {step.subtitle}
                </p>

                <p className="text-sm text-[#146375]/80 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Progress pill footer */}
              <div className="pt-6 mt-6 border-t border-[#146375]/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3C8D70]" />
                <span className="text-[11px] font-mono text-[#146375]/60">
                  Phase {step.num} of 04
                </span>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
