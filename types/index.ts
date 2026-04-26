export type Platform =
  | "PS5"
  | "PS4"
  | "Xbox"
  | "Switch"
  | "PC"
  | "Retro"
  | "Multiplatforma";

export type Category = "Juegos" | "Consolas" | "Accesorios" | "Retro";

export type ProductState = "Nuevo" | "Usado" | "Oferta";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  platform: Platform;
  category: Category;
  state: ProductState;
  description: string;
  image: string;
  featured: boolean;
  stock: number;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  price?: string;
  icon: string;
  whatsappText: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
