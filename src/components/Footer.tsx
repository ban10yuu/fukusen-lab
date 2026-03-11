import Link from 'next/link';
import { mangaList } from '@/data/manga';
import { generalAffiliates } from '@/data/affiliates';
import { getAllTags, tagToSlug } from '@/lib/articles';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];
  const ongoingManga = mangaList.filter(m => m.status === 'ongoing');
  const completedManga = mangaList.filter(m => m.status === 'completed');
  const popularTags = getAllTags().slice(0, 20);

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
            <p className="text-xs text-[#b0b0c0]/70 leading-relaxed mb-3">
              漫画作品に散りばめられた伏線を徹底的に分析・考察する専門サイトです。回収済みの伏線から未回収の謎まで、伏線テクニックの解説や時系列タイムラインの整理など、物語の深層を多角的に探ります。
            </p>
            <p className="text-xs text-[#b0b0c0]/50 leading-relaxed">
              ONE PIECE・進撃の巨人・呪術廻戦・鬼滅の刃・HUNTER×HUNTERなど、20作品以上の人気漫画の伏線考察を掲載中。
            </p>
          </div>

          {/* Col 2: 連載中の作品 + 完結作品 */}
          <div>
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">連載中の作品の伏線考察</h3>
            <div className="flex flex-col gap-1 mb-4">
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
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">完結作品の伏線回収</h3>
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

          {/* Col 3: カテゴリ + 電子書籍サイト */}
          <div>
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">伏線カテゴリ</h3>
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
              <Link
                href="/category/all/"
                className="text-xs text-[#b0b0c0]/70 hover:text-[#dc2626] transition-colors py-0.5"
              >
                すべての記事
              </Link>
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

          {/* Col 4: 人気タグ */}
          <div>
            <h3 className="font-bold text-sm text-[#eaeaf0] mb-3">人気の伏線タグ</h3>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/tag/${tagToSlug(tag)}`}
                  className="text-[10px] text-[#b0b0c0]/60 bg-[#12121c] border border-[#1e1e2e] px-2 py-0.5 rounded hover:border-[#dc2626]/40 hover:text-[#dc2626] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
            <Link
              href="/tags"
              className="inline-block text-xs text-[#dc2626] hover:text-[#f59e0b] font-bold mt-3 transition-colors"
            >
              すべてのタグを見る &rarr;
            </Link>
          </div>
        </div>

        <div className="border-t border-[#282838] mt-8 pt-6 text-center">
          <div className="flex justify-center gap-4 mb-3">
            <Link href="/privacy" className="text-xs text-[#b0b0c0]/50 hover:text-[#dc2626] transition-colors">
              プライバシーポリシー
            </Link>
            <span className="text-[#b0b0c0]/30">|</span>
            <Link href="/contact" className="text-xs text-[#b0b0c0]/50 hover:text-[#dc2626] transition-colors">
              お問い合わせ
            </Link>
          </div>
          <p className="text-xs text-[#b0b0c0]/40 mb-1">
            &copy; 2026 伏線回収ラボ — 漫画の伏線回収・未回収の伏線・伏線考察の専門サイト
          </p>
          <p className="text-[10px] text-[#b0b0c0]/30">
            当サイトはアフィリエイトプログラムに参加しています。
          </p>
        </div>
      </div>
    </footer>
  );
}
