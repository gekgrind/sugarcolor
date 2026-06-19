'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';

export default function BookCTA({ title = 'Reserve your chair.', subtitle = 'Books open Mondays at 9 a.m.' }: { title?: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.12)_0%,transparent_60%)]" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center lg:px-12">
        <Reveal>
          <h3 className="font-display text-5xl text-bone lg:text-7xl">
            {title.replace(/\.$/, '')}<span className="font-italic text-copper-300">.</span>
          </h3>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-sm text-bone/70">{subtitle}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <Link
            href="/book"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-[11px] uppercase tracking-widest text-ink hover:bg-copper-300 transition-colors cursor-pointer"
          >
            Book Online →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
