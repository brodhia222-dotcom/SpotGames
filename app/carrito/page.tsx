"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, buildWhatsAppMessage, clearCart } =
    useCartStore();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-20 h-20 text-border">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <h1 className="font-display font-bold text-2xl text-white uppercase tracking-widest">
          Tu carrito está vacío
        </h1>
        <p className="font-body text-muted max-w-sm">
          Explorá el catálogo y agregá los productos que querés.
        </p>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 px-8 py-4 bg-grape text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-grape-d transition-all duration-300 neon-border"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-border flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-grape mb-2">Tu selección</p>
            <h1 className="font-display font-bold text-3xl text-white uppercase">
              Carrito
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="font-display text-xs uppercase tracking-widest text-muted hover:text-danger transition-colors duration-200 cursor-pointer"
          >
            Vaciar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-5 bg-surface border border-border">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-void">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display font-semibold text-white leading-tight">
                        {item.product.name}
                      </p>
                      <p className="font-body text-xs text-muted mt-1">
                        {item.product.platform} · {item.product.state}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted hover:text-danger transition-colors cursor-pointer shrink-0"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-border hover:border-grape hover:text-grape transition-all cursor-pointer"
                      >
                        −
                      </button>
                      <span className="font-tech text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-border hover:border-grape hover:text-grape transition-all cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-tech font-bold text-grape">
                      ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border p-6 sticky top-24">
              <h2 className="font-display font-bold text-sm uppercase tracking-widest text-white mb-6 pb-4 border-b border-border">
                Resumen
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between gap-2">
                    <span className="font-body text-xs text-muted truncate">{item.product.name} x{item.quantity}</span>
                    <span className="font-tech text-xs text-white shrink-0">
                      ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-border flex justify-between items-center mb-6">
                <span className="font-body text-sm text-muted">Total</span>
                <span className="font-tech font-bold text-2xl text-grape">
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>
              <a
                href={`https://wa.me/541157649264?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-ctrl/10 border border-ctrl text-ctrl font-display font-bold text-sm uppercase tracking-widest hover:bg-ctrl/20 transition-all duration-300 ctrl-border"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Confirmar pedido
              </a>
              <p className="text-center font-body text-xs text-muted mt-4">
                Te contactamos para coordinar pago y envío.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
