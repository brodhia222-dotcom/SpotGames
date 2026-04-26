"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATS = [
  { value: 500, suffix: "+", label: "Clientes satisfechos" },
  { value: 1000, suffix: "+", label: "Títulos en stock" },
  { value: 5, suffix: "", label: "Años de experiencia" },
  { value: 30, suffix: "d", label: "Garantía en usados" },
];

export default function NosotrosPage() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = statsRef.current?.querySelectorAll(".stat-number")[i] as HTMLElement;
        if (!el) return;
        gsap.from(
          { val: 0 },
          {
            val: stat.value,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val) + stat.suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, statsRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-display font-semibold text-xs uppercase tracking-widest text-grape mb-4">
              Nuestra historia
            </p>
            <h1
              className="font-display font-bold text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Somos
              <br />
              <span className="text-grape">Spot Games.</span>
            </h1>
            <div className="space-y-4 font-body text-muted leading-relaxed">
              <p>
                Spot Games nació de una simple idea: crear el local de videojuegos que siempre quisimos tener cerca. Un lugar donde encontrás lo nuevo, lo usado y lo retro, con el asesoramiento de alguien que realmente sabe de qué habla.
              </p>
              <p>
                Empezamos en 2020 con un stock pequeño y las ganas de construir algo diferente. Hoy somos el punto de referencia para gamers de Buenos Aires que buscan precios justos, calidad garantizada y atención real.
              </p>
              <p>
                Reparamos consolas, hacemos trade-in, conseguimos lo que no encontrás y enviamos a todo el país. Pero sobre todo, somos gamers como vos.
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div
              className="aspect-square bg-surface-2 border border-border flex items-center justify-center"
              style={{
                background: "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, #0D0818 70%)",
              }}
            >
              <div className="text-center">
                <div className="float-anim inline-block">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                  >
                    <circle cx="60" cy="76" r="18" fill="#A855F7" />
                    <circle cx="40" cy="62" r="16" fill="#A855F7" />
                    <circle cx="80" cy="62" r="16" fill="#A855F7" />
                    <circle cx="50" cy="42" r="14" fill="#7C3AED" />
                    <circle cx="70" cy="42" r="14" fill="#7C3AED" />
                    <circle cx="60" cy="24" r="12" fill="#6D28D9" />
                    <path d="M60 10 Q72 15 68 28" stroke="#92400E" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <rect x="22" y="5" width="30" height="18" rx="5" fill="#4ADE80" />
                    <circle cx="28" cy="14" r="2.5" fill="white" />
                    <circle cx="45" cy="14" r="2.5" fill="white" />
                    <circle cx="37" cy="9" r="2.5" fill="white" />
                    <circle cx="37" cy="19" r="2.5" fill="white" />
                  </svg>
                </div>
                <p className="font-display font-bold text-3xl text-white mt-4 uppercase tracking-widest neon-text">
                  Spot Games
                </p>
                <p className="font-body text-sm text-muted mt-2">Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface p-8 text-center"
              >
                <p
                  className="stat-number font-tech font-bold text-4xl text-grape neon-text"
                >
                  0{stat.suffix}
                </p>
                <p className="font-body text-sm text-muted mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2
          className="font-display font-bold text-white uppercase mb-12"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Lo que nos define
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            {
              title: "Honestidad",
              description: "Precios justos, diagnósticos reales y sin letra chica. Si algo no tiene arreglo, te lo decimos.",
            },
            {
              title: "Pasión",
              description: "Somos gamers antes que vendedores. Eso se nota en cada recomendación que hacemos.",
            },
            {
              title: "Comunidad",
              description: "Cada cliente es parte de algo más grande. Construimos la comunidad gamer que queremos ser.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-surface p-8 group hover:bg-surface-2 transition-colors duration-300">
              <div className="w-1 h-8 bg-grape mb-6" />
              <h3 className="font-display font-bold text-xl text-white uppercase mb-3">{v.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-grape/30 bg-surface-2 p-12 text-center"
          style={{ background: "radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, #18102E 100%)" }}>
          <h2 className="font-display font-bold text-2xl text-white uppercase mb-4">
            ¿Querés saber más?
          </h2>
          <p className="font-body text-muted mb-8">
            Seguinos en Instagram o escribinos por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/541157649264"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ctrl/10 border border-ctrl text-ctrl font-display font-bold text-sm uppercase tracking-widest hover:bg-ctrl/20 transition-all duration-300 ctrl-border"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/spotgames.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-muted font-display font-bold text-sm uppercase tracking-widest hover:border-grape hover:text-grape transition-all duration-300"
            >
              @spotgames.ar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
