import { Article, ArticleCategory } from './types';

import { articles as onePieceArticles } from '@/data/articles/one-piece';
import { articles as attackOnTitanArticles } from '@/data/articles/attack-on-titan';
import { articles as hunterXHunterArticles } from '@/data/articles/hunter-x-hunter';
import { articles as demonSlayerArticles } from '@/data/articles/demon-slayer';
import { articles as jujutsuKaisenArticles } from '@/data/articles/jujutsu-kaisen';
import { articles as promisedNeverlandArticles } from '@/data/articles/promised-neverland';
import { articles as deathNoteArticles } from '@/data/articles/death-note';
import { articles as fullmetalAlchemistArticles } from '@/data/articles/fullmetal-alchemist';
import { articles as narutoArticles } from '@/data/articles/naruto';
import { articles as jojosBizarreAdventureArticles } from '@/data/articles/jojos-bizarre-adventure';
import { articles as chainsawManArticles } from '@/data/articles/chainsaw-man';
import { articles as tokyoGhoulArticles } from '@/data/articles/tokyo-ghoul';
import { articles as detectiveConanArticles } from '@/data/articles/detective-conan';
import { articles as bleachArticles } from '@/data/articles/bleach';
import { articles as myHeroAcademiaArticles } from '@/data/articles/my-hero-academia';
import { articles as kingdomArticles } from '@/data/articles/kingdom';
import { articles as frierenArticles } from '@/data/articles/frieren';
import { articles as spyXFamilyArticles } from '@/data/articles/spy-x-family';
import { articles as worldTriggerArticles } from '@/data/articles/world-trigger';
import { articles as drStoneArticles } from '@/data/articles/dr-stone';

const allArticles: Article[] = [
  ...onePieceArticles,
  ...attackOnTitanArticles,
  ...hunterXHunterArticles,
  ...demonSlayerArticles,
  ...jujutsuKaisenArticles,
  ...promisedNeverlandArticles,
  ...deathNoteArticles,
  ...fullmetalAlchemistArticles,
  ...narutoArticles,
  ...jojosBizarreAdventureArticles,
  ...chainsawManArticles,
  ...tokyoGhoulArticles,
  ...detectiveConanArticles,
  ...bleachArticles,
  ...myHeroAcademiaArticles,
  ...kingdomArticles,
  ...frierenArticles,
  ...spyXFamilyArticles,
  ...worldTriggerArticles,
  ...drStoneArticles,
];

// ビルド時の日付で公開済み記事のみフィルタ（未来日付の記事は非表示）
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const publishedArticles = allArticles.filter(a => a.publishedAt <= BUILD_DATE);

export function getAllArticles(): Article[] {
  return publishedArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** サイトマップ用: 日付フィルタなしで全記事を返す */
export function getAllArticlesUnfiltered(): Article[] {
  return [...allArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug);
}

export function getArticlesByManga(mangaSlug: string): Article[] {
  return publishedArticles
    .filter(a => a.mangaSlug === mangaSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return publishedArticles
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedArticles(article: Article, limit = 5): Article[] {
  // Priority: same manga first, then same category from other manga
  const sameManga = publishedArticles.filter(
    a => a.mangaSlug === article.mangaSlug && a.slug !== article.slug
  );
  const sameCategory = publishedArticles.filter(
    a =>
      a.category === article.category &&
      a.mangaSlug !== article.mangaSlug &&
      a.slug !== article.slug
  );

  // If article has relatedSlugs, prioritize those
  if (article.relatedSlugs && article.relatedSlugs.length > 0) {
    const explicit = article.relatedSlugs
      .map(s => publishedArticles.find(a => a.slug === s))
      .filter((a): a is Article => a !== undefined);
    const remaining = [...sameManga, ...sameCategory].filter(
      a => !article.relatedSlugs!.includes(a.slug)
    );
    return [...explicit, ...remaining].slice(0, limit);
  }

  return [...sameManga, ...sameCategory].slice(0, limit);
}

export function getPopularArticles(limit = 10): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getAllSlugs(): string[] {
  return allArticles.map(a => a.slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return publishedArticles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
  );
}

/** 全タグとその記事数を取得 */
export function getAllTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  for (const article of publishedArticles) {
    for (const tag of article.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** タグ名の一覧（スラッグ用） */
export function getAllTagSlugs(): string[] {
  const tags = new Set<string>();
  for (const article of allArticles) {
    for (const tag of article.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

/** 特定タグの記事を取得 */
export function getArticlesByTag(tag: string): Article[] {
  return publishedArticles
    .filter(a => a.tags.includes(tag))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** タグ名をURLスラッグに変換（スペース→ハイフン、小文字化） */
export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

/** URLスラッグから元のタグ名を逆引き */
export function slugToTag(slug: string): string | undefined {
  const decoded = decodeURIComponent(slug);
  const tags = new Set<string>();
  for (const article of allArticles) {
    for (const tag of article.tags) {
      tags.add(tag);
    }
  }
  const allTags = Array.from(tags);
  // Exact match first
  const exact = allTags.find(t => t === decoded);
  if (exact) return exact;
  // Slug-based match (e.g., "one-piece" → "ONE PIECE")
  return allTags.find(t => tagToSlug(t) === decoded);
}
