"use client";

import { useRef } from "react";
import { EASE, gsap, isFinePointer, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]';

/**
 * Two-part pointer: a dot pinned to the cursor and a ring that trails it.
 * Blend mode `difference` keeps it readable over both the dark page and the
 * light panels without any per-section styling.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!isFinePointer() || prefersReducedMotion()) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveDot = {
      x: gsap.quickTo(dot, "x", { duration: 0.15, ease: EASE.soft }),
      y: gsap.quickTo(dot, "y", { duration: 0.15, ease: EASE.soft }),
    };
    const moveRing = {
      x: gsap.quickTo(ring, "x", { duration: 0.55, ease: EASE.soft }),
      y: gsap.quickTo(ring, "y", { duration: 0.55, ease: EASE.soft }),
    };

    let visible = false;
    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      moveDot.x(event.clientX);
      moveDot.y(event.clientY);
      moveRing.x(event.clientX);
      moveRing.y(event.clientY);
    };

    const setHover = (active: boolean) => (event: Event) => {
      if (!(event.target as HTMLElement | null)?.closest?.(HOVER_SELECTOR)) return;
      gsap.to(ring, {
        scale: active ? 1.9 : 1,
        borderColor: active ? "var(--accent)" : "var(--line-strong)",
        duration: 0.4,
        ease: EASE.out,
      });
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const over = setHover(true);
    const out = setHover(false);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", onLeave);
    };
  });

  return (
    <div
      aria-hidden
      // Always mounted but inert: `isFinePointer` above is the single gate,
      // and both layers stay at opacity 0 until a real mouse moves.
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-line-strong opacity-0"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white opacity-0"
      />
    </div>
  );
}
