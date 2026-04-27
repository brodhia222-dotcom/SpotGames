"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

void ScrollTrigger;

const STATS = [
  { value: 5,    label: "Años en el mercado",      suffix: "" },
  { value: 2000, label: "Títulos en catálogo",     suffix: "+" },
  { value: 100,  label: "Garantía en reparaciones", suffix: "%" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-text", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".about-text", start: "top 82%", once: true },
      });
      gsap.fromTo(".about-stats", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".about-stats", start: "top 85%", once: true },
      });

      // Number counters
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
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Text */}
          <div className="about-text">
            <p
              className="text-[0.625rem] font-bold uppercase tracking-[0.16em] mb-5"
              style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}
            >
              Quiénes somos
            </p>
            <h2
              className="font-bold leading-[1.1] tracking-[-0.03em] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 3rem)", color: "var(--color-text)" }}
            >
              El local donde vivís el gaming desde los 80s hasta el presente.
            </h2>
            <div className="space-y-4">
              <p className="text-[0.9rem] leading-relaxed" style={{ color: "var(--color-text-dim)" }}>
                No somos un ecommerce: somos Buenos Aires gamer. Desde consolas retro hasta las últimas plataformas, ofrecemos una experiencia de compra real, con asesoramiento personalizado y garantía en todo lo que vendemos.
              </p>
              <p className="text-[0.9rem] leading-relaxed" style={{ color: "var(--color-text-dim)" }}>
                Además de venta, brindamos servicios de reparación, flasheo, mantenimiento y trade-in. Si tiene que ver con gaming, lo resolvemos acá.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats grid grid-cols-3 gap-0">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 py-8"
                style={{
                  borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
                  paddingLeft: i > 0 ? 32 : 0,
                }}
              >
                <span
                  ref={(el) => { statRefs.current[i] = el; }}
                  className="font-bold leading-none"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: "var(--color-purple)" }}
                >
                  {stat.value.toLocaleString("es-AR")}{stat.suffix}
                </span>
                <span
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] leading-tight"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
