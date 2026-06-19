'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import BookCTA from '@/components/BookCTA';
import Reveal from '@/components/Reveal';
import { heroImages, ambientImages, galleryImages } from '@/lib/images';

const CATEGORIES = [
  {
    key: 'color',
    label: 'Color',
    items: [
      { name: 'Signature Color', price: '$185+', time: '2.5 hrs', desc: 'Full custom color built from a hand-blended formula. Includes glossing pass and home protocol.' },
      { name: 'Dimensional Highlights', price: '$245+', time: '3 hrs', desc: 'Our hybrid foil-and-balayage pattern. Dimensional without the grow-out stripe.' },
      { name: 'Lived-In Blonde', price: '$265+', time: '3.5 hrs', desc: 'Built to grow out for six months. Hand-painted, root shadow, custom toner.' },
      { name: 'Copper Specialty', price: '$295+', time: '4 hrs', desc: 'Our signature service. Custom pigment, dual-light booth calibration, bond protocol included.' },
      { name: 'Color Correction', price: 'Quote', time: 'Consult required', desc: 'Box red, brassy lift, banded grow-out — bring the photos, we will plan the journey.' },
      { name: 'Gloss & Tone', price: '$75+', time: '45 min', desc: 'Refresh between visits. Stand-alone or add to a cut.' },
    ],
  },
  {
    key: 'cut',
    label: 'Cut & Style',
    items: [
      { name: 'Precision Cut', price: '$95+', time: '1.25 hrs', desc: 'Wash, cut, blowout. Built around how the hair actually falls.' },
      { name: 'Curl Cut', price: '$115+', time: '1.5 hrs', desc: 'Cut dry, curl by curl. For 2c and beyond.' },
      { name: 'Editorial Blowout', price: '$70+', time: '45 min', desc: 'Smooth, bouncy, photo-ready. Add a braid or set.' },
      { name: 'Bridal & Event Styling', price: '$140+', time: 'In studio or on location', desc: 'Includes a pre-event preview session.' },
    ],
  },
  {
    key: 'care',
    label: 'Restorative',
    items: [
      { name: 'K18 Power Treatment', price: '$65', time: '30 min', desc: 'Stand-alone bond therapy. Add to any service.' },
      { name: 'Olaplex Stand-Alone', price: '$55', time: '30 min', desc: 'A four-step in-chair version of the salon classic.' },
      { name: 'Scalp Detox', price: '$45', time: '30 min', desc: 'Clay mask, micro-mist, scalp massage. Honestly heavenly.' },
    ],
  },
  {
    key: 'extras',
    label: 'Extras',
    items: [
      { name: 'Toner Refresh (Take-Home)', price: '$32', time: '—', desc: 'A custom-mixed gloss bottle. We label it with your formula.' },
      { name: 'Color Consultation', price: 'Complimentary', time: '20 min', desc: 'Free for new guests considering a transformation.' },
    ],
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState('color');
  const category = CATEGORIES.find((c) => c.key === active)!;

  return (
    <>
      <PageHeader
        number="01"
        eyebrow="The Menu"
        title="A short list,"
        italic="done well."
        intro="No surprise tickets. Every price below is the floor — your stylist will quote the final number after the consult, never after the bowl."
        image={heroImages.main}
        imageAlt="Service header"
      />

      <section className="relative bg-ink py-28 lg:py-36">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-copper-900/40 pb-6">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    active === c.key
                      ? 'border-copper-300 bg-copper-500/15 text-copper-300'
                      : 'border-copper-900/50 text-bone/60 hover:border-copper-500/60 hover:text-bone'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="eyebrow">{category.items.length} services</p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <ul className="divide-y divide-copper-900/40">
              {category.items.map((item, i) => (
                <li key={item.name} className="group flex flex-col gap-3 py-7 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm text-copper-300/60">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-display text-3xl text-bone transition-colors duration-500 group-hover:text-copper-300 lg:text-4xl">{item.name}</h3>
                    </div>
                    <p className="mt-3 max-w-xl text-sm text-bone/65 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-6 lg:flex-col lg:items-end lg:gap-1">
                    <p className="font-display text-2xl text-copper-300">{item.price}</p>
                    <p className="text-xs text-bone/55">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image src={galleryImages[2]} alt="Service detail" fill className="object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="eyebrow eyebrow-copper">A note</p>
                  <p className="mt-2 font-display text-2xl text-bone leading-tight">
                    Every service includes a 20-minute consult, the bond-protected formula, and a take-home protocol.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-bone/65">
                <Reveal as="div" className="rounded-sm border border-copper-900/50 p-4">
                  <p className="eyebrow">Card</p>
                  <p className="mt-2">All major. No checks please.</p>
                </Reveal>
                <Reveal as="div" delay={0.1} className="rounded-sm border border-copper-900/50 p-4">
                  <p className="eyebrow">Cancel</p>
                  <p className="mt-2">48-hour window, no fee.</p>
                </Reveal>
                <Reveal as="div" delay={0.2} className="rounded-sm border border-copper-900/50 p-4">
                  <p className="eyebrow">Wifi</p>
                  <p className="mt-2">Yes. Password on the mirror.</p>
                </Reveal>
                <Reveal as="div" delay={0.3} className="rounded-sm border border-copper-900/50 p-4">
                  <p className="eyebrow">Tip</p>
                  <p className="mt-2">Cash or card, never expected.</p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
