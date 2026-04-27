"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FEATURED_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

void ScrollTrigger;

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const [mainImgError, setMainImgError] = useState(false);
  const featured = FEATURED_PRODUCTS.slice(0, 5);
  const [main, ...rest] = featured;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".featured-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: ".featured-header", start: "top 85%", once: true } }
      );
      // Bento main card
      gsap.fromTo(
        ".featured-main",
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: ".featured-main", start: "top 85%", once: true } }
      );
      // Side cards stagger
      const cards = gsap.utils.toArray<HTMLElement>(".featured-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });
      // Parallax on main image
      if (mainImgRef.current) {
        gsap.to(mainImgRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: mainImgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!main) return null;

  return (
    <section ref={sectionRef} className="py-24 md:py-32" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
        {/* Header */}
        <div className="featured-header flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
              Selección de la semana
            </p>
            <h2
              className="font-bold leading-[1.05] tracking-[-0.035em]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", color: "var(--color-text)" }}
            >
              Destacados
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="flex items-center gap-1.5 text-[0.78rem] transition-colors"
            style={{ color: "var(--color-text-muted)", fontWeight: 450 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            Ver todo el catálogo
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "auto auto", gap: 16 }} className="hidden md:grid">
          {/* Main large card */}
          <Link
            href={`/catalogo/${main.slug}`}
            className="featured-main rounded-[10px] overflow-hidden flex flex-col transition-all duration-250"
            style={{ gridRow: "1 / 3", background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-hover)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(168,85,247,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Image */}
            <div
              ref={mainImgRef}
              className="relative overflow-hidden flex items-center justify-center"
              style={{ minHeight: 220, background: "var(--color-surface-2)" }}
            >
              {main.image && !mainImgError ? (
                <img
                  src={main.image}
                  alt={main.name}
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ minHeight: 220 }}
                  onError={() => setMainImgError(true)}
                />
              ) : (
                <img
                  src={`https://placehold.co/800x480/111115/A855F7/png?text=${encodeURIComponent(main.platform)}&font=raleway`}
                  alt={main.platform}
                  className="w-full object-cover"
                  style={{ minHeight: 220 }}
                />
              )}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 80%, rgba(168,85,247,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
            </div>
            {/* Body */}
            <div style={{ padding: "20px 22px 22px" }}>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className={`tag tag-${main.platform.toLowerCase().replace(" ", "")}`}>{main.platform}</span>
                <span className={`tag ${main.state === "Nuevo" ? "tag-new" : main.state === "Oferta" ? "tag-oferta" : "tag-used"}`}>{main.state}</span>
              </div>
              <p className="font-bold mb-2 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", letterSpacing: "-0.025em", color: "var(--color-text)" }}>{main.name}</p>
              <p className="text-[0.82rem] mb-4 leading-relaxed" style={{ color: "var(--color-text-dim)" }}>{main.description}</p>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", fontWeight: 600, color: "var(--color-text)" }}>
                  ARS&nbsp;{main.price.toLocaleString("es-AR")}
                </span>
                <span className="btn btn-primary btn-sm" style={{ pointerEvents: "none" }}>Ver producto</span>
              </div>
            </div>
          </Link>

          {/* Smaller cards */}
          {rest.slice(0, 4).map((product) => (
            <div key={product.id} className="featured-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile: simple grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {featured.map((product) => (
            <div key={product.id} className="featured-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
