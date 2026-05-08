import type { Metadata } from "next";
import { Space_Grotesk, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/effects/LenisProvider";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { PageWipe } from "@/components/effects/PageWipe";
import { WhatsAppBubble } from "@/components/ui/WhatsAppBubble";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s · Spot Games",
    default: "Spot Games — Videojuegos, Consolas & Servicio Técnico en Belgrano",
  },
  description:
    "Tienda de videojuegos y consolas nuevas y retro restauradas. Flasheo, reparación electrónica y mantenimiento integral. Local en Av. Cabildo 2230, Belgrano, CABA.",
  metadataBase: new URL("https://spotgames.com.ar"),
  openGraph: {
    siteName: "Spot Games",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${spaceGrotesk.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        <LenisProvider>
          <Header />
          <main className="overflow-x-hidden w-full">
            {children}
          </main>
          <Footer />
          {/* Effects rendered outside main — portal to body internally */}
          <CursorTrail />
          <PageWipe />
          <WhatsAppBubble />
        </LenisProvider>
      </body>
    </html>
  );
}
