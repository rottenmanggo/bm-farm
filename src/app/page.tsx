import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import BenefitsSection from '@/components/BenefitsSection';
import GallerySection from '@/components/GallerySection';
import LocationCtaSection from '@/components/LocationCtaSection';
import ChatbotWidget from '@/components/ChatbotWidget';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <GallerySection />
        <LocationCtaSection />
      </div>
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
