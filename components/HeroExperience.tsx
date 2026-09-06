"use client";

import { useRef, useState } from "react";

const EMAIL = "hello@thesocialbuzz.in";

// Floating icons around the avatar. Each has its own "depth" (parallax
// strength, so they drift at different speeds as the cursor moves) and its
// own animation "delay" so the idle bobbing doesn't sync up between icons —
// together these two make the movement read as loosely random rather than
// mechanically identical.
const FLOATING_ELEMENTS = [
  { id: "code", src: "/code.png", label: "Digital Marketing", top: "6%", left: "2%", depth: 22, delay: "0s" },
  { id: "seo", src: "/seo.png", label: "SEO", top: "18%", left: "72%", depth: 16, delay: "0.6s" },
  { id: "performance", src: "/performance.png", label: "Performance Marketing", top: "70%", left: "76%", depth: 26, delay: "1.1s" },
  { id: "react", src: "/react.png", label: "Web Development", top: "80%", left: "4%", depth: 12, delay: "1.6s" },
] as const;

export default function HeroExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Normalized pointer position relative to the section, range -0.5..0.5
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<string | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x, y });
  }

  function handleMouseLeave() {
    setPointer({ x: 0, y: 0 });
    setHoveredEl(null);
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — fail quietly.
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-16 sm:pt-10 md:pt-16 w-full overflow-hidden bg-paper"
    >
      {/* Grid background pattern — covers the full hero */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/grid.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
      />

      <div className="container-page relative z-10 flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12 py-6 sm:py-10 md:py-0 md:min-h-[640px]">
        {/* LEFT: copy */}
        <div className="flex-1 md:max-w-[52%] text-center md:text-left">
          <div className="eyebrow mb-3 sm:mb-4 justify-center md:justify-start flex">
            Digital Marketing Agency
          </div>
          <h1 className="font-hero text-3xl sm:text-4xl md:text-[58px] leading-[1.15] md:leading-[1.03] tracking-tight text-ink">
            We build the signal your brand broadcasts.
          </h1>
          <p className="font-hero mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-ink/65 max-w-lg leading-relaxed mx-auto md:mx-0">
            Digital marketing, design, web development, performance media and
            events — planned together so every piece of work amplifies the
            next.
          </p>

          <div className="mt-6 sm:mt-7 md:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 justify-center md:justify-start">
            <a href="/contact" className="btn-primary">
              Start a project
            </a>
            <a href="/services" className="btn-outline">
              Our services
            </a>
          </div>

          <button
            onClick={handleCopyEmail}
            className="mt-6 sm:mt-7 md:mt-8 font-mono text-[11px] sm:text-xs uppercase tracking-[0.1em] text-ink/60 hover:text-signal transition-colors"
          >
            {copied ? "Copied!" : EMAIL.toUpperCase()}
          </button>
        </div>

        {/* RIGHT: avatar + interactive floating icons */}
        <div className="hidden sm:flex flex-1 relative w-full sm:h-[380px] md:h-[560px] items-center justify-center">
          {/* Soft glow behind the avatar */}
          <div className="absolute w-[70%] h-[70%] rounded-full bg-signal/10 blur-3xl" />

          {/* Avatar — tilts gently toward the cursor */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png"
            alt="3D character avatar"
            className="relative z-10 w-[58%] sm:w-[64%] md:w-[70%] max-w-[420px] select-none pointer-events-none will-change-transform transition-transform duration-200 ease-out drop-shadow-2xl"
            style={{
              transform: `rotateY(${pointer.x * 14}deg) rotateX(${
                pointer.y * -10
              }deg) translate3d(${pointer.x * 10}px, ${pointer.y * 10}px, 0)`,
            }}
          />

          {/* Floating icons */}
          {FLOATING_ELEMENTS.map((item) => {
            const isHovered = hoveredEl === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredEl(item.id)}
                onMouseLeave={() => setHoveredEl(null)}
                className="floating-icon hidden sm:flex absolute z-20 items-center gap-2 rounded-full border border-line bg-paperdim/90 shadow-md pl-1.5 pr-3 py-1.5 cursor-default select-none transition-transform duration-200 ease-out"
                style={{
                  top: item.top,
                  left: item.left,
                  animationDelay: item.delay,
                  transform: `translate3d(${pointer.x * item.depth}px, ${
                    pointer.y * item.depth
                  }px, 0) scale(${isHovered ? 1.1 : 1})`,
                }}
              >
                <span className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </span>
                <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.06em] text-ink/75 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .floating-icon {
          animation: floaty 5.5s ease-in-out infinite;
        }
        @keyframes floaty {
          0%,
          100% {
            margin-top: 0px;
          }
          50% {
            margin-top: -10px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-icon {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}