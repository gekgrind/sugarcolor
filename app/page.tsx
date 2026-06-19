import Hero from '@/components/home/Hero';
import Manifesto from '@/components/home/Manifesto';
import MethodRibbon from '@/components/home/MethodRibbon';
import Specialty from '@/components/home/Specialty';
import ServicesPreview from '@/components/home/ServicesPreview';
import GalleryStrip from '@/components/home/GalleryStrip';
import TestimonialsSlice from '@/components/home/TestimonialsSlice';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <MethodRibbon />
      <Specialty />
      <ServicesPreview />
      <GalleryStrip />
      <TestimonialsSlice />
      <FinalCTA />
    </>
  );
}
