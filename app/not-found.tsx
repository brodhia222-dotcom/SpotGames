import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 text-center pt-16">
      <p className="font-display font-bold text-8xl text-purple/20 mb-4 select-none">404</p>
      <h1 className="font-display font-bold text-3xl text-text mb-3">
        Página no encontrada
      </h1>
      <p className="text-muted text-base mb-8 max-w-sm">
        Esta página no existe o fue movida. Volvé al inicio para seguir explorando.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-purple text-white font-display font-bold text-sm hover:bg-purple-glow transition-colors duration-200"
        style={{ boxShadow: "0 0 16px rgba(124,58,237,0.35)" }}
      >
        Ir al inicio
      </Link>
    </div>
  );
}
