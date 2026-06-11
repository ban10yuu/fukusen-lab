import Link from 'next/link';
import { getPopularArticles, getAllTags, tagToSlug } from '@/lib/articles';
import { mangaList } from '@/data/manga';
import { generalAffiliates, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';
import AdBanner from './AdBanner';
import GoogleAd from '@/components/GoogleAd';

export default function Sidebar() {
  const popular = getPopularArticles(8);
  const categories = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];
  const popularTags = getAllTags().slice(0, 12);

  return (
    <aside className="space-y-6">
      <AdBanner size="medium" />

      {/* Popular articles — the investigation board */}
      {popular.length > 0 && (
        <div className="panel double-rule p-4">
          <h3 className="font-serif text-xs font-bold text-brass tracking-[0.15em] mb-3 pb-2 border-b border-ink-line">
            人気の伏線考察
          </h3>
          <div className="space-y-2">
            {popular.map((article, i) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}/`}
                className="flex items-start gap-2.5 group py-1"
              >
                <span
                  className={`rank-badge ${
                    i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-mist group-hover:text-brass-light transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <GoogleAd format="rectangle" />

      {/* Affiliate — compact */}
      <div className="panel double-rule p-4">
        <h3 className="font-serif text-xs font-bold text-brass tracking-[0.15em] mb-3 pb-2 border-b border-ink-line">
          電子書籍サービス
        </h3>
        <div className="space-y-2">
          {generalAffiliates.slice(0, 4).map(a => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-3 p-2 rounded-sm border border-ink-line hover:border-brass/50 hover:bg-ink-raised transition-colors"
            >
              <div
                className="w-1 h-7 rounded-full flex-shrink-0"
                style={{ backgroundColor: a.color }}
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-parchment block">{a.title}</span>
                <span className="text-[10px] text-mist-dim line-clamp-1">{a.description}</span>
              </div>
            </a>
          ))}
          {generalAffiliates.length > 4 && (
            <details className="mt-1">
              <summary className="text-[10px] text-mist-dim cursor-pointer hover:text-brass-light transition-colors">
                他のサービス（{generalAffiliates.length - 4}件）
              </summary>
              <div className="space-y-2 mt-2">
                {generalAffiliates.slice(4).map(a => (
                  <a
                    key={a.title}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center gap-3 p-2 rounded-sm border border-ink-line hover:border-brass/50 hover:bg-ink-raised transition-colors"
                  >
                    <div
                      className="w-1 h-7 rounded-full flex-shrink-0"
                      style={{ backgroundColor: a.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-parchment block">{a.title}</span>
                      <span className="text-[10px] text-mist-dim line-clamp-1">{a.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="panel double-rule p-4">
        <h3 className="font-serif text-xs font-bold text-brass tracking-[0.15em] mb-3 pb-2 border-b border-ink-line">
          カテゴリ
        </h3>
        <div className="space-y-1">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className="block py-1.5 text-xs text-mist hover:text-brass-light hover:translate-x-0.5 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="panel double-rule p-4">
        <h3 className="font-serif text-xs font-bold text-brass tracking-[0.15em] mb-3 pb-2 border-b border-ink-line">
          タグ
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map(({ tag }) => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="text-[10px] text-mist-dim hover:text-brass-light transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <Link
          href="/tags"
          className="inline-block text-[10px] text-brass hover:text-brass-light mt-2 transition-colors"
        >
          すべてのタグ →
        </Link>
      </div>

      {/* Manga list */}
      <div className="panel double-rule p-4">
        <h3 className="font-serif text-xs font-bold text-brass tracking-[0.15em] mb-3 pb-2 border-b border-ink-line">
          作品一覧
        </h3>
        <div className="space-y-0.5">
          {mangaList.map(m => (
            <Link
              key={m.slug}
              href={`/manga/${m.slug}/`}
              className="flex items-center gap-2 py-1.5 group"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 ring-1 ring-black/20"
                style={{ backgroundColor: m.coverColor }}
              />
              <span className="text-xs text-mist group-hover:text-brass-light transition-colors">
                {m.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <GoogleAd format="rectangle" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </aside>
  );
}
