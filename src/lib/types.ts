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

// Solid lacquer-seal badges — legible on both ink-green and parchment surfaces
export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  resolved: 'bg-[#a4823f] text-[#16100a] border border-[#c9a35e]/60',
  unresolved: 'bg-[#8a3d2a] text-[#f7f1e2] border border-[#b06a3b]/60',
  theory: 'bg-[#5b4a6b] text-[#f7f1e2] border border-[#8a76a0]/50',
  technique: 'bg-[#3d6051] text-[#f7f1e2] border border-[#5d8a75]/50',
  timeline: 'bg-[#3f5a6b] text-[#f7f1e2] border border-[#6d8da0]/50',
};
