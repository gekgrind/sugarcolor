'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const ROWS = [
  { name: 'Signature Color', from: '$185', notes: 'Full custom · 2.5 hrs' },
  { name: 'Dimensional Highlights', from: '$245', notes: 'Foil + balayage hybrid · 3 hrs' },
  { name: 'Copper Specialty', from: '$295', notes: 'Includes custom pigment build' },
  { name: 'Color Correction', from: 'Quote', notes: 'Consultation required' },
  { name: 'Precision Cut', from: '$95', notes: 'Wash, cut, dry · 1.25 hrs' },
  { name: 'Bridal & Event Styling', from: '$140', notes: 'In-studio or on location' },
  { name: 'Restorative Treatment', from: '$65', notes: 'K18 / Olaplex protocol' },
];

export default function ServicesPreview() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-row]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 75%' },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-charcoal py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="eyebrow eyebrow-copper">04 · Services</p>
            <h2 className="mt-5 headline-xl text-5xl text-bone lg:text-7xl">
              A short list,<br />
              <span className="font-italic text-copper-300">done well.</span>
            </h2>
          </div>
          <Link href="/services" className="link-underline text-xs uppercase tracking-widest text-copper-300">
            Full menu →
          </Link>
        </div>

        <div className="mt-20 divide-y divide-copper-900/40 border-y border-copper-900/40">
          {ROWS.map((r) => (
            <div
              key={r.name}
              data-row
              className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 transition-colors hover:bg-copper-500/5 cursor-pointer lg:grid-cols-[1.5fr_2fr_1fr] lg:gap-10 lg:py-8"
            >
              <h3 className="font-display text-2xl text-bone transition-colors group-hover:text-copper-300 lg:text-4xl">
                {r.name}
              </h3>
              <p className="hidden text-sm text-bone/60 lg:block">{r.notes}</p>
              <p className="text-right font-display text-xl text-copper-300 lg:text-2xl">
                from <span className="text-bone">{r.from}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
