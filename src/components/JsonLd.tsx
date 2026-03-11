import { Article, ArticleSection } from '@/lib/types';
import { MangaInfo } from '@/lib/types';
import { tagToSlug } from '@/lib/articles';

const BASE_URL = 'https://fukusen-lab.vercel.app';
const PUBLISHER = {
  '@type': 'Organization',
  name: '伏線回収ラボ',
  url: BASE_URL,
};

// --- Article JSON-LD ---
interface ArticleJsonLdProps {
  article: Article;
  mangaTitle?: string;
}

export function ArticleJsonLd({ article, mangaTitle }: ArticleJsonLdProps) {
  const url = `${BASE_URL}/article/${article.slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: PUBLISHER,
    publisher: PUBLISHER,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: article.tags.join(', '),
    articleSection: mangaTitle || '漫画伏線考察',
    inLanguage: 'ja',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Breadcrumb JSON-LD ---
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- FAQ JSON-LD ---
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqJsonLdProps {
  items: FaqItem[];
}

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  if (items.length === 0) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- CollectionPage JSON-LD for manga pages ---
interface MangaPageJsonLdProps {
  manga: MangaInfo;
  articleCount: number;
}

export function MangaPageJsonLd({ manga, articleCount }: MangaPageJsonLdProps) {
  const url = `${BASE_URL}/manga/${manga.slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${manga.title}の伏線回収・未回収の伏線まとめ`,
    description: manga.description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: '伏線回収ラボ',
      url: BASE_URL,
    },
    about: {
      '@type': 'CreativeWorkSeries',
      name: manga.title,
      alternateName: manga.titleEn,
      author: {
        '@type': 'Person',
        name: manga.author,
      },
    },
    numberOfItems: articleCount,
    inLanguage: 'ja',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Tag CollectionPage JSON-LD ---
interface TagPageJsonLdProps {
  tag: string;
  articleCount: number;
}

export function TagPageJsonLd({ tag, articleCount }: TagPageJsonLdProps) {
  const url = `${BASE_URL}/tag/${tagToSlug(tag)}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `「${tag}」の伏線考察記事一覧`,
    description: `「${tag}」に関連する漫画の伏線回収・伏線考察記事を${articleCount}件掲載。`,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: '伏線回収ラボ',
      url: BASE_URL,
    },
    numberOfItems: articleCount,
    inLanguage: 'ja',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Build FAQ from article sections ---
export function buildFaqFromSections(sections: ArticleSection[], mangaTitle?: string): FaqItem[] {
  return sections
    .filter(s => s.heading && s.content)
    .slice(0, 5)
    .map(section => {
      // Strip HTML tags for answer text, take first 300 chars
      const plainText = section.content
        .replace(/<[^>]*>/g, '')
        .replace(/\n\n/g, ' ')
        .slice(0, 300);
      const prefix = mangaTitle ? `${mangaTitle}の` : '';
      return {
        question: `${prefix}${section.heading}とは？`,
        answer: plainText + (plainText.length >= 300 ? '...' : ''),
      };
    });
}
