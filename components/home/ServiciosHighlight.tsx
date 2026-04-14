"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75" />
      </svg>
    ),
    title: "Reparación",
    subtitle: "Consolas y accesorios",
    description: "Reparamos PS4, PS5, Xbox, Switch y retro. Diagnóstico sin cargo. Técnicos especializados con años de experiencia.",
    cta: "Consultar",
    whatsapp: "Hola!%20Quiero%20consultar%20sobre%20reparaci%C3%B3n.",
    color: "purple" as const,
    number: "01",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Trade-In",
    subtitle: "Cambiá y ahorrá",
    description: "Traé tu consola o juego, lo tasamos de forma justa y te lo descontamos en tu próxima compra. Sin vueltas.",
    cta: "Consultar tasación",
    whatsapp: "Hola!%20Me%20interesa%20hacer%20un%20trade-in.",
    color: "green" as const,
    number: "02",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Usados & Retro",
    subtitle: "Con garantía incluida",
    description: "Todo nuestro stock usado pasa por revisión técnica y viene con 30 días de garantía. Clásicos en perfectas condiciones.",
    cta: "Ver catálogo",
    href: "/productos?estado=Usado",
    color: "purple" as const,
    number: "03",
  },
];

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.55 } },
};
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function ServiciosHighlight() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#0E0B1E" }}>
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.1 }} />

      {/* Decorative lines */}
      <div className="absolute left-0 top-1/2 w-32 h-px bg-gradient-to-r from-transparent to-purple/30 pointer-events-none" />
      <div className="absolute right-0 top-1/2 w-32 h-px bg-gradient-to-l from-transparent to-green/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="font-display font-bold text-xs uppercase tracking-widest text-green-light mb-3"
          >
            Más que una tienda
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.08 }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text"
          >
            Nuestros{" "}
            <span className="bg-gradient-to-r from-purple-light to-green-light bg-clip-text text-transparent">
              servicios
            </span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {services.map((s) => {
            const isGreen = s.color === "green";
            const accent  = isGreen ? "#22C55E" : "#7C3AED";
            const accentLight = isGreen ? "#4ADE80" : "#A78BFA";

            return (
              <motion.div
                key={s.title}
                variants={cardVariants}
                className="group relative p-7 rounded-3xl border border-border bg-surface overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{ "--accent": accent } as React.CSSProperties}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.5), 0 0 28px ${accent}22`;
                  el.style.borderColor = `${accent}35`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "";
                  el.style.borderColor = "";
                }}
              >
                {/* Background glow blob */}
                <div
                  className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `${accent}15` }}
                />

                {/* Number */}
                <span
                  className="absolute top-6 right-7 font-display font-bold text-5xl leading-none select-none"
                  style={{ color: `${accent}18` }}
                >
                  {s.number}
                </span>

                {/* Icon */}
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${accent}18`, color: accentLight, border: `1px solid ${accent}30` }}
                >
                  {s.icon}
                </div>

                <h3 className="font-display font-bold text-2xl text-text leading-tight mb-0.5">
                  {s.title}
                </h3>
                <p className="font-display font-semibold text-sm mb-4" style={{ color: accentLight }}>
                  {s.subtitle}
                </p>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {s.description}
                </p>

                {"href" in s && s.href ? (
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 font-display font-bold text-sm rounded-xl px-4 py-2.5 border transition-all duration-200 hover:scale-105"
                    style={{ color: accentLight, borderColor: `${accent}35`, background: `${accent}12` }}
                  >
                    {s.cta}
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                    </svg>
                  </Link>
                ) : (
                  <a
                    href={`https://wa.me/5491100000000?text=${s.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-display font-bold text-sm rounded-xl px-4 py-2.5 border transition-all duration-200 hover:scale-105"
                    style={{ color: accentLight, borderColor: `${accent}35`, background: `${accent}12` }}
                  >
                    {s.cta}
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                    </svg>
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ease: "easeOut", duration: 0.4, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-purple-light transition-colors duration-200 font-display font-semibold"
          >
            Ver todos los servicios →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
