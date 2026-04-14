"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

/* ── Variants ─────────────────────────────────────────────── */
const wordVariants: Variants = {
  hidden:  { opacity: 0, filter: "blur(12px)", y: 28 },
  visible: {
    opacity: 1, filter: "blur(0px)", y: 0,
    transition: { ease: "easeOut", duration: 0.6 },
  },
};
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const badgePulseVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(34,197,94,0)",
      "0 0 18px rgba(34,197,94,0.7)",
      "0 0 0px rgba(34,197,94,0)",
    ],
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
};
const floatInVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.85, y: 30 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { ease: "easeOut", duration: 0.7 },
  },
};

const headline = "Tu próxima consola te está esperando";

/* ── Floating mini-cards ──────────────────────────────────── */
const floatingCards = [
  {
    label: "PS5",
    name: "God of War Ragnarök",
    price: "$89.900",
    badge: "NUEVO",
    color: "#7C3AED",
    img: "https://placehold.co/64x64/130F24/A78BFA?text=GoW",
    cls: "animate-float-a",
    position: "top-8 right-4 sm:right-12",
    delay: 0.5,
  },
  {
    label: "SWITCH",
    name: "Zelda: Tears of the Kingdom",
    price: "$84.900",
    badge: "NUEVO",
    color: "#22C55E",
    img: "https://placehold.co/64x64/130F24/4ADE80?text=Zelda",
    cls: "animate-float-b",
    position: "top-1/2 -translate-y-1/2 right-0 sm:right-4",
    delay: 0.7,
  },
  {
    label: "RETRO",
    name: "Super Nintendo",
    price: "$119.900",
    badge: "USADO",
    color: "#A78BFA",
    img: "https://placehold.co/64x64/2A2050/A78BFA?text=SNES",
    cls: "animate-float-c",
    position: "bottom-16 right-8 sm:right-16",
    delay: 0.9,
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgY   = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg pt-16"
    >
      {/* ── Background layers ── */}
      <div className="scanline absolute inset-0 z-0" />
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="dot-grid absolute inset-0" />
        {/* Big purple radial */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)" }}
        />
        {/* Green radial bottom */}
        <div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 65%)" }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-0">

          {/* LEFT ── Text */}
          <motion.div style={{ y: textY }} className="flex-1 text-center md:text-left md:pr-12">

            {/* Badge */}
            <motion.div
              variants={badgePulseVariants}
              animate="animate"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-dark bg-green-dark/25 text-green-light text-sm font-display font-bold mb-7"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
              </span>
              Envíos a todo el país — Argentina
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] text-text leading-[1.05] mb-6 tracking-tight"
            >
              {headline.split(" ").map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                  {word === "consola" ? (
                    <span className="bg-gradient-to-r from-purple-light via-purple-glow to-green-light bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 1.0 }}
              className="text-muted text-lg max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed"
            >
              Consolas, juegos, accesorios y retro en Argentina.
              Nuevos y usados con garantía. Reparación y trade-in.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <Link
                href="/productos"
                className="group relative px-8 py-4 rounded-2xl bg-purple text-white font-display font-bold text-base text-center overflow-hidden transition-all duration-200 hover:scale-105"
                style={{ boxShadow: "0 0 28px rgba(124,58,237,0.55)" }}
              >
                <span className="relative z-10">Ver productos</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple to-purple-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <a
                href="https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-green text-green-light font-display font-bold text-base text-center transition-all duration-200 hover:bg-green-dark/25 hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultanos
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.6, delay: 1.5 }}
              className="flex gap-6 mt-10 justify-center md:justify-start"
            >
              {[
                { value: "+500", label: "Productos" },
                { value: "5 años", label: "Experiencia" },
                { value: "24hs", label: "Respuesta" },
              ].map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <p className="font-display font-bold text-2xl text-purple-light leading-none">{s.value}</p>
                  <p className="text-xs text-subtle mt-1 font-display font-semibold uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT ── Floating cards layout */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[460px]">

              {/* Central glow */}
              <div
                className="absolute inset-8 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(124,58,237,0.30)" }}
              />

              {/* Main central product image */}
              <motion.div
                variants={floatInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="absolute inset-12 rounded-3xl overflow-hidden border border-purple/30 bg-surface animate-border-glow"
              >
                <Image
                  src="https://placehold.co/340x360/130F24/9F67FF?text=PS5+·+Switch%0AXbox+·+Retro"
                  alt="Spot Games — Consolas y Juegos"
                  fill
                  sizes="340px"
                  className="object-cover"
                  priority
                />
                {/* Inner glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 60%)" }}
                />
              </motion.div>

              {/* Floating mini-cards */}
              {floatingCards.map((card) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease: "easeOut", duration: 0.5, delay: card.delay }}
                  className={`absolute ${card.position} ${card.cls} z-10`}
                >
                  <div
                    className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-2xl border border-border/60 backdrop-blur-sm bg-surface/80 shadow-xl"
                    style={{ boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 12px ${card.color}33` }}
                  >
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={card.img} alt={card.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="text-[9px] font-display font-bold px-1.5 py-0.5 rounded"
                          style={{ background: `${card.color}30`, color: card.color, border: `1px solid ${card.color}50` }}
                        >
                          {card.label}
                        </span>
                        <span className="text-[9px] font-display font-bold text-green-light bg-green-dark/30 px-1.5 py-0.5 rounded border border-green-dark/40">
                          {card.badge}
                        </span>
                      </div>
                      <p className="text-[11px] font-display font-semibold text-text leading-tight max-w-[110px] truncate">
                        {card.name}
                      </p>
                      <p className="font-display font-bold text-xs text-purple-light">{card.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-subtle font-display font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-5 text-subtle"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
