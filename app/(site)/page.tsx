import Link from "next/link";
import HeroExperience from "@/components/HeroExperience";
import { SERVICES } from "@/lib/services";
import { getFeaturedProjects } from "@/lib/projects";

// Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

const WHY = [
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

const TESTIMONIALS = [
  {
    quote:
      "They rebuilt our site and ran the launch campaign in the same month — no waiting on a separate vendor to catch up.",
    name: "Ananya Sharma",
    role: "Founder, Studio Loom",
  },
  {
    quote:
      "First agency we've worked with where the monthly report actually explained the numbers instead of just listing them.",
    name: "Karan Bedi",
    role: "Marketing Lead, Fitcore",
  },
  {
    quote:
      "Fast decisions, no committee back-and-forth. We talk directly to the people doing the work.",
    name: "Ritu Malhotra",
    role: "Co-founder, Leaf & Bloom",
  },
];

const FAQS = [
  {
    q: "What services does Social Buzz provide?",
    a: "Digital marketing, graphic design, web development, performance marketing and event management — run from one desk on one brief.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most web builds ship in 4–6 weeks; ongoing marketing and media retainers run monthly with a shared calendar.",
  },
  {
    q: "Do you work with startups or established companies?",
    a: "Both. We've shipped first-time brand systems for early-stage startups and run always-on media for established companies.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes, every build hands off with documentation and an optional monthly support and iteration retainer.",
  },
];

export default async function HomePage() {
  const projects = await getFeaturedProjects(3);

  return (
    <>
      {/* HERO */}
      <HeroExperience />

      {/* ABOUT US */}
      <section id="about" className="section-rule">
        <div className="container-page py-20">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <div className="eyebrow mb-3">About us</div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                Started as a two-person design desk. Still runs like one.
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-1">
              <p className="text-ink/60 text-lg leading-relaxed">
                Social Buzz began when a designer and a media buyer got tired
                of watching good creative get lost between agencies that
                didn't talk to each other. We built a studio where strategy,
                design, development, paid media and event execution report to
                the same brief — so a campaign looks and performs like one
                idea, not five.
              </p>
              <Link
                href="/about"
                className="inline-block mt-5 font-mono text-[13px] uppercase tracking-[0.08em] text-signal hover:opacity-70 transition-opacity"
              >
                More about us →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 border-t border-line pt-12">
            {WHY.map((w, i) => (
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

      {/* OUR PROCESS */}
      <section id="process" className="section-rule bg-paperdim">
        <div className="container-page py-20">
          <div className="text-center mb-16">
            <div className="eyebrow mb-3 justify-center flex">How we work</div>
            <h2 className="font-display text-3xl md:text-4xl">Our process</h2>
          </div>

          <div className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-line" />
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`relative ${i % 2 === 1 ? "md:mt-10" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-paper border border-line flex items-center justify-center font-display text-lg text-signal mb-5 relative z-10">
                  {p.step}
                </div>
                <h3 className="font-display text-lg mb-2">{p.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-rule">
        <div className="container-page py-20">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="eyebrow mb-3 justify-center flex">What we do</div>
            <h2 className="font-display text-3xl md:text-4xl">
              Five disciplines, covered in full on one page.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES[0] && (
              <Link
                href={`/services#${SERVICES[0].slug}`}
                className="group border border-line p-8 md:p-10 flex flex-col justify-between hover:border-signal transition-colors md:row-span-2"
              >
                <div>
                  <div className="font-mono text-[11px] tracking-[0.14em] text-signal mb-4">
                    {SERVICES[0].tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl mb-4">
                    {SERVICES[0].name}
                  </h3>
                  <p className="text-ink/60 leading-relaxed max-w-md">
                    {SERVICES[0].summary}
                  </p>
                </div>
                <span className="mt-8 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 group-hover:text-signal transition-colors">
                  View details →
                </span>
              </Link>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              {SERVICES.slice(1).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services#${s.slug}`}
                  className="group border border-line p-6 flex flex-col justify-between hover:border-signal transition-colors"
                >
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.14em] text-signal mb-3">
                      {s.tag}
                    </div>
                    <h3 className="font-display text-xl mb-2">{s.name}</h3>
                    <p className="text-ink/55 text-sm leading-relaxed">{s.summary}</p>
                  </div>
                  <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 group-hover:text-signal transition-colors">
                    View details →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/services" className="btn-outline">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="section-rule bg-paperdim">
        <div className="container-page py-20">
          <div className="eyebrow mb-3">Featured work</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            A quick look at recent campaigns.
          </h2>

          {projects.length === 0 ? (
            <p className="text-ink/50">
              Project highlights will appear here once added from the admin panel.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((item, i) => (
                <div
                  key={item.id}
                  className={`border border-line overflow-hidden flex flex-col justify-between hover:border-signal transition-colors ${
                    i === 0 ? "md:row-span-2" : ""
                  }`}
                >
                  <div className={`bg-paper overflow-hidden shrink-0 ${i === 0 ? "h-48 md:h-72" : "h-32"}`}>
                    {item.media_url ? (
                      item.media_type === "video" ? (
                        <video src={item.media_url} className="w-full h-full object-cover" muted />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.media_url} alt={item.client_name} className="w-full h-full object-cover" />
                      )
                    ) : null}
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                      {item.project_type}
                    </div>
                    <div>
                      <div className="font-display text-2xl mb-2">{item.client_name}</div>
                      <div className="text-signal font-mono text-sm">{item.metric}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-rule">
        <div className="container-page py-20">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="eyebrow mb-3 justify-center flex">Kind words</div>
            <h2 className="font-display text-3xl md:text-4xl">What clients say.</h2>
          </div>

          {TESTIMONIALS[0] && (
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="font-display text-2xl md:text-3xl leading-snug">
                "{TESTIMONIALS[0].quote}"
              </p>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                {TESTIMONIALS[0].name} — {TESTIMONIALS[0].role}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TESTIMONIALS.slice(1).map((t) => (
              <div key={t.name} className="bg-paperdim border border-line p-6">
                <p className="text-ink/70 leading-relaxed text-sm">"{t.quote}"</p>
                <div className="mt-5">
                  <div className="font-display text-base">{t.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/45 mt-1">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-rule bg-paperdim">
        <div className="container-page py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="eyebrow mb-3">FAQ</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Questions?
              <br />
              We are here to help
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-line border-t border-line">
            {FAQS.map((f, i) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-ink/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg md:text-xl">{f.q}</span>
                  </span>
                  <span className="shrink-0 w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-ink/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pl-9 text-sm text-ink/60 leading-relaxed max-w-xl">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-rule">
        <div className="container-page py-20">
          <div className="bg-signal rounded-2xl px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl text-paper leading-tight max-w-md">
                Ready to put your brand on air?
              </h2>
              <p className="mt-3 text-paper/70 max-w-sm">
                Tell us where you're stuck and we'll come back with a plan,
                not a pitch deck.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-3.5 font-mono text-[13px] tracking-[0.08em] uppercase transition-opacity hover:opacity-85"
              >
                Get a Quote
              </Link>
              <a
                href="tel:+91xxxxxxxxxx"
                className="font-mono text-[12px] uppercase tracking-[0.08em] text-paper/70 hover:text-paper transition-colors"
              >
                or call +91 xxxxx xxxxx
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}