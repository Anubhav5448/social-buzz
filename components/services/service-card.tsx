"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ServiceCardData = {
  slug: string;
  tag: string;
  name: string;
  summary: string;
  heroImage: string;
};

export function ServiceCard({
  service,
  span,
  index,
}: {
  service: ServiceCardData;
  span: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_0_50px_-4px_var(--tw-shadow-color)] hover:shadow-signal/50 ${span} ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-[0.96]"
      }`}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      {/* Full-card link overlay */}
      <Link
        href={`/services/${service.slug}`}
        aria-label={`View ${service.name}`}
        className="absolute inset-0 z-20"
      />
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${service.heroImage})` }}
      />

      {/* Dark overlay — stronger base so text always reads */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/70"
      />

      {/* Extra gradient from bottom for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
      />

      {/* Inner glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(255,90,60,0.45) 0%, rgba(255,90,60,0.15) 45%, transparent 75%)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-widest text-white/70">
          {service.tag}
        </span>
        <span
          aria-hidden="true"
          className="text-xl text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          ↗
        </span>
      </div>

      <div className="relative z-30 mt-8">
        <h3 className="font-display font-bold text-xl md:text-2xl leading-tight mb-2 text-white">
          {service.name}
        </h3>
        <p className="text-sm text-white/80 leading-relaxed max-w-sm">
          {service.summary}
        </p>

        <Link
          href="/contact"
          className="group/btn mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-signal hover:bg-signal hover:text-ink"
        >
          Let&apos;s Talk
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}