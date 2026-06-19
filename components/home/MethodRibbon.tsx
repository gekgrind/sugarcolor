'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const STEPS = [
  {
    n: 'I',
    title: 'Read the room',
    body:
      'We start in the daylight by the window, never under the chair lamp. We look at your skin, your roots, the way your hair falls when you tilt your head. The brief comes after.',
  },
  {
    n: 'II',
    title: 'Color, then cut',
    body:
      'Always in that order. Color decides the architecture; the cut is just how the architecture shows up. Most salons get this backwards.',
  },
  {
    n: 'III',
    title: 'Send you home soft',
    body:
      'Olaplex, K18, our own bonding tonic — whatever your hair was asking for that day. You leave with the cuticle smoother than you arrived.',
  },
];

export default function MethodRibbon() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('[data-step]');
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 75%' },
        }
      );

      // Sticky number sequence
      gsap.to('[data-rule]', {
        scaleX: 1,
        transformOrigin: 'left',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-charcoal py-32 lg:py-44">
      <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-copper-500/10 blur-[120px]" aria-hidden />

      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-xl">
            <p className="eyebrow eyebrow-copper">02 · Our Method</p>
            <h2 className="mt-5 headline-xl text-5xl text-bone lg:text-7xl">
              Three steps. <span className="font-italic text-copper-300">No theatrics.</span>
            </h2>
          </div>
          <Link href="/method" className="link-underline text-xs uppercase tracking-widest text-copper-300">
            Read the long version →
          </Link>
        </div>

        <div className="mt-20 relative">
          <span data-rule className="absolute -top-10 left-0 right-0 h-px bg-gradient-to-r from-copper-500/0 via-copper-500/80 to-copper-500/0 origin-left scale-x-0" />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
            {STEPS.map((s) => (
              <article
                key={s.n}
                data-step
                className="group relative pt-10 border-t border-copper-900/40 transition-colors duration-500 hover:border-copper-500/70"
              >
                <span className="font-display text-7xl text-copper-300/30 transition-colors duration-500 group-hover:text-copper-300">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-3xl text-bone lg:text-4xl">{s.title}</h3>
                <p className="mt-5 max-w-sm text-sm text-bone/65 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
