"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import FilterBar from "@/components/products/FilterBar";

function ProductosContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activePlatform, setActivePlatform] = useState("Todos");
  const [activeState, setActiveState] = useState("Todos");

  useEffect(() => {
    const cat = searchParams.get("categoria");
    const plat = searchParams.get("plataforma");
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

export default function ProductosPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-b border-border pb-10">
          <p className="font-display font-semibold text-xs uppercase tracking-widest text-grape mb-3">
            Catálogo
          </p>
          <h1
            className="font-display font-bold text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Todos los productos
          </h1>
        </div>

        <Suspense fallback={<div className="text-muted font-body py-12 text-center">Cargando...</div>}>
          <ProductosContent />
        </Suspense>
      </div>
    </div>
  );
}
