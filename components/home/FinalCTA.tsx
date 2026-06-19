'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ambientImages } from '@/lib/images';

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-bg]', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
      gsap.fromTo(
        '[data-cta-word]',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power4.out',
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 70%' },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const words = ['Reserve', 'your', 'chair.'];

  return (
    <section ref={root} className="relative h-[88svh] min-h-[600px] w-full overflow-hidden">
      <div data-bg className="absolute inset-0 -z-10 will-change-transform">
        <Image src={ambientImages.studio} alt="Studio at twilight" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow eyebrow-copper">07 · Book Online</p>
        <h2 className="mt-6 headline-xl text-bone text-[20vw] leading-[0.9] lg:text-[11vw]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.18em] last:pr-0">
              <span data-cta-word className={`inline-block will-change-transform ${w === 'chair.' ? 'font-italic text-copper-300' : ''}`}>{w}</span>
            </span>
          ))}
        </h2>
        <p className="mt-10 max-w-md text-sm text-bone/70">
          We open the books on Mondays at 9 a.m. Most weeks fill by Tuesday.
        </p>
        <Link
          href="/book"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-[11px] uppercase tracking-widest text-ink transition-all duration-500 hover:bg-copper-300 cursor-pointer"
        >
          Book Online
          <svg width="14" height="10" viewBox="0 0 14 10" className="transition-transform duration-500 group-hover:translate-x-1">
            <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
