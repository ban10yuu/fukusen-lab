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
  const featuredArticles = articles.slice(0, 3);
  const recentArticles = articles.slice(3, 15);

  return (
    <>
      {/* Hero with speed lines */}
      <section className="speed-lines bg-gradient-to-b from-[#0a0a12] via-[#10101a] to-[#0a0a12] py-16 border-b-2 border-[#1e1e2e]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <p className="text-[#dc2626] text-xs font-black tracking-[0.3em] uppercase mb-3">
              Foreshadowing Analysis Lab
            </p>
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">
              漫画の
              <span className="text-[#dc2626]">伏線回収</span>
              ・未回収の伏線を徹底解剖
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              ONE PIECE・進撃の巨人・呪術廻戦・鬼滅の刃・HUNTER×HUNTERなど人気漫画の伏線回収・未回収の伏線・伏線考察を徹底解説。回収済みの伏線から未回収の謎まで、漫画の伏線を深く読み解く。
            </p>
          </div>

          {/* Featured Articles: large first + 2 small */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Large featured */}
            {featuredArticles[0] && (() => {
              const manga = mangaList.find(m => m.slug === featuredArticles[0].mangaSlug);
              return (
                <Link
                  href={`/article/${featuredArticles[0].slug}`}
                  className="group manga-panel !bg-[#12121c] p-6 hover:!border-[#dc2626] md:row-span-2"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: manga?.coverColor }}
                    />
                    <span className="text-xs text-gray-500 font-medium">{manga?.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#dc2626]/20 text-[#dc2626] border border-[#dc2626]/30 ml-auto">
                      PICK UP
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-black text-gray-200 mb-3 group-hover:text-[#dc2626] transition-colors leading-snug">
                    {featuredArticles[0].title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{featuredArticles[0].excerpt}</p>
                  <div className="flex gap-2 flex-wrap">
                    {featuredArticles[0].tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] text-gray-600 bg-[#1a1a28] px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })()}

            {/* 2 small featured */}
            {featuredArticles.slice(1, 3).map(article => {
              const manga = mangaList.find(m => m.slug === article.mangaSlug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group manga-panel !bg-[#12121c] p-5 hover:!border-[#dc2626]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: manga?.coverColor }}
                    />
                    <span className="text-xs text-gray-500 font-medium">{manga?.title}</span>
                  </div>
                  <h2 className="text-sm font-bold text-gray-200 mb-2 group-hover:text-[#dc2626] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-2">{article.excerpt}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GoogleAd: After hero */}
      <div className="bg-[#0a0a12] py-4">
        <div className="mx-auto max-w-7xl px-4">
          <GoogleAd className="my-2" />
        </div>
      </div>

      {/* Manga Tags Bar — 全20作品の伏線考察 */}
      <section className="bg-[#0a0a12] border-b border-[#1e1e2e] py-3 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="sr-only">人気漫画の伏線考察一覧</h2>
          <div className="flex gap-2 flex-nowrap">
            {mangaList.map(manga => (
              <Link
                key={manga.slug}
                href={`/manga/${manga.slug}`}
                className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded border border-[#1e1e2e] text-gray-500 hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-[#dc2626]/5 transition-all"
              >
                {manga.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-[#dc2626]">▎</span>
                最新の伏線考察
              </h2>
              <div className="flex gap-3">
                {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).slice(0, 3).map(
                  ([key, label]) => (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="text-xs text-gray-600 hover:text-[#dc2626] transition-colors font-medium"
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* GoogleAd: After article grid */}
            <GoogleAd className="mt-6" />

            {/* "すべての記事を見る" link */}
            {articles.length > 15 && (
              <div className="text-center mt-8">
                <Link
                  href="/category/all"
                  className="inline-block bg-[#dc2626] text-white px-8 py-3 rounded text-sm font-black hover:bg-[#b91c1c] transition-colors"
                >
                  すべての記事を見る &rarr;（{articles.length}件）
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* Category Sections — 伏線カテゴリ別の記事紹介 */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-xl font-black text-white mb-8 text-center">
          <span className="text-[#dc2626]">伏線</span>カテゴリ別に探す
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => {
            const catArticles = getArticlesByCategory(key).slice(0, 2);
            return (
              <div key={key} className="bg-[#12121c] rounded border border-[#1e1e2e] p-5">
                <Link href={`/category/${key}`}>
                  <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CATEGORY_COLORS[key]}`}>
                      {label}
                    </span>
                  </h3>
                </Link>
                <div className="space-y-2">
                  {catArticles.map(a => (
                    <Link
                      key={a.slug}
                      href={`/article/${a.slug}`}
                      className="block text-xs text-gray-400 hover:text-[#dc2626] transition-colors line-clamp-1"
                    >
                      {a.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/category/${key}`}
                  className="inline-block text-[10px] text-[#dc2626] hover:text-[#f59e0b] font-bold mt-2 transition-colors"
                >
                  {label}の記事をもっと見る &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Manga Grid — 全作品の伏線考察ページ */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <h2 className="text-xl font-black text-white mb-6 text-center">
          全<span className="text-[#dc2626]">{mangaList.length}作品</span>の伏線考察
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {mangaList.map(manga => (
            <Link
              key={manga.slug}
              href={`/manga/${manga.slug}`}
              className="group bg-[#12121c] rounded border border-[#1e1e2e] p-3 hover:border-[#dc2626]/40 transition-all text-center"
            >
              <span
                className="inline-block w-3 h-3 rounded-full mb-2"
                style={{ backgroundColor: manga.coverColor }}
              />
              <h3 className="text-xs font-bold text-gray-300 group-hover:text-[#dc2626] transition-colors mb-1">
                {manga.title}
              </h3>
              <span className="text-[9px] text-gray-600">
                {manga.status === 'ongoing' ? '連載中' : '完結'}・{manga.author}
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
