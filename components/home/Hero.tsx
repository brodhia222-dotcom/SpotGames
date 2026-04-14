"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const badgePulseVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(34,197,94,0)",
      "0 0 14px rgba(34,197,94,0.6)",
      "0 0 0px rgba(34,197,94,0)",
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ease: "easeOut", duration: 0.7, delay: 0.4 },
  },
};

const headline = "Tu próxima consola te está esperando";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg pt-16"
    >
      {/* Background layers */}
      <div className="scanline absolute inset-0 z-0" />
      <div className="dot-grid absolute inset-0 z-0" />

      {/* Purple glow blob — top right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
      />
      {/* Green glow blob — bottom left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 lg:gap-16">

          {/* Left — Text */}
          <div className="flex-1 text-center md:text-left">
            {/* Badge */}
            <motion.div
              variants={badgePulseVariants}
              animate="animate"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-dark bg-green-dark/20 text-green-light text-sm font-display font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Envíos a todo el país
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-text leading-tight mb-6"
            >
              {headline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 1.1 }}
              className="text-muted text-lg max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed"
            >
              Consolas, juegos, accesorios y retro en Argentina. Nuevos y usados
              con garantía. Reparación y trade-in.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <Link
                href="/productos"
                className="px-7 py-3.5 rounded-xl bg-purple text-white font-display font-bold text-base text-center transition-all duration-200 hover:bg-purple-glow hover:scale-105"
                style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              >
                Ver productos
              </Link>
              <a
                href="https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl border-2 border-green text-green-light font-display font-bold text-base text-center transition-all duration-200 hover:bg-green-dark/20 hover:scale-105"
              >
                Consultanos
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.6, delay: 1.6 }}
              className="flex gap-8 mt-10 justify-center md:justify-start"
            >
              {[
                { value: "+500", label: "Productos" },
                { value: "5 años", label: "En el mercado" },
                { value: "24hs", label: "Respuesta" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="font-display font-bold text-2xl text-purple-light leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-subtle mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              style={{ y: imageY }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]"
            >
              {/* Glow behind image */}
              <div
                className="absolute inset-8 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(124,58,237,0.25)" }}
              />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-purple/20 bg-surface">
                <Image
                  src="https://placehold.co/480x480/130F24/9F67FF?text=PS5+%2F+Switch%0A%2F+Xbox"
                  alt="Consolas disponibles en Spot Games"
                  fill
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 480px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-subtle font-display">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 text-subtle"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
