const capabilities = [
  {
    title: "Web applications",
    description:
      "Full-stack apps built with modern frameworks — fast, accessible, and ready to scale.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="1.4" fill="none" />
        <path d="M3 9h18" strokeWidth="1.4" />
      </>
    ),
  },
  {
    title: "MVP development",
    description:
      "From idea to working product in weeks, scoped to prove the core hypothesis first.",
    icon: (
      <path
        d="M13 2 L4 14h7l-1 8 9-12h-7z"
        strokeWidth="1.4"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Product engineering",
    description:
      "Rebuilding or extending an existing product with clean, maintainable architecture.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" strokeWidth="1.4" fill="none" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
          strokeWidth="1"
          fill="none"
        />
      </>
    ),
  },
  {
    title: "Technical consulting",
    description:
      "Architecture reviews, tech-stack decisions and hands-on guidance for your team.",
    icon: (
      <>
        <path
          d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="4" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
];

export default function Capabilities() {
  return (
    <section id="services" className="border-b border-line py-28 md:py-40">
      <div className="shell">
        <p data-anim="fade" className="eyebrow">
          02 — Capabilities
        </p>
        <h2
          data-anim="split"
          data-anim-delay="0.05"
          className="mt-6 max-w-[18ch] text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] text-txt-100 xl:text-[3.5rem]"
        >
          Four ways I can plug into your team.
        </h2>

        <div
          data-anim="stagger"
          data-anim-stagger="0.1"
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {capabilities.map((cap) => (
            <article
              key={cap.title}
              className="group relative flex min-h-[19rem] flex-col justify-between overflow-hidden bg-bg-100 p-8 transition-colors duration-500 hover:bg-bg-200"
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className="h-7 w-7 text-txt-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-accent"
              >
                {cap.icon}
              </svg>

              <div>
                <h3 className="text-[19px] font-medium leading-snug text-txt-100">
                  {cap.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-txt-500">
                  {cap.description}
                </p>
              </div>

              {/* Accent glow blooms from the card's own corner on hover. */}
              <span className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-accent/25 opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
