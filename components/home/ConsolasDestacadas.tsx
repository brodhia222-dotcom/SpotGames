"use client";

import { type ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, formatPrice } from "@/lib/utils";
import consolesData from "@/data/consoles.json";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

interface CoverData {
  gradient: string;
  accentColor: string;
  badgeColor: string;
}

interface ConsoleItem {
  id: string;
  name: string;
  generation: string;
  type: string;
  price: number;
  stock: number;
  cover: CoverData;
}

const CONSOLES = consolesData as ConsoleItem[];
const TILT = (i: number): number => (i % 2 === 0 ? -4 : 4);
const CARD_ADVANCE = 256; // 296 card width - 40 overlap

// ── Art components — one unique composition per console ───────────────────────

function PS5SlimArt() {
  return (
    <>
      {/* DualSense wing ovals */}
      <div className="absolute top-[18%] left-[10%] w-[30%] h-[7%] rounded-full bg-[rgba(10,10,10,0.06)]" />
      <div className="absolute top-[18%] right-[10%] w-[30%] h-[7%] rounded-full bg-[rgba(10,10,10,0.06)]" />
      {/* Touchpad oval */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[34%] h-[7%] rounded-full bg-[rgba(10,10,10,0.05)]" />
      {/* Large "5" watermark */}
      <span
        aria-hidden
        className="absolute -bottom-4 right-4 font-display font-black leading-none select-none"
        style={{ fontSize: 200, color: "rgba(10,10,10,0.04)" }}
      >
        5
      </span>
      {/* Corner labels */}
      <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.20em] text-[rgba(10,10,10,0.32)]">
        SLIM
      </span>
      {/* Neon accent dot */}
      <span className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#00E676]" aria-hidden />
    </>
  );
}

function PS5ProArt() {
  return (
    <>
      {/* Left violet stripe */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-[#6D28D9]" aria-hidden />
      {/* PRO diagonal watermark */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display font-black select-none uppercase"
        style={{ fontSize: 68, color: "rgba(10,10,10,0.045)", transform: "rotate(-14deg)", letterSpacing: "-0.02em" }}
      >
        PRO
      </span>
      {/* Three PS button circles */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <div className="w-3.5 h-3.5 rounded-full border border-[rgba(10,10,10,0.14)]" />
        <div className="w-3.5 h-3.5 rounded-full border border-[rgba(10,10,10,0.14)] bg-[rgba(10,10,10,0.04)]" />
        <div className="w-3.5 h-3.5 rounded-full border border-[rgba(10,10,10,0.14)]" />
      </div>
      {/* Spec label */}
      <span className="absolute bottom-4 left-5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[rgba(10,10,10,0.28)]">
        33.5 TFLOPS
      </span>
      <span className="absolute top-4 right-5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[rgba(10,10,10,0.30)]">
        2024
      </span>
    </>
  );
}

function SwitchOLEDArt() {
  return (
    <>
      {/* Left Joy-Con pill */}
      <div className="absolute top-[10%] bottom-[10%] left-[6%] w-[20%] rounded-[16px] bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.14)]" />
      {/* Right Joy-Con pill */}
      <div className="absolute top-[10%] bottom-[10%] right-[6%] w-[20%] rounded-[16px] bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.12)]" />
      {/* Screen area */}
      <div className="absolute top-[16%] bottom-[20%] left-[30%] right-[30%] rounded-[6px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)]" />
      {/* Button grid on right Joy-Con */}
      <div className="absolute top-[24%] right-[9%] grid grid-cols-2 gap-1.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.22)]" />
        ))}
      </div>
      {/* "OLED" label */}
      <span
        aria-hidden
        className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display font-black text-[28px] tracking-tighter select-none"
        style={{ color: "#fde047" }}
      >
        OLED
      </span>
      <span className="absolute top-4 left-4 font-mono text-[8.5px] tracking-[0.12em] text-[rgba(255,255,255,0.32)]">
        7&quot; OLED
      </span>
    </>
  );
}

function XboxSeriesXArt() {
  return (
    <>
      {/* Tower rectangle outline */}
      <div
        className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[44%] h-[78%] rounded-[4px] border-2"
        style={{ borderColor: "rgba(16,124,16,0.32)" }}
      />
      {/* Large "X" watermark */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display font-black leading-none select-none"
        style={{ fontSize: 120, color: "rgba(255,255,255,0.04)" }}
      >
        X
      </span>
      {/* Power button circle */}
      <div
        className="absolute top-[13%] left-1/2 -translate-x-1/2 w-7 h-7 rounded-full border"
        style={{ borderColor: "rgba(16,124,16,0.50)", background: "rgba(16,124,16,0.22)" }}
      />
      {/* Corner accent lines */}
      <div className="absolute bottom-4 left-4 flex gap-0">
        <div className="w-4 h-px" style={{ background: "#107c10" }} />
      </div>
      <div className="absolute bottom-4 left-4 w-px h-4" style={{ background: "#107c10" }} />
      {/* Spec badge */}
      <span
        className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.14em]"
        style={{ color: "#107c10" }}
      >
        4K · 120fps
      </span>
    </>
  );
}

function XboxSeriesSArt() {
  return (
    <>
      {/* Large disc-void circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] rounded-full border-[3px]"
        style={{ aspectRatio: "1", borderColor: "rgba(10,10,10,0.10)" }}
      />
      {/* "S" inside */}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black select-none"
        style={{ fontSize: 62, color: "rgba(10,10,10,0.08)" }}
      >
        S
      </span>
      {/* Green compass dots */}
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: "#107c10" }} />
      <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: "#107c10" }} />
      <div className="absolute left-[12%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "#107c10" }} />
      <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "#107c10" }} />
      <span className="absolute top-4 left-4 font-mono text-[8.5px] uppercase tracking-[0.16em] text-[rgba(10,10,10,0.28)]">
        SERIES S
      </span>
      <span className="absolute bottom-4 right-4 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[rgba(10,10,10,0.24)]">
        1440p
      </span>
    </>
  );
}

