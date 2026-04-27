"use client";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      disabled={product.stock === 0}
      className="btn btn-primary btn-lg w-full disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
      </svg>
      {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
    </button>
  );
}
