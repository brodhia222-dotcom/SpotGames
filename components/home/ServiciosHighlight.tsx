"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Reparación",
    subtitle: "Consolas y accesorios",
    description:
      "Reparamos PS4, PS5, Xbox, Nintendo Switch y retro. Diagnóstico sin cargo. Técnicos especializados con años de experiencia.",
    cta: "Consultar reparación",
    whatsapp: "Hola!%20Quiero%20consultar%20sobre%20reparaci%C3%B3n%20de%20consola.",
    color: "purple",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Trade-In",
    subtitle: "Cambiá y ahorrá",
    description:
      "Traé tu consola o juego, lo tasamos de forma justa y te lo descontamos en tu próxima compra. Sin vueltas, sin burocracia.",
    cta: "Consultar tasación",
    whatsapp: "Hola!%20Me%20interesa%20hacer%20un%20trade-in.%20%C2%BFC%C3%B3mo%20funciona%3F",
    color: "green",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Usados & Retro",
    subtitle: "Con garantía incluida",
    description:
      "Todo nuestro stock usado pasa por revisión técnica y viene con 30 días de garantía. Amplia selección de títulos clásicos.",
    cta: "Ver catálogo",
    href: "/productos?estado=Usado",
    color: "purple",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function ServiciosHighlight() {
  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="font-display font-semibold text-sm uppercase tracking-widest text-green-light mb-2"
          >
            Más que una tienda
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl text-text"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ease: "easeOut", duration: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 font-display font-semibold text-sm text-muted hover:text-purple-light transition-colors duration-200"
          >
            Ver todos los servicios
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

type ServiceItem = (typeof services)[number];

function ServiceCard({ service }: { service: ServiceItem }) {
  const isGreen = service.color === "green";
  const accentColor = isGreen ? "rgba(34,197,94,0.15)" : "rgba(124,58,237,0.15)";
  const iconColor = isGreen ? "text-green-light" : "text-purple-light";
  const borderHover = isGreen ? "hover:border-green/40" : "hover:border-purple/40";
  const glowHover = isGreen
    ? "hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]"
    : "hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]";

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative p-6 rounded-2xl bg-surface-2 border border-border ${borderHover} ${glowHover} transition-all duration-300 flex flex-col`}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${iconColor} transition-colors duration-200`}
        style={{ background: accentColor }}
      >
        {service.icon}
      </div>

      <h3 className="font-display font-bold text-xl text-text leading-tight">
        {service.title}
      </h3>
      <p className={`font-display font-semibold text-sm ${iconColor} mt-0.5 mb-3`}>
        {service.subtitle}
      </p>
      <p className="text-sm text-muted leading-relaxed flex-1">
        {service.description}
      </p>

      {/* CTA */}
      <div className="mt-5">
        {"href" in service && service.href ? (
          <Link
            href={service.href}
            className={`inline-flex items-center gap-1.5 font-display font-semibold text-sm ${iconColor} hover:underline transition-colors duration-200`}
          >
            {service.cta}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
            </svg>
          </Link>
        ) : (
          <a
            href={`https://wa.me/5491100000000?text=${service.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 font-display font-semibold text-sm ${iconColor} hover:underline transition-colors duration-200`}
          >
            {service.cta}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}
