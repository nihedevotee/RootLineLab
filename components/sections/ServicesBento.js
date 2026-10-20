'use client';

import Link from 'next/link';
import { services } from '@/data/services';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import {
  Globe,
  LayoutGrid,
  Smartphone,
  Cpu,
  Cloud,
  Palette,
  ShoppingBag,
  Layers,
  Network,
  Briefcase,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

const iconMap = {
  Globe,
  LayoutGrid,
  Smartphone,
  Cpu,
  Cloud,
  Palette,
  ShoppingBag,
  Layers,
  Network,
  Briefcase,
  ShieldCheck,
};

export default function ServicesBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {services.map((service, index) => {
        const IconComponent = iconMap[service.icon] || Globe;
        const isFeatured = index === 0 || index === 1 || index === 3;

        return (
          <RevealOnScroll
            key={service.id}
            delay={index * 0.05}
            className={`group relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${
              isFeatured
                ? 'md:col-span-2 bg-gradient-to-br from-[#146375] via-[#125360] to-[#0E3D47] text-white border border-[#3C8D70]/40'
                : 'bg-[#FBFAF2] text-[#146375] border border-[#146375]/15 hover:border-[#146375]/40 shadow-xs'
            }`}
          >
            {/* Top row: Icon and Badge */}
            <div className="flex items-start justify-between mb-6">
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                  isFeatured
                    ? 'bg-white/10 text-[#D4EA50]'
                    : 'bg-[#EEF3EE] text-[#146375]'
                }`}
              >
                <IconComponent className="w-6 h-6" />
              </span>

              <span
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full font-semibold ${
                  isFeatured
                    ? 'bg-[#3C8D70]/40 text-[#D4EA50] border border-[#3C8D70]/60'
                    : 'bg-[#EEF3EE] text-[#146375] border border-[#146375]/15'
                }`}
              >
                {service.badge}
              </span>
            </div>

            {/* Middle: Title & Description */}
            <div className="space-y-3 mb-8">
              <h3
                className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-200 ${
                  isFeatured ? 'text-white' : 'text-[#146375]'
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isFeatured ? 'text-[#F5EFB3]/90' : 'text-[#146375]/80'
                }`}
              >
                {service.shortDesc}
              </p>
            </div>

            {/* Bottom link: "Learn more ›" */}
            <div className="pt-4 border-t border-current/10 flex items-center justify-between">
              <Link
                href={`/services#${service.id}`}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold group/link focus:outline-none focus-visible:ring-2 rounded-md ${
                  isFeatured
                    ? 'text-[#D4EA50] hover:text-white'
                    : 'text-[#146375] hover:text-[#3C8D70]'
                }`}
              >
                <span>Learn more</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>

              <ArrowUpRight
                className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  isFeatured ? 'text-[#D4EA50]' : 'text-[#146375]'
                }`}
              />
            </div>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
