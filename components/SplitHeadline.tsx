'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function SplitHeadline({
  children,
  className = '',
  italicWords = [] as string[],
  trigger = 0.85,
}: {
  children: string;
  className?: string;
  italicWords?: string[];
  trigger?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll('[data-word]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: `top ${trigger * 100}%` },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [trigger]);

  return (
    <h2 ref={ref} className={className}>
      {children.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em] last:pr-0">
          <span
            data-word
            className={`inline-block will-change-transform ${italicWords.includes(w) ? 'font-italic text-copper-300' : ''}`}
          >
            {w}
          </span>
        </span>
      ))}
    </h2>
  );
}