function SteamDeckArt() {
  return (
    <>
      {/* Left trackpad */}
      <div
        className="absolute top-[20%] left-[6%] w-[26%] rounded-full border"
        style={{ aspectRatio: "1", borderColor: "rgba(56,189,248,0.30)", background: "rgba(56,189,248,0.04)" }}
      />
      {/* Right trackpad */}
      <div
        className="absolute top-[20%] right-[6%] w-[26%] rounded-full border"
        style={{ aspectRatio: "1", borderColor: "rgba(56,189,248,0.30)", background: "rgba(56,189,248,0.04)" }}
      />
      {/* Screen area */}
      <div
        className="absolute top-[38%] left-[26%] right-[26%] h-[30%] rounded-[4px] border"
        style={{ borderColor: "rgba(56,189,248,0.22)", background: "rgba(56,189,248,0.04)" }}
      />
      {/* Analog stick dots */}
      <div className="absolute top-[54%] left-[16%] w-3.5 h-3.5 rounded-full border" style={{ borderColor: "rgba(56,189,248,0.22)" }} />
      <div className="absolute top-[54%] right-[16%] w-3.5 h-3.5 rounded-full border" style={{ borderColor: "rgba(56,189,248,0.22)" }} />
      {/* Cyan labels */}
      <span
        className="absolute top-4 right-4 font-mono text-[8.5px] uppercase tracking-[0.14em]"
        style={{ color: "#38bdf8" }}
      >
        OLED · 90Hz
      </span>
      <span className="absolute bottom-4 left-4 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[rgba(255,255,255,0.22)]">
        512GB NVMe
      </span>
    </>
  );
}

function PS2Art() {
  // 6×8 circuit board dot grid
  const dots = Array.from({ length: 48 }, (_, i) => ({ col: i % 8, row: Math.floor(i / 8) }));
  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute w-0.5 h-0.5 rounded-full bg-[rgba(255,255,255,0.07)]"
          style={{ left: `${14 + d.col * 10.5}%`, top: `${12 + d.row * 12}%` }}
        />
      ))}
      {/* Circuit traces */}
      <div className="absolute top-[26%] left-[14%] right-[14%] h-px bg-[rgba(255,255,255,0.06)]" />
      <div className="absolute top-[50%] left-[14%] right-[14%] h-px bg-[rgba(255,255,255,0.06)]" />
      <div className="absolute top-[70%] left-[14%] right-[14%] h-px bg-[rgba(255,255,255,0.06)]" />
      {/* "PS2" watermark */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display font-black select-none"
        style={{ fontSize: 82, color: "rgba(255,255,255,0.03)" }}
      >
        PS2
      </span>
      {/* Neon scan line */}
      <div className="absolute left-0 right-0 top-[44%] h-px" style={{ background: "rgba(0,230,118,0.14)" }} />
      {/* OPL badge */}
      <span
        className="absolute top-4 left-4 font-mono text-[8px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-[2px]"
        style={{ background: "rgba(109,40,217,0.18)", color: "#a78bfa" }}
      >
        OPL + HDD
      </span>
      <span
        className="absolute bottom-4 right-4 font-mono text-[8.5px] tracking-[0.10em]"
        style={{ color: "rgba(0,230,118,0.55)" }}
      >
        300+ juegos
      </span>
    </>
  );
}

