import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "About Us — Social Buzz",
  description:
    "Our story, mission, team, values and achievements — the people behind Social Buzz.",
};

const ABOUT_BADGES = [
  { icon: "✓", title: "Proven Process", subtitle: "Quality & Consistency" },
  { icon: "★", title: "Top Rated Studio", subtitle: "Client Reviews" },
  { icon: "↗", title: "120+ Campaigns", subtitle: "Shipped & Counting" },
];



const TEAM = [
  { name: "Aarav Mehta", role: "Founder & Strategy Lead" },
  { name: "Priya Nair", role: "Head of Design" },
  { name: "Rohan Kapoor", role: "Performance Marketing Lead" },
  { name: "Simran Kaur", role: "Web Development Lead" },
  { name: "Devika Rao", role: "Events & Operations" },
];

const MISSION_VISION = [
  {
    title: "Mission",
    body: "To run strategy, design, development, media and events from one desk on one brief — so every brand we work with ships work that looks and performs like a single idea, not five disconnected ones.",
  },
  {
    title: "Vision",
    body: "To be the studio ambitious brands call first — small enough to move fast, senior enough to be trusted with the whole brief, not just a slice of it.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ABOUT HERO */}
      <section className="relative w-full overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/about/hero.jpg"
            alt="Inside Social Buzz studio"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-paper/85" />
        </div>

        <div className="relative z-10 container-page py-32 md:py-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
              About
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.02] max-w-3xl">
            <span className="text-ink">Social</span>{" "}
            <span className="text-signal">Buzz.</span>
          </h1>

          <p className="mt-6 text-ink/70 max-w-xl text-lg leading-relaxed">
            One desk, five disciplines — built for every brand ready to grow.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/social-buzz-profile.pdf"
              className="btn-outline !border-ink/50 !text-ink hover:!border-signal hover:!text-signal inline-flex items-center gap-2"
            >
              Download Profile
              <span aria-hidden="true">↓</span>
            </Link>
            <Link href="/contact" className="btn-primary bg-signal hover:bg-paper hover:text-ink">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* DETAILED ABOUT US */}
      <section className="section-rule bg-paper text-ink">
        <div className="container-page py-20">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="relative w-full h-[300px] md:h-[420px]">
              <Image
                src="/about/team.png"
                alt="Illustration of the Social Buzz team at work"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>

            <div>
              <div className="eyebrow text-signal mb-3">The Story</div>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                About Us
              </h2>
              <p className="text-ink/65 leading-relaxed mb-10 max-w-xl">
                Social Buzz is home for ambitious brands at every stage of
                growth. As a full-service studio, our focus is to provide a
                360-degree range of solutions so no business owner has to look
                elsewhere. We run digital marketing, graphic design, web
                development, performance marketing, influencer marketing,
                photography and videography, and event management — all from
                one desk, on one brief.
              </p>

              <div className="flex flex-wrap gap-8">
                {ABOUT_BADGES.map((b) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-ink/10 border border-ink/15 flex items-center justify-center text-signal text-sm shrink-0">
                      {b.icon}
                    </span>
                    <div>
                      <div className="font-display text-sm text-ink">{b.title}</div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink/45">
                        {b.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="section-rule">
        <div className="container-page py-16">
          <div className="eyebrow mb-3">Who's on it</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Our team
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

      {/* MISSION & VISION */}
      <section className="section-rule">
        <div className="container-page py-16">
          <div className="eyebrow mb-3">What drives us</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Mission &amp; Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {MISSION_VISION.map((m) => (
              <div key={m.title} className="border-t-2 border-signal pt-6">
                <h3 className="font-display text-2xl mb-3">{m.title}</h3>
                <p className="text-ink/65 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="section-rule bg-paperdim">
        <div className="container-page py-16">
          <div className="eyebrow mb-3">What we're good at</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            Our expertise
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div key={s.slug} className="bg-paper border border-line p-7">
                <div className="font-mono text-[11px] tracking-[0.14em] text-signal mb-3">
                  {s.tag}
                </div>
                <h3 className="font-display text-xl mb-2">{s.name}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{s.summary}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-block mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60 hover:text-signal transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}