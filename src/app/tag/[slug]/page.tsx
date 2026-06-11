import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTagSlugs, getArticlesByTag, tagToSlug, slugToTag } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd, TagPageJsonLd } from '@/components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTagSlugs().map(tag => ({ slug: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slugToTag(slug) ?? decodeURIComponent(slug);
  const articles = getArticlesByTag(tag);
  const canonicalUrl = `https://fukusen-lab.vercel.app/tag/${tagToSlug(tag)}`;

  return {
    title: `「${tag}」の伏線考察記事一覧`,
    description: `「${tag}」に関連する漫画の伏線回収・伏線考察記事を${articles.length}件掲載。伏線回収ラボが${tag}の伏線・考察を徹底解説。`,
    keywords: [tag, `${tag} 伏線`, `${tag} 考察`, `${tag} 伏線回収`, '伏線', '伏線回収', '漫画 考察'],
    openGraph: {
      title: `「${tag}」の伏線考察記事一覧`,
      description: `「${tag}」に関連する漫画の伏線回収・伏線考察記事を${articles.length}件掲載。`,
      url: canonicalUrl,
      siteName: '伏線回収ラボ',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slugToTag(slug) ?? decodeURIComponent(slug);
  const articles = getArticlesByTag(tag);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-xs text-mist-dim mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-brass-light transition-colors">ホーム</Link>
            <span className="text-ink-line">/</span>
            <Link href="/tags" className="hover:text-brass-light transition-colors">タグ一覧</Link>
            <span className="text-ink-line">/</span>
            <span className="text-mist">{tag}</span>
          </nav>
          <h1 className="study-heading inline-block text-2xl">
            <span className="text-brass mr-1">#</span>
            {tag}
          </h1>
          <p className="text-sm text-mist-dim mt-2">
            「{tag}」に関連する伏線考察記事（{articles.length}件）
          </p>
        </div>

        {/* GoogleAd */}
        <GoogleAd className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {articles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-mist text-lg mb-2">記事が見つかりませんでした</p>
                <Link href="/" className="text-sm text-brass hover:text-brass-light font-bold">
                  トップページに戻る
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} index={i} />
                ))}
              </div>
            )}

            <GoogleAd className="mt-6" />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: 'https://fukusen-lab.vercel.app' },
          { name: 'タグ一覧', url: 'https://fukusen-lab.vercel.app/tags' },
          { name: tag, url: `https://fukusen-lab.vercel.app/tag/${tagToSlug(tag)}` },
        ]}
      />
      <TagPageJsonLd tag={tag} articleCount={articles.length} />
    </>
  );
}
