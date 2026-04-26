import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PlatformsSection from "@/components/home/PlatformsSection";
import ServiciosHighlight from "@/components/home/ServiciosHighlight";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <PlatformsSection />
      <ServiciosHighlight />
      <CtaSection />
    </>
  );
}
