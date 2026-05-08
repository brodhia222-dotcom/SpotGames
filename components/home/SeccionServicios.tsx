"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { formatPrice, cn } from "@/lib/utils";
import servicesData from "@/data/services.json";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const HEADER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const HEADER_ITEM = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } },
};

// ── Service visuals — photo + gradient fallback ────────────────────────────
// Real photos: download and place in /public/images/servicios/ (see README.md)
// Pattern: photo on top, gradient behind. If photo missing, gradient shows.

const SERVICE_CONFIG: Record<string, { gradient: string; label: string; overlay: string }> = {
  flasheo: {
    gradient: "linear-gradient(155deg, #1a0a2e 0%, #3b0764 45%, #4C1D95 100%)",
    label: "Flasheo & Chipeo",
    overlay: "linear-gradient(155deg, rgba(109,40,217,0.18) 0%, transparent 55%)",
  },
  reparacion: {
    gradient: "linear-gradient(155deg, #1c0800 0%, #451a00 50%, #78350f 100%)",
    label: "Reparación",
    overlay: "linear-gradient(155deg, rgba(120,53,15,0.20) 0%, transparent 55%)",
  },
  mantenimiento: {
    gradient: "linear-gradient(155deg, #040e1a 0%, #0c2340 55%, #1e3a5f 100%)",
    label: "Mantenimiento",
    overlay: "linear-gradient(155deg, rgba(14,36,64,0.20) 0%, transparent 55%)",
  },
};

function ServiceVisual({ id }: { id: string }) {
  const cfg = SERVICE_CONFIG[id];
  if (!cfg) return <div className="absolute inset-0 bg-paper-3" />;
  return (
    <div
      className="absolute inset-0"
      aria-hidden
      style={{
        backgroundImage: [`url('/images/servicios/${id}.jpg')`, cfg.gradient].join(", "),
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
      }}
    >
      <div className="absolute inset-0" style={{ background: cfg.overlay }} />
      <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
        {cfg.label}
      </span>
    </div>
  );
}

const SERVICE_ART: Record<string, React.ReactNode> = {
  flasheo:       <ServiceVisual id="flasheo" />,
  reparacion:    <ServiceVisual id="reparacion" />,
  mantenimiento: <ServiceVisual id="mantenimiento" />,
};

// ── Types ───────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  badge: string;
  priceFrom: number;
  turnaround: string;
}

// ── Main component ──────────────────────────────────────────────────────────

export function SeccionServicios() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="py-28 lg:py-36 bg-paper-2 border-t border-[rgba(10,10,10,0.07)]"
      aria-label="Servicios técnicos"
    >
      <div className="container-ds">

        {/* ── Section header — stagger fade+slide ── */}
        <motion.div
          className="mb-20 lg:mb-24"
          variants={HEADER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <motion.p
              variants={HEADER_ITEM}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-4"
            >
              Servicio técnico
            </motion.p>
            <motion.h2
              variants={HEADER_ITEM}
              className="font-display font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              Lo que no funciona,
              <br />
              lo reparamos.
            </motion.h2>
          </div>
        </motion.div>

        {/* ── Horizontal service rows — alternating layout ── */}
        <div className="flex flex-col gap-20 lg:gap-24">
          {(servicesData as Service[]).map((service, i) => (
            <motion.div
              key={service.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 32 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.48, ease: EASE_OUT, delay: i * 0.14 }}
            >
              <ServiceRow service={service} index={i} reducedMotion={!!reducedMotion} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Service row ─────────────────────────────────────────────────────────────

function ServiceRow({
  service,
  index,
  reducedMotion,
}: {
  service: Service;
  index: number;
  reducedMotion: boolean;
}) {
  const isEven  = index % 2 === 0;
  const numStr  = String(index + 1).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

      {/* Visual — scale + horizontal slide from the opposite side to text */}
      <motion.div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[8px]",
          !isEven && "lg:order-2"
        )}
        initial={reducedMotion ? {} : { scale: 0.94, x: isEven ? -24 : 24 }}
        whileInView={reducedMotion ? {} : { scale: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.64, ease: EASE_OUT, delay: index * 0.14 }}
      >
        {SERVICE_ART[service.id] ?? <div className="absolute inset-0 bg-paper-3" />}
      </motion.div>

      {/* Text content */}
      <div className={cn("flex flex-col gap-5 py-4", !isEven && "lg:order-1")}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet">
          // Servicio {numStr}
        </p>
        <h3
          className="font-display font-bold text-ink tracking-tight"
          style={{ fontSize: "clamp(22px, 2.5vw, 34px)" }}
        >
          {service.title}
        </h3>
        <p className="font-body text-[16px] text-grey-1 leading-relaxed max-w-[420px]">
          {service.shortDescription}
        </p>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-grey-2 block mb-1">
            Desde
          </span>
          <span className="font-mono text-[20px] font-medium text-ink">
            {formatPrice(service.priceFrom)}
          </span>
        </div>
        <div className="flex items-center gap-4 pt-1">
          <Link
            href={`/servicios/${service.slug}`}
            className={cn(
              "inline-flex items-center gap-2 h-10 px-6 rounded-[4px]",
              "bg-violet text-paper font-display font-medium text-[14px]",
              "hover:bg-violet-deep transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            )}
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Ver más →
          </Link>
          <span className="font-mono text-[11px] text-grey-2 uppercase tracking-[0.1em]">
            {service.turnaround}
          </span>
        </div>
      </div>

    </div>
  );
}
