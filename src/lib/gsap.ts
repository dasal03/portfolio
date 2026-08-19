"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Client components are still rendered on the server for SSR, so only touch
// the plugins once a real DOM exists.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

/** The single easing vocabulary for the site. Mirrors --ease-out-expo. */
export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
} as const;

/**
 * Motion is decorative here: when the user asks for less of it we render the
 * final state immediately rather than shipping a degraded animation.
 */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Pointer-precision check — gates cursor and magnetic effects. */
export function isFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export { gsap, useGSAP, ScrollTrigger, SplitText };
