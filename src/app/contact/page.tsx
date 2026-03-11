import { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://fukusen-lab.vercel.app';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: '伏線回収ラボへのお問い合わせページです。記事内容に関するご質問、ご意見、ご要望等をお寄せください。',
  openGraph: {
    title: 'お問い合わせ｜伏線回収ラボ',
    description: '伏線回収ラボへのお問い合わせはこちら。',
    url: `${BASE_URL}/contact`,
    siteName: '伏線回収ラボ',
  },
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-8 relative z-10">
        <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
          <Link href="/" className="hover:text-[#dc2626] transition-colors">ホーム</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400">お問い合わせ</span>
        </nav>

        <h1 className="text-2xl font-black text-white mb-8">お問い合わせ</h1>

        <div className="bg-[#12121c] rounded border-2 border-[#1e1e2e] p-6 md:p-8">
          <div className="article-content">
            <p>
              伏線回収ラボをご覧いただきありがとうございます。
              記事内容に関するご質問、ご意見、ご要望、掲載情報の修正依頼など、
              お気軽にお問い合わせください。
            </p>

            <h2>お問い合わせ方法</h2>
            <p>
              お問い合わせはメールにてお願いいたします。
            </p>

            <div className="bg-[#1c1c28] border-2 border-[#282838] rounded-lg p-6 text-center my-6">
              <p className="text-sm text-gray-400 mb-2">メールアドレス</p>
              <p className="text-lg font-bold text-[#f59e0b]">contact@example.com</p>
            </div>

            <h2>ご連絡いただく際のお願い</h2>
            <ul className="list-disc list-inside space-y-2 mb-6 text-[#c0c0d0]">
              <li>件名に「伏線回収ラボ」と記載いただけるとスムーズに対応できます。</li>
              <li>お問い合わせ内容によっては、回答にお時間をいただく場合がございます。</li>
              <li>通常、3営業日以内にご返信いたします。</li>
              <li>内容によっては回答いたしかねる場合もございますので、あらかじめご了承ください。</li>
            </ul>

            <h2>お問い合わせ内容の例</h2>
            <ul className="list-disc list-inside space-y-2 mb-6 text-[#c0c0d0]">
              <li>記事内容に関するご質問・ご意見</li>
              <li>掲載情報の誤りに関するご指摘</li>
              <li>取り上げてほしい作品・テーマのリクエスト</li>
              <li>広告掲載に関するお問い合わせ</li>
              <li>その他、当サイトに関するご連絡</li>
            </ul>
          </div>
        </div>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: BASE_URL },
          { name: 'お問い合わせ', url: `${BASE_URL}/contact` },
        ]}
      />
    </>
  );
}
