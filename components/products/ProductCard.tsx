"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, Platform, ProductState } from "@/types";

const PLATFORM_COLORS: Record<Platform, string> = {
  PS5:            "#006FCD",
  PS4:            "#0050A0",
  Xbox:           "#107C10",
  Switch:         "#E60012",
  PC:             "#4ADE80",
  Retro:          "#C49A6C",
  Multiplatforma: "#A855F7",
};

const PLATFORM_TAG_CLASS: Record<Platform, string> = {
  PS5:            "tag-ps5",
  PS4:            "tag-ps4",
  Xbox:           "tag-xbox",
  Switch:         "tag-switch",
  PC:             "tag-pc",
  Retro:          "tag-retro",
  Multiplatforma: "tag-multi",
};

const STATE_TAG_CLASS: Record<ProductState, string> = {
  Nuevo:  "tag-new",
  Usado:  "tag-used",
  Oferta: "tag-oferta",
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgError, setImgError] = useState(false);
  const color = PLATFORM_COLORS[product.platform] ?? "#A855F7";

  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="block group rounded-[10px] overflow-hidden transition-all duration-250"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-hover)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(168,85,247,0.1), 0 4px 16px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/11", background: "var(--color-surface-2)" }}
      >
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ display: "block" }}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Clean placeholder */
          <img
            src={`https://placehold.co/640x440/111115/${(PLATFORM_COLORS[product.platform] ?? "#A855F7").replace("#", "")}/png?text=${encodeURIComponent(product.platform)}&font=raleway`}
            alt={product.platform}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className={`tag ${PLATFORM_TAG_CLASS[product.platform]}`}>{product.platform}</span>
          <span className={`tag ${STATE_TAG_CLASS[product.state]}`}>{product.state}</span>
        </div>
        <p
          className="font-semibold leading-snug mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "0.875rem", color: "var(--color-text)", lineHeight: 1.35 }}
        >
          {product.name}
        </p>
        <div className="flex items-baseline gap-2">
          {product.originalPrice && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-muted)", textDecoration: "line-through" }}>
              ${product.originalPrice.toLocaleString("es-AR")}
            </span>
          )}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 500, color: "var(--color-text)" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginRight: 2 }}>ARS </span>
            {product.price.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </Link>
  );
}
