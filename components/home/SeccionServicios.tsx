"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { formatPrice, cn } from "@/lib/utils";
import servicesData from "@/data/services.json";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

// ── Editorial CSS art for each service ────────────────────────────────────

function FlasheoArt() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(155deg, #1a0a2e 0%, #3b0764 45%, #4C1D95 100%)" }}
    >
      <svg
        viewBox="0 0 280 360"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {/* PCB grid background */}
        <defs>
          <pattern id="pcb-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#00E676" strokeWidth="0.35" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="280" height="360" fill="url(#pcb-grid)" />

        {/* Central chip body */}
        <rect x="72" y="108" width="136" height="108" rx="5"
          fill="#4C1D95" stroke="#00E676" strokeWidth="1.5" opacity="0.9" />
        <rect x="84" y="120" width="112" height="84" rx="3"
          fill="#6D28D9" opacity="0.5" />
        <text x="140" y="166" textAnchor="middle"
          fontFamily="monospace" fontSize="11" fill="#00E676" opacity="0.9" letterSpacing="2">IC-01</text>
        <text x="140" y="181" textAnchor="middle"
          fontFamily="monospace" fontSize="7" fill="#a78bfa" opacity="0.7" letterSpacing="1">SPOT GAMES</text>

        {/* Left pins */}
        {[118, 134, 150, 166, 182].map((y, i) => (
          <g key={i}>
            <rect x="44" y={y - 3} width="28" height="6" rx="1" fill="#00E676" opacity="0.85" />
            <line x1="0" y1={y} x2="44" y2={y} stroke="#00E676" strokeWidth="1"
              opacity={i % 2 === 0 ? 0.55 : 0.25} />
          </g>
        ))}

        {/* Right pins */}
        {[118, 134, 150, 166, 182].map((y, i) => (
          <g key={i}>
            <rect x="208" y={y - 3} width="28" height="6" rx="1" fill="#00E676" opacity="0.85" />
            <line x1="236" y1={y} x2="280" y2={y} stroke="#00E676" strokeWidth="1"
              opacity={i % 2 === 0 ? 0.55 : 0.25} />
          </g>
        ))}

        {/* Top pins */}
        {[100, 126, 154, 180].map((x, i) => (
          <g key={i}>
            <rect x={x - 3} y="74" width="6" height="34" rx="1" fill="#00E676" opacity="0.85" />
            <line x1={x} y1="0" x2={x} y2="74" stroke="#00E676" strokeWidth="1"
              opacity={i % 2 === 0 ? 0.5 : 0.22} />
          </g>
        ))}

        {/* Bottom pins */}
        {[100, 126, 154, 180].map((x, i) => (
          <g key={i}>
            <rect x={x - 3} y="216" width="6" height="34" rx="1" fill="#00E676" opacity="0.85" />
            <line x1={x} y1="250" x2={x} y2="360" stroke="#00E676" strokeWidth="1"
              opacity={i % 2 === 0 ? 0.5 : 0.22} />
          </g>
        ))}

        {/* Corner solder pads */}
        {[[72, 108], [208, 108], [72, 216], [208, 216]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" fill="#00E676" opacity="0.6" />
        ))}

        {/* Diagonal trace accent */}
        <path d="M 0 300 L 72 216" stroke="#00E676" strokeWidth="1.5" opacity="0.3" />
        <path d="M 280 300 L 208 216" stroke="#00E676" strokeWidth="1.5" opacity="0.3" />
      </svg>

      {/* Bottom label */}
      <div className="absolute bottom-5 left-5 right-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon opacity-60">
          Flasheo & Chipeo
        </span>
      </div>
    </div>
  );
}

