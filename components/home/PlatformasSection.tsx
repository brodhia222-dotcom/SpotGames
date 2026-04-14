"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const platforms = [
  {
    name: "PlayStation 5",
    short: "PS5",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.35)",
    query: "PS5",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <text x="4" y="34" fontSize="28" fontWeight="700" fill="#A78BFA" fontFamily="system-ui">PS5</text>
      </svg>
    ),
  },
  {
    name: "Xbox Series",
    short: "XBOX",
    color: "#22C55E",
    glow: "rgba(34,197,94,0.35)",
    query: "Xbox",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="#22C55E" strokeWidth="3"/>
        <path d="M13 16c2 3 6 8 11 11s9 4 11 2M35 16c-2 3-6 8-11 11S15 31 13 29" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Nintendo Switch",
    short: "SWITCH",
    color: "#EF4444",
    glow: "rgba(239,68,68,0.35)",
    query: "Switch",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="28" rx="6" stroke="#F87171" strokeWidth="2.5"/>
        <rect x="6" y="10" width="13" height="28" rx="6" fill="#EF4444" fillOpacity="0.25"/>
        <rect x="29" y="10" width="13" height="28" rx="6" fill="#4ADE80" fillOpacity="0.25"/>
        <circle cx="14" cy="24" r="4" fill="#F87171"/>
        <rect x="31" y="21" width="2" height="6" rx="1" fill="#4ADE80"/>
        <rect x="28.5" y="23.5" width="7" height="2" rx="1" fill="#4ADE80"/>
      </svg>
    ),
  },
  {
    name: "Retro & Clásicos",
    short: "RETRO",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.35)",
    query: "Retro",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="14" width="32" height="22" rx="5" stroke="#FCD34D" strokeWidth="2.5"/>
        <rect x="18" y="22" width="2" height="8" rx="1" fill="#FCD34D"/>
        <rect x="15" y="25" width="8" height="2" rx="1" fill="#FCD34D"/>
        <circle cx="32" cy="24" r="2.2" fill="#FCD34D"/>
        <circle cx="37" cy="24" r="2.2" fill="#FCD34D"/>
        <circle cx="32" cy="29" r="2.2" fill="#FCD34D"/>
        <circle cx="37" cy="29" r="2.2" fill="#FCD34D"/>
      </svg>
    ),
  },
  {
    name: "Accesorios",
    short: "ACCES.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.35)",
    query: "Accesorios",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M10 18h6v12H10zM32 18h6v12h-6z" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 24h16M16 20a8 8 0 000 8" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M32 20a8 8 0 010 8" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="21" cy="22" r="1.5" fill="#C4B5FD"/>
        <circle cx="27" cy="22" r="1.5" fill="#C4B5FD"/>
        <circle cx="21" cy="27" r="1.5" fill="#C4B5FD"/>
        <circle cx="27" cy="27" r="1.5" fill="#C4B5FD"/>
      </svg>
    ),
  },
];

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 28, scale: 0.92 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { ease: "easeOut", duration: 0.45 },
  },
};
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PlatformasSection() {
  return (
    <section className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ease: "easeOut", duration: 0.4 }}
          className="text-center font-display font-semibold text-xs uppercase tracking-widest text-subtle mb-6"
        >
          Lo que encontrás en Spot Games
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {platforms.map((p) => (
            <motion.div key={p.name} variants={itemVariants}>
              <Link
                href={`/productos?plataforma=${p.query}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface border border-border cursor-pointer transition-all duration-300 hover:border-transparent hover:-translate-y-1"
                style={
                  {
                    "--glow": p.glow,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 24px ${p.glow}, 0 8px 32px rgba(0,0,0,0.4)`;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${p.color}50`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "";
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}
                >
                  {p.icon}
                </div>
                <div className="text-center">
                  <p className="font-display font-bold text-sm text-text leading-tight">{p.name}</p>
                  <p
                    className="font-display font-bold text-xs mt-0.5"
                    style={{ color: p.color }}
                  >
                    Ver productos →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
