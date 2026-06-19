'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ambientImages, heroImages } from '@/lib/images';

export default function Specialty() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-spec-img]',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 70%' },
        }
      );
      gsap.fromTo('[data-spec-img] img', { scale: 1.25 }, {
        scale: 1.05,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      });

      gsap.to('[data-belt]', {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: 'none',
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const beltWords = ['Dimensional Color', '·', 'Lived-In Blonde', '·', 'Copper Specialty', '·', 'Color Correction', '·', 'Gloss & Tone', '·'];

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-32 lg:py-44">
      <div className="overflow-hidden border-y border-copper-900/30 py-8">
        <div data-belt className="belt font-display text-5xl text-bone/40 lg:text-7xl">
          {[...beltWords, ...beltWords, ...beltWords].map((w, i) => (
            <span key={i} className={i % 2 === 0 ? 'text-copper-300/60' : ''}>{w}</span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 grid w-full max-w-[1500px] gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-12">
        <div className="relative">
          <div data-spec-img className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image src={heroImages.side} alt="Copper specialty work" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-10 -right-6 hidden h-44 w-36 overflow-hidden rounded-sm border border-copper-500/50 lg:block">
            <div data-spec-img className="absolute inset-0">
              <Image src={ambientImages.texture} alt="Texture" fill className="object-cover" sizes="200px" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:pl-8">
          <p className="eyebrow eyebrow-copper">03 · Our Specialty</p>
          <h2 className="mt-5 headline-xl text-5xl text-bone lg:text-7xl">
            Copper. <span className="font-italic text-copper-300">It's in the name.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm text-bone/70 leading-relaxed">
            SugarColor was started by two colorists who got tired of explaining why a real copper takes four hours and three glosses.
            We built the studio around the formulas, the foiling pattern, and the slow heat work that makes warmth read like jewelry instead of brass.
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-bone/75">
            {['Custom-blended pigment library, refreshed monthly', 'Dual-light booth for tone calibration', 'Bond-protected lift on every formula'].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-2 inline-block h-px w-5 bg-copper-400" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/specialty"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-copper-500/60 px-6 py-3 text-[11px] uppercase tracking-widest text-bone hover:border-copper-300 hover:bg-copper-500/10 transition-colors cursor-pointer"
          >
            See the specialty book →
          </Link>
        </div>
      </div>
    </section>
  );
}
