import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(5rem, 15vw, 10rem)",
          fontWeight: 700,
          color: "var(--color-text-muted)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        404
      </p>
      <div>
        <h1
          className="font-bold mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            color: "var(--color-text)",
            letterSpacing: "-0.03em",
          }}
        >
          Página no encontrada
        </h1>
        <p style={{ color: "var(--color-text-dim)", fontSize: "0.9rem" }}>
          El contenido que buscás no existe o fue movido.
        </p>
      </div>
      <Link href="/" className="btn btn-outline btn-sm">
        ← Volver al inicio
      </Link>
    </div>
  );
}
