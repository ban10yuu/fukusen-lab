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
          <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-[#dc2626] transition-colors">ホーム</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400">タグ一覧</span>
          </nav>
          <h1 className="text-2xl font-black text-white">タグ一覧</h1>
          <p className="text-sm text-gray-600 mt-1">
            全{tags.length}件のタグから伏線考察記事を探す
          </p>
        </div>

        <GoogleAd className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Tag Cloud */}
            <div className="bg-[#12121c] rounded border-2 border-[#1e1e2e] p-6 md:p-8">
              <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                <span className="text-[#dc2626]">▎</span>
                キーワードタグ
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => {
                  const ratio = count / maxCount;
                  const size = ratio > 0.7 ? 'text-base' : ratio > 0.4 ? 'text-sm' : 'text-xs';
                  const brightness = ratio > 0.7 ? 'text-[#dc2626]' : ratio > 0.4 ? 'text-gray-300' : 'text-gray-400';
                  return (
                    <Link
                      key={tag}
                      href={`/tag/${tagToSlug(tag)}`}
                      className={`${size} ${brightness} font-bold px-3 py-1.5 rounded border border-[#1e1e2e] bg-[#1a1a28] hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-[#dc2626]/5 transition-all`}
                    >
                      #{tag}
                      <span className="text-[10px] text-gray-600 ml-1">({count})</span>
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
