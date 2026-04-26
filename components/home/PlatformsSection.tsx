"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PLATFORMS = [
  {
    id: "PS5",
    label: "PlayStation 5",
    color: "#003791",
    glowColor: "rgba(0, 55, 145, 0.5)",
    description: "Los exclusivos más ambiciosos de la generación. God of War, Spider-Man, Horizon y más.",
    count: "12 productos",
    icon: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-auto max-w-[120px]">
        <text x="0" y="32" fontFamily="Arial" fontWeight="900" fontSize="38" fill="currentColor">PS5</text>
      </svg>
    ),
  },
  {
    id: "Xbox",
    label: "Xbox Series",
    color: "#107C10",
    glowColor: "rgba(16, 124, 16, 0.5)",
    description: "Game Pass, exclusivos y la mayor biblioteca de juegos retro-compatible. Series X y S.",
    count: "8 productos",
    icon: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-auto max-w-[140px]">
        <text x="0" y="32" fontFamily="Arial" fontWeight="900" fontSize="30" fill="currentColor">XBOX</text>
      </svg>
    ),
  },
  {
    id: "Switch",
    label: "Nintendo Switch",
    color: "#E60012",
    glowColor: "rgba(230, 0, 18, 0.5)",
    description: "La única consola que podés llevar a cualquier lado. Mario, Zelda, Pokémon y más.",
    count: "10 productos",
    icon: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-auto max-w-[160px]">
        <text x="0" y="32" fontFamily="Arial" fontWeight="900" fontSize="24" fill="currentColor">SWITCH</text>
      </svg>
    ),
  },
  {
    id: "PC",
    label: "PC Gaming",
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.5)",
    description: "Periféricos, monitores y juegos para la plataforma más poderosa del mundo.",
    count: "9 productos",
    icon: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-auto max-w-[80px]">
        <text x="0" y="32" fontFamily="Arial" fontWeight="900" fontSize="38" fill="currentColor">PC</text>
      </svg>
    ),
  },
  {
    id: "Retro",
    label: "Retro",
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.5)",
    description: "SNES, Mega Drive, N64, PS1, PS2 y más. Stock curado con garantía. Las joyas del pasado.",
    count: "6 productos",
    icon: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-auto max-w-[130px]">
        <text x="0" y="32" fontFamily="Arial" fontWeight="900" fontSize="28" fill="currentColor">RETRO</text>
      </svg>
    ),
  },
];

export default function PlatformsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const cards = trackRef.current.querySelectorAll<HTMLElement>(".platform-card");
    if (!cards.length) return;

    const totalWidth = trackRef.current.scrollWidth;
    const viewportWidth = sectionRef.current.clientWidth;
    const distanceToScroll = totalWidth - viewportWidth;

    if (distanceToScroll <= 0) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: -distanceToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2,
          end: () => `+=${distanceToScroll}`,
          invalidateOnRefresh: true,
        },
      });

      // Heading parallax while pinned
      gsap.from(".plat-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface py-32 overflow-hidden"
    >
      {/* Heading */}
      <div className="plat-heading max-w-7xl mx-auto px-6 mb-16">
        <p className="font-display font-semibold text-xs uppercase tracking-widest text-grape mb-3">
          Plataformas
        </p>
        <h2
          className="font-display font-bold text-white uppercase leading-none"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Todas las plataformas,
          <br />
          <span className="text-grape">un solo lugar.</span>
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div className="px-6">
        <div ref={trackRef} className="flex gap-6 w-max">
          {PLATFORMS.map((platform) => (
            <Link
              key={platform.id}
              href={`/productos?plataforma=${platform.id}`}
              className="platform-card group relative w-[340px] h-[440px] bg-void border border-border flex flex-col p-8 shrink-0 overflow-hidden transition-all duration-500 hover:border-transparent cursor-pointer"
              style={{
                boxShadow: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${platform.glowColor}, 0 0 80px ${platform.glowColor.replace("0.5", "0.2")}`;
                (e.currentTarget as HTMLElement).style.borderColor = platform.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              {/* BG glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, ${platform.glowColor} 0%, transparent 70%)`,
                }}
              />

              {/* Platform icon / wordmark */}
              <div
                className="relative z-10 mb-auto"
                style={{ color: platform.color }}
              >
                {platform.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <p className="font-display font-bold text-xs uppercase tracking-widest mb-2"
                  style={{ color: platform.color }}>
                  {platform.count}
                </p>
                <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">
                  {platform.label}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {platform.description}
                </p>
                <div className="mt-5 flex items-center gap-2 font-display font-semibold text-xs uppercase tracking-widest"
                  style={{ color: platform.color }}>
                  Ver productos
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: platform.color }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <p className="text-center mt-8 font-display text-xs uppercase tracking-widest text-muted/50">
        Scrolleá para explorar →
      </p>
    </section>
  );
}
