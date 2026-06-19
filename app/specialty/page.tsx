'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import Reveal from '@/components/Reveal';
import { heroImages, galleryImages, ambientImages } from '@/lib/images';

const FORMULAS = [
  { name: 'Penny', tone: 'Lightest. New copper.', hex: '#d99465' },
  { name: 'Ember', tone: 'Warm, lived-in.', hex: '#e9a86a' },
  { name: 'Cognac', tone: 'Deeper, golden.', hex: '#b87333' },
  { name: 'Rust', tone: 'Rich, autumnal.', hex: '#9a5e26' },
  { name: 'Auburn', tone: 'Brunette base, copper finish.', hex: '#7a4a1f' },
  { name: 'Garnet', tone: 'Deep red copper.', hex: '#8a3a2c' },
];

export default function SpecialtyPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-swatch]',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '[data-swatches]', start: 'top 80%' } }
      );
      gsap.to('[data-belt]', { xPercent: -50, repeat: -1, duration: 50, ease: 'none' });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <PageHeader
        number="03"
        eyebrow="The Specialty"
        title="The copper"
        italic="book."
        intro="A library of six house-built copper formulas. Each is hand-blended for skin tone, base level, and how much grow-out you want to read. None of them are pre-mix. None of them are off the shelf."
        image={heroImages.main}
        imageAlt="Specialty header"
      />

      <section className="overflow-hidden border-y border-copper-900/30 py-8 bg-charcoal">
        <div data-belt className="belt font-display text-5xl text-copper-300/60 lg:text-7xl">
          {[...Array(3)].map((_, group) => (
            <span key={group} className="flex gap-12">
              {FORMULAS.map((f, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span className="block h-3 w-3 rounded-full" style={{ background: f.hex }} />
                  <span className={i % 2 ? 'font-italic text-bone/60' : ''}>{f.name}</span>
                </span>
              ))}
              <span className="text-bone/40">·</span>
            </span>
          ))}
        </div>
      </section>

      <section className="relative bg-ink py-32 lg:py-44">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <Reveal>
            <p className="eyebrow eyebrow-copper">House Formulas</p>
            <h2 className="mt-5 max-w-3xl headline-xl text-5xl text-bone lg:text-7xl">
              Six pigments. <span className="font-italic text-copper-300">Endless ways to wear them.</span>
            </h2>
          </Reveal>

          <div data-swatches className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FORMULAS.map((f, i) => (
              <article
                key={f.name}
                data-swatch
                className="group relative overflow-hidden rounded-sm border border-copper-900/40 transition-all duration-500 hover:border-copper-500/70"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(ellipse at 30% 20%, ${f.hex}aa 0%, ${f.hex}33 40%, #0a0a0b 90%)`,
                    }}
                  />
                  <div className="absolute inset-0 mix-blend-overlay opacity-50">
                    <Image src={galleryImages[i % galleryImages.length]} alt={f.name} fill className="object-cover" sizes="33vw" />
                  </div>
                </div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-4xl text-bone">{f.name}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-copper-300">№ {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-2 text-sm text-bone/65">{f.tone}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-bone/40">{f.hex}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal py-32 lg:py-44">
        <div className="mx-auto grid w-full max-w-[1500px] gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-12">
          <Reveal as="div" className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image src={ambientImages.studio} alt="Studio booth" fill className="object-cover" sizes="50vw" />
          </Reveal>
          <div className="flex flex-col justify-center">
            <p className="eyebrow eyebrow-copper">The Process</p>
            <h2 className="mt-5 font-display text-4xl text-bone lg:text-6xl">Why copper takes four hours.</h2>
            <ol className="mt-10 space-y-7 text-sm text-bone/70">
              {[
                ['00:00', 'Reading & formula. We pick the pigment by your bathroom light, your shower, the way you part your hair.'],
                ['00:20', 'Bond build. We pre-treat with K18 mist before we touch a foil. This is the step most salons skip.'],
                ['00:35', 'Foil pattern. Slow placement. Tighter at the part, looser at the ends.'],
                ['01:50', 'Dual-light tone check. We pull a strand into the booth to read the warmth before we commit.'],
                ['02:10', 'Saturation. Custom-mixed bowl, brushed in section by section.'],
                ['03:30', 'Gloss & set. Cool rinse, take-home labelled bottle, written formula card.'],
              ].map(([time, txt]) => (
                <li key={time} className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-t border-copper-900/40 pt-5">
                  <span className="font-mono text-xs text-copper-300">{time}</span>
                  <span>{txt}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <BookCTA title="Book a copper sit." subtitle="Allow four hours. Bring a book." />
    </main>
  );
}
