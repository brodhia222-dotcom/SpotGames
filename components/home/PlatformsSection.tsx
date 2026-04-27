"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

void ScrollTrigger;

const PLATFORMS = [
  { slug: "PS5",    label: "PlayStation 5",    count: "47 productos",   color: "#006FCD" },
  { slug: "Xbox",   label: "Xbox Series",      count: "31 productos",   color: "#107C10" },
  { slug: "Switch", label: "Nintendo Switch",  count: "58 productos",   color: "#E60012" },
  { slug: "Retro",  label: "Retro",             count: "83 productos",   color: "#C49A6C" },
  { slug: "PC",     label: "PC & Periféricos", count: "22 productos",   color: "#4ADE80" },
];

export default function PlatformsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".platforms-header", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".platforms-header", start: "top 85%", once: true },
      });
      const cards = gsap.utils.toArray<HTMLElement>(".platform-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.07, ease: "power2.out", immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
        <div className="platforms-header mb-7">
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
            Por plataforma
          </p>
          <h2
            className="font-bold leading-[1.05] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", color: "var(--color-text)" }}
          >
            Encontrá tu mundo
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {PLATFORMS.map((p) => (
            <Link
              key={p.slug}
              href={`/catalogo?platform=${p.slug}`}
              className="platform-card rounded-[10px] p-5 flex flex-col gap-2.5 transition-all duration-220"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.background = "var(--color-surface-2)";
                e.currentTarget.style.borderColor = `${p.color}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "var(--color-surface)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: p.color, boxShadow: `0 0 8px ${p.color}aa` }}
              />
              <span
                className="font-bold text-[0.9rem] leading-tight tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {p.label}
              </span>
              <span
                className="text-[0.7rem]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}
              >
                {p.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
