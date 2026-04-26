"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useGsapContext<T extends HTMLElement>(
  callback: (context: gsap.Context) => void,
  deps: unknown[] = []
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(callback, ref.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
