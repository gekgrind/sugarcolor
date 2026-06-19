'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const QUOTES = [
  {
    body:
      "I drove three and a half hours from Atlanta because of one Instagram photo. I'm doing it again next month.",
    author: 'Madison K.',
    meta: 'Lived-in copper · 2nd visit',
  },
  {
    body:
      'They sat with me for forty minutes before mixing a single bowl. I have never had a colorist ask me about the light in my bathroom before.',
    author: 'Rachel B.',
    meta: 'Color correction · Highlights',
  },
  {
    body:
      "My hair has never been this soft after a foil. I keep touching it like it isn't mine.",
    author: 'Sara D.',
    meta: 'Signature color · Repeat',
  },
];

export default function TestimonialsSlice() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-quote]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
        }
      );
    }, el);

    const id = setInterval(() => setActive((a) => (a + 1) % QUOTES.length), 6000);
    return () => { clearInterval(id); ctx.revert(); };
  }, []);

  const q = QUOTES[active];

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-32 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.08)_0%,transparent_60%)]" aria-hidden />
      <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-12">
        <p className="eyebrow eyebrow-copper">06 · In their words</p>

        <div data-quote className="mt-12">
          <svg viewBox="0 0 60 60" className="mx-auto h-12 w-12 text-copper-300/60" fill="currentColor" aria-hidden>
            <path d="M14 36c0-8 6-14 14-14v6c-5 0-8 3-8 8h8v14H14V36Zm26 0c0-8 6-14 14-14v6c-5 0-8 3-8 8h8v14H40V36Z" />
          </svg>

          <blockquote
            key={active}
            className="mt-10 font-display text-3xl text-bone/90 leading-tight lg:text-5xl"
            style={{ animation: 'fadeUp 0.9s ease-out forwards' }}
          >
            “{q.body}”
          </blockquote>
          <p className="mt-10 eyebrow eyebrow-copper">{q.author}</p>
          <p className="mt-2 text-xs text-bone/55">{q.meta}</p>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === active ? 'w-10 bg-copper-300' : 'w-4 bg-bone/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
