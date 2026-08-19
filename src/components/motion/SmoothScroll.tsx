"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis-driven inertial scrolling, kept in step with GSAP.
 *
 * Lenis (rather than ScrollSmoother) because this page leans on
 * `position: sticky` for the header, the work filter bar and the process
 * heading — ScrollSmoother's transformed wrapper breaks all three, while
 * Lenis keeps the native scroll position intact.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // One clock for both libraries, so ScrollTrigger never reads a stale
    // scroll position mid-frame.
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page links must go through Lenis, or the jump fights the easing.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
