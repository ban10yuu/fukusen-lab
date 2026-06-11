import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, tagToSlug } from '@/lib/articles';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'タグ一覧｜伏線回収ラボ',
  description:
    '伏線回収ラボの全タグ一覧。漫画の伏線回収・未回収の伏線・伏線考察に関するキーワードタグから記事を探せます。',
  keywords: ['タグ一覧', '伏線 タグ', '漫画 タグ', '伏線回収', '伏線考察'],
  openGraph: {
    title: 'タグ一覧｜伏線回収ラボ',
    description: '伏線回収ラボの全タグ一覧。キーワードタグから伏線考察記事を探せます。',
    url: 'https://fukusen-lab.vercel.app/tags',
    siteName: '伏線回収ラボ',
  },
  alternates: {
    canonical: 'https://fukusen-lab.vercel.app/tags',
  },
};

export default function TagsPage() {
  const tags = getAllTags();

  // Find max count for sizing
  const maxCount = Math.max(...tags.map(t => t.count), 1);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-xs text-mist-dim mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-brass-light transition-colors">ホーム</Link>
            <span className="text-ink-line">/</span>
            <span className="text-mist">タグ一覧</span>
          </nav>
          <h1 className="study-heading inline-block text-2xl">タグ一覧</h1>
          <p className="text-sm text-mist-dim mt-2">
            全{tags.length}件のタグから伏線考察記事を探す
          </p>
        </div>

        <GoogleAd className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Tag Cloud */}
            <div className="paper double-rule p-6 md:p-8">
              <h2 className="font-serif text-lg font-extrabold text-sepia-900 tracking-wide mb-6 pb-3 border-b border-parchment-line">
                キーワードタグ
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => {
                  const ratio = count / maxCount;
                  const size = ratio > 0.7 ? 'text-base' : ratio > 0.4 ? 'text-sm' : 'text-xs';
                  const brightness = ratio > 0.7 ? 'text-copper' : ratio > 0.4 ? 'text-sepia-900' : 'text-sepia-700';
                  return (
                    <Link
                      key={tag}
                      href={`/tag/${tagToSlug(tag)}`}
                      className={`${size} ${brightness} font-bold px-3 py-1.5 rounded-sm border border-parchment-line bg-parchment-dark/60 hover:border-brass-dark hover:text-copper hover:bg-parchment-light transition-all`}
                    >
                      #{tag}
                      <span className="text-[10px] text-sepia-500 ml-1">({count})</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <GoogleAd className="mt-6" />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: 'https://fukusen-lab.vercel.app' },
          { name: 'タグ一覧', url: 'https://fukusen-lab.vercel.app/tags' },
        ]}
      />
    </>
  );
}
