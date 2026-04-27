# SpotGames — Changelog

## Iteración 2 (2026-04-26) — Fixes + Hero Arcade + Servicios Completos

### Diagnóstico resuelto

| Bug | Causa | Fix |
|---|---|---|
| Imágenes de plataformas vacías | `next.config.ts` sin dominios Steam | Agregados `cdn.cloudflare.steamstatic.com` y `shared.cloudflare.steamstatic.com` |
| Cards invisibles permanentes | `gsap.from()` con `opacity: 0` deja elementos invisibles si el ScrollTrigger no triggea | Reemplazado por `gsap.fromTo()` con `immediateRender: false` en todos los componentes |
| Servicios con iconos Lucide genéricos | `ServiciosHighlight` no usaba `GamingIcon.tsx` | Reescrito con los 5 iconos custom + 3 nuevos iconos |
| Grid de 4 cols con 5 productos | Última card colgada en grilla de 4 cols | Grid cambiado a `grid-cols-4` con exactamente 4 productos |

---

### Archivos modificados

#### `next.config.ts`
- Agregados `remotePatterns` para Steam CDN: `cdn.cloudflare.steamstatic.com` y `shared.cloudflare.steamstatic.com`

#### `app/globals.css`
- **CSS fallback GSAP**: `.platform-card`, `.featured-card`, `.servicio-card` tienen `opacity: 1` por defecto para que sean visibles si JS no carga
- **Utility classes nuevas**: `.perspective-[400px]` y `.mask-fade-vertical` para el ArcadeEffects del Hero
- **Keyframes arcade**: `horizon-scroll`, `tetris-fall`, `pacman-walk`, `invader-drift`, `coin-spin`, `prompt-blink`, `prompt-float`, `scanline-travel`, `crt-flicker`

#### `app/layout.tsx`
- Import de `next/script`
- `<Script id="js-ready" strategy="afterInteractive">` al final del body para añadir clase `js-ready` al body cuando JS está listo (habilita el control de GSAP sobre las cards)

#### `components/effects/ArcadeEffects.tsx` *(nuevo)*
- Componente visual de 9 capas: synthwave horizon grid, tetris pieces falling, pac-man walking, space invaders con parallax de mouse, coins spinning, floating retro prompts (PRESS START, INSERT COIN, etc.), scanline traveler, CRT flicker, vignette
- Parallax de mouse via `useEffect` + `useState` para los space invaders
- Sub-componentes encapsulados: `TetrisPiece`, `PacmanSprite`, `InvaderSprite`, `CoinSprite`, `FloatingPrompt`
- Animaciones 100% CSS (keyframes) sin GSAP, no bloquea el hilo principal

#### `components/home/Hero.tsx`
- **Layout reescrito**: de asimétrico (texto izq / imagen der) a **100% centralizado**
- La imagen de PS5 fue reemplazada por `<ArcadeEffects />` como fondo animado → elimina el problema de imágenes que no cargan
- GSAP entrada: `fromTo` stagger con `.hero-title-line`, `.hero-badge`, `.hero-stat`, `.hero-cta`, `.hero-sub`
- Parallax de scroll: `.hero-content` sube y se desvanece al hacer scroll
- H1 de 3 líneas: "TU PRÓXIMA" / `.glitch.neon-text-grape "PARTIDA"` / "EMPIEZA .neon-text-ctrl ACÁ."
- Stats HUD con `hud-corners` y `backdrop-blur`
- Eliminado `import Image from "next/image"` (era la fuente del problema de imagen rota)

#### `components/home/PlatformsSection.tsx`
- **Fix GSAP crítico**: reemplazado `gsap.from('.platform-card', {...})` por `gsap.fromTo()` individual por card con `immediateRender: false` y `once: true`
- Cada card tiene su propio `scrollTrigger` con `start: 'top 90%'`
- Reemplazado `<Image>` de `next/image` por `<img>` nativo con `loading="lazy"` para evitar el bug de `onError`

#### `components/home/FeaturedProducts.tsx`
- **Fix grid**: cambiado a `grid-cols-2 md:grid-cols-4` con `.slice(0, 4)` (4 productos exactos, grid perfectamente balanceado)
- **Fix GSAP crítico**: misma corrección `fromTo` con `immediateRender: false` por card individual

#### `components/home/ServiciosHighlight.tsx`
- **Reescrito completo**: ahora muestra las **5 categorías** de servicios usando `CATEGORIES` de `data/services.ts`
- Icons: `RepairIcon`, `FlashIcon`, `JoystickIcon`, `MaintenanceIcon`, `TradeIcon` — todos custom SVG
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`
- Cada card tiene número watermark de fondo, glow border animado, CTA a WhatsApp con texto pre-cargado por categoría
- **Fix GSAP crítico**: `fromTo` con `clipPath` y `immediateRender: false`

#### `components/ui/GamingIcon.tsx`
- Agregados 3 iconos nuevos:
  - `FlashIcon` — chip con rayo para servicio de Flasheo
  - `JoystickIcon` — DualShock estilizado para Joysticks
  - `MaintenanceIcon` — consola con brush para Mantenimiento

#### `data/services.ts`
- **Reescrito completo** con catálogo de ~55 servicios reales
- Tipos nuevos: `ServiceCategory`, `ConsoleBrand`, `ServiceItem`, `CategoryMeta`
- Export `CATEGORIES: CategoryMeta[]` — 5 categorías (REPARACION, FLASHEO, JOYSTICKS, MANTENIMIENTO, TRADE_IN) con color, tagline, descripción e iconKey
- Export `SERVICES: ServiceItem[]` — catálogo completo con `id`, `name`, `description`, `consoles[]`, `priceFrom` (null = "Consultar")
- Export `FEATURED_SERVICES` — 5 servicios destacados para futura use
- Export `CONSOLE_LABELS` y `BRAND_COLORS` para futura use
- **⚠️ Precios son placeholders** — el cliente debe ajustarlos antes de publicar
- `export default SERVICES` para compatibilidad

#### `app/servicios/page.tsx`
- **Reescrito** para usar el nuevo `data/services.ts`
- Sección superior: 5 cards de categorías con icono, tagline, descripción y CTA WhatsApp
- Sección inferior: tabla completa de todos los servicios agrupados por categoría
- Columnas: Nombre / Descripción (hidden en mobile) / Precio
- Disclaimer de precios al final con link a WhatsApp

---

### Patrón GSAP seguro (referencia)

```tsx
// INCORRECTO — deja cards invisibles si el trigger no se activa
gsap.from('.card', { opacity: 0, scrollTrigger: { trigger: '.grid', start: 'top 80%' } });

// CORRECTO — las cards siempre son visibles; GSAP anima cuando puede
const cards = gsap.utils.toArray<HTMLElement>('.card');
cards.forEach((card, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
      immediateRender: false, // CRÍTICO
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
});
```

---

## Iteración 1 (2026-04-25) — Rediseño visual heavy gamer / cyberpunk

Rediseño visual completo: aurora orbs, grid animado, CRT scanlines, bento grid de plataformas, Hero asimétrico, ProductCard con imagen nativa, KonamiCode easter egg, Footer con Konami hint, 404 pixel art.

Commit: `7316780`
