import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/demo', '/docs', '/docs/cli', '/docs/agents', '/about', '/contact', '/privacy', '/terms'].map(path => ({ url: `https://evograph.app${path}`, lastModified: '2026-10-09', changeFrequency: 'monthly' as const })); }
