import { siteConfig } from '@/data/site';

export default function robots() {
  const baseUrl = siteConfig.url || 'https://rootlinelab.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
