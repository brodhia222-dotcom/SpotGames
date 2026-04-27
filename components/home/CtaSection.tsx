"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMagnetic } from "@/lib/magneticEffect";

void ScrollTrigger;

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const waRef = useMagnetic(0.3);
  const igRef = useMagnetic(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-inner", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: ".cta-inner", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <div className="cta-inner">
          <p
            className="text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-6"
            style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}
          >
            Hablemos
          </p>
          <h2
            className="font-bold leading-[1.05] tracking-[-0.03em] mb-4 mx-auto"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "var(--color-text)",
              maxWidth: 600,
            }}
          >
            ¿Listo para tu próxima{" "}
            <span style={{ color: "var(--color-purple)" }}>partida</span>?
          </h2>
          <p
            className="text-[0.9rem] leading-relaxed mb-10 mx-auto"
            style={{ color: "var(--color-text-dim)", maxWidth: 420 }}
          >
            Escribinos por WhatsApp o seguinos en Instagram para novedades, precios y sorteos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              ref={waRef}
              href="https://wa.me/541157649264"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribinos por WhatsApp
            </a>
            <a
              ref={igRef}
              href="https://www.instagram.com/spotgames.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Seguinos en Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
