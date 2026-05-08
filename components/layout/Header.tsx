"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Fuse from "fuse.js";
import { ShoppingBag, Search, X, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { getCartCount } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";
import gamesData from "@/data/games.json";

import consolesData from "@/data/consoles.json";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

type MegaMenuType = "juegos" | "consolas" | "servicios";

// Module-level Fuse instances (stable across re-renders, rebuilt only on hot-reload)
const gamesFuse = new Fuse(gamesData, {
  keys: ["title", "developer", "publisher", "genre"],
  threshold: 0.35,
  includeScore: true,
});

const consolesFuse = new Fuse(consolesData, {
  keys: ["name", "brand", "generation"],
  threshold: 0.35,
  includeScore: true,
});

const navLinks: Array<{ label: string; href: string; menu: MegaMenuType | null }> = [
  { label: "Juegos",   href: "/juegos",            menu: "juegos" },
  { label: "Consolas", href: "/consolas",           menu: "consolas" },
  { label: "Servicios", href: "/servicios/flasheo", menu: "servicios" },
];

export function Header() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState<MegaMenuType | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cart counter — read on mount and on cart-change events
  useEffect(() => {
    setCartCount(getCartCount());
    const onCartChange = () => setCartCount(getCartCount());
    window.addEventListener("cart-change", onCartChange);
    return () => window.removeEventListener("cart-change", onCartChange);
  }, []);

  // Close overlays on navigation
  useEffect(() => {
    setMobileNavOpen(false);
    setSearchOpen(false);
    setMegaMenuOpen(null);
  }, [pathname]);

  // Focus search input when overlay opens; clear on close
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (mobileNavOpen) setMobileNavOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, mobileNavOpen]);

  // Mega menu hover bridge
  const openMegaMenu = useCallback((type: MegaMenuType) => {
    if (closeMenuTimeout.current) clearTimeout(closeMenuTimeout.current);
    setMegaMenuOpen(type);
  }, []);

  const scheduleMegaMenuClose = useCallback(() => {
    closeMenuTimeout.current = setTimeout(() => setMegaMenuOpen(null), 150);
  }, []);

  const cancelMegaMenuClose = useCallback(() => {
    if (closeMenuTimeout.current) clearTimeout(closeMenuTimeout.current);
  }, []);

  // Search results
  const gameResults =
    searchQuery.length > 1
      ? gamesFuse.search(searchQuery, { limit: 4 }).map((r) => r.item)
      : [];
  const consoleResults =
    searchQuery.length > 1
      ? consolesFuse.search(searchQuery, { limit: 2 }).map((r) => r.item)
      : [];
  const hasResults = gameResults.length > 0 || consoleResults.length > 0;

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all",
          scrolled
            ? "bg-ink/96 backdrop-blur-[8px] border-b border-[rgba(26,26,26,0.9)]"
            : "bg-transparent"
        )}
        style={{
          transitionDuration: "var(--dur-default)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      >
        <div className="container-ds">
          <div
            className={cn(
              "flex items-center justify-between transition-all",
              scrolled ? "h-16" : "h-20"
            )}
            style={{
              transitionDuration: "var(--dur-default)",
              transitionTimingFunction: "var(--ease-out)",
            }}
          >
            {/* Logo — inverted (paper/violet-soft) when header is dark */}
            <Link
              href="/"
              className="rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              aria-label="Spot Games — ir al inicio"
            >
              <Logo size="md" inverted className="text-[1.3rem]" />
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Navegación principal"
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href + "/")) ||
                  (link.menu === "servicios" && pathname.startsWith("/servicios")) ||
                  (link.menu === "juegos" && pathname.startsWith("/juegos"));
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() =>
                      link.menu ? openMegaMenu(link.menu) : setMegaMenuOpen(null)
                    }
                    onMouseLeave={link.menu ? scheduleMegaMenuClose : undefined}
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      aria-haspopup={link.menu ? "dialog" : undefined}
                      aria-expanded={link.menu ? megaMenuOpen === link.menu : undefined}
                      className={cn(
                        "relative group inline-flex items-center h-9 px-4 rounded-[3px]",
                        "font-body text-[15px] font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-1",
                        isActive
                          ? "text-violet"
                          : "text-paper/70 hover:text-paper"
                      )}
                      style={{ transitionDuration: "var(--dur-fast)" }}
                    >
                      {link.label}
                      {/* Underline grows left→right on hover; hidden when active */}
                      {!isActive && (
                        <span
                          aria-hidden
                          className="absolute bottom-1 left-4 right-4 h-px bg-violet scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
                          style={{
                            transitionDuration: "280ms",
                            transitionTimingFunction: "cubic-bezier(0.2,0.8,0.2,1)",
                          }}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Abrir buscador (⌘K)"
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-[3px] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet",
                  scrolled
                    ? "text-paper/60 hover:text-paper hover:bg-paper/10"
                    : "text-paper/60 hover:text-paper hover:bg-paper/10"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Cart */}
              <Link
                href="/carrito"
                aria-label={`Carrito — ${cartCount} ${cartCount === 1 ? "producto" : "productos"}`}
                className={cn(
                  "relative flex items-center justify-center w-9 h-9 rounded-[3px] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet",
                  scrolled
                    ? "text-paper/60 hover:text-paper hover:bg-paper/10"
                    : "text-paper/60 hover:text-paper hover:bg-paper/10"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="badge"
                      initial={!reducedMotion ? { scale: 0, opacity: 0 } : undefined}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={!reducedMotion ? { scale: 0, opacity: 0 } : undefined}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={cn(
                        "absolute -top-0.5 -right-0.5 pointer-events-none",
                        "min-w-[16px] h-4 px-[3px] rounded-full",
                        "bg-neon text-ink font-mono text-[9px] font-semibold",
                        "flex items-center justify-center leading-none"
                      )}
                      aria-hidden
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileNavOpen((p) => !p)}
                aria-label={mobileNavOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-nav"
                className={cn(
                  "flex lg:hidden items-center justify-center w-9 h-9 rounded-[3px] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet",
                  scrolled
                    ? "text-paper/60 hover:text-paper hover:bg-paper/10"
                    : "text-paper/60 hover:text-paper hover:bg-paper/10"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {mobileNavOpen ? (
                  <X size={18} strokeWidth={1.5} />
                ) : (
                  <Menu size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mega menu — fixed, outside the header to avoid stacking context issues */}
      <MegaMenu
        open={megaMenuOpen}
        scrolled={scrolled}
        onMouseEnter={cancelMegaMenuClose}
        onMouseLeave={() => setMegaMenuOpen(null)}
      />

      {/* ── Mobile nav overlay ── */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.nav
            id="mobile-nav"
            initial={!reducedMotion ? { opacity: 0, x: "100%" } : undefined}
            animate={{ opacity: 1, x: 0 }}
            exit={!reducedMotion ? { opacity: 0, x: "100%" } : undefined}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            aria-label="Navegación móvil"
            className="fixed inset-0 z-30 bg-paper flex flex-col pt-20 px-8 lg:hidden"
          >
            <ul className="flex flex-col mt-6 list-none">
              {[
                { label: "Juegos",   href: "/juegos" },
                { label: "Consolas", href: "/consolas" },
                { label: "Flasheo", href: "/servicios/flasheo" },
                { label: "Reparación", href: "/servicios/reparacion" },
                { label: "Mantenimiento", href: "/servicios/mantenimiento" },
                { label: "Carrito", href: "/carrito" },
              ].map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "flex items-center py-4 border-b border-[rgba(10,10,10,0.10)]",
                      "font-display text-2xl font-medium text-ink hover:text-violet transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                    )}
                    style={{
                      transitionDuration: "var(--dur-fast)",
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Search overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={!reducedMotion ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            exit={!reducedMotion ? { opacity: 0 } : undefined}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="fixed inset-0 z-50 bg-paper/96 backdrop-blur-md overflow-y-auto"
            role="dialog"
            aria-label="Buscador de productos"
            aria-modal="true"
          >
            <div className="container-ds pt-8 pb-16">
              {/* Search input row */}
              <div className="flex items-center gap-4 border-b border-[rgba(10,10,10,0.12)] pb-4">
                <Search
                  size={20}
                  strokeWidth={1.5}
                  className="text-grey-2 shrink-0"
                  aria-hidden
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar juegos, consolas…"
                  className="flex-1 bg-transparent font-body text-lg text-ink placeholder:text-grey-3 outline-none"
                  aria-label="Buscar productos"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Cerrar buscador"
                  className="flex items-center justify-center w-8 h-8 rounded-[3px] text-grey-1 hover:text-ink hover:bg-paper-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                  style={{ transitionDuration: "var(--dur-fast)" }}
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {searchQuery.length > 1 ? (
                  <motion.div
                    key={`results-${hasResults}`}
                    initial={!reducedMotion ? { opacity: 0, y: 6 } : undefined}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.14 }}
                    className="mt-8 space-y-8"
                  >
                    {!hasResults ? (
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-3 py-12 text-center">
                        Sin resultados para &ldquo;{searchQuery}&rdquo;
                      </p>
                    ) : (
                      <>
                        {gameResults.length > 0 && (
                          <SearchResultSection title="Juegos">
                            {gameResults.map((game) => (
                              <SearchResultRow
                                key={game.id}
                                href="/juegos"
                                title={game.title}
                                meta={game.platform.join(" · ")}
                                price={game.price}
                                swatch={game.cover.gradient}
                                onClick={() => setSearchOpen(false)}
                              />
                            ))}
                          </SearchResultSection>
                        )}
                        {consoleResults.length > 0 && (
                          <SearchResultSection title="Consolas">
                            {consoleResults.map((c) => (
                              <SearchResultRow
                                key={c.id}
                                href="/consolas"
                                title={c.name}
                                meta={c.brand}
                                price={c.price}
                                swatch={c.cover.gradient}
                                onClick={() => setSearchOpen(false)}
                              />
                            ))}
                          </SearchResultSection>
                        )}
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={!reducedMotion ? { opacity: 0 } : undefined}
                    animate={{ opacity: 1 }}
                    className="mt-16 font-mono text-[11px] uppercase tracking-[0.14em] text-grey-3 text-center"
                  >
                    Escribí al menos 2 caracteres · Esc para cerrar
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Search sub-components ──────────────────────────────────────────────────

function SearchResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2 mb-3">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

interface SearchResultRowProps {
  href: string;
  title: string;
  meta: string;
  price: number;
  swatch?: string;
  onClick: () => void;
}

function SearchResultRow({
  href,
  title,
  meta,
  price,
  swatch,
  onClick,
}: SearchResultRowProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-4 px-3 py-2.5 rounded-[3px]",
        "hover:bg-paper-2 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
      )}
      style={{ transitionDuration: "var(--dur-fast)" }}
    >
      <span
        aria-hidden
        className="w-8 h-8 rounded-[2px] shrink-0 border border-[rgba(10,10,10,0.08)]"
        style={{ background: swatch || "var(--paper-3)" }}
      />
      <span className="flex-1 min-w-0">
        <span className="block font-body text-[15px] font-medium text-ink truncate">
          {title}
        </span>
        <span className="block font-mono text-[11px] text-grey-2 uppercase tracking-[0.08em]">
          {meta}
        </span>
      </span>
      <span className="font-mono text-sm text-ink shrink-0 group-hover:text-violet transition-colors"
        style={{ transitionDuration: "var(--dur-fast)" }}>
        {formatPrice(price)}
      </span>
    </Link>
  );
}
