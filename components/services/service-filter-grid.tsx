"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES, type Service } from "@/lib/services";
import { ServiceCard } from "@/components/services/service-card";

const CATEGORIES = ["All", "SEO", "Social Media", "Web Dev"] as const;
type Category = (typeof CATEGORIES)[number];

const BENTO_LAYOUT = [
  { span: "md:col-span-2 md:row-span-2" },
  { span: "md:col-span-2 md:row-span-1" },
  { span: "md:col-span-1 md:row-span-1" },
  { span: "md:col-span-1 md:row-span-1" },
  { span: "md:col-span-2 md:row-span-1" },
];

export function ServiceFilterGrid() {
  const [active, setActive] = useState<Category>("All");

  const filtered: Service[] =
    active === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === active);

  return (
    <div className="relative">
      {/* CATEGORY FILTER TABS */}
      <div
        role="tablist"
        aria-label="Filter services by category"
        className="mb-8 flex flex-wrap items-center gap-2 md:gap-3"
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          const count =
            cat === "All"
              ? SERVICES.length
              : SERVICES.filter((s) => s.category === cat).length;

          return (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? "border-signal bg-signal text-ink shadow-[0_0_25px_-4px_var(--tw-shadow-color)] shadow-signal/60"
                  : "border-line text-ink/60 hover:border-signal hover:text-signal"
              }`}
            >
              {cat}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  isActive ? "bg-ink/15" : "bg-ink/5 group-hover:bg-signal/15"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* BENTO GRID */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="hidden md:block absolute -right-6 -top-10 h-40 w-40 rounded-full border-[16px] border-signal/25"
        />

        <div
          key={active}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(160px,auto)] gap-4 md:gap-5 animate-in fade-in duration-500"
        >
          {filtered.map((service, i) => {
            const layout = BENTO_LAYOUT[i % BENTO_LAYOUT.length];
            return (
              <ServiceCard
                key={service.slug}
                service={service}
                span={layout.span}
                index={i}
              />
            );
          })}

          {filtered.length > 0 && (
            <Link
              href="/contact"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed border-signal bg-paper p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_-4px_var(--tw-shadow-color)] hover:shadow-signal/50 md:col-span-2"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-signal">
                Not listed?
              </span>
              <div className="mt-8">
                <h3 className="font-display font-bold text-xl md:text-2xl leading-tight text-ink mb-2">
                  Tell us the goal.
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed max-w-sm">
                  We&apos;ll map out the right mix across all five disciplines.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
                Get a quote
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          )}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-ink/50 font-mono text-sm">
            Is category mein abhi koi service nahi hai.
          </p>
        )}
      </div>
    </div>
  );
}