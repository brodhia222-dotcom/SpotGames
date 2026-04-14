export type Platform =
  | "PS5"
  | "PS4"
  | "Xbox"
  | "Switch"
  | "PC"
  | "Retro"
  | "Multiplatforma";

export type ProductState = "Nuevo" | "Usado" | "Oferta";

export type Category = "Juegos" | "Consolas" | "Accesorios" | "Retro";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  platform: Platform;
  category: Category;
  state: ProductState;
  description: string;
  image: string;
  featured: boolean;
  stock: number;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  price?: string;
  whatsappText: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type FilterState = {
  categoria: string;
  plataforma: string;
  estado: string;
  orden: string;
};
