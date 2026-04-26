"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-terminal", { opacity: 0, y: -20, duration: 0.5 })
        .from(".hero-badge", { opacity: 0, x: -30, duration: 0.5 }, "-=0.2")
        .from(".hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.2")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.3")
        .from(".hero-stat", { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, "-=0.2")
        .from(".hero-visual", { opacity: 0, scale: 0.9, duration: 1 }, "-=1.2")
        .from(".hero-hud", { opacity: 0, scale: 0, stagger: 0.1, duration: 0.4 }, "-=0.5");

      gsap.to(".hud-float-1", { y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hud-float-2", { y: 10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hud-float-3", { y: -8, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12"
    >
      {/* Terminal bar superior */}
      <div className="hero-terminal absolute top-24 left-0 right-0 px-8 flex items-center justify-between font-tech text-xs text-grape z-20">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ctrl animate-blink" />
            ONLINE
          </span>
          <span className="text-muted">SYS://SPOTGAMES.AR</span>
          <span className="text-muted hidden md:inline">LAT: -34.6037 / LON: -58.3816</span>
        </div>
        <div className="text-muted hidden md:block">
          [ BUENOS_AIRES.ARG // GAMING_HUB_v2.0 ]
        </div>
      </div>

      <div className="container mx-auto px-8 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center relative z-10 mt-12">
        {/* IZQUIERDA — Contenido */}
        <div>
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-grape/40 bg-grape/5 font-tech text-xs text-grape uppercase tracking-widest clip-corner-tr">
            <span className="w-1.5 h-1.5 bg-ctrl rounded-full animate-blink" />
            Buenos Aires · Nuevos · Usados · Retro
          </div>

          <h1
            className="hero-title font-display font-bold leading-[0.95] mb-6 tracking-tight"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
          >
            <span className="block text-white">TU PRÓXIMA</span>
            <span
              className="glitch block neon-text-grape"
              data-text="PARTIDA"
            >
              PARTIDA
            </span>
            <span className="block text-white">
              EMPIEZA{" "}
              <span className="neon-text-ctrl">ACÁ.</span>
            </span>
          </h1>

          <p className="hero-sub font-body text-muted text-lg max-w-xl mb-8 leading-relaxed">
            Juegos nuevos y usados, consolas, accesorios y retro. El mejor
            precio, el mejor stock, en un solo lugar.{" "}
            <span className="text-grape font-tech text-sm">[ INSERT COIN ]</span>
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/productos"
              className="hero-cta group relative px-7 py-3.5 bg-grape text-void font-tech text-sm font-bold uppercase tracking-widest clip-corner-tr hover:bg-grape-glow transition-all duration-300 inline-flex items-center gap-2"
            >
              ▶ Ver Catálogo
            </Link>
            <a
              href="https://wa.me/541157649264"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta px-7 py-3.5 border-2 border-ctrl text-ctrl font-tech text-sm font-bold uppercase tracking-widest hover:bg-ctrl/10 transition-colors duration-300 inline-flex items-center gap-2"
            >
              WhatsApp →
            </a>
          </div>

          {/* Stats HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "+500", label: "CLIENTES" },
              { val: "+1K", label: "TÍTULOS" },
              { val: "5Y", label: "EXP" },
              { val: "30D", label: "GARANTÍA" },
            ].map((s, i) => (
              <div key={i} className="hero-stat hud-corners p-3">
                <div className="font-tech text-2xl text-grape font-bold">{s.val}</div>
                <div className="font-tech text-[10px] text-muted uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DERECHA — Visual */}
        <div className="hero-visual relative aspect-square max-w-lg lg:ml-auto hidden lg:block">
          <div className="relative w-full h-full clip-cyber border-2 border-grape/60 overflow-hidden glow-grape">
            <Image
              src="https://images.unsplash.com/photo-1709587797209-7f3015fc8d35?w=900&q=80&auto=format&fit=crop"
              alt="PS5 setup"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 0px, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(168,85,247,0.3), transparent)",
                mixBlendMode: "overlay",
              }}
            />
          </div>

          {/* HUD floaters */}
          <div className="hero-hud hud-float-1 absolute -top-4 -left-4 px-3 py-2 bg-void border border-ctrl font-tech text-[10px] text-ctrl uppercase tracking-widest z-10">
            ▲ STOCK: ONLINE
          </div>
          <div className="hero-hud hud-float-2 absolute top-1/3 -right-6 px-3 py-2 bg-void border border-grape font-tech text-[10px] text-grape uppercase tracking-widest z-10">
            $ ARS / USD
          </div>
          <div className="hero-hud hud-float-3 absolute -bottom-4 left-8 px-3 py-2 bg-void border border-pink font-tech text-[10px] text-pink uppercase tracking-widest z-10">
            ★ HOT DEALS
          </div>

          {/* Crosshair decorativo */}
          <svg
            className="absolute -top-8 -right-8 w-16 h-16 text-grape opacity-60"
            viewBox="0 0 64 64"
            fill="none"
          >
            <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" />
            <line x1="32" y1="0" x2="32" y2="20" stroke="currentColor" strokeWidth="1" />
            <line x1="32" y1="44" x2="32" y2="64" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="32" x2="20" y2="32" stroke="currentColor" strokeWidth="1" />
            <line x1="44" y1="32" x2="64" y2="32" stroke="currentColor" strokeWidth="1" />
            <circle cx="32" cy="32" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-grape/60 animate-blink z-10">
        ▼ SCROLL ▼
      </div>
    </section>
  );
}
