"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, isFinePointer, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Pulls its child toward the pointer while hovered. Mouse-only: on touch the
 * effect has no trigger and would just add a wrapper for nothing.
 */
export default function Magnetic({
  children,
  strength = 0.4,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !isFinePointer() || prefersReducedMotion()) return;

      const moveX = gsap.quickTo(el, "x", { duration: 0.6, ease: EASE.soft });
      const moveY = gsap.quickTo(el, "y", { duration: 0.6, ease: EASE.soft });

      const onMove = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        moveX((event.clientX - (box.left + box.width / 2)) * strength);
        moveY((event.clientY - (box.top + box.height / 2)) * strength);
      };
      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  );
}
