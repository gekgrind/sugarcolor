'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'article';
};

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 1.1,
  className = '',
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, duration]);

  const Tag = as as 'div';
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
