"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};

const contactInfo = [
  {
    label: "WhatsApp",
    value: "+54 9 11 0000-0000",
    href: "https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20algo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@spotgames.ar",
    href: "https://instagram.com/spotgames.ar",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-light">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Ubicación",
    value: "Buenos Aires, Argentina",
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-purple-light">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const motivos = [
  "Consulta de producto",
  "Reparación",
  "Trade-In",
  "Envíos",
  "Otro",
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", motivo: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hola! Soy ${form.nombre}.\nMotivo: ${form.motivo}\n\n${form.mensaje}\n\nEmail: ${form.email}`
    );
    window.open(`https://wa.me/5491100000000?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-bg pt-16">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="font-display font-semibold text-sm uppercase tracking-widest text-purple-light mb-2"
          >
            Hablemos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl text-text"
          >
            Contacto
          </motion.h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <h2 className="font-display font-bold text-xl text-text mb-4">
                ¿Cómo contactarnos?
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                La forma más rápida es por WhatsApp. Respondemos en menos de 24
                horas. También podés escribirnos por Instagram o completar el
                formulario.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border">
                  <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-subtle font-display font-semibold uppercase tracking-wide">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text hover:text-purple-light transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-text">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-surface rounded-2xl border border-border p-7">
              <h2 className="font-display font-bold text-xl text-text mb-6">
                Envianos un mensaje
              </h2>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-dark/30 border border-green flex items-center justify-center mx-auto mb-4">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8 text-green-light">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="font-display font-bold text-xl text-text mb-2">
                      ¡Mensaje enviado!
                    </p>
                    <p className="text-muted text-sm">
                      Se abrió WhatsApp con tu mensaje. Te respondemos pronto.
                    </p>
                    <button
                      onClick={() => { setForm({ nombre: "", email: "", motivo: "", mensaje: "" }); setSent(false); }}
                      className="mt-5 text-sm text-purple-light hover:underline cursor-pointer"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nombre" className="block text-xs text-subtle font-display font-semibold uppercase tracking-wide mb-1.5">
                          Nombre *
                        </label>
                        <input
                          id="nombre"
                          type="text"
                          required
                          value={form.nombre}
                          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-text placeholder:text-subtle text-sm focus:outline-none focus:border-purple transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs text-subtle font-display font-semibold uppercase tracking-wide mb-1.5">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="tu@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-text placeholder:text-subtle text-sm focus:outline-none focus:border-purple transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="motivo" className="block text-xs text-subtle font-display font-semibold uppercase tracking-wide mb-1.5">
                        Motivo *
                      </label>
                      <select
                        id="motivo"
                        required
                        value={form.motivo}
                        onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-text text-sm focus:outline-none focus:border-purple transition-colors duration-200 cursor-pointer"
                      >
                        <option value="">Seleccioná un motivo</option>
                        {motivos.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="block text-xs text-subtle font-display font-semibold uppercase tracking-wide mb-1.5">
                        Mensaje *
                      </label>
                      <textarea
                        id="mensaje"
                        required
                        rows={4}
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        placeholder="Contanos en qué podemos ayudarte..."
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-text placeholder:text-subtle text-sm focus:outline-none focus:border-purple transition-colors duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-purple text-white font-display font-bold text-base cursor-pointer hover:bg-purple-glow transition-colors duration-200"
                      style={{ boxShadow: "0 0 16px rgba(124,58,237,0.35)" }}
                    >
                      Enviar por WhatsApp
                    </button>
                  </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
