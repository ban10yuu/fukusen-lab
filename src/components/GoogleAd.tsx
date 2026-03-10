'use client';

import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-1611624572831066';

type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle';

interface GoogleAdProps {
  format?: AdFormat;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function GoogleAd({ format = 'auto', className = '' }: GoogleAdProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
