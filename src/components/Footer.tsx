"use client";

import { useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const BASE_PRICE = 1500;
const BASE_DAYS = 5;

const services = [
  { label: "Web app", price: 2000, days: 10 },
  { label: "MVP", price: 3000, days: 15 },
  { label: "Dashboard", price: 1500, days: 7 },
  { label: "API / backend", price: 1200, days: 6 },
  { label: "Consulting", price: 500, days: 2 },
];

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
];

const pages = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "#insights" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  const [selected, setSelected] = useState<string[]>([]);
  const priceRef = useRef<HTMLSpanElement>(null);
  const shown = useRef(BASE_PRICE);

  const toggle = (service: string) => {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const chosen = services.filter((s) => selected.includes(s.label));
  const cost = BASE_PRICE + chosen.reduce((sum, s) => sum + s.price, 0);
  const days = BASE_DAYS + chosen.reduce((sum, s) => sum + s.days, 0);
  const weeks = Math.max(1, Math.round(days / 7));

  // The estimate counts up to its new total instead of snapping, so picking
  // an add-on reads as a consequence rather than a re-render.
  useGSAP(
    () => {
      const el = priceRef.current;
      if (!el) return;

      if (prefersReducedMotion() || shown.current === cost) {
        el.textContent = cost.toLocaleString("en-US");
        shown.current = cost;
        return;
      }

      const value = { n: shown.current };
      gsap.to(value, {
        n: cost,
        duration: 0.7,
        ease: EASE.out,
        onUpdate: () => {
          el.textContent = Math.round(value.n).toLocaleString("en-US");
        },
        onComplete: () => {
          shown.current = cost;
        },
      });
    },
    { dependencies: [cost] }
  );

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg-000">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[140px]" />

      <div className="shell relative py-28 md:py-40">
        <p data-anim="fade" className="eyebrow">
          07 — Contact
        </p>

        <div className="mt-6 grid gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <h2
              data-anim="split"
              data-anim-delay="0.05"
              className="max-w-[13ch] text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] text-txt-100 xl:text-[4rem]"
            >
              Need something built? Let&apos;s talk.
            </h2>
            <p
              data-anim="fade"
              data-anim-delay="0.2"
              className="mt-8 max-w-[38ch] text-[17px] leading-relaxed text-txt-300"
            >
              Tell me about your project or idea, and why it matters to you. I reply
              to everything within a couple of days.
            </p>
          </div>

          <form
            data-anim="fade"
            data-anim-delay="0.25"
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="email"
                placeholder="Email"
                className="min-h-14 rounded-xl border border-line bg-bg-200 px-5 text-[16px] text-txt-100 transition-colors duration-500 placeholder:text-txt-500 focus:border-accent focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                className="min-h-14 rounded-xl border border-line bg-bg-200 px-5 text-[16px] text-txt-100 transition-colors duration-500 placeholder:text-txt-500 focus:border-accent focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Describe your idea"
              rows={4}
              className="mt-3 rounded-xl border border-line bg-bg-200 px-5 py-4 text-[16px] text-txt-100 transition-colors duration-500 placeholder:text-txt-500 focus:border-accent focus:outline-none"
            />

            <div className="mt-10">
              <span className="eyebrow">Choose your add-ons</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((service) => {
                  const active = selected.includes(service.label);
                  return (
                    <button
                      key={service.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggle(service.label)}
                      className={`rounded-full border px-5 py-2.5 text-[13px] transition-colors duration-500 ${
                        active
                          ? "border-accent bg-accent text-bg-000"
                          : "border-line text-txt-300 hover:border-txt-300"
                      }`}
                    >
                      {service.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group relative w-fit overflow-hidden rounded-full bg-txt-100 px-7 py-4 text-[15px] font-medium text-bg-000"
              >
                <span className="relative z-10">Submit your idea</span>
                <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </button>

              <p className="eyebrow">
                Estimate
                <span className="ml-2 text-[15px] tracking-normal text-txt-100">
                  $<span ref={priceRef}>{BASE_PRICE.toLocaleString("en-US")}</span> ·{" "}
                  {weeks} week{weeks > 1 ? "s" : ""}
                </span>
              </p>
            </div>

            <p className="mt-8 text-[15px] text-txt-500">
              or email me at{" "}
              <a
                href="mailto:diegoasp001@gmail.com"
                className="text-txt-100 underline decoration-line underline-offset-4 transition-colors duration-500 hover:decoration-accent"
              >
                diegoasp001@gmail.com
              </a>
            </p>
          </form>
        </div>

        <div className="mt-28 flex flex-col gap-12 border-t border-line pt-12 sm:flex-row sm:justify-between">
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Socials</span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-txt-300 transition-colors duration-500 hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Pages</span>
              {pages.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="text-[15px] text-txt-300 transition-colors duration-500 hover:text-accent"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          <span className="eyebrow sm:self-end">
            © {new Date().getFullYear()} — Built in Next.js
          </span>
        </div>
      </div>

      {/* Oversized signature: clipped at the baseline so it reads as a mark
          rather than a heading. */}
      <div
        aria-hidden
        data-anim="fade"
        className="shell select-none overflow-hidden pb-2"
      >
        <span className="block translate-y-[16%] text-center text-[15.5vw] font-semibold leading-[0.78] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_var(--line-strong)]">
          Diego Saltarin
        </span>
      </div>
    </footer>
  );
}
