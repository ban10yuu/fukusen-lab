import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fukusen-lab.vercel.app'),
  title: {
    default: '伏線回収ラボ｜漫画の伏線回収・考察・未回収の伏線まとめ',
    template: '%s｜伏線回収ラボ',
  },
  description:
    'ONE PIECE、進撃の巨人、呪術廻戦、鬼滅の刃、HUNTER×HUNTERなど人気漫画の伏線回収・未回収の伏線・伏線考察を徹底解説。回収済み伏線の時系列整理から未回収の伏線の考察、伏線テクニック分析まで、漫画の伏線を深く読み解く日本最大級の伏線考察専門サイトです。',
  keywords: [
    // 汎用キーワード
    '漫画 伏線',
    '伏線回収',
    '伏線 考察',
    '未回収の伏線',
    '伏線回収 まとめ',
    '伏線 タイムライン',
    '伏線テクニック',
    '漫画 伏線 解説',
    '漫画 考察',
    '漫画 ネタバレ',
    '伏線 回収 感動',
    '伏線 未回収 一覧',
    '漫画 伏線 ランキング',
    '漫画 深読み',
    '漫画 裏設定',
    '少年ジャンプ 伏線',
    '少年マガジン 伏線',
    '伏線 名作',
    '伏線がすごい漫画',
    '伏線回収が神な漫画',
    '伏線 ネタバレ',
    '漫画 考察 サイト',
    '漫画 伏線回収 ランキング',
    '伏線 未回収 考察',
    '漫画 ストーリー 考察',
    '漫画 最終回 伏線',
    '漫画 隠された意味',
    '漫画 再読 発見',
    // ONE PIECE
    'ONE PIECE 伏線',
    'ONE PIECE 伏線回収',
    'ONE PIECE 未回収',
    'ONE PIECE 考察',
    'ONE PIECE ネタバレ',
    'ワンピース 伏線',
    // 進撃の巨人
    '進撃の巨人 伏線',
    '進撃の巨人 伏線回収',
    '進撃の巨人 未回収',
    '進撃の巨人 考察',
    '進撃の巨人 ネタバレ',
    // 呪術廻戦
    '呪術廻戦 伏線',
    '呪術廻戦 伏線回収',
    '呪術廻戦 考察',
    '呪術廻戦 ネタバレ',
    // 鬼滅の刃
    '鬼滅の刃 伏線',
    '鬼滅の刃 伏線回収',
    '鬼滅の刃 考察',
    '鬼滅の刃 ネタバレ',
    // HUNTER×HUNTER
    'ハンターハンター 伏線',
    'HUNTER×HUNTER 伏線回収',
    'HUNTER×HUNTER 考察',
    // チェンソーマン
    'チェンソーマン 伏線',
    'チェンソーマン 伏線回収',
    'チェンソーマン 考察',
    // NARUTO
    'NARUTO 伏線',
    'NARUTO 伏線回収',
    'ナルト 考察',
    // DEATH NOTE
    'DEATH NOTE 伏線',
    'デスノート 伏線回収',
    // ジョジョ
    'ジョジョ 伏線',
    'ジョジョの奇妙な冒険 伏線回収',
    // BLEACH
    'ブリーチ 伏線',
    'BLEACH 伏線回収',
    // キングダム
    'キングダム 伏線',
    'キングダム 考察',
    // 僕のヒーローアカデミア
    'ヒロアカ 伏線',
    'ヒロアカ 伏線回収',
    // 葬送のフリーレン
    'フリーレン 伏線',
    'フリーレン 考察',
    // SPY×FAMILY
    'スパイファミリー 伏線',
    'SPY×FAMILY 考察',
    // ワールドトリガー
    'ワールドトリガー 伏線',
    'ワールドトリガー 考察',
    // Dr.STONE
    'Dr.STONE 伏線',
    'Dr.STONE 伏線回収',
    // 東京喰種
    '東京喰種 伏線',
    '東京喰種 考察',
    // 約束のネバーランド
    '約束のネバーランド 伏線',
    '約束のネバーランド 伏線回収',
    // 鋼の錬金術師
    '鋼の錬金術師 伏線',
    'ハガレン 伏線回収',
    // 名探偵コナン
    'コナン 伏線',
    '名探偵コナン 伏線回収',
    'コナン 黒の組織 伏線',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '伏線回収ラボ',
    title: '伏線回収ラボ｜漫画の伏線回収・考察・未回収の伏線まとめ',
    description:
      'ONE PIECE、進撃の巨人、呪術廻戦など人気漫画の伏線回収・未回収の伏線・伏線考察を徹底解説。漫画の伏線を深く読み解く専門サイト。',
    url: 'https://fukusen-lab.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: '伏線回収ラボ',
    description: '人気漫画の伏線回収・未回収の伏線・伏線考察を徹底解説する専門サイト',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://fukusen-lab.vercel.app',
  },
  verification: {
    google: 'QNT_EwkmJ039_aVzqr1sKc_hySyn-ZpgLZDtAgxtsNo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1611624572831066"
          crossOrigin="anonymous"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V11MKY0X3F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V11MKY0X3F');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '伏線回収ラボ',
              url: 'https://fukusen-lab.vercel.app',
              description: 'ONE PIECE、進撃の巨人、呪術廻戦など人気漫画20作品110記事の伏線回収・未回収の伏線・伏線考察を徹底解説する日本最大級の伏線考察専門サイト。',
              publisher: {
                '@type': 'Organization',
                name: '伏線回収ラボ編集部',
                url: 'https://fukusen-lab.vercel.app',
              },
              inLanguage: 'ja',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://fukusen-lab.vercel.app/tags?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="32x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a12" />
      </head>
      <body className={`${notoSansJP.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
