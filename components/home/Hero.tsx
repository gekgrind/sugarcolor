'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { heroImages } from '@/lib/images';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const bg = el.querySelector('[data-hero-bg]');
      const fg = el.querySelector('[data-hero-fg]');
      const title = el.querySelectorAll('[data-hero-word]');
      const meta = el.querySelectorAll('[data-hero-meta]');

      // Intro
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('[data-hero-bg]', { scale: 1.18, opacity: 0 }, { scale: 1.05, opacity: 1, duration: 2.2 })
        .fromTo(title, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.08 }, '-=1.7')
        .fromTo(meta, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, '-=0.9');

      // Parallax bg
      gsap.to(bg, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to(fg, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to('[data-hero-fade]', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const words = ['Hair', 'with', 'a', 'pulse.'];

  return (
    <section ref={root} className="relative h-[100svh] min-h-[700px] w-full overflow-hidden">
      <div data-hero-bg className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src={heroImages.main}
          alt="Editorial portrait, copper-toned hair, low light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/30" />
      </div>

      <div data-hero-fg className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col justify-end px-6 pb-20 lg:px-12 lg:pb-32">
        <div className="flex items-end justify-between gap-10 flex-wrap">
          <div className="max-w-3xl">
            <p data-hero-meta className="eyebrow eyebrow-copper">
              <span className="inline-block h-px w-10 align-middle bg-copper-400 mr-3" />
              SugarColor · Est. Milledgeville
            </p>
            <h1 className="mt-6 headline-xl text-[15vw] text-bone lg:text-[10vw]">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.18em] last:pr-0">
                  <span
                    data-hero-word
                    className={`inline-block will-change-transform ${w === 'pulse.' ? 'font-italic text-copper-300' : ''}`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h1>

            <p data-hero-meta className="mt-8 max-w-md text-sm text-bone/75 leading-relaxed">
              A color-forward studio for the considered client. We work slow, we read the light, and we leave hair softer than we found it.
            </p>

            <div data-hero-meta className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 rounded-full bg-copper-500 px-7 py-3.5 text-[11px] uppercase tracking-widest text-ink transition-all duration-500 hover:bg-copper-300 cursor-pointer"
              >
                Book Online
                <svg width="14" height="10" viewBox="0 0 14 10" className="transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="link-underline inline-flex min-h-[44px] items-center gap-3 px-2 text-[11px] uppercase tracking-widest text-bone/80 hover:text-bone"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div data-hero-meta className="hidden lg:flex items-center gap-6 text-xs text-bone/55">
            <div className="text-right">
              <p className="eyebrow">Scroll</p>
              <p className="mt-2 text-bone/80">begin the story</p>
            </div>
            <span className="block h-16 w-px overflow-hidden bg-bone/15 relative">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-copper-400 animate-shimmer" />
            </span>
          </div>
        </div>
      </div>

      <div data-hero-fade className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-widest text-bone/40 lg:block">
        Milledgeville · GA · 31061
      </div>
    </section>
  );
}
