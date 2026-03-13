import Link from 'next/link';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];

  return (
    <footer className="bg-[#08080e] border-t border-[#1e1e2e] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="mb-2">
              <span className="font-black text-sm">
                <span className="text-[#dc2626]">伏線</span>
                <span className="text-gray-200">回収ラボ</span>
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              漫画作品の伏線を徹底分析する専門サイト。回収済みの伏線から未回収の謎まで、{mangaList.length}作品以上の伏線考察を掲載中。
            </p>
          </div>

          {/* Categories + Manga */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-2">カテゴリ</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              {categories.map(([key, label]) => (
                <Link
                  key={key}
                  href={`/category/${key}/`}
                  className="text-xs text-gray-600 hover:text-[#dc2626] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <h3 className="text-xs font-bold text-gray-400 mb-2">作品</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {mangaList.slice(0, 10).map(m => (
                <Link
                  key={m.slug}
                  href={`/manga/${m.slug}/`}
                  className="text-xs text-gray-600 hover:text-[#dc2626] transition-colors"
                >
                  {m.title}
                </Link>
              ))}
              {mangaList.length > 10 && (
                <span className="text-xs text-gray-700">他{mangaList.length - 10}作品</span>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-2">関連サイト</h3>
            <div className="flex flex-col gap-1">
              <a href="https://manga-matome-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-600 hover:text-[#dc2626] transition-colors">マンガ考察ラボ</a>
              <a href="https://anime-review-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-600 hover:text-[#dc2626] transition-colors">Anime Review Lab</a>
              <a href="https://vod-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-600 hover:text-[#dc2626] transition-colors">動画配信ナビ</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e1e2e] mt-8 pt-6 text-center text-xs text-gray-700">
          <div className="flex justify-center gap-4 mb-3">
            <Link href="/privacy" className="text-gray-600 hover:text-[#dc2626] transition-colors">
              プライバシーポリシー
            </Link>
            <span className="text-gray-800">|</span>
            <Link href="/contact" className="text-gray-600 hover:text-[#dc2626] transition-colors">
              お問い合わせ
            </Link>
          </div>
          <p className="text-gray-700">※ 当サイトはアフィリエイトプログラムに参加しています。</p>
          <p className="mt-2 text-gray-600">&copy; 2026 伏線回収ラボ</p>
        </div>
      </div>
    </footer>
  );
}
