import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Social Buzz",
  description:
    "Get in touch with Social Buzz — phone, email, address and a quick enquiry form.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-16">
      <div className="eyebrow mb-4">Contact Us</div>
      <h1 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05] mb-6">
        Let's get your brand on air.
      </h1>
      <p className="text-ink/60 max-w-xl text-lg leading-relaxed mb-14">
        Send an enquiry and we'll reply within one business day with next
        steps — or reach us directly using the details below.
      </p>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <div className="lg:col-span-5 space-y-10">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 mb-2">
              Email
            </div>
            <a href="mailto:hello@thesocialbuzz.in" className="font-display text-xl hover:text-signal transition-colors">
              hello@thesocialbuzz.in
            </a>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 mb-2">
              Phone
            </div>
            <a href="tel:+91xxxxxxxx" className="font-display text-xl hover:text-signal transition-colors">
              +91 xxxxx xxxxx
            </a>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 mb-2">
              Address
            </div>
            <p className="font-display text-xl leading-snug">
              Social Buzz Studio<br />17 Capitol Tower, Survey Chowk, Dehradun, Uttarakhand
            </p>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 mb-3">
              Follow
            </div>
            <div className="flex gap-4 font-mono text-sm uppercase tracking-[0.08em]">
              <a href="#" className="border border-line px-4 py-2 hover:border-signal hover:text-signal transition-colors">Instagram</a>
              <a href="#" className="border border-line px-4 py-2 hover:border-signal hover:text-signal transition-colors">LinkedIn</a>
            </div>
          </div>

          <div className="border border-line h-56 overflow-hidden">
            <iframe
              title="Social Buzz location map"
              className="w-full h-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.98%2C30.28%2C78.08%2C30.36&layer=mapnik&marker=30.322%2C78.032"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
