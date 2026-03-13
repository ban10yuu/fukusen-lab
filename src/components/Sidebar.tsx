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

      {/* Popular articles */}
      {popular.length > 0 && (
        <div className="bg-[#12121c] rounded border border-[#1e1e2e] p-4">
          <h3 className="text-xs font-black text-[#dc2626] mb-3">
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
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                    i === 0
                      ? 'bg-[#f59e0b] text-[#0a0a12]'
                      : i === 1
                        ? 'bg-[#b0b0c0] text-[#0a0a12]'
                        : i === 2
                          ? 'bg-[#cd7f32] text-[#0a0a12]'
                          : 'bg-[#1c1c28] text-gray-500 border border-[#282838]'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-[#dc2626] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <GoogleAd format="rectangle" />

      {/* Affiliate — compact */}
      <div className="bg-[#12121c] rounded border border-[#1e1e2e] p-4">
        <h3 className="text-xs font-black text-[#f59e0b] mb-3">
          電子書籍サービス
        </h3>
        <div className="space-y-2">
          {generalAffiliates.slice(0, 4).map(a => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-3 p-2 rounded border border-[#1e1e2e] hover:border-[#282838] transition-colors"
            >
              <div
                className="w-1 h-7 rounded-full flex-shrink-0"
                style={{ backgroundColor: a.color }}
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-gray-200 block">{a.title}</span>
                <span className="text-[10px] text-gray-600 line-clamp-1">{a.description}</span>
              </div>
            </a>
          ))}
          {generalAffiliates.length > 4 && (
            <details className="mt-1">
              <summary className="text-[10px] text-gray-600 cursor-pointer hover:text-[#f59e0b] transition-colors">
                他のサービス（{generalAffiliates.length - 4}件）
              </summary>
              <div className="space-y-2 mt-2">
                {generalAffiliates.slice(4).map(a => (
                  <a
                    key={a.title}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center gap-3 p-2 rounded border border-[#1e1e2e] hover:border-[#282838] transition-colors"
                  >
                    <div
                      className="w-1 h-7 rounded-full flex-shrink-0"
                      style={{ backgroundColor: a.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-gray-200 block">{a.title}</span>
                      <span className="text-[10px] text-gray-600 line-clamp-1">{a.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-[#12121c] rounded border border-[#1e1e2e] p-4">
        <h3 className="text-xs font-black text-gray-400 mb-3">
          カテゴリ
        </h3>
        <div className="space-y-1">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className="block py-1 text-xs text-gray-500 hover:text-[#dc2626] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-[#12121c] rounded border border-[#1e1e2e] p-4">
        <h3 className="text-xs font-black text-gray-400 mb-3">
          タグ
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map(({ tag }) => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="text-[10px] text-gray-600 hover:text-[#dc2626] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <Link
          href="/tags"
          className="inline-block text-[10px] text-[#dc2626] hover:text-[#f59e0b] mt-2 transition-colors"
        >
          すべてのタグ
        </Link>
      </div>

      {/* Manga list */}
      <div className="bg-[#12121c] rounded border border-[#1e1e2e] p-4">
        <h3 className="text-xs font-black text-gray-400 mb-3">
          作品一覧
        </h3>
        <div className="space-y-0.5">
          {mangaList.map(m => (
            <Link
              key={m.slug}
              href={`/manga/${m.slug}/`}
              className="flex items-center gap-2 py-1 group"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: m.coverColor }}
              />
              <span className="text-xs text-gray-500 group-hover:text-[#dc2626] transition-colors">
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
