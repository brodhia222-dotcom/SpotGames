import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center relative">
      {/* Game Over */}
      <div>
        <div className="font-pixel text-xs text-grape/60 mb-4 uppercase tracking-widest">
          ERROR 404
        </div>
        <h1
          className="font-pixel text-4xl md:text-6xl text-grape neon-text-grape mb-2"
          style={{ lineHeight: 1.4 }}
        >
          GAME
        </h1>
        <h1
          className="font-pixel text-4xl md:text-6xl text-ctrl neon-text-ctrl"
          style={{ lineHeight: 1.4 }}
        >
          OVER
        </h1>
      </div>

      {/* Vidas parpadeando */}
      <div className="font-pixel text-2xl text-pink animate-blink">
        ♥ ♥ ♥
      </div>

      {/* Mensaje */}
      <div>
        <p className="font-pixel text-[10px] text-muted mb-2">
          INSERT COIN TO CONTINUE
        </p>
        <p className="font-pixel text-[8px] text-dim">
          LA PÁGINA QUE BUSCÁS NO EXISTE
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/"
        className="font-tech text-sm font-bold uppercase tracking-widest px-8 py-4 border border-grape text-grape hover:bg-grape/10 transition-colors duration-300 clip-corner-tr"
      >
        ← VOLVER AL INICIO
      </Link>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <span
          className="font-pixel text-white select-none"
          style={{ fontSize: "clamp(8rem, 30vw, 24rem)" }}
        >
          404
        </span>
      </div>
    </div>
  );
}
