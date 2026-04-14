"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const sheetVariants: Variants = {
  hidden: { y: "100%", transition: { ease: "easeIn", duration: 0.25 } },
  visible: { y: 0, transition: { ease: "easeOut", duration: 0.3 } },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ease: "easeOut", duration: 0.2 } },
};

const categorias = ["Juegos", "Consolas", "Accesorios", "Retro"];
const plataformas = ["PS5", "PS4", "Xbox", "Switch", "PC", "Retro", "Multiplatforma"];
const estados = ["Nuevo", "Usado", "Oferta"];
const ordenes = [
  { value: "nuevo", label: "Más nuevo" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
];

function PillButton({
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
      className={`px-3 py-1.5 rounded-full font-display font-semibold text-xs whitespace-nowrap cursor-pointer transition-all duration-200 ${
        active
          ? "bg-purple text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]"
          : "bg-surface-2 text-muted border border-border hover:border-purple/50 hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  const currentCat = searchParams.get("categoria") ?? "";
  const currentPlat = searchParams.get("plataforma") ?? "";
  const currentEst = searchParams.get("estado") ?? "";
  const currentOrd = searchParams.get("orden") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const toggleParam = useCallback(
    (key: string, value: string, current: string) => {
      updateParam(key, current === value ? "" : value);
    },
    [updateParam]
  );

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasFilters = currentCat || currentPlat || currentEst || currentOrd;
  const activeCount = [currentCat, currentPlat, currentEst, currentOrd].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Categoría */}
      <div>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-subtle mb-2">
          Categoría
        </p>
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <PillButton
              key={c}
              label={c}
              active={currentCat === c}
              onClick={() => toggleParam("categoria", c, currentCat)}
            />
          ))}
        </div>
      </div>

      {/* Plataforma */}
      <div>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-subtle mb-2">
          Plataforma
        </p>
        <div className="flex flex-wrap gap-2">
          {plataformas.map((p) => (
            <PillButton
              key={p}
              label={p}
              active={currentPlat === p}
              onClick={() => toggleParam("plataforma", p, currentPlat)}
            />
          ))}
        </div>
      </div>

      {/* Estado */}
      <div>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-subtle mb-2">
          Estado
        </p>
        <div className="flex flex-wrap gap-2">
          {estados.map((e) => (
            <PillButton
              key={e}
              label={e}
              active={currentEst === e}
              onClick={() => toggleParam("estado", e, currentEst)}
            />
          ))}
        </div>
      </div>

      {/* Orden */}
      <div>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-subtle mb-2">
          Ordenar por
        </p>
        <div className="flex flex-wrap gap-2">
          {ordenes.map((o) => (
            <PillButton
              key={o.value}
              label={o.label}
              active={currentOrd === o.value}
              onClick={() => toggleParam("orden", o.value, currentOrd)}
            />
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="font-display font-semibold text-xs text-muted hover:text-red-400 transition-colors duration-200 cursor-pointer underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop filter bar */}
      <div className="hidden md:block bg-surface border-b border-border sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <FilterContent />
        </div>
      </div>

      {/* Mobile — "Filtros" button + bottom sheet */}
      <div className="md:hidden sticky top-16 z-20 bg-surface border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-muted font-display font-semibold text-sm cursor-pointer hover:border-purple/50 hover:text-text transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filtros
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-purple text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {activeCount}
            </span>
          )}
        </button>

        {/* Active filters summary on mobile */}
        {hasFilters && (
          <div className="flex gap-1.5 overflow-x-auto flex-1 scrollbar-hide">
            {[
              { key: "categoria", val: currentCat },
              { key: "plataforma", val: currentPlat },
              { key: "estado", val: currentEst },
              { key: "orden", val: ordenes.find((o) => o.value === currentOrd)?.label ?? "" },
            ]
              .filter((f) => f.val)
              .map((f) => (
                <button
                  key={f.key}
                  onClick={() => updateParam(f.key, "")}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-muted text-purple-light text-xs font-display font-semibold whitespace-nowrap cursor-pointer"
                >
                  {f.val}
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 opacity-70">
                    <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 11.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
                  </svg>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="sheet"
              variants={sheetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border rounded-t-2xl p-6 md:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg text-text">Filtros</h3>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors duration-200 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterContent />
              <button
                onClick={() => setSheetOpen(false)}
                className="mt-6 w-full py-3 rounded-xl bg-purple text-white font-display font-bold text-sm cursor-pointer"
                style={{ boxShadow: "0 0 16px rgba(124,58,237,0.35)" }}
              >
                Ver resultados
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
