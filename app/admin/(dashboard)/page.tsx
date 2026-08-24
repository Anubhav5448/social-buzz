import Link from "next/link";
import { getAllPosts } from "@/lib/blogPosts";
import { getAllProjects } from "@/lib/projects";

 // Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);
  const publishedCount = posts.filter((p) => p.published).length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div>
      <div className="eyebrow mb-2">Overview</div>
      <h1 className="font-display text-3xl mb-10">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <StatCard label="Blog posts" value={posts.length} />
        <StatCard label="Published" value={publishedCount} />
        <StatCard label="Projects" value={projects.length} />
        <StatCard label="Featured on home" value={featuredCount} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/admin/blogs/new"
          className="border border-line bg-paper p-8 hover:border-signal transition-colors block"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal mb-2">New</div>
          <div className="font-display text-2xl">Write a blog post</div>
        </Link>
        <Link
          href="/admin/projects/new"
          className="border border-line bg-paper p-8 hover:border-signal transition-colors block"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal mb-2">New</div>
          <div className="font-display text-2xl">Add a project</div>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-line bg-paper p-6">
      <div className="font-display text-4xl">{value}</div>
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 mt-2">{label}</div>
    </div>
  );
}
