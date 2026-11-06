import { AboutSection } from '@/components/AboutSection';
import { BookingContact } from '@/components/BookingContact';
import { CoolingSystem } from '@/components/CoolingSystem';
import { Gallery } from '@/components/Gallery';
import { HeroSection } from '@/components/HeroSection';
import { MobileActionBar } from '@/components/MobileActionBar';
import { MotionProvider } from '@/components/motion/Reveal';
import { Navbar } from '@/components/Navbar';
import { ServicesSection } from '@/components/ServicesSection';
import { SiteFooter } from '@/components/SiteFooter';
import { WhyChooseUs } from '@/components/WhyChooseUs';

export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#services"
        className="sr-only z-[70] bg-[#123D4A] px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <CoolingSystem />
        <AboutSection />
        <WhyChooseUs />
        <Gallery />
        <BookingContact />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </MotionProvider>
  );
}
