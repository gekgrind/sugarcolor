'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import { heroImages, galleryImages } from '@/lib/images';

const TAGS = ['All', 'Copper', 'Blonde', 'Brunette', 'Cut', 'Styling'] as const;
type Tag = (typeof TAGS)[number];

const WORK = galleryImages.map((src, i) => ({
  src,
  tag: (['Copper', 'Blonde', 'Brunette', 'Cut', 'Styling'] as Tag[])[i % 5],
  stylist: ['Margaux', 'June', 'Theo', 'Sloane', 'Iris', 'Wren'][i % 6],
  title: ['Lived-in copper', 'Babylight blonde', 'Glossed brunette', 'Long curtain', 'Modern shag', 'Editorial set'][i % 6],
}));

export default function WorkPage() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Tag>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-tile]',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-grid]', start: 'top 80%' },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [filter]);

  const items = filter === 'All' ? WORK : WORK.filter((w) => w.tag === filter);

  const heights = ['h-[420px]', 'h-[520px]', 'h-[380px]', 'h-[460px]', 'h-[500px]', 'h-[440px]'];

  return (
    <main ref={root}>
      <PageHeader
        number="06"
        eyebrow="Our Work"
        title="The book."
        italic=""
        intro="Recent sittings, posted with permission. Tap a frame for the formula and the stylist who placed it."
        image={heroImages.main}
        imageAlt="Work gallery header"
      />

      <section className="relative bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-copper-900/40 pb-6">
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    filter === t
                      ? 'border-copper-300 bg-copper-500/15 text-copper-300'
                      : 'border-copper-900/50 text-bone/60 hover:border-copper-500/60 hover:text-bone'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="eyebrow">{items.length} pieces</p>
          </div>

          <div data-grid className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
            {items.map((w, i) => (
              <figure
                key={`${w.src}-${i}`}
                data-tile
                onClick={() => setLightbox(i)}
                className={`group relative mb-6 cursor-pointer overflow-hidden rounded-sm break-inside-avoid lg:mb-8 ${heights[i % heights.length]}`}
              >
                <Image
                  src={w.src}
                  alt={w.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-bone">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-copper-300">{w.tag}</span>
                    <span className="text-bone/60">№ {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl transition-transform duration-500 group-hover:translate-y-0 translate-y-1">{w.title}</h3>
                  <p className="text-xs text-bone/65">by {w.stylist}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 rounded-full border border-bone/30 px-4 py-2 text-[11px] uppercase tracking-widest text-bone hover:border-copper-300 hover:text-copper-300 transition-colors cursor-pointer"
          >
            Close
          </button>
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-sm">
            <Image
              src={items[lightbox].src}
              alt={items[lightbox].title}
              width={1200}
              height={1600}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink to-transparent p-8">
              <p className="eyebrow eyebrow-copper">{items[lightbox].tag}</p>
              <p className="mt-2 font-display text-3xl text-bone">{items[lightbox].title}</p>
              <p className="text-sm text-bone/60">Placed by {items[lightbox].stylist}</p>
            </div>
          </div>
        </div>
      )}

      <BookCTA />
    </main>
  );
}
