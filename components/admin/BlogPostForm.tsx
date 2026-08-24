"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MediaUploader from "@/components/admin/MediaUploader";
import type { BlogPost } from "@/lib/blogPosts";

const CATEGORIES = [
  "Digital Marketing",
  "Graphic Design",
  "Web Development",
  "Performance Marketing",
  "Event Management",
  "SEO",
];

type Props = {
  post?: BlogPost;
};

export default function BlogPostForm({ post }: Props) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [category, setCategory] = useState(post?.category ?? CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [mediaUrl, setMediaUrl] = useState<string | null>(post?.media_url ?? null);
  const [mediaType, setMediaType] = useState<"image" | "video">(post?.media_type ?? "image");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      slug,
      category,
      excerpt,
      content,
      published,
      media_url: mediaUrl,
      media_type: mediaType,
    };

    const res = await fetch(isEdit ? `/api/admin/blogs/${post!.id}` : "/api/admin/blogs", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Could not save the post.");
      setSaving(false);
      return;
    }

    router.push("/admin/blogs");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="title" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          Title
        </label>
        <input
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors"
          placeholder="The 12-point SEO checklist we run before every launch"
        />
      </div>

      <div>
        <label htmlFor="slug" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          URL slug <span className="normal-case text-ink/30">(leave blank to auto-generate from title)</span>
        </label>
        <input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors font-mono text-sm"
          placeholder="seo-checklist-2026"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
            Status
          </label>
          <div className="flex items-center gap-3 h-[46px]">
            <button
              type="button"
              onClick={() => setPublished(true)}
              className={`px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] border ${
                published ? "border-signal text-signal" : "border-line text-ink/50"
              }`}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => setPublished(false)}
              className={`px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] border ${
                !published ? "border-signal text-signal" : "border-line text-ink/50"
              }`}
            >
              Draft
            </button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors resize-none"
          placeholder="One or two sentences shown on the blog listing page."
        />
      </div>

      <div>
        <label htmlFor="content" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
          Content
        </label>
        <textarea
          id="content"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 focus:border-signal outline-none transition-colors"
          placeholder="Full article content. Plain text or Markdown."
        />
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
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
