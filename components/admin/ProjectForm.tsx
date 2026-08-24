"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MediaUploader from "@/components/admin/MediaUploader";
import type { Project } from "@/lib/projects";

type Props = {
  project?: Project;
};

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const isEdit = !!project;

  const [clientName, setClientName] = useState(project?.client_name ?? "");
  const [projectType, setProjectType] = useState(project?.project_type ?? "");
  const [metric, setMetric] = useState(project?.metric ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? true);
  const [sortOrder, setSortOrder] = useState(project?.sort_order ?? 0);
  const [mediaUrl, setMediaUrl] = useState<string | null>(project?.media_url ?? null);
  const [mediaType, setMediaType] = useState<"image" | "video">(project?.media_type ?? "image");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      client_name: clientName,
      project_type: projectType,
      metric,
      description,
      featured,
      sort_order: sortOrder,
      media_url: mediaUrl,
      media_type: mediaType,
    };

    const res = await fetch(isEdit ? `/api/admin/projects/${project!.id}` : "/api/admin/projects", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Could not save the project.");
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="clientName" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          Client / project name
        </label>
        <input
          id="clientName"
          required
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors"
          placeholder="Kavya Foods"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Project type
          </label>
          <input
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors"
            placeholder="Brand + E-commerce"
          />
        </div>
        <div>
          <label htmlFor="metric" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Headline metric
          </label>
          <input
            id="metric"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors"
            placeholder="+64% online orders"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors resize-none"
          placeholder="Short internal note on what the project involved."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Show on homepage
          </label>
          <div className="flex items-center gap-3 h-[46px]">
            <button
              type="button"
              onClick={() => setFeatured(true)}
              className={`px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] border ${
                featured ? "border-signal text-signal" : "border-line text-ink/50"
              }`}
            >
              Featured
            </button>
            <button
              type="button"
              onClick={() => setFeatured(false)}
              className={`px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] border ${
                !featured ? "border-signal text-signal" : "border-line text-ink/50"
              }`}
            >
              Hidden
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="sortOrder" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Sort order <span className="normal-case text-ink/30">(lower shows first)</span>
          </label>
          <input
            id="sortOrder"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors"
          />
        </div>
      </div>

      <MediaUploader
        mediaUrl={mediaUrl}
        mediaType={mediaType}
        onChange={(url, type) => {
          setMediaUrl(url);
          setMediaType(type);
        }}
      />

      {error && (
        <div className="border border-signal/50 bg-signal/10 text-signal text-sm px-4 py-3 font-mono">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
