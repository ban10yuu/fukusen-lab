import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import GoogleAd from '@/components/GoogleAd';
import { getAllArticles, getArticlesByCategory } from '@/lib/articles';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export default function Home() {
  const articles = getAllArticles();
  const heroArticle = articles[0];
  const heroManga = heroArticle ? mangaList.find(m => m.slug === heroArticle.mangaSlug) : null;
  const subArticles = articles.slice(1, 3);
  const recentArticles = articles.slice(3, 15);

  // Category-grouped: resolved vs unresolved for prominence
  const resolvedArticles = getArticlesByCategory('resolved').slice(0, 4);
  const unresolvedArticles = getArticlesByCategory('unresolved').slice(0, 4);

  return (
    <>
      {/* Hero: Single large featured article */}
      <section className="bg-[#0a0a12] pt-10 pb-8">
        <div className="mx-auto max-w-6xl px-4">
          {heroArticle && (
            <Link
              href={`/article/${heroArticle.slug}`}
              className="group block bg-[#12121c] rounded border border-[#1e1e2e] p-6 md:p-8 hover:border-[#dc2626]/40 transition-colors mb-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: heroManga?.coverColor }}
                />
                <span className="text-xs text-gray-500">{heroManga?.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ml-2 ${CATEGORY_COLORS[heroArticle.category]}`}>
                  {CATEGORY_LABELS[heroArticle.category]}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-gray-200 mb-3 group-hover:text-[#dc2626] transition-colors leading-snug">
                {heroArticle.title}
              </h1>
              <p className="text-sm text-gray-500 line-clamp-3 max-w-3xl leading-relaxed">
                {heroArticle.excerpt}
              </p>
            </Link>
          )}

          {/* Sub-featured: 2 compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subArticles.map(article => {
              const manga = mangaList.find(m => m.slug === article.mangaSlug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group bg-[#12121c] rounded border border-[#1e1e2e] p-4 hover:border-[#dc2626]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-gray-600">{manga?.title}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${CATEGORY_COLORS[article.category]}`}>
                      {CATEGORY_LABELS[article.category]}
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-gray-300 group-hover:text-[#dc2626] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-[#0a0a12] py-3">
        <div className="mx-auto max-w-6xl px-4">
          <GoogleAd className="my-1" />
        </div>
      </div>

      {/* Manga tags — horizontal scroll */}
      <section className="bg-[#0a0a12] border-b border-[#1e1e2e] py-3 overflow-x-auto">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex gap-2 flex-nowrap">
            {mangaList.map(manga => (
              <Link
                key={manga.slug}
                href={`/manga/${manga.slug}`}
                className="flex-shrink-0 text-xs px-3 py-1 rounded border border-[#1e1e2e] text-gray-500 hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
              >
                {manga.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resolved vs Unresolved — the core of this site */}
      <section className="bg-[#0a0a12] py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resolved (amber) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-[#f59e0b] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  回収済みの伏線
                </h2>
                <Link href="/category/resolved" className="text-[10px] text-gray-600 hover:text-[#f59e0b] transition-colors">
                  すべて見る
                </Link>
              </div>
              <div className="space-y-2">
                {resolvedArticles.map(article => {
                  const manga = mangaList.find(m => m.slug === article.mangaSlug);
                  return (
                    <Link
                      key={article.slug}
                      href={`/article/${article.slug}`}
                      className="group block bg-[#12121c] rounded border border-[#1e1e2e] p-3 hover:border-[#f59e0b]/30 transition-colors"
                    >
                      <span className="text-[10px] text-gray-600">{manga?.title}</span>
                      <h3 className="text-xs font-bold text-gray-300 group-hover:text-[#f59e0b] transition-colors line-clamp-2 leading-snug mt-0.5">
                        {article.title}
                      </h3>
                    </Link>
                  );
                })}
                {resolvedArticles.length === 0 && (
                  <p className="text-xs text-gray-600">記事が見つかりませんでした。</p>
                )}
              </div>
            </div>

            {/* Unresolved (crimson) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-[#dc2626] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
                  未回収の伏線
                </h2>
                <Link href="/category/unresolved" className="text-[10px] text-gray-600 hover:text-[#dc2626] transition-colors">
                  すべて見る
                </Link>
              </div>
              <div className="space-y-2">
                {unresolvedArticles.map(article => {
                  const manga = mangaList.find(m => m.slug === article.mangaSlug);
                  return (
                    <Link
                      key={article.slug}
                      href={`/article/${article.slug}`}
                      className="group block bg-[#12121c] rounded border border-[#1e1e2e] p-3 hover:border-[#dc2626]/30 transition-colors"
                    >
                      <span className="text-[10px] text-gray-600">{manga?.title}</span>
                      <h3 className="text-xs font-bold text-gray-300 group-hover:text-[#dc2626] transition-colors line-clamp-2 leading-snug mt-0.5">
                        {article.title}
                      </h3>
                    </Link>
                  );
                })}
                {unresolvedArticles.length === 0 && (
                  <p className="text-xs text-gray-600">記事が見つかりませんでした。</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: articles + sidebar */}
      <section className="mx-auto max-w-6xl px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span className="text-[#dc2626]">▎</span>
                最新の伏線考察
              </h2>
              <Link
                href="/category/all"
                className="text-xs text-gray-600 hover:text-[#dc2626] transition-colors"
              >
                すべて見る
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            <GoogleAd className="mt-6" />

            {/* All categories — compact */}
            <div className="mt-12">
              <h2 className="text-base font-black text-white mb-5 flex items-center gap-2">
                <span className="text-[#dc2626]">▎</span>
                カテゴリ別に探す
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => {
                  const catArticles = getArticlesByCategory(key);
                  if (catArticles.length === 0) return null;
                  const isResolved = key === 'resolved';
                  const isUnresolved = key === 'unresolved';
                  const accent = isResolved ? '#f59e0b' : isUnresolved ? '#dc2626' : '#b0b0c0';
                  return (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="group bg-[#12121c] rounded border border-[#1e1e2e] p-3 text-center hover:border-current/30 transition-colors"
                    >
                      <h3 className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                        {label}
                      </h3>
                      <span className="text-[10px] mt-1 block" style={{ color: accent }}>
                        {catArticles.length}件
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <GoogleAd className="mt-6" />

            {articles.length > 15 && (
              <div className="text-center mt-8">
                <Link
                  href="/category/all"
                  className="inline-block bg-[#dc2626] text-white px-8 py-3 rounded text-sm font-bold hover:bg-[#b91c1c] transition-colors"
                >
                  すべての記事を見る（{articles.length}件）
                </Link>
              </div>
            )}
          </div>

          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* All manga — compact grid at bottom */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-sm font-black text-white mb-4 text-center">
          全{mangaList.length}作品の伏線考察
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {mangaList.map(manga => (
            <Link
              key={manga.slug}
              href={`/manga/${manga.slug}`}
              className="group bg-[#12121c] rounded border border-[#1e1e2e] p-2.5 hover:border-[#dc2626]/30 transition-colors text-center"
            >
              <h3 className="text-[11px] font-bold text-gray-400 group-hover:text-[#dc2626] transition-colors">
                {manga.title}
              </h3>
              <span className="text-[9px] text-gray-600">
                {manga.status === 'ongoing' ? '連載中' : '完結'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '伏線回収ラボ',
            description: '人気漫画の伏線回収・未回収の伏線・伏線考察を徹底解説する専門サイト',
            url: 'https://fukusen-lab.vercel.app',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://fukusen-lab.vercel.app/category/all?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: 'https://fukusen-lab.vercel.app' },
        ]}
      />
    </>
  );
}
