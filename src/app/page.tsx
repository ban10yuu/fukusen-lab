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
      {/* Hero: featured case file on the desk */}
      <section className="pt-10 pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <p className="brass-label text-center mb-4">— Featured Case —</p>
          {heroArticle && (
            <Link
              href={`/article/${heroArticle.slug}`}
              className="group block paper double-rule p-6 md:p-8 mb-4 transition-all duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-parchment-line flex-wrap">
                <span className="font-serif text-[10px] font-bold tracking-[0.25em] uppercase text-brass-dark">
                  Case File No.01
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-black/20"
                  style={{ backgroundColor: heroManga?.coverColor }}
                />
                <span className="text-xs text-sepia-500">{heroManga?.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ml-auto ${CATEGORY_COLORS[heroArticle.category]}`}>
                  {CATEGORY_LABELS[heroArticle.category]}
                </span>
              </div>
              <h1 className="font-serif text-xl md:text-2xl font-extrabold text-sepia-900 mb-3 group-hover:text-copper transition-colors leading-relaxed tracking-wide">
                {heroArticle.title}
              </h1>
              <p className="text-sm text-sepia-700 line-clamp-3 max-w-3xl leading-relaxed">
                {heroArticle.excerpt}
              </p>
            </Link>
          )}

          {/* Sub-featured: 2 compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subArticles.map((article, i) => {
              const manga = mangaList.find(m => m.slug === article.mangaSlug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group paper double-rule p-4 transition-all duration-200 hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-serif text-[9px] font-bold tracking-[0.2em] uppercase text-brass-dark">
                      No.{String(i + 2).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-sepia-500">{manga?.title}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ml-auto ${CATEGORY_COLORS[article.category]}`}>
                      {CATEGORY_LABELS[article.category]}
                    </span>
                  </div>
                  <h2 className="font-serif text-sm font-bold text-sepia-900 group-hover:text-copper transition-colors leading-relaxed line-clamp-2 tracking-wide">
                    {article.title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="py-3">
        <div className="mx-auto max-w-6xl px-4">
          <GoogleAd className="my-1" />
        </div>
      </div>

      {/* Manga tags — horizontal scroll */}
      <section className="border-y border-ink-line py-3 overflow-x-auto bg-ink-deep/40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex gap-2 flex-nowrap">
            {mangaList.map(manga => (
              <Link
                key={manga.slug}
                href={`/manga/${manga.slug}`}
                className="flex-shrink-0 text-xs px-3 py-1 rounded-sm border border-ink-line text-mist hover:border-brass hover:text-brass-light transition-colors"
              >
                {manga.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resolved vs Unresolved — the core of this site */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resolved (brass) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="study-heading text-sm flex items-center gap-2 flex-1 mr-4">
                  <svg className="w-4 h-4 text-brass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  回収済みの伏線
                </h2>
                <Link href="/category/resolved" className="text-[10px] text-mist-dim hover:text-brass-light transition-colors">
                  すべて見る →
                </Link>
              </div>
              <div className="space-y-2">
                {resolvedArticles.map(article => {
                  const manga = mangaList.find(m => m.slug === article.mangaSlug);
                  return (
                    <Link
                      key={article.slug}
                      href={`/article/${article.slug}`}
                      className="group block panel p-3 hover:bg-ink-raised"
                    >
                      <span className="text-[10px] text-mist-dim">{manga?.title}</span>
                      <h3 className="text-xs font-bold text-mist group-hover:text-brass-light transition-colors line-clamp-2 leading-snug mt-0.5">
                        {article.title}
                      </h3>
                    </Link>
                  );
                })}
                {resolvedArticles.length === 0 && (
                  <p className="text-xs text-mist-dim">記事が見つかりませんでした。</p>
                )}
              </div>
            </div>

            {/* Unresolved (copper) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="study-heading text-sm flex items-center gap-2 flex-1 mr-4">
                  <svg className="w-4 h-4 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path strokeLinecap="round" strokeWidth="2.2" d="M15.5 15.5L21 21" />
                  </svg>
                  未回収の伏線
                </h2>
                <Link href="/category/unresolved" className="text-[10px] text-mist-dim hover:text-brass-light transition-colors">
                  すべて見る →
                </Link>
              </div>
              <div className="space-y-2">
                {unresolvedArticles.map(article => {
                  const manga = mangaList.find(m => m.slug === article.mangaSlug);
                  return (
                    <Link
                      key={article.slug}
                      href={`/article/${article.slug}`}
                      className="group block panel p-3 hover:bg-ink-raised"
                    >
                      <span className="text-[10px] text-mist-dim">{manga?.title}</span>
                      <h3 className="text-xs font-bold text-mist group-hover:text-brass-light transition-colors line-clamp-2 leading-snug mt-0.5">
                        {article.title}
                      </h3>
                    </Link>
                  );
                })}
                {unresolvedArticles.length === 0 && (
                  <p className="text-xs text-mist-dim">記事が見つかりませんでした。</p>
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
              <h2 className="study-heading text-base flex-1 mr-4">
                最新の伏線考察
              </h2>
              <Link
                href="/category/all"
                className="text-xs text-mist-dim hover:text-brass-light transition-colors"
              >
                すべて見る →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentArticles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i + 3} />
              ))}
            </div>

            <GoogleAd className="mt-6" />

            {/* All categories — compact */}
            <div className="mt-12">
              <h2 className="study-heading text-base mb-5">
                カテゴリ別に探す
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => {
                  const catArticles = getArticlesByCategory(key);
                  if (catArticles.length === 0) return null;
                  return (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="group panel p-3 text-center"
                    >
                      <h3 className="text-xs font-bold text-mist group-hover:text-brass-light transition-colors">
                        {label}
                      </h3>
                      <span className="font-serif text-[10px] mt-1 block text-brass">
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
                  className="inline-block bg-brass text-ink-deep px-8 py-3 rounded-sm text-sm font-bold hover:bg-brass-light transition-colors shadow-[0_2px_10px_rgba(201,163,94,0.3)]"
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
        <h2 className="font-serif text-sm font-bold text-parchment tracking-[0.1em] mb-4 text-center">
          全{mangaList.length}作品の伏線考察
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {mangaList.map(manga => (
            <Link
              key={manga.slug}
              href={`/manga/${manga.slug}`}
              className="group panel p-2.5 text-center"
            >
              <h3 className="text-[11px] font-bold text-mist group-hover:text-brass-light transition-colors">
                {manga.title}
              </h3>
              <span className="text-[9px] text-mist-dim">
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
