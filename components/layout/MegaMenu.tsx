"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type MegaMenuType = "juegos" | "consolas" | "servicios";

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

const CHIP_HOVER = { scale: 1.04 };
const CHIP_TRANSITION = { duration: 0.18, ease: EASE_OUT };

// ── Platform chips ─────────────────────────────────────────────────────────

const PLATFORMS = [
  { id: "ps5",    label: "PS5" },
  { id: "ps4",    label: "PS4" },
  { id: "switch", label: "Switch" },
  { id: "xbox",   label: "Xbox" },
  { id: "pc",     label: "PC" },
  { id: "retro",  label: "Retro" },
];

const CONDITIONS = [
  { id: "new",  label: "Nuevas" },
  { id: "used", label: "Usadas" },
];

// ── Service icons (scalable) ───────────────────────────────────────────────

function RayoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M8.5 1.5L3 7.5h4.5L6 12.5l7-7.5H8.5L10 1.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HerramientaIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M9 1.5a3.5 3.5 0 00-2.8 5.6L1.5 12l1 1 4.7-4.7A3.5 3.5 0 109 1.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrilloIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7 1v2M7 11v2M1 7h2M11 7h2M3.1 3.1l1.4 1.4M9.5 9.5l1.4 1.4M9.5 3.1l-1.4 1.4M4.5 9.5l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SERVICIOS = [
  { slug: "flasheo",       label: "Flasheo & Chipeo",       Icon: RayoIcon },
  { slug: "reparacion",    label: "Reparación Electrónica", Icon: HerramientaIcon },
  { slug: "mantenimiento", label: "Mantenimiento Integral", Icon: BrilloIcon },
];

// ── Shared platform chip class ─────────────────────────────────────────────

const chipClass = cn(
  "inline-flex items-center h-12 px-6 rounded-[4px]",
  "border border-[rgba(10,10,10,0.12)] bg-paper",
  "font-display font-medium text-[14px] text-ink tracking-wide",
  "hover:bg-violet-soft hover:text-violet-deep hover:border-violet/30",
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
);

// Violet solid → neon on hover (Juegos + Consolas CTAs)
const violetCtaClass = cn(
  "inline-flex items-center justify-center h-10 px-8 rounded-[4px]",
  "bg-violet text-paper border border-violet",
  "font-display font-medium text-[14px]",
  "hover:bg-neon hover:text-ink hover:border-neon",
  "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
);

// Neon solid → violet on hover (Servicios CTA)
const neonCtaClass = cn(
  "inline-flex items-center justify-center h-10 px-8 rounded-[4px]",
  "bg-neon text-ink border border-neon",
  "font-display font-medium text-[14px]",
  "hover:bg-violet hover:text-paper hover:border-violet",
  "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
);

// ── Main component ─────────────────────────────────────────────────────────

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
          className={cn(
            "fixed left-0 right-0 z-30 flex justify-center px-6",
            scrolled ? "top-16" : "top-20"
          )}
        >
          <div
            className={cn(
              "w-full bg-paper/98 backdrop-blur-sm",
              "border border-[rgba(10,10,10,0.08)] rounded-b-[8px]",
              "shadow-[0_16px_48px_rgba(10,10,10,0.10)]",
              "py-8 px-10"
            )}
            style={{ maxWidth: 760 }}
            role="dialog"
            aria-label={
              open === "juegos" ? "Menú juegos"
              : open === "consolas" ? "Menú consolas"
              : "Menú servicios"
            }
          >
            {open === "juegos"
              ? <JuegosPanel />
              : open === "consolas"
              ? <ConsolasPanel />
              : <ServiciosPanel />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Juegos panel ───────────────────────────────────────────────────────────

function JuegosPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-center gap-3">
        {PLATFORMS.map((p) => (
          <motion.div key={p.id} whileHover={CHIP_HOVER} transition={CHIP_TRANSITION}>
            <Link
              href={`/juegos?platform=${p.id}`}
              className={chipClass}
              style={{ transitionDuration: "180ms" }}
            >
              {p.label}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-[rgba(10,10,10,0.07)]" />

      <div className="flex justify-center">
        <Link
          href="/juegos"
          className={violetCtaClass}
          style={{ transitionDuration: "180ms" }}
        >
          Ver todos los juegos →
        </Link>
      </div>
    </div>
  );
}

// ── Consolas panel ─────────────────────────────────────────────────────────

function ConsolasPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-center gap-3">
        {CONDITIONS.map((c) => (
          <motion.div key={c.id} whileHover={CHIP_HOVER} transition={CHIP_TRANSITION}>
            <Link
              href={`/consolas?condition=${c.id}`}
              className={cn(chipClass, "px-12")}
              style={{ transitionDuration: "180ms" }}
            >
              {c.label}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-[rgba(10,10,10,0.07)]" />

      <div className="flex justify-center">
        <Link
          href="/consolas"
          className={violetCtaClass}
          style={{ transitionDuration: "180ms" }}
        >
          Ver todas las consolas →
        </Link>
      </div>
    </div>
  );
}

// ── Servicios panel ────────────────────────────────────────────────────────

function ServiciosPanel() {
  return (
    <div className="flex flex-col gap-6">
      {/* 3 vertical icon+text buttons in one row */}
      <div className="flex justify-center gap-4">
        {SERVICIOS.map(({ slug, label, Icon }) => (
          <motion.div key={slug} whileHover={CHIP_HOVER} transition={CHIP_TRANSITION}>
            <Link
              href={`/servicios/${slug}`}
              className={cn(
                "flex flex-col items-center justify-center gap-3",
                "w-[190px] min-h-[130px] py-6 px-4 rounded-[4px]",
                "border border-[rgba(10,10,10,0.12)] bg-paper text-ink",
                "hover:bg-violet-soft hover:text-violet-deep hover:border-violet/30",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              )}
              style={{ transitionDuration: "180ms" }}
            >
              <Icon size={36} />
              <span className="font-display font-medium text-[13px] text-center leading-tight">
                {label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-[rgba(10,10,10,0.07)]" />

      {/* CTA — neon default, violet hover (inverted from Juegos/Consolas) */}
      <div className="flex justify-center">
        <Link
          href="/servicios/flasheo"
          className={neonCtaClass}
          style={{ transitionDuration: "180ms" }}
        >
          Ver todos los servicios →
        </Link>
      </div>
    </div>
  );
}
