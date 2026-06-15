import { useLenis } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { ProductsSection } from '@/sections/ProductsSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ResearchSection } from '@/sections/ResearchSection';
import { EducationSection } from '@/sections/EducationSection';
import { ContactSection } from '@/sections/ContactSection';
import { Toaster } from '@/components/ui/sonner';

function App() {
  useLenis();

  return (
    <div className="relative w-full">
      <Navigation />
      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProductsSection />
        <SkillsSection />
        <ResearchSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
