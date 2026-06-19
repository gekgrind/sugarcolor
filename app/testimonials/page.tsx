'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import Reveal from '@/components/Reveal';
import { heroImages } from '@/lib/images';

const FEATURED = {
  body:
    "I drove three and a half hours from Atlanta because of one Instagram photo. Margaux sat with me for forty minutes before mixing a bowl, asked me about the light in my bathroom, then quoted four hours flat. I left with hair that has not stopped getting compliments — and a tonic bottle she labelled by hand. I'm doing it again next month.",
  author: 'Madison K.',
  meta: 'Lived-in copper · 2nd visit',
};

const QUOTES = [
  { stars: 5, body: 'They sat with me for forty minutes before mixing a single bowl. I have never had a colorist ask me about the light in my bathroom before.', author: 'Rachel B.', meta: 'Color correction' },
  { stars: 5, body: 'My hair has never been this soft after a foil. I keep touching it like it isn’t mine.', author: 'Sara D.', meta: 'Signature color' },
  { stars: 5, body: 'Theo found the haircut my hair has been waiting for since 2018. I am not exaggerating.', author: 'Erin P.', meta: 'Precision cut' },
  { stars: 5, body: 'June quietly fixed five years of bad babylights in one sit. I cried in the chair a little.', author: 'Hannah L.', meta: 'Lived-in blonde' },
  { stars: 5, body: 'The bridal styling held for fifteen hours through a Georgia summer wedding. Witchcraft.', author: 'Carlie J.', meta: 'Bridal' },
  { stars: 5, body: 'The waiting room smells like cedar. The chairs are warm. The wifi works. None of these should be remarkable but they all are.', author: 'Brooke H.', meta: 'Repeat guest' },
  { stars: 5, body: 'They told me my color would take three visits to do safely. Other places quoted me one. I trust them now for life.', author: 'Mia R.', meta: 'Correction' },
  { stars: 5, body: 'Wren\'s scalp massage made me reconsider my entire shower routine. I bought the comb on the way out.', author: 'Tessa V.', meta: 'Treatment' },
];

const MARQUEE = [
  '“Worth the drive.”',
  '“Best copper of my life.”',
  '“They taught me how to wash my hair.”',
  '“Five stars, all of us.”',
  '“Margaux is a saint.”',
  '“Smoothest hair I’ve ever had.”',
];

export default function TestimonialsPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-quote]',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-wall]', start: 'top 80%' },
        }
      );
      gsap.to('[data-belt]', { xPercent: -50, repeat: -1, duration: 60, ease: 'none' });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <PageHeader
        number="07"
        eyebrow="In Their Words"
        title="Said by the"
        italic="seated."
        intro="Real notes from real guests. Nothing was edited, nothing was paid for, nothing was promoted. We just collect them and put them here."
        image={heroImages.detail}
        imageAlt="Testimonials header"
      />

      <section className="relative bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-12">
          <Reveal>
            <p className="eyebrow eyebrow-copper">Featured</p>
            <svg viewBox="0 0 60 60" className="mx-auto mt-8 h-14 w-14 text-copper-300/70" fill="currentColor" aria-hidden>
              <path d="M14 36c0-8 6-14 14-14v6c-5 0-8 3-8 8h8v14H14V36Zm26 0c0-8 6-14 14-14v6c-5 0-8 3-8 8h8v14H40V36Z" />
            </svg>
            <blockquote className="mt-10 font-display text-3xl text-bone leading-tight lg:text-5xl">
              “{FEATURED.body}”
            </blockquote>
            <p className="mt-10 eyebrow eyebrow-copper">{FEATURED.author}</p>
            <p className="mt-1 text-xs text-bone/55">{FEATURED.meta}</p>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden border-y border-copper-900/30 py-8 bg-charcoal">
        <div data-belt className="belt font-display text-4xl text-bone/40 lg:text-6xl">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((q, i) => (
            <span key={i} className={i % 2 ? 'font-italic text-copper-300/60' : ''}>{q}</span>
          ))}
        </div>
      </section>

      <section className="relative bg-ink py-32 lg:py-44">
        <div data-wall className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {QUOTES.map((q, i) => (
              <article
                key={i}
                data-quote
                className="group rounded-sm border border-copper-900/40 p-7 transition-all duration-500 hover:border-copper-500/70 hover:-translate-y-1"
              >
                <div className="flex gap-1 text-copper-300">
                  {Array.from({ length: q.stars }).map((_, s) => (
                    <svg key={s} viewBox="0 0 16 16" className="h-3 w-3 fill-current"><path d="M8 0l2 5h6l-5 3.5L13 14l-5-3.5L3 14l2-5.5L0 5h6z"/></svg>
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-xl text-bone leading-snug lg:text-2xl">
                  “{q.body}”
                </blockquote>
                <div className="mt-7 flex items-baseline justify-between border-t border-copper-900/40 pt-4">
                  <p className="eyebrow eyebrow-copper">{q.author}</p>
                  <p className="text-[10px] text-bone/55">{q.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookCTA title="Add your name to the book." />
    </main>
  );
}
