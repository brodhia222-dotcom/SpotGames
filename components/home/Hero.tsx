"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const item = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.62, ease: EASE_OUT, delay: i * 0.12 },
});

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
};

export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef   = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(headlineRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-paper flex items-center justify-center overflow-hidden"
      aria-label="Presentación principal"
    >
      {/* Ambient depth — very subtle violet radial glow, warm and editorial */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(109,40,217,0.06) 0%, transparent 72%)",
        }}
      />

      {/* Noise grain from globals.css handles texture — no additional layer needed */}

      {/* ── Content — single centered column. pb-20 offsets the fixed header visually ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-6 pb-20">

        {/* 1. Eyebrow */}
        <motion.div
          {...(reducedMotion ? {} : item(0))}
          className="flex items-center gap-2.5 mb-10"
        >
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-violet shrink-0" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-grey-1">
            Videojuegos · Consolas · Servicio técnico
          </span>
        </motion.div>

        {/* 2. Headline */}
        <motion.h1
          ref={headlineRef}
          {...(reducedMotion ? {} : item(1))}
          className="tracking-tight leading-[0.93] mb-8"
          style={{ fontSize: "clamp(64px, 9vw, 124px)" }}
        >
          <span className="block font-display font-bold text-ink">
            El catálogo
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "Times New Roman, Times, serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--violet-deep)",
            }}
          >
            que buscabas.
          </span>
        </motion.h1>

        {/* 3. Subtext */}
        <motion.p
          {...(reducedMotion ? {} : item(2))}
          className="font-body text-[19px] text-grey-1 leading-relaxed mb-12"
          style={{ maxWidth: "48ch" }}
        >
          Videojuegos, consolas y servicio técnico en Belgrano.
        </motion.p>

        {/* 4. CTAs */}
        <motion.div
          {...(reducedMotion ? {} : item(3))}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <PrimaryCTA href="/catalogo">Ver catálogo</PrimaryCTA>
          <OutlineCTA href="/servicios/flasheo">Ver servicios</OutlineCTA>
        </motion.div>

      </div>
    </section>
  );
}

// ── CTA sub-components ─────────────────────────────────────────────────────

function PrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div initial="rest" whileHover="hover" className="inline-flex">
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 h-12 px-7 rounded-[4px]",
          "bg-neon text-ink font-display font-semibold text-[15px]",
          "hover:bg-neon-deep transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        )}
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        {children}
        <motion.span
          className="inline-block leading-none"
          variants={arrowVariants}
          transition={{ duration: 0.18, ease: EASE_OUT }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

function OutlineCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center h-12 px-7 rounded-[4px]",
        "border border-[rgba(10,10,10,0.22)] text-ink font-display font-semibold text-[15px]",
        "hover:bg-paper-2 hover:border-[rgba(10,10,10,0.38)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      )}
      style={{ transitionDuration: "var(--dur-fast)" }}
    >
      {children}
    </Link>
  );
}
