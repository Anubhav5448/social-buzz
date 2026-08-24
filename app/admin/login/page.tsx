"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="font-display text-2xl text-paper mb-1">
          Social Buzz<span className="text-signal">.</span>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40 mb-10">
          Admin panel
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/50 block mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/30 focus:border-signal outline-none transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="password" className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/50 block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/30 focus:border-signal outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="border border-signal/50 bg-signal/10 text-signal text-sm px-4 py-3 font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal text-ink font-mono text-[13px] uppercase tracking-[0.08em] px-6 py-3 hover:bg-paper transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
