import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 relative z-10">
      <div className="text-center">
        <h1 className="text-7xl font-black text-[#dc2626] mb-4">404</h1>
        <h2 className="text-xl font-black text-white mb-2">ページが見つかりません</h2>
        <p className="text-sm text-gray-500 mb-6">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block bg-[#dc2626] text-white px-6 py-3 rounded text-sm font-black hover:bg-[#b91c1c] transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
