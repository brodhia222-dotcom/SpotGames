"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      smoothTouch: false,
    });

    function raf(time: number) {
      lenis.raf(time);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return <>{children}</>;
}
