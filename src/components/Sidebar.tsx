import Link from 'next/link';
import { getPopularArticles, getAllTags, tagToSlug } from '@/lib/articles';
import { mangaList } from '@/data/manga';
import { generalAffiliates, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';
import AdBanner from './AdBanner';
import GoogleAd from '@/components/GoogleAd';

export default function Sidebar() {
  const popular = getPopularArticles(10);
  const featuredAffiliates = generalAffiliates.slice(0, 4);
  const moreAffiliates = generalAffiliates.slice(4);
  const categories = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];
  const popularTags = getAllTags().slice(0, 15);

  return (
    <aside className="space-y-6">
      {/* Ad Banner */}
      <AdBanner size="medium" />

      {/* Affiliate section */}
      <div className="bg-[#14141e] rounded-xl border border-[#282838] p-4">
        <h3 className="font-bold text-sm text-[#eaeaf0] mb-3 flex items-center gap-2">
          <span className="text-[#f59e0b]">&#9632;</span> 電子書籍サービス
        </h3>
        <div className="space-y-2">
          {featuredAffiliates.map(a => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block p-3 rounded-lg transition-all hover:brightness-110 border border-transparent hover:border-[#282838]"
              style={{
                backgroundColor: `${a.color}15`,
                borderLeftWidth: '3px',
                borderLeftColor: a.color,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#eaeaf0]">{a.title}</span>
                {a.badge && (
                  <span className="text-[9px] font-bold bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 px-1.5 py-0.5 rounded">
                    {a.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#b0b0c0]/60 line-clamp-1">{a.description}</p>
            </a>
          ))}
        </div>

        {/* Expandable section for remaining affiliates */}
        {moreAffiliates.length > 0 && (
          <details className="mt-3">
            <summary className="text-xs text-[#dc2626] hover:text-[#f59e0b] cursor-pointer font-semibold transition-colors text-center">
              他のサービスを見る ({moreAffiliates.length}件)
            </summary>
            <div className="space-y-2 mt-2">
              {moreAffiliates.map(a => (
                <a
                  key={a.title}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block p-3 rounded-lg transition-all hover:brightness-110 border border-transparent hover:border-[#282838]"
                  style={{
                    backgroundColor: `${a.color}15`,
                    borderLeftWidth: '3px',
                    borderLeftColor: a.color,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#eaeaf0]">{a.title}</span>
                    {a.badge && (
                      <span className="text-[9px] font-bold bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 px-1.5 py-0.5 rounded">
                        {a.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#b0b0c0]/60 line-clamp-1">{a.description}</p>
                </a>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* GoogleAd */}
      <GoogleAd format="rectangle" />

      {/* Popular articles ranking (10 items) */}
      {popular.length > 0 && (
        <div className="bg-[#14141e] rounded-xl border border-[#282838] p-4">
          <h3 className="font-bold text-sm text-[#eaeaf0] mb-3 flex items-center gap-2">
            <span className="text-[#dc2626]">&#9632;</span> 人気の伏線考察ランキング
          </h3>
          <div className="space-y-2">
            {popular.map((article, i) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}/`}
                className="flex items-start gap-2.5 group py-1.5"
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                    i === 0
                      ? 'rank-1 bg-[#f59e0b] text-[#0a0a12] shadow-sm shadow-[#f59e0b]/30'
                      : i === 1
                        ? 'rank-2 bg-[#b0b0c0] text-[#0a0a12] shadow-sm'
                        : i === 2
                          ? 'rank-3 bg-[#cd7f32] text-[#0a0a12] shadow-sm'
                          : 'rank-other bg-[#1c1c28] text-[#b0b0c0]/60 border border-[#282838]'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-[#b0b0c0] group-hover:text-[#dc2626] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Links */}
      <div className="bg-[#14141e] rounded-xl border border-[#282838] p-4">
        <h3 className="font-bold text-sm text-[#eaeaf0] mb-3 flex items-center gap-2">
          <span className="text-[#dc2626]">&#9632;</span> 伏線カテゴリ
        </h3>
        <div className="space-y-1">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className="flex items-center gap-2 text-xs text-[#b0b0c0] hover:text-[#dc2626] transition-colors py-1.5 group"
            >
              <span className="text-[10px] text-gray-600 group-hover:text-[#dc2626]">&rsaquo;</span>
              {label}
            </Link>
          ))}
          <Link
            href="/category/all/"
            className="flex items-center gap-2 text-xs text-[#dc2626] hover:text-[#f59e0b] transition-colors py-1.5 font-bold"
          >
            すべての記事を見る &rarr;
          </Link>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-[#14141e] rounded-xl border border-[#282838] p-4">
        <h3 className="font-bold text-sm text-[#eaeaf0] mb-3 flex items-center gap-2">
          <span className="text-[#f59e0b]">&#9632;</span> 人気タグ
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map(({ tag }) => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="text-[10px] text-[#b0b0c0]/60 bg-[#1c1c28] border border-[#282838] px-2 py-0.5 rounded hover:border-[#dc2626]/40 hover:text-[#dc2626] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <Link
          href="/tags"
          className="inline-block text-xs text-[#dc2626] hover:text-[#f59e0b] font-bold mt-2 transition-colors"
        >
          タグ一覧 &rarr;
        </Link>
      </div>

      {/* All manga list */}
      <div className="bg-[#14141e] rounded-xl border border-[#282838] p-4">
        <h3 className="font-bold text-sm text-[#eaeaf0] mb-3 flex items-center gap-2">
          <span className="text-[#f59e0b]">&#9632;</span> 作品一覧
        </h3>
        <div className="space-y-1">
          {mangaList.map(m => (
            <Link
              key={m.slug}
              href={`/manga/${m.slug}/`}
              className="flex items-center gap-2.5 py-1.5 group"
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: m.coverColor }}
              />
              <span className="text-xs text-[#b0b0c0] group-hover:text-[#dc2626] transition-colors font-medium">
                {m.title}
              </span>
              <span className="text-[9px] ml-auto px-1.5 py-0.5 rounded" style={{
                backgroundColor: m.status === 'ongoing' ? 'rgba(220,38,38,0.15)' : 'rgba(180,180,200,0.15)',
                color: m.status === 'ongoing' ? '#dc2626' : '#b0b0c0',
              }}>
                {m.status === 'ongoing' ? '連載中' : '完結'}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* GoogleAd */}
      <GoogleAd format="rectangle" />

      {/* Moshimo impression tracking pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </aside>
  );
}
