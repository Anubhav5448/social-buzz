import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — The Social Buzz",
  description:
    "Digital Marketing, Graphic Designing, Web Development, Performance Marketing and Event Management — all covered in full on one page.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-page pt-32 md:pt-40 pb-14">
        <div className="eyebrow mb-4">Services</div>
        <h1 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">
          Everything we do, in one place.
        </h1>
        <p className="mt-6 text-ink/60 max-w-xl text-lg leading-relaxed">
          Five services, each covered in full detail below. Jump straight to
          the one you need, or read top to bottom to see how they connect.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="font-mono text-[11px] uppercase tracking-[0.1em] border border-line px-4 py-2 hover:border-signal hover:text-signal transition-colors"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section
          id={s.slug}
          key={s.slug}
          className="relative overflow-hidden scroll-mt-20"
        >
          {/* Background photo + dark overlay */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.heroImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-ink/75" />
          </div>

          <div className="relative z-10 container-page py-16 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="font-mono text-[11px] tracking-[0.18em] text-signal mb-4">
                {s.tag}
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-paper">
                {s.name}
              </h2>
            </div>

            <div className="md:col-span-8">
              <p className="text-lg text-paper/80 leading-relaxed max-w-2xl mb-8">
                {s.summary}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-paper/75">
                    <span className="text-signal mt-1">—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="btn-outline inline-flex !border-paper/60 !text-paper hover:!border-signal hover:!text-signal"
                >
                  Ask about {s.name}
                </Link>
                <Link
                  href={`/services/${s.slug}`}
                  className="font-mono text-[12px] uppercase tracking-[0.08em] text-paper/70 hover:text-signal transition-colors"
                >
                  View full details →
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-rule bg-ink text-paper">
        <div className="container-page py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mx-auto">
            Not sure which service you need?
          </h2>
          <p className="mt-4 text-paper/60 max-w-md mx-auto">
            Most projects use two or three of these together. Tell us the
            goal and we'll map out the mix.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex bg-signal hover:bg-paper hover:text-ink">
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}