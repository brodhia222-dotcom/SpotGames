"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMagnetic } from "@/lib/magneticEffect";

void ScrollTrigger;

const STATS = [
  { value: 2000, label: "Títulos", prefix: "+", suffix: "" },
  { value: 5,    label: "Años en el mercado", prefix: "", suffix: "" },
  { value: 100,  label: "% Garantía reparaciones", prefix: "", suffix: "%" },
];

function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === " " ? "inline" : "inline-block" }}
      aria-hidden="true"
    >
      {char === " " ? " " : char}
    </span>
  ));
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef1 = useMagnetic(0.3);
  const ctaRef2 = useMagnetic(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Char-by-char H1 reveal
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 24, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.022,
          ease: "power3.out",
          immediateRender: false,
          delay: 0.1,
        }
      );

      // Sub + CTAs + stats cascade
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.85, immediateRender: false }
      );
      gsap.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.0, immediateRender: false }
      );
      gsap.fromTo(
        ".hero-stats",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 1.15, immediateRender: false }
      );

      // Number counters on scroll
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate() {
            if (el) el.textContent = stat.prefix + Math.round(obj.val).toLocaleString("es-AR") + stat.suffix;
          },
        });
      });

      // Scroll: hero content fades + moves up
      gsap.to(".hero-content", {
        opacity: 0.3,
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Orb float animation
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, { y: -30, x: 20, duration: 8, ease: "sine.inOut", repeat: -1, yoyo: true });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, { y: 25, x: -15, duration: 10, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 });
      }
    }, sectionRef);

    // Mouse parallax on background layers
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, { x: dx * -40, y: dy * -25, duration: 0.8, ease: "power2.out", overwrite: "auto" });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, { x: dx * 30, y: dy * 20, duration: 1.0, ease: "power2.out", overwrite: "auto" });
      }
      if (line1Ref.current) {
        gsap.to(line1Ref.current, { x: dx * 20, y: dy * 15, duration: 0.7, ease: "power2.out", overwrite: "auto" });
      }
      if (line2Ref.current) {
        gsap.to(line2Ref.current, { x: dx * -15, y: dy * 10, duration: 0.9, ease: "power2.out", overwrite: "auto" });
      }
      if (line3Ref.current) {
        gsap.to(line3Ref.current, { x: dx * 25, y: dy * -12, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      }
      if (layerRef.current) {
        gsap.to(layerRef.current, { rotateX: dy * 2, rotateY: dx * -3, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* ── BACKGROUND LAYERS ──────────────────── */}

      {/* Aurora orb 1 */}
      <div
        ref={orb1Ref}
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "10%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Aurora orb 2 */}
      <div
        ref={orb2Ref}
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          right: "8%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Thin diagonal line 1 */}
      <div
        ref={line1Ref}
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "5%",
          width: "40vw",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(168,85,247,0.2), transparent)",
          transform: "rotate(-18deg)",
          zIndex: 1,
        }}
      />

      {/* Thin diagonal line 2 */}
      <div
        ref={line2Ref}
        className="absolute pointer-events-none"
        style={{
          bottom: "28%",
          right: "3%",
          width: "35vw",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(168,85,247,0.15), transparent)",
          transform: "rotate(12deg)",
          zIndex: 1,
        }}
      />

      {/* Thin diagonal line 3 */}
      <div
        ref={line3Ref}
        className="absolute pointer-events-none"
        style={{
          top: "55%",
          left: "2%",
          width: "25vw",
          height: 1,
          background: "linear-gradient(to right, rgba(74,222,128,0.08), transparent)",
          transform: "rotate(-8deg)",
          zIndex: 1,
        }}
      />

      {/* 3D parallax layer */}
      <div
        ref={layerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d", zIndex: 1 }}
      >
        {/* Wireframe card far back */}
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "6%",
            width: 180,
            height: 240,
            border: "1px solid rgba(168,85,247,0.12)",
            borderRadius: 12,
            transform: "translateZ(-40px) rotate(8deg)",
            background: "rgba(168,85,247,0.03)",
          }}
        />
        {/* Wireframe card mid */}
        <div
          style={{
            position: "absolute",
            bottom: "22%",
            left: "5%",
            width: 140,
            height: 90,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            transform: "translateZ(-20px) rotate(-6deg)",
          }}
        />
        {/* Floating badge front */}
        <div
          style={{
            position: "absolute",
            top: "22%",
            right: "12%",
            background: "rgba(17,17,21,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "10px 14px",
            backdropFilter: "blur(12px)",
            transform: "translateZ(30px)",
            animation: "float-a 4s 1.5s ease-in-out infinite",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="tag tag-new">Nuevo</span>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, fontFamily: "var(--font-display)", color: "var(--color-text)" }}>PlayStation 5 Slim</span>
          </div>
          <span style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, fontFamily: "var(--font-mono)", color: "var(--color-green)" }}>
            ARS&nbsp;1.450.000
          </span>
        </div>
        {/* Floating badge 2 */}
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: "6%",
            background: "rgba(17,17,21,0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            padding: "10px 14px",
            backdropFilter: "blur(12px)",
            transform: "translateZ(20px)",
            animation: "float-b 4.5s 2s ease-in-out infinite",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="tag tag-retro">Retro</span>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, fontFamily: "var(--font-display)", color: "var(--color-text)" }}>N64 Set Completo</span>
          </div>
          <span style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, fontFamily: "var(--font-mono)", color: "var(--color-green)" }}>
            ARS&nbsp;95.000
          </span>
        </div>
      </div>

      {/* ── CENTRAL CONTENT ────────────────────── */}
      <div className="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p
          className="mb-8 text-[0.65rem] font-bold uppercase tracking-[0.22em]"
          style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Buenos Aires · Gamer Store
        </p>

        {/* H1 */}
        <h1
          className="mb-8 leading-[0.95] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-display)" }}
          aria-label="Tu próximo nivel empieza aquí."
        >
          <span className="block" style={{ fontSize: "clamp(3.5rem, 6.5vw, 5.5rem)", color: "var(--color-text)" }}>
            {Array.from("Tu próximo").map((char, i) => (
              <span key={i} className="hero-char char inline-block" aria-hidden="true" style={{ display: char === " " ? "inline" : "inline-block" }}>
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
          <span className="block italic" style={{ fontSize: "clamp(4.5rem, 8.5vw, 7.5rem)", color: "var(--color-purple)" }}>
            {Array.from("nivel").map((char, i) => (
              <span key={i} className="hero-char char inline-block" aria-hidden="true">
                {char}
              </span>
            ))}
          </span>
          <span className="block" style={{ fontSize: "clamp(3.5rem, 6.5vw, 5.5rem)", color: "var(--color-text)" }}>
            {Array.from("empieza aquí.").map((char, i) => (
              <span key={i} className="hero-char char inline-block" aria-hidden="true" style={{ display: char === " " ? "inline" : "inline-block" }}>
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Sub */}
        <p
          className="hero-sub mb-10 leading-relaxed mx-auto"
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            color: "var(--color-text-dim)",
            maxWidth: 480,
          }}
        >
          Juegos nuevos y usados, consolas, retro y accesorios. Reparación, flasheo y trade-in en Buenos Aires.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link
            href="/catalogo"
            ref={ctaRef1}
            className="btn btn-primary btn-lg"
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
              <rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/>
              <rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/>
            </svg>
            Ver catálogo
          </Link>
          <Link
            href="/servicios"
            ref={ctaRef2}
            className="btn btn-outline btn-lg"
          >
            Nuestros servicios
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0">
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div className="hidden sm:block w-px h-8 mx-8" style={{ background: "var(--color-border)" }} />
              )}
              <div className="flex flex-col items-center gap-1">
                <span
                  className="font-semibold"
                  ref={(el) => { statRefs.current[i] = el; }}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", color: "var(--color-text)" }}
                >
                  {stat.prefix}{stat.value.toLocaleString("es-AR")}{stat.suffix}
                </span>
                <span
                  className="text-[0.65rem] font-bold uppercase tracking-[0.1em]"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div
          className="relative overflow-hidden"
          style={{ width: 32, height: 1, background: "var(--color-border)" }}
        >
          <div
            style={{
              position: "absolute",
              left: "-100%",
              top: 0,
              width: "100%",
              height: "100%",
              background: "var(--color-purple)",
              animation: "scroll-slide 2s 2s ease-in-out infinite",
            }}
          />
        </div>
        <span
          className="text-[0.6rem] font-bold uppercase tracking-[0.16em]"
          style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}
        >
          Explorar
        </span>
      </div>
    </section>
  );
}
