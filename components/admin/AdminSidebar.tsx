"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blogs", label: "Blog Posts" },
  { href: "/admin/projects", label: "Projects" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-ink text-paper flex flex-col justify-between min-h-screen sticky top-0">
      <div>
        <div className="px-6 h-16 flex items-center border-b border-paper/10">
          <Link href="/admin" className="font-display text-lg leading-tight">
            Social Buzz<span className="text-signal">.</span>
            <br />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/40">
              Admin
            </span>
          </Link>
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
    </aside>
  );
}