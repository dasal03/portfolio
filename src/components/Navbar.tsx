"use client";

import { useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Button from "./ui/Button";

const links = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#insights", label: "Insights" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  // Header retracts on the way down and returns the moment you scroll up,
  // so the huge type is never competing with a permanent bar.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const el = header.current;
      if (!el) return;

      const reveal = gsap
        .from(el, { yPercent: -110, paused: true, duration: 0.45, ease: EASE.out })
        .progress(1);

      const st = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate(self) {
          if (self.direction === -1 || self.scroll() < 80) reveal.play();
          else reveal.reverse();
          el.dataset.scrolled = self.scroll() > 80 ? "true" : "false";
        },
      });

      return () => st.kill();
    },
    { scope: header }
  );

  // Full-bleed mobile menu: panel wipes down, then the links ladder in.
  useGSAP(
    () => {
      const el = overlay.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: open ? 1 : 0, clipPath: "none" });
        return;
      }

      if (open) {
        gsap
          .timeline()
          .set(el, { pointerEvents: "auto", visibility: "visible" })
          .fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: EASE.inOut }
          )
          .from(
            ".mobile-link",
            { yPercent: 120, opacity: 0, duration: 0.6, ease: EASE.out, stagger: 0.06 },
            "-=0.35"
          );
      } else {
        gsap.to(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: EASE.inOut,
          onComplete: () => gsap.set(el, { pointerEvents: "none", visibility: "hidden" }),
        });
      }
    },
    { dependencies: [open], scope: overlay }
  );

  return (
    <>
      <header
        ref={header}
        data-scrolled="false"
        className="fixed inset-x-0 top-0 z-[100] transition-colors duration-500 data-[scrolled=true]:border-b data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg-100/70 data-[scrolled=true]:backdrop-blur-xl"
      >
        <div className="shell flex h-20 items-center justify-between">
          <a href="#top" className="relative leading-[1.05]">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.06em] text-txt-100">
              Diego Saltarin
            </span>
            <span className="eyebrow block">Web &amp; Product Dev</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-7">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group/link relative py-1 text-[13px] text-txt-300 transition-colors hover:text-txt-100"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:origin-left group-hover/link:scale-x-100" />
                </a>
              ))}
            </nav>
            <Button href="#contact" variant="outline">
              Start a project
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-6 bg-txt-100 transition-transform duration-400 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-txt-100 transition-transform duration-400 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>

      <div
        ref={overlay}
        className="invisible fixed inset-0 z-[99] flex flex-col justify-center bg-bg-000 px-6 md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <div key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="mobile-link block py-2 text-[13vw] font-medium leading-[1.05] tracking-[-0.03em] text-txt-100"
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>
        {/* Click bubbles from the link, so the wrapper can close the menu
            without Button needing to accept handlers. */}
        <div className="mobile-link mt-12" onClick={() => setOpen(false)}>
          <Button href="#contact">Start a project</Button>
        </div>
      </div>
    </>
  );
}
