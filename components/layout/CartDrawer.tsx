"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, getTotalPrice, buildWhatsAppMessage } =
    useCartStore();

  const total = getTotalPrice();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border z-50 flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display font-bold text-lg uppercase tracking-widest text-white">
            Tu Carrito
          </h2>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-white transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-16 h-16 text-border">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p className="text-muted font-body text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-surface-2 border border-border">
                <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-void">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-white truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted font-body mt-0.5">
                    {item.product.platform} · {item.product.state}
                  </p>
                  <p className="font-tech text-grape text-sm mt-1">
                    ${item.product.price.toLocaleString("es-AR")}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border border-border text-muted hover:border-grape hover:text-grape transition-colors text-sm cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-tech text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border border-border text-muted hover:border-grape hover:text-grape transition-colors text-sm cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto text-muted hover:text-danger transition-colors cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-muted text-sm">Total</span>
              <span className="font-tech font-bold text-xl text-grape">
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
              Confirmar por WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
