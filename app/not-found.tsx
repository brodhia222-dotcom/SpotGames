import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p
        className="font-tech font-bold text-grape"
        style={{ fontSize: "clamp(6rem, 15vw, 12rem)", lineHeight: 1, opacity: 0.15 }}
      >
        404
      </p>
      <div className="-mt-12">
        <h1 className="font-display font-bold text-3xl text-white uppercase tracking-widest mb-4">
          Página no encontrada
        </h1>
        <p className="font-body text-muted max-w-sm">
          La página que buscás no existe o fue movida. Volvé al inicio.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-grape text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-grape-d transition-all duration-300 neon-border"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
