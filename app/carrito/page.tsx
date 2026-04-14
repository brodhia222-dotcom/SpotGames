"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.3 } },
  exit: { opacity: 0, x: 16, transition: { ease: "easeIn", duration: 0.2 } },
};

export default function CarritoPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const total = getTotalPrice();

  function buildWhatsAppMessage() {
    const lines = items.map(
      (i) =>
        `• ${i.product.name} (${i.product.platform}) x${i.quantity} — $${(i.product.price * i.quantity).toLocaleString("es-AR")}`
    );
    const text = [
      "Hola! Quiero hacer el siguiente pedido:",
      "",
      ...lines,
      "",
      `TOTAL: $${total.toLocaleString("es-AR")}`,
      "",
      "¿Cómo coordino el pago y envío?",
    ].join("\n");
    return `https://wa.me/5491100000000?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="min-h-screen bg-bg pt-16">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="font-display font-semibold text-sm uppercase tracking-widest text-purple-light mb-1">
            Mi selección
          </p>
          <h1 className="font-display font-bold text-3xl text-text">Carrito</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-surface flex items-center justify-center mb-4 border border-border">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10 text-subtle">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <p className="font-display font-bold text-2xl text-text mb-2">Tu carrito está vacío</p>
            <p className="text-muted text-sm mb-6">Explorá nuestro catálogo y sumá lo que más te gusta.</p>
            <Link
              href="/productos"
              className="px-6 py-3 rounded-xl bg-purple text-white font-display font-bold text-sm hover:bg-purple-glow transition-colors duration-200"
              style={{ boxShadow: "0 0 16px rgba(124,58,237,0.35)" }}
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items table */}
            <div className="lg:col-span-2">
              <div className="bg-surface rounded-2xl border border-border overflow-hidden">
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-border">
                  <span className="font-display font-semibold text-xs uppercase tracking-widest text-subtle">Producto</span>
                  <span className="font-display font-semibold text-xs uppercase tracking-widest text-subtle text-center w-24">Precio</span>
                  <span className="font-display font-semibold text-xs uppercase tracking-widest text-subtle text-center w-24">Cantidad</span>
                  <span className="font-display font-semibold text-xs uppercase tracking-widest text-subtle text-right w-24">Subtotal</span>
                </div>

                {/* Rows */}
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto] gap-3 sm:gap-4 items-start sm:items-center px-5 sm:px-6 py-4 border-b border-border last:border-0"
                    >
                      {/* Product info */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link href={`/productos/${item.product.slug}`}>
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-2 flex-shrink-0 hover:opacity-80 transition-opacity duration-200">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/productos/${item.product.slug}`}>
                            <p className="font-display font-semibold text-sm text-text truncate hover:text-purple-light transition-colors duration-200">
                              {item.product.name}
                            </p>
                          </Link>
                          <p className="text-xs text-subtle">{item.product.platform} · {item.product.state}</p>
                          {/* Mobile price */}
                          <p className="sm:hidden font-display font-bold text-purple-light text-sm mt-1">
                            ${item.product.price.toLocaleString("es-AR")}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Eliminar"
                          className="sm:hidden text-subtle hover:text-red-400 transition-colors duration-200 cursor-pointer ml-auto"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>

                      {/* Unit price */}
                      <span className="hidden sm:block font-display font-semibold text-sm text-muted w-24 text-center">
                        ${item.product.price.toLocaleString("es-AR")}
                      </span>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 sm:w-24 sm:justify-center">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Reducir"
                          className="w-7 h-7 rounded-lg bg-surface-2 border border-border text-text flex items-center justify-center hover:border-purple/50 transition-colors duration-200 cursor-pointer font-bold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-display font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Aumentar"
                          className="w-7 h-7 rounded-lg bg-surface-2 border border-border text-text flex items-center justify-center hover:border-purple/50 transition-colors duration-200 cursor-pointer font-bold"
                        >
                          +
                        </button>
                        {/* Remove — desktop */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Eliminar"
                          className="hidden sm:flex text-subtle hover:text-red-400 transition-colors duration-200 cursor-pointer ml-1"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="hidden sm:block font-display font-bold text-sm text-purple-light w-24 text-right">
                        ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <Link
                  href="/productos"
                  className="flex items-center gap-1.5 font-display font-semibold text-sm text-muted hover:text-text transition-colors duration-200"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" />
                  </svg>
                  Seguir comprando
                </Link>
                <button
                  onClick={clearCart}
                  className="font-display font-semibold text-sm text-subtle hover:text-red-400 transition-colors duration-200 cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg text-text mb-5">
                  Resumen del pedido
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted truncate flex-1 mr-2">
                        {item.product.name}{" "}
                        <span className="text-subtle">×{item.quantity}</span>
                      </span>
                      <span className="text-text font-display font-semibold flex-shrink-0">
                        ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted text-sm">Subtotal</span>
                    <span className="font-display font-bold text-xl text-text">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <p className="text-xs text-subtle">
                    Envío a coordinar por WhatsApp según destino.
                  </p>
                </div>

                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green text-bg font-display font-bold text-base cursor-pointer hover:bg-green-light transition-colors duration-200"
                  style={{ boxShadow: "0 0 16px rgba(34,197,94,0.35)" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Finalizar por WhatsApp
                </a>

                <p className="text-xs text-subtle text-center mt-3">
                  Te mandamos los detalles de pago y envío
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
