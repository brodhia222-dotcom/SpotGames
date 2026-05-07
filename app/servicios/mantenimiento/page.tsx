import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mantenimiento Integral",
  description:
    "Limpieza profunda, pasta térmica nueva y revisión completa. 24 a 48 horas. Como el primer día.",
};

export default function MantenimientoPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <p
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        className="text-sm text-grey-1 uppercase"
      >
        Mantenimiento Integral · Fase 7
      </p>
    </main>
  );
}
