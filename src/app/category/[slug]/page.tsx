import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getArticlesByCategory } from '@/lib/articles';
import { CATEGORY_LABELS, ArticleCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const validCategories = ['resolved', 'unresolved', 'theory', 'technique', 'timeline', 'all'];

export function generateStaticParams() {
  return validCategories.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'all') {
    return {
      title: 'すべての伏線考察記事',
      description: '人気漫画の伏線回収・未回収の伏線・伏線考察記事の一覧。',
      alternates: {
        canonical: 'https://fukusen-lab.vercel.app/category/all',
      },
    };
  }

  const label = CATEGORY_LABELS[slug as ArticleCategory] || slug;
  return {
    title: `${label}の記事一覧`,
    description: `${label}に関する漫画の伏線考察記事の一覧です。`,
    alternates: {
      canonical: `https://fukusen-lab.vercel.app/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  let articles;
  let title: string;

  if (slug === 'all') {
    articles = getAllArticles();
    title = 'すべての伏線考察記事';
  } else {
    articles = getArticlesByCategory(slug as ArticleCategory);
    title = CATEGORY_LABELS[slug as ArticleCategory] || slug;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
          <Link href="/" className="hover:text-[#dc2626] transition-colors">ホーム</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400">{title}</span>
        </nav>
        <h1 className="text-2xl font-black text-white">{title}</h1>
        <p className="text-sm text-gray-600 mt-1">{articles.length}件の記事</p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Link
          href="/category/all"
          className={`text-xs font-bold px-3 py-1.5 rounded border transition-colors ${
            slug === 'all'
              ? 'bg-[#dc2626] text-white border-[#dc2626]'
              : 'bg-transparent text-gray-500 border-[#1e1e2e] hover:border-[#dc2626] hover:text-[#dc2626]'
          }`}
        >
          すべて
        </Link>
        {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
          <Link
            key={key}
            href={`/category/${key}`}
            className={`text-xs font-bold px-3 py-1.5 rounded border transition-colors ${
              slug === key
                ? 'bg-[#dc2626] text-white border-[#dc2626]'
                : 'bg-transparent text-gray-500 border-[#1e1e2e] hover:border-[#dc2626] hover:text-[#dc2626]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* GoogleAd: After filter */}
      <GoogleAd className="mb-6" />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-2">記事が見つかりませんでした</p>
              <Link href="/" className="text-sm text-[#dc2626] hover:text-[#f59e0b] font-bold">
                トップページに戻る
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
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
    </div>
  );
}
