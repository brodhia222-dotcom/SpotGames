"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { isFxEnabled } from "@/lib/fx";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
const EASE_IN: [number, number, number, number]  = [0.6, 0.04, 0.98, 0.34];

// PageWipe timeline: 800ms total
//   0 – 150ms  : curtain slides in from left
//   150 – 650ms: logo + progress bar visible, bar fills with ease-out
//   650ms      : beep audio fires (if FX on)
//   650 – 800ms: curtain slides out to right

function playBeep() {
  try {
    const audio = new Audio("/sounds/page-wipe-end.mp3");
    audio.volume = 0.55;
    void audio.play();
  } catch {
    // Non-fatal: audio might be blocked by browser policy
  }
}

export function PageWipe() {
  const pathname    = usePathname();
  const prevPath    = useRef(pathname);
  const curtain     = useAnimation();
  const bar         = useAnimation();
  const running     = useRef(false);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Respect prefers-reduced-motion: skip visual wipe, optionally beep
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (isFxEnabled()) setTimeout(playBeep, 200);
      return;
    }

    if (running.current) return; // guard against rapid navigation overlap
    running.current = true;

    (async () => {
      // Reset bar to collapsed
      bar.set({ scaleX: 0 });

      // 1 — Slide curtain in (150ms, ease-out)
      await curtain.start({
        x: "0%",
        transition: { duration: 0.15, ease: EASE_OUT },
      });

      // 2 — Fill progress bar over 500ms (ease-out)
      await bar.start({
        scaleX: 1,
        transition: { duration: 0.5, ease: EASE_OUT },
      });

      // 3 — Beep fires exactly when bar completes
      if (isFxEnabled()) playBeep();

      // 4 — Slide curtain out (150ms, ease-in)
      await curtain.start({
        x: "100%",
        transition: { duration: 0.15, ease: EASE_IN },
      });

      // 5 — Reset to left (hidden, ready for next navigation)
      curtain.set({ x: "-100%" });
      running.current = false;
    })();
  }, [pathname, curtain, bar]);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={curtain}
      aria-hidden
      role="presentation"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
      style={{ background: "var(--violet-deep)" }}
    >
      <Logo size="lg" inverted />

      {/* Neon progress bar — 2px, fills during the 500ms hold */}
      <div
        className="mt-8 w-44 h-[2px] rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.12)" }}
      >
        <motion.div
          animate={bar}
          className="h-full rounded-full origin-left"
          style={{ background: "var(--neon)", scaleX: 0 }}
        />
      </div>
    </motion.div>
  );
}
