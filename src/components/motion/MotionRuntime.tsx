"use client";

import { EASE, gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

/**
 * The site's single reveal engine.
 *
 * Sections stay server components and simply declare intent in markup:
 *
 *   <h2 data-anim="split">          masked line-by-line rise (SplitText)
 *   <p  data-anim="fade">           lift + fade
 *   <ul data-anim="stagger">        direct children lift in sequence
 *   <div data-anim="clip">          wipe + scale, for media
 *
 * `data-anim-delay` (seconds) and `data-anim-stagger` fine-tune any of them.
 * Elements are hidden by CSS until claimed here, so nothing flashes unstyled.
 */

const REVEAL_START = "top 85%";

type Builder = (el: HTMLElement, delay: number, stagger: number) => void;

const trigger = (el: HTMLElement) => ({
  trigger: el,
  start: REVEAL_START,
  once: true,
});

const builders: Record<string, Builder> = {
  split(el, delay) {
    // `mask` wraps every line so text rises out of a clean edge; `autoSplit`
    // re-splits after a resize or a late font swap and re-runs onSplit.
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        return gsap.from(self.lines, {
          yPercent: 115,
          opacity: 0,
          duration: 1.1,
          ease: EASE.out,
          stagger: 0.09,
          delay,
          scrollTrigger: trigger(el),
        });
      },
    });
  },

  fade(el, delay) {
    gsap.set(el, { visibility: "visible" });
    gsap.from(el, {
      y: 42,
      opacity: 0,
      duration: 1,
      ease: EASE.out,
      delay,
      scrollTrigger: trigger(el),
    });
  },

  stagger(el, delay, stagger) {
    gsap.set(el, { visibility: "visible" });
    gsap.from(Array.from(el.children), {
      y: 46,
      opacity: 0,
      duration: 0.9,
      ease: EASE.out,
      stagger,
      delay,
      scrollTrigger: trigger(el),
    });
  },

  clip(el, delay) {
    gsap.set(el, { visibility: "visible" });
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.3,
        ease: EASE.out,
        delay,
        scrollTrigger: trigger(el),
      }
    );
  },
};

export default function MotionRuntime({ ready }: { ready: boolean }) {
  useGSAP(
    () => {
      if (!ready) return;

      const targets = () =>
        document.querySelectorAll<HTMLElement>("[data-anim]:not([data-anim-ready])");

      if (prefersReducedMotion()) {
        const show = () =>
          targets().forEach((el) => {
            el.dataset.animReady = "";
            el.style.visibility = "visible";
          });
        show();
        const mo = new MutationObserver(show);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => mo.disconnect();
      }

      const claim = () => {
        targets().forEach((el) => {
          el.dataset.animReady = "";
          const build = builders[el.dataset.anim || "fade"] ?? builders.fade;
          build(
            el,
            Number(el.dataset.animDelay ?? 0),
            Number(el.dataset.animStagger ?? 0.1)
          );
        });
      };

      claim();

      // Filtering the work grid mounts fresh cards after the first pass, so
      // keep claiming new nodes instead of scanning only once.
      const mo = new MutationObserver(claim);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    },
    { dependencies: [ready] }
  );

  return null;
}
