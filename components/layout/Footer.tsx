import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { FxToggle } from "@/components/effects/FxToggle";
import { cn } from "@/lib/utils";

const productLinks = [
  { label: "Todos los juegos", href: "/juegos" },
  { label: "Consolas", href: "/consolas" },
  { label: "Ofertas", href: "/juegos?filter=ofertas" },
  { label: "Novedades", href: "/juegos?filter=nuevos" },
];

const serviceLinks = [
  { label: "Flasheo de consolas", href: "/servicios/flasheo" },
  { label: "Reparación", href: "/servicios/reparacion" },
  { label: "Mantenimiento", href: "/servicios/mantenimiento" },
];

const infoLinks = [
  { label: "Cómo llegar", href: "/#ubicacion" },
  { label: "WhatsApp", href: "https://wa.me/5491157649264" },
  { label: "Carrito", href: "/carrito" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper" aria-label="Pie de página">
      <div className="container-ds pt-28 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <Logo size="md" inverted />
            <p className="font-body text-[15px] text-grey-2 leading-relaxed max-w-[240px]">
              Videojuegos, consolas y servicio técnico especializado en Belgrano, Buenos Aires.
            </p>
            <a
              href="https://wa.me/5491157649264"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 self-start",
                "font-mono text-[11px] uppercase tracking-[0.14em] text-neon",
                "hover:text-white transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-[2px]"
              )}
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              <WhatsAppIcon />
              Escribinos
            </a>
          </div>

          {/* Products column */}
          <FooterColumn title="Productos">
            {productLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Services column */}
          <FooterColumn title="Servicios">
            {serviceLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Info + newsletter column */}
          <div className="flex flex-col gap-6">
            <FooterColumn title="Info">
              {infoLinks.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                  external={link.href.startsWith("http")}
                >
                  {link.label}
                </FooterLink>
              ))}
              <address className="not-italic font-body text-[13px] text-grey-2 leading-relaxed mt-2">
                Av. Cabildo 2230, Loc. 36/38<br />
                Belgrano, CABA
              </address>
            </FooterColumn>
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2">
            © {currentYear} Spot Games · Belgrano, CABA
          </p>
          <FxToggle />
        </div>
      </div>
    </footer>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5 list-none">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className = cn(
    "font-body text-[14px] text-grey-1 hover:text-neon transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-[2px]"
  );
  const style = { transitionDuration: "var(--dur-fast)" } as const;

  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          style={style}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    </li>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M9.8 8.7c-.2-.1-1-.5-1.2-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.1-.4 0C6.5 8.5 5.8 8 5.2 7.2c-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.2 0-.4L5.2 4.8c-.1-.2-.3-.2-.4-.2-.1 0-.2 0-.3.1-.3.3-.9.9-.9 1.8s.9 2 1 2.1c.1.1 1.4 2.2 3.5 3 .5.2.9.3 1.2.4.5.1 1 .1 1.3 0 .4-.1.8-.5 1-.9.1-.3.1-.6 0-.7z"
        fill="currentColor"
      />
    </svg>
  );
}
