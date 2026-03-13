import Link from 'next/link';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { getMangaBySlug } from '@/data/manga';
import { tagToSlug } from '@/lib/articles';

// Color role: crimson=unresolved, amber=resolved, muted for others
const CATEGORY_TEXT_COLORS: Record<string, string> = {
  resolved: 'text-amber-400',
  unresolved: 'text-red-400',
  theory: 'text-purple-400',
  technique: 'text-emerald-400',
  timeline: 'text-blue-400',
};

interface ArticleCardProps {
  article: Article;
  showManga?: boolean;
}

export default function ArticleCard({ article, showManga = true }: ArticleCardProps) {
  const manga = getMangaBySlug(article.mangaSlug);
  const catLabel = CATEGORY_LABELS[article.category];
  const catTextColor = CATEGORY_TEXT_COLORS[article.category] || 'text-gray-400';

  return (
    <article className="group">
      <div className="py-3 px-1">
        {/* Meta line */}
        <div className="flex items-center gap-2 mb-1.5 text-[10px]">
          <span className={`font-bold ${catTextColor}`}>
            {catLabel}
          </span>
          {showManga && manga && (
            <Link
              href={`/manga/${manga.slug}/`}
              className="text-gray-600 hover:text-[#f59e0b] transition-colors"
            >
              {manga.title}
            </Link>
          )}
        </div>

        {/* Title */}
        <Link href={`/article/${article.slug}/`}>
          <h3 className="font-bold text-sm text-gray-300 group-hover:text-[#dc2626] transition-colors line-clamp-2 mb-1.5 leading-snug">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {article.tags.slice(0, 3).map(tag => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="text-[9px] text-gray-600 hover:text-[#dc2626] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
