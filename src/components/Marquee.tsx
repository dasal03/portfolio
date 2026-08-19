const items = [
  "Web applications",
  "MVPs in weeks",
  "Dashboards",
  "APIs & backends",
  "Internal tools",
  "Technical consulting",
];

/**
 * Infinite service strip. The list is rendered twice and the track slides a
 * full 50%, so the loop point is invisible.
 */
export default function Marquee() {
  return (
    <section
      aria-hidden
      className="relative flex overflow-hidden border-y border-line bg-bg-200 py-6"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 whitespace-nowrap px-10 text-[15px] uppercase tracking-[0.14em] text-txt-500"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Fade the strip into the page edges instead of cutting it hard. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-200 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-200 to-transparent" />
    </section>
  );
}
