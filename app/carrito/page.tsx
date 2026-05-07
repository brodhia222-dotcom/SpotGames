import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Tu selección de juegos y consolas.",
};

export default function CarritoPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <p
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        className="text-sm text-grey-1 uppercase"
      >
        Carrito · Fase 8
      </p>
    </main>
  );
}
