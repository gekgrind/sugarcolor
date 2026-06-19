'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import { heroImages, ambientImages, galleryImages } from '@/lib/images';

const STEPS = [
  { n: 'I', title: 'The reading', image: ambientImages.studio, body: 'Twenty minutes by the window. We look at your hair in daylight before any decision gets made. We ask about your bathroom light, your shower, how often you wash, what makes you tilt your head in the mirror and squint.' },
  { n: 'II', title: 'The plan', image: ambientImages.pour, body: 'We sketch a formula on paper. You see the swatches before you see the bowl. If we are going to need more than one visit to get there, you hear that now — not at the end of the chair.' },
  { n: 'III', title: 'The work', image: heroImages.detail, body: 'Color goes first, always. The architecture decides the cut. Foils are placed slowly. Saturation is checked under a dual-light booth so we read warmth correctly before we tone.' },
  { n: 'IV', title: 'The repair', image: ambientImages.texture, body: 'Every service ends with a bond-protected treatment chosen for what your hair did that day. Not a default. Sometimes K18, sometimes our own house tonic, sometimes nothing more than a slow cool rinse.' },
  { n: 'V', title: 'The send-off', image: galleryImages[3], body: 'You leave with a small bottle of your gloss formula, a written home protocol, and a rebook reminder. We keep your formula on file for a year.' },
];

export default function MethodPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const steps = el.querySelectorAll('[data-step]');
      steps.forEach((step) => {
        gsap.fromTo(
          step.querySelectorAll('[data-anim]'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 75%' },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHeader
        number="02"
        eyebrow="Our Method"
        title="Five quiet"
        italic="acts."
        intro="Most salons run the same playbook in a different order. Ours has been the same five steps for nine years. Here is what to expect, from the first email to the last cool rinse."
        image={heroImages.side}
        imageAlt="Method header"
      />

      <section ref={root} className="relative bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          {STEPS.map((s, i) => (
            <article
              key={s.n}
              data-step
              className={`grid items-center gap-10 border-b border-copper-900/30 py-20 lg:gap-20 lg:py-32 ${
                i % 2 === 0 ? 'lg:grid-cols-[1fr_1.1fr]' : 'lg:grid-cols-[1.1fr_1fr] lg:[&>:first-child]:order-2'
              }`}
            >
              <div data-anim className={`relative aspect-[4/5] overflow-hidden rounded-sm ${i % 2 ? 'lg:order-1' : ''}`}>
                <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
                <span className="absolute left-6 top-6 font-display text-[8rem] leading-none text-bone/15">{s.n}</span>
              </div>

              <div className={`${i % 2 ? 'lg:order-2' : ''}`}>
                <p data-anim className="eyebrow eyebrow-copper">Act {s.n}</p>
                <h2 data-anim className="mt-5 font-display text-5xl text-bone lg:text-7xl">
                  {s.title}
                </h2>
                <p data-anim className="mt-8 max-w-md text-base text-bone/70 leading-relaxed">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BookCTA />
    </>
  );
}
