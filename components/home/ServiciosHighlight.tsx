"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

void ScrollTrigger;

const SERVICES = [
  {
    id: "reparacion",
    name: "Reparación",
    desc: "Diagnóstico y reparación profesional de consolas. PS5, Xbox, Switch, portátiles retro. Garantía en cada trabajo.",
    color: "var(--color-purple)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    id: "flasheo",
    name: "Flasheo",
    desc: "Modificación de consolas para liberar todo su potencial. PS4, PS3, Wii, Nintendo DS y más. Servicio seguro y probado.",
    color: "var(--color-green)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: "tradein",
    name: "Trade-in",
    desc: "Cambiá tu consola o juegos usados por crédito para el próximo nivel. Valuación justa y en el momento.",
    color: "var(--color-text-dim)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
      </svg>
    ),
  },
];

export default function ServiciosHighlight() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".servicios-header", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".servicios-header", start: "top 85%", once: true },
      });
      const cards = gsap.utils.toArray<HTMLElement>(".servicio-card-new");
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power2.out", immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
    >
      {/* Header */}
      <div className="servicios-header flex flex-col md:flex-row md:items-end justify-between gap-4" style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem clamp(1.5rem, 4vw, 3rem) 0" }}>
        <div>
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
            Lo que hacemos
          </p>
          <h2
            className="font-bold leading-[1.05] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", color: "var(--color-text)" }}
          >
            Más allá de la venta
          </h2>
        </div>
        <Link
          href="/servicios"
          className="flex items-center gap-1.5 text-[0.78rem] transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          Ver todos los servicios
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>

      {/* 3-column grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 mt-8"
        style={{ maxWidth: "1200px", margin: "2rem auto 0", padding: "0 clamp(1.5rem, 4vw, 3rem)", borderTop: "1px solid var(--color-border)" }}
      >
        {SERVICES.map((svc, i) => (
          <Link
            key={svc.id}
            href={`/servicios#${svc.id}`}
            className="servicio-card-new flex flex-col gap-4 p-10 md:p-12 transition-colors"
            style={{
              borderRight: i < SERVICES.length - 1 ? "1px solid var(--color-border)" : "none",
              color: "var(--color-text)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              className="flex items-center justify-center rounded-[8px] transition-colors duration-200"
              style={{
                width: 40, height: 40,
                border: "1px solid var(--color-border)",
                color: "var(--color-text-dim)",
              }}
            >
              {svc.icon}
            </div>
            <div>
              <p
                className="font-bold mb-3 tracking-[-0.025em]"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-text)" }}
              >
                {svc.name}
              </p>
              <p className="text-[0.84rem] leading-relaxed" style={{ color: "var(--color-text-dim)" }}>
                {svc.desc}
              </p>
            </div>
            <span
              className="mt-auto flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] transition-all duration-200"
              style={{ color: svc.color, paddingTop: 12 }}
            >
              Ver servicio
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2.5 5.5h6M5.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
