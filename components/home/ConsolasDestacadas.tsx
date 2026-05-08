"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import consolesData from "@/data/consoles.json";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const HEADER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const HEADER_ITEM = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } },
};

interface CoverData {
  gradient: string;
  accentColor: string;
  badgeColor: string;
}

interface ConsoleItem {
  id: string;
  name: string;
  generation: string;
  type: string;
  price: number;
  stock: number;
  cover: CoverData;
}

const CONSOLES = consolesData as ConsoleItem[];
const TILT = (i: number): number => (i % 2 === 0 ? -3 : 3);

// ── Console visual — photo + gradient fallback ─────────────────────────────
// Real photos: download and place in /public/images/consolas/ (see README.md)
// Photo on top, gradient fallback behind. If photo missing, gradient shows.

function ConsoleArt({ id, cover }: { id: string; cover: CoverData }) {
  return (
    <div
      className="absolute inset-0"
      aria-hidden
      style={{
        backgroundImage: [`url('/images/consolas/${id}.jpg')`, cover.gradient].join(", "),
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
      }}
    >
      {/* Bottom scrim for info panel legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(10,10,10,0.30) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────

export function ConsolasDestacadas() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="py-24 lg:py-32 bg-paper-2 border-t border-[rgba(10,10,10,0.07)]"
      aria-label="Consolas nuevas y restauradas"
    >
      <div className="container-ds">

        {/* ── Section header — stagger fade+slide ── */}
        <motion.div
          className="mb-12"
          variants={HEADER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.p
              variants={HEADER_ITEM}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-3"
            >
              Hardware
            </motion.p>
            <motion.h2
              variants={HEADER_ITEM}
              className="font-display font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Nuevas y restauradas.
            </motion.h2>
          </div>
        </motion.div>

        {/* ── Grid 4 columns × N rows ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {CONSOLES.map((item, i) => {
            const isHovered = hoveredIdx === i;
            const isDimmed  = hoveredIdx !== null && !isHovered;

            return (
              <motion.div
                key={item.id}
                initial={reducedMotion ? {} : { opacity: 0, y: 32, scale: 0.94, rotate: TILT(i) }}
                animate={
                  reducedMotion
                    ? {}
                    : {
                        opacity:   isDimmed ? 0.7 : 1,
                        y:         0,
                        rotate:    isHovered ? 0 : TILT(i),
                        scale:     isHovered ? 1.04 : 1,
                        boxShadow: isHovered
                          ? "0 24px 60px rgba(109,40,217,0.22), 0 8px 24px rgba(10,10,10,0.14)"
                          : "0 4px 16px rgba(10,10,10,0.07)",
                      }
                }
                transition={{ duration: 0.56, ease: EASE_OUT, delay: i * 0.1 }}
                style={{ position: "relative", zIndex: isHovered ? 10 : 1 }}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
              >
                <article className="relative rounded-[6px] overflow-hidden bg-paper border border-[rgba(10,10,10,0.10)]">
                  {/* Art panel */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <ConsoleArt id={item.id} cover={item.cover} />
                  </div>

                  {/* Info panel */}
                  <div className="p-4 flex flex-col gap-2 bg-paper">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="font-mono text-[8.5px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-[2px]"
                        style={{
                          background: item.type === "restored"
                            ? "rgba(109,40,217,0.08)"
                            : "rgba(0,230,118,0.12)",
                          color: item.type === "restored" ? "#6D28D9" : "#00C853",
                        }}
                      >
                        {item.type === "restored" ? "Restaurada" : "Nueva"}
                      </span>
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-grey-2 shrink-0">
                        {item.generation}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-[14px] text-ink leading-tight">
                      {item.name}
                    </h3>

                    <p className="font-mono text-[13px] text-ink font-medium">
                      {formatPrice(item.price)}
                    </p>

                    {item.stock <= 2 && (
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.10em] text-grey-2">
                        Últ. {item.stock} {item.stock === 1 ? "unidad" : "uds."}
                      </p>
                    )}
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center mt-12">
          <Link
            href="/consolas"
            className={cn(
              "inline-flex items-center gap-2 h-11 px-7 rounded-[4px]",
              "border border-[rgba(10,10,10,0.22)] text-ink font-display font-medium text-[14px]",
              "hover:bg-paper hover:border-[rgba(10,10,10,0.36)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            )}
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Ver todas las consolas
            <span aria-hidden>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
