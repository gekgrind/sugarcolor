'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { galleryImages } from '@/lib/images';

export default function GalleryStrip() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const track = el.querySelector('[data-track]') as HTMLElement | null;
      if (!track) return;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const items = galleryImages.slice(0, 8);

  return (
    <section ref={root} className="relative bg-ink overflow-hidden lg:h-screen">
      <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-ink to-transparent py-10 pointer-events-none lg:h-32" />

      <div className="relative h-full flex flex-col justify-center pt-24 pb-24 lg:pt-32 lg:pb-16">
        <div className="mx-auto flex w-full max-w-[1500px] items-end justify-between gap-8 px-6 lg:px-12">
          <div>
            <p className="eyebrow eyebrow-copper">05 · Our Work</p>
            <h2 className="mt-5 headline-xl text-5xl text-bone lg:text-7xl">
              Recent <span className="font-italic text-copper-300">sittings.</span>
            </h2>
          </div>
          <Link href="/work" className="link-underline text-xs uppercase tracking-widest text-copper-300">
            See the gallery →
          </Link>
        </div>

        <div className="mt-14 overflow-hidden lg:mt-20">
          <div data-track className="flex gap-6 px-6 will-change-transform lg:gap-10 lg:px-12">
            {items.map((src, i) => (
              <figure
                key={src}
                className={`relative shrink-0 overflow-hidden rounded-sm ${
                  i % 2 === 0 ? 'h-[420px] w-[280px] lg:h-[560px] lg:w-[380px]' : 'h-[360px] w-[260px] lg:h-[480px] lg:w-[340px] lg:mt-12'
                }`}
              >
                <Image src={src} alt={`Client work ${i + 1}`} fill sizes="380px" className="object-cover transition-transform duration-700 hover:scale-105" />
                <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-bone/70">
                  <span>№ {String(i + 1).padStart(2, '0')}</span>
                  <span className="text-copper-300">Copper · Sit</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
