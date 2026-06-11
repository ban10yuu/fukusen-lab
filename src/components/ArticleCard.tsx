import Link from 'next/link';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { getMangaBySlug } from '@/data/manga';
import { tagToSlug } from '@/lib/articles';

// Category accent inks on the parchment card
const CATEGORY_TEXT_COLORS: Record<string, string> = {
  resolved: 'text-[#8a6428]',
  unresolved: 'text-[#8a3d2a]',
  theory: 'text-[#5b4a6b]',
  technique: 'text-[#3d6051]',
  timeline: 'text-[#3f5a6b]',
};

// Stable case-file number derived from the slug (deterministic at build time)
function caseNumber(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) % 997;
  }
  return String((h % 99) + 1).padStart(2, '0');
}

interface ArticleCardProps {
  article: Article;
  showManga?: boolean;
  index?: number;
}

export default function ArticleCard({ article, showManga = true, index }: ArticleCardProps) {
  const manga = getMangaBySlug(article.mangaSlug);
  const catLabel = CATEGORY_LABELS[article.category];
  const catTextColor = CATEGORY_TEXT_COLORS[article.category] || 'text-sepia-500';
  const fileNo = index !== undefined ? String(index + 1).padStart(2, '0') : caseNumber(article.slug);

  return (
    <article className="group relative paper double-rule p-4 pt-3 transition-all duration-200 hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)] hover:-translate-y-0.5">
      {/* Case-file tab */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-parchment-line">
        <span className="font-serif text-[10px] font-bold tracking-[0.25em] uppercase text-brass-dark">
          File No.{fileNo}
        </span>
        <span className={`text-[10px] font-bold tracking-wide ${catTextColor}`}>
          {catLabel}
        </span>
      </div>

      {/* Meta line */}
      {showManga && manga && (
        <div className="mb-1.5 text-[10px]">
          <Link
            href={`/manga/${manga.slug}/`}
            className="text-sepia-500 hover:text-copper transition-colors"
          >
            {manga.title}
          </Link>
        </div>
      )}

      {/* Title */}
      <Link href={`/article/${article.slug}/`} className="block">
        <h3 className="font-serif font-bold text-sm text-sepia-900 group-hover:text-copper transition-colors line-clamp-2 mb-1.5 leading-relaxed tracking-wide">
          {article.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="text-xs text-sepia-500 line-clamp-2 leading-relaxed mb-2">
        {article.excerpt}
      </p>

      {/* Tags */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {article.tags.slice(0, 3).map(tag => (
          <Link
            key={tag}
            href={`/tag/${tagToSlug(tag)}`}
            className="text-[9px] text-sepia-500 hover:text-copper transition-colors px-1.5 py-1 inline-block"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
