'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import { heroImages, ambientImages, galleryImages } from '@/lib/images';

const SHELF = [
  { brand: 'House', name: 'Copper Tonic No. 1', purpose: 'Take-home gloss refresh', price: '$32', image: ambientImages.bottle, palette: '#b87333' },
  { brand: 'K18', name: 'Peptide Prep Mist', purpose: 'Pre-color bond therapy', price: '$48', image: ambientImages.product, palette: '#d99465' },
  { brand: 'Oribe', name: 'Gold Lust Shampoo', purpose: 'Daily, color-safe', price: '$54', image: ambientImages.candle, palette: '#e9a86a' },
  { brand: 'Olaplex', name: 'No. 3 Perfector', purpose: 'Weekly home protocol', price: '$30', image: ambientImages.pour, palette: '#9a5e26' },
  { brand: 'House', name: 'Slow Comb', purpose: 'Hand-finished pearwood', price: '$28', image: ambientImages.texture, palette: '#7a4a1f' },
  { brand: 'Davines', name: 'Authentic Oil', purpose: 'Multi-use finishing', price: '$42', image: ambientImages.bottle, palette: '#c8823f' },
];

export default function ProductsPage() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-card]',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-shelf]', start: 'top 75%' },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <PageHeader
        number="04"
        eyebrow="The Shelf"
        title="What we"
        italic="actually sell."
        intro="We stock six things. We could stock thirty. The six earn their place on the shelf by showing up in every chair and surviving humid Georgia summers."
        image={heroImages.detail}
        imageAlt="Products header"
      />

      <section className="relative bg-ink py-32 lg:py-44">
        <div data-shelf className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {SHELF.map((p, i) => (
              <article
                key={p.name}
                data-card
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-charcoal">
                  <div
                    className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${p.palette}88, transparent 70%)` }}
                  />
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="33vw"
                    className="object-cover mix-blend-luminosity opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:mix-blend-normal"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-bone/70">
                    <span>{String(i + 1).padStart(2, '0')} / {String(SHELF.length).padStart(2, '0')}</span>
                    <span className="text-copper-300">{p.brand}</span>
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{p.brand}</p>
                    <h3 className="mt-2 font-display text-2xl text-bone group-hover:text-copper-300 transition-colors">{p.name}</h3>
                    <p className="mt-2 text-sm text-bone/60">{p.purpose}</p>
                  </div>
                  <p className="font-display text-xl text-copper-300">{p.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image src={ambientImages.candle} alt="House tonic" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow eyebrow-copper">House Made</p>
            <h2 className="mt-5 font-display text-5xl text-bone lg:text-7xl">
              The tonic <span className="font-italic text-copper-300">we mix ourselves.</span>
            </h2>
            <p className="mt-8 max-w-md text-sm text-bone/70 leading-relaxed">
              Copper Tonic No. 1 is the only product we make in-studio. A leave-in mist with a soft pigment build that keeps your color reading warm for an extra two weeks between visits. Hand-mixed in small batches every Monday morning.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-bone/75">
              {['Color-true after twelve washes', 'Heat-safe up to 380°F', 'Refillable amber glass — bring yours back, save $4'].map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-px w-5 bg-copper-400" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BookCTA title="Pick up in studio." subtitle="Or ask us to mail your refill." />
    </main>
  );
}
