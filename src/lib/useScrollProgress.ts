"use client";

import { useEffect, useRef } from "react";

type Options = {
  /**
   * "through" (default): 0 when the element's top touches the viewport
   * bottom, 1 once its bottom has fully passed the viewport top. Uses the
   * element's own height, so avoid this mode if the element's height
   * changes in response to the progress value (feedback loop).
   *
   * "position": 0 when the element's top is at `startFrac` of the
   * viewport height, 1 when it reaches `endFrac`. Only depends on the
   * element's top position, so it's safe to drive that same element's
   * height/size off the resulting value.
   */
  mode?: "through" | "position";
  startFrac?: number;
  endFrac?: number;
};

/**
 * Tracks how far an element has travelled through the viewport as the user
 * scrolls, and writes the result (0 → 1) to a CSS custom property on the
 * element itself so descendants can drive transforms/fills off it without
 * triggering React re-renders.
 */
export function useScrollProgress<T extends HTMLElement>(
  cssVar: string,
  options?: Options
) {
  const ref = useRef<T | null>(null);
  const mode = options?.mode ?? "through";
  const startFrac = options?.startFrac ?? 1;
  const endFrac = options?.endFrac ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      let progress: number;
      if (mode === "position") {
        const startY = vh * startFrac;
        const endY = vh * endFrac;
        progress = (startY - rect.top) / (startY - endY || 1);
      } else {
        const total = rect.height + vh;
        const passed = vh - rect.top;
        progress = passed / total;
      }

      progress = Math.min(1, Math.max(0, progress));
      el.style.setProperty(cssVar, progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cssVar, mode, startFrac, endFrac]);

  return ref;
}