function ReparacionArt() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(155deg, #1c0800 0%, #451a00 50%, #78350f 100%)" }}
    >
      <svg
        viewBox="0 0 280 360"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {/* Board outline (open console) */}
        <rect x="30" y="170" width="220" height="150" rx="6"
          fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.25" />
        <rect x="50" y="190" width="80" height="55" rx="3"
          fill="#451a00" stroke="#fbbf24" strokeWidth="0.8" opacity="0.4" />
        <rect x="148" y="190" width="80" height="55" rx="3"
          fill="#451a00" stroke="#fbbf24" strokeWidth="0.8" opacity="0.4" />

        {/* Circuit dots on board */}
        {[60, 80, 100, 160, 185, 210].map((cx) =>
          [205, 225, 238].map((cy) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5"
              fill="#fbbf24" opacity="0.35" />
          ))
        )}
        {/* Connector pins */}
        {[52, 60, 68, 76, 84, 92].map((x) => (
          <rect key={x} x={x} y="316" width="4" height="10" rx="1"
            fill="#fbbf24" opacity="0.5" />
        ))}

        {/* Wrench — diagonal, dominant */}
        <g transform="translate(140, 140) rotate(-35)">
          {/* Handle */}
          <rect x="-8" y="0" width="16" height="80" rx="8"
            fill="#fbbf24" opacity="0.9" />
          {/* Head */}
          <rect x="-20" y="-28" width="40" height="30" rx="6"
            fill="#d97706" opacity="0.95" />
          {/* Jaw opening */}
          <rect x="-6" y="-28" width="12" height="16" rx="2"
            fill="#1c0800" />
          {/* Highlight */}
          <rect x="-18" y="-26" width="6" height="20" rx="3"
            fill="white" opacity="0.12" />
        </g>

        {/* Screwdriver — cross diagonal */}
        <g transform="translate(95, 75) rotate(30)">
          <rect x="-3" y="-90" width="6" height="110" rx="3"
            fill="#92400e" opacity="0.9" />
          {/* Tip */}
          <polygon points="-4,20 4,20 2,32 -2,32"
            fill="#d97706" opacity="0.9" />
          {/* Handle grip */}
          <rect x="-7" y="-90" width="14" height="40" rx="5"
            fill="#fbbf24" opacity="0.75" />
        </g>

        {/* Amber glow spot */}
        <ellipse cx="140" cy="150" rx="60" ry="40"
          fill="#f59e0b" opacity="0.08" />

        {/* Spark lines */}
        {[
          [140, 120, 165, 95], [140, 120, 110, 85], [140, 120, 170, 105],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
        ))}
      </svg>

      <div className="absolute bottom-5 left-5 right-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300 opacity-60">
          Reparación
        </span>
      </div>
    </div>
  );
}

