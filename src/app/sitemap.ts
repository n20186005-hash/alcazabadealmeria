import type { MetadataRoute } from 'next';

const BASE = 'https://www.alcazabadealmeria.com';
const locales = ['en', 'es', 'zh'] as const;
const paths = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'monthly' : 'yearly',
        priority: path === '' ? 1 : 0.4,
      });
    }
  }

  return entries;
}
