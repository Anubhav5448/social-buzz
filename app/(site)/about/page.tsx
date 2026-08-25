import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Social Buzz",
  description:
    "Our story, mission, team, values and achievements — the people behind Social Buzz.",
};

const STORY = [
  {
    year: "2026",
    title: "The Beginning of Social Buzz",
    body: "We started as two people — a designer and a media buyer — tired of watching good creative get lost between agencies that didn't talk to each other.",
  }
];

const VALUES = [
  { title: "Plain numbers", body: "We report what moved and what didn't. No metric gets dressed up to look better than it is." },
  { title: "One team, not five vendors", body: "Design, media and web sit at the same table, so nothing gets lost in a hand-off." },
  { title: "Small enough to move fast", body: "Decisions happen in days, not committee cycles. You talk to the people doing the work." },
  { title: "Built to last past launch", body: "We hand over sites and systems the client's own team can actually run." },
];

const TEAM = [
  { name: "Aarav Mehta", role: "Founder & Strategy Lead" },
  { name: "Priya Nair", role: "Head of Design" },
  { name: "Rohan Kapoor", role: "Performance Marketing Lead" },
  { name: "Simran Kaur", role: "Web Development Lead" },
  { name: "Devika Rao", role: "Events & Operations" },
];

const ACHIEVEMENTS = [
  { number: "120+", label: "Campaigns launched" },
  { number: "48", label: "Websites shipped" },
  { number: "6", label: "Years running" },
  { number: "35+", label: "Brands served" },
];

const FAQS = [
  { q: "What services does Social Buzz provide?", a: "Digital marketing, graphic design, web development, performance marketing and event management — run from one desk on one brief." },
  { q: "How long does a typical project take?", a: "Most web builds ship in 4–6 weeks; ongoing marketing and media retainers run monthly with a shared calendar." },
  { q: "Do you work with startups or established companies?", a: "Both. We've shipped first-time brand systems for early-stage startups and run always-on media for established companies." },
  { q: "What is your design and development process?", a: "Discovery and strategy, then design, build and media in parallel against the same brief, with weekly check-ins throughout." },
  { q: "Can you redesign an existing brand or website?", a: "Yes — we regularly rebuild existing sites and refresh brand systems without starting the underlying strategy from zero." },
  { q: "Do you provide ongoing support after launch?", a: "Yes, every build hands off with documentation and an optional monthly support and iteration retainer." },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page pt-16 pb-10">
        <div className="eyebrow mb-4">About Us</div>
        <h1 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">
          Started as a two-person design desk. Still runs like one.
        </h1>
        <p className="mt-6 text-ink/60 max-w-2xl text-lg leading-relaxed">
          Social Buzz began in 2020 when a designer and a media buyer got
          tired of watching good creative get lost between agencies that
          didn't talk to each other. We built a studio where strategy,
          design, development, paid media and event execution report to the
          same brief — so a campaign looks and performs like one idea, not
          five.
        </p>
      </section>

      {/* Hero image */}
      <section className="container-page pb-16">
        <div className="relative w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden bg-paperdim">
          <Image
            src="/about/hero.jpg"
            alt="Inside Social Buzz studio"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 1180px, 100vw"
          />
        </div>
      </section>

      {/* Story timeline */}
      <section className="section-rule bg-ink text-paper">
        <div className="container-page py-16">
          <div className="eyebrow text-paper/50 mb-4">Our story</div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-xl mb-12">
            How we got here
          </h2>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-1 flex md:flex-col items-center md:items-center gap-2">
              <div className="hidden md:block w-px flex-1 bg-paper/15" />
            </div>
            <div className="md:col-span-11 space-y-12">
              {STORY.map((s) => (
                <div key={s.year} className="grid md:grid-cols-12 gap-4 md:gap-10 relative">
                  <div className="md:col-span-2 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-signal shrink-0" />
                    <span className="font-display text-2xl text-paper/80">{s.year}</span>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="font-display text-xl md:text-2xl mb-2">{s.title}</h3>
                    <p className="text-paper/60 leading-relaxed max-w-2xl">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-rule">
        <div className="container-page py-16">
          <div className="eyebrow mb-3">What we hold to</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t-2 border-signal pt-5">
                <h3 className="font-display text-xl mb-2">{v.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-rule">
        <div className="container-page py-16">
          <div className="eyebrow mb-3">Track record</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label}>
                <div className="font-display text-4xl md:text-5xl text-signal">
                  {a.number}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 mt-2">
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-rule">
        <div className="container-page py-16">
          <div className="eyebrow mb-3">Who's on it</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line">
            {TEAM.map((t) => (
              <div key={t.name} className="bg-paper p-8">
                <div className="w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg mb-5">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-display text-lg">{t.name}</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50 mt-1">
                  {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-rule">
        <div className="container-page py-16 grid md:grid-cols-12 gap-10">
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

      <section className="section-rule">
        <div className="container-page py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl max-w-lg mx-auto">
            Want to work with the team?
          </h2>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}