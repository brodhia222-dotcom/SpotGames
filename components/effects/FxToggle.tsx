"use client";

import { useState, useEffect } from "react";
import { getFxState, setFxState } from "@/lib/fx";
import { cn } from "@/lib/utils";

export function FxToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getFxState() === "on");
    const onFxChange = () => setEnabled(getFxState() === "on");
    window.addEventListener("fx-change", onFxChange);
    return () => window.removeEventListener("fx-change", onFxChange);
  }, []);

  function toggle() {
    const next = enabled ? "off" : "on";
    setFxState(next);
    setEnabled(next === "on");
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={`Efectos visuales ${enabled ? "activados" : "desactivados"}`}
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.14em]",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-[2px]",
        "px-1 py-0.5",
        enabled ? "text-neon" : "text-grey-2 hover:text-grey-1",
        className
      )}
      style={{ transitionDuration: "var(--dur-fast)" }}
    >
      FX {enabled ? "ON" : "OFF"}
    </button>
  );
}
