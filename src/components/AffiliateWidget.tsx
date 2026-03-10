import { MangaInfo } from '@/lib/types';
import { getAffiliateLinks, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';

const SERVICE_COLORS: Record<string, { bg: string; text: string }> = {
  rakuten:     { bg: '#bf0000', text: '#ffffff' },
  ebookjapan:  { bg: '#ff0033', text: '#ffffff' },
  dmm:         { bg: '#1a1a1a', text: '#ffffff' },
  kobo:        { bg: '#bf0000', text: '#ffffff' },
  ameba:       { bg: '#2dbe60', text: '#ffffff' },
  cmoa:        { bg: '#ec4d8a', text: '#ffffff' },
  booklive:    { bg: '#0075c2', text: '#ffffff' },
  mangaoukoku: { bg: '#ff6b00', text: '#ffffff' },
};

export default function AffiliateWidget({ manga }: { manga: MangaInfo }) {
  const links = getAffiliateLinks(manga);

  return (
    <div className="my-10 bg-gradient-to-br from-[#14141e] to-[#1c1c28] rounded-xl border border-[#282838] p-5 md:p-6">
      {/* Heading */}
      <div className="text-center mb-5">
        <h3 className="text-base font-black text-[#eaeaf0]">
          <span className="text-[#dc2626]">{manga.title}</span>
          <span className="text-[#b0b0c0]"> を読むなら</span>
        </h3>
        <p className="text-xs text-[#b0b0c0]/60 mt-1">
          お得なキャンペーン実施中のサービスをチェック
        </p>
      </div>

      {/* 2-column grid of service buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map(link => {
          const colors = SERVICE_COLORS[link.service] || { bg: '#dc2626', text: '#ffffff' };
          return (
            <a
              key={link.service}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block rounded-lg p-3.5 transition-all hover:brightness-110 hover:scale-[1.02]"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                boxShadow: `0 3px 12px ${colors.bg}30`,
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-black">{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold opacity-90 flex items-center gap-1">
                試し読み
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-[#b0b0c0]/40 mt-5 text-center">
        ※ 当サイトはアフィリエイトプログラムに参加しています。リンク先での購入により当サイトに収益が発生する場合があります。
      </p>

      {/* Moshimo impression tracking pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </div>
  );
}
