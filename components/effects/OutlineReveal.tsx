"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OutlineRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  rx?: number; // border-radius in px — match the card's rounded-* class
  onTraceComplete?: () => void;
}

export function OutlineReveal({
  children,
  delay = 0,
  className,
  rx = 6,
  onTraceComplete,
}: OutlineRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const vRectRef   = useRef<SVGRectElement>(null);
  const gRectRef   = useRef<SVGRectElement>(null);
  const reducedMotion = useReducedMotion();
  const onCompleteRef = useRef(onTraceComplete);

  // Keep ref current without adding it to effect deps
  useEffect(() => { onCompleteRef.current = onTraceComplete; });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const vRect   = vRectRef.current;
    const gRect   = gRectRef.current;
    if (!wrapper || !vRect || !gRect) return;
    if (reducedMotion) {
      onCompleteRef.current?.();
      return;
    }

    const { width, height } = wrapper.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const sw           = 1.5;
    const VISUAL_INSET = 5;
    const x            = VISUAL_INSET;
    const y            = VISUAL_INSET;
    const W            = Math.max(0, width  - 2 * VISUAL_INSET);
    const H            = Math.max(0, height - 2 * VISUAL_INSET);
    const r            = Math.max(0, rx - VISUAL_INSET);
    const perim        = 2 * (W + H);

    [vRect, gRect].forEach((rect) => {
      rect.setAttribute("x",                 String(x));
      rect.setAttribute("y",                 String(y));
      rect.setAttribute("width",             String(W));
      rect.setAttribute("height",            String(H));
      rect.setAttribute("rx",                String(r));
      rect.setAttribute("ry",                String(r));
      rect.setAttribute("stroke-dasharray",  String(perim));
      rect.setAttribute("stroke-dashoffset", String(perim));
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        scrollTrigger: { trigger: wrapper, start: "top 70%", once: true },
        onComplete: () => onCompleteRef.current?.(),
      });

      tl
        // Violet traces the perimeter clockwise (720ms)
        .to(vRect, { attr: { "stroke-dashoffset": 0 }, duration: 0.72, ease: "none" })
        // Green follows 100ms behind violet
        .to(gRect, { attr: { "stroke-dashoffset": 0 }, duration: 0.72, ease: "none" }, "-=0.62")
        // Both lines fade out
        .to([vRect, gRect], { opacity: 0, duration: 0.3, ease: "power2.out" }, "+=0.1");
    }, wrapper);

    return () => ctx.revert();
  }, [delay, reducedMotion, rx]);

  return (
    <div ref={wrapperRef} className={className} style={{ position: "relative" }}>
      {/* SVG overlay — absolute, inset 0, draws on top of card border */}
      <svg
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <rect ref={vRectRef} fill="none" stroke="#6D28D9" strokeWidth="1.5" strokeOpacity="0.85" />
        <rect ref={gRectRef} fill="none" stroke="#00E676"  strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {children}
    </div>
  );
}
