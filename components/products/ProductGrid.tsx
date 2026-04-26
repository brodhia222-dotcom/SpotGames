import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="w-16 h-16 text-border"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
        <p className="font-display font-semibold text-lg text-muted uppercase tracking-widest">
          Sin resultados
        </p>
        <p className="font-body text-sm text-muted/60">
          Probá cambiando los filtros
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
