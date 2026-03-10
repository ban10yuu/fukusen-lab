import Link from 'next/link';
import { mangaList } from '@/data/manga';
import { generalAffiliates } from '@/data/affiliates';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];
  const ongoingManga = mangaList.filter(m => m.status === 'ongoing');
  const completedManga = mangaList.filter(m => m.status === 'completed');

  return (
    <footer className="bg-[#08080e] border-t border-[#282838] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div>
            <div className="mb-3">
              <span className="font-black text-lg">
                <span className="text-[#dc2626]">伏線</span>
                <span className="text-[#eaeaf0]">回収ラボ</span>
              </span>
            </div>
            <p className="text-xs text-[#b0b0c0]/70 leading-relaxed">
              漫画作品に散りばめられた伏線を徹底的に分析・考察するサイトです。回収済みの伏線から未回収の謎まで、物語の深層を探ります。
            </p>
          </div>

          {/* Col 2: 連載中の作品 */}
          <div>
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">連載中の作品</h3>
            <div className="flex flex-col gap-1">
              {ongoingManga.map(m => (
                <Link
                  key={m.slug}
                  href={`/manga/${m.slug}/`}
                  className="flex items-center gap-2 text-xs text-[#b0b0c0]/70 hover:text-[#dc2626] transition-colors py-0.5"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: m.coverColor }}
                  />
                  {m.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: 完結作品 */}
          <div>
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">完結作品</h3>
            <div className="flex flex-col gap-1">
              {completedManga.map(m => (
                <Link
                  key={m.slug}
                  href={`/manga/${m.slug}/`}
                  className="flex items-center gap-2 text-xs text-[#b0b0c0]/70 hover:text-[#dc2626] transition-colors py-0.5"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: m.coverColor }}
                  />
                  {m.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: カテゴリ + 電子書籍サイト */}
          <div>
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">カテゴリ</h3>
            <div className="flex flex-col gap-1 mb-4">
              {categories.map(([key, label]) => (
                <Link
                  key={key}
                  href={`/category/${key}/`}
                  className="text-xs text-[#b0b0c0]/70 hover:text-[#dc2626] transition-colors py-0.5"
                >
                  {label}
                </Link>
              ))}
            </div>
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">電子書籍サイト</h3>
            <div className="flex flex-col gap-1">
              {generalAffiliates.map(a => (
                <a
                  key={a.title}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-xs text-[#b0b0c0]/70 hover:text-[#f59e0b] transition-colors py-0.5"
                >
                  {a.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#282838] mt-8 pt-6 text-center">
          <p className="text-xs text-[#b0b0c0]/40">
            &copy; 2026 伏線回収ラボ. 当サイトはアフィリエイトプログラムに参加しています。
          </p>
        </div>
      </div>
    </footer>
  );
}
