"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const projects = [
  {
    title: "E-commerce platform",
    description: "Headless storefront with a custom checkout flow.",
    tags: ["Web", "Commerce"],
    gradient: "linear-gradient(140deg,#241a2e,#0b0b0d 55%,#3b1d3f)",
  },
  {
    title: "Booking platform MVP",
    description: "Two-sided marketplace built and shipped in six weeks.",
    tags: ["Web", "MVP"],
    gradient: "linear-gradient(140deg,#16211c,#0b0b0d 55%,#1d3f2e)",
  },
  {
    title: "SaaS analytics dashboard",
    description: "Real-time metrics and reporting for a B2B product.",
    tags: ["Dashboard", "SaaS"],
    gradient: "linear-gradient(140deg,#111827,#0b0b0d 55%,#1d2a3f)",
  },
  {
    title: "Internal admin panel",
    description: "Role-based tooling to manage orders and inventory.",
    tags: ["Dashboard", "Internal tools"],
    gradient: "linear-gradient(140deg,#1e1a2a,#0b0b0d 55%,#26141f)",
  },
  {
    title: "Field service mobile app",
    description: "Offline-first app for scheduling and job tracking.",
    tags: ["Mobile", "Field service"],
    gradient: "linear-gradient(140deg,#241a17,#0b0b0d 55%,#3f231d)",
  },
  {
    title: "Public data API",
    description: "Versioned REST API serving a mobile and web client.",
    tags: ["API", "Infrastructure"],
    gradient: "linear-gradient(140deg,#211d16,#0b0b0d 55%,#3f2d1d)",
  },
];

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const index = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Below `md`, and whenever motion is reduced, the track stays a plain
      // swipeable overflow list — pinning a viewport on a phone costs more
      // than it gives.
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current;
          if (!el) return;

          // Recomputed on every refresh so a resize or font swap can't leave
          // the last card stranded off-screen.
          const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 96);

          gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                // Written straight to the DOM: re-rendering React on every
                // scrub frame would be the one thing that makes this stutter.
                if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
                if (index.current) {
                  const n = Math.min(
                    projects.length,
                    Math.floor(self.progress * projects.length) + 1
                  );
                  index.current.textContent = String(n).padStart(2, "0");
                }
              },
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} className="relative border-b border-line">
      <div className="flex min-h-screen flex-col justify-center overflow-hidden py-24 md:py-0">
        <div className="shell flex items-end justify-between gap-8">
          <div>
            <p data-anim="fade" className="eyebrow">
              03 — Selected work
            </p>
            <h2
              data-anim="split"
              data-anim-delay="0.05"
              className="mt-6 max-w-[16ch] text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] text-txt-100 xl:text-[3.5rem]"
            >
              Things I have designed, built and shipped.
            </h2>
          </div>

          <p className="eyebrow hidden shrink-0 tabular-nums md:block">
            <span ref={index} className="text-txt-100">
              01
            </span>
            {" / "}
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          <div
            ref={track}
            className="flex w-max gap-6 px-6 will-change-transform md:px-12"
          >
            {projects.map((project, i) => (
              <article
                key={project.title}
                className="group w-[80vw] shrink-0 sm:w-[54vw] lg:w-[38vw] xl:w-[32vw]"
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line"
                  style={{ background: project.gradient }}
                >
                  <span className="absolute left-5 top-4 font-mono text-[11px] tracking-[0.18em] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-accent/25 opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100" />
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-[19px] font-medium text-txt-100">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 max-w-[38ch] text-[15px] leading-relaxed text-txt-500">
                      {project.description}
                    </p>
                  </div>
                  <ul className="flex shrink-0 flex-col items-end gap-1">
                    {project.tags.map((tag) => (
                      <li key={tag} className="eyebrow">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="shell mt-12 hidden md:block">
          <span className="block h-px w-full bg-line">
            <span
              ref={bar}
              className="block h-px origin-left scale-x-0 bg-accent"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
