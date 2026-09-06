"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function BlogCard({ href, children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col gap-5 h-full rounded-2xl border border-line p-5 hover:border-ink/20 transition-colors"
    >
      {children}

      {/* Pill follows the cursor anywhere across the whole card */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-20 inline-flex items-center gap-2 rounded-full bg-ink/80 backdrop-blur px-4 py-2 text-paper text-sm font-medium whitespace-nowrap transition-opacity duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          opacity: hovered ? 1 : 0,
        }}
      >
        Read article
      </span>
    </Link>
  );
}