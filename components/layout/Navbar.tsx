"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

const NAV_LINKS = [
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const openDrawer = useCartStore((s) => s.openDrawer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-void/90 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              {/* Grape cluster */}
              <circle cx="18" cy="22" r="5" fill="#A855F7" />
              <circle cx="12" cy="18" r="4.5" fill="#A855F7" />
              <circle cx="24" cy="18" r="4.5" fill="#A855F7" />
              <circle cx="15" cy="11" r="4" fill="#7C3AED" />
              <circle cx="21" cy="11" r="4" fill="#7C3AED" />
              <circle cx="18" cy="5" r="3.5" fill="#6D28D9" />
              {/* Stem */}
              <path d="M18 2 Q22 4 20 8" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Controller leaf */}
              <rect x="7" y="1" width="10" height="6" rx="2" fill="#4ADE80" />
              <circle cx="9" cy="4" r="0.8" fill="white" />
              <circle cx="15" cy="4" r="0.8" fill="white" />
              <circle cx="12" cy="2.5" r="0.8" fill="white" />
              <circle cx="12" cy="5.5" r="0.8" fill="white" />
            </svg>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: "0 0 16px rgba(168, 85, 247, 0.6)",
              }}
            />
          </div>
          <span className="font-display font-bold text-xl text-white tracking-wide">
            SPOT<span className="text-grape"> GAMES</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display font-semibold text-sm uppercase tracking-widest transition-colors duration-200 relative group ${
                  active ? "text-grape" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-grape transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={openDrawer}
            className="relative flex items-center justify-center w-10 h-10 rounded-none border border-border hover:border-grape transition-colors duration-200 cursor-pointer"
            aria-label="Abrir carrito"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-grape text-white text-xs font-tech font-bold flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>

          {/* WhatsApp CTA — desktop */}
          <a
            href="https://wa.me/541157649264"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-ctrl/10 border border-ctrl text-ctrl font-display font-semibold text-xs uppercase tracking-widest hover:bg-ctrl/20 transition-all duration-300 ctrl-border"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center cursor-pointer"
            aria-label="Menú"
          >
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 border-b border-border" : "max-h-0"
        } bg-void/95 backdrop-blur-md`}
      >
        <nav className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display font-semibold text-sm uppercase tracking-widest text-muted hover:text-grape transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/541157649264"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ctrl font-display font-semibold text-sm uppercase tracking-widest"
          >
            Consultar por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
