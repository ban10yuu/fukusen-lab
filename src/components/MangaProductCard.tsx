'use client';

import { MangaInfo } from '@/lib/types';
import { MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';

const MOSHIMO_A_ID = '5417189';

function moshimoRakutenLink(url: string): string {
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616&url=${encodeURIComponent(url)}`;
}

export default function MangaProductCard({ manga }: { manga: MangaInfo }) {
  const amazonUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(manga.title + ' 漫画')}`;
  const rakutenUrl = moshimoRakutenLink(
    `https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(manga.title + ' 1')}&g=001`
  );
  const yahooUrl = `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(manga.title + ' 1巻 漫画')}`;

  return (
    <div className="my-10 panel double-rule overflow-hidden">
      {/* Color-coded header */}
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{ backgroundColor: `${manga.coverColor}1a`, borderBottom: `3px double ${manga.coverColor}` }}
      >
        <span
          className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-black/20"
          style={{ backgroundColor: manga.coverColor }}
        />
        <h3 className="font-serif font-extrabold text-parchment text-base tracking-wide">{manga.title}</h3>
      </div>

      {/* Product card body */}
      <div className="p-5">
        {/* Manga info */}
        <div className="mb-4">
          <p className="text-xs text-mist-dim mb-2">
            著者: <span className="text-mist">{manga.author}</span>
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {manga.genre.map(g => (
              <span
                key={g}
                className="text-[9px] px-2 py-0.5 rounded-full border border-ink-line text-mist-dim bg-ink-raised"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Purchase buttons */}
        <div className="space-y-2.5">
          {/* Amazon */}
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: '#f0984b',
              boxShadow: '0 2px 8px rgba(240,152,75,0.3)',
            }}
          >
            Amazonで見る
          </a>

          {/* 楽天ブックス */}
          <a
            href={rakutenUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: '#e07070',
              boxShadow: '0 2px 8px rgba(224,112,112,0.3)',
            }}
          >
            楽天ブックスで見る
          </a>

          {/* Yahoo!ショッピング */}
          <a
            href={yahooUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: '#7b9bcc',
              boxShadow: '0 2px 8px rgba(123,155,204,0.3)',
            }}
          >
            Yahoo!ショッピングで見る
          </a>
        </div>
      </div>

      <p className="text-[9px] text-mist-dim/70 text-center pb-3">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>

      {/* Moshimo impression tracking pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </div>
  );
}
