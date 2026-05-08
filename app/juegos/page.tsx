import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juegos",
  description:
    "Más de 24 títulos para todas las plataformas. PS5, PS4, Switch, Xbox, PC y Retro.",
};

export default function JuegosPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <p
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        className="text-sm text-grey-1 uppercase"
      >
        Juegos · Fase 5
      </p>
    </main>
  );
}
