'use client';

import Link from 'next/link';
import { nav, site } from '@/lib/site';

const socialPaths: Record<string, string> = {
  Instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
  TikTok: 'M16 3a6 6 0 0 0 5 4v3a9 9 0 0 1-5-1.5V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3Z',
  Pinterest: 'M12 2a10 10 0 0 0-3.7 19.3c-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.7c0-1.6 1-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.4-1 3.7-.3 1.1.6 2 1.7 2 2 0 3.5-2.1 3.5-5.2 0-2.7-2-4.6-4.7-4.6-3.2 0-5.1 2.4-5.1 4.9 0 1 .4 2 .9 2.6.1.1.1.2.1.3l-.3 1.3c0 .2-.2.2-.4.1-1.4-.6-2.2-2.7-2.2-4.3 0-3.5 2.6-6.8 7.4-6.8 3.9 0 6.9 2.8 6.9 6.5 0 3.9-2.4 7-5.8 7-1.1 0-2.2-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.4 3.1A10 10 0 1 0 12 2Z',
  Facebook: 'M13 22v-8h3l1-4h-4V7.5c0-1.1.3-2 2-2h2V2a26 26 0 0 0-3-.2c-3 0-5 2-5 5.5V10H6v4h3v8h4Z',
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-copper-900/30 bg-ink pt-24 pb-10">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[1200px] rounded-full bg-copper-500/10 blur-[140px]" aria-hidden />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <p className="eyebrow eyebrow-copper">{site.tagline}</p>
            <h3 className="mt-4 font-display text-5xl leading-[1] text-bone lg:text-7xl">
              Come sit <span className="font-italic text-copper-300">a while.</span>
            </h3>
            <p className="mt-6 max-w-md text-sm text-bone/70 leading-relaxed">
              A color-forward studio in downtown {site.city.split(',')[0]} — slow, considered work for hair you actually want to wear.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-widest text-copper-300 hover:text-bone transition-colors link-underline"
            >
              Reserve your seat
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-3 text-sm text-bone/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline hover:text-bone transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Visit</p>
            <address className="mt-4 not-italic text-sm text-bone/70 leading-relaxed">
              {site.address.split(',').map((line, i) => (
                <span key={i} className="block">{line.trim()}</span>
              ))}
            </address>
            <p className="mt-4 text-sm text-bone/70">
              <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="link-underline">{site.phone}</a>
            </p>
            <p className="text-sm text-bone/70">
              <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
            </p>
          </div>

          <div>
            <p className="eyebrow">Hours</p>
            <ul className="mt-4 space-y-2 text-sm text-bone/70">
              {site.hours.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span className="text-bone/90">{h.day}</span>
                  <span className="text-bone/55">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-copper-900/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-copper-900/60 text-bone/70 transition-all duration-500 hover:border-copper-300 hover:text-copper-300 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d={socialPaths[s.label]} />
                </svg>
              </a>
            ))}
            <span className="text-xs text-bone/50">{site.socials[0].handle}</span>
          </div>

          <p className="text-[11px] uppercase tracking-widest text-bone/40">
            © {new Date().getFullYear()} SugarColor Studio · Designed in Georgia
          </p>
        </div>
      </div>
    </footer>
  );
}
