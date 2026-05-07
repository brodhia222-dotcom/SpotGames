import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reparación Electrónica",
  description:
    "HDMI roto, joystick drift, lector de discos, sobrecalentamiento. Diagnóstico gratis. Garantía 90 días.",
};

export default function ReparacionPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <p
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        className="text-sm text-grey-1 uppercase"
      >
        Reparación Electrónica · Fase 7
      </p>
    </main>
  );
}
