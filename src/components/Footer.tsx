import Link from 'next/link';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];

  return (
    <footer className="bg-ink-deep border-t-[3px] border-double border-brass-dark/50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-brass flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path strokeLinecap="round" strokeWidth="2.2" d="M15.5 15.5L21 21" />
              </svg>
              <span className="font-serif font-extrabold text-sm tracking-wide">
                <span className="text-brass">伏線</span>
                <span className="text-parchment">回収ラボ</span>
              </span>
            </div>
            <p className="text-xs text-mist-dim leading-relaxed">
              漫画作品の伏線を徹底分析する専門サイト。回収済みの伏線から未回収の謎まで、{mangaList.length}作品以上の伏線考察を掲載中。
            </p>
          </div>

          {/* Categories + Manga */}
          <div>
            <h3 className="brass-label mb-2.5">カテゴリ</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
              {categories.map(([key, label]) => (
                <Link
                  key={key}
                  href={`/category/${key}/`}
                  className="text-xs text-mist-dim hover:text-brass-light transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <h3 className="brass-label mb-2.5">作品</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {mangaList.slice(0, 10).map(m => (
                <Link
                  key={m.slug}
                  href={`/manga/${m.slug}/`}
                  className="text-xs text-mist-dim hover:text-brass-light transition-colors"
                >
                  {m.title}
                </Link>
              ))}
              {mangaList.length > 10 && (
                <span className="text-xs text-ink-line">他{mangaList.length - 10}作品</span>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="brass-label mb-2.5">関連サイト</h3>
            <div className="flex flex-col gap-1.5">
              <a href="https://manga-matome-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-mist-dim hover:text-brass-light transition-colors">マンガ考察ラボ</a>
              <a href="https://anime-review-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-mist-dim hover:text-brass-light transition-colors">Anime Review Lab</a>
              <a href="https://vod-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-mist-dim hover:text-brass-light transition-colors">動画配信ナビ</a>
            </div>
          </div>
        </div>

        <div className="border-t border-ink-line mt-10 pt-6 text-center text-xs">
          <div className="flex justify-center gap-4 mb-3">
            <Link href="/privacy" className="text-mist-dim hover:text-brass-light transition-colors">
              プライバシーポリシー
            </Link>
            <span className="text-ink-line">|</span>
            <Link href="/contact" className="text-mist-dim hover:text-brass-light transition-colors">
              お問い合わせ
            </Link>
          </div>
          <p className="text-mist-dim/70">※ 当サイトはアフィリエイトプログラムに参加しています。</p>
          <p className="mt-3 font-serif tracking-[0.2em] text-brass-dark">&copy; 2026 伏線回収ラボ</p>
        </div>
      </div>
    </footer>
  );
}
