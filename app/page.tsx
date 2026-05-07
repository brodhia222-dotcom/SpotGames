export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <div className="text-center">
        <p
          style={{ fontFamily: "var(--font-display)" }}
          className="text-5xl font-bold tracking-tight text-ink"
        >
          Spot{" "}
          <em
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--violet)",
            }}
          >
            Games
          </em>
        </p>
        <p
          className="mt-4 text-grey-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Fase 0 completa · Tokens cargados · Próximo: Fase 1
        </p>
      </div>
    </main>
  );
}
