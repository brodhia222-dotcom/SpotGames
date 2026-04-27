"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let targetX = 0, targetY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.left = targetX + "px";
      dot.style.top = targetY + "px";
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.1;
      ringY += (targetY - ringY) * 0.1;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      rafId = requestAnimationFrame(animate);
    };

    const onEnterInteractive = () => document.body.classList.add("cursor-on-interactive");
    const onLeaveInteractive = () => document.body.classList.remove("cursor-on-interactive");

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    const els = document.querySelectorAll("a, button, [data-cursor]");
    els.forEach(el => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}
