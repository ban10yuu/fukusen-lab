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
    <header className="sticky top-0 z-50 bg-[#0a0a12] border-b border-[#282838]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span className="font-black text-lg leading-tight">
              <span className="text-[#dc2626]">伏線</span>
              <span className="text-[#eaeaf0] group-hover:text-[#f59e0b] transition-colors">回収ラボ</span>
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#b0b0c0]/60 font-semibold">FUKUSEN LAB</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-[#b0b0c0] hover:text-[#dc2626] transition-colors">
            ホーム
          </Link>

          {/* 作品一覧 dropdown */}
          <div className="relative">
            <button
              onClick={() => { setMangaDropdown(!mangaDropdown); setCategoryDropdown(false); }}
              className="text-[#b0b0c0] hover:text-[#dc2626] transition-colors flex items-center gap-1"
            >
              作品一覧
              <svg className={`w-3.5 h-3.5 transition-transform ${mangaDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mangaDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#14141e] shadow-lg border border-[#282838] rounded-lg py-2 max-h-80 overflow-y-auto">
                {mangaList.map(m => (
                  <Link
                    key={m.slug}
                    href={`/manga/${m.slug}/`}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#b0b0c0] hover:text-[#dc2626] hover:bg-[#1c1c28] transition-colors"
                    onClick={() => setMangaDropdown(false)}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
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
              className="text-[#b0b0c0] hover:text-[#dc2626] transition-colors flex items-center gap-1"
            >
              カテゴリ
              <svg className={`w-3.5 h-3.5 transition-transform ${categoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {categoryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#14141e] shadow-lg border border-[#282838] rounded-lg py-2">
                {categories.map(([key, label]) => (
                  <Link
                    key={key}
                    href={`/category/${key}/`}
                    className="block px-4 py-2 text-sm text-[#b0b0c0] hover:text-[#dc2626] hover:bg-[#1c1c28] transition-colors"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/category/all" className="text-[#b0b0c0] hover:text-[#dc2626] transition-colors">
            記事一覧
          </Link>

          {/* Search form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="検索..."
              className="w-40 bg-[#1c1c28] border border-[#282838] rounded-lg px-3 py-1.5 text-xs text-[#eaeaf0] placeholder-[#b0b0c0]/50 focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:border-[#dc2626] transition-colors"
            />
            <button type="submit" aria-label="検索" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#b0b0c0] hover:text-[#dc2626] transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#b0b0c0] hover:text-[#dc2626]"
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
        <div className="md:hidden bg-[#14141e] border-t border-[#282838] py-4 px-4">
          <Link href="/" className="block py-2 text-[#b0b0c0] hover:text-[#dc2626]" onClick={() => setMenuOpen(false)}>
            ホーム
          </Link>
          <Link href="/category/all" className="block py-2 text-[#b0b0c0] hover:text-[#dc2626]" onClick={() => setMenuOpen(false)}>
            記事一覧
          </Link>

          {/* Mobile: カテゴリ */}
          <div className="mt-3 border-t border-[#282838] pt-3">
            <p className="text-xs text-[#b0b0c0]/50 mb-2">カテゴリ</p>
            {categories.map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}/`}
                className="block py-1.5 text-sm text-[#b0b0c0] hover:text-[#dc2626]"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile: 作品一覧 */}
          <div className="mt-3 border-t border-[#282838] pt-3">
            <p className="text-xs text-[#b0b0c0]/50 mb-2">作品一覧</p>
            {mangaList.map(m => (
              <Link
                key={m.slug}
                href={`/manga/${m.slug}/`}
                className="flex items-center gap-2 py-1.5 text-sm text-[#b0b0c0] hover:text-[#dc2626]"
                onClick={() => setMenuOpen(false)}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
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
              placeholder="記事を検索..."
              className="w-full bg-[#1c1c28] border border-[#282838] rounded-lg px-4 py-2 text-sm text-[#eaeaf0] placeholder-[#b0b0c0]/50 focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:border-[#dc2626]"
            />
          </form>
        </div>
      )}
    </header>
  );
}
