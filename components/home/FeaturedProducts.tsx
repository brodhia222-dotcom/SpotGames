"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FEATURED_PRODUCTS } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

const STATE_COLORS: Record<string, string> = {
  Nuevo: "text-ctrl border-ctrl",
  Usado: "text-grape-glow border-grape-glow",
  Oferta: "text-danger border-danger",
};

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".feat-card", {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feat-grid",
          start: "top 80%",
        },
      });

      gsap.from(".feat-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="feat-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-display font-semibold text-xs uppercase tracking-widest text-grape mb-3">
              Destacados
            </p>
            <h2
              className="font-display font-bold text-white uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Los más buscados
            </h2>
          </div>
          <Link
            href="/productos"
            className="font-display font-semibold text-sm uppercase tracking-widest text-grape hover:text-grape-glow transition-colors duration-200 flex items-center gap-2"
          >
            Ver todos
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="feat-card group relative bg-surface flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-void">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-75"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-grape/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* State badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex px-2 py-0.5 border font-display font-bold text-xs uppercase tracking-widest bg-void/80 ${
                      STATE_COLORS[product.state] || "text-white border-border"
                    }`}
                  >
                    {product.state}
                  </span>
                </div>

                {/* Platform badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex px-2 py-0.5 bg-grape/90 text-white font-display font-bold text-xs uppercase tracking-widest">
                    {product.platform}
                  </span>
                </div>

                {/* Quick add — appears on hover */}
                <button
                  onClick={() => addItem(product)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 flex items-center gap-2 px-5 py-2.5 bg-grape text-white font-display font-bold text-xs uppercase tracking-widest whitespace-nowrap cursor-pointer"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  Agregar al carrito
                </button>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <Link href={`/productos/${product.slug}`}>
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-grape-glow transition-colors duration-300 leading-tight">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-body text-xs text-muted mt-2 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div>
                    {product.originalPrice && (
                      <p className="font-tech text-xs text-muted line-through">
                        ${product.originalPrice.toLocaleString("es-AR")}
                      </p>
                    )}
                    <p className="font-tech font-bold text-xl text-grape">
                      ${product.price.toLocaleString("es-AR")}
                    </p>
                  </div>
                  <Link
                    href={`/productos/${product.slug}`}
                    className="font-display font-semibold text-xs uppercase tracking-widest text-muted hover:text-white transition-colors duration-200"
                  >
                    Ver más →
                  </Link>
                </div>
              </div>

              {/* Bottom neon accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-grape opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
