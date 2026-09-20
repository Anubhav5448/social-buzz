"use client";

import { useRef, useState, useEffect } from "react";
import {
  Code2,
  Search,
  TrendingUp,
  Layers,
  type LucideIcon,
} from "lucide-react";

const EMAIL = "hello@thesocialbuzz.in";

// Floating icons around the avatar. Each has its own "depth" (parallax
// strength, so they drift at different speeds as the cursor moves) and its
// own animation "delay" so the idle bobbing doesn't sync up between icons —
// together these two make the movement read as loosely random rather than
// mechanically identical.
type FloatingElement = {
  id: string;
  Icon: LucideIcon;
  label: string;
  top: string;
  left: string;
  depth: number;
  delay: string;
  color: string;
};

const FLOATING_ELEMENTS: FloatingElement[] = [
  {
    id: "code",
    Icon: Code2,
    label: "Digital Marketing",
    top: "6%",
    left: "2%",
    depth: 22,
    delay: "0s",
    color: "text-signal",
  },
  {
    id: "seo",
    Icon: Search,
    label: "SEO",
    top: "18%",
    left: "72%",
    depth: 16,
    delay: "0.6s",
    color: "text-signal",
  },
  {
    id: "performance",
    Icon: TrendingUp,
    label: "Performance Marketing",
    top: "70%",
    left: "76%",
    depth: 26,
    delay: "1.1s",
    color: "text-signal",
  },
  {
    id: "react",
    Icon: Layers,
    label: "Web Development",
    top: "80%",
    left: "4%",
    depth: 12,
    delay: "1.6s",
    color: "text-signal",
  },
];

export default function HeroExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      // Clipboard API can be unavailable — fail quietly.
    }
  }

  const getParallaxValues = () => {
    if (isMobile) {
      return { rotateY: 4, rotateX: -3, translateX: 4, translateY: 4 };
    }
    return { rotateY: 14, rotateX: -10, translateX: 10, translateY: 10 };
  };

  const parallax = getParallaxValues();

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-16 sm:pt-10 md:pt-16 w-full overflow-hidden bg-paper"
    >
      {/* Grid background pattern */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/grid.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none select-none"
      />

      <div className="container-page relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-10 md:gap-12 py-4 sm:py-10 md:py-0 md:min-h-[640px]">
        {/* LEFT: copy */}
        <div className="flex-1 md:max-w-[52%] text-center md:text-left px-4 sm:px-0">
          <div className="eyebrow mb-2 sm:mb-4 justify-center md:justify-start flex text-xs sm:text-sm">
            Digital Marketing Agency
          </div>
          <h1 className="font-hero text-2xl sm:text-4xl md:text-[58px] leading-[1.2] md:leading-[1.03] tracking-tight text-ink">
            We build the signal your brand broadcasts.
          </h1>
          <p className="font-hero mt-2 sm:mt-5 md:mt-6 text-xs sm:text-base md:text-lg text-ink/65 max-w-lg leading-relaxed mx-auto md:mx-0">
            Digital marketing, design, web development, performance media and
            events — planned together so every piece of work amplifies the
            next.
          </p>

          <div className="mt-4 sm:mt-7 md:mt-8 flex flex-wrap items-center gap-2 sm:gap-4 justify-center md:justify-start">
            <a
              href="/contact"
              className="btn-primary text-xs sm:text-base px-3 py-1.5 sm:px-6 sm:py-2.5"
            >
              Start a project
            </a>
            <a
              href="/services"
              className="btn-outline text-xs sm:text-base px-3 py-1.5 sm:px-6 sm:py-2.5"
            >
              Our services
            </a>
          </div>

          <button
            onClick={handleCopyEmail}
            className="mt-4 sm:mt-7 md:mt-8 font-mono text-[10px] sm:text-xs uppercase tracking-[0.1em] text-ink/60 hover:text-signal transition-colors"
          >
            {copied ? "Copied!" : EMAIL.toUpperCase()}
          </button>
        </div>

        {/* RIGHT: avatar + interactive floating icons */}
        <div className="flex flex-1 relative w-full h-[180px] sm:h-[380px] md:h-[560px] items-center justify-center">
          {/* Soft glow behind the avatar */}
          <div
            className={`absolute ${
              isMobile ? "w-[50%] h-[50%]" : "w-[70%] h-[70%]"
            } rounded-full bg-signal/10 blur-3xl`}
          />

          {/* Avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png"
            alt="3D character avatar"
            className={`relative z-10 select-none pointer-events-none will-change-transform transition-transform duration-200 ease-out drop-shadow-2xl ${
              isMobile
                ? "w-[45%] max-w-[160px]"
                : "w-[70%] sm:w-[64%] md:w-[70%] max-w-[420px]"
            }`}
            style={{
              transform: `rotateY(${pointer.x * parallax.rotateY}deg) rotateX(${
                pointer.y * parallax.rotateX
              }deg) translate3d(${pointer.x * parallax.translateX}px, ${
                pointer.y * parallax.translateY
              }px, 0)`,
            }}
          />

          {/* Floating icons — animated SVG */}
          {FLOATING_ELEMENTS.map((item) => {
            const isHovered = hoveredEl === item.id;
            const Icon = item.Icon;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredEl(item.id)}
                onMouseLeave={() => setHoveredEl(null)}
                className="floating-icon hidden sm:flex absolute z-20 items-center gap-2 rounded-full border border-line bg-paperdim/90 shadow-md pl-1.5 pr-3 py-1.5 cursor-default select-none transition-transform duration-200 ease-out group/icon"
                style={{
                  top: item.top,
                  left: item.left,
                  animationDelay: item.delay,
                  transform: `translate3d(${pointer.x * item.depth}px, ${
                    pointer.y * item.depth
                  }px, 0) scale(${isHovered ? 1.1 : 1})`,
                }}
              >
                <span className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center rounded-full bg-signal/10">
                  <Icon
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${item.color} ${
                      isHovered ? "icon-bounce" : ""
                    }`}
                    strokeWidth={2}
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

      {/* Mobile-only: compact icon strip under the avatar */}
      <div className="flex sm:hidden container-page relative z-10 justify-center gap-2 pb-4 -mt-1 flex-wrap px-4">
        {FLOATING_ELEMENTS.map((item) => {
          const Icon = item.Icon;
          return (
            <div
              key={item.id}
              className="flex items-center gap-1 rounded-full border border-line bg-paperdim/90 shadow-sm pl-1 pr-2 py-0.5"
            >
              <span className="w-4 h-4 shrink-0 flex items-center justify-center rounded-full bg-signal/10">
                <Icon
                  className={`h-2.5 w-2.5 ${item.color}`}
                  strokeWidth={2.2}
                />
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-ink/70 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );
        })}
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
        @keyframes icon-bounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          30% {
            transform: translateY(-2px) scale(1.15);
          }
          60% {
            transform: translateY(1px) scale(0.95);
          }
        }
        :global(.icon-bounce) {
          animation: icon-bounce 0.6s ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-icon {
            animation: none;
          }
          :global(.icon-bounce) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}