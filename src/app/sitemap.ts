import { MetadataRoute } from 'next';
import { getAllArticlesUnfiltered } from '@/lib/articles';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS, ArticleCategory } from '@/lib/types';

export const dynamic = 'force-static';

const BASE_URL = 'https://fukusen-lab.vercel.app';
const TODAY = new Date().toISOString().slice(0, 10);

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticlesUnfiltered();
  const categories = Object.keys(CATEGORY_LABELS) as ArticleCategory[];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: TODAY,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE_URL}/article/${a.slug}/`,
    lastModified: a.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const mangaPages: MetadataRoute.Sitemap = mangaList.map(m => ({
    url: `${BASE_URL}/manga/${m.slug}/`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/category/all/`,
      lastModified: TODAY,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    ...categories.map(cat => ({
      url: `${BASE_URL}/category/${cat}/`,
      lastModified: TODAY,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...articlePages, ...mangaPages, ...categoryPages];
}
