export type ArticleCategory = 'resolved' | 'unresolved' | 'theory' | 'technique' | 'timeline';

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  mangaSlug: string;
  category: ArticleCategory;
  excerpt: string;
  sections: ArticleSection[];
  tags: string[];
  publishedAt: string;
  relatedSlugs?: string[];
}

export interface MangaInfo {
  slug: string;
  title: string;
  titleEn: string;
  author: string;
  status: 'ongoing' | 'completed';
  genre: string[];
  description: string;
  coverColor: string;
  ebookjapanId?: string;
  dmmBooksId?: string;
  amazonId?: string;
}

export interface AffiliateLink {
  service: 'ebookjapan' | 'dmm' | 'amazon' | 'cmoa' | 'renta' | 'rakuten' | 'kobo' | 'ameba' | 'booklive' | 'mangaoukoku';
  label: string;
  url: string;
  badge?: string;
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  resolved: '回収済みの伏線',
  unresolved: '未回収の伏線',
  theory: '伏線考察',
  technique: '伏線テクニック',
  timeline: '伏線タイムライン',
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  resolved: 'bg-red-900/40 text-red-300 border border-red-700/50',
  unresolved: 'bg-amber-900/40 text-amber-300 border border-amber-700/50',
  theory: 'bg-purple-900/40 text-purple-300 border border-purple-700/50',
  technique: 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50',
  timeline: 'bg-blue-900/40 text-blue-300 border border-blue-700/50',
};
