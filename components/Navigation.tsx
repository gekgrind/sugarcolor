'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
        scrolled ? 'py-3 backdrop-blur-md bg-ink/60 border-b border-copper-900/30' : 'py-6'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 lg:px-12">
        <Link href="/" className="group flex items-center gap-3" aria-label="SugarColor home">
          <span className="relative flex h-9 w-9 items-center justify-center">
            <svg viewBox="0 0 40 40" className="h-9 w-9">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#b87333" strokeWidth="0.6" />
              <text
                x="20" y="25"
                textAnchor="middle"
                fontFamily="var(--font-display), serif"
                fontSize="14"
                fill="#f5ece1"
                fontStyle="italic"
              >S</text>
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-bone">
              Sugar<span className="text-copper-300 font-italic">Color</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-muted mt-1">{site.city}</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-wider2 text-bone/80">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`link-underline transition-colors hover:text-bone ${
                pathname === item.href ? 'text-copper-300' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/book"
            className="group inline-flex items-center gap-3 rounded-full border border-copper-500/60 px-5 py-2.5 text-[11px] uppercase tracking-widest text-bone transition-all duration-500 hover:border-copper-300 hover:bg-copper-500/10 cursor-pointer"
          >
            Book Online
            <span className="block h-1 w-1 rounded-full bg-copper-300 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="lg:hidden relative h-11 w-11 cursor-pointer"
        >
          <span className={`absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-bone transition-all duration-500 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-bone transition-all duration-500 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 top-0 z-30 bg-ink/95 backdrop-blur-xl transition-all duration-700 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col justify-between px-8 pt-28 pb-12">
          <nav className="flex flex-col gap-6">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-4xl text-bone hover:text-copper-300 transition-colors"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full border border-copper-300 px-8 py-4 text-xs uppercase tracking-widest text-bone"
          >
            Book Online
          </Link>
        </div>
      </div>
    </header>
  );
}
