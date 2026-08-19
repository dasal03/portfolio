"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const steps = [
  {
    title: "Kick-off call",
    description:
      "We talk through the problem, the constraints and what success looks like.",
  },
  {
    title: "Discovery",
    description:
      "Research into your goals and constraints. Result: a clear technical direction.",
  },
  {
    title: "Build",
    description:
      "Development in short cycles, scoped around the business need rather than the backlog.",
  },
  {
    title: "Delivery",
    description:
      "Final handoff with clean docs, source access and a walkthrough call.",
  },
];

export default function Roadmap() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // The rail draws itself as the section passes, and each marker lights
      // up when its own step reaches the middle of the screen.
      gsap.fromTo(
        ".rail-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".step-dot").forEach((dot) => {
        gsap.to(dot, {
          backgroundColor: "var(--accent)",
          scale: 1.6,
          duration: 0.4,
          scrollTrigger: { trigger: dot, start: "top 62%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="process" className="border-b border-line py-28 md:py-40">
      <div className="shell">
        <p data-anim="fade" className="eyebrow">
          04 — Process
        </p>
        <h2
          data-anim="split"
          data-anim-delay="0.05"
          className="mt-6 max-w-[16ch] text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] text-txt-100 xl:text-[3.5rem]"
        >
          How things will go. Short &amp; sweet.
        </h2>

        <div ref={root} className="relative mt-20 pl-10 md:pl-20">
          <div className="absolute bottom-0 left-[3px] top-0 w-px bg-line">
            <span className="rail-fill block h-full w-px origin-top bg-gradient-to-b from-accent to-accent-2" />
          </div>

          <ol className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="step-dot absolute -left-10 top-2.5 h-[7px] w-[7px] rounded-full bg-txt-500 md:-left-20 md:top-4" />

                <div
                  data-anim="fade"
                  className="grid gap-3 md:grid-cols-[6rem_1fr] md:gap-10"
                >
                  <span className="eyebrow pt-1.5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.75rem] font-medium leading-tight tracking-[-0.02em] text-txt-100 xl:text-[2.25rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-txt-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
