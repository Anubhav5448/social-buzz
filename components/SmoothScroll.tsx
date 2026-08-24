"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Height of the sticky nav (h-20 = 80px) so anchor-link scrolling (e.g.
// /services#web-development) doesn't land the target under the nav bar.
const ANCHOR_OFFSET = -84;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect users who've asked for reduced motion at the OS level.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    // Make in-page anchor links (e.g. href="#web-development" on the
    // Services page) use Lenis's smooth scrollTo instead of the browser's
    // instant jump, and account for the sticky nav's height.
    function handleAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: ANCHOR_OFFSET });
      history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
