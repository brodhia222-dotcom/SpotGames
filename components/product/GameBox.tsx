"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface GameBoxCover {
  gradient: string;
  accentColor: string;
  textColor: string;
  symbol: string;
}

type GameBoxSize = "sm" | "md" | "lg" | "hero";

export interface GameBoxProps {
  title: string;
  developer?: string;
  platform?: string;
  cover: GameBoxCover;
  size?: GameBoxSize;
  floating?: boolean;
  className?: string;
}

const dimensions: Record<GameBoxSize, { w: number; h: number; symbolSize: number; spine: number }> = {
  sm:   { w: 140, h: 196,  symbolSize: 52,  spine: 10 },
  md:   { w: 200, h: 280,  symbolSize: 76,  spine: 14 },
  lg:   { w: 250, h: 350,  symbolSize: 96,  spine: 17 },
  hero: { w: 290, h: 406,  symbolSize: 110, spine: 20 },
};

export function GameBox({
  title,
  developer,
  platform,
  cover,
  size = "md",
  floating = false,
  className,
}: GameBoxProps) {
  const [hovered, setHovered] = useState(false);
  const dim = dimensions[size];

  return (
    <div
      className={cn("select-none", className)}
      style={{ perspective: "900px", width: dim.w, height: dim.h + 40 }}
    >
      {/* Rotation layer — smoothly interpolates between default and hover transform */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: dim.w,
          height: dim.h,
          transform: hovered
            ? "rotateY(-6deg) rotateX(4deg) scale(1.02)"
            : "rotateY(-12deg) rotateX(4deg)",
          transition: "transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Float animation layer — only translateY, composable with rotation */}
        <div
          style={{
            width: "100%",
            height: "100%",
            animation: floating ? "float-y 5s ease-in-out infinite" : "none",
          }}
        >
          {/* The actual box face */}
          <div
            className="relative w-full h-full rounded-[3px] overflow-hidden"
            style={{
              background: cover.gradient,
              boxShadow: [
                `${-dim.spine * 0.6}px 0 0 rgba(0,0,0,0.28)`,
                `${-dim.spine * 1.2}px 0 0 rgba(0,0,0,0.10)`,
                `0 ${dim.h * 0.04}px ${dim.h * 0.12}px rgba(0,0,0,0.18)`,
                "inset 0 1px 0 rgba(255,255,255,0.10)",
                "inset 1px 0 0 rgba(255,255,255,0.05)",
              ].join(", "),
            }}
          >
            {/* Subtle grain overlay for depth */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", opacity: 0.06 }}
            />

            {/* Inner layout */}
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              {/* Top: symbol */}
              <div className="flex items-start justify-between">
                <GameBoxSymbol
                  name={cover.symbol}
                  color={cover.accentColor}
                  size={dim.symbolSize}
                />
                {platform && (
                  <span
                    className="font-mono uppercase tracking-widest leading-none"
                    style={{
                      fontSize: 9,
                      color: cover.accentColor,
                      opacity: 0.65,
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {platform}
                  </span>
                )}
              </div>

              {/* Bottom: game info */}
              <div className="flex flex-col gap-0.5">
                {developer && (
                  <span
                    className="font-mono uppercase tracking-[0.12em]"
                    style={{ fontSize: 9, color: cover.accentColor, opacity: 0.55 }}
                  >
                    {developer}
                  </span>
                )}
                <h3
                  className="font-display font-bold leading-tight"
                  style={{
                    fontSize: dim.symbolSize * 0.22,
                    color: cover.textColor,
                    maxWidth: "90%",
                  }}
                >
                  {title}
                </h3>
              </div>
            </div>

            {/* Right-edge highlight — simulates the box spine join */}
            <div
              aria-hidden
              className="absolute top-0 right-0 bottom-0 w-[3px]"
              style={{
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.08), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Symbol renderer ────────────────────────────────────────────────────────

function GameBoxSymbol({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  const base = { width: size, height: size } as const;

  switch (name) {
    case "ring":
      return (
        <svg {...base} viewBox="0 0 100 100" fill="none" aria-hidden>
          <circle cx="50" cy="50" r="34" stroke={color} strokeWidth="14" />
        </svg>
      );

    case "star":
      return (
        <svg {...base} viewBox="0 0 100 100" fill={color} aria-hidden>
          <polygon points="50,8 63,36 93,36 70,56 79,85 50,66 21,85 30,56 7,36 37,36" />
        </svg>
      );

    case "moon":
      return (
        <svg {...base} viewBox="0 0 100 100" fill={color} aria-hidden>
          <path d="M58 16 Q88 50 58 84 Q24 84 16 56 Q24 24 58 16 Z" />
          <circle cx="58" cy="50" r="24" fill="rgba(0,0,0,0.35)" />
        </svg>
      );

    case "skull":
    case "skull-horns":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          {name === "skull-horns" && (
            <>
              <path d="M30 28 Q22 8 36 4 Q30 18 40 24" fill={color} />
              <path d="M70 28 Q78 8 64 4 Q70 18 60 24" fill={color} />
            </>
          )}
          <ellipse cx="50" cy="46" rx="28" ry="30" fill={color} />
          <rect x="34" y="70" width="32" height="18" rx="4" fill={color} />
          <circle cx="40" cy="44" r="8" fill="rgba(0,0,0,0.45)" />
          <circle cx="60" cy="44" r="8" fill="rgba(0,0,0,0.45)" />
          <rect x="37" y="75" width="8" height="12" rx="2" fill="rgba(0,0,0,0.4)" />
          <rect x="55" y="75" width="8" height="12" rx="2" fill="rgba(0,0,0,0.4)" />
        </svg>
      );

    case "web":
      return (
        <svg {...base} viewBox="0 0 100 100" fill="none" aria-hidden>
          {[40, 28, 16].map((r, i) => (
            <circle key={r} cx="50" cy="50" r={r} stroke={color} strokeWidth="2" strokeOpacity={0.9 - i * 0.15} />
          ))}
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1="50" y1="50"
                x2={50 + 42 * Math.cos(rad)}
                y2={50 + 42 * Math.sin(rad)}
                stroke={color} strokeWidth="2" strokeOpacity="0.7"
              />
            );
          })}
        </svg>
      );

    case "triforce":
      return (
        <svg {...base} viewBox="0 0 100 100" fill={color} aria-hidden>
          <polygon points="50,10 70,46 30,46" />
          <polygon points="30,50 50,86 10,86" />
          <polygon points="70,50 90,86 50,86" />
        </svg>
      );

    case "torch":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <rect x="44" y="58" width="12" height="28" rx="3" fill={color} fillOpacity="0.8" />
          <path d="M50 58 Q36 42 40 24 Q47 34 50 30 Q53 34 60 24 Q64 42 50 58 Z" fill={color} />
          <path d="M50 55 Q41 43 43 32 Q48 40 50 36 Q52 40 57 32 Q59 43 50 55 Z" fill="rgba(255,210,80,0.85)" />
        </svg>
      );

    case "axe":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <line x1="38" y1="22" x2="62" y2="78" stroke={color} strokeWidth="6" strokeLinecap="round" />
          <path d="M28 28 Q14 42 20 58 Q36 46 50 40 Z" fill={color} />
          <path d="M72 50 Q86 36 80 22 Q64 32 50 40 Z" fill={color} fillOpacity="0.5" />
        </svg>
      );

    case "car":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <path d="M12 60 L20 44 L36 32 L64 32 L80 44 L88 60 Z" fill={color} />
          <rect x="12" y="58" width="76" height="16" rx="4" fill={color} />
          <circle cx="30" cy="74" r="9" fill="rgba(0,0,0,0.5)" />
          <circle cx="70" cy="74" r="9" fill="rgba(0,0,0,0.5)" />
          <circle cx="30" cy="74" r="4" fill={color} fillOpacity="0.4" />
          <circle cx="70" cy="74" r="4" fill={color} fillOpacity="0.4" />
        </svg>
      );

    case "fern":
      return (
        <svg {...base} viewBox="0 0 100 100" fill="none" stroke={color} aria-hidden>
          <path d="M50 88 Q50 55 50 18" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 72 Q36 58 24 50 Q38 52 50 64" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 56 Q64 42 76 34 Q62 36 50 48" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 40 Q38 28 28 20 Q40 22 50 34" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "katana":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <line x1="18" y1="82" x2="78" y2="20" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M76 22 L70 28 L83 34 Z" fill={color} />
          <rect x="14" y="78" width="12" height="7" rx="2" fill={color} transform="rotate(-42 20 81)" />
          <line x1="22" y1="76" x2="30" y2="68" stroke={color} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      );

    case "shell":
      return (
        <svg {...base} viewBox="0 0 100 100" fill="none" stroke={color} aria-hidden>
          <path d="M50 88 Q18 72 16 50 Q14 28 50 18 Q74 20 82 40 Q90 60 74 76 Q60 88 50 88 Z" strokeWidth="3" />
          <path d="M50 76 Q28 64 26 50 Q25 36 48 28" strokeWidth="2" strokeOpacity="0.65" />
          <path d="M50 64 Q38 56 38 50 Q38 42 48 38" strokeWidth="2" strokeOpacity="0.4" />
        </svg>
      );

    case "visor":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <path d="M18 44 Q18 28 50 26 Q82 28 82 44 L82 58 Q82 76 50 78 Q18 76 18 58 Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="3" />
          <path d="M24 50 Q50 56 76 50" stroke={color} strokeWidth="5" strokeLinecap="round" />
          <line x1="18" y1="44" x2="24" y2="50" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
          <line x1="82" y1="44" x2="76" y2="50" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        </svg>
      );

    case "flag":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <line x1="28" y1="18" x2="28" y2="84" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M28 20 L78 30 L62 50 L28 50 Z" fill={color} />
        </svg>
      );

    case "circuit":
      return (
        <svg {...base} viewBox="0 0 100 100" stroke={color} strokeWidth="2.5" fill="none" aria-hidden>
          <rect x="38" y="38" width="24" height="24" rx="3" />
          <line x1="50" y1="18" x2="50" y2="38" />
          <line x1="50" y1="62" x2="50" y2="82" />
          <line x1="18" y1="50" x2="38" y2="50" />
          <line x1="62" y1="50" x2="82" y2="50" />
          <circle cx="50" cy="18" r="5" fill={color} stroke="none" />
          <circle cx="50" cy="82" r="5" fill={color} stroke="none" />
          <circle cx="18" cy="50" r="5" fill={color} stroke="none" />
          <circle cx="82" cy="50" r="5" fill={color} stroke="none" />
          <line x1="26" y1="26" x2="38" y2="38" strokeOpacity="0.5" />
          <circle cx="26" cy="26" r="4" fill={color} stroke="none" fillOpacity="0.5" />
          <line x1="74" y1="26" x2="62" y2="38" strokeOpacity="0.5" />
          <circle cx="74" cy="26" r="4" fill={color} stroke="none" fillOpacity="0.5" />
        </svg>
      );

    case "die":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <rect x="18" y="18" width="64" height="64" rx="12" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="3" />
          <circle cx="35" cy="35" r="6" fill={color} />
          <circle cx="65" cy="35" r="6" fill={color} />
          <circle cx="50" cy="50" r="6" fill={color} />
          <circle cx="35" cy="65" r="6" fill={color} />
          <circle cx="65" cy="65" r="6" fill={color} />
          <circle cx="65" cy="50" r="6" fill={color} />
        </svg>
      );

    case "fish":
      return (
        <svg {...base} viewBox="0 0 100 100" fill={color} aria-hidden>
          <path d="M55 50 Q36 34 12 28 Q28 48 28 50 Q28 52 12 72 Q36 66 55 50 Z" />
          <ellipse cx="68" cy="50" rx="24" ry="16" />
          <circle cx="82" cy="44" r="3.5" fill="rgba(0,0,0,0.55)" />
        </svg>
      );

    case "strawberry":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <path d="M50 88 Q18 68 18 46 Q18 24 50 24 Q82 24 82 46 Q82 68 50 88 Z" fill={color} />
          <path d="M50 24 Q42 10 38 6" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" strokeOpacity="0.7" />
          <path d="M50 24 Q50 8 50 4" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" strokeOpacity="0.7" />
          <path d="M50 24 Q58 10 62 6" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" strokeOpacity="0.7" />
          <circle cx="37" cy="52" r="4.5" fill="rgba(0,0,0,0.22)" />
          <circle cx="63" cy="52" r="4.5" fill="rgba(0,0,0,0.22)" />
          <circle cx="50" cy="70" r="4.5" fill="rgba(0,0,0,0.22)" />
        </svg>
      );

    case "mask":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <path d="M14 38 Q50 18 86 38 L86 64 Q80 84 50 86 Q20 84 14 64 Z" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="3" />
          <ellipse cx="34" cy="52" rx="14" ry="11" fill="rgba(0,0,0,0.42)" />
          <ellipse cx="66" cy="52" rx="14" ry="11" fill="rgba(0,0,0,0.42)" />
        </svg>
      );

    case "sun":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="20" fill={color} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={50 + 25 * Math.cos(r)} y1={50 + 25 * Math.sin(r)}
                x2={50 + 40 * Math.cos(r)} y2={50 + 40 * Math.sin(r)}
                stroke={color} strokeWidth="5.5" strokeLinecap="round"
              />
            );
          })}
        </svg>
      );

    case "circle":
      return (
        <svg {...base} viewBox="0 0 100 100" fill={color} aria-hidden>
          <circle cx="50" cy="50" r="40" />
        </svg>
      );

    case "roman-numeral":
      return (
        <svg {...base} viewBox="0 0 100 100" aria-hidden>
          <text
            x="50" y="68"
            textAnchor="middle"
            fill={color}
            fontSize="42"
            fontFamily="Times New Roman, Times, serif"
            fontStyle="italic"
            fontWeight="700"
          >
            XVI
          </text>
        </svg>
      );

    default:
      return (
        <svg {...base} viewBox="0 0 100 100" fill={color} fillOpacity="0.55" aria-hidden>
          <polygon points="50,12 88,88 12,88" />
        </svg>
      );
  }
}
