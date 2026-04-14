"use client";

import { motion, type Variants } from "framer-motion";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};

const timelineEvents = [
  {
    year: "2019",
    title: "El comienzo",
    description:
      "Spot Games nació de la pasión de dos amigos gamers que querían crear una tienda diferente. Sin grandes marcas, sin vendedores de traje — solo gente que ama los videojuegos.",
  },
  {
    year: "2020",
    title: "Trade-in y reparaciones",
    description:
      "Expandimos nuestros servicios: comenzamos con trade-in y reparaciones. La comunidad gamer local empezó a confiar en nosotros para sus consolas.",
  },
  {
    year: "2022",
    title: "Envíos nacionales",
    description:
      "Comenzamos a enviar a todo el país. Lo que era un local del barrio se convirtió en una tienda para toda Argentina.",
  },
  {
    year: "2024",
    title: "Retro y coleccionismo",
    description:
      "Incorporamos una sección dedicada a consolas y juegos retro. Ahora también somos el lugar donde los coleccionistas encuentran esas joyas difíciles de conseguir.",
  },
  {
    year: "2025",
    title: "Hoy",
    description:
      "Seguimos siendo la misma tienda de siempre: cercana, honesta y apasionada. Con más de 500 productos y cientos de clientes satisfechos en todo el país.",
  },
];

const values = [
  {
    title: "Somos gamers primero",
    description:
      "Antes de ser vendedores, somos jugadores. Eso nos hace entender exactamente qué necesitás.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Honestidad total",
    description:
      "Tasamos justo, presupuestamos sin sorpresas y te decimos siempre la verdad sobre el estado de cada producto.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Comunidad",
    description:
      "Creemos en construir una comunidad gamer local. No somos solo una tienda, somos un punto de encuentro.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-bg pt-16">
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="font-display font-semibold text-sm uppercase tracking-widest text-purple-light mb-2"
          >
            Quiénes somos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-5xl text-text max-w-2xl leading-tight"
          >
            Gamers que se convirtieron en{" "}
            <span className="bg-gradient-to-r from-purple-light to-green-light bg-clip-text text-transparent">
              vendedores
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
            className="text-muted text-lg mt-4 max-w-2xl leading-relaxed"
          >
            Spot Games nació de la frustración de no encontrar una tienda que
            hable el mismo idioma que los jugadores. Somos cercanos, directos y
            apasionados. Sin vueltas.
          </motion.p>
        </div>
      </div>

      {/* Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="font-display font-bold text-2xl sm:text-3xl text-text mb-8"
        >
          Lo que nos define
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-surface border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-muted/40 text-purple-light flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-text mb-2">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            className="font-display font-bold text-2xl sm:text-3xl text-text mb-12 text-center"
          >
            Nuestra historia
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

            <div className="space-y-10">
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={event.year}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ ease: "easeOut", duration: 0.5, delay: i * 0.08 }}
                  className="relative sm:pl-16"
                >
                  {/* Dot */}
                  <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-surface-2 border-2 border-purple items-center justify-center">
                    <span className="font-display font-bold text-xs text-purple-light">
                      {event.year.slice(2)}
                    </span>
                  </div>

                  <div className="bg-surface-2 rounded-2xl p-5 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="sm:hidden font-display font-bold text-xs text-purple-light bg-purple-muted px-2 py-0.5 rounded">
                        {event.year}
                      </span>
                      <span className="hidden sm:inline font-display font-bold text-xs text-purple-light">
                        {event.year}
                      </span>
                      <h3 className="font-display font-bold text-base text-text">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhatsAppCTA />
    </div>
  );
}
