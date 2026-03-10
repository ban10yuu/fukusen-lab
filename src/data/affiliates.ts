import { AffiliateLink, MangaInfo } from '@/lib/types';

// もしもアフィリエイト a_id (楽天提携済み)
const MOSHIMO_A_ID = '5417189';

function moshimoRakutenLink(url: string): string {
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616&url=${encodeURIComponent(url)}`;
}

export const MOSHIMO_IMPRESSION_URL = `https://i.moshimo.com/af/i/impression?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616`;

export function getAffiliateLinks(manga: MangaInfo): AffiliateLink[] {
  const links: AffiliateLink[] = [];

  // 楽天ブックス (もしもアフィリエイト経由 - 提携済み)
  links.push({
    service: 'rakuten',
    label: '楽天ブックスで読む',
    url: moshimoRakutenLink(`https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(manga.title)}&g=001`),
    badge: 'ポイント還元',
  });

  // ebookjapan (直リンク - ASP提携後に差し替え予定)
  links.push({
    service: 'ebookjapan',
    label: 'ebookjapanで読む',
    url: `https://ebookjapan.yahoo.co.jp/search/?keyword=${encodeURIComponent(manga.title)}`,
    badge: '初回70%OFF',
  });

  // DMMブックス (A8.net審査中 - 承認後にトラッキングURL差し替え予定)
  links.push({
    service: 'dmm',
    label: 'DMMブックスで読む',
    url: `https://book.dmm.com/list/?floor=ebook&article=keyword&searchstr=${encodeURIComponent(manga.title)}`,
    badge: '最大90%OFF',
  });

  // 楽天Kobo (もしもアフィリエイト経由 - 提携済み)
  links.push({
    service: 'kobo',
    label: '楽天Koboで読む',
    url: moshimoRakutenLink(`https://books.rakuten.co.jp/rk/${encodeURIComponent(manga.title)}-kobo/`),
    badge: '電子書籍',
  });

  // Amebaマンガ (直リンク - ASP提携後に差し替え予定)
  links.push({
    service: 'ameba',
    label: 'Amebaマンガで読む',
    url: `https://dokusho-ojikan.jp/search/result?word=${encodeURIComponent(manga.title)}`,
    badge: '100冊40%OFF',
  });

  // コミックシーモア (直リンク - ASP提携後に差し替え予定)
  links.push({
    service: 'cmoa',
    label: 'シーモアで読む',
    url: `https://www.cmoa.jp/search/result/?header_word=${encodeURIComponent(manga.title)}`,
    badge: '初回70%OFF',
  });

  // BookLive (直リンク - ASP提携後に差し替え予定)
  links.push({
    service: 'booklive',
    label: 'BookLiveで読む',
    url: `https://booklive.jp/search/keyword?keyword=${encodeURIComponent(manga.title)}`,
    badge: '50%OFFクーポン',
  });

  // まんが王国 (直リンク - ASP提携後に差し替え予定)
  links.push({
    service: 'mangaoukoku',
    label: 'まんが王国で読む',
    url: `https://comic.k-manga.jp/search/result?keyword=${encodeURIComponent(manga.title)}`,
    badge: '最大50%還元',
  });

  return links;
}

export const generalAffiliates = [
  {
    title: '楽天ブックス',
    description: '楽天ポイントが貯まる！漫画の購入で最大10倍ポイント還元。',
    url: moshimoRakutenLink('https://books.rakuten.co.jp/'),
    badge: 'ポイント還元',
    color: '#bf0000',
  },
  {
    title: 'ebookjapan',
    description: '初回ログインで70%OFFクーポン配布中！漫画を安く読むならここ。',
    url: 'https://ebookjapan.yahoo.co.jp/',
    badge: '70%OFF',
    color: '#ff0033',
  },
  {
    title: 'DMMブックス',
    description: '定期的に大規模セールを開催。最大90%OFFも。',
    url: 'https://book.dmm.com/',
    badge: '最大90%OFF',
    color: '#1a1a1a',
  },
  {
    title: '楽天Kobo',
    description: '400万冊以上の電子書籍。楽天ポイントで購入可能。',
    url: moshimoRakutenLink('https://books.rakuten.co.jp/e-book/'),
    badge: '電子書籍',
    color: '#bf0000',
  },
  {
    title: 'Amebaマンガ',
    description: '100冊まで40%OFFクーポン配布中！大量買いするならここ。',
    url: 'https://dokusho-ojikan.jp/',
    badge: '100冊40%OFF',
    color: '#2dbe60',
  },
  {
    title: 'コミックシーモア',
    description: '初回70%OFFクーポン配布中。読み放題プランも充実。',
    url: 'https://www.cmoa.jp/',
    badge: '70%OFF',
    color: '#ec4d8a',
  },
  {
    title: 'BookLive',
    description: '初回50%OFFクーポン配布中。Tポイントも使える。',
    url: 'https://booklive.jp/',
    badge: '50%OFF',
    color: '#0075c2',
  },
  {
    title: 'まんが王国',
    description: '毎日最大50%ポイント還元。3,000作品以上が無料で試し読み。',
    url: 'https://comic.k-manga.jp/',
    badge: '50%還元',
    color: '#ff6b00',
  },
];
