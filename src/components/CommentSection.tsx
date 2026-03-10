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
    <div className="mt-10 bg-[#14141e] rounded-xl border border-[#282838] p-5">
      <h3 className="font-black text-base text-[#eaeaf0] mb-4">コメント</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="名前（任意）"
          className="w-full bg-[#1c1c28] border border-[#282838] rounded-lg px-4 py-2 text-sm text-[#eaeaf0] placeholder-[#b0b0c0]/40 mb-2 focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:border-[#dc2626] transition-colors"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="コメントを書く..."
          rows={3}
          className="w-full bg-[#1c1c28] border border-[#282838] rounded-lg px-4 py-2 text-sm text-[#eaeaf0] placeholder-[#b0b0c0]/40 mb-2 focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:border-[#dc2626] resize-none transition-colors"
        />
        <button
          type="submit"
          className="text-sm font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] px-5 py-2 rounded-lg transition-colors"
        >
          投稿する
        </button>
      </form>

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="bg-[#1c1c28] rounded-lg p-3 border border-[#282838]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#dc2626]">{c.name}</span>
                <span className="text-[10px] text-[#b0b0c0]/50">{c.date}</span>
              </div>
              <p className="text-sm text-[#b0b0c0]">{c.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#b0b0c0]/50 text-center py-4">まだコメントはありません</p>
      )}
    </div>
  );
}
