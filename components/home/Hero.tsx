"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      // Entry timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 60, duration: 0.9 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.12, duration: 0.6 }, "-=0.4")
        .from(".hero-stats", { opacity: 0, y: 20, stagger: 0.08, duration: 0.5 }, "-=0.3");

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, {
              yPercent: self.progress * -20,
            });
          }
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        {/* Deep gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(168,85,247,0.18) 0%, rgba(124,58,237,0.08) 40%, #05030A 70%)",
          }}
        />
        {/* Secondary glow — green accent, low */}
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[300px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Grid lines overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 border border-grape/40 bg-grape/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-ctrl" style={{ animation: "neon-pulse 2s infinite" }} />
          <span className="font-display font-semibold text-xs uppercase tracking-widest text-grape">
            Buenos Aires · Nuevos · Usados · Retro
          </span>
        </div>

        {/* Headline — max 2 lines with glitch */}
        <h1 className="hero-title font-display font-bold text-white uppercase leading-none tracking-tight w-full max-w-5xl"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          <span
            className="glitch text-glow-grape"
            data-text="TU PRÓXIMA"
            style={{ display: "block" }}
          >
            TU PRÓXIMA
          </span>
          <span
            className="glitch"
            data-text="PARTIDA EMPIEZA"
            style={{ display: "block", color: "#A855F7", marginTop: "0.1em" }}
          >
            PARTIDA{" "}
          </span>
          <span
            className="text-white"
            style={{ display: "block" }}
          >
            EMPIEZA ACÁ.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub font-body text-muted text-base md:text-lg max-w-xl mt-8 leading-relaxed">
          Juegos nuevos y usados, consolas, accesorios y retro. El mejor precio,
          el mejor stock, en un solo lugar.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Link
            href="/productos"
            className="hero-cta inline-flex items-center gap-3 px-8 py-4 bg-grape text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-grape-d transition-all duration-300 neon-border"
          >
            Ver catálogo
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <a
            href="https://wa.me/541157649264"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-ctrl text-ctrl font-display font-bold text-sm uppercase tracking-widest hover:bg-ctrl/10 transition-all duration-300 ctrl-border"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WA
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-10 border-t border-border/50 w-full max-w-2xl">
          {[
            { value: "+500", label: "Clientes" },
            { value: "+1.000", label: "Títulos" },
            { value: "5", label: "Años de experiencia" },
            { value: "30d", label: "Garantía usados" },
          ].map((s) => (
            <div key={s.label} className="hero-stats text-center">
              <p className="font-tech font-bold text-2xl text-grape">{s.value}</p>
              <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-display text-xs uppercase tracking-widest text-muted">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-grape to-transparent" />
      </div>
    </section>
  );
}
