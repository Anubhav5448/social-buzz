import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { ServicesExplorer } from "@/components/services/services-explorer";


export const metadata: Metadata = {
  title: "Services — The Social Buzz",
  description:
    "Digital Marketing, Graphic Designing, Web Development, Performance Marketing and Event Management — all covered in full on one page.",
};

const TRUST_MARKERS = [
  "In-house team",
  "Real reporting",
  "Fixed monthly rate",
  "No lock-in contracts",
];

const CAPABILITIES = [
  "Strategy",
  "Content",
  "Paid Media",
  "SEO",
  "Web Build",
  "Events",
];

const PRINCIPLES = [
  {
    title: "One desk, five disciplines",
    body: "Strategy, design, build, paid media and events sit in the same room — no hand-off gaps, no repeated briefings.",
  },
  {
    title: "Reporting you can read",
    body: "Every engagement ends the month with numbers that map back to leads and revenue, not just impressions.",
  },
  {
    title: "Built for momentum",
    body: "We plan in campaigns, not one-off tasks, so this month's work compounds into next month's results.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "We audit what's working, what isn't, and where the brief actually needs to focus.",
  },
  {
    step: "02",
    title: "Strategize",
    body: "A plan across design, media and build — one brief, not five disconnected ones.",
  },
  {
    step: "03",
    title: "Create",
    body: "Design, content and campaigns come together in parallel, checked in on weekly.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    body: "We ship, measure, and keep iterating against the numbers that actually matter.",
  },
];

const PRICING_TIERS = [
  { name: "Starter", price: "₹25,000", period: "/month", highlighted: false },
  { name: "Growth", price: "₹60,000", period: "/month", highlighted: true },
  { name: "Scale", price: "Custom", period: "", highlighted: false },
];

const PRICING_ROWS = [
  {
    label: "Best for",
    values: [
      "Testing a single channel before scaling up",
      "Two or three services running on one calendar",
      "Full-stack coverage with a dedicated team",
    ],
  },
  {
    label: "Services included",
    values: ["1, your choice", "Up to 3, combined", "All 5 disciplines"],
  },
  {
    label: "Strategy calls",
    values: ["Monthly", "Bi-weekly", "Weekly"],
  },
  {
    label: "Reporting",
    values: ["Standard monthly report", "Detailed performance report", "Custom dashboard"],
  },
  {
    label: "Support",
    values: ["Email", "Priority email & chat", "On-call, dedicated lead"],
  },
  {
    label: "Extra",
    values: ["—", "Quarterly strategy review", "Dedicated account lead"],
  },
];

function RotatingSeal({ label }: { label: string }) {
  const pathId = "seal-ring-path";
  const repeated = `${label} · `.repeat(4);

  return (
    <div className="relative h-28 w-28 shrink-0 md:h-32 md:w-32">
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path id={pathId} d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
        </defs>
        <text className="fill-paper/70 font-mono text-[8px] uppercase" style={{ letterSpacing: "0.15em" }}>
          <textPath href={`#${pathId}`} xlinkHref={`#${pathId}`}>
            {repeated}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-signal" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7-5.4-4.7 7.1-.6z"
          />
        </svg>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* SERVICES HERO BAND */}
      <section className="hero-band py-24 md:py-28 text-center">
        <div className="relative z-10 container-page">
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.15] text-ink max-w-3xl mx-auto">
            Our <span className="text-signal">Services</span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-2 font-mono text-sm text-ink/50">
            <Link href="/" className="hover:text-signal transition-colors">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-ink font-medium">Services</span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-signal">
        <div className="container-page py-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {TRUST_MARKERS.map((marker) => (
            <span
              key={marker}
              className="inline-flex items-center gap-2 font-mono text-xs md:text-sm font-medium text-ink"
            >
              <span aria-hidden="true">✳</span>
              {marker}
            </span>
          ))}
        </div>
      </section>

      {/* INDEX */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="container-page">
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-[1.1] text-ink mb-6">
            What we do,
            <br />
            in five parts.
          </h2>
          <p className="text-ink/60 max-w-md mb-8">
            Pick a discipline to jump straight to it, or scroll through all five below. Most
            engagements end up drawing from more than one.
          </p>
          <div className="flex flex-wrap gap-3 mb-14 md:mb-20">
            {CAPABILITIES.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border-2 border-signal/40 bg-paper px-5 py-2 font-mono text-xs uppercase tracking-wide text-ink"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden md:block absolute -right-6 -top-10 h-40 w-40 rounded-full border-[16px] border-signal/25"
            />
            <ServicesExplorer services={SERVICES} />
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section-rule">
        <div className="container-page py-14 md:py-16">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="py-6 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <h3 className="font-display text-lg text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-rule bg-paperdim">
        <div className="container-page py-20 md:py-24">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-signal" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l6-6-6-6M13 16l6-6-6-6" />
            </svg>
            <span className="font-mono text-sm text-signal">Working process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl max-w-lg mb-16">
            The same four steps, every time.
          </h2>

          <div className="grid sm:grid-cols-4 gap-y-12 gap-x-6">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative flex flex-col items-center text-center">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:block absolute -left-3 top-10 w-6 border-t-2 border-dashed border-ink/25"
                  />
                )}
                <div className="mb-5 flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full bg-signal">
                  <span className="font-mono text-[10px] text-ink/70">Step</span>
                  <span className="font-display text-lg text-ink">{p.step}</span>
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed max-w-[15rem]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING LEDGER */}
      <section className="section-rule">
        <div className="container-page py-20 md:py-24">
          <h2 className="font-display text-3xl md:text-4xl max-w-lg mb-4">
            Three ways to work with us.
          </h2>
          <p className="text-ink/60 max-w-lg mb-12">
            Most engagements get scoped to an exact mix of services after a short call — these
            are starting points.
          </p>

          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-[24%]" scope="col" />
                  {PRICING_TIERS.map((tier) => (
                    <th
                      key={tier.name}
                      scope="col"
                      className="text-left align-bottom pb-5 px-6 border-l border-line"
                    >
                      <div
                        className={`font-display text-2xl ${
                          tier.highlighted ? "text-signal" : "text-ink"
                        }`}
                      >
                        {tier.name}
                      </div>
                      <div className="mt-1 font-mono text-xs text-ink/50">
                        {tier.price}
                        {tier.period}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th
                      scope="row"
                      className="py-4 pr-4 text-left font-normal text-ink/45 align-top"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        className="py-4 px-6 border-l border-line align-top text-ink/75"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-line">
                  <td />
                  {PRICING_TIERS.map((tier) => (
                    <td key={tier.name} className="py-6 px-6 border-l border-line">
                      <Link
                        href="/contact"
                        className={
                          tier.highlighted
                            ? "btn-primary bg-signal hover:bg-paper hover:text-ink"
                            : "btn-outline"
                        }
                      >
                        Get a quote
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section-rule bg-ink text-paper">
        <div className="container-page py-20 md:py-24 text-center flex flex-col items-center">
          <RotatingSeal label="Ask us directly" />
          <h2 className="font-display text-3xl md:text-4xl max-w-lg mx-auto mt-6">
            Not sure which service you need?
          </h2>
          <p className="mt-4 text-paper/60 max-w-md mx-auto">
            Most projects use two or three of these together. Tell us the goal and we&apos;ll map
            out the mix.
          </p>
          <Link
            href="/contact"
            className="btn-primary mt-8 inline-flex bg-signal hover:bg-paper hover:text-ink"
          >
            Get a quote
          </Link>
        </div>
      </section>
    </>
  );
}