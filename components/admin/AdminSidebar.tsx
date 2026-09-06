"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/admin/LogoutButton";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blogs", label: "Blog Posts" },
  { href: "/admin/projects", label: "Projects" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on route change (e.g. after tapping a nav link).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const sidebarContent = (
    <>
      <div>
        <div className="px-6 h-16 flex items-center justify-between border-b border-paper/10">
          <Link href="/admin" className="font-display text-lg leading-tight">
            Social Buzz<span className="text-signal">.</span>
            <br />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/40">
              Admin
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="md:hidden p-2 -mr-2 text-paper/60 hover:text-paper"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="px-3 py-6 flex flex-col gap-1">
          {LINKS.map((l) => {
            const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-mono text-[12px] uppercase tracking-[0.08em] px-3 py-2.5 border-l-2 transition-colors ${
                  active
                    ? "bg-paper/10 text-signal border-signal"
                    : "text-paper/70 border-transparent hover:text-signal hover:bg-paper/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-6 py-6 border-t border-paper/10 flex flex-col gap-4">
        <Link
          href="/"
          target="_blank"
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper/50 hover:text-paper transition-colors"
        >
          View site ↗
        </Link>
        <LogoutButton />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar with hamburger trigger — shown below md */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-ink text-paper border-b border-paper/10">
        <Link href="/admin" className="font-display text-base">
          Social Buzz<span className="text-signal">.</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="p-2 -mr-2 text-paper/80 hover:text-paper"
        >
          <HamburgerIcon />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in drawer */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-ink text-paper flex flex-col justify-between transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {sidebarContent}
      </aside>

      {/* Static desktop sidebar — unchanged behaviour at md and up */}
      <aside className="hidden md:flex w-64 shrink-0 bg-ink text-paper flex-col justify-between min-h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}