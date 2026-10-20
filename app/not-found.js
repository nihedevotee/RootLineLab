import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ArrowLeft, Home, Compass, Mail } from 'lucide-react';

export const metadata = {
  title: '404 — Page Not Found | Rootline Lab',
  description: 'The requested page could not be located on the Rootline Lab website.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06161B] via-[#0B2A33] to-[#06161B] text-[#FBFAF2] flex items-center justify-center pt-24 pb-16 px-4">
      <Container size="narrow" className="text-center space-y-8">
        {/* Error Code Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#146375]/50 border border-[#3C8D70]/40 text-[#D4EA50] text-xs font-mono tracking-widest uppercase">
          <span>Error 404 • Missing Endpoint</span>
        </div>

        <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white leading-none">
          4<span className="text-[#D4EA50]">0</span>4
        </h1>

        <div className="space-y-3 max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            The page you are looking for may have been moved, renamed, or never existed in our codebase.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            href="/"
            variant="lime"
            size="md"
            iconRight={<Home className="w-4 h-4 ml-1" />}
          >
            Return to Homepage
          </Button>
          <Button
            href="/services"
            variant="dark-secondary"
            size="md"
            iconRight={<Compass className="w-4 h-4 ml-1" />}
          >
            Explore Services
          </Button>
          <Button
            href="/contact"
            variant="ghost"
            size="md"
            className="text-white hover:bg-white/10"
            iconRight={<Mail className="w-4 h-4 ml-1" />}
          >
            Contact Studio
          </Button>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs font-mono text-neutral-400">
          Rootline Lab — Dhaka, Bangladesh
        </div>
      </Container>
    </div>
  );
}
