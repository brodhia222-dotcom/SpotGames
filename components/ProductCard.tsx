"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { ease: "easeOut", duration: 0.18 } },
  exit:    { opacity: 0, transition: { ease: "easeIn", duration: 0.15 } },
};

const stateBadgeStyles: Record<string, string> = {
  Nuevo: "bg-purple-muted/60 text-purple-light border border-purple/40",
  Usado: "bg-green-dark/40 text-green-light border border-green-dark/60",
  Oferta: "bg-amber-500/90 text-black font-bold border-0",
};

const platformColors: Record<string, string> = {
  PS5: "#7C3AED", PS4: "#5B21B6", Xbox: "#22C55E",
  Switch: "#EF4444", PC: "#3B82F6", Retro: "#F59E0B",
  Multiplatforma: "#8B7DAB",
};

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addItem, openDrawer } = useCartStore();
  const platColor = platformColors[product.platform] ?? "#8B7DAB";

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openDrawer();
  }

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ ease: "easeOut", duration: 0.25 }}
      className="group relative bg-surface rounded-2xl overflow-hidden cursor-pointer border border-border transition-colors duration-300"
      style={
        hovered
          ? { boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 24px ${platColor}30`, borderColor: `${platColor}40` }
          : undefined
      }
    >
      <Link href={`/productos/${product.slug}`} className="block">
        {/* ── Image ── */}
        <div className="relative aspect-square overflow-hidden bg-surface-2">
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ ease: "easeOut", duration: 0.45 }}
            className="relative w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
              className="object-cover"
            />
          </motion.div>

          {/* Platform badge — top-left */}
          <span
            className="absolute top-2.5 left-2.5 text-[10px] font-display font-bold px-2 py-0.5 rounded-md backdrop-blur-sm"
            style={{ background: `${platColor}28`, color: platColor, border: `1px solid ${platColor}45` }}
          >
            {product.platform}
          </span>

          {/* State badge — top-right */}
          <span className={`absolute top-2.5 right-2.5 text-[10px] font-display font-bold px-2 py-0.5 rounded-md backdrop-blur-sm ${stateBadgeStyles[product.state]}`}>
            {product.state.toUpperCase()}
          </span>

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex items-end justify-center pb-4"
                style={{ background: "linear-gradient(to top, rgba(10,8,18,0.92) 0%, rgba(10,8,18,0.4) 50%, transparent 100%)" }}
              >
                <motion.button
                  onClick={handleAdd}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-green text-bg font-display font-bold text-sm cursor-pointer transition-colors duration-200 hover:bg-green-light"
                  style={{ boxShadow: "0 0 20px rgba(34,197,94,0.5)" }}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                  </svg>
                  Agregar al carrito
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top gradient overlay for readability */}
          <div className="absolute inset-x-0 top-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(10,8,18,0.55) 0%, transparent 100%)" }} />
        </div>

        {/* ── Card body ── */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-sm text-text leading-snug truncate mb-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-display font-bold text-lg leading-none" style={{ color: platColor !== "#8B7DAB" ? "#A78BFA" : "#8B7DAB" }}>
              ${product.price.toLocaleString("es-AR")}
            </p>
            {product.stock > 0 && product.stock <= 3 && (
              <span className="text-[10px] font-display font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded-md">
                ¡Últimas!
              </span>
            )}
          </div>
        </div>

        {/* Bottom gradient border on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${platColor}, transparent)` }}
        />
      </Link>
    </motion.div>
  );
}
