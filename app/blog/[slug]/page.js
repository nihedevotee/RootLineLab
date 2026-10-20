import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import { posts } from '@/data/posts';
import {
  ChevronLeft,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Article Not Found | Rootline Lab' };
  }

  return {
    title: `${post.title} — Rootline Lab Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current)
  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* 1. ARTICLE HEADER */}
      <section className="bg-gradient-to-b from-[#06161B] via-[#0B2A33] to-[#06161B] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default">
          <div className="max-w-[760px] mx-auto">
            {/* Back to blog */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4EA50] hover:text-white transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-6">
              <span className="px-3 py-1 rounded-full bg-[#146375]/60 text-[#D4EA50] border border-[#3C8D70]/40">
                {post.category}
              </span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#99CB5B]" />
                {post.readTime}
              </span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#99CB5B]" />
                {post.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              {post.title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-300 leading-relaxed font-light">
              {post.excerpt}
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span>By {post.author}</span>
              <span className="font-mono text-[#99CB5B]">Rootline Lab Engineering</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. ARTICLE READING BODY (Max width ~720px) */}
      <Section theme="light" py="lg">
        <Container size="default">
          <article className="max-w-[720px] mx-auto text-[#0B2A33] leading-relaxed">
            <div className="space-y-7 text-base sm:text-lg">
              {post.content.map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2A33] pt-6 pb-1 border-b border-[#146375]/10"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul key={idx} className="space-y-3.5 my-4 pl-1">
                      {block.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-3 text-base">
                          <CheckCircle2 className="w-5 h-5 text-[#3C8D70] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={idx} className="text-[#0B2A33]/85 font-normal leading-relaxed">
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Author Attribution Card */}
            <div className="mt-14 p-8 rounded-3xl bg-[#EEF3EE]/60 border border-[#146375]/15 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold">
                Written By {post.author}
              </span>
              <p className="text-sm text-[#0B2A33]/80 leading-relaxed font-normal">
                At Rootline Lab, our technical leads and product engineers write directly about real architectures, client dilemmas, and lessons learned from production deployments in Dhaka and globally.
              </p>
            </div>
          </article>
        </Container>
      </Section>

      {/* 3. RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <Section theme="mist" py="lg" className="border-t border-[#146375]/10">
          <Container>
            <div className="max-w-[720px] mx-auto">
              <h3 className="text-2xl font-bold text-[#0B2A33] tracking-tight mb-8">
                Related Articles
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="group bg-[#FBFAF2] p-6 rounded-3xl border border-[#146375]/15 hover:border-[#146375]/40 transition-all duration-300 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#146375] font-semibold">
                        {rPost.category}
                      </span>
                      <h4 className="text-lg font-bold text-[#0B2A33] group-hover:text-[#146375] transition-colors mt-2 mb-3">
                        {rPost.title}
                      </h4>
                      <p className="text-xs text-[#0B2A33]/70 line-clamp-2 leading-relaxed">
                        {rPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#146375]/10 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-mono">{rPost.readTime}</span>
                      <span className="font-semibold text-[#146375] inline-flex items-center gap-1">
                        Read
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 4. CTA BAND */}
      <CTABand
        title="Ready to discuss your software architecture?"
        subtitle="Book a technical strategy call with our software engineering leads."
      />
    </>
  );
}
