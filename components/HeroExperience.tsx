"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "hello@thesocialbuzz.in";
const STUDIO_TIMEZONE = "Asia/Kolkata";
const STUDIO_TIMEZONE_LABEL = "GMT+5:30";

// Size (px) of the radial-gradient mask that localizes the water
// distortion around the cursor — bigger = wider ripple footprint.
const RIPPLE_MASK_SIZE = 320;
const RIPPLE_MASK_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${RIPPLE_MASK_SIZE}" height="${RIPPLE_MASK_SIZE}"><defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff" stop-opacity="1"/><stop offset="55%" stop-color="#fff" stop-opacity="0.55"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
  );

function ChevronIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M6 3V6L8 7.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

type HeadingLevel = "Heading 1" | "Heading 2" | "Heading 3";

const HEADING_SIZE: Record<HeadingLevel, string> = {
  "Heading 1": "text-[16vw] md:text-[84px]",
  "Heading 2": "text-[13vw] md:text-[62px]",
  "Heading 3": "text-[11vw] md:text-[46px]",
};

const HEADLINE_COLORS = [
  { label: "Default", value: "#12121A" },
  { label: "Red", value: "#E8462F" },
  { label: "Amber", value: "#C97A3D" },
  { label: "Blue", value: "#3E5FCE" },
] as const;
export default function HeroExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [pointer, setPointer] = useState({ x: -9999, y: -9999 });
  const [rippleScale, setRippleScale] = useState(0);
  const targetScaleRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  // Interactive "editor toolbar" demo above the headline (see toolbar JSX below)
  const [headingOpen, setHeadingOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [headingLevel, setHeadingLevel] = useState<HeadingLevel>("Heading 1");
  const [headlineColor, setHeadlineColor] = useState<string>(
    HEADLINE_COLORS[0].value,
  );
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const toolbarOpen = headingOpen || colorOpen;

  // Live clock in the studio's own timezone (not the visitor's), so anyone
  // browsing the site can tell whether the team is likely online.
  useEffect(() => {
    function updateClock() {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: STUDIO_TIMEZONE,
        }).format(new Date()),
      );
    }
    updateClock();
    const interval = setInterval(updateClock, 15_000);
    return () => clearInterval(interval);
  }, []);

  // Runs every frame: eases the distortion strength toward its target,
  // and lets the target itself decay — so the water "settles" a moment
  // after the cursor stops moving instead of staying warped forever.
  useEffect(() => {
    function tick() {
      setRippleScale((prev) => prev + (targetScaleRef.current - prev) * 0.08);
      targetScaleRef.current *= 0.92;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Tilt the background a few degrees toward the cursor.
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    setTilt({ rx: py * -6, ry: px * 8 });

    // Move the distortion mask to the cursor and top up its strength —
    // the settle loop above eases it back down once movement stops.
    setPointer({ x, y });
    targetScaleRef.current = Math.min(targetScaleRef.current + 16, 42);
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
    targetScaleRef.current = 0;
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
      className="relative w-full overflow-hidden min-h-[560px] md:min-h-[640px] flex flex-col"
      style={{ perspective: "1000px" }}
    >
      {/* Hidden SVG filter: displaces the photo's own pixels around the
          cursor using turbulence noise, masked to a soft radius that
          follows the pointer. This warps the image itself instead of
          drawing shapes on top of it, which is what reads as "water". */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="hero-water-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodColor="#808080" result="neutral" />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves={2}
              seed={4}
              stitchTiles="stitch"
              result="noise"
            />
            <feImage
              href={RIPPLE_MASK_DATA_URI}
              x={0}
              y={0}
              width={RIPPLE_MASK_SIZE}
              height={RIPPLE_MASK_SIZE}
              result="maskShape"
            />
            <feOffset
              in="maskShape"
              dx={pointer.x - RIPPLE_MASK_SIZE / 2}
              dy={pointer.y - RIPPLE_MASK_SIZE / 2}
              result="mask"
            />
            <feComposite
              in="noise"
              in2="mask"
              operator="in"
              result="noiseMasked"
            />
            <feComposite
              in="neutral"
              in2="mask"
              operator="out"
              result="neutralMasked"
            />
            <feBlend
              in="noiseMasked"
              in2="neutralMasked"
              mode="normal"
              result="dispMap"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="dispMap"
              scale={rippleScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Background photo — tilts toward the cursor and warps around it
          via the SVG filter above */}
      <div
        className="absolute inset-[-24px] bg-cover bg-center transition-transform duration-200 ease-out will-change-transform"
        style={{
          backgroundImage: "url('/background.jpg')",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.06)`,
          filter: "url(#hero-water-filter)",
        }}
      />

      {/* Gradient so the overlaid text stays readable on any photo */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/30 to-ink/70" /> */}
      {/* Content */}
      <div className="relative z-10 container-page flex-1 flex flex-col items-center justify-center text-center py-16">
        <div className="relative inline-block">
          <h1
            className={`font-hero ${HEADING_SIZE[headingLevel]} leading-[1.02] tracking-tight text-black max-w-4xl md:max-w-5xl mx-auto`}
          >
            We build the signal{" "}
            <span className="relative inline-block">
              {toolbarOpen && (
                <span className="absolute -top-9 left-0 whitespace-nowrap bg-ink text-paper text-[11px] font-mono px-2 py-1 rounded-md shadow-lg">
                  Text style
                </span>
              )}
              <span
                className="relative inline-block rounded-md px-1 -mx-1 transition-colors"
                style={{
                  backgroundColor: toolbarOpen
                    ? "rgba(18,18,26,0.08)"
                    : "transparent",
                  color: headlineColor,
                  fontWeight: bold ? 700 : undefined,
                  fontStyle: italic ? "italic" : undefined,
                  textDecoration: underline ? "underline" : undefined,
                }}
              >
                your brand broadcasts.
              </span>
            </span>
          </h1>

          {/* Editor-style toolbar — sits below the headline, every control is live */}
          <div className="hidden md:flex justify-center mt-6">
            <div className="flex items-center gap-1 bg-paper rounded-full shadow-lg px-2 py-1.5 text-ink/70 text-xs font-mono select-none z-20">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setHeadingOpen((v) => !v);
                    setColorOpen(false);
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-paperdim transition-colors"
                >
                  {headingLevel}
                  <ChevronIcon />
                </button>
                {headingOpen && (
                  <div className="absolute top-full left-0 mt-2 w-36 bg-paper rounded-xl shadow-lg border border-line py-1 text-left normal-case">
                    <div className="px-3 pt-1 pb-2 text-[10px] uppercase tracking-wide text-ink/40">
                      Turn into
                    </div>
                    {(
                      ["Heading 1", "Heading 2", "Heading 3"] as HeadingLevel[]
                    ).map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => {
                          setHeadingLevel(h);
                          setHeadingOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-[13px] hover:bg-paperdim transition-colors ${
                          headingLevel === h ? "bg-paperdim" : ""
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="w-px h-4 bg-line mx-1" />
              <button
                type="button"
                onClick={() => setBold((v) => !v)}
                aria-pressed={bold}
                className={`px-2 py-1 rounded-full font-bold transition-colors ${
                  bold ? "bg-ink text-paper" : "hover:bg-paperdim"
                }`}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => setItalic((v) => !v)}
                aria-pressed={italic}
                className={`px-2 py-1 rounded-full italic transition-colors ${
                  italic ? "bg-ink text-paper" : "hover:bg-paperdim"
                }`}
              >
                I
              </button>
              <button
                type="button"
                onClick={() => setUnderline((v) => !v)}
                aria-pressed={underline}
                className={`px-2 py-1 rounded-full underline transition-colors ${
                  underline ? "bg-ink text-paper" : "hover:bg-paperdim"
                }`}
              >
                U
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setColorOpen((v) => !v);
                    setHeadingOpen(false);
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-ink text-paper"
                >
                  A
                  <ChevronIcon />
                </button>
                {colorOpen && (
                  <div className="absolute top-full right-0 mt-2 flex items-center gap-1 bg-paper rounded-xl shadow-lg border border-line px-2 py-1.5">
                    {HEADLINE_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => {
                          setHeadlineColor(c.value);
                          setColorOpen(false);
                        }}
                        aria-label={c.label}
                        className="w-6 h-6 rounded-md border border-line flex items-center justify-center font-serif text-sm"
                        style={{ color: c.value }}
                      >
                        A
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-hero mt-7 text-lg text-ink/75 max-w-lg leading-relaxed mx-auto">
          Digital marketing, design, web development, performance media and
          events — planned together so every piece of work amplifies the next.
        </p>
      </div>

      {/* Footer row: live studio clock + click-to-copy email */}
      <div className="relative z-10 container-page pb-8 flex items-center justify-between text-ink/80">
        <div className="font-mono text-xs uppercase tracking-[0.1em] flex items-center gap-2">
          <ClockIcon />
          {STUDIO_TIMEZONE_LABEL} {time}
        </div>

        <button
          onClick={handleCopyEmail}
          className="font-mono text-xs uppercase tracking-[0.1em] hover:text-signal transition-colors"
        >
          {copied ? "Copied!" : EMAIL.toUpperCase()}
        </button>
      </div>
    </section>
  );
}
