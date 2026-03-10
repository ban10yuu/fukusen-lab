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
          className="inline-block text-xs text-[#b0b0c0]/60 hover:text-[#dc2626] transition-colors border border-[#282838] border-dashed rounded-lg px-4 py-2 hover:border-[#dc2626]/40"
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
      <div className="my-6 bg-[#14141e] rounded-xl border border-[#282838] border-dashed p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#b0b0c0]/40 block mb-1">PR</span>
            <p className="text-sm font-bold text-[#eaeaf0]">{ad.title}</p>
          </div>
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] px-4 py-2 rounded-lg transition-colors flex-shrink-0"
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
    <div className="my-8 bg-[#14141e] rounded-xl border border-[#282838] border-dashed p-5">
      <span className="text-[9px] text-[#b0b0c0]/40 block mb-2">PR</span>
      <p className="text-base font-black text-[#eaeaf0] mb-1">{ad.title}</p>
      {ad.badge && (
        <span className="text-[9px] font-bold bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 px-1.5 py-0.5 rounded mb-3 inline-block">
          {ad.badge}
        </span>
      )}
      <p className="text-xs text-[#b0b0c0]/60 mb-3">{ad.description}</p>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block text-sm font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] px-6 py-2.5 rounded-lg transition-colors"
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
