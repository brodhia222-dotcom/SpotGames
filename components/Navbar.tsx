"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const menuVariants: Variants = {
  closed: { opacity: 0, y: -8, transition: { ease: "easeIn", duration: 0.2 } },
  open:   { opacity: 1, y: 0,  transition: { ease: "easeOut", duration: 0.25 } },
};

const navLinks = [
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros",  label: "Nosotros"  },
  { href: "/contacto",  label: "Contacto"  },
];

/* ── Grape + Gamepad SVG Logo ─────────────────────────────── */
function GrapeLogo() {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9 flex-shrink-0"
      aria-hidden="true"
    >
      {/* Stem */}
      <path d="M24 4 Q28 10 32 8" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Gamepad on stem */}
      <rect x="28" y="3" width="12" height="8" rx="2.5" fill="#15803D"/>
      <circle cx="32" cy="7" r="1.1" fill="#4ADE80"/>
      <circle cx="36" cy="7" r="1.1" fill="#4ADE80"/>
      <rect x="33.5" y="5" width="1.2" height="4" rx="0.6" fill="#4ADE80"/>
      <rect x="32" y="6.4" width="4" height="1.2" rx="0.6" fill="#4ADE80"/>
      {/* Grapes — row 1 */}
      <circle cx="24" cy="14" r="6.5" fill="#7C3AED"/>
      <circle cx="24" cy="14" r="6.5" fill="url(#g1)"/>
      {/* row 2 */}
      <circle cx="16" cy="24" r="6.5" fill="#7C3AED"/>
      <circle cx="16" cy="24" r="6.5" fill="url(#g2)"/>
      <circle cx="32" cy="24" r="6.5" fill="#7C3AED"/>
      <circle cx="32" cy="24" r="6.5" fill="url(#g3)"/>
      {/* row 3 */}
      <circle cx="10" cy="34" r="6.5" fill="#7C3AED"/>
      <circle cx="10" cy="34" r="6.5" fill="url(#g4)"/>
      <circle cx="24" cy="34" r="6.5" fill="#7C3AED"/>
      <circle cx="24" cy="34" r="6.5" fill="url(#g5)"/>
      <circle cx="38" cy="34" r="6.5" fill="#7C3AED"/>
      <circle cx="38" cy="34" r="6.5" fill="url(#g6)"/>
      {/* row 4 */}
      <circle cx="17" cy="44" r="6.5" fill="#7C3AED"/>
      <circle cx="17" cy="44" r="6.5" fill="url(#g7)"/>
      <circle cx="31" cy="44" r="6.5" fill="#7C3AED"/>
      <circle cx="31" cy="44" r="6.5" fill="url(#g8)"/>
      {/* Sheen highlights */}
      <circle cx="21.5" cy="11.5" r="2" fill="rgba(255,255,255,0.25)"/>
      <circle cx="13.5" cy="21.5" r="2" fill="rgba(255,255,255,0.25)"/>
      <circle cx="29.5" cy="21.5" r="2" fill="rgba(255,255,255,0.25)"/>
      <defs>
        <radialGradient id="g1" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
        <radialGradient id="g2" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
        <radialGradient id="g3" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
        <radialGradient id="g4" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
        <radialGradient id="g5" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
        <radialGradient id="g6" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
        <radialGradient id="g7" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
        <radialGradient id="g8" cx="35%" cy="30%"><stop offset="0%" stopColor="#C4B5FD"/><stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/></radialGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const pathname = usePathname();
  const { getTotalItems, toggleDrawer } = useCartStore();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Spot Games — Inicio">
          <GrapeLogo />
          <span className="font-display font-bold text-lg tracking-wide leading-none">
            <span className="text-text group-hover:text-purple-light transition-colors duration-200">SPOT </span>
            <span className="text-purple-light group-hover:text-green-light transition-colors duration-300">GAMES</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg font-display font-semibold text-sm transition-colors duration-200 group ${
                    isActive ? "text-purple-light" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-purple to-green"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Cart */}
          <button
            onClick={toggleDrawer}
            aria-label={`Carrito — ${totalItems} items`}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:text-text hover:bg-surface-2 transition-colors duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple text-white text-[10px] font-bold flex items-center justify-center leading-none"
                  style={{ boxShadow: "0 0 8px rgba(124,58,237,0.6)" }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl text-muted hover:text-text hover:bg-surface-2 transition-colors duration-200 cursor-pointer"
          >
            <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-surface/95 backdrop-blur-md border-b border-border"
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-display font-semibold text-base transition-colors duration-200 ${
                        isActive
                          ? "text-purple-light bg-purple-muted/30 border border-purple/20"
                          : "text-text hover:bg-surface-2"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
