const ITEMS = [
  "PS5",
  "Xbox Series X",
  "Nintendo Switch",
  "PC Gaming",
  "Retro",
  "PS4",
  "Accesorios",
  "Trade-In",
  "Reparación",
  "Nuevos & Usados",
];

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div className="py-5 bg-surface border-y border-border overflow-hidden">
      {/* Row 1 — left to right */}
      <div className="flex animate-marquee"
        style={{ animationDuration: "28s" }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 shrink-0 px-6 font-display font-bold text-sm uppercase tracking-[0.2em] text-muted whitespace-nowrap"
          >
            <span className="text-grape text-lg">·</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
