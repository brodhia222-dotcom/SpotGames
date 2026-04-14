"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { ease: "easeIn", duration: 0.25 },
  },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ease: "easeOut", duration: 0.2 } },
  exit: { opacity: 0, transition: { ease: "easeIn", duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeOut", duration: 0.3 },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export default function CartDrawer() {
  const { isOpen, items, closeDrawer, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-surface border-l border-border flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-display text-xl font-bold text-text">
                Tu carrito
              </h2>
              <button
                onClick={closeDrawer}
                aria-label="Cerrar carrito"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors duration-200 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted px-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16 opacity-30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <p className="font-display text-lg font-semibold">Tu carrito está vacío</p>
                <p className="text-sm text-center text-subtle">¡Sumá productos y empezá a armar tu pedido!</p>
                <button
                  onClick={closeDrawer}
                  className="mt-2 px-5 py-2 rounded-lg border border-purple text-purple-light font-display font-semibold text-sm hover:bg-purple-muted transition-colors duration-200 cursor-pointer"
                >
                  Ver productos
                </button>
              </div>
            ) : (
              <motion.ul
                key="items"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
              >
                {items.map((item) => (
                  <motion.li
                    key={item.product.id}
                    variants={itemVariants}
                    className="flex gap-3"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface-2 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm text-text truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted">{item.product.platform}</p>
                      <p className="font-display font-bold text-purple-light text-sm mt-1">
                        ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        aria-label="Eliminar"
                        className="text-subtle hover:text-red-400 transition-colors duration-200 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Reducir cantidad"
                          className="w-6 h-6 rounded bg-surface-2 text-text flex items-center justify-center hover:bg-border transition-colors duration-200 cursor-pointer font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-display font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                          className="w-6 h-6 rounded bg-surface-2 text-text flex items-center justify-center hover:bg-border transition-colors duration-200 cursor-pointer font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted text-sm">Total</span>
                  <span className="font-display font-bold text-xl text-text">
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>
                <Link
                  href="/carrito"
                  onClick={closeDrawer}
                  className="block w-full py-3 rounded-xl bg-purple text-white font-display font-bold text-center text-sm hover:bg-purple-glow transition-colors duration-200 cursor-pointer"
                  style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
                >
                  Ir al carrito
                </Link>
                <button
                  onClick={closeDrawer}
                  className="block w-full py-2.5 rounded-xl border border-border text-muted font-display font-semibold text-sm text-center hover:border-purple/50 hover:text-text transition-colors duration-200 cursor-pointer"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
