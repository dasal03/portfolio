"use client";

import { useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Mostly web applications, MVPs, dashboards and internal tools for founders and small teams. If it involves shipping a working product, it's probably a fit.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused MVP usually takes 4–8 weeks. Larger builds or ongoing product work are scoped in phases so you see progress every week.",
  },
  {
    q: "Do you work solo or with a team?",
    a: "I work solo by default, which keeps communication direct and scope tight. For larger builds I bring in trusted collaborators as needed.",
  },
  {
    q: "What's the tech stack?",
    a: "Mostly TypeScript, React and Next.js on the frontend, with Node.js, PostgreSQL and standard cloud infrastructure on the backend — chosen to fit the project, not the other way around.",
  },
  {
    q: "What happens after launch?",
    a: "You get the full source, documentation, and a handoff call. I'm also available for ongoing support or iteration if you need it.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      panels.current.forEach((el, i) => {
        if (!el) return;
        const isOpen = i === openIndex;
        const vars = { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 };

        if (prefersReducedMotion()) {
          gsap.set(el, vars);
          return;
        }

        gsap.to(el, {
          ...vars,
          duration: 0.55,
          ease: EASE.out,
          // Opening a panel changes the height of everything below it, so the
          // triggers further down the page need their positions back.
          onComplete: () => ScrollTrigger.refresh(),
        });
      });
    },
    { dependencies: [openIndex] }
  );

  return (
    <section id="faq" className="border-b border-line py-28 md:py-40">
      <div className="shell grid gap-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <p data-anim="fade" className="eyebrow">
            06 — FAQ
          </p>
          <h2
            data-anim="split"
            data-anim-delay="0.05"
            className="mt-6 text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] text-txt-100 xl:text-[3.5rem]"
          >
            Questions I get asked a lot.
          </h2>
        </div>

        <div data-anim="stagger" data-anim-stagger="0.08">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="border-t border-line last:border-b">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="text-[17px] font-medium text-txt-100 transition-colors duration-500 group-hover:text-accent md:text-[19px]">
                    {faq.q}
                  </span>
                  <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                    <span className="absolute h-px w-3.5 bg-txt-300 transition-colors duration-500 group-hover:bg-accent" />
                    <span
                      className={`absolute h-3.5 w-px bg-txt-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-accent ${
                        isOpen ? "rotate-90 opacity-0" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Collapsed inline so GSAP animates from a known state
                    instead of a measured one on first paint. */}
                <div
                  ref={(el) => {
                    panels.current[i] = el;
                  }}
                  style={{ height: 0, opacity: 0, overflow: "hidden" }}
                >
                  <p className="max-w-[62ch] pb-7 text-[16px] leading-relaxed text-txt-300">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
