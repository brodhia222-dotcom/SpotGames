"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div
        className="w-full h-full"
        style={{
          background: "repeating-linear-gradient(-45deg, #17171E 0px, #17171E 8px, #121218 8px, #121218 16px)",
        }}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setErr(true)}
    />
  );
}

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, buildWhatsAppMessage, clearCart } =
    useCartStore();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ paddingTop: "6rem" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} style={{ width: 64, height: 64, color: "var(--color-border)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <div>
          <h1
            className="font-bold mb-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-text)", letterSpacing: "-0.03em" }}
          >
            Tu carrito está vacío
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-dim)" }}>
            Explorá el catálogo y agregá los productos que querés.
          </p>
        </div>
        <Link href="/catalogo" className="btn btn-primary">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-6" style={{ paddingTop: "7rem" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 pb-6 flex items-end justify-between" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div>
            <p
              className="font-bold uppercase tracking-[0.2em] mb-2"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--color-text-muted)" }}
            >
              Tu selección
            </p>
            <h1
              className="font-bold"
              style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-text)", letterSpacing: "-0.04em" }}
            >
              Carrito
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="cursor-pointer transition-opacity hover:opacity-60"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-text-muted)" }}
          >
            Vaciar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <div className="relative w-20 h-20 shrink-0 overflow-hidden" style={{ background: "var(--color-surface-2)" }}>
                  <ProductImage src={item.product.image} alt={item.product.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="font-semibold leading-tight mb-1"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-text)", fontSize: "0.9rem" }}
                      >
                        {item.product.name}
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                        {item.product.platform} · {item.product.state}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="cursor-pointer transition-opacity hover:opacity-60 shrink-0"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16 }}>
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-70"
                        style={{
                          width: 28, height: 28,
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        −
                      </button>
                      <span
                        className="w-5 text-center"
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.84rem", color: "var(--color-text)" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-70"
                        style={{
                          width: 28, height: 28,
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-text)" }}>
                      ARS&nbsp;{(item.product.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div
              className="p-6 sticky top-24"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <h2
                className="font-bold mb-6 pb-4 uppercase tracking-[0.1em]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--color-text)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                Resumen
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between gap-2">
                    <span
                      className="truncate"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-text-muted)" }}
                    >
                      {item.product.name} ×{item.quantity}
                    </span>
                    <span
                      className="shrink-0"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-text)" }}
                    >
                      ARS&nbsp;{(item.product.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="pt-4 flex justify-between items-center mb-6"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--color-text-muted)" }}>
                  Total
                </span>
                <span
                  className="font-bold"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", color: "var(--color-text)" }}
                >
                  ARS&nbsp;{total.toLocaleString("es-AR")}
                </span>
              </div>
              <a
                href={`https://wa.me/541157649264?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg w-full"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Confirmar pedido
              </a>
              <p
                className="text-center mt-4"
                style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}
              >
                Te contactamos para coordinar pago y envío.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
