import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ServiciosHighlight from "@/components/home/ServiciosHighlight";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import { featuredProducts } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <ServiciosHighlight />
      <WhatsAppCTA />
    </>
  );
}
