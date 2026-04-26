import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
  buildWhatsAppMessage: () => string;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
        get().openDrawer();
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (acc, i) => acc + i.product.price * i.quantity,
          0
        ),

      buildWhatsAppMessage: () => {
        const items = get().items;
        if (items.length === 0) return "";
        const lines = items.map(
          (i) =>
            `• ${i.product.name} (${i.product.platform}) x${i.quantity} — $${(
              i.product.price * i.quantity
            ).toLocaleString("es-AR")}`
        );
        const total = get().getTotalPrice();
        return encodeURIComponent(
          `Hola Spot Games! Me interesa hacer el siguiente pedido:\n\n${lines.join(
            "\n"
          )}\n\nTotal: $${total.toLocaleString("es-AR")}\n\n¿Tienen disponibilidad?`
        );
      },
    }),
    {
      name: "spot-games-cart",
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    }
  )
);
