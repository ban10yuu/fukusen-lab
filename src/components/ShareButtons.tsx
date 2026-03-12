'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title?: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: 'twitter' | 'facebook' | 'line') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title || document.title);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      line: `https://social-plugins.line.me/lineit/share?url=${url}`,
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-3 my-6">
      <span className="text-xs font-bold text-gray-500">共有:</span>

      {/* X (Twitter) */}
      <button
        onClick={() => handleShare('twitter')}
        className="w-9 h-9 rounded-full flex items-center justify-center bg-black hover:bg-gray-800 transition-colors border border-gray-700 hover:border-gray-500"
        aria-label="Xで共有"
        title="Xで共有"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={() => handleShare('facebook')}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors border border-[#1877f2]/50 hover:border-[#1877f2]"
        style={{ backgroundColor: '#1877f2' }}
        aria-label="Facebookで共有"
        title="Facebookで共有"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* LINE */}
      <button
        onClick={() => handleShare('line')}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors border border-[#06c755]/50 hover:border-[#06c755]"
        style={{ backgroundColor: '#06c755' }}
        aria-label="LINEで共有"
        title="LINEで共有"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${
          copied
            ? 'bg-[#dc2626] border-[#dc2626] text-white'
            : 'bg-[#1a1a28] border-[#1e1e2e] text-gray-400 hover:border-[#dc2626]/40 hover:text-[#dc2626]'
        }`}
        aria-label="リンクをコピー"
        title={copied ? 'コピーしました!' : 'リンクをコピー'}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>

      {copied && (
        <span className="text-xs text-[#dc2626] font-bold animate-pulse">
          コピーしました!
        </span>
      )}
    </div>
  );
}
