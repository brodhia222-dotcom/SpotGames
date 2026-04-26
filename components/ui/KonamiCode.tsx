"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiCode() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === SEQUENCE[index]) {
        const next = index + 1;
        if (next === SEQUENCE.length) {
          setActive(true);
          setIndex(0);
          setTimeout(() => setActive(false), 3000);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(e.key === SEQUENCE[0] ? 1 : 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none">
      <div className="text-center">
        <div className="font-pixel text-xs text-ctrl neon-text-ctrl mb-4 animate-blink">
          ★ CHEAT CODE ACTIVATED ★
        </div>
        <div className="font-pixel text-[8px] text-grape neon-text-grape">
          +99 LIVES · UNLIMITED STOCK · GOD MODE
        </div>
        <div className="font-pixel text-[7px] text-muted mt-3">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
      </div>
    </div>
  );
}
