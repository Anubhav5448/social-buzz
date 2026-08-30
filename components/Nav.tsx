"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

// How many pixels of scroll it takes to go from a fully transparent header
// to a fully solid cream one. Bigger = a slower, more gradual fade.
const SCROLL_FADE_DISTANCE = 220;

function BrandMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x="11"
          y="1"
          width="2"
          height="7"
          rx="1"
          className="fill-signal"
          transform={`rotate(${i * 45} 12 12)`}
        />
      ))}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L15 15M15 1L1 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  // 0 = fully transparent (top of page), 1 = fully solid cream background.
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Continuously fade the header from transparent to a translucent cream
  // as the page scrolls, instead of snapping at a fixed point.
  useEffect(() => {
    let rafId = 0;

    function handleScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / SCROLL_FADE_DISTANCE, 1);
        setScrollProgress(progress);
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the mobile menu automatically on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // True once the header has faded in enough that dark text stays
  // readable against it. Below this, we're still looking at the raw
  // hero image behind a near-transparent header, so nav text goes white.
  // Only the home page has a dark hero photo behind the header — every
  // other page (Services, Blog, About, Contact) has a plain light
  // background from the very top, so white nav text would disappear
  // there. Force dark/ink nav styling on every page except home.
  const isHomePage = pathname === "/";
  const scrolled = !isHomePage || scrollProgress > 0.15;

  // Interpolated header background/border/shadow — driven by scrollProgress
  // rather than a class toggle, so the change reads as a smooth fade.
  // Capped well below 1 so the header stays translucent (you can still see
  // content through it) even at full scroll — never a solid cream bar.
  const MAX_BG_OPACITY = 0.45;
  const headerStyle = {
    backgroundColor: `rgba(250, 249, 244, ${scrollProgress * MAX_BG_OPACITY})`,
    borderBottomColor: `rgba(228, 225, 211, ${scrollProgress * 0.6})`,
    backdropFilter: `blur(${scrollProgress * 10}px)`,
    WebkitBackdropFilter: `blur(${scrollProgress * 10}px)`,
    boxShadow:
      scrollProgress > 0.05
        ? `0 8px 24px rgba(18, 18, 26, ${0.04 * scrollProgress})`
        : "none",
  };

  return (
    <header
      style={headerStyle}
      className="font-nav fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent transition-shadow duration-200"
    >
      <div className="container-page">
        <div className="flex items-center justify-between gap-4 h-16 md:h-[72px]">
          <Link
            href="/"
            className={`flex items-center gap-2 font-nav text-lg md:text-xl font-semibold tracking-tight shrink-0 transition-colors duration-300 ${
              scrolled ? "text-ink" : "text-white"
            }`}
          >
            <BrandMark />
            Social Buzz<span className="text-signal">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <span
                    className={`text-[15px] transition-colors duration-300 ${
                      scrolled
                        ? active
                          ? "text-ink font-medium"
                          : "text-ink/65 group-hover:text-ink"
                        : active
                        ? "text-white font-medium"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span
                    className={`w-1 h-1 rounded-full bg-signal transition-opacity ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium transition-colors hover:bg-signal"
            >
              Get a Quote
            </Link>
          </div>

          <button
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-end justify-center shrink-0"
            onClick={() => setOpen(true)}
          >
            <span
              className={`h-0.5 w-6 transition-colors duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              }`}
            />
            <span
              className={`h-0.5 w-4 transition-colors duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              }`}
            />
            <span
              className={`h-0.5 w-6 transition-colors duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div
        className={`font-nav md:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          aria-label="Close menu"
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-x-4 top-4 rounded-3xl bg-paper shadow-2xl p-5 transition-all duration-200 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-nav text-lg font-semibold tracking-tight text-ink"
            >
              <BrandMark />
              Social Buzz<span className="text-signal">.</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-ink text-paper px-4 py-2 text-sm font-medium"
              >
                Get a Quote
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink/30 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-nav text-xl py-4 border-b border-line last:border-b-0 text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}