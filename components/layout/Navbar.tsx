"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { CATEGORIES } from "@/data/services";

const PLATFORMS = [
  { slug: "PS5",    label: "PlayStation 5",    color: "#006FCD", count: 47 },
  { slug: "PS4",    label: "PlayStation 4",    color: "#0050A0", count: 35 },
  { slug: "Xbox",   label: "Xbox Series",      color: "#107C10", count: 31 },
  { slug: "Switch", label: "Nintendo Switch",  color: "#E60012", count: 58 },
  { slug: "Retro",  label: "Retro",             color: "#C49A6C", count: 83 },
  { slug: "PC",     label: "PC & Periféricos", color: "#4ADE80", count: 22 },
];

const PRODUCT_CATEGORIES = [
  { label: "Juegos",     param: "Juegos" },
  { label: "Consolas",   param: "Consolas" },
  { label: "Accesorios", param: "Accesorios" },
  { label: "Retro",      param: "Retro" },
];

function SpotGamesLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
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
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<null | "catalogo" | "servicios">(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<null | "catalogo" | "servicios">(null);
  const [previewPlatform, setPreviewPlatform] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openDrawer = useCartStore((s) => s.openDrawer);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const openMenu = (menu: "catalogo" | "servicios") => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMegaMenu(menu);
    setPreviewPlatform(null);
  };
  const scheduleClose = () => { closeTimerRef.current = setTimeout(() => setActiveMegaMenu(null), 120); };
  const cancelClose = () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); };

  const previewData = PLATFORMS.find((p) => p.slug === previewPlatform);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          background: isScrolled ? "rgba(10,10,11,0.94)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between gap-8">
          <SpotGamesLogo />

          <nav className="hidden md:flex items-center gap-1">
            {(["catalogo", "servicios"] as const).map((menu) => (
              <div key={menu} onMouseEnter={() => openMenu(menu)} onMouseLeave={scheduleClose}>
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded text-[0.84rem] font-medium transition-colors"
                  style={{
                    color: activeMegaMenu === menu ? "var(--color-text)" : "var(--color-text-dim)",
                    background: activeMegaMenu === menu ? "var(--color-surface-2)" : "transparent",
                  }}
                >
                  {menu === "catalogo" ? "Catálogo" : "Servicios"}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5, transform: activeMegaMenu === menu ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
            <Link href="/nosotros" className="px-3 py-2 rounded text-[0.84rem] font-medium transition-colors" style={{ color: "var(--color-text-dim)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-dim)")}>
              Nosotros
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <Link href="/catalogo" className="hidden md:flex items-center justify-center w-9 h-9 rounded transition-colors" style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")} aria-label="Catálogo">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </Link>
            <button onClick={openDrawer} className="relative flex items-center justify-center w-9 h-9 rounded transition-colors" style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")} aria-label={`Carrito ${totalItems}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1h2l1.5 8h8l1.5-6H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6.5" cy="12.5" r="1" fill="currentColor"/><circle cx="11.5" cy="12.5" r="1" fill="currentColor"/></svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ background: "var(--color-purple)", fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden flex items-center justify-center w-9 h-9 rounded ml-1" style={{ color: "var(--color-text-dim)" }} onClick={() => setIsMobileOpen(true)} aria-label="Abrir menú">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mega-menu panel */}
      <div
        className="fixed top-16 left-0 right-0 z-40 transition-all duration-200"
        style={{ opacity: activeMegaMenu ? 1 : 0, pointerEvents: activeMegaMenu ? "auto" : "none", transform: activeMegaMenu ? "translateY(0)" : "translateY(-8px)" }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {/* Catálogo */}
        <div style={{ background: "rgba(10,10,11,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: activeMegaMenu === "catalogo" ? "block" : "none" }}>
          <div className="max-w-[1400px] mx-auto px-6 py-8 grid gap-8" style={{ gridTemplateColumns: "200px 180px 160px 1fr" }}>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "var(--color-text-muted)" }}>Plataformas</p>
              <div className="space-y-0.5">
                {PLATFORMS.map((p) => (
                  <Link key={p.slug} href={`/catalogo?platform=${p.slug}`}
                    className="flex items-center justify-between gap-3 px-2 py-1.5 rounded transition-colors"
                    style={{ background: previewPlatform === p.slug ? "var(--color-surface-2)" : "transparent" }}
                    onMouseEnter={() => setPreviewPlatform(p.slug)}
                    onMouseLeave={() => setPreviewPlatform(null)}
                    onClick={() => setActiveMegaMenu(null)}>
                    <span className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}88` }} />
                      <span className="text-[0.84rem]" style={{ color: "var(--color-text-dim)" }}>{p.label}</span>
                    </span>
                    <span className="text-[0.65rem]" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{p.count}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "var(--color-text-muted)" }}>Categorías</p>
              <div className="space-y-0.5">
                {PRODUCT_CATEGORIES.map((c) => (
                  <Link key={c.param} href={`/catalogo?categoria=${c.param}`} className="block px-2 py-1.5 rounded text-[0.84rem] transition-colors" style={{ color: "var(--color-text-dim)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-dim)")}
                    onClick={() => setActiveMegaMenu(null)}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "var(--color-text-muted)" }}>Estado</p>
              <div className="space-y-0.5">
                {[{ label: "Nuevos", param: "Nuevo", color: "var(--color-green)" }, { label: "Usados", param: "Usado", color: "var(--color-text-muted)" }, { label: "Ofertas", param: "Oferta", color: "var(--color-purple)" }].map((s) => (
                  <Link key={s.param} href={`/catalogo?state=${s.param}`} className="flex items-center gap-2 px-2 py-1.5 rounded text-[0.84rem] transition-colors" style={{ color: "var(--color-text-dim)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-dim)")}
                    onClick={() => setActiveMegaMenu(null)}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />{s.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-start justify-end">
              {previewData ? (
                <div className="w-full max-w-[220px] rounded-lg overflow-hidden border transition-all duration-200" style={{ borderColor: `${previewData.color}33`, background: "var(--color-surface)" }}>
                  <div className="h-24 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${previewData.color}18, ${previewData.color}08)` }}>
                    <span className="w-4 h-4 rounded-full" style={{ background: previewData.color, boxShadow: `0 0 24px ${previewData.color}` }} />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-[0.8rem] mb-0.5" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>{previewData.label}</p>
                    <p className="text-[0.65rem]" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{previewData.count} productos disponibles</p>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[220px]">
                  <p className="text-[0.78rem] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>Explorá nuestro catálogo de más de 2.000 títulos, consolas y accesorios.</p>
                  <Link href="/catalogo" className="inline-flex items-center gap-1.5 mt-4 text-[0.75rem] font-semibold" style={{ color: "var(--color-purple)" }} onClick={() => setActiveMegaMenu(null)}>
                    Ver todo el catálogo <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div style={{ background: "rgba(10,10,11,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: activeMegaMenu === "servicios" ? "block" : "none" }}>
          <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-[280px_1fr] gap-12">
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "var(--color-text-muted)" }}>Nuestros servicios</p>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <Link key={cat.id} href={`/servicios#${cat.id.toLowerCase()}`}
                    className="flex items-start gap-3 px-2 py-2 rounded transition-colors"
                    onClick={() => setActiveMegaMenu(null)}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cat.color }} />
                    <div>
                      <p className="text-[0.84rem] font-medium" style={{ color: "var(--color-text)" }}>{cat.title}</p>
                      <p className="text-[0.72rem]" style={{ color: "var(--color-text-muted)" }}>{cat.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--color-text-muted)" }}>¿Tenés algo para reparar?</p>
                <p className="text-[0.84rem] leading-relaxed max-w-xs" style={{ color: "var(--color-text-dim)" }}>Diagnóstico sin cargo. Presupuesto en el momento. Garantía en cada trabajo.</p>
              </div>
              <div className="flex gap-3 mt-6">
                <a href="https://wa.me/541157649264?text=Hola%20Spot%20Games!%20Quiero%20consultar%20sobre%20servicios." target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" onClick={() => setActiveMegaMenu(null)}>Consultar por WhatsApp</a>
                <Link href="/servicios" className="btn btn-outline btn-sm" onClick={() => setActiveMegaMenu(null)}>Ver todos →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeMegaMenu && <div className="fixed inset-0 z-30" onClick={() => setActiveMegaMenu(null)} />}

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setIsMobileOpen(false)} />
          <div className="w-full max-w-[320px] h-full flex flex-col overflow-y-auto" style={{ background: "var(--color-surface)", borderLeft: "1px solid var(--color-border)" }}>
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--color-border)" }}>
              <SpotGamesLogo />
              <button onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center w-8 h-8 rounded" style={{ color: "var(--color-text-muted)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="flex-1 p-4 space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2.5 rounded text-left text-[0.9rem] font-medium"
                style={{ color: "var(--color-text)", background: mobileAccordion === "catalogo" ? "var(--color-surface-2)" : "transparent" }}
                onClick={() => setMobileAccordion(mobileAccordion === "catalogo" ? null : "catalogo")}>
                Catálogo
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5, transform: mobileAccordion === "catalogo" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {mobileAccordion === "catalogo" && (
                <div className="pl-4 space-y-0.5 pb-2">
                  {PLATFORMS.map((p) => (
                    <Link key={p.slug} href={`/catalogo?platform=${p.slug}`} className="flex items-center gap-2.5 px-3 py-2 rounded text-[0.84rem]" style={{ color: "var(--color-text-dim)" }} onClick={() => setIsMobileOpen(false)}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />{p.label}
                    </Link>
                  ))}
                  <Link href="/catalogo" className="flex items-center gap-2 px-3 py-2 text-[0.84rem] font-semibold" style={{ color: "var(--color-purple)" }} onClick={() => setIsMobileOpen(false)}>Ver todo →</Link>
                </div>
              )}
              <button className="w-full flex items-center justify-between px-3 py-2.5 rounded text-left text-[0.9rem] font-medium"
                style={{ color: "var(--color-text)", background: mobileAccordion === "servicios" ? "var(--color-surface-2)" : "transparent" }}
                onClick={() => setMobileAccordion(mobileAccordion === "servicios" ? null : "servicios")}>
                Servicios
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5, transform: mobileAccordion === "servicios" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {mobileAccordion === "servicios" && (
                <div className="pl-4 space-y-0.5 pb-2">
                  {CATEGORIES.map((cat) => (
                    <Link key={cat.id} href={`/servicios#${cat.id.toLowerCase()}`} className="flex items-center gap-2.5 px-3 py-2 rounded text-[0.84rem]" style={{ color: "var(--color-text-dim)" }} onClick={() => setIsMobileOpen(false)}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />{cat.title}
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/nosotros" className="block px-3 py-2.5 rounded text-[0.9rem] font-medium" style={{ color: "var(--color-text)" }} onClick={() => setIsMobileOpen(false)}>Nosotros</Link>
            </div>
            <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
              <a href="https://wa.me/541157649264" target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center" onClick={() => setIsMobileOpen(false)}>WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
