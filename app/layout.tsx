import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const rajdhani = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spot Games | Videojuegos en Argentina",
  description:
    "Consolas, juegos, accesorios y retro en Argentina. Compra, venta y reparación de videojuegos. Envíos a todo el país. Seguinos en @spotgames.ar",
  openGraph: {
    title: "Spot Games | Videojuegos en Argentina",
    description:
      "Tu tienda gamer de confianza. Nuevos, usados, retro y accesorios.",
    siteName: "Spot Games",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${rajdhani.variable} ${inter.variable}`}>
      <body className="antialiased bg-bg text-text min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
