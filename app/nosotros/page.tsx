"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

void ScrollTrigger;

const STATS = [
  { value: 5,    suffix: "",   label: "Años en el mercado" },
  { value: 2000, suffix: "+",  label: "Títulos en catálogo" },
  { value: 100,  suffix: "%",  label: "Garantía reparaciones" },
];

const VALUES = [
  {
    title: "Honestidad",
    desc: "Precios justos, diagnósticos reales y sin letra chica. Si algo no tiene arreglo, te lo decimos.",
  },
  {
    title: "Pasión",
    desc: "Somos gamers antes que vendedores. Eso se nota en cada recomendación que hacemos.",
  },
  {
    title: "Comunidad",
    desc: "Cada cliente es parte de algo más grande. Construimos la comunidad gamer que queremos ser.",
  },
];

export default function NosotrosPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".nosotros-header", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".nosotros-header", start: "top 82%", once: true },
      });
      gsap.fromTo(".nosotros-text", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".nosotros-text", start: "top 82%", once: true },
      });
      gsap.fromTo(".nosotros-values", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".nosotros-values", start: "top 85%", once: true },
      });

      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate() {
            if (el) el.textContent = Math.round(obj.val).toLocaleString("es-AR") + stat.suffix;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen pb-20" style={{ paddingTop: "7rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
        {/* Header */}
        <div className="nosotros-header mb-16 pb-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <p
            className="font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--color-text-muted)" }}
          >
            Quiénes somos
          </p>
          <h1
            className="font-bold leading-[1.05] mb-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.04em",
              maxWidth: 720,
            }}
          >
            Somos{" "}
            <span style={{ color: "var(--color-purple)" }}>Spot Games.</span>
          </h1>
        </div>

        {/* Manifesto + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start mb-24">
          <div className="nosotros-text space-y-5">
            <p
              className="leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-text-dim)" }}
            >
              Spot Games nació de una simple idea: crear el local de videojuegos que siempre quisimos tener cerca. Un lugar donde encontrás lo nuevo, lo usado y lo retro, con el asesoramiento de alguien que realmente sabe de qué habla.
            </p>
            <p
              className="leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-text-dim)" }}
            >
              Empezamos en 2020 con un stock pequeño y las ganas de construir algo diferente. Hoy somos el punto de referencia para gamers de Buenos Aires que buscan precios justos, calidad garantizada y atención real.
            </p>
            <p
              className="leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-text-dim)" }}
            >
              No somos un ecommerce: somos Buenos Aires gamer. Reparamos, flasheamos, hacemos trade-in, conseguimos lo que no encontrás y enviamos a todo el país. Pero sobre todo, somos gamers como vos.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 py-8"
                style={{
                  borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
                  paddingLeft: i > 0 ? 24 : 0,
                }}
              >
                <span
                  ref={(el) => { statRefs.current[i] = el; }}
                  className="font-bold leading-none"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "var(--color-purple)",
                  }}
                >
                  {stat.value.toLocaleString("es-AR")}{stat.suffix}
                </span>
                <span
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] leading-tight"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="nosotros-values mb-24">
          <p
            className="font-bold uppercase tracking-[0.2em] mb-8"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--color-text-muted)" }}
          >
            Lo que nos define
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderTop: "1px solid var(--color-border)" }}>
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="py-10 transition-colors duration-300"
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  borderRight: i < VALUES.length - 1 ? "1px solid var(--color-border)" : "none",
                  paddingLeft: i > 0 ? 40 : 0,
                  paddingRight: i < VALUES.length - 1 ? 40 : 0,
                }}
              >
                <div className="w-8 h-px mb-6" style={{ background: "var(--color-purple)" }} />
                <h3
                  className="font-bold mb-3 tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-text)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-text-dim)" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="p-12 text-center"
          style={{
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <h2
            className="font-bold mb-4 tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--color-text)" }}
          >
            ¿Querés saber más?
          </h2>
          <p
            className="mb-8"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-dim)" }}
          >
            Seguinos en Instagram o escribinos por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/541157649264"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/spotgames.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @spotgames.ar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
