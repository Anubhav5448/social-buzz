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

      {/* SERVICES WE OFFER */}
      {SERVICES.map((s, i) => (
        <section
          id={s.slug}
          key={s.slug}
          className={`section-rule scroll-mt-20 ${i % 2 === 1 ? "bg-paperdim" : ""}`}
        >
          <div
            className={`flex flex-col md:flex-row ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full md:w-1/3 h-56 md:h-[420px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.heroImage}
                alt={s.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex items-center">
              <div className="container-page py-12 md:py-16">
                <div className="font-mono text-[11px] tracking-[0.18em] text-signal mb-4">
                  {s.tag}
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink mb-5">
                  {s.name}
                </h2>
                <p className="text-lg text-ink/70 leading-relaxed max-w-2xl mb-8">
                  {s.summary}
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-ink/65">
                      <span className="text-signal mt-1">—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="btn-outline inline-flex !border-ink/60 !text-ink hover:!border-signal hover:!text-signal"
                  >
                    Ask about {s.name}
                  </Link>
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink/70 hover:text-signal transition-colors"
                  >
                    View full details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

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