import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { getMangaBySlug } from '@/data/manga';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import AffiliateWidget from '@/components/AffiliateWidget';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';
import MangaProductCard from '@/components/MangaProductCard';
import CommentSection from '@/components/CommentSection';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const manga = getMangaBySlug(article.mangaSlug);

  const canonicalUrl = `https://fukusen-lab.vercel.app/article/${slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    keywords: [...article.tags, manga?.title ?? '', '伏線', '伏線回収', '考察'].filter(Boolean),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
      url: canonicalUrl,
      siteName: '伏線回収ラボ',
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const manga = getMangaBySlug(article.mangaSlug);
  const relatedArticles = getRelatedArticles(article, 5);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-[#12121c] rounded border-2 border-[#1e1e2e] p-6 md:p-8">
              {/* PR notice */}
              <p className="text-[10px] text-gray-600 mb-4">※当サイトはアフィリエイト広告を利用しています</p>

              {/* Breadcrumb */}
              <nav className="text-xs text-gray-600 mb-4 flex items-center gap-1 flex-wrap">
                <Link href="/" className="hover:text-[#dc2626] transition-colors">ホーム</Link>
                <span className="text-gray-700">/</span>
                {manga && (
                  <>
                    <Link href={`/manga/${manga.slug}`} className="hover:text-[#dc2626] transition-colors">
                      {manga.title}
                    </Link>
                    <span className="text-gray-700">/</span>
                  </>
                )}
                <span className="text-gray-500 line-clamp-1">{article.title}</span>
              </nav>

              {/* Article Header: category badge, title, date, manga link */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CATEGORY_COLORS[article.category]}`}>
                  {CATEGORY_LABELS[article.category]}
                </span>
                {manga && (
                  <Link
                    href={`/manga/${manga.slug}`}
                    className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#1a1a28] text-gray-400 hover:text-white hover:bg-[#222232] transition-colors border border-[#1e1e2e]"
                  >
                    {manga.title}
                  </Link>
                )}
                <time className="text-[10px] text-gray-600 ml-auto" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
                {article.title}
              </h1>

              {/* AdBanner: After header */}
              <AdBanner size="full" />

              {/* GoogleAd: After header ad */}
              <GoogleAd className="my-6" />

              {/* Table of Contents */}
              {article.sections.length > 2 && (
                <div className="bg-[#1a1a28] rounded p-4 mb-8 border border-[#1e1e2e]">
                  <h2 className="text-sm font-black text-[#dc2626] mb-3">◆ 目次</h2>
                  <ol className="space-y-1.5">
                    {article.sections.map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-sm text-gray-500 hover:text-[#dc2626] transition-colors flex items-center gap-2"
                        >
                          <span className="text-[10px] font-black text-gray-600 w-5 text-right">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Article Sections with ads inserted every 2 sections */}
              <div className="article-content">
                {article.sections.map((section, i) => (
                  <div key={i}>
                    <div id={`section-${i}`}>
                      <h2>{section.heading}</h2>
                      {section.content.split('\n\n').map((paragraph, j) => (
                        <p key={j} dangerouslySetInnerHTML={{ __html: paragraph }} />
                      ))}
                    </div>

                    {/* MangaProductCard: After section 1 (index 0) */}
                    {manga && i === 0 && <MangaProductCard manga={manga} />}

                    {/* GoogleAd: Every 2 sections */}
                    {i % 2 === 1 && i < article.sections.length - 1 && (
                      <GoogleAd className="my-8" />
                    )}

                    {/* AdBanner: After sections (except last, and not section 0 which has product card) */}
                    {i > 0 && i < article.sections.length - 1 && i % 2 === 0 && (
                      <AdBanner size="compact" />
                    )}
                  </div>
                ))}
              </div>

              {/* GoogleAd: After article body */}
              <GoogleAd className="my-8" />

              {/* AffiliateWidget: After last section */}
              {manga && <AffiliateWidget manga={manga} />}

              {/* AdBanner: After affiliate widget */}
              <AdBanner size="full" />

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t border-[#1e1e2e]">
                <span className="text-xs text-gray-600 font-bold">タグ:</span>
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] text-gray-500 bg-[#1a1a28] border border-[#1e1e2e] px-2.5 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* GoogleAd: After tags */}
              <GoogleAd className="mt-6" />

              {/* CommentSection */}
              <CommentSection articleSlug={article.slug} />
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  <span className="text-[#dc2626]">▎</span>
                  関連する伏線考察
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {/* GoogleAd: Bottom */}
            <GoogleAd className="mt-8" />
          </article>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data: Article + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            author: {
              '@type': 'Organization',
              name: '伏線回収ラボ',
            },
            publisher: {
              '@type': 'Organization',
              name: '伏線回収ラボ',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://fukusen-lab.vercel.app/article/${slug}`,
            },
            keywords: article.tags.join(', '),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'ホーム',
                item: 'https://fukusen-lab.vercel.app',
              },
              ...(manga
                ? [
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: manga.title,
                      item: `https://fukusen-lab.vercel.app/manga/${manga.slug}`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: article.title,
                      item: `https://fukusen-lab.vercel.app/article/${slug}`,
                    },
                  ]
                : [
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: article.title,
                      item: `https://fukusen-lab.vercel.app/article/${slug}`,
                    },
                  ]),
            ],
          }),
        }}
      />
    </>
  );
}
