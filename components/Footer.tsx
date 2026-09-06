import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
];

export default function Footer() {
  return (
    <footer className="bg-paper text-ink mt-32">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="font-display text-2xl mb-4">
              Social Buzz<span className="text-signal">.</span>
            </div>
            <p className="text-ink/60 max-w-xs text-sm leading-relaxed mb-6">
              A compact team that plans, designs, builds and broadcasts your
              brand — five disciplines, one desk.
            </p>
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50 hover:text-signal transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow text-ink/50 mb-4">Navigate</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-signal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-signal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-signal transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-signal transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-ink/50 mb-4">Services</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#digital-marketing" className="hover:text-signal transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services#graphic-designing" className="hover:text-signal transition-colors">
                  Graphic Designing
                </Link>
              </li>
              <li>
                <Link href="/services#web-development" className="hover:text-signal transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services#performance-marketing" className="hover:text-signal transition-colors">
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link href="/services#event-management" className="hover:text-signal transition-colors">
                  Event Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-ink/50 mb-4">Reach Us</div>
            <ul className="space-y-2 text-sm text-ink/80">
              <li>hello@thesocialbuzz.in</li>
              <li>+91 xxxxx xxxxx</li>
              <li>17 Capitol Tower, Survey Chowk, Dehradun, Uttarakhand</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-ink/15 flex flex-col md:flex-row gap-3 justify-between text-ink/40 text-xs font-mono uppercase tracking-wide">
          <span>© {new Date().getFullYear()} Social Buzz. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}