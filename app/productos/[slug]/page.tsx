import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado | Spot Games" };
  return {
    title: `${product.name} | Spot Games`,
    description: product.description,
  };
}

const stateBadgeStyles: Record<string, string> = {
  Nuevo: "bg-purple-muted text-purple-light border border-purple",
  Usado: "bg-green-dark/40 text-green-light border border-green-dark",
  Oferta: "bg-amber-500 text-black font-bold",
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && (p.platform === product.platform || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-subtle mb-8">
          <Link href="/" className="hover:text-muted transition-colors duration-200">Inicio</Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-muted transition-colors duration-200">Productos</Link>
          <span>/</span>
          <span className="text-muted truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Image */}
          <div className="space-y-3">
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border"
              style={{ boxShadow: "0 0 40px rgba(124,58,237,0.12)" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-surface-2 text-muted text-xs font-display font-semibold border border-border">
                {product.platform}
              </span>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-display font-semibold ${stateBadgeStyles[product.state]}`}
              >
                {product.state}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-2 text-subtle text-xs font-display border border-border">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-text leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <p className="font-display font-bold text-4xl text-purple-light">
                ${product.price.toLocaleString("es-AR")}
              </p>
              <p className="text-xs text-muted mt-1">Precio en pesos argentinos</p>
            </div>

            {/* Description */}
            <p className="text-muted leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green" : "bg-red-500"}`}
              />
              <span className="text-sm text-muted font-display font-semibold">
                {product.stock > 0
                  ? `${product.stock} unidad${product.stock > 1 ? "es" : ""} disponible${product.stock > 1 ? "s" : ""}`
                  : "Sin stock"}
              </span>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* WhatsApp fallback */}
            <a
              href={`https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20sobre%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-3.5 rounded-2xl border border-green-dark text-green-light font-display font-bold text-base text-center hover:bg-green-dark/20 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>

            {/* Guarantee info */}
            {product.state === "Usado" && (
              <div className="mt-4 p-4 rounded-xl bg-green-dark/10 border border-green-dark/30 flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-green-light flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p className="text-sm text-green-light">
                  <strong>Garantía de 30 días.</strong> Este producto fue revisado y aprobado por nuestros técnicos.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-text mb-6">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
