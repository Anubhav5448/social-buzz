import Link from "next/link";
import { getAllPosts } from "@/lib/blogPosts";
import DeleteButton from "@/components/admin/DeleteButton";

 // Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="eyebrow mb-2">Content</div>
          <h1 className="font-display text-3xl">Blog Posts</h1>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary">
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-ink/50">No blog posts yet. Create your first one.</p>
      ) : (
        <div className="border border-line bg-paper divide-y divide-line">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/45 mb-1.5">
                  <span className={post.published ? "text-signal" : "text-ink/40"}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span>·</span>
                  <span>{post.category}</span>
                </div>
                <div className="font-display text-lg truncate">{post.title}</div>
                <div className="font-mono text-[11px] text-ink/40 truncate">/blog/{post.slug}</div>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <Link
                  href={`/admin/blogs/${post.id}/edit`}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60 hover:text-signal transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton endpoint={`/api/admin/blogs/${post.id}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
