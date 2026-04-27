"use client";

import Link from "next/link";
import { CATEGORIES, SERVICES } from "@/data/services";

const ICONS: Record<string, React.ReactNode> = {
  repair: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  flash: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  joystick: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M12 12v.01M8 10v4M10 12h-4M17 10h.01M19 12h.01"/>
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  ),
  trade: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
    </svg>
  ),
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen pb-20 px-6" style={{ paddingTop: "7rem" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="mb-16 pb-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <p
            className="font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--color-text-muted)" }}
          >
            Lo que hacemos
          </p>
          <h1
            className="font-bold leading-none mb-6 max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.04em",
            }}
          >
            Más que una tienda.
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-dim)" }}
          >
            Reparamos, flasheamos, mantenemos y asesoramos. Todo lo que necesitás para tu experiencia gaming está acá.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-20">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={cat.id.toLowerCase().replace("_", "")}
              className="group flex flex-col gap-4 p-7 transition-all duration-300"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = cat.color + "55";
                (e.currentTarget as HTMLElement).style.background = "var(--color-surface-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-[8px] flex-shrink-0 transition-colors duration-200"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-dim)",
                }}
              >
                {ICONS[cat.iconKey]}
              </div>

              <div>
                <p
                  className="font-bold mb-1 uppercase tracking-[0.04em]"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--color-text)" }}
                >
                  {cat.title}
                </p>
                <p
                  className="font-semibold mb-3 text-sm"
                  style={{ color: cat.color, fontFamily: "var(--font-body)" }}
                >
                  {cat.tagline}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-text-dim)" }}
                >
                  {cat.description}
                </p>
              </div>

              <a
                href={`https://wa.me/541157649264?text=${encodeURIComponent(`Hola Spot Games! Consulta sobre ${cat.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 w-fit transition-opacity duration-200 hover:opacity-70"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: cat.color,
                  paddingTop: 8,
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar
              </a>
            </div>
          ))}
        </div>

        {/* Service catalog table */}
        {CATEGORIES.map((cat) => {
          const catServices = SERVICES.filter((s) => s.category === cat.id);
          return (
            <div key={cat.id} className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-0.5 h-7 rounded-full" style={{ background: cat.color }} />
                <h3
                  className="font-bold"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: cat.color, letterSpacing: "-0.02em" }}
                >
                  {cat.title}
                </h3>
                <span
                  className="ml-2"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-text-muted)" }}
                >
                  {catServices.length} servicios
                </span>
              </div>

              <div style={{ border: "1px solid var(--color-border)", overflow: "hidden" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface-2)" }}>
                      <th
                        className="text-left px-4 py-3 uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-text-muted)" }}
                      >
                        Servicio
                      </th>
                      <th
                        className="text-left px-4 py-3 uppercase tracking-[0.12em] hidden md:table-cell"
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-text-muted)" }}
                      >
                        Descripción
                      </th>
                      <th
                        className="text-right px-4 py-3 uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-text-muted)" }}
                      >
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {catServices.map((s, i) => (
                      <tr
                        key={s.id}
                        style={{
                          borderBottom: i < catServices.length - 1 ? "1px solid var(--color-border)" : "none",
                          background: i % 2 !== 0 ? "var(--color-surface-2)" : "transparent",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-surface-2)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 !== 0 ? "var(--color-surface-2)" : "transparent")}
                      >
                        <td
                          className="px-4 py-3 font-medium"
                          style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}
                        >
                          {s.name}
                        </td>
                        <td
                          className="px-4 py-3 hidden md:table-cell"
                          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-dim)" }}
                        >
                          {s.description}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap" style={{ fontFamily: "var(--font-mono)" }}>
                          {s.priceFrom ? (
                            <>
                              <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>Desde </span>
                              <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "var(--color-text)" }}>ARS {s.priceFrom.toLocaleString("es-AR")}</span>
                            </>
                          ) : (
                            <span style={{ fontSize: "0.72rem", color: "var(--color-text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Consultar</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Disclaimer */}
        <div
          className="p-6 flex items-start gap-4"
          style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
        >
          <p
            className="whitespace-nowrap mt-0.5 font-bold uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-text-muted)" }}
          >
            Nota
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-dim)" }}
          >
            Los precios publicados son valores de referencia y pueden variar según el modelo exacto, el estado de la consola y la disponibilidad de repuestos.{" "}
            <Link
              href="https://wa.me/541157649264"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-purple)" }}
              className="hover:opacity-70 transition-opacity"
            >
              Consultá por WhatsApp
            </Link>{" "}
            para un presupuesto preciso sin cargo.
          </p>
        </div>
      </div>
    </div>
  );
}