function N64Art() {
  return (
    <>
      {/* N64 three-pronged controller suggestion */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[16%] h-[30%] rounded-t-[40%] bg-[rgba(255,255,255,0.05)]" />
      <div className="absolute bottom-[10%] left-[14%] w-[24%] h-[26%] rounded-t-[40%] bg-[rgba(255,255,255,0.05)]" />
      <div className="absolute bottom-[10%] right-[14%] w-[24%] h-[26%] rounded-t-[40%] bg-[rgba(255,255,255,0.05)]" />
      {/* Red joystick dot */}
      <div
        className="absolute top-[28%] left-[22%] w-4 h-4 rounded-full"
        style={{ background: "#dc2626" }}
      />
      {/* "64" watermark */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display font-black select-none"
        style={{ fontSize: 104, color: "rgba(255,255,255,0.04)" }}
      >
        64
      </span>
      {/* Year badge */}
      <span className="absolute top-4 right-4 font-mono text-[8.5px] tracking-[0.14em] text-[rgba(255,255,255,0.24)]">
        1996
      </span>
      {/* Restored badge */}
      <span
        className="absolute top-4 left-4 font-mono text-[8px] uppercase tracking-[0.10em] px-2 py-0.5 rounded-[2px]"
        style={{ background: "rgba(109,40,217,0.18)", color: "#a78bfa" }}
      >
        RESTAURADA
      </span>
    </>
  );
}

function SegaGenesisArt() {
  return (
    <>
      {/* Horizontal stripes */}
      <div className="absolute top-[24%] left-0 right-0 h-[11%] bg-[rgba(255,255,255,0.024)]" />
      <div className="absolute top-[48%] left-0 right-0 h-[9%] bg-[rgba(255,255,255,0.018)]" />
      <div className="absolute top-[70%] left-0 right-0 h-[7%] bg-[rgba(255,255,255,0.013)]" />
      {/* "GENESIS" watermark */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display font-black select-none uppercase"
        style={{ fontSize: 42, color: "rgba(255,255,255,0.03)", letterSpacing: "-0.01em" }}
      >
        GENESIS
      </span>
      {/* Cart slot */}
      <div className="absolute bottom-[12%] left-[18%] right-[18%] h-1.5 rounded-[2px] bg-[rgba(255,255,255,0.06)]" />
      {/* Mega Everdrive badge */}
      <span
        className="absolute top-4 left-4 font-mono text-[8px] uppercase tracking-[0.10em] px-2 py-0.5 rounded-[2px]"
        style={{ background: "rgba(59,130,246,0.14)", color: "#60a5fa" }}
      >
        MEGA EVD PRO
      </span>
      <span className="absolute top-4 right-4 font-mono text-[8.5px] tracking-[0.12em] text-[rgba(255,255,255,0.18)]">
        MODEL 2
      </span>
    </>
  );
}

// ── Art dispatcher ─────────────────────────────────────────────────────────────

const ART_MAP: Record<string, ReactElement> = {
  "ps5-slim":               <PS5SlimArt />,
  "ps5-pro":                <PS5ProArt />,
  "switch-oled":            <SwitchOLEDArt />,
  "xbox-series-x":          <XboxSeriesXArt />,
  "xbox-series-s":          <XboxSeriesSArt />,
  "steam-deck-512gb":       <SteamDeckArt />,
  "ps2-chip-restaurada":    <PS2Art />,
  "n64-restaurada":         <N64Art />,
  "sega-genesis-restaurada": <SegaGenesisArt />,
};

function ConsoleArt({ id, cover }: { id: string; cover: CoverData }) {
  return (
    <div className="absolute inset-0" style={{ background: cover.gradient }} aria-hidden>
      {ART_MAP[id]}
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────

export function ConsolasDestacadas() {
  const reducedMotion = useReducedMotion();
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  const isDragging   = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartScroll = useRef(0);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx,  setActiveIdx]  = useState(0);

  // ── Drag to scroll ──────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      e.preventDefault();
      trackRef.current.scrollLeft = dragStartScroll.current - (e.clientX - dragStartX.current);
    };
    const onUp = () => {
      if (isDragging.current && trackRef.current) {
        trackRef.current.style.cursor = "grab";
      }
      isDragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // ── Progress indicator ──────────────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / CARD_ADVANCE);
      setActiveIdx(Math.max(0, Math.min(idx, CONSOLES.length - 1)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // ── GSAP: horizontal parallax ───────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        trackRef.current,
        { x: 30 },
        {
          x: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-paper-2 border-t border-[rgba(10,10,10,0.07)] overflow-hidden"
      aria-label="Consolas nuevas y restauradas"
    >
      {/* Hide scrollbar cross-browser */}
      <style>{`.cs-track::-webkit-scrollbar{display:none}`}</style>

      {/* ── Section header ── */}
      <div className="container-ds mb-10">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-grey-2 mb-3">
              Consolas
            </p>
            <h2
              className="font-display font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Nuevas y restauradas.
            </h2>
          </div>

          {/* Progress: 01 ──── 09 */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-[13px] text-ink tabular-nums font-medium">
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <div className="relative w-20 h-px bg-[rgba(10,10,10,0.12)]">
              <motion.div
                className="absolute inset-y-0 left-0 w-full bg-ink origin-left"
                animate={{ scaleX: (activeIdx + 1) / CONSOLES.length }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              />
            </div>
            <span className="font-mono text-[13px] text-grey-2 tabular-nums">
              {String(CONSOLES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* ── Slider track ── */}
      <div
        ref={trackRef}
        className={cn(
          "cs-track flex items-end overflow-x-auto select-none",
        )}
        style={{
          scrollbarWidth: "none",
          cursor: "grab",
          paddingLeft: "max(32px, calc((100vw - 1440px) / 2 + 32px))",
          paddingRight: 80,
          paddingTop: 48,
          paddingBottom: 64,
        }}
        onMouseDown={onMouseDown}
        role="list"
        aria-label="Arrastrá para ver más consolas"
      >
        {CONSOLES.map((item, i) => {
          const isHovered = hoveredIdx === i;
          const isDimmed  = hoveredIdx !== null && !isHovered;

          return (
            <motion.article
              key={item.id}
              role="listitem"
              className="relative shrink-0 rounded-[6px] overflow-hidden bg-paper border border-[rgba(10,10,10,0.10)]"
              style={{
                width: 296,
                marginLeft: i === 0 ? 0 : -40,
                zIndex: isHovered ? 20 : CONSOLES.length - i,
              }}
              animate={{
                rotate:     isHovered ? 0 : TILT(i),
                scale:      isHovered ? 1.04 : 1,
                opacity:    isDimmed  ? 0.60 : 1,
                boxShadow:  isHovered
                  ? "0 28px 60px rgba(109,40,217,0.22), 0 8px 24px rgba(10,10,10,0.14)"
                  : "0 8px 28px rgba(10,10,10,0.09)",
              }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
            >
              {/* Art panel */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <ConsoleArt id={item.id} cover={item.cover} />
              </div>

              {/* Info panel */}
              <div className="p-5 flex flex-col gap-2 bg-paper">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[8.5px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-[2px]"
                    style={{
                      background: item.type === "restored"
                        ? "rgba(109,40,217,0.08)"
                        : "rgba(0,230,118,0.12)",
                      color: item.type === "restored" ? "#6D28D9" : "#00C853",
                    }}
                  >
                    {item.type === "restored" ? "Restaurada" : "Nueva"}
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-grey-2">
                    {item.generation}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-[14px] text-ink leading-tight mt-0.5">
                  {item.name}
                </h3>

                <p className="font-mono text-[13px] text-ink font-medium">
                  {formatPrice(item.price)}
                </p>

                {item.stock <= 2 && (
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.10em] text-grey-2">
                    Últ. {item.stock} {item.stock === 1 ? "unidad" : "uds."}
                  </p>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
