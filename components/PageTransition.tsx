"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TRANSITION_MS = 260;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"enter" | "exit">("enter");

  // On every route change: fade/slide the current content out, swap in the
  // new page's already-rendered children, then fade/slide it back in.
  useEffect(() => {
    setStage("exit");
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setStage("enter");
    }, TRANSITION_MS);
    return () => clearTimeout(timer);
    // Only re-run when the route actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      className={`transition-all ease-out ${
        stage === "enter" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      {displayChildren}
    </div>
  );
}