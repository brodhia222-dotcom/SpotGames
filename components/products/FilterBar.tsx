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
      className={`px-3 py-1.5 font-display font-semibold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer whitespace-nowrap ${
        active
          ? "bg-grape text-white border border-grape"
          : "bg-transparent text-muted border border-border hover:border-grape/60 hover:text-white"
      }`}
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
        <p className="font-body text-sm text-muted">
          <span className="font-tech text-grape text-base font-bold">{total}</span>{" "}
          producto{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filter groups */}
      <div className="flex flex-wrap gap-6 pb-4 border-b border-border">
        {/* Category */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-display text-xs uppercase tracking-widest text-muted/60 mr-1">
            Categoría:
          </span>
          {CATEGORIES.map((c) => (
            <Pill
              key={c}
              label={c}
              active={activeCategory === c}
              onClick={() => onCategory(c)}
            />
          ))}
        </div>

        {/* Platform */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-display text-xs uppercase tracking-widest text-muted/60 mr-1">
            Plataforma:
          </span>
          {PLATFORMS.map((p) => (
            <Pill
              key={p}
              label={p}
              active={activePlatform === p}
              onClick={() => onPlatform(p)}
            />
          ))}
        </div>

        {/* State */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-display text-xs uppercase tracking-widest text-muted/60 mr-1">
            Estado:
          </span>
          {STATES.map((s) => (
            <Pill
              key={s}
              label={s}
              active={activeState === s}
              onClick={() => onState(s)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
