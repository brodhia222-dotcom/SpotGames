"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isFxEnabled } from "@/lib/fx";

const NUM = 10;

const COLORS = [
  "#00E676", "#00E676", "#00E676",
  "#C4B5FD",
  "#00E676", "#00E676",
  "#EDE3FF",
  "#00E676", "#C4B5FD", "#EDE3FF",
];

const SIZES   = [9, 7, 6, 5, 5, 4, 4, 3, 3, 2];
const LERPS   = [0.38, 0.28, 0.24, 0.20, 0.18, 0.16, 0.14, 0.12, 0.10, 0.09];

const DEAD_ZONE = "a, button, input, textarea, select, [data-no-trail], .card-product, .card-service";

function inDeadZone(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(DEAD_ZONE));
}

export function CursorTrail() {
  const [mounted, setMounted] = useState(false);
  const refs     = useRef<(HTMLDivElement | null)[]>(Array(NUM).fill(null));
  const pos      = useRef(Array.from({ length: NUM }, () => ({ x: -200, y: -200 })));
  const mouse    = useRef({ x: -200, y: -200 });
  const visible  = useRef(false);
  const dead     = useRef(false);
  const alpha    = useRef(0);
  const rafId    = useRef(0);
  const fadeRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    // Don't run on touch-primary devices or if reduced motion is preferred
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let fxActive = isFxEnabled();
    const onFxChange = () => { fxActive = isFxEnabled(); };
    window.addEventListener("fx-change", onFxChange);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dead.current    = inDeadZone(e.target);
      visible.current = true;
      if (fadeRef.current) { clearTimeout(fadeRef.current); fadeRef.current = null; }
    };

    const onLeave = () => {
      fadeRef.current = setTimeout(() => { visible.current = false; }, 300);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    function tick() {
      rafId.current = requestAnimationFrame(tick);

      if (!fxActive) {
        refs.current.forEach((el) => { if (el) el.style.opacity = "0"; });
        return;
      }

      const target = visible.current && !dead.current ? 1 : 0;
      alpha.current += (target - alpha.current) * 0.12;

      // Chain lerp: each particle chases the one ahead
      pos.current[0].x += (mouse.current.x - pos.current[0].x) * LERPS[0];
      pos.current[0].y += (mouse.current.y - pos.current[0].y) * LERPS[0];
      for (let i = 1; i < NUM; i++) {
        pos.current[i].x += (pos.current[i - 1].x - pos.current[i].x) * LERPS[i];
        pos.current[i].y += (pos.current[i - 1].y - pos.current[i].y) * LERPS[i];
      }

      for (let i = 0; i < NUM; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const half = SIZES[i] / 2;
        el.style.transform = `translate3d(${pos.current[i].x - half}px,${pos.current[i].y - half}px,0)`;
        // Tail fades out: head = full alpha, last = ~20% alpha
        el.style.opacity   = String(alpha.current * (1 - i / (NUM + 2)));
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("fx-change", onFxChange);
      if (fadeRef.current) clearTimeout(fadeRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {Array.from({ length: NUM }, (_, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full will-change-transform"
          style={{
            width:      SIZES[i],
            height:     SIZES[i],
            background: COLORS[i],
            opacity:    0,
          }}
        />
      ))}
    </div>,
    document.body
  );
}
