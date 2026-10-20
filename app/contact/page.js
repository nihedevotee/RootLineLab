import Container from '@/components/ui/Container';
import ContactForm from '@/components/sections/ContactForm';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { siteConfig } from '@/data/site';
import { Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — Start Your Project | Rootline Lab',
  description:
    'Let’s build something that grows with you. Contact Rootline Lab in Dhaka, Bangladesh for custom software, web applications, and digital engineering.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-gradient-to-b from-[#FBFAF2] via-[#EEF3EE]/40 to-[#FBFAF2]">
      <Container size="default">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#146375]/10 text-[#146375] font-semibold mb-4">
            Direct Engineering Inquiries
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0B2A33] leading-[1.08]">
            Let’s build something that grows with you.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#0B2A33]/80 leading-relaxed font-light">
            Share your concept, system specifications, or technical bottlenecks. We review every submission and schedule an initial discovery call within 24 hours.
          </p>
        </div>

        {/* Two-Column Grid: Form Left, Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <ContactForm />
            </RevealOnScroll>
          </div>

          {/* Right Column: Contact Details & Promises */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Details Card */}
            <RevealOnScroll
              delay={0.1}
              className="bg-gradient-to-br from-[#146375] to-[#0E3D47] text-[#FBFAF2] rounded-3xl p-8 sm:p-9 border border-[#3C8D70]/40 shadow-xl space-y-6"
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#99CB5B] font-semibold mb-1">
                  Dhaka Headquarters
                </p>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Rootline Lab Studio
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#D4EA50] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#F5EFB3]/75 font-mono">Location</p>
                    <p className="text-sm font-medium text-white">{siteConfig.location}</p>
                    <p className="text-xs text-[#F5EFB3]/60 mt-0.5">Serving clients locally and internationally</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#99CB5B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-neutral-400 font-mono">Primary Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-[#D4EA50] hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#3C8D70] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-neutral-400 font-mono">Working Hours</p>
                    <p className="text-sm font-medium text-white">{siteConfig.hours}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Prompt response guarantee</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#99CB5B] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#99CB5B] animate-pulse" />
                  <span>24-Hour Technical Review Turnaround</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* What to Expect Card */}
            <RevealOnScroll
              delay={0.2}
              className="bg-[#FBFAF2] border border-[#146375]/15 rounded-3xl p-8 sm:p-9 shadow-sm space-y-4"
            >
              <h4 className="text-lg font-bold text-[#0B2A33] tracking-tight">
                What happens after you reach out?
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#0B2A33]/85">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                  <span><strong>NDA & Privacy:</strong> Your proprietary concepts and business information are treated with strict confidentiality.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                  <span><strong>Technical Scoping:</strong> An engineer (not a high-pressure sales rep) assesses feasibility and software architecture.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3C8D70] shrink-0 mt-0.5" />
                  <span><strong>Transparent Estimate:</strong> You receive a structured scope breakdown with milestone deliverables and timeline options.</span>
                </li>
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </div>
  );
}
