"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const platforms = [
  {
    slug: "PS5",
    name: "PLAYSTATION 5",
    short: "PS5",
    count: 12,
    desc: "Los exclusivos más ambiciosos de la generación.",
    color: "#006FCD",
    img: "https://images.unsplash.com/photo-1709587797209-7f3015fc8d35?w=900&q=80&auto=format&fit=crop",
    span: "col-span-1 lg:col-span-2 lg:row-span-2",
  },
  {
    slug: "Xbox",
    name: "XBOX SERIES X|S",
    short: "XBOX",
    count: 8,
    desc: "Game Pass + la mayor biblioteca retro-compatible.",
    color: "#107C10",
    img: "https://images.unsplash.com/photo-1591109864300-46c417fa0475?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 lg:col-span-2",
  },
  {
    slug: "Switch",
    name: "NINTENDO SWITCH",
    short: "SWITCH",
    count: 10,
    desc: "Mario, Zelda, Pokémon — donde quieras.",
    color: "#E60012",
    img: "https://images.unsplash.com/photo-1550921464-1bbe1d247da5?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 lg:col-span-2",
  },
  {
    slug: "PC",
    name: "PC GAMING",
    short: "PC",
    count: 9,
    desc: "Periféricos y juegos para la plataforma más poderosa.",
    color: "#A855F7",
    img: "https://images.unsplash.com/photo-1591109864300-46c417fa0475?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 lg:col-span-2",
  },
  {
    slug: "Retro",
    name: "RETRO",
    short: "RETRO",
    count: 6,
    desc: "SNES · Mega Drive · N64 · PS1. Las joyas del pasado.",
    color: "#F59E0B",
    img: "https://images.unsplash.com/photo-1636070759654-5c93bbca2862?w=900&q=80&auto=format&fit=crop",
    span: "col-span-1 lg:col-span-2",
  },
];

void ScrollTrigger;

export default function PlatformsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".platform-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".platforms-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-8">
        {/* Header asimétrico */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="font-tech text-xs text-grape uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="block w-8 h-px bg-grape" />
              [ 02 ] PLATAFORMAS
            </div>
            <h2
              className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              <span className="text-white">TODAS LAS PLATAFORMAS,</span>
              <br />
              <span className="neon-text-grape">UN SOLO LUGAR.</span>
            </h2>
          </div>
          <div className="font-pixel text-[10px] text-muted hidden md:block">
            &gt; SELECT_PLATFORM_
            <span className="animate-blink">_</span>
          </div>
        </div>

        {/* Bento grid */}
        <div className="platforms-grid grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {platforms.map((p) => (
            <Link
              key={p.slug}
              href={`/productos?platform=${encodeURIComponent(p.slug)}`}
              className={`platform-card group relative overflow-hidden border border-border hover:border-transparent transition-all duration-500 ${p.span}`}
            >
              {/* Imagen de fondo */}
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Overlay color plataforma */}
              <div
                className="absolute inset-0 opacity-80 group-hover:opacity-50 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${p.color}40 0%, #05030A 100%)`,
                  mixBlendMode: "multiply",
                }}
              />

              {/* Glow border en hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 2px ${p.color}, 0 0 30px ${p.color}66`,
                }}
              />

              {/* HUD corners */}
              <div
                className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 transition-colors duration-500"
                style={{ borderColor: p.color }}
              />
              <div
                className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 transition-colors duration-500"
                style={{ borderColor: p.color }}
              />
              <div
                className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 transition-colors duration-500"
                style={{ borderColor: p.color }}
              />
              <div
                className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 transition-colors duration-500"
                style={{ borderColor: p.color }}
              />

              {/* Counter HUD */}
              <div
                className="absolute top-3 right-3 font-tech text-[10px] font-bold px-2 py-1 bg-void/80 backdrop-blur"
                style={{ color: p.color, border: `1px solid ${p.color}` }}
              >
                {String(p.count).padStart(2, "0")} ITEMS
              </div>

              {/* Contenido */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <div
                  className="font-tech text-[10px] uppercase tracking-[0.2em] mb-2 opacity-70"
                  style={{ color: p.color }}
                >
                  &gt; {p.short}
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-1 leading-tight">
                  {p.name}
                </h3>
                <p className="font-body text-xs md:text-sm text-muted line-clamp-1 mb-3">
                  {p.desc}
                </p>
                <div
                  className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ color: p.color }}
                >
                  ENTRAR <span className="text-base">→</span>
                </div>
                <div className="health-bar mt-3 opacity-60" />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-6 flex items-center justify-between font-pixel text-[8px] text-muted">
          <span>&gt; 5 PLATFORMS LOADED</span>
          <span className="text-ctrl animate-blink">● READY</span>
        </div>
      </div>
    </section>
  );
}
