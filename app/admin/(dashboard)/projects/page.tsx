import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import DeleteButton from "@/components/admin/DeleteButton";

 // Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="eyebrow mb-2">Content</div>
          <h1 className="font-display text-3xl">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-ink/50">No projects yet. Add your first one.</p>
      ) : (
        <div className="border border-line bg-paper divide-y divide-line">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/45 mb-1.5">
                  <span className={project.featured ? "text-signal" : "text-ink/40"}>
                    {project.featured ? "Featured on Home" : "Hidden"}
                  </span>
                  <span>·</span>
                  <span>{project.project_type || "—"}</span>
                </div>
                <div className="font-display text-lg truncate">{project.client_name}</div>
                <div className="font-mono text-[11px] text-ink/40 truncate">{project.metric}</div>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60 hover:text-signal transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton endpoint={`/api/admin/projects/${project.id}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
