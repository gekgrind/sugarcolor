import type { Metadata } from 'next';
import { Fraunces, Inter, Italiana } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GrainOverlay from '@/components/GrainOverlay';
import CursorGlow from '@/components/CursorGlow';
import ScissorCursor from '@/components/ScissorCursor';
import SmoothScroll from '@/components/SmoothScroll';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SugarColor Salon · Milledgeville, GA',
  description:
    'A color-forward studio in Milledgeville, Georgia. Lived-in color, precision cutting, restorative care.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08090b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${italiana.variable}`}>
      <body className="bg-ink text-bone">
        <SmoothScroll />
        <CursorGlow />
        <ScissorCursor />
        <GrainOverlay />
        <Navigation />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
