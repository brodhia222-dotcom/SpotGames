"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

const platformColors: Record<string, string> = {
  PS5: "#006FCD",
  PS4: "#003791",
  Xbox: "#107C10",
  "Xbox Series X": "#107C10",
  Switch: "#E60012",
  PC: "#A855F7",
  Retro: "#F59E0B",
  Multiplatform: "#A855F7",
};

const stateColors: Record<string, string> = {
  Nuevo: "#4ADE80",
  Usado: "#F59E0B",
  Oferta: "#EC4899",
};

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const platformColor = platformColors[product.platform] ?? "#A855F7";
  const stateColor = stateColors[product.state] ?? "#A855F7";
  const bgHex = "0D0818";
  const fgHex = platformColor.replace("#", "");
  const fallbackSrc = `https://placehold.co/800x800/${bgHex}/${fgHex}?text=${encodeURIComponent(product.platform)}`;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group relative block bg-surface border border-border hover:border-transparent transition-all duration-500 overflow-hidden"
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-void">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgError ? fallbackSrc : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Scanlines en imagen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 3px)",
          }}
        />

        {/* Badge estado */}
        <div
          className="absolute top-3 left-3 font-tech text-[10px] font-bold px-2 py-1 bg-void/90 backdrop-blur uppercase tracking-widest"
          style={{ color: stateColor, border: `1px solid ${stateColor}` }}
        >
          {product.state}
        </div>

        {/* Badge plataforma */}
        <div
          className="absolute top-3 right-3 font-tech text-[10px] font-bold px-2 py-1 bg-void/90 backdrop-blur uppercase tracking-widest"
          style={{ color: platformColor, border: `1px solid ${platformColor}` }}
        >
          {product.platform}
        </div>

        {/* HUD corners en hover */}
        <div className="absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
            style={{ borderColor: platformColor }}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
            style={{ borderColor: platformColor }}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
            style={{ borderColor: platformColor }}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
            style={{ borderColor: platformColor }}
          />
        </div>
      </div>

      {/* Glow border en hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 30px ${platformColor}66, inset 0 0 0 1px ${platformColor}`,
        }}
      />

      {/* Info */}
      <div className="relative p-4">
        <h3 className="font-display font-bold text-base text-white group-hover:text-grape-glow transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="font-body text-xs text-muted line-clamp-2 mb-3 min-h-[2rem]">
            {product.description}
          </p>
        )}

        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            {product.originalPrice && (
              <div className="font-tech text-xs text-muted line-through">
                ${product.originalPrice.toLocaleString("es-AR")}
              </div>
            )}
            <div
              className="font-tech text-xl font-bold"
              style={{ color: stateColor }}
            >
              ${product.price.toLocaleString("es-AR")}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="font-tech text-[10px] uppercase tracking-widest px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
            style={{
              color: platformColor,
              border: `1px solid ${platformColor}`,
            }}
          >
            + CART
          </button>
        </div>
      </div>
    </Link>
  );
}
