"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ease: "easeOut", duration: 0.4 }}
              className="font-display font-semibold text-sm uppercase tracking-widest text-purple-light mb-2"
            >
              Selección especial
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-4xl text-text"
            >
              Productos{" "}
              <span className="bg-gradient-to-r from-purple-light to-green-light bg-clip-text text-transparent">
                destacados
              </span>
            </motion.h2>
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ease: "easeOut", duration: 0.6, delay: 0.3 }}
              style={{ originX: 0 }}
              className="mt-3 h-0.5 w-24 rounded-full bg-gradient-to-r from-purple to-green"
            />
          </div>
          <Link
            href="/productos"
            className="font-display font-semibold text-sm text-purple-light hover:text-green-light transition-colors duration-200 flex items-center gap-1 shrink-0"
          >
            Ver todos
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
