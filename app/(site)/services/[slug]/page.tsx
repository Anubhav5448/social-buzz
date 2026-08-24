import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service not found — The Social Buzz" };
  return {
    title: `${service.name} — The Social Buzz`,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-paperdim px-4 py-1.5 mb-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
          <span className="w-1.5 h-1.5 rounded-full bg-signal" />
          Service Detail
        </span>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
            {service.name}
          </h1>
          <p className="text-ink/60 text-base md:text-lg leading-relaxed max-w-xs md:pt-3 md:text-right">
            {service.summary}
          </p>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="relative w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden bg-paperdim">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.heroImage}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Deliverables + Overview */}
      <section className="section-rule">
        <div className="container-page py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <h2 className="font-display text-3xl md:text-4xl mb-8">
              Deliverables
            </h2>
            <div className="border-t border-line">
              {service.deliverables.map((d, i) => (
                <div
                  key={d}
                  className="flex items-center gap-4 py-4 border-b border-line"
                >
                  <span className="font-mono text-[11px] text-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-ink/75">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Overview:
            </h2>
            <div className="space-y-5 mb-10">
              {service.overview.map((p, i) => (
                <p key={i} className="text-ink/70 leading-relaxed max-w-2xl">
                  {p}
                </p>
              ))}
            </div>
            <div className="relative w-full h-[220px] md:h-[320px] rounded-2xl overflow-hidden bg-paperdim">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.overviewImage}
                alt={`${service.name} overview`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related points, kept for continuity with the rest of the site */}
      <section className="section-rule">
        <div className="container-page py-16">
          <h2 className="eyebrow mb-8">What's included</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {service.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-ink/70">
                <span className="text-signal mt-1">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-rule bg-ink text-paper">
        <div className="container-page py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mx-auto">
            Want {service.name.toLowerCase()} for your brand?
          </h2>
          <p className="mt-4 text-paper/60 max-w-md mx-auto">
            Tell us the goal and we'll map out how this fits with the rest of
            your marketing.
          </p>
          <Link
            href="/contact"
            className="btn-primary mt-8 inline-flex bg-signal hover:bg-paper hover:text-ink"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}