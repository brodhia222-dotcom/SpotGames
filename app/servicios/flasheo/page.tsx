import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flasheo & Chipeo",
  description:
    "Modificamos tu consola para que cargue cualquier juego. PS2, PS3, Wii, 3DS, Switch V1, Xbox 360. Diagnóstico gratis.",
};

export default function FlasheoPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <p
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        className="text-sm text-grey-1 uppercase"
      >
        Flasheo & Chipeo · Fase 7
      </p>
    </main>
  );
}
