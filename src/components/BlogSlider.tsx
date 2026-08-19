"use client";

import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

const posts = [
  {
    title: "Choosing the right stack for an MVP",
    tags: ["Startup", "MVP"],
    date: "Jan 2026",
    gradient: "linear-gradient(140deg,#241a2e,#0b0b0d 65%,#3b1d3f)",
  },
  {
    title: "What a 6-week build actually looks like",
    tags: ["Process"],
    date: "Dec 2025",
    gradient: "linear-gradient(140deg,#111827,#0b0b0d 65%,#1d2a3f)",
  },
  {
    title: "When to rebuild vs. refactor",
    tags: ["Engineering"],
    date: "Nov 2025",
    gradient: "linear-gradient(140deg,#1e1a2a,#0b0b0d 65%,#26141f)",
  },
  {
    title: "Scoping technical work for non-technical founders",
    tags: ["Founders"],
    date: "Oct 2025",
    gradient: "linear-gradient(140deg,#16211c,#0b0b0d 65%,#1d3f2e)",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
];

export default function BlogSlider() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const scroll = (dir: 1 | -1) => {
    const step = scrollerRef.current?.clientWidth ?? 600;
    scrollerRef.current?.scrollBy({ left: dir * step * 0.8, behavior: "smooth" });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    const delta = e.clientX - drag.current.startX;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    scrollerRef.current?.releasePointerCapture(e.pointerId);
  };

  // A drag that ends on a card must not also count as a click on it.
  const onClickCapture = (e: ReactMouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section id="insights" className="border-b border-line py-28 md:py-40">
      <div className="shell flex items-end justify-between gap-8">
        <div>
          <p data-anim="fade" className="eyebrow">
            05 — Insights
          </p>
          <h2
            data-anim="split"
            data-anim-delay="0.05"
            className="mt-6 text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] text-txt-100 xl:text-[3.5rem]"
          >
            Notes from the build.
          </h2>
        </div>

        <div className="hidden shrink-0 gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === -1 ? "Previous" : "Next"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-txt-300 transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d={dir === -1 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        data-anim="fade"
        data-anim-delay="0.15"
        // scroll-pl matches the padding: without it the snap point sits at the
        // card edge and the browser scrolls the padding away, breaking the
        // first card's alignment with the heading.
        className="mt-14 flex cursor-grab snap-x scroll-pl-6 gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] active:cursor-grabbing md:scroll-pl-12 md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <article
            key={post.title}
            className="group w-[82vw] shrink-0 select-none snap-start sm:w-[46vw] lg:w-[32vw] xl:w-[26vw]"
          >
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line"
              style={{ background: post.gradient }}
            >
              <span className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-accent/25 opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100" />
            </div>
            <div className="mt-6">
              <h3 className="text-[19px] font-medium leading-snug text-txt-100">
                {post.title}
              </h3>
              <div className="mt-3 flex items-center gap-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="eyebrow">
                    {tag}
                  </span>
                ))}
                <span className="h-1 w-1 rounded-full bg-txt-500" />
                <span className="eyebrow">{post.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="shell mt-14 flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[34ch] text-[15px] text-txt-500">
          I write about shipping software. Follow along wherever you already read.
        </p>
        <div className="flex gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-[13px] text-txt-300 transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
