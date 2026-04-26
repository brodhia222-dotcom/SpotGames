import type { Metadata } from "next";
import { Rajdhani, Orbitron, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import StoreHydration from "@/components/StoreHydration";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spot Games — Tu local de videojuegos",
  description:
    "Juegos nuevos y usados, consolas, accesorios y retro. Comprá, vendé y jugá en Spot Games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${rajdhani.variable} ${orbitron.variable} ${outfit.variable} bg-void text-white font-body antialiased`}
      >
        <StoreHydration />
        <Navbar />
        <CartDrawer />
        <main className="overflow-x-hidden w-full max-w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
