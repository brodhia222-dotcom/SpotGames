# Spot Games — Guía para Agentes IA

## Proyecto
Sitio ecommerce para local de videojuegos en Argentina.
Stack: Next.js 15.3 · Tailwind v4 · GSAP + ScrollTrigger · Zustand · TypeScript

## Arquitectura
- `app/` — Rutas (Next.js App Router). Cada carpeta = una página.
- `components/layout/` — Navbar, Footer, CartDrawer
- `components/home/` — Secciones de la home (Hero, Marquee, FeaturedProducts, PlatformsSection, ServiciosHighlight, CtaSection)
- `components/products/` — ProductCard, ProductGrid, FilterBar, AddToCartButton
- `components/ui/` — NeonButton, GlitchText (reutilizables)
- `data/` — Todos los datos editables (productos y servicios)
- `store/cartStore.ts` — Zustand con persistencia en localStorage
- `lib/gsap.ts` — Inicialización GSAP + ScrollTrigger
- `hooks/useGsap.ts` — Hook de cleanup para animaciones GSAP

## Cómo modificar el contenido
| Qué | Dónde |
|---|---|
| Productos (nombre, precio, imagen, stock) | `data/products.ts` → array `PRODUCTS` |
| Servicios (descripción, precio, WA text) | `data/services.ts` → array `SERVICES` |
| WhatsApp | Buscar `541157649264` globalmente |
| Instagram | Buscar `spotgames.ar` globalmente |
| Secciones home | `components/home/` |
| Paleta de colores | `app/globals.css` → `@theme inline {}` |

## Design tokens (app/globals.css)
- Fondo: `void` (#05030A) · Surface: `surface` (#0D0818)
- Acento principal: `grape` (#A855F7) — derivado del logo (uva)
- Acento secundario: `ctrl` (#4ADE80) — derivado del logo (joystick)
- Fuentes: Rajdhani (display) · Outfit (body) · Orbitron (tech/precios)

## Paleta de colores completa
| Token | Valor | Uso |
|---|---|---|
| `grape` | #A855F7 | Acento principal neon (uva) |
| `grape-d` | #7C3AED | Hover / estado oscuro |
| `grape-glow` | #C084FC | Glow de elementos activos |
| `ctrl` | #4ADE80 | Acento secundario (joystick) |
| `ctrl-glow` | #86EFAC | Verde suave para glows |
| `void` | #05030A | Fondo principal |
| `surface` | #0D0818 | Cards |
| `surface-2` | #18102E | Cards elevadas |
| `border` | #2D1F4E | Bordes |

## Efectos CSS disponibles (globals.css)
- `.glitch` — texto con efecto glitch (requiere `data-text={texto}`)
- `.neon-text` — pulsación de text-shadow púrpura
- `.neon-border` — pulsación de box-shadow púrpura
- `.ctrl-border` — pulsación de box-shadow verde
- `.float-anim` — flotación vertical suave
- `.glow-grape` / `.glow-ctrl` — sombra neon grape/ctrl

## GSAP
- Siempre en componentes `"use client"`
- Usar `gsap.context(() => { ... }, ref)` con `return () => ctx.revert()` para cleanup
- ScrollTrigger importado desde `@/lib/gsap` (ya registrado)

## Rutas del sitio
| Ruta | Descripción |
|---|---|
| `/` | Home (Hero + Marquee + Featured + Platforms + Servicios + CTA) |
| `/productos` | Catálogo con filtros de categoría/plataforma/estado |
| `/productos/[slug]` | Detalle de producto |
| `/servicios` | Los 5 servicios del local |
| `/nosotros` | Historia + stats animados + valores |
| `/carrito` | Carrito completo con confirmación por WA |
| `/contacto` | WhatsApp + Instagram + horarios |

## Datos de contacto
- WhatsApp: +54 11 5764-9264 → https://wa.me/541157649264
- Instagram: @spotgames.ar → https://www.instagram.com/spotgames.ar/

## Reglas de diseño (BrodhIA)
Ver `C:\Users\feded\.claude\projects\C--Users-feded\memory\feedback_design_principles.md`
