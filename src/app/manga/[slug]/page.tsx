import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mangaList, getMangaBySlug } from '@/data/manga';
import { getArticlesByManga } from '@/lib/articles';
import AffiliateWidget from '@/components/AffiliateWidget';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd, MangaPageJsonLd } from '@/components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mangaList.map(manga => ({ slug: manga.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const manga = getMangaBySlug(slug);
  if (!manga) return {};

  const canonicalUrl = `https://fukusen-lab.vercel.app/manga/${slug}`;
  const enhancedDescription = `${manga.title}（${manga.author}）の伏線回収・未回収の伏線・伏線考察記事を一覧で掲載。${manga.description}`.slice(0, 160);
  return {
    title: `${manga.title}の伏線回収・未回収の伏線まとめ`,
    description: enhancedDescription,
    keywords: [
      manga.title,
      manga.titleEn,
      `${manga.title} 伏線`,
      `${manga.title} 伏線回収`,
      `${manga.title} 未回収の伏線`,
      `${manga.title} 考察`,
      `${manga.title} ネタバレ`,
      `${manga.title} 伏線 まとめ`,
      `${manga.title} 伏線 解説`,
      `${manga.title} 深読み`,
      '伏線',
      '伏線回収',
      '漫画 伏線',
      '漫画 考察',
      ...manga.genre,
    ],
    openGraph: {
      title: `${manga.title}の伏線回収・未回収の伏線まとめ`,
      description: `${manga.title}の伏線回収・未回収の伏線・伏線考察をお届け。`,
      url: canonicalUrl,
      siteName: '伏線回収ラボ',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${manga.title}の伏線回収・未回収の伏線まとめ｜伏線回収ラボ`,
      description: enhancedDescription,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function MangaPage({ params }: PageProps) {
  const { slug } = await params;
  const manga = getMangaBySlug(slug);
  if (!manga) notFound();

  const articles = getArticlesByManga(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
      {/* Manga Header */}
      <div
        className="manga-panel !border-2 p-6 md:p-8 mb-8 relative overflow-hidden"
        style={{ borderColor: manga.coverColor }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: `linear-gradient(135deg, ${manga.coverColor}, transparent)` }}
        />
        <div className="relative z-10">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-[#dc2626] transition-colors">ホーム</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400">{manga.title}</span>
          </nav>

          {/* Title & Info */}
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{manga.title}</h1>
          <p className="text-sm text-gray-500 mb-3">
            <span className="text-gray-400">作者：{manga.author}</span>
            <span className="mx-2 text-gray-700">|</span>
            <span
              className="font-bold text-xs px-2 py-0.5 rounded"
              style={{
                color: manga.coverColor,
                backgroundColor: `${manga.coverColor}20`,
                border: `1px solid ${manga.coverColor}40`,
              }}
            >
              {manga.status === 'ongoing' ? '連載中' : '完結済み'}
            </span>
          </p>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed mb-4">{manga.description}</p>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {manga.genre.map(g => (
              <span
                key={g}
                className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#1a1a28] text-gray-400 border border-[#1e1e2e]"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AffiliateWidget for the manga */}
      <AffiliateWidget manga={manga} />

      {/* GoogleAd: After manga header */}
      <GoogleAd className="my-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Articles Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="text-[#dc2626]">▎</span>
              伏線考察記事一覧
              <span className="text-sm font-normal text-gray-600">({articles.length}件)</span>
            </h2>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-16 bg-[#12121c] rounded border border-[#1e1e2e]">
              <p className="text-gray-500 text-lg mb-2">まだ記事がありません</p>
              <p className="text-gray-600 text-sm mb-4">
                {manga.title}の伏線考察記事を準備中です。
              </p>
              <Link href="/" className="text-sm text-[#dc2626] hover:text-[#f59e0b] font-bold">
                トップページに戻る
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} showManga={false} />
              ))}
            </div>
          )}

          {/* GoogleAd: After articles */}
          <GoogleAd className="mt-6" />
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <Sidebar />
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: 'https://fukusen-lab.vercel.app' },
          { name: manga.title, url: `https://fukusen-lab.vercel.app/manga/${manga.slug}` },
        ]}
      />
      <MangaPageJsonLd manga={manga} articleCount={articles.length} />
    </div>
  );
}
