'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import FilterChips from '@/components/ui/FilterChips';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CTABand from '@/components/sections/CTABand';
import { posts } from '@/data/posts';
import { Search, Clock, Calendar, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const blogCategories = [
  'All Articles',
  'Architecture & Strategy',
  'Product Strategy',
  'Engineering & CMS',
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'All Articles' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#06161B] via-[#0B2A33] to-[#06161B] text-[#FBFAF2] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#146375]/50 text-[#D4EA50] border border-[#3C8D70]/40 mb-6">
              Engineering & Architecture Insights
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Practical perspectives on modern software engineering.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
              Clear, honest writing from our technical leads in Dhaka on system architecture, custom software scoping, and digital platforms.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2. FEATURED POST (Large Apple-style showcase) */}
      {featuredPost && (
        <Section theme="mist" py="default" className="border-b border-[#146375]/10">
          <Container size="default">
            <span className="text-xs font-mono uppercase tracking-wider text-[#146375] font-bold block mb-4">
              Featured Strategic Analysis
            </span>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl bg-[#FBFAF2] border border-[#146375]/15 p-8 sm:p-12 lg:p-14 shadow-md hover:shadow-2xl hover:border-[#146375]/40 transition-all duration-300"
            >
              <div className="max-w-4xl space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-[#146375] text-[#FBFAF2] font-semibold">
                    {featuredPost.category}
                  </span>
                  <span className="text-[#0B2A33]/70 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#3C8D70]" />
                    {featuredPost.readTime}
                  </span>
                  <span className="text-[#0B2A33]/70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#3C8D70]" />
                    {featuredPost.date}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0B2A33] tracking-tight group-hover:text-[#146375] transition-colors leading-[1.1]">
                  {featuredPost.title}
                </h2>

                <p className="text-base sm:text-lg text-[#0B2A33]/80 leading-relaxed font-normal">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-[#146375] group-hover:text-[#3C8D70]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          </Container>
        </Section>
      )}

      {/* 3. ARTICLES DIRECTORY (With search & category filter) */}
      <Section theme="light" py="lg">
        <Container>
          {/* Controls Bar: Filter Chips Left, Search Input Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <FilterChips
              categories={blogCategories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* Client-side Search */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-[#146375] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#146375]/20 text-xs sm:text-sm text-[#0B2A33] placeholder-[#0B2A33]/40 focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="h-full bg-[#FBFAF2] rounded-3xl p-7 sm:p-8 border border-[#146375]/15 hover:border-[#146375]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group block"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 text-xs font-mono">
                        <span className="text-[#146375] font-semibold bg-[#EEF3EE] px-2.5 py-1 rounded-md">
                          {post.category}
                        </span>
                        <span className="text-[#0B2A33]/60">{post.readTime}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B2A33] tracking-tight mb-3 group-hover:text-[#146375] transition-colors leading-[1.2]">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#0B2A33]/80 leading-relaxed font-normal mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#146375]/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-[#0B2A33]/60">{post.date}</span>
                      <span className="font-semibold text-[#146375] group-hover:text-[#3C8D70] inline-flex items-center gap-1">
                        Read
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="py-16 text-center text-sm text-[#0B2A33]/60">
              No articles found matching &quot;{searchQuery}&quot;. Try adjusting your search term.
            </div>
          )}
        </Container>
      </Section>

      {/* 4. CTA BAND */}
      <CTABand />
    </>
  );
}
