"use client";

export default function ContactoPage() {
  return (
    <div className="min-h-screen pb-20 px-6" style={{ paddingTop: "7rem" }}>
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-16 pb-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <p
            className="font-bold uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--color-text-muted)" }}
          >
            Hablemos
          </p>
          <h1
            className="font-bold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.04em",
            }}
          >
            Contacto
          </h1>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
          {/* WhatsApp */}
          <a
            href="https://wa.me/541157649264"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 p-10 transition-colors duration-300"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-surface-2)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
            }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center rounded-[10px]"
              style={{
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.2)",
                color: "var(--color-green)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h2
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-text)", letterSpacing: "-0.025em" }}
              >
                WhatsApp
              </h2>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-text-dim)" }}
              >
                La forma más rápida de contactarnos. Respondemos todos los días en horario de atención.
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.84rem", color: "var(--color-green)" }}>
                +54 11 5764-9264
              </p>
            </div>
            <div
              className="mt-auto flex items-center gap-2 font-semibold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-green)" }}
            >
              Abrir chat
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/spotgames.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 p-10 transition-colors duration-300"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-surface-2)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
            }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center rounded-[10px]"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.2)",
                color: "var(--color-purple)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <div>
              <h2
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-text)", letterSpacing: "-0.025em" }}
              >
                Instagram
              </h2>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-text-dim)" }}
              >
                Seguinos para ver novedades, stock, ofertas y todo lo que pasa en Spot Games.
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.84rem", color: "var(--color-purple)" }}>
                @spotgames.ar
              </p>
            </div>
            <div
              className="mt-auto flex items-center gap-2 font-semibold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-purple)" }}
            >
              Ver perfil
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </div>
          </a>
        </div>

        {/* Hours */}
        <div className="p-8" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <h2
            className="font-bold mb-6 uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-text-muted)" }}
          >
            Horarios de atención
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {[
              { day: "Lunes a Viernes", hours: "10:00 — 19:00" },
              { day: "Sábados",         hours: "10:00 — 15:00" },
              { day: "Domingos",        hours: "Cerrado" },
              { day: "WhatsApp",        hours: "Siempre disponible" },
            ].map((h) => (
              <div
                key={h.day}
                className="flex justify-between items-center py-3"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--color-text-muted)" }}>
                  {h.day}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.84rem",
                    color: h.hours === "Cerrado" ? "var(--color-text-muted)" : "var(--color-text)",
                  }}
                >
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
