import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — The Social Buzz",
  description:
    "Digital Marketing, Graphic Designing, Web Development, Performance Marketing and Event Management — all covered in full on one page.",
};

const WHY_CHOOSE_US = [
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

// Varies each masonry card's height so the grid reads like a Pinterest wall
// rather than a uniform tile grid. Cycled by index — tune per-service if
// SERVICES changes. Paired 1:1 with the render order.
const MASONRY_HEIGHTS = [
  "h-[420px]", // 0 — tall
  "h-[300px]", // 1 — short
  "h-[380px]", // 2 — medium-tall
  "h-[260px]", // 3 — short
  "h-[460px]", // 4 — tall
];
const DEFAULT_MASONRY_HEIGHT = "h-[340px]";

const PRICING = [
  {
    name: "Starter",
    price: "₹25,000",
    period: "/month",
    description: "One channel, done properly — good for testing a single service before scaling up.",
    features: [
      "One service of your choice",
      "Monthly strategy call",
      "Standard monthly report",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹60,000",
    period: "/month",
    description: "The most common setup — two or three services running together on one calendar.",
    features: [
      "Up to 3 services combined",
      "Bi-weekly strategy calls",
      "Detailed performance reporting",
      "Priority email & chat support",
      "Quarterly strategy review",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "Full-stack coverage across all five disciplines with a dedicated team.",
    features: [
      "All five services",
      "Dedicated account lead",
      "Weekly strategy calls",
      "Custom reporting dashboard",
      "On-call support",
    ],
    highlighted: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* SERVICES HERO */}
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

      {/* WHY CHOOSE OUR SERVICES */}
      <section className="section-rule">
        <div className="container-page py-16">
          <div className="eyebrow mb-3">Why choose our services</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Fewer vendors. Faster decisions. Clearer numbers.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {WHY_CHOOSE_US.map((w, i) => (
              <div key={w.title} className="border-t-2 border-signal pt-6">
                <div className="font-mono text-[11px] text-ink/40 mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl mb-3">{w.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS OF WORK */}
      <section className="section-rule bg-paper text-ink">
        <div className="container-page py-16">
          <div className="eyebrow text-ink/50 mb-3">How we work</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Our process
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {PROCESS.map((p) => (
              <div key={p.step}>
                <div className="font-display text-3xl text-signal mb-3">
                  {p.step}
                </div>
                <h3 className="font-display text-lg mb-2">{p.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES WE OFFER — Pinterest-style masonry */}
      <section className="section-rule">
        <div className="container-page py-16 md:py-20">
          <div className="eyebrow mb-3">What we offer</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Five disciplines, pinned to one board.
          </h2>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 [column-fill:_balance]">
            {SERVICES.map((s, i) => (
              <Link
                id={s.slug}
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`scroll-mt-20 group relative block w-full overflow-hidden rounded-2xl ring-1 ring-ink/10 mb-4 md:mb-5 break-inside-avoid ${
                  MASONRY_HEIGHTS[i] ?? DEFAULT_MASONRY_HEIGHT
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.heroImage}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* base tint — darkens the whole card evenly so text stays legible on any photo */}
                <div className="absolute inset-0 bg-black/35" />

                {/* stronger fade near the label for extra contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

                {/* subtle darkening on hover so the reveal text stays readable over a scaled-up image */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                {/* pin number, top right — like a corkboard pin */}
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-signal/90 flex items-center justify-center font-mono text-[10px] text-ink font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* label — always visible */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-signal mb-2">
                    {s.tag}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-white leading-[1.1] text-balance">
                    {s.name}
                  </h3>

                  {/* reveal-on-hover detail */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-white/75 leading-relaxed mt-3">
                        {s.summary}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white">
                        View full details
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* hairline frame edge that lights up on hover */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-signal/0 group-hover:ring-signal/60 transition-all duration-300 pointer-events-none" />
              </Link>
            ))}
          </div>

          <p className="mt-6 text-sm text-ink/45 font-mono">
            Tap any card for the full breakdown, or{" "}
            <Link href="/contact" className="text-signal hover:underline">
              ask us directly
            </Link>
            .
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-rule">
        <div className="container-page py-20">
          <div className="eyebrow mb-3">Pricing</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-4">
            Simple plans, built around how much you need covered.
          </h2>
          <p className="text-ink/60 max-w-xl mb-12">
            Rough starting points — most engagements get scoped to the exact
            mix of services after a quick call.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col p-8 border ${
                  tier.highlighted
                    ? "border-signal bg-paperdim text-ink"
                    : "border-line bg-paper text-ink"
                }`}
              >
                {tier.highlighted && (
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal mb-3">
                    Most popular
                  </div>
                )}
                <h3 className="font-display text-2xl mb-1">{tier.name}</h3>
                <div className="mb-4">
                  <span className="font-display text-3xl">{tier.price}</span>
                  <span
                    className={`text-sm ml-1 ${
                      tier.highlighted ? "text-ink/60" : "text-ink/50"
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    tier.highlighted ? "text-ink/70" : "text-ink/60"
                  }`}
                >
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <span className="text-signal mt-0.5">—</span>
                      <span className={tier.highlighted ? "text-ink/80" : "text-ink/70"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={
                    tier.highlighted
                      ? "btn-primary bg-signal hover:bg-paper hover:text-ink justify-center"
                      : "btn-outline justify-center"
                  }
                >
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-rule bg-paper text-ink">
        <div className="container-page py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mx-auto">
            Not sure which service you need?
          </h2>
          <p className="mt-4 text-ink/60 max-w-md mx-auto">
            Most projects use two or three of these together. Tell us the
            goal and we'll map out the mix.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex bg-ink hover:bg-signal hover:text-paper">
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}