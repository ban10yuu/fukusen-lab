import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://fukusen-lab.vercel.app'),
  title: {
    default: '伏線回収ラボ｜漫画の伏線回収・考察・未回収の伏線まとめ',
    template: '%s｜伏線回収ラボ',
  },
  description:
    'ONE PIECE、進撃の巨人、呪術廻戦など人気漫画の伏線回収・未回収の伏線・伏線考察を徹底解説。回収済み伏線の時系列整理から、まだ回収されていない伏線の考察まで、漫画の伏線を深く読み解く専門サイトです。',
  keywords: [
    '漫画 伏線',
    '伏線回収',
    '伏線 考察',
    '未回収の伏線',
    '伏線回収 まとめ',
    '伏線 タイムライン',
    '伏線テクニック',
    'ONE PIECE 伏線',
    'ONE PIECE 伏線回収',
    '進撃の巨人 伏線',
    '進撃の巨人 伏線回収',
    '呪術廻戦 伏線',
    '鬼滅の刃 伏線',
    'ハンターハンター 伏線',
    'チェンソーマン 伏線',
    'NARUTO 伏線',
    'DEATH NOTE 伏線',
    'ジョジョ 伏線',
    'ブリーチ 伏線',
    'キングダム 伏線',
    'ヒロアカ 伏線',
    'フリーレン 伏線',
    'スパイファミリー 伏線',
    'ワールドトリガー 伏線',
    'Dr.STONE 伏線',
    '東京喰種 伏線',
    '約束のネバーランド 伏線',
    '鋼の錬金術師 伏線',
    'コナン 伏線',
    '漫画 伏線 解説',
    '漫画 考察',
    '漫画 ネタバレ',
    '伏線 回収 感動',
    '伏線 未回収 一覧',
    '漫画 伏線 ランキング',
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
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="32x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a12" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
