"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";

export function ServicesExplorer({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <div>
      {/* INDEX + PREVIEW */}
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 md:gap-16 items-start">
        <ol className="border-t border-line">
          {services.map((service, i) => (
            <li key={service.slug} className="border-b border-line">
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                  document
                    .getElementById("service-detail")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-current={activeIndex === i ? "true" : undefined}
                className={`group flex w-full items-baseline gap-5 py-5 md:py-6 text-left transition-colors duration-200 ${
                  activeIndex === i ? "text-ink" : "text-ink/35 hover:text-ink/70"
                }`}
              >
                <span className="font-mono text-sm tabular-nums w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl md:text-4xl leading-tight">
                  {service.name}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="relative aspect-[4/5] sm:aspect-[5/4] md:aspect-[5/6] w-full overflow-hidden rounded-sm bg-paperdim">
          {services.map((service, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={service.slug}
              src={service.heroImage}
              alt={service.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                activeIndex === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 md:p-7">
            <div className="font-mono text-xs text-white/70 mb-1">{active.tag}</div>
            <p className="text-white text-sm md:text-base max-w-sm leading-relaxed mb-4">
              {active.summary}
            </p>
            <a
              href="#service-detail"
              className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink"
            >
              Full breakdown
            </a>
          </div>
        </div>
      </div>

      {/* DETAIL — swaps in place with the selected service, no navigation */}
      <div
        id="service-detail"
        className="mt-20 md:mt-28 scroll-mt-24 border-t border-line pt-16 md:pt-20"
      >
        <div className="font-mono text-sm text-ink/40 mb-3">
          {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")} — {active.tag}
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-ink mb-10 max-w-2xl">
          {active.name}
        </h2>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-4">
            <h3 className="font-display text-xl text-ink mb-6">Deliverables</h3>
            <div className="border-t border-line">
              {active.deliverables.map((d, i) => (
                <div key={d} className="flex items-center gap-4 py-4 border-b border-line">
                  <span className="font-mono text-[11px] text-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-ink/75">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            <h3 className="font-display text-xl text-ink mb-6">Overview</h3>
            <div className="space-y-5 mb-10">
              {active.overview.map((p, i) => (
                <p key={i} className="text-ink/70 leading-relaxed max-w-2xl">
                  {p}
                </p>
              ))}
            </div>

            <div className="relative w-full h-[220px] md:h-[320px] rounded-sm overflow-hidden bg-paperdim mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.heroImage}
                alt={`${active.name} overview`}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-display text-xl text-ink mb-5">What&apos;s included</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
              {active.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-ink/70">
                  <span className="text-signal mt-1">—</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="btn-primary inline-flex bg-signal hover:bg-paper hover:text-ink"
            >
              Get a quote for {active.name.toLowerCase()}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}