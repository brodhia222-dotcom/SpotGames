import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import type { Category, Platform, ProductState } from "@/types";

interface ProductosPageProps {
  searchParams: Promise<{
    categoria?: string;
    plataforma?: string;
    estado?: string;
    orden?: string;
  }>;
}

export const metadata = {
  title: "Productos | Spot Games",
  description:
    "Catálogo completo de consolas, juegos, accesorios y retro. Nuevos y usados con garantía.",
};

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const params = await searchParams;

  let filtered = [...products];

  if (params.categoria) {
    filtered = filtered.filter((p) => p.category === (params.categoria as Category));
  }
  if (params.plataforma) {
    filtered = filtered.filter((p) => p.platform === (params.plataforma as Platform));
  }
  if (params.estado) {
    filtered = filtered.filter((p) => p.state === (params.estado as ProductState));
  }

  if (params.orden === "precio-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (params.orden === "precio-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (params.orden === "nuevo") {
    filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-16">
      {/* Page header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="font-display font-semibold text-sm uppercase tracking-widest text-purple-light mb-1">
            Catálogo
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-text">
            Todos los productos
          </h1>
          <p className="text-muted text-sm mt-2">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
            {params.categoria || params.plataforma || params.estado
              ? " con los filtros aplicados"
              : " disponibles"}
          </p>
        </div>
      </div>

      {/* FilterBar needs useSearchParams — wrapped in Suspense */}
      <Suspense fallback={<div className="h-16 bg-surface border-b border-border" />}>
        <FilterBar />
      </Suspense>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
