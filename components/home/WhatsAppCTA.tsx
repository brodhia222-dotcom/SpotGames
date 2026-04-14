"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ease: "easeOut", duration: 0.6 },
  },
};

const buttonPulseVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(34,197,94,0)",
      "0 0 20px rgba(34,197,94,0.5)",
      "0 0 0px rgba(34,197,94,0)",
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function WhatsAppCTA() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #4C1D95 0%, #065F46 100%)",
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <p className="font-display font-semibold text-sm uppercase tracking-widest text-green-light mb-3">
              Atención personalizada
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
              ¿Tenés dudas?
              <br />
              <span className="text-green-light">Escribinos</span>
            </h2>
            <p className="text-white/70 text-base max-w-md mx-auto mb-8 leading-relaxed">
              Somos gamers como vos. Te asesoramos para encontrar la consola o
              juego ideal según tu presupuesto y gustos.
            </p>

            <motion.a
              href="https://wa.me/5491100000000?text=Hola!%20Vi%20su%20tienda%20y%20quiero%20consultar%20algo."
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonPulseVariants}
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-green text-bg font-display font-bold text-lg cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </motion.a>

            <p className="text-white/40 text-xs mt-4">
              Respondemos en menos de 24 horas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
