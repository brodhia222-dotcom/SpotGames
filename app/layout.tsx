import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import StoreHydration from "@/components/StoreHydration";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/layout/CartDrawer";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SpotGames — Videojuegos | Buenos Aires",
  description:
    "Juegos nuevos y usados, consolas, accesorios y retro. Reparación, flasheo y trade-in en Buenos Aires.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geist.variable} ${geistMono.variable} ${inter.variable} bg-bg text-text font-body antialiased`}
      >
        <StoreHydration />
        <LenisProvider>
          <Navbar />
          <CartDrawer />
          <main className="relative z-10 overflow-x-hidden w-full max-w-full">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
