import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 relative z-10">
      <div className="text-center paper double-rule px-8 py-12 max-w-md">
        <p className="font-serif text-[10px] font-bold tracking-[0.3em] uppercase text-brass-dark mb-2">
          Case Not Found
        </p>
        <h1 className="font-serif text-7xl font-extrabold text-copper mb-4">404</h1>
        <h2 className="font-serif text-xl font-bold text-sepia-900 tracking-wide mb-2">ページが見つかりません</h2>
        <p className="text-sm text-sepia-700 mb-6">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block bg-brass text-ink-deep px-6 py-3 rounded-sm text-sm font-bold hover:bg-brass-light transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
