"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const { addItem, openDrawer } = useCartStore();

  function handleClick() {
    addItem(product);
    openDrawer();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      disabled={product.stock === 0}
      className="relative w-full py-4 rounded-2xl font-display font-bold text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden"
      style={
        product.stock > 0
          ? {
              background: "#7C3AED",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }
          : { background: "#2A2050" }
      }
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="flex items-center justify-center gap-2 text-green-light"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            ¡Agregado al carrito!
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="text-white"
          >
            {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
