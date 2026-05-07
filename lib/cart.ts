const CART_KEY = "spotgames_cart";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  platform: string[];
  quantity: number;
  coverTheme: string;
  coverGradient: string;
  coverAccent: string;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart-change", { detail: { items } }));
}

export function addToCart(item: Omit<CartItem, "quantity">): CartItem[] {
  const cart = getCart();
  const existingIndex = cart.findIndex((c) => c.id === item.id);
  if (existingIndex !== -1) {
    const updated = [...cart];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: updated[existingIndex].quantity + 1,
    };
    saveCart(updated);
    return updated;
  }
  const updated = [...cart, { ...item, quantity: 1 }];
  saveCart(updated);
  return updated;
}

export function removeFromCart(id: string): CartItem[] {
  const updated = getCart().filter((c) => c.id !== id);
  saveCart(updated);
  return updated;
}

export function updateQuantity(id: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeFromCart(id);
  const updated = getCart().map((c) =>
    c.id === id ? { ...c, quantity } : c
  );
  saveCart(updated);
  return updated;
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent("cart-change", { detail: { items: [] } }));
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}
