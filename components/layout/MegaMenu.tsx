"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MegaMenuType = "catalogo" | "servicios";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
const EASE_IN: [number, number, number, number]  = [0.6, 0.04, 0.98, 0.34];

interface MegaMenuProps {
  open: MegaMenuType | null;
  scrolled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const panelVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.14, ease: EASE_IN } },
};

export function MegaMenu({ open, scrolled, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={open}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          // Outer: full-width fixed, transparent — just for positioning + events
          className={cn(
            "fixed left-0 right-0 z-30 flex justify-center px-6",
            scrolled ? "top-16" : "top-20"
          )}
        >
          {/* Inner: visible 960px container */}
          <div
            className={cn(
              "w-full bg-paper/98 backdrop-blur-sm",
              "border border-[rgba(10,10,10,0.08)] rounded-b-[8px]",
              "shadow-[0_16px_48px_rgba(10,10,10,0.10)]",
              "py-8 px-10"
            )}
            style={{ maxWidth: 960 }}
            role="dialog"
            aria-label={open === "catalogo" ? "Menú catálogo" : "Menú servicios"}
          >
            {open === "catalogo" ? <CatalogoPanel /> : <ServiciosPanel />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Catálogo panel — 3 visual category cards ──────────────────────────────

function CatalogoPanel() {
  return (
    <div className="grid grid-cols-3 gap-4">

      {/* Card 1: Por plataforma */}
      <Link
        href="/catalogo"
        className={cn(
          "group flex flex-col rounded-[6px] overflow-hidden",
          "border border-[rgba(10,10,10,0.08)] bg-paper",
          "hover:border-violet/30 hover:shadow-[0_0_0_3px_rgba(109,40,217,0.06)]",
          "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
        )}
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        {/* Visual art */}
        <div
          className="relative h-[96px] overflow-hidden flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #ede3ff 0%, #ddd6fe 100%)" }}
        >
          {/* Platform abbreviations grid */}
          <div className="grid grid-cols-3 gap-x-3 gap-y-1.5 px-4">
            {["PS5", "PS4", "SWITCH", "XBOX", "PC", "RETRO"].map((p) => (
              <span
                key={p}
                className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-violet text-center"
              >
                {p}
              </span>
            ))}
          </div>
          {/* Subtle violet glow on hover */}
          <div className="absolute inset-0 bg-violet/0 group-hover:bg-violet/5 transition-colors pointer-events-none"
            style={{ transitionDuration: "var(--dur-fast)" }} />
        </div>
        {/* Text */}
        <div className="p-4">
          <p className="font-display font-semibold text-[14px] text-ink mb-1">
            Por plataforma
          </p>
          <p className="font-mono text-[11px] text-grey-2">
            PS5 · PS4 · Switch · Xbox · PC · Retro
          </p>
        </div>
      </Link>

      {/* Card 2: Por género */}
      <Link
        href="/catalogo"
        className={cn(
          "group flex flex-col rounded-[6px] overflow-hidden",
          "border border-[rgba(10,10,10,0.08)] bg-paper",
          "hover:border-violet/30 hover:shadow-[0_0_0_3px_rgba(109,40,217,0.06)]",
          "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
        )}
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        {/* Visual art — typographic genre composition */}
        <div
          className="relative h-[96px] overflow-hidden px-4 py-3"
          style={{ background: "#F5F4F0" }}
        >
          <div className="absolute inset-0 flex flex-col justify-center pl-4 pr-2 gap-0.5">
            <span className="font-display font-black text-[22px] text-ink/80 leading-none tracking-tight">
              RPG
            </span>
            <span className="flex gap-2 items-baseline">
              <span className="font-display font-semibold text-[13px] text-grey-1">Acción</span>
              <span className="font-mono text-[9px] text-grey-3 uppercase tracking-[0.1em]">·</span>
              <span className="font-display font-light text-[13px] text-grey-1">Indie</span>
            </span>
            <span className="font-display font-bold text-[16px] text-ink/40 tracking-tight">
              Retro
            </span>
          </div>
          <div className="absolute inset-0 bg-violet/0 group-hover:bg-violet/5 transition-colors pointer-events-none"
            style={{ transitionDuration: "var(--dur-fast)" }} />
        </div>
        {/* Text */}
        <div className="p-4">
          <p className="font-display font-semibold text-[14px] text-ink mb-1">
            Por género
          </p>
          <p className="font-mono text-[11px] text-grey-2">
            Explorá por estilo de juego
          </p>
        </div>
      </Link>

      {/* Card 3: Novedades */}
      <Link
        href="/catalogo"
        className={cn(
          "group flex flex-col rounded-[6px] overflow-hidden",
          "border border-[rgba(10,10,10,0.08)] bg-paper",
          "hover:border-violet/30 hover:shadow-[0_0_0_3px_rgba(109,40,217,0.06)]",
          "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
        )}
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        {/* Visual art — NEW badge + mini game box */}
        <div
          className="relative h-[96px] overflow-hidden flex items-center gap-4 px-5"
          style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)" }}
        >
          {/* NEW badge */}
          <span
            className="font-display font-black text-[32px] leading-none tracking-tighter shrink-0"
            style={{ color: "#00E676" }}
          >
            NEW
          </span>
          {/* Mini game box swatch */}
          <div
            className="shrink-0 w-10 rounded-[3px] border border-white/10"
            style={{
              height: 56,
              background: "linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)",
            }}
          />
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none"
            style={{ transitionDuration: "var(--dur-fast)" }} />
        </div>
        {/* Text */}
        <div className="p-4">
          <p className="font-display font-semibold text-[14px] text-ink mb-1">
            Novedades
          </p>
          <p className="font-mono text-[11px] text-grey-2">
            Lo último que llegó al local
          </p>
        </div>
      </Link>

    </div>
  );
}

