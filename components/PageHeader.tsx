'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

type Props = {
  number: string;
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
  image: string;
  imageAlt: string;
};

export default function PageHeader({ number, eyebrow, title, italic, intro, image, imageAlt }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('[data-bg]', { scale: 1.2, opacity: 0 }, { scale: 1.05, opacity: 1, duration: 2 })
        .fromTo('[data-word]', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, '-=1.4')
        .fromTo('[data-meta]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, '-=0.8');
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={root} className="relative flex min-h-[80svh] items-end overflow-hidden pt-32 pb-20 lg:min-h-[88svh] lg:pb-32">
      <div data-bg className="absolute inset-0 -z-10">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      </div>

      <div className="mx-auto w-full max-w-[1500px] px-6 lg:px-12">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-3xl">
            <p data-meta className="eyebrow eyebrow-copper">
              <span className="inline-block h-px w-10 align-middle bg-copper-400 mr-3" /> {number} · {eyebrow}
            </p>
            <h1 className="mt-6 headline-xl text-[14vw] text-bone lg:text-[8vw]">
              {title.split(' ').map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.18em] last:pr-0">
                  <span data-word className="inline-block will-change-transform">{w}</span>
                </span>
              ))}
              {italic && (
                <>
                  <br />
                  <span className="inline-block overflow-hidden align-bottom">
                    <span data-word className="inline-block font-italic text-copper-300 will-change-transform">{italic}</span>
                  </span>
                </>
              )}
            </h1>
            {intro && (
              <p data-meta className="mt-8 max-w-lg text-sm text-bone/75 leading-relaxed">{intro}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
