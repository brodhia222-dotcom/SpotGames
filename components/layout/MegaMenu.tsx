"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import gamesData from "@/data/games.json";

// 3 featured discounted games for the mini gallery
const FEATURED = (gamesData as Array<typeof gamesData[0] & { discount?: number }>)
  .filter((g) => g.discount && g.discount > 0)
  .slice(0, 3);

type MegaMenuType = "catalogo" | "servicios";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
const EASE_IN: [number, number, number, number]  = [0.6, 0.04, 0.98, 0.34];

interface MegaMenuProps {
  open: MegaMenuType | null;
  scrolled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const platforms = [
  { label: "Todos",  href: "/catalogo" },
  { label: "PS5",    href: "/catalogo?plataforma=ps5" },
  { label: "PS4",    href: "/catalogo?plataforma=ps4" },
  { label: "Switch", href: "/catalogo?plataforma=switch" },
  { label: "Xbox",   href: "/catalogo?plataforma=xbox" },
  { label: "PC",     href: "/catalogo?plataforma=pc" },
  { label: "Retro",  href: "/catalogo?plataforma=retro" },
];

const services = [
  {
    slug: "flasheo",
    title: "Flasheo & Chipeo",
    description: "Modificación de consolas para compatibilidad con juegos de cualquier región.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M11 3L5 11h6l-2 6 8-10h-6l2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: "reparacion",
    title: "Reparación Electrónica",
    description: "Diagnóstico gratuito y reparación del componente dañado. Garantía incluida.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M14.7 6.3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L4 11l-.8 3.8L7 14l7.7-7.7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "mantenimiento",
    title: "Mantenimiento Integral",
    description: "Limpieza profunda y pasta térmica nueva. Como el primer día.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const panelVariants = {
  hidden:  { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_OUT } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.14, ease: EASE_IN } },
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
          // Fixed below the header — top tracks header height (h-20 = 5rem, h-16 = 4rem)
          className={cn(
            "fixed left-0 right-0 z-30",
            scrolled ? "top-16" : "top-20",
            "bg-paper/98 backdrop-blur-sm",
            "border-b border-[rgba(10,10,10,0.08)]",
            "shadow-[0_12px_40px_rgba(10,10,10,0.09)]"
          )}
          role="dialog"
          aria-label={open === "catalogo" ? "Menú catálogo" : "Menú servicios"}
        >
          <div className="container-ds py-10">
            {open === "catalogo" ? <CatalogoPanel /> : <ServiciosPanel />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CatalogoPanel() {
  return (
    <div className="grid grid-cols-[1fr_200px] gap-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2 mb-5">
          Por plataforma
        </p>
        <ul className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <li key={p.label}>
              <Link
                href={p.href}
                className={cn(
                  "inline-flex items-center h-8 px-4 rounded-[3px]",
                  "border border-[rgba(10,10,10,0.16)]",
                  "font-mono text-[11px] uppercase tracking-[0.12em] text-ink",
                  "transition-colors hover:bg-ink hover:text-paper hover:border-ink",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 min-w-[200px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2 mb-2">
          En oferta
        </p>
        {FEATURED.map((game) => (
          <Link
            key={game.id}
            href="/catalogo"
            className={cn(
              "group flex items-center gap-3 p-2 rounded-[3px]",
              "hover:bg-paper-2 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            )}
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            <span
              aria-hidden
              className="w-7 h-7 rounded-[2px] shrink-0 border border-[rgba(10,10,10,0.08)]"
              style={{ background: game.cover.gradient }}
            />
            <span className="flex-1 min-w-0">
              <span className="block font-display font-medium text-[13px] text-ink truncate">
                {game.title}
              </span>
              <span className="block font-mono text-[10px] text-grey-2 mt-0.5">
                {formatPrice(game.price)}
                {(game as { discount?: number }).discount && (
                  <span className="ml-1.5 text-neon-deep font-semibold">
                    -{(game as { discount?: number }).discount}%
                  </span>
                )}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ServiciosPanel() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {services.map((s) => (
        <Link
          key={s.slug}
          href={`/servicios/${s.slug}`}
          className={cn(
            "group flex gap-4 p-5 rounded-[4px] border border-transparent",
            "hover:border-[rgba(10,10,10,0.10)] hover:bg-paper-2",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          )}
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          <span
            className="flex items-start pt-0.5 text-grey-1 group-hover:text-violet transition-colors shrink-0"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            {s.icon}
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="font-display font-semibold text-sm text-ink">{s.title}</span>
            <span className="font-body text-[13px] text-grey-1 leading-relaxed">{s.description}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
