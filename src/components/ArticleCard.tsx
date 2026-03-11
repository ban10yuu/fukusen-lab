import Link from 'next/link';
import { Article, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import { getMangaBySlug } from '@/data/manga';
import { tagToSlug } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
  showManga?: boolean;
}

export default function ArticleCard({ article, showManga = true }: ArticleCardProps) {
  const manga = getMangaBySlug(article.mangaSlug);
  const catLabel = CATEGORY_LABELS[article.category];
  const catColor = CATEGORY_COLORS[article.category];

  return (
    <div className="manga-panel group relative bg-[#14141e] rounded-xl border border-[#282838] overflow-hidden hover:border-[#dc2626]/40 transition-all">
      <div className="px-4 py-4">
        {/* Category badge + Manga link */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColor}`}>
            {catLabel}
          </span>
          {showManga && manga && (
            <Link
              href={`/manga/${manga.slug}/`}
              className="flex items-center gap-1.5 text-[10px] text-[#b0b0c0]/60 hover:text-[#f59e0b] transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: manga.coverColor }}
              />
              {manga.title}
            </Link>
          )}
        </div>

        {/* Title */}
        <Link href={`/article/${article.slug}/`}>
          <h3 className="font-bold text-sm text-[#eaeaf0] group-hover:text-[#dc2626] transition-colors line-clamp-2 mb-2 leading-snug">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-xs text-[#b0b0c0]/70 line-clamp-2 leading-relaxed mb-3">
          {article.excerpt}
        </p>

        {/* Tags + Read more */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {article.tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                href={`/tag/${tagToSlug(tag)}`}
                className="text-[9px] px-1.5 py-0.5 bg-[#1c1c28] text-[#b0b0c0]/60 rounded border border-[#282838] hover:border-[#dc2626]/40 hover:text-[#dc2626] transition-colors"

              >
                #{tag}
              </Link>
            ))}
          </div>
          <Link
            href={`/article/${article.slug}/`}
            className="text-[10px] font-bold text-[#dc2626] hover:text-[#f59e0b] transition-colors flex items-center gap-0.5"
          >
            続きを読む
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
