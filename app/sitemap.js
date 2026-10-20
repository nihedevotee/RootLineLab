import { siteConfig } from '@/data/site';
import { caseStudies } from '@/data/caseStudies';
import { posts } from '@/data/posts';

export default function sitemap() {
  const baseUrl = siteConfig.url || 'https://rootlinelab.com';
  const now = new Date('2026-10-20T00:00:00.000Z');

  const staticPages = [
    '',
    '/services',
    '/solutions',
    '/products',
    '/industries',
    '/case-studies',
    '/about',
    '/careers',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudyPages, ...blogPages];
}
