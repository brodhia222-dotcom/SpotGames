"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import FilterBar from "@/components/products/FilterBar";

function CatalogoContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activePlatform, setActivePlatform] = useState("Todos");
  const [activeState, setActiveState] = useState("Todos");

  useEffect(() => {
    const cat = searchParams.get("categoria");
    const plat = searchParams.get("platform") ?? searchParams.get("plataforma");
    if (cat) setActiveCategory(cat);
    if (plat) setActivePlatform(plat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategory !== "Todos" && p.category !== activeCategory) return false;
      if (activePlatform !== "Todos" && p.platform !== activePlatform) return false;
      if (activeState !== "Todos" && p.state !== activeState) return false;
      return true;
    });
  }, [activeCategory, activePlatform, activeState]);

  return (
    <>
      <FilterBar
        activeCategory={activeCategory}
        activePlatform={activePlatform}
        activeState={activeState}
        onCategory={setActiveCategory}
        onPlatform={setActivePlatform}
        onState={setActiveState}
        total={filtered.length}
      />
      <ProductGrid products={filtered} />
    </>
  );
}

export default function CatalogoPage() {
  return (
    <div className="min-h-screen pb-20 px-6" style={{ paddingTop: "7rem" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 pb-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <p
            className="font-bold uppercase tracking-[0.2em] mb-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              color: "var(--color-text-muted)",
            }}
          >
            Catálogo
          </p>
          <h1
            className="font-bold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.04em",
            }}
          >
            Todos los productos
          </h1>
        </div>

        <Suspense
          fallback={
            <div
              className="py-12 text-center text-sm"
              style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}
            >
              Cargando...
            </div>
          }
        >
          <CatalogoContent />
        </Suspense>
      </div>
    </div>
  );
}
