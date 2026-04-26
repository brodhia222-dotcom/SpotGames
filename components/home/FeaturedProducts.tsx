"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FEATURED_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

void ScrollTrigger;

export default function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const featured = FEATURED_PRODUCTS.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".featured-card", {
        opacity: 0,
        y: 80,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-grid",
          start: "top 80%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="font-tech text-xs text-grape uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="block w-8 h-px bg-grape" />
              [ 01 ] DESTACADOS
            </div>
            <h2
              className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              <span className="text-white">LOS MÁS </span>
              <span className="neon-text-grape">BUSCADOS</span>
            </h2>
          </div>
          <Link
            href="/productos"
            className="font-tech text-xs uppercase tracking-widest text-grape hover:text-grape-glow flex items-center gap-2 group"
          >
            VER TODOS{" "}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="featured-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {featured.map((p) => (
            <div key={p.id} className="featured-card">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
