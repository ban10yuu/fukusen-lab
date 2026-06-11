'use client';

import { generalAffiliates, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';

type Size = 'full' | 'medium' | 'compact';

export default function AdBanner({ size = 'full' }: { size?: Size }) {
  const ad = generalAffiliates[Math.floor(Math.random() * generalAffiliates.length)];

  // Moshimo impression pixel for rakuten/kobo services
  const needsMoshimo = ad.title === '楽天ブックス' || ad.title === '楽天Kobo';

  if (size === 'compact') {
    return (
      <div className="my-4 text-center">
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block text-xs text-sepia-500 hover:text-copper transition-colors border border-dashed border-brass-dark/40 hover:border-copper/60 rounded-sm px-4 py-2 bg-parchment-dark/40"
        >
          PR: {ad.title}
        </a>
        {needsMoshimo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
        )}
      </div>
    );
  }

  if (size === 'medium') {
    return (
      <div className="my-6 panel border-dashed p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[9px] tracking-[0.2em] text-mist-dim block mb-1">PR</span>
            <p className="text-sm font-bold text-parchment">{ad.title}</p>
          </div>
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs font-bold text-ink-deep bg-brass hover:bg-brass-light px-4 py-2 rounded-sm transition-colors flex-shrink-0"
          >
            詳しく見る
          </a>
        </div>
        {needsMoshimo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
        )}
      </div>
    );
  }

  // size === 'full'
  return (
    <div className="my-8 panel border-dashed p-5">
      <span className="text-[9px] tracking-[0.2em] text-mist-dim block mb-2">PR</span>
      <p className="font-serif text-base font-extrabold text-parchment mb-1">{ad.title}</p>
      {ad.badge && (
        <span className="text-[9px] font-bold bg-brass/15 text-brass-light border border-brass/40 px-1.5 py-0.5 rounded-sm mb-3 inline-block">
          {ad.badge}
        </span>
      )}
      <p className="text-xs text-mist-dim mb-3">{ad.description}</p>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block text-sm font-bold text-ink-deep bg-brass hover:bg-brass-light px-6 py-2.5 rounded-sm transition-colors shadow-[0_2px_8px_rgba(201,163,94,0.25)]"
      >
        今すぐチェック
        <svg className="inline w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </a>
      {needsMoshimo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
      )}
    </div>
  );
}
