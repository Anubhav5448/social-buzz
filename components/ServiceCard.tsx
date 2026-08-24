import Link from "next/link";
import { Service } from "@/lib/services";

export default function ServiceCard({ service, href }: { service: Service; href?: string }) {
  const content = (
    <div className="group border border-line p-8 h-full flex flex-col justify-between bg-paper hover:bg-ink transition-colors duration-300">
      <div>
        <div className="font-mono text-[11px] tracking-[0.18em] text-signal mb-6">
          {service.tag}
        </div>
        <h3 className="font-display text-2xl mb-3 text-ink group-hover:text-paper transition-colors duration-300">
          {service.name}
        </h3>
        <p className="text-sm leading-relaxed text-ink/65 group-hover:text-paper/70 transition-colors duration-300">
          {service.summary}
        </p>
      </div>
      {href && (
        <div className="mt-8 font-mono text-[12px] uppercase tracking-[0.1em] text-ink/50 group-hover:text-signal transition-colors duration-300">
          View details →
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
}
