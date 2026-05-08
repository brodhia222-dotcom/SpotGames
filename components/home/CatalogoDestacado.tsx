"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { OutlineReveal } from "@/components/effects/OutlineReveal";
import { cn } from "@/lib/utils";
import gamesData from "@/data/games.json";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const HEADER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const HEADER_ITEM = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } },
};

const TABS = [
  { label: "Todos",  key: "todos" },
  { label: "PS5",    key: "ps5" },
  { label: "PS4",    key: "ps4" },
  { label: "Switch", key: "switch" },
  { label: "Xbox",   key: "xbox" },
  { label: "PC",     key: "pc" },
  { label: "Retro",  key: "retro" },
];

const RETRO_PLATFORMS = ["ps2", "ps3", "wii", "nes", "snes", "n64", "gamecube", "gameboy", "ds", "3ds", "psp", "psx"];

function matchesTab(platforms: string[], tabKey: string): boolean {
  if (tabKey === "todos") return true;
  if (tabKey === "retro")
    return platforms.some((p) => RETRO_PLATFORMS.includes(p.toLowerCase()));
  return platforms.some((p) => p.toLowerCase().includes(tabKey));
}

export function CatalogoDestacado() {
  const [activeTab, setActiveTab] = useState("todos");

  const filtered = gamesData
    .filter((g) => matchesTab(g.platform, activeTab))
    .slice(0, 8);

  return (
    <section
      className="py-24 lg:py-32 bg-paper border-t border-[rgba(10,10,10,0.07)]"
      aria-label="Juegos destacados"
    >
      <div className="container-ds">

        {/* ── Section header — stagger fade+slide ── */}
        <motion.div
          className="mb-10"
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
              Juegos
            </motion.p>
            <motion.h2
              variants={HEADER_ITEM}
              className="font-display font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Títulos disponibles
            </motion.h2>
          </div>
        </motion.div>

        {/* ── Platform tabs — centered ── */}
        <div
          className="flex gap-1.5 flex-wrap justify-center mb-10"
          role="tablist"
          aria-label="Filtrar por plataforma"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative h-8 px-4 rounded-[3px]",
                  "font-mono text-[11px] uppercase tracking-[0.12em]",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-violet focus-visible:ring-offset-1",
                  isActive ? "text-ink" : "text-grey-2 hover:text-ink"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="catalog-tab-indicator"
                    className="absolute inset-0 border border-[rgba(10,10,10,0.20)] rounded-[3px]"
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Game grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12"
              role="tabpanel"
            >
              {filtered.map((game, i) => (
                <OutlineReveal key={game.id} delay={i * 0.06} rx={6}>
                  <ProductCard
                    id={game.id}
                    title={game.title}
                    developer={game.developer}
                    platform={game.platform}
                    price={game.price}
                    originalPrice={"originalPrice" in game ? (game as { originalPrice: number }).originalPrice : undefined}
                    discount={"discount" in game ? (game as { discount: number }).discount : undefined}
                    stock={game.stock}
                    cover={game.cover}
                    index={i}
                  />
                </OutlineReveal>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-grey-3"
            >
              Sin títulos disponibles para esta plataforma
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── CTA — centered below grid ── */}
        <div className="flex justify-center mt-14">
          <Link
            href="/juegos"
            className={cn(
              "inline-flex items-center gap-2 h-11 px-7 rounded-[4px]",
              "border border-[rgba(10,10,10,0.22)] font-display font-medium text-[14px] text-ink",
              "hover:bg-paper-2 hover:border-[rgba(10,10,10,0.36)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            )}
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Ver todo el catálogo
            <span aria-hidden>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
