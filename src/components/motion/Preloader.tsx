"use client";

import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Intro curtain. Besides setting the tone it buys the time we need for
 * `document.fonts.ready` — SplitText measures line breaks, so splitting
 * before the webfont lands would wrap the headlines against the fallback.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.documentElement.classList.add("is-loading");

      let settled = false;
      let failsafe = 0;
      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(failsafe);
        document.documentElement.classList.remove("is-loading");
        onDone();
      };

      // The intro is timed in animation frames, which the browser throttles
      // hard for hidden tabs and low-power modes. Nothing here is worth
      // trapping someone behind a curtain, so skip it outright when no one is
      // watching, and cap it on wall-clock time either way.
      if (prefersReducedMotion() || document.hidden) {
        gsap.set(root.current, { autoAlpha: 0 });
        finish();
        return;
      }

      const value = { n: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.to(value, {
        n: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate() {
          if (counter.current) {
            counter.current.textContent = String(Math.round(value.n)).padStart(3, "0");
          }
        },
      })
        .to(bar.current, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0)
        .to(".preloader-fade", {
          yPercent: -110,
          opacity: 0,
          duration: 0.6,
          ease: EASE.out,
          stagger: 0.05,
        })
        .to(
          root.current,
          { yPercent: -100, duration: 1, ease: EASE.inOut },
          "-=0.25"
        );

      // If the font resolves late, hold the curtain until it has.
      tl.pause();
      const fonts = document.fonts?.ready ?? Promise.resolve();
      fonts.then(() => tl.play());

      failsafe = window.setTimeout(() => {
        tl.kill();
        finish();
      }, 4000);

      return () => window.clearTimeout(failsafe);
    },
    { scope: root }
  );

  return (
    <div
      id="preloader"
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-bg-000 px-6 py-8 md:px-10 md:py-10"
    >
      <div className="preloader-fade eyebrow">Diego Saltarin</div>

      <div className="preloader-fade flex items-end justify-between gap-6">
        <span className="text-[13vw] font-medium leading-[0.85] tracking-[-0.04em] text-txt-100 md:text-[9vw]">
          <span ref={counter}>000</span>
          <span className="text-accent">%</span>
        </span>
        <span className="eyebrow mb-2 hidden text-right sm:block">
          Web &amp; Product
          <br />
          Development
        </span>
      </div>

      <div className="h-px w-full bg-line">
        <div ref={bar} className="h-px origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
