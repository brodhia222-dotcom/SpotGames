"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { RepairIcon, TradeIcon, RetroIcon } from "@/components/ui/GamingIcon";

void ScrollTrigger;

const services = [
  {
    Icon: RepairIcon,
    num: "01",
    title: "REPARACIÓN DE CONSOLAS",
    desc: "Diagnóstico profesional y reparación garantizada.",
    price: "Desde $8.000",
    color: "#A855F7",
  },
  {
    Icon: TradeIcon,
    num: "02",
    title: "TRADE-IN",
    desc: "Cambiá lo que ya no usás por lo que querés.",
    price: "Tasación al instante",
    color: "#4ADE80",
  },
  {
    Icon: RetroIcon,
    num: "03",
    title: "USADOS & RETRO",
    desc: "Stock de joyas retro con garantía de 30 días.",
    price: "SNES · N64 · PS1",
    color: "#F59E0B",
  },
];

export default function ServiciosHighlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".servicio-card", {
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".servicios-grid",
          start: "top 80%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="font-tech text-xs text-grape uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="block w-8 h-px bg-grape" />
              [ 03 ] SERVICIOS
            </div>
            <h2
              className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              <span className="text-white">MÁS QUE </span>
              <span className="neon-text-grape">UNA TIENDA.</span>
            </h2>
          </div>
          <Link
            href="/servicios"
            className="font-tech text-xs uppercase tracking-widest text-grape hover:text-grape-glow flex items-center gap-2 group"
          >
            TODOS LOS SERVICIOS{" "}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="servicios-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.num}
              className="servicio-card group relative bg-surface border border-border p-7 transition-all duration-500 hover:border-transparent overflow-hidden"
            >
              {/* Número grande de fondo */}
              <div
                className="absolute -bottom-6 -right-2 font-tech font-bold text-[140px] leading-none opacity-[0.05] group-hover:opacity-20 transition-opacity duration-500 pointer-events-none select-none"
                style={{ color: s.color }}
              >
                {s.num}
              </div>

              {/* Glow border en hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${s.color}, 0 0 40px ${s.color}33`,
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 mb-6 flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
                style={{ borderColor: s.color, color: s.color }}
              >
                <s.Icon className="w-8 h-8" />
              </div>

              <div className="font-tech text-[10px] text-muted uppercase tracking-widest mb-2">
                /{s.num}/ SERVICIO
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-3">
                {s.title}
              </h3>

              <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                {s.desc}
              </p>

              <div
                className="font-tech text-sm font-bold mb-6"
                style={{ color: s.color }}
              >
                {s.price}
              </div>

              <a
                href="https://wa.me/541157649264"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest pb-1 border-b transition-colors group/link"
                style={{ color: s.color, borderColor: s.color }}
              >
                CONSULTAR{" "}
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
