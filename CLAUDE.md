# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Critical:** This project runs Next.js 16. APIs and conventions differ from what training data covers. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed all deprecation notices in the terminal.

---

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint

npx tsc --noEmit # Type-check without building
```

---

## Project: Spot Games

Premium e-commerce for videogames, consoles, and repair services (flasheo, reparación, mantenimiento). Physical store at Av. Cabildo 2230, Loc. 36/38, Belgrano, CABA. This version is a **demo with local JSON data** — no database, no real payments.

---

## Architecture

### Stack
- **Next.js 16** — App Router, Server Components by default
- **TypeScript** — `strict: true`, no `any`
- **Tailwind CSS v4** — `@theme inline` in `globals.css`, no `tailwind.config.js`
- **Framer Motion** — component animations, `AnimatePresence`, hover states
- **GSAP + ScrollTrigger** — parallax, scroll-triggered timelines
- **Lenis** (`lenis` package) — smooth scroll, connected to GSAP ticker
- **Fuse.js** — client-side fuzzy search over JSON data
- **`lib/cart.ts`** — cart persisted in `localStorage`, emits `cart-change` custom events
- **`lib/fx.ts`** — FX toggle (`'fx'` key in localStorage), emits `fx-change` custom events

### Data flow
All product/service data is static JSON in `data/`. Pages read it directly as Server Components. No `fetch`, no API routes. Cart state lives in `localStorage` and is read only inside `useEffect` to avoid SSR hydration mismatches.

### Import alias
`@/` maps to the project root. Use `@/components/...`, `@/lib/...`, `@/data/...`.

### Font CSS variables (set by `next/font` in `layout.tsx`)
| Variable | Family | Usage |
|---|---|---|
| `--font-space-grotesk` | Space Grotesk | Display, headings → `font-display` utility |
| `--font-geist` | Geist | Body text → `font-body` utility |
| `--font-jetbrains-mono` | JetBrains Mono | Metadata, prices, labels → `font-mono` utility |

---

## Design System Rules (non-negotiable)

### Color roles
- **Neon `#00E676`** — action/commerce: CTA buttons bg, stock indicators, neon accents on dark backgrounds. **NEVER as text color on light backgrounds** (contrast ratio ~1.4:1 fails WCAG).
- **Violet `#6D28D9`** — identity/services: service cards hover, service badges, calendar selection. Can be used as text on `--paper` (ratio ~7.1:1 ✓).
- Green and violet **never appear together** in the same element (button, card, badge, gradient).
- Italic serif (Times New Roman italic, violet color) — **max once per page**, hero headline only.

### Tailwind color tokens (from `globals.css @theme inline`)
`bg-paper`, `bg-ink`, `bg-neon`, `bg-violet`, `bg-violet-deep`, `bg-violet-soft`, `text-grey-1`, `text-grey-2`, etc.

### Motion
- `--dur-fast: 180ms` — hover, micro-interactions
- `--dur-default: 280ms` — panels, modals, menus
- `--dur-slow: 480ms` — page sections, scroll reveals
- `--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)` — default for all entrances
- Always respect `prefers-reduced-motion` using Framer Motion's `useReducedMotion()`

### Page wipe transition
Total: ~800ms. Segments: entrance 150ms → logo + progress bar visible 500ms → exit 150ms. Beep audio (`public/sounds/page-wipe-end.mp3`) fires at end of the 500ms segment. OFF by default; ON only when `localStorage.getItem('fx') === 'on'`.

### Game box covers (CSS 3D)
Each `GameBox` in the catalog must have a **unique** visual treatment — different gradient, typography composition, symbol. No two cards can share the same template with only a color change. See `data/games.json` for the `cover` object schema (`theme`, `gradient`, `accentColor`, `textColor`, `symbol`).

### Copy voice
Spanish Argentina, clean and professional. No "che bro", no arcade tropes ("INSERT COIN", etc.), no CRT aesthetics (scanlines, glitches, pixel fonts).

---

## Component Conventions

- **Server Components by default.** Add `"use client"` only when using hooks, browser APIs, or event handlers.
- Use `cn()` from `@/lib/utils` for conditional classes (`clsx` + `tailwind-merge`).
- No `any`. Use union types for component variants (e.g., `variant: 'primary' | 'violet' | 'outline'`).
- localStorage access always inside `useEffect` — never during render.
- Game box mockups: perspective CSS 3D with `rotateY(-12deg) rotateX(4deg)` default, `rotateY(-6deg) scale(1.02)` on hover.

---

## WhatsApp integration
Service booking links are built via `@/lib/whatsapp.ts`. Number: `+5491157649264`. The `buildBookingURL(service, date, time)` function generates the pre-filled WhatsApp URL used by `ArcadeCalendar`.

---

## Key files

| File | Purpose |
|---|---|
| `app/globals.css` | All design tokens + Tailwind v4 `@theme inline` mapping |
| `lib/cart.ts` | Cart CRUD + localStorage + `cart-change` event dispatch |
| `lib/fx.ts` | FX toggle (cursor trail, sounds, animations) + `fx-change` event |
| `lib/whatsapp.ts` | WhatsApp URL builder |
| `lib/utils.ts` | `cn()`, `formatPrice()`, `formatDiscount()` |
| `data/games.json` | 26 games with cover theme data |
| `data/consoles.json` | 9 consoles (new + restored) |
| `data/services.json` | 3 services with full FAQ and process steps |
| `data/reviews.json` | 16 reviews for the wall of love |
| `public/maps/belgrano.svg` | Illustrated map (not inline JSX) |
| `public/sounds/page-wipe-end.mp3` | Arcade beep for page wipe |
