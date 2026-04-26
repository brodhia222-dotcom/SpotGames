import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import AddToCartButton from "@/components/products/AddToCartButton";
import ProductCard from "@/components/products/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

const STATE_STYLES: Record<string, string> = {
  Nuevo: "text-ctrl border-ctrl bg-ctrl/10",
  Usado: "text-grape-glow border-grape-glow bg-grape/10",
  Oferta: "text-danger border-danger bg-danger/10",
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.platform === product.platform
  ).slice(0, 4);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <nav className="flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-white transition-colors">Productos</Link>
          <span>/</span>
          <span className="text-grape">{product.name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface border border-border">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-void">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.originalPrice && (
              <div className="absolute top-6 left-6 px-3 py-1.5 bg-danger text-white font-display font-bold text-sm uppercase tracking-widest">
                Oferta
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-10 flex flex-col">
            {/* Platform + State */}
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 font-display font-bold text-xs uppercase tracking-widest text-white bg-grape">
                {product.platform}
              </span>
              <span
                className={`px-3 py-1 font-display font-bold text-xs uppercase tracking-widest border ${
                  STATE_STYLES[product.state]
                }`}
              >
                {product.state}
              </span>
              <span className="font-display text-xs uppercase tracking-widest text-muted ml-auto">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-white uppercase leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.originalPrice && (
                <span className="font-tech text-lg text-muted line-through">
                  ${product.originalPrice.toLocaleString("es-AR")}
                </span>
              )}
              <span className="font-tech font-bold text-4xl text-grape">
                ${product.price.toLocaleString("es-AR")}
              </span>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-8">
              <span
                className={`w-2 h-2 rounded-full ${
                  product.stock > 3 ? "bg-ctrl" : product.stock > 0 ? "bg-yellow-400" : "bg-danger"
                }`}
              />
              <span className="font-body text-sm text-muted">
                {product.stock > 3
                  ? "Stock disponible"
                  : product.stock > 0
                  ? `Solo ${product.stock} unidad${product.stock !== 1 ? "es" : ""}`
                  : "Sin stock"}
              </span>
            </div>

            {/* Description */}
            <p className="font-body text-muted leading-relaxed mb-8 pb-8 border-b border-border">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <AddToCartButton product={product} />
              <a
                href={`https://wa.me/541157649264?text=${encodeURIComponent(
                  `Hola Spot Games! Me interesa: ${product.name} (${product.platform}) — $${product.price.toLocaleString("es-AR")}. ¿Tienen disponibilidad?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 border border-ctrl text-ctrl font-display font-bold text-sm uppercase tracking-widest hover:bg-ctrl/10 transition-all duration-300 ctrl-border"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-bold text-xl text-white uppercase tracking-widest mb-8">
              También en {product.platform}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
