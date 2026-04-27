"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const PLATFORM_LINKS = [
  { label: "PlayStation 5", href: "/catalogo?platform=PS5" },
  { label: "PlayStation 4", href: "/catalogo?platform=PS4" },
  { label: "Xbox Series",   href: "/catalogo?platform=Xbox" },
  { label: "Nintendo Switch", href: "/catalogo?platform=Switch" },
  { label: "Retro",         href: "/catalogo?platform=Retro" },
  { label: "PC & Periféricos", href: "/catalogo?platform=PC" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
      {/* Purple top accent */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(168,85,247,0.3), transparent)" }} />

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="#A855F7" fillOpacity="0.15"/>
                <rect x="0.5" y="0.5" width="27" height="27" rx="5.5" stroke="#A855F7" strokeOpacity="0.3"/>
                <path d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="14" cy="14" r="2" fill="#A855F7"/>
                <path d="M10 17h1.5M16.5 17H18" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="0.75" fill="#F0EDE8" fillOpacity="0.5"/>
                <circle cx="17" cy="11" r="0.75" fill="#F0EDE8" fillOpacity="0.5"/>
              </svg>
              <span className="font-semibold text-[0.95rem] tracking-[-0.02em]" style={{ fontFamily: "var(--font-geist, sans-serif)", color: "var(--color-text)" }}>
                Spot<span style={{ color: "#A855F7" }}>Games</span>
              </span>
            </Link>
            <p className="text-[0.84rem] leading-relaxed max-w-[280px] mb-6" style={{ color: "var(--color-text-dim)" }}>
              Tu local de videojuegos en Buenos Aires. Juegos nuevos y usados, consolas, accesorios y servicios de reparación.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/spotgames.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded transition-colors"
                style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-text-dim)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; e.currentTarget.style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-dim)"; }}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://wa.me/541157649264"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded transition-colors"
                style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-text-dim)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(74,222,128,0.4)"; e.currentTarget.style.color = "var(--color-green)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-dim)"; }}
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--color-text-muted)" }}>
              Navegación
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.84rem] transition-colors"
                    style={{ color: "var(--color-text-dim)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-dim)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plataformas */}
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--color-text-muted)" }}>
              Plataformas
            </p>
            <ul className="space-y-2">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.84rem] transition-colors"
                    style={{ color: "var(--color-text-dim)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-dim)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.72rem]" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            © 2025 SpotGames
          </p>
          <p className="text-[0.72rem]" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            Buenos Aires · Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
