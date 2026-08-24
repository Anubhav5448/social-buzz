import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-32">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-display text-2xl mb-4">
              Social Buzz<span className="text-signal">.</span>
            </div>
            <p className="text-paper/60 max-w-xs text-sm leading-relaxed">
              A compact team that plans, designs, builds and broadcasts your
              brand — five disciplines, one desk.
            </p>
          </div>

          <div>
            <div className="eyebrow text-paper/50 mb-4">Navigate</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-signal transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-signal transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-signal transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-signal transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-signal transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-paper/50 mb-4">Reach Us</div>
            <ul className="space-y-2 text-sm text-paper/80">
              <li>hello@thesocialbuzz.in</li>
              <li>+91 xxxxx xxxxx</li>
              <li>17 Capitol Tower, Survey Chowk, Dehradun, Uttarakhand</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-paper/15 flex flex-col md:flex-row gap-3 justify-between text-paper/40 text-xs font-mono uppercase tracking-wide">
          <span>© {new Date().getFullYear()} Social Buzz. All rights reserved.</span>
          
        </div>
      </div>
    </footer>
  );
}
