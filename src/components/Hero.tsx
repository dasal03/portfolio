"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import Button from "./ui/Button";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Depth pass: the glow layers drift slower than the page, and the
      // showcase panel unfolds to full width as it settles into view.
      gsap.to(".hero-glow", {
        yPercent: 38,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(".hero-copy", {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 40%", scrub: true },
      });

      // Scaled rather than resized: width animation would reflow every frame.
      gsap.fromTo(
        ".hero-showcase",
        { scale: 0.74, borderRadius: 40 },
        {
          scale: 1,
          borderRadius: 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-showcase",
            start: "top 92%",
            end: "top 32%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative overflow-hidden pt-36 md:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow absolute -top-32 left-[8%] h-[38rem] w-[38rem] animate-float rounded-full bg-accent/18 blur-[130px]" />
        <div
          className="hero-glow absolute -top-20 right-[4%] h-[30rem] w-[30rem] animate-float rounded-full bg-accent-2/18 blur-[130px]"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      <div className="shell hero-copy">
        <p
          data-anim="fade"
          className="eyebrow flex items-center gap-2.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for new work
        </p>

        <h1
          data-anim="split"
          data-anim-delay="0.1"
          className="mt-8 max-w-[15ch] text-[13vw] font-medium leading-[0.92] tracking-[-0.045em] text-txt-100 sm:text-[11vw] xl:text-[8.6rem]"
        >
          Products for teams that <span className="text-gradient">move fast.</span>
        </h1>

        <div className="mt-14 flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <p
            data-anim="fade"
            data-anim-delay="0.35"
            className="max-w-[46ch] text-[17px] leading-relaxed text-txt-300"
          >
            Founders need a working product fast. Established companies have legacy
            systems slowing them down. I help both ship real software — from the
            first sketch to the production deploy.
          </p>

          <div
            data-anim="fade"
            data-anim-delay="0.45"
            className="flex shrink-0 items-center gap-6"
          >
            <Button href="#contact">Start a project</Button>
            <a
              href="#work"
              className="group flex items-center gap-2 text-[15px] text-txt-300 transition-colors hover:text-txt-100"
            >
              See the work
            </a>
          </div>
        </div>
      </div>

      <div className="shell mt-24 md:mt-32">
        <div className="hero-showcase relative aspect-[16/10] w-full overflow-hidden border border-line bg-bg-200 md:aspect-[1152/560]">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,#20202a_0%,#0d0d10_55%,#1c0f1a_100%)]" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-72 animate-float rounded-full bg-accent/25 blur-[90px]" />
          <div
            className="absolute -top-16 right-1/4 h-56 w-56 animate-float rounded-full bg-accent-2/25 blur-[80px]"
            style={{ animationDelay: "1.8s" }}
          />

          {/* Abstract product surface — suggests an app without faking a
              specific client screenshot. */}
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-2 border-b border-line px-5 py-4">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-accent/50" />
              <span className="ml-4 h-1.5 w-40 rounded-full bg-white/8" />
            </div>
            <div className="grid flex-1 grid-cols-[auto_1fr] gap-6 p-5 sm:p-8">
              <div className="hidden w-36 flex-col gap-3 border-r border-line pr-6 sm:flex">
                {[70, 45, 58, 38, 62].map((w, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full bg-white/10"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-line bg-white/[0.03] p-4"
                    >
                      <span className="block h-1.5 w-10 rounded-full bg-white/12" />
                      <span className="mt-3 block h-3 w-16 rounded-full bg-white/22" />
                    </div>
                  ))}
                </div>
                {/* Explicit height: the bars are sized in %, which needs a
                    definite parent or they collapse to nothing. */}
                <div className="flex h-28 items-end gap-2 sm:h-44 sm:gap-3">
                  {[38, 62, 45, 80, 55, 92, 68, 74, 48, 86].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t-md"
                      style={{
                        height: `${h}%`,
                        background:
                          i % 3 === 0
                            ? "linear-gradient(180deg,var(--accent),transparent)"
                            : "linear-gradient(180deg,rgba(255,255,255,0.16),transparent)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
