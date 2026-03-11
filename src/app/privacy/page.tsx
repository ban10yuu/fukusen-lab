import { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://fukusen-lab.vercel.app';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '伏線回収ラボのプライバシーポリシー。個人情報の取り扱い、Cookie、広告配信、アクセス解析について。',
  openGraph: {
    title: 'プライバシーポリシー｜伏線回収ラボ',
    description: '伏線回収ラボのプライバシーポリシー。',
    url: `${BASE_URL}/privacy`,
    siteName: '伏線回収ラボ',
  },
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-8 relative z-10">
        <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
          <Link href="/" className="hover:text-[#dc2626] transition-colors">ホーム</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400">プライバシーポリシー</span>
        </nav>

        <h1 className="text-2xl font-black text-white mb-8">プライバシーポリシー</h1>

        <div className="bg-[#12121c] rounded border-2 border-[#1e1e2e] p-6 md:p-8">
          <div className="article-content">
            <p>
              伏線回収ラボ（以下「当サイト」）は、ユーザーの皆様の個人情報の保護を重要視しております。
              本プライバシーポリシーでは、当サイトにおける個人情報の取り扱いについてご説明いたします。
            </p>

            <h2>個人情報の取り扱いについて</h2>
            <p>
              当サイトでは、お問い合わせの際にメールアドレス等の個人情報をご提供いただく場合があります。
              取得した個人情報は、お問い合わせへの回答や必要な情報のご連絡のためにのみ使用し、
              これらの目的以外では利用いたしません。
            </p>

            <h2>アクセス解析ツールについて</h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。
              Google Analyticsはデータの収集のためにCookieを使用しています。
              このデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p>
              この機能はCookieを無効にすることで収集を拒否することができますので、
              お使いのブラウザの設定をご確認ください。
              Google Analyticsの利用規約については、
              <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] hover:underline">Google Analytics利用規約</a>をご覧ください。
            </p>

            <h2>広告配信について</h2>
            <p>
              当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。
              Google AdSenseでは、ユーザーの興味に応じた広告を配信するためにCookieを使用することがあります。
            </p>
            <p>
              Cookieを使用することにより、ユーザーが当サイトや他のサイトにアクセスした際の情報に基づき、
              適切な広告を表示することが可能になります。
              Cookieを無効にする設定およびGoogleアドセンスに関する詳細は、
              <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] hover:underline">広告 - ポリシーと規約 - Google</a>をご覧ください。
            </p>

            <h2>第三者配信事業者によるCookieの使用</h2>
            <p>
              第三者配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（DART Cookie等）を使用することがあります。
              ユーザーは、広告設定でパーソナライズ広告を無効にすることができます。
              また、<a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] hover:underline">www.aboutads.info</a>にアクセスすることで、
              第三者配信事業者がパーソナライズ広告の配信に使用するCookieを無効にすることができます。
            </p>

            <h2>アフィリエイトプログラムについて</h2>
            <p>
              当サイトは、以下のアフィリエイトプログラムに参加しています。
            </p>
            <p>
              当サイトの記事内にはアフィリエイトリンクが含まれている場合があり、
              リンク先の商品・サービスをご購入・ご利用いただいた場合、当サイトに報酬が支払われることがあります。
              ただし、アフィリエイトリンクの有無が記事の内容や評価に影響を与えることはありません。
            </p>
            <ul className="list-disc list-inside space-y-1 mb-6 text-[#c0c0d0]">
              <li>もしもアフィリエイト</li>
              <li>A8.net</li>
              <li>バリューコマース</li>
            </ul>

            <h2>免責事項</h2>
            <p>
              当サイトに掲載されている情報の正確性には万全を期しておりますが、
              その内容の正確性・安全性等を保証するものではありません。
              当サイトの情報をもとに行動された場合に生じたいかなる損害についても、
              当サイトは一切の責任を負いかねます。
            </p>
            <p>
              当サイトの考察・分析記事は筆者個人の見解であり、
              作品の公式見解や出版社の見解を代表するものではありません。
              著作権は各作品の作者・出版社に帰属します。
            </p>

            <h2>お問い合わせ先</h2>
            <p>
              本ポリシーに関するお問い合わせは、
              <Link href="/contact" className="text-[#f59e0b] hover:underline">お問い合わせページ</Link>よりお願いいたします。
            </p>

            <div className="mt-8 pt-6 border-t border-[#282838] text-sm text-gray-500">
              <p className="mb-0">制定日：2026年3月11日</p>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: BASE_URL },
          { name: 'プライバシーポリシー', url: `${BASE_URL}/privacy` },
        ]}
      />
    </>
  );
}
