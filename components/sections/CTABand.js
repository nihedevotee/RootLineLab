import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { siteConfig } from '@/data/site';
import { Mail, ArrowRight } from 'lucide-react';

export default function CTABand({
  title,
  subtitle = 'Schedule a conversation with our engineering leads to discuss your requirements, architecture, or roadmap.',
  className = '',
}) {
  return (
    <section className={`relative bg-gradient-to-b from-[#0E3D47] via-[#125360] to-[#146375] text-white py-24 sm:py-32 overflow-hidden border-t border-[#3C8D70]/30 ${className}`}>
      {/* Background Soft Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-r from-[#3C8D70]/40 to-[#99CB5B]/20 rounded-full blur-[140px] pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0E3D47]/80 text-[#D4EA50] border border-[#3C8D70]/60 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4EA50] animate-pulse" />
            Let’s Build Together
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            {title || (
              <>
                Your business is unique.{' '}
                <span className="text-[#D4EA50]">Your software</span> should be, too.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#F5EFB3]/90 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="lime"
              size="lg"
              className="w-full sm:w-auto"
              iconRight={<ArrowRight className="w-5 h-5" />}
            >
              Start a project
            </Button>

            <a
              href={`mailto:${siteConfig.email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all duration-200"
            >
              <Mail className="w-4 h-4 text-[#99CB5B]" />
              <span>{siteConfig.email}</span>
            </a>
          </div>

          <p className="text-xs font-mono text-[#F5EFB3]/75 mt-8">
            Based in Dhaka, Bangladesh — Partnering with forward-looking businesses worldwide.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
