"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  "Digital Marketing",
  "Graphic Designing",
  "Web Development",
  "Performance Marketing",
  "Event Management",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your form backend of choice (e.g. an API route,
    // Formspree, or a Google Sheets webhook) — this demo just confirms
    // the enquiry was captured client-side.
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-signal p-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal mb-3">
          Enquiry received
        </div>
        <p className="font-display text-2xl mb-2">Thanks — we'll reply within one business day.</p>
        <p className="text-ink/60 text-sm">
          Keep an eye on your inbox for a note from our team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-ink placeholder:text-ink/30 focus:border-signal outline-none transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-ink placeholder:text-ink/30 focus:border-signal outline-none transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          Service you're enquiring about
        </label>
        <select
          id="service"
          name="service"
          className="w-full border border-line bg-transparent px-4 py-3 text-ink focus:border-signal outline-none transition-colors"
          defaultValue={SERVICE_OPTIONS[0]}
        >
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border border-line bg-transparent px-4 py-3 text-ink placeholder:text-ink/30 focus:border-signal outline-none transition-colors resize-none"
          placeholder="Tell us what you're trying to get done."
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send Enquiry
      </button>
    </form>
  );
}
