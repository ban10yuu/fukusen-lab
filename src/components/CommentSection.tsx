'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

export default function CommentSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const storageKey = `fukusen-comments-${articleSlug}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setComments(JSON.parse(saved));
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim() || '匿名',
      text: text.trim(),
      date: new Date().toLocaleDateString('ja-JP'),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setText('');
  };

  return (
    <div className="mt-10 double-rule bg-parchment-dark/50 p-5">
      <h3 className="font-serif font-bold text-base text-sepia-900 tracking-wide mb-4 pb-2 border-b border-parchment-line">コメント</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="名前（任意）"
          className="w-full bg-parchment-light border border-parchment-line rounded-sm px-4 py-2 text-sm text-sepia-900 placeholder-sepia-500/60 mb-2 focus:outline-none focus:ring-1 focus:ring-brass-dark focus:border-brass-dark transition-colors"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="コメントを書く..."
          rows={3}
          className="w-full bg-parchment-light border border-parchment-line rounded-sm px-4 py-2 text-sm text-sepia-900 placeholder-sepia-500/60 mb-2 focus:outline-none focus:ring-1 focus:ring-brass-dark focus:border-brass-dark resize-none transition-colors"
        />
        <button
          type="submit"
          className="text-sm font-bold text-parchment-light bg-ink-surface hover:bg-ink-raised border border-brass-dark/50 px-5 py-2 rounded-sm transition-colors"
        >
          投稿する
        </button>
      </form>

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="bg-parchment-light rounded-sm p-3 border border-parchment-line">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-copper">{c.name}</span>
                <span className="text-[10px] text-sepia-500">{c.date}</span>
              </div>
              <p className="text-sm text-sepia-700">{c.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-sepia-500 text-center py-4">まだコメントはありません</p>
      )}
    </div>
  );
}
