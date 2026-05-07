"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BelgranoMap } from "./BelgranoMap";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const WHATSAPP_URL = "https://wa.me/5491157649264?text=Hola%2C%20quiero%20consultar%20algo%20sobre%20Spot%20Games.";

const HORARIOS = [
  { dia: "Lunes – Viernes", horario: "10:00 – 20:00" },
  { dia: "Sábado",          horario: "10:00 – 18:00" },
  { dia: "Domingo",         horario: "Cerrado" },
];

export function SeccionUbicacion() {
  return (
    <section
      className="py-24 lg:py-32 bg-paper-2 border-t border-[rgba(10,10,10,0.07)]"
      aria-label="Ubicación y horarios"
    >
      <div className="container-ds">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: copy ── */}
          <div className="flex flex-col gap-8">

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-3">
                Visitanos
              </p>
              <h2
                className="font-display font-bold text-ink tracking-tight mb-4"
                style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
              >
                Estamos en Belgrano.
              </h2>
              <address className="not-italic font-body text-[17px] text-grey-1 leading-relaxed">
                Av. Cabildo 2230, Local 36/38
                <br />
                Belgrano, CABA
                <br />
                Argentina
              </address>
            </div>

            {/* Horarios */}
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet mb-2">
                Horarios
              </p>
              {HORARIOS.map(({ dia, horario }) => (
                <div
                  key={dia}
                  className="flex items-center justify-between py-3 border-b border-[rgba(10,10,10,0.07)]"
                >
                  <span className="font-body text-[15px] text-ink">{dia}</span>
                  <span
                    className={cn(
                      "font-mono text-[13px]",
                      horario === "Cerrado" ? "text-grey-3" : "text-ink"
                    )}
                  >
                    {horario}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center flex-wrap gap-3">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2.5 h-11 px-6 rounded-[4px]",
                  "bg-neon text-ink font-display font-semibold text-[14px]",
                  "hover:bg-neon-deep transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                <WhatsAppIcon />
                Escribinos por WhatsApp
              </Link>
              <Link
                href="https://maps.google.com/?q=Av.+Cabildo+2230+Belgrano+CABA"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 h-11 px-6 rounded-[4px]",
                  "border border-[rgba(10,10,10,0.22)] text-ink font-display font-medium text-[14px]",
                  "hover:bg-paper hover:border-[rgba(10,10,10,0.36)] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                Ver en el mapa
              </Link>
            </div>
          </div>

          {/* ── Right: illustrated Belgrano map ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <div className="relative rounded-[8px] overflow-hidden aspect-[4/3]">
              <BelgranoMap />
            </div>

            {/* Floating detail card */}
            <div
              className={cn(
                "absolute -bottom-6 -left-6 p-4 rounded-[6px]",
                "bg-paper border border-[rgba(10,10,10,0.12)]",
                "shadow-[0_4px_24px_rgba(10,10,10,0.08)]"
              )}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-2 mb-1">
                Desde 2018
              </p>
              <p className="font-display font-bold text-ink text-[18px]">8 años</p>
              <p className="font-mono text-[10px] text-grey-1 uppercase tracking-[0.1em]">
                en Belgrano, CABA
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
