import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PlatformasSection from "@/components/home/PlatformasSection";
import ServiciosHighlight from "@/components/home/ServiciosHighlight";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import { featuredProducts } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts products={featuredProducts} />
      <PlatformasSection />
      <ServiciosHighlight />
      <WhatsAppCTA />
    </>
  );
}
