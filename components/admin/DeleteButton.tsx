"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ endpoint, label = "Delete" }: { endpoint: string; label?: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(endpoint, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="font-mono text-[11px] text-ink/50">Sure?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-signal disabled:opacity-50"
        >
          {loading ? "…" : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50 hover:text-signal transition-colors"
    >
      {label}
    </button>
  );
}
