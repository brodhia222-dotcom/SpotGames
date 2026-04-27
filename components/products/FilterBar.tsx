"use client";

import type { Category, Platform, ProductState } from "@/types";

const CATEGORIES: Array<Category | "Todos"> = [
  "Todos",
  "Juegos",
  "Consolas",
  "Accesorios",
  "Retro",
];
const PLATFORMS: Array<Platform | "Todos"> = [
  "Todos",
  "PS5",
  "PS4",
  "Xbox",
  "Switch",
  "PC",
  "Retro",
  "Multiplatforma",
];
const STATES: Array<ProductState | "Todos"> = [
  "Todos",
  "Nuevo",
  "Usado",
  "Oferta",
];

interface FilterBarProps {
  activeCategory: string;
  activePlatform: string;
  activeState: string;
  onCategory: (v: string) => void;
  onPlatform: (v: string) => void;
  onState: (v: string) => void;
  total: number;
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer whitespace-nowrap transition-all duration-200"
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "0.72rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "6px 12px",
        border: `1px solid ${active ? "var(--color-purple)" : "var(--color-border)"}`,
        background: active ? "var(--color-purple)" : "transparent",
        color: active ? "#fff" : "var(--color-text-muted)",
        borderRadius: 4,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(168,85,247,0.4)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-muted)";
        }
      }}
    >
      {label}
    </button>
  );
}

export default function FilterBar({
  activeCategory,
  activePlatform,
  activeState,
  onCategory,
  onPlatform,
  onState,
  total,
}: FilterBarProps) {
  return (
    <div className="space-y-4 mb-10">
      {/* Stats row */}
      <div className="flex items-center justify-between">
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--color-text-muted)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, color: "var(--color-purple)" }}>
            {total}
          </span>{" "}
          producto{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filter groups */}
      <div className="flex flex-wrap gap-6 pb-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex flex-wrap gap-2 items-center">
          <span
            className="mr-1"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", opacity: 0.6 }}
          >
            Categoría:
          </span>
          {CATEGORIES.map((c) => (
            <Pill key={c} label={c} active={activeCategory === c} onClick={() => onCategory(c)} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span
            className="mr-1"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", opacity: 0.6 }}
          >
            Plataforma:
          </span>
          {PLATFORMS.map((p) => (
            <Pill key={p} label={p} active={activePlatform === p} onClick={() => onPlatform(p)} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span
            className="mr-1"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", opacity: 0.6 }}
          >
            Estado:
          </span>
          {STATES.map((s) => (
            <Pill key={s} label={s} active={activeState === s} onClick={() => onState(s)} />
          ))}
        </div>
      </div>
    </div>
  );
}
