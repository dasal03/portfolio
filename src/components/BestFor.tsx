const items = [
  {
    bold: "Founders",
    text: "who need a technical partner to turn an idea into a working product.",
  },
  {
    bold: "Established companies",
    text: "that need internal tools, dashboards or automations built and maintained.",
  },
  {
    bold: "Product teams",
    text: "that need extra engineering capacity for a fixed scope of work.",
  },
  {
    bold: "Entrepreneurs & side projects",
    text: "that need a professional build to move past the idea stage.",
  },
];

export default function BestFor() {
  return (
    <section id="about" className="border-b border-line py-28 md:py-40">
      <div className="shell grid gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
        {/* Heading parks itself while the list scrolls past it. */}
        <div className="md:sticky md:top-32 md:self-start">
          <p data-anim="fade" className="eyebrow">
            01 — Who it&apos;s for
          </p>
          <h2
            data-anim="split"
            data-anim-delay="0.05"
            className="mt-6 text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] text-txt-100 xl:text-[3.5rem]"
          >
            I work best with people who already know what they need to ship.
          </h2>
        </div>

        <ul data-anim="stagger" data-anim-stagger="0.12" className="flex flex-col">
          {items.map((item, i) => (
            <li
              key={item.bold}
              className="group relative border-t border-line py-8 last:border-b"
            >
              <div className="flex gap-6">
                <span className="eyebrow pt-1.5 tabular-nums transition-colors duration-500 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[19px] leading-relaxed text-txt-300 md:text-[21px]">
                  <span className="text-txt-100">{item.bold}</span> {item.text}
                </p>
              </div>
              {/* Hairline sweeps in from the left on hover. */}
              <span className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
