const items = [
  { icon: "🎮", text: "PlayStation 5" },
  { icon: "⚡", text: "Xbox Series" },
  { icon: "🍄", text: "Nintendo Switch" },
  { icon: "👾", text: "Retro & Clásicos" },
  { icon: "🔧", text: "Reparaciones" },
  { icon: "🔄", text: "Trade-In" },
  { icon: "✅", text: "Garantía Incluida" },
  { icon: "📦", text: "Envíos a todo el país" },
  { icon: "🎮", text: "PlayStation 4" },
  { icon: "🖥️", text: "Gaming PC" },
  { icon: "⭐", text: "Usados Premium" },
  { icon: "🏆", text: "5 años en el mercado" },
];

const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-3.5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #130F24, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #130F24, transparent)" }} />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-6 font-display font-semibold text-sm text-muted whitespace-nowrap shrink-0"
          >
            <span className="text-base">{item.icon}</span>
            {item.text}
            <span className="ml-4 w-1 h-1 rounded-full bg-purple-muted inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
