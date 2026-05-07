"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WipeRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function WipeReveal({ children, delay = 0, className }: WipeRevealProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const violetRef   = useRef<HTMLDivElement>(null);
  const greenRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const violet  = violetRef.current;
    const green   = greenRef.current;
    const content = contentRef.current;
    if (!wrapper || !violet || !green || !content) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(content, { opacity: 0 });
        gsap.to(content, {
          opacity: 1,
          duration: 0.2,
          delay,
          scrollTrigger: { trigger: wrapper, start: "top 80%", once: true },
        });
        return;
      }

      gsap.set(content, { opacity: 0 });

      const tl = gsap.timeline({
        delay,
        scrollTrigger: { trigger: wrapper, start: "top 70%", once: true },
      });

      tl
        .fromTo(
          violet,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.28, ease: "power2.out" }
        )
        .set(content, { opacity: 1 })
        .to(violet, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.28,
          ease: "power2.out",
        })
        .fromTo(
          green,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.28, ease: "power2.out" },
          "-=0.20"
        )
        .to(green, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.28,
          ease: "power2.out",
        });
    }, wrapper);

    return () => ctx.revert();
  }, [delay, reducedMotion]);

  return (
    <div ref={wrapperRef} className={className} style={{ position: "relative" }}>
      <div
        ref={violetRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          background: "#6D28D9",
          pointerEvents: "none",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
      <div
        ref={greenRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          background: "#00E676",
          pointerEvents: "none",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
