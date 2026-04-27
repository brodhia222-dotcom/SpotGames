import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PlatformsSection from "@/components/home/PlatformsSection";
import ServiciosHighlight from "@/components/home/ServiciosHighlight";
import AboutSection from "@/components/home/AboutSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <PlatformsSection />
      <ServiciosHighlight />
      <AboutSection />
      <CtaSection />
    </>
  );
}
