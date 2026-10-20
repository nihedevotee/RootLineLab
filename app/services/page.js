import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ServicesSubnav from '@/components/sections/ServicesSubnav';
import { services } from '@/data/services';
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
  CheckCircle2,
  Package,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Engineering & Design Services — Rootline Lab',
  description:
    'Comprehensive software development services: Web apps, mobile apps, custom software, ERPs, SaaS platforms, UI/UX design, and enterprise WordPress.',
};

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

export default function ServicesPage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#146375] via-[#125360] to-[#0E3D47] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0E3D47]/80 text-[#D4EA50] border border-[#3C8D70]/60 mb-6">
              Full-Spectrum Engineering
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Software engineered to match your operational ambition.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#F5EFB3]/90 max-w-2xl mx-auto leading-relaxed font-light">
              We build custom software, web applications, and resilient digital architectures across 11 focused domains. No generic off-the-shelf templates.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. STICKY SUB-NAV */}
      <ServicesSubnav />

      {/* 3. 11 SERVICE SECTIONS (Alternating layout) */}
      <div className="divide-y divide-[#146375]/10">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          const Icon = iconMap[service.icon] || Globe;
          const bgTheme = index % 4 === 1 ? 'mist' : index % 4 === 3 ? 'cream' : 'light';

          return (
            <Section
              key={service.id}
              id={service.id}
              theme={bgTheme}
              py="lg"
              className="scroll-mt-24"
            >
              <Container>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Text Column */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <RevealOnScroll>
                      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#146375]/10 text-[#146375] mb-2">
                        <Icon className="w-4 h-4" />
                        <span>Service 0{index + 1} • {service.badge}</span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A33] tracking-tight leading-[1.1]">
                        {service.title}
                      </h2>

                      <p className="text-base sm:text-lg text-[#0B2A33]/85 leading-relaxed font-normal pt-2">
                        {service.description}
                      </p>

                      {/* Feature Bullets */}
                      <div className="pt-4 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold">
                          Technical & Strategic Capabilities:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B2A33]/90">
                              <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-6 flex flex-wrap items-center gap-4">
                        <Button
                          href="/contact"
                          variant="primary"
                          size="md"
                          iconRight={<ArrowRight className="w-4 h-4" />}
                        >
                          Request Consultation
                        </Button>
                        <Button
                          href="/case-studies"
                          variant="ghost"
                          size="md"
                        >
                          View Related Projects ›
                        </Button>
                      </div>
                    </RevealOnScroll>
                  </div>

                  {/* Visual / Deliverables Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <RevealOnScroll
                      delay={0.15}
                      className="bg-[#FBFAF2] border border-[#146375]/20 rounded-3xl p-7 sm:p-9 shadow-lg space-y-6 relative overflow-hidden"
                    >
                      {/* Top Accent */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#146375]/15">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-2xl bg-[#146375] text-[#FBFAF2] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </span>
                          <div>
                            <p className="text-xs font-mono text-[#146375] font-semibold uppercase">
                              Standard Output
                            </p>
                            <h4 className="text-base font-bold text-[#0B2A33]">Typical Deliverables</h4>
                          </div>
                        </div>
                        <Package className="w-5 h-5 text-[#3C8D70]" />
                      </div>

                      {/* Deliverables checklist */}
                      <ul className="space-y-3.5">
                        {service.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-3 p-3 rounded-2xl bg-[#EEF3EE]/60 text-xs sm:text-sm text-[#0B2A33] font-medium"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#146375] shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Quality Guarantee Note */}
                      <div className="p-4 rounded-2xl bg-[#146375]/5 border border-[#146375]/15 text-xs text-[#0B2A33]/80 leading-relaxed">
                        <span className="font-semibold text-[#146375]">Engineering Standard:</span> All deliverables include full intellectual property transfer, version-controlled Git history, and automated testing coverage.
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              </Container>
            </Section>
          );
        })}
      </div>

      {/* 4. PROCESS SUMMARY */}
      <Section theme="mist" py="lg">
        <Container>
          <SectionHeading
            kicker="Our Execution Framework"
            title="Consistent engineering standards across every engagement."
            subhead="Whether developing a bespoke ERP or designing an accessible design system, our 4-step delivery pipeline guarantees transparency."
          />
          <ProcessSteps />
        </Container>
      </Section>

      {/* 5. CTA BAND */}
      <CTABand
        title="Ready to engineer your next software release?"
        subtitle="Schedule an architecture review with our technical leads in Dhaka."
      />
    </>
  );
}
