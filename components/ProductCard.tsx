"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ease: "easeOut", duration: 0.2 } },
  exit: { opacity: 0, transition: { ease: "easeIn", duration: 0.15 } },
};

const stateBadgeStyles: Record<string, string> = {
  Nuevo: "bg-purple-muted text-purple-light border border-purple",
  Usado: "bg-green-dark/40 text-green-light border border-green-dark",
  Oferta: "bg-amber-500 text-black font-bold",
};

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem, openDrawer } = useCartStore();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openDrawer();
  }

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-surface rounded-xl overflow-hidden cursor-pointer border border-border transition-colors duration-300 hover:border-purple/50"
      style={
        hovered
          ? { boxShadow: "0 0 20px rgba(124,58,237,0.25)" }
          : undefined
      }
    >
      <Link href={`/productos/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-surface-2">
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="relative w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          {/* Platform badge — top left */}
          <span className="absolute top-2 left-2 text-xs font-display font-semibold px-2 py-0.5 rounded bg-bg/80 text-muted border border-border backdrop-blur-sm">
            {product.platform}
          </span>

          {/* State badge — top right */}
          <span
            className={`absolute top-2 right-2 text-xs font-display font-semibold px-2 py-0.5 rounded ${stateBadgeStyles[product.state]}`}
          >
            {product.state.toUpperCase()}
          </span>

          {/* Hover overlay — "Agregar al carrito" */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent"
              >
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-green text-bg font-display font-semibold text-sm cursor-pointer transition-colors duration-200 hover:bg-green-light"
                  style={{ boxShadow: "0 0 16px rgba(34,197,94,0.35)" }}
                >
                  + Agregar al carrito
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card body */}
        <div className="p-3">
          <h3 className="font-display font-semibold text-base text-text leading-tight truncate">
            {product.name}
          </h3>
          <p className="font-display font-bold text-lg text-purple-light mt-1">
            ${product.price.toLocaleString("es-AR")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