// ── Servicios panel — 3 compact service cards ─────────────────────────────

const SERVICIOS = [
  {
    slug: "flasheo",
    title: "Flasheo & Chipeo",
    description: "Modificación para compatibilidad con juegos de cualquier región.",
    bg: "linear-gradient(135deg, #1a0a2e 0%, #4C1D95 100%)",
    accent: "#a78bfa",
    badge: "Consolas & portátiles",
  },
  {
    slug: "reparacion",
    title: "Reparación Electrónica",
    description: "Diagnóstico gratuito. Garantía en todos los trabajos.",
    bg: "linear-gradient(135deg, #1c0800 0%, #78350f 100%)",
    accent: "#fbbf24",
    badge: "Hardware & HDMI",
  },
  {
    slug: "mantenimiento",
    title: "Mantenimiento Integral",
    description: "Limpieza profunda y pasta térmica nueva.",
    bg: "linear-gradient(135deg, #040e1a 0%, #1e3a5f 100%)",
    accent: "#38bdf8",
    badge: "Térmica & limpieza",
  },
];

function ServiciosPanel() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {SERVICIOS.map((s) => (
        <Link
          key={s.slug}
          href={`/servicios/${s.slug}`}
          className={cn(
            "group flex flex-col rounded-[6px] overflow-hidden",
            "border border-[rgba(10,10,10,0.08)] bg-paper",
            "hover:border-violet/30 hover:shadow-[0_0_0_3px_rgba(109,40,217,0.06)]",
            "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          )}
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          {/* Visual art strip */}
          <div
            className="relative h-[96px] overflow-hidden flex items-end px-4 pb-3"
            style={{ background: s.bg }}
          >
            {/* Accent lines */}
            <div className="absolute top-3 left-4 right-4 flex flex-col gap-1.5">
              <div className="h-px rounded-full" style={{ background: s.accent, opacity: 0.4 }} />
              <div className="h-px rounded-full w-2/3" style={{ background: s.accent, opacity: 0.22 }} />
            </div>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em] relative z-10"
              style={{ color: s.accent, opacity: 0.75 }}
            >
              {s.badge}
            </span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none"
              style={{ transitionDuration: "var(--dur-fast)" }} />
          </div>
          {/* Text */}
          <div className="p-4">
            <p
              className="font-display font-semibold text-[14px] text-ink mb-1 group-hover:text-violet transition-colors"
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              {s.title}
            </p>
            <p className="font-mono text-[11px] text-grey-2">
              {s.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
