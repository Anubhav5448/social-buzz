import Link from "next/link";
import HeroExperience from "@/components/HeroExperience";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/lib/services";
import { getFeaturedProjects } from "@/lib/projects";

 // Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

const WHY = [
  {
    title: "One desk, five disciplines",
    body: "Strategy, design, build, paid media and events sit in the same room — no hand-off gaps, no repeated briefings.",
  },
  {
    title: "Reporting you can read",
    body: "Every engagement ends the month with numbers that map back to leads and revenue, not just impressions.",
  },
  {
    title: "Built for momentum",
    body: "We plan in campaigns, not one-off tasks, so this month's work compounds into next month's results.",
  },
];

export default async function HomePage() {
  const projects = await getFeaturedProjects(3);

  return (
    <>
      {/* HERO */}
      <HeroExperience />
      {/* SERVICE HIGHLIGHTS */}
      <section id="services" className="section-rule">
        <div className="container-page py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="eyebrow mb-3">What we do</div>
              <h2 className="font-display text-3xl md:text-4xl max-w-xl">
                Five disciplines, covered in full on one page.
              </h2>
            </div>
            <Link href="/services" className="btn-outline shrink-0">
              All Services
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} href={`/services#${s.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-rule bg-ink text-paper">
        <div className="container-page py-20">
          <div className="eyebrow text-paper/50 mb-3">Why choose us</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-14">
            Fewer vendors. Faster decisions. Clearer numbers.
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {WHY.map((w, i) => (
              <div key={w.title} className="border-t-2 border-signal pt-6">
                <div className="font-mono text-[11px] text-paper/40 mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl mb-3">{w.title}</h3>
                <p className="text-paper/65 text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section-rule">
        <div className="container-page py-20">
          <div className="eyebrow mb-3">Featured work</div>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mb-12">
            A quick look at recent campaigns.
          </h2>

          {projects.length === 0 ? (
            <p className="text-ink/50">Project highlights will appear here once added from the admin panel.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((item) => (
                <div
                  key={item.id}
                  className="border border-line overflow-hidden flex flex-col justify-between h-72 hover:border-signal transition-colors"
                >
                  <div className="h-28 bg-paperdim overflow-hidden">
                    {item.media_url ? (
                      item.media_type === "video" ? (
                        <video src={item.media_url} className="w-full h-full object-cover" muted />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.media_url} alt={item.client_name} className="w-full h-full object-cover" />
                      )
                    ) : null}
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                      {item.project_type}
                    </div>
                    <div>
                      <div className="font-display text-2xl mb-2">{item.client_name}</div>
                      <div className="text-signal font-mono text-sm">{item.metric}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-rule">
        <div className="container-page py-24 text-center">
          <h2 className="font-display text-3xl md:text-5xl max-w-2xl mx-auto leading-tight">
            Ready to put your brand on air?
          </h2>
          <p className="mt-5 text-ink/60 max-w-md mx-auto">
            Tell us where you're stuck and we'll come back with a plan, not a
            pitch deck.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get a Quote
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
