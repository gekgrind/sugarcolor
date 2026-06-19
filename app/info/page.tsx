'use client';

import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import Reveal from '@/components/Reveal';
import { site } from '@/lib/site';
import { ambientImages, heroImages } from '@/lib/images';

const FAQ = [
  { q: 'Do you take walk-ins?', a: 'We do not. We work exclusively by appointment so we can give each guest the time the work takes.' },
  { q: 'What if I am late?', a: 'A ten minute window is no problem. Beyond fifteen, we may need to rebook so we don’t shorten the guest after you.' },
  { q: 'Are children welcome?', a: 'Yes, with a parent in the chair. We don’t do cuts under age 8.' },
  { q: 'Is parking easy?', a: 'There’s a city lot one block south on Wayne Street, free after 5 and on Saturdays. Street parking is two-hour metered.' },
  { q: 'Accessibility?', a: 'Single step at the front door — we have a portable ramp. Restroom is wheelchair-accessible. Please let us know in advance so we can pull our most accessible chair.' },
];

export default function InfoPage() {
  return (
    <main>
      <PageHeader
        number="08"
        eyebrow="The Salon"
        title="Come"
        italic="visit."
        intro="A small studio in downtown Milledgeville. Cedar walls, copper sconces, the smell of espresso from the bakery next door."
        image={ambientImages.studio}
        imageAlt="Salon interior"
      />

      <section className="relative bg-ink py-32 lg:py-44">
        <div className="mx-auto grid max-w-[1500px] gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-12">
          <div className="space-y-12">
            <Reveal>
              <p className="eyebrow eyebrow-copper">Where</p>
              <p className="mt-4 font-display text-4xl text-bone leading-tight lg:text-5xl">
                {site.address.split(',').slice(0, 1).join('')}
              </p>
              <p className="mt-2 text-bone/65">{site.address.split(',').slice(1).join(',').trim()}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="link-underline text-copper-300">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="link-underline text-copper-300">{site.email}</a>
              </div>
            </Reveal>

            <Reveal>
              <p className="eyebrow eyebrow-copper">When</p>
              <ul className="mt-4 divide-y divide-copper-900/30 border-y border-copper-900/30">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex items-baseline justify-between py-4">
                    <span className="font-display text-xl text-bone">{h.day}</span>
                    <span className="text-sm text-bone/65">{h.time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <p className="eyebrow eyebrow-copper">Frequently asked</p>
              <div className="mt-4 space-y-4">
                {FAQ.map((f) => (
                  <details key={f.q} className="group rounded-sm border border-copper-900/40 p-5 transition-colors duration-300 hover:border-copper-500/70 cursor-pointer">
                    <summary className="flex items-center justify-between gap-4 font-display text-xl text-bone marker:hidden cursor-pointer">
                      <span>{f.q}</span>
                      <span className="text-copper-300 transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-bone/70 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image src={ambientImages.studio} alt="Studio interior" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>

            <div className="relative aspect-video overflow-hidden rounded-sm border border-copper-900/40 bg-charcoal p-1">
              <div
                className="h-full w-full rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(8,9,11,0.55), rgba(8,9,11,0.7)), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><defs><pattern id='g' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'><path d='M40 0H0v40' fill='none' stroke='%23b87333' stroke-opacity='0.25' stroke-width='0.5'/></pattern></defs><rect width='100%' height='100%' fill='%23101116'/><rect width='100%' height='100%' fill='url(%23g)'/><circle cx='300' cy='200' r='8' fill='%23e9a86a'/><circle cx='300' cy='200' r='18' fill='none' stroke='%23e9a86a' stroke-opacity='0.5'/><circle cx='300' cy='200' r='32' fill='none' stroke='%23e9a86a' stroke-opacity='0.2'/></svg>\")",
                }}
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-bone/60">
                <span>Downtown Milledgeville</span>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-copper-300 link-underline">Open in maps →</a>
              </div>
            </div>

            <Reveal as="div" className="rounded-sm border border-copper-900/40 p-6">
              <p className="eyebrow eyebrow-copper">A little context</p>
              <p className="mt-4 text-sm text-bone/70 leading-relaxed">
                We share a block with a bakery, a vinyl shop, and a small bookstore. The bakery saves us a loaf on Saturdays. Bring a book.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <BookCTA />
    </main>
  );
}
