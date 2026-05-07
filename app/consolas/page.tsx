import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consolas",
  description:
    "Consolas nuevas y retro restauradas. PS5, Switch, Xbox, Steam Deck, PS2, N64 y Sega Genesis.",
};

export default function ConsolasPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <p
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        className="text-sm text-grey-1 uppercase"
      >
        Consolas · Fase 6
      </p>
    </main>
  );
}
