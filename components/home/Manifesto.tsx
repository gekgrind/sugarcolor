'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { heroImages, ambientImages } from '@/lib/images';
import SplitHeadline from '@/components/SplitHeadline';

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink py-32 lg:py-48">
      <div className="mx-auto grid w-full max-w-[1500px] gap-16 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:px-12">
        <div className="space-y-10 lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow eyebrow-copper">
            <span className="inline-block h-px w-10 align-middle bg-copper-400 mr-3" /> 01 · Manifesto
          </p>

          <SplitHeadline
            className="headline-xl text-5xl text-bone lg:text-7xl"
            italicWords={['softly,', 'loud.']}
          >
            {"We color softly, we cut loud."}
          </SplitHeadline>

          <p className="max-w-md text-sm text-bone/70 leading-relaxed">
            Eight chairs. Three colorists. One stylist with twenty years and a habit of catching things in the mirror others miss.
            We're a small studio in downtown Milledgeville, working only by appointment so we can give you the time the work asks for.
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-6 pt-6 border-t border-copper-900/30">
            {[
              { stat: '12yr', label: 'avg. stylist tenure' },
              { stat: '3:1', label: 'guest to chair ratio' },
              { stat: '6h', label: 'longest single sit' },
              { stat: '1m', label: 'avg. consult time' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl text-copper-300">{s.stat}</p>
                <p className="mt-1 eyebrow">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-sm">
            <div data-parallax className="absolute inset-0 scale-110">
              <Image src={ambientImages.studio} alt="Studio interior, warm light" fill className="object-cover" sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <div data-parallax className="absolute inset-0 scale-110">
              <Image src={ambientImages.pour} alt="Color pour" fill className="object-cover" sizes="30vw" />
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm mt-12">
            <div data-parallax className="absolute inset-0 scale-110">
              <Image src={heroImages.detail} alt="Hair detail" fill className="object-cover" sizes="30vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
