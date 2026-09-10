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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Send failed");
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-signal p-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal mb-3">
          Enquiry received
        </div>
        <p className="font-display text-2xl mb-2">
          Thanks — we&apos;ll reply within one business day.
        </p>
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
          <label
            htmlFor="name"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2"
          >
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
          <label
            htmlFor="email"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2"
          >
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
        <label
          htmlFor="service"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2"
        >
          Service you&apos;re enquiring about
        </label>
        <select
          id="service"
          name="service"
          className="w-full border border-line bg-paper px-4 py-3 text-ink focus:border-signal outline-none transition-colors"
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
        <label
          htmlFor="message"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2"
        >
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please email us directly at{" "}
          <a
            href="mailto:hello@thesocialbuzz.in"
            className="underline hover:text-signal"
          >
            hello@thesocialbuzz.in
          </a>
          .
        </p>
      )}
    </form>
  );
}