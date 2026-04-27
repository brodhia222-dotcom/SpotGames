"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const buildWhatsAppMessage = useCartStore((s) => s.buildWhatsAppMessage);

  const total = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-[400px] z-50 flex flex-col transition-transform duration-300"
        style={{
          background: "var(--color-surface)",
          borderLeft: "1px solid var(--color-border)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-[0.95rem]" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>
              Carrito
            </h2>
            {items.length > 0 && (
              <span
                className="px-2 py-0.5 rounded text-white text-[0.65rem] font-bold"
                style={{ background: "var(--color-purple)", fontFamily: "var(--font-mono)" }}
              >
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="flex items-center justify-center w-8 h-8 rounded transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            aria-label="Cerrar carrito"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.2 }}>
                <path d="M6 6h6l7 22h18l5-16H14" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="38" r="3" fill="var(--color-text)"/>
                <circle cx="34" cy="38" r="3" fill="var(--color-text)"/>
              </svg>
              <p className="text-[0.875rem]" style={{ color: "var(--color-text-muted)" }}>
                Tu carrito está vacío
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 px-5 py-4">
                  {/* Image placeholder */}
                  <div
                    className="w-16 h-16 rounded flex-shrink-0 flex items-center justify-center overflow-hidden"
                    style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
                        <rect x="3" y="7" width="18" height="13" rx="2" stroke="var(--color-text)" strokeWidth="1.5"/>
                        <circle cx="12" cy="13" r="3" stroke="var(--color-text)" strokeWidth="1.5"/>
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.84rem] font-medium leading-tight mb-0.5 truncate" style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}>
                      {product.name}
                    </p>
                    <p className="text-[0.72rem] mb-2" style={{ color: "var(--color-text-muted)" }}>
                      {product.platform}
                    </p>
                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[0.75rem] font-bold transition-colors"
                          style={{ background: "var(--color-surface-2)", color: "var(--color-text-dim)", border: "1px solid var(--color-border)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[0.8rem] font-semibold" style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[0.75rem] font-bold transition-colors"
                          style={{ background: "var(--color-surface-2)", color: "var(--color-text-dim)", border: "1px solid var(--color-border)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                        >
                          +
                        </button>
                      </div>
                      {/* Price */}
                      <p className="text-[0.84rem] font-semibold" style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>
                        ${(product.price * quantity).toLocaleString("es-AR")}
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded transition-colors self-start mt-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                    aria-label="Eliminar"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-5 py-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[0.84rem]" style={{ color: "var(--color-text-dim)" }}>Subtotal</span>
              <span className="text-[1.1rem] font-semibold" style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
            <a
              href={`https://wa.me/541157649264?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full justify-center mb-2"
              style={{ borderRadius: "6px" }}
              onClick={closeDrawer}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ width: 16, height: 16 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            <p className="text-center text-[0.65rem]" style={{ color: "var(--color-text-muted)" }}>
              Los precios son de referencia. Confirmamos disponibilidad por WhatsApp.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
