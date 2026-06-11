import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles, getArticlesByCategory, tagToSlug } from '@/lib/articles';
import { getMangaBySlug } from '@/data/manga';
import { CATEGORY_LABELS, CATEGORY_COLORS, ArticleCategory } from '@/lib/types';
import AffiliateWidget from '@/components/AffiliateWidget';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';
import MangaProductCard from '@/components/MangaProductCard';
import CommentSection from '@/components/CommentSection';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import AuthorBox from '@/components/AuthorBox';
import ShareButtons from '@/components/ShareButtons';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd, buildFaqFromSections } from '@/components/JsonLd';

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
  const categoryLabel = CATEGORY_LABELS[article.category];
  const mangaTitle = manga?.title ?? '';
  const enhancedDescription = `${mangaTitle ? `${mangaTitle}の` : ''}${categoryLabel}を徹底解説。${article.excerpt}`;
  const enhancedKeywords = [
    ...article.tags,
    mangaTitle,
    `${mangaTitle} 伏線`,
    `${mangaTitle} 伏線回収`,
    `${mangaTitle} 考察`,
    `${mangaTitle} ネタバレ`,
    '伏線',
    '伏線回収',
    '考察',
    categoryLabel,
    '漫画 伏線',
    '漫画 考察',
  ].filter(Boolean);

  return {
    title: article.title,
    description: enhancedDescription.slice(0, 160),
    keywords: [...new Set(enhancedKeywords)],
    openGraph: {
      title: article.title,
      description: enhancedDescription.slice(0, 160),
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
      url: canonicalUrl,
      siteName: '伏線回収ラボ',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: enhancedDescription.slice(0, 160),
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
            <div className="paper double-rule p-6 md:p-8">
              {/* PR notice */}
              <p className="text-[10px] text-sepia-500 mb-4">※当サイトはアフィリエイト広告を利用しています</p>

              {/* Breadcrumb */}
              <nav className="text-xs text-sepia-500 mb-4 flex items-center gap-1 flex-wrap">
                <Link href="/" className="hover:text-copper transition-colors">ホーム</Link>
                <span className="text-parchment-line">/</span>
                {manga && (
                  <>
                    <Link href={`/manga/${manga.slug}`} className="hover:text-copper transition-colors">
                      {manga.title}
                    </Link>
                    <span className="text-parchment-line">/</span>
                  </>
                )}
                <span className="text-sepia-700 line-clamp-1">{article.title}</span>
              </nav>

              {/* Article Header: category badge, title, date, manga link */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${CATEGORY_COLORS[article.category]}`}>
                  {CATEGORY_LABELS[article.category]}
                </span>
                {manga && (
                  <Link
                    href={`/manga/${manga.slug}`}
                    className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-parchment-dark text-sepia-700 hover:text-copper hover:bg-parchment-light transition-colors border border-parchment-line"
                  >
                    {manga.title}
                  </Link>
                )}
                <time className="text-[10px] text-sepia-500 ml-auto" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-sepia-900 leading-relaxed tracking-wide mb-6 pb-4 border-b-[3px] border-double border-brass-dark/50">
                {article.title}
              </h1>

              {/* AdBanner: After header */}
              <AdBanner size="full" />

              {/* GoogleAd: After header ad */}
              <GoogleAd className="my-6" />

              {/* Table of Contents */}
              {article.sections.length > 2 && (
                <div className="bg-parchment-dark/60 double-rule p-4 mb-8">
                  <h2 className="font-serif text-sm font-extrabold text-copper tracking-[0.1em] mb-3 pb-2 border-b border-parchment-line">◆ 目次 — 捜査手順</h2>
                  <ol className="space-y-1.5">
                    {article.sections.map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-sm text-sepia-700 hover:text-copper transition-colors flex items-center gap-2"
                        >
                          <span className="font-serif text-[10px] font-extrabold text-brass-dark w-5 text-right">
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
              <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t border-parchment-line">
                <span className="text-xs text-sepia-500 font-bold">タグ:</span>
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tag/${tagToSlug(tag)}`}
                    className="text-[10px] text-sepia-700 bg-parchment-dark border border-parchment-line px-3 py-2 rounded-sm hover:border-brass-dark hover:text-copper transition-colors inline-block"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* GoogleAd: After tags */}
              <GoogleAd className="mt-6" />

              {/* Share Buttons */}
              <ShareButtons title={article.title} />

              {/* Author Box */}
              <AuthorBox />

              {/* CommentSection */}
              <CommentSection articleSlug={article.slug} />
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="study-heading text-lg mb-4">
                  関連する伏線考察
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommended: Same category from other manga */}
            {(() => {
              const categoryArticles = getArticlesByCategory(article.category)
                .filter(a => a.mangaSlug !== article.mangaSlug && a.slug !== article.slug)
                .slice(0, 4);
              if (categoryArticles.length === 0) return null;
              return (
                <div className="mt-8">
                  <h2 className="study-heading text-lg mb-4">
                    「{CATEGORY_LABELS[article.category]}」の他の記事
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryArticles.map(a => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Category Navigation */}
            <div className="mt-8 panel double-rule p-5">
              <h3 className="font-serif text-sm font-bold text-parchment tracking-[0.1em] mb-3">カテゴリで探す</h3>
              <div className="flex gap-2 flex-wrap">
                {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
                  <Link
                    key={key}
                    href={`/category/${key}`}
                    className={`text-xs font-bold px-3 py-1.5 rounded-sm border transition-colors ${
                      key === article.category
                        ? 'bg-brass text-ink-deep border-brass'
                        : 'bg-transparent text-mist border-ink-line hover:border-brass hover:text-brass-light'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

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

      {/* JSON-LD Structured Data */}
      <ArticleJsonLd article={article} mangaTitle={manga?.title} />
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: 'https://fukusen-lab.vercel.app' },
          ...(manga
            ? [{ name: manga.title, url: `https://fukusen-lab.vercel.app/manga/${manga.slug}` }]
            : []),
          { name: article.title, url: `https://fukusen-lab.vercel.app/article/${slug}` },
        ]}
      />
      <FaqJsonLd items={buildFaqFromSections(article.sections, manga?.title)} />
    </>
  );
}
