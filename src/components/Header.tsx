'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mangaDropdown, setMangaDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/category/all?q=${encodeURIComponent(searchQuery.trim())}`;
    setSearchQuery('');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-ink-deep/95 backdrop-blur-sm border-b border-ink-line shadow-[0_1px_0_rgba(201,163,94,0.25)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — brass magnifying glass + serif wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg
            className="w-7 h-7 text-brass group-hover:text-brass-light transition-colors flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <circle cx="10.5" cy="10.5" r="3.5" strokeWidth="0.75" opacity="0.6" />
            <path strokeLinecap="round" strokeWidth="2.2" d="M15.5 15.5L21 21" />
          </svg>
          <div className="flex flex-col">
            <span className="font-serif font-extrabold text-lg leading-tight tracking-wide">
              <span className="text-brass group-hover:text-brass-light transition-colors">伏線</span>
              <span className="text-parchment group-hover:text-parchment-light transition-colors">回収ラボ</span>
            </span>
            <span className="text-[9px] tracking-[0.35em] text-mist-dim font-semibold uppercase">
              Fukusen Lab — 考察書斎
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-mist hover:text-brass-light transition-colors">
            ホーム
          </Link>

          {/* 作品一覧 dropdown */}
          <div className="relative">
            <button
              onClick={() => { setMangaDropdown(!mangaDropdown); setCategoryDropdown(false); }}
              className="text-mist hover:text-brass-light transition-colors flex items-center gap-1"
            >
              作品一覧
              <svg className={`w-3.5 h-3.5 transition-transform ${mangaDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mangaDropdown && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-ink-surface shadow-[0_8px_24px_rgba(0,0,0,0.45)] double-rule py-2 max-h-80 overflow-y-auto">
                {mangaList.map(m => (
                  <Link
                    key={m.slug}
                    href={`/manga/${m.slug}/`}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-mist hover:text-brass-light hover:bg-ink-raised transition-colors"
                    onClick={() => setMangaDropdown(false)}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-black/20"
                      style={{ backgroundColor: m.coverColor }}
                    />
                    {m.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* カテゴリ dropdown */}
          <div className="relative">
            <button
              onClick={() => { setCategoryDropdown(!categoryDropdown); setMangaDropdown(false); }}
              className="text-mist hover:text-brass-light transition-colors flex items-center gap-1"
            >
              カテゴリ
              <svg className={`w-3.5 h-3.5 transition-transform ${categoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {categoryDropdown && (
              <div className="absolute top-full left-0 mt-3 w-56 bg-ink-surface shadow-[0_8px_24px_rgba(0,0,0,0.45)] double-rule py-2">
                {categories.map(([key, label]) => (
                  <Link
                    key={key}
                    href={`/category/${key}/`}
                    className="block px-4 py-2 text-sm text-mist hover:text-brass-light hover:bg-ink-raised transition-colors"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/category/all" className="text-mist hover:text-brass-light transition-colors">
            記事一覧
          </Link>

          {/* Search form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="手がかりを検索..."
              className="w-44 bg-ink-raised border border-ink-line rounded-sm px-3 py-1.5 pr-8 text-xs text-parchment placeholder-mist-dim focus:outline-none focus:ring-1 focus:ring-brass focus:border-brass transition-colors"
            />
            <button type="submit" aria-label="検索" className="absolute right-2 top-1/2 -translate-y-1/2 text-mist-dim hover:text-brass-light transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
          className="md:hidden p-2 -mr-2 text-mist hover:text-brass-light transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink-surface border-t-[3px] border-double border-brass-dark/50 py-4 px-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link href="/" className="block py-2.5 text-mist hover:text-brass-light transition-colors" onClick={() => setMenuOpen(false)}>
            ホーム
          </Link>
          <Link href="/category/all" className="block py-2.5 text-mist hover:text-brass-light transition-colors" onClick={() => setMenuOpen(false)}>
            記事一覧
          </Link>

          {/* Mobile: カテゴリ */}
          <div className="mt-3 border-t border-ink-line pt-3">
            <p className="brass-label mb-2">カテゴリ</p>
            {categories.map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}/`}
                className="block py-2 text-sm text-mist hover:text-brass-light transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile: 作品一覧 */}
          <div className="mt-3 border-t border-ink-line pt-3">
            <p className="brass-label mb-2">作品一覧</p>
            {mangaList.map(m => (
              <Link
                key={m.slug}
                href={`/manga/${m.slug}/`}
                className="flex items-center gap-2 py-2 text-sm text-mist hover:text-brass-light transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 ring-1 ring-black/20"
                  style={{ backgroundColor: m.coverColor }}
                />
                {m.title}
              </Link>
            ))}
          </div>

          {/* Mobile: Search */}
          <form onSubmit={handleSearch} className="mt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="手がかりを検索..."
              className="w-full bg-ink-raised border border-ink-line rounded-sm px-4 py-2.5 text-sm text-parchment placeholder-mist-dim focus:outline-none focus:ring-1 focus:ring-brass focus:border-brass transition-colors"
            />
          </form>
        </div>
      )}
    </header>
  );
}
