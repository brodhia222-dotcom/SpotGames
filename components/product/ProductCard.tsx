"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GameBox } from "@/components/product/GameBox";
import { cn, formatPrice } from "@/lib/utils";

interface GameCover {
  gradient: string;
  accentColor: string;
  textColor: string;
  symbol: string;
}

interface ProductCardProps {
  id: string;
  title: string;
  developer: string;
  platform: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  cover: GameCover;
  index?: number;
}

export function ProductCard({
  id,
  title,
  developer,
  platform,
  price,
  originalPrice,
  discount,
  stock,
  cover,
  index = 0,
}: ProductCardProps) {
  const isSoldOut = stock === 0;
  const primaryPlatform = platform[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.26, delay: index * 0.04 }}
    >
      <Link
        href={`/juegos/${id}`}
        className={cn(
          "group block focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          "rounded-[4px]"
        )}
        aria-label={`${title} — ${primaryPlatform} — ${formatPrice(price)}`}
      >
        {/* Game box mockup */}
        <div className="flex items-center justify-center mb-5">
          <GameBox
            title={title}
            developer={developer}
            platform={primaryPlatform}
            cover={cover}
            size="sm"
          />
        </div>

        {/* Info */}
        <div className="space-y-1">
          {/* Developer + platform */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-grey-2 truncate">
              {developer}
            </span>
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.1em] shrink-0",
                "px-1.5 py-0.5 rounded-[2px]",
                "border border-[rgba(10,10,10,0.16)] text-ink"
              )}
            >
              {primaryPlatform}
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "font-display font-semibold text-[14px] text-ink leading-snug",
              "group-hover:text-violet transition-colors truncate"
            )}
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            {title}
          </h3>

          {/* Price row */}
          <div className="flex items-center gap-2 pt-0.5">
            {isSoldOut ? (
              <span className="font-mono text-[12px] text-grey-3 uppercase tracking-[0.1em]">
                Sin stock
              </span>
            ) : (
              <>
                <span className="font-mono text-[14px] font-medium text-ink">
                  {formatPrice(price)}
                </span>
                {discount && discount > 0 && (
                  <span className="font-mono text-[10px] font-semibold text-neon-deep bg-ink px-1.5 py-0.5 rounded-[2px]">
                    -{discount}%
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
