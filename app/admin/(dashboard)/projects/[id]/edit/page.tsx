import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";
import ProjectForm from "@/components/admin/ProjectForm";

 // Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(Number(params.id));
  if (!project) notFound();

  return (
    <div>
      <div className="eyebrow mb-2">Content</div>
      <h1 className="font-display text-3xl mb-10">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
