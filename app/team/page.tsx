'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import { heroImages, teamImages, ambientImages } from '@/lib/images';

const TEAM = [
  { name: 'Margaux Hartwell', role: 'Owner · Master Colorist', years: 19, focus: 'Copper specialty · Color correction', bio: 'Trained at Vidal Sassoon London. Opened SugarColor in 2019. Talks to your roots more than she talks to you, and that is on purpose.', image: teamImages[0] },
  { name: 'Theo Bellamy', role: 'Senior Stylist', years: 12, focus: 'Precision cutting · Curls', bio: 'Spent eight years cutting in Charleston before coming home. Will absolutely not blow-dry your hair straight if it grows curly.', image: teamImages[1] },
  { name: 'June Okafor', role: 'Colorist', years: 7, focus: 'Lived-in blonde · Babylights', bio: 'Quiet, fast, brilliant with foils. Studies pigment chemistry on her lunch break, which is a personality.', image: teamImages[2] },
  { name: 'Sloane Reyes', role: 'Colorist', years: 5, focus: 'Vivids · Editorial color', bio: 'Our resident risk-taker. Pulls inspiration from Renaissance portraits and 90s music videos in the same sentence.', image: teamImages[3] },
  { name: 'Iris Calloway', role: 'Stylist · Bridal Lead', years: 9, focus: 'Updos · Event styling', bio: 'Did 47 weddings last year. Has a hand for setting hair that holds for fifteen hours and still moves.', image: teamImages[4] },
  { name: 'Wren Mathison', role: 'Treatment Therapist', years: 4, focus: 'Scalp care · Restorative protocols', bio: 'Will give you the best scalp massage of your life and then tell you the science of why your hair feels different now.', image: teamImages[5] },
];

export default function TeamPage() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-member]',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-roster]', start: 'top 80%' },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const active_member = TEAM[active];

  return (
    <main ref={root}>
      <PageHeader
        number="05"
        eyebrow="The Team"
        title="Six pairs"
        italic="of hands."
        intro="Each chair is a person. We don't double-book. Pick the stylist whose work moves you, and book that human directly."
        image={heroImages.side}
        imageAlt="Team header"
      />

      <section className="relative bg-ink py-32 lg:py-44">
        <div className="mx-auto grid w-full max-w-[1500px] gap-16 px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-20 lg:px-12">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              {TEAM.map((m, i) => (
                <Image
                  key={m.name}
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={`object-cover transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                  priority={i === 0}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="eyebrow eyebrow-copper">{active_member.role}</p>
                <h3 className="mt-3 font-display text-5xl text-bone leading-none lg:text-7xl">{active_member.name}</h3>
                <p className="mt-6 max-w-md text-sm text-bone/75 leading-relaxed">{active_member.bio}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-sm border border-copper-900/40 p-4">
                <p className="eyebrow">Years in chair</p>
                <p className="mt-2 font-display text-3xl text-copper-300">{active_member.years}</p>
              </div>
              <div className="rounded-sm border border-copper-900/40 p-4">
                <p className="eyebrow">Specialty</p>
                <p className="mt-2 text-bone/80">{active_member.focus}</p>
              </div>
            </div>
          </div>

          <ul data-roster className="space-y-2">
            {TEAM.map((m, i) => (
              <li key={m.name}>
                <button
                  data-member
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-baseline justify-between gap-6 border-b border-copper-900/40 py-6 text-left transition-all duration-500 cursor-pointer ${
                    active === i ? 'pl-4 border-copper-500/70' : 'hover:pl-2 hover:border-copper-500/40'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-copper-300/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`font-display text-3xl transition-colors duration-500 lg:text-4xl ${active === i ? 'text-copper-300' : 'text-bone group-hover:text-copper-300'}`}>
                      {m.name}
                    </span>
                  </div>
                  <span className="hidden text-xs uppercase tracking-widest text-bone/55 sm:block">{m.role.split('·')[0].trim()}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookCTA title="Book directly with a stylist." subtitle="Choose your chair when you reserve." />
    </main>
  );
}
