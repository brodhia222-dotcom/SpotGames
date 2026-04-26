"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

const STATE_STYLES: Record<string, string> = {
  Nuevo: "text-ctrl border-ctrl",
  Usado: "text-grape-glow border-grape-glow",
  Oferta: "text-danger border-danger",
};

const PLATFORM_COLORS: Record<string, string> = {
  PS5: "#003791",
  PS4: "#00439C",
  Xbox: "#107C10",
  Switch: "#E60012",
  PC: "#A855F7",
  Retro: "#F59E0B",
  Multiplatforma: "#6B7280",
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group relative bg-surface border border-border flex flex-col overflow-hidden transition-all duration-500 hover:border-grape/60 hover:glow-grape">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-void">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-70"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Hover tint */}
        <div className="absolute inset-0 bg-grape/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`inline-flex px-2 py-0.5 border font-display font-bold text-xs uppercase tracking-wider bg-void/90 ${
              STATE_STYLES[product.state] || "text-white border-border"
            }`}
          >
            {product.state}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span
            className="inline-flex px-2 py-0.5 font-display font-bold text-xs uppercase tracking-wider text-white"
            style={{ backgroundColor: PLATFORM_COLORS[product.platform] || "#6B7280" }}
          >
            {product.platform}
          </span>
        </div>

        {/* Quick add */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 flex items-center gap-2 px-4 py-2 bg-grape text-white font-display font-bold text-xs uppercase tracking-widest whitespace-nowrap cursor-pointer"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Agregar
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-display font-semibold text-base text-white hover:text-grape transition-colors duration-200 leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="font-body text-xs text-muted mt-1.5 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-end justify-between mt-4 pt-3 border-t border-border">
          <div>
            {product.originalPrice && (
              <p className="font-tech text-xs text-muted line-through">
                ${product.originalPrice.toLocaleString("es-AR")}
              </p>
            )}
            <p className="font-tech font-bold text-lg text-grape">
              ${product.price.toLocaleString("es-AR")}
            </p>
          </div>
          <span
            className="font-body text-xs text-muted"
            title="Stock disponible"
          >
            Stock: {product.stock}
          </span>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-grape scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