function MantenimientoArt() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(155deg, #040e1a 0%, #0c2340 55%, #1e3a5f 100%)" }}
    >
      <svg
        viewBox="0 0 280 360"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {/* Temperature gauge / arc motif */}
        <g transform="translate(140, 200)">
          {/* Outer arcs — concentric */}
          {[110, 85, 60, 35].map((r, i) => (
            <path
              key={r}
              d={`M ${-r * Math.cos(Math.PI * 0.15)} ${-r * Math.sin(Math.PI * 0.85)}
                  A ${r} ${r} 0 1 1 ${r * Math.cos(Math.PI * 0.15)} ${-r * Math.sin(Math.PI * 0.85)}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={i === 0 ? 1.5 : 1}
              opacity={[0.7, 0.4, 0.25, 0.15][i]}
              strokeLinecap="round"
            />
          ))}

          {/* Needle */}
          <line x1="0" y1="0" x2="-45" y2="-78"
            stroke="#38bdf8" strokeWidth="2" opacity="0.9" strokeLinecap="round" />
          <circle cx="0" cy="0" r="5" fill="#38bdf8" opacity="0.9" />
          <circle cx="0" cy="0" r="2.5" fill="white" opacity="0.8" />

          {/* Tick marks */}
          {[-60, -30, 0, 30, 60].map((angle) => {
            const rad = (angle - 90) * (Math.PI / 180);
            return (
              <line
                key={angle}
                x1={Math.cos(rad) * 95} y1={Math.sin(rad) * 95}
                x2={Math.cos(rad) * 110} y2={Math.sin(rad) * 110}
                stroke="#38bdf8" strokeWidth="2" opacity="0.5"
              />
            );
          })}
        </g>

        {/* Spray / particle dots */}
        {[
          [60, 80, 0.7], [85, 55, 0.5], [110, 40, 0.4], [45, 110, 0.5],
          [200, 70, 0.6], [225, 50, 0.4], [215, 95, 0.5], [240, 110, 0.3],
          [155, 35, 0.55], [175, 20, 0.4], [130, 25, 0.45],
        ].map(([cx, cy, op], i) => (
          <circle key={i} cx={cx} cy={cy} r="3"
            fill="#38bdf8" opacity={op} />
        ))}

        {/* Clean diagonal sweep lines */}
        {[0, 25, 50].map((offset) => (
          <line
            key={offset}
            x1={offset} y1="0"
            x2={offset + 60} y2="360"
            stroke="#38bdf8" strokeWidth="0.8"
            opacity="0.06"
          />
        ))}

        {/* "TEMP" label */}
        <text x="140" y="310" textAnchor="middle"
          fontFamily="monospace" fontSize="9" fill="#38bdf8" opacity="0.5" letterSpacing="3">
          THERMAL CONTROL
        </text>
      </svg>

      <div className="absolute bottom-5 left-5 right-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-300 opacity-60">
          Mantenimiento
        </span>
      </div>
    </div>
  );
}

const SERVICE_ART: Record<string, React.ReactNode> = {
  flasheo:      <FlasheoArt />,
  reparacion:   <ReparacionArt />,
  mantenimiento: <MantenimientoArt />,
};

// ── Main component ──────────────────────────────────────────────────────────

export function SeccionServicios() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="py-28 lg:py-36 bg-paper-2 border-t border-[rgba(10,10,10,0.07)]"
      aria-label="Servicios técnicos"
    >
      <div className="container-ds">

        {/* ── Section header — centered ── */}
        <div className="text-center mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-grey-2 mb-4">
            Servicio técnico
          </p>
          <h2
            className="font-display font-bold text-ink tracking-tight"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
          >
            Lo que no funciona,
            <br />
            lo reparamos.
          </h2>
        </div>

        {/* ── Service cards grid — 3 columns, centered ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {servicesData.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} reducedMotion={!!reducedMotion} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Service card with 3D hover tilt ──────────────────────────────────────

interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  badge: string;
  priceFrom: number;
  turnaround: string;
}

function ServiceCard({
  service,
  index,
  reducedMotion,
}: {
  service: Service;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.52, ease: EASE_OUT, delay: index * 0.1 }}
      style={{ perspective: "900px" }}
    >
      <motion.div
        whileHover={
          reducedMotion
            ? {}
            : {
                rotateY: -4,
                rotateX: 2,
                scale: 1.02,
                boxShadow: "0 24px 64px rgba(109,40,217,0.20)",
              }
        }
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Link
          href={`/servicios/${service.slug}`}
          className={cn(
            "group block rounded-[6px] overflow-hidden",
            "border border-[rgba(10,10,10,0.10)] bg-paper",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          )}
        >
          {/* Visual art — aspect 4:5 */}
          <div className="relative aspect-[4/5] overflow-hidden">
            {SERVICE_ART[service.id] ?? (
              <div className="absolute inset-0 bg-paper-3" />
            )}
          </div>

          {/* Text area */}
          <div className="p-6 flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-grey-2">
              {service.badge}
            </span>
            <h3
              className={cn(
                "font-display font-bold text-ink text-[20px] leading-tight",
                "group-hover:text-violet transition-colors"
              )}
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              {service.title}
            </h3>
            <p className="font-body text-[14px] text-grey-1 leading-relaxed line-clamp-2">
              {service.shortDescription}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-[rgba(10,10,10,0.07)] mt-1">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-grey-2 block mb-0.5">
                  Desde
                </span>
                <span className="font-mono text-[16px] font-medium text-ink">
                  {formatPrice(service.priceFrom)}
                </span>
              </div>
              <span className="font-mono text-[10px] text-grey-2 uppercase tracking-[0.1em]">
                {service.turnaround}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
