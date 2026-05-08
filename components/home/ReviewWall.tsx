"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { OutlineReveal } from "@/components/effects/OutlineReveal";
import { cn } from "@/lib/utils";
import reviewsData from "@/data/reviews.json";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const HEADER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const HEADER_ITEM = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } },
};

const COL1 = reviewsData.slice(0, 6);
const COL2 = reviewsData.slice(6, 11);
const COL3 = reviewsData.slice(11, 16);

const COL1_OFFSET = 0;
const COL2_OFFSET = 0.10;
const COL3_OFFSET = 0.20;

export function ReviewWall() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref    = useRef<HTMLDivElement>(null);
  const col2Ref    = useRef<HTMLDivElement>(null);
  const col3Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      };
      gsap.to(col1Ref.current, { yPercent: -5, ease: "none", scrollTrigger: trigger });
      gsap.to(col2Ref.current, { yPercent:  5, ease: "none", scrollTrigger: trigger });
      gsap.to(col3Ref.current, { yPercent: -8, ease: "none", scrollTrigger: trigger });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-paper border-t border-[rgba(10,10,10,0.07)] overflow-hidden"
      aria-label="Opiniones de clientes"
    >
      <div className="container-ds">

        {/* ── Header — stagger fade+slide ── */}
        <motion.div
          className="mb-14"
          variants={HEADER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <motion.p
              variants={HEADER_ITEM}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet"
            >
              Opiniones
            </motion.p>
            <motion.h2
              variants={HEADER_ITEM}
              className="font-display font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Lo que dice la gente.
            </motion.h2>
            <motion.div variants={HEADER_ITEM} className="flex items-center gap-2">
              <StarRow rating={5} />
              <span className="font-mono text-[11px] text-grey-1 uppercase tracking-[0.12em]">
                {reviewsData.length} reseñas verificadas
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── 3-column masonry with GSAP parallax ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

          <div ref={col1Ref} className="flex flex-col gap-5">
            {COL1.map((r, i) => (
              <OutlineReveal key={r.id} delay={COL1_OFFSET + i * 0.04} rx={4}>
                <ReviewCard review={r} />
              </OutlineReveal>
            ))}
          </div>

          <div ref={col2Ref} className="flex flex-col gap-5 md:mt-10">
            {COL2.map((r, i) => (
              <OutlineReveal key={r.id} delay={COL2_OFFSET + i * 0.04} rx={4}>
                <ReviewCard review={r} />
              </OutlineReveal>
            ))}
          </div>

          <div ref={col3Ref} className="flex flex-col gap-5">
            {COL3.map((r, i) => (
              <OutlineReveal key={r.id} delay={COL3_OFFSET + i * 0.04} rx={4}>
                <ReviewCard review={r} />
              </OutlineReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  context: string;
  quote: string;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 p-6 rounded-[4px]",
        "bg-paper-2 border border-[rgba(10,10,10,0.07)]"
      )}
    >
      <StarRow rating={review.rating} />
      <p className="font-body text-[14px] text-ink leading-relaxed">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-[rgba(10,10,10,0.07)]">
        <span
          aria-hidden
          className={cn(
            "w-8 h-8 rounded-full shrink-0 flex items-center justify-center",
            "bg-violet-soft border border-violet/20",
            "font-mono text-[10px] font-medium text-violet"
          )}
        >
          {review.initials}
        </span>
        <div className="min-w-0">
          <span className="block font-display font-semibold text-[13px] text-ink leading-none">
            {review.author}
          </span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-grey-2 mt-1">
            {review.context}
          </span>
        </div>
      </div>
    </article>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12" height="12" viewBox="0 0 12 12"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="1"
          className={i < rating ? "text-neon-deep" : "text-grey-3"}
          aria-hidden
        >
          <path d="M6 1l1.4 2.8 3.1.4-2.2 2.2.5 3.1L6 8l-2.8 1.5.5-3.1L1.5 4.2l3.1-.4L6 1z" />
        </svg>
      ))}
    </div>
  );
}
