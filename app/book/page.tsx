'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import PageHeader from '@/components/PageHeader';
import { heroImages, ambientImages } from '@/lib/images';
import { site } from '@/lib/site';

const SERVICES = ['Signature Color', 'Dimensional Highlights', 'Lived-In Blonde', 'Copper Specialty', 'Color Correction', 'Precision Cut', 'Bridal Styling', 'Treatment'];
const STYLISTS = ['No preference', 'Margaux Hartwell', 'Theo Bellamy', 'June Okafor', 'Sloane Reyes', 'Iris Calloway', 'Wren Mathison'];
const SLOTS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

export default function BookPage() {
  const root = useRef<HTMLElement>(null);
  const [service, setService] = useState(SERVICES[0]);
  const [stylist, setStylist] = useState(STYLISTS[0]);
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState(SLOTS[1]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-field]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-form]', start: 'top 80%' },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return { label: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), key: i };
  });

  return (
    <main ref={root}>
      <PageHeader
        number="09"
        eyebrow="Reserve"
        title="Book"
        italic="online."
        intro="Pick a service, a stylist, and a window. We'll confirm by email within a few hours and send you a soft reminder the day before."
        image={heroImages.main}
        imageAlt="Booking header"
      />

      <section className="relative bg-ink py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-12">
          {submitted ? (
            <div data-form className="rounded-sm border border-copper-500/40 bg-charcoal p-10 lg:p-16">
              <p className="eyebrow eyebrow-copper">Received</p>
              <h2 className="mt-6 font-display text-5xl text-bone lg:text-7xl">
                We'll be <span className="font-italic text-copper-300">in touch.</span>
              </h2>
              <p className="mt-8 max-w-md text-sm text-bone/70">
                A confirmation is on its way to your inbox. If we don't have a window for the time you picked, we'll suggest the closest one.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-copper-500/60 px-6 py-3 text-[11px] uppercase tracking-widest text-bone hover:border-copper-300 transition-colors cursor-pointer"
              >
                Book another →
              </button>
            </div>
          ) : (
            <form
              data-form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-12"
            >
              <div data-field>
                <p className="eyebrow eyebrow-copper">01 · Service</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                        service === s
                          ? 'border-copper-300 bg-copper-500/15 text-copper-300'
                          : 'border-copper-900/50 text-bone/65 hover:border-copper-500/60 hover:text-bone'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div data-field>
                <p className="eyebrow eyebrow-copper">02 · Stylist</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {STYLISTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStylist(s)}
                      className={`rounded-sm border px-4 py-3 text-left text-sm transition-all duration-300 cursor-pointer ${
                        stylist === s
                          ? 'border-copper-300 bg-copper-500/10 text-bone'
                          : 'border-copper-900/50 text-bone/65 hover:border-copper-500/60'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div data-field>
                <p className="eyebrow eyebrow-copper">03 · Day</p>
                <div className="mt-4 grid grid-cols-7 gap-2">
                  {days.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDay(d.key)}
                      className={`flex flex-col items-center gap-1 rounded-sm border py-3 transition-all duration-300 cursor-pointer ${
                        day === d.key
                          ? 'border-copper-300 bg-copper-500/15 text-copper-300'
                          : 'border-copper-900/50 text-bone/65 hover:border-copper-500/60 hover:text-bone'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-widest">{d.label}</span>
                      <span className="font-display text-2xl">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div data-field>
                <p className="eyebrow eyebrow-copper">04 · Time</p>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSlot(t)}
                      className={`rounded-sm border py-3 text-sm transition-all duration-300 cursor-pointer ${
                        slot === t
                          ? 'border-copper-300 bg-copper-500/15 text-copper-300'
                          : 'border-copper-900/50 text-bone/65 hover:border-copper-500/60 hover:text-bone'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div data-field className="space-y-4 border-t border-copper-900/40 pt-10">
                <p className="eyebrow eyebrow-copper">05 · You</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow">Name</span>
                    <input
                      required
                      type="text"
                      className="mt-2 w-full rounded-sm border border-copper-900/50 bg-transparent px-4 py-3 text-bone outline-none transition-colors duration-300 focus:border-copper-300"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Email</span>
                    <input
                      required
                      type="email"
                      className="mt-2 w-full rounded-sm border border-copper-900/50 bg-transparent px-4 py-3 text-bone outline-none transition-colors duration-300 focus:border-copper-300"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="eyebrow">Phone (optional)</span>
                    <input
                      type="tel"
                      className="mt-2 w-full rounded-sm border border-copper-900/50 bg-transparent px-4 py-3 text-bone outline-none transition-colors duration-300 focus:border-copper-300"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="eyebrow">Anything we should know?</span>
                    <textarea
                      rows={3}
                      placeholder="Box dye in the last six months, sensitivities, inspiration photos…"
                      className="mt-2 w-full rounded-sm border border-copper-900/50 bg-transparent px-4 py-3 text-bone outline-none transition-colors duration-300 focus:border-copper-300"
                    />
                  </label>
                </div>
              </div>

              <button
                data-field
                type="submit"
                className="group inline-flex items-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-[11px] uppercase tracking-widest text-ink transition-all duration-500 hover:bg-copper-300 cursor-pointer"
              >
                Send Reservation
                <svg width="14" height="10" viewBox="0 0 14 10" className="transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </button>
            </form>
          )}

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-sm border border-copper-900/40 p-6">
              <p className="eyebrow eyebrow-copper">Your reservation</p>
              <ul className="mt-5 divide-y divide-copper-900/30 text-sm">
                <li className="flex items-baseline justify-between py-3"><span className="eyebrow">Service</span><span className="text-bone">{service}</span></li>
                <li className="flex items-baseline justify-between py-3"><span className="eyebrow">Stylist</span><span className="text-bone">{stylist}</span></li>
                <li className="flex items-baseline justify-between py-3"><span className="eyebrow">Day</span><span className="text-bone">{days[day].label} {days[day].date}</span></li>
                <li className="flex items-baseline justify-between py-3"><span className="eyebrow">Time</span><span className="text-bone">{slot}</span></li>
              </ul>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image src={ambientImages.pour} alt="Studio detail" fill sizes="40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="eyebrow eyebrow-copper">A note</p>
                <p className="mt-2 font-display text-2xl text-bone leading-tight">A holding deposit may be required for color services over three hours.</p>
              </div>
            </div>

            <div className="rounded-sm border border-copper-900/40 p-6 text-sm text-bone/70">
              <p className="eyebrow eyebrow-copper">Prefer to call?</p>
              <p className="mt-3">{site.phone}</p>
              <p className="mt-1">Tuesdays — Saturdays, business hours.</p>
              <Link href="/info" className="link-underline mt-4 inline-block text-xs uppercase tracking-widest text-copper-300">Salon details →</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
