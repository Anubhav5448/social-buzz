import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blogPosts";
import BlogCard from "@/components/BlogCard";
import BlogCardMedia from "@/components/BlogCardMedia";

export const metadata: Metadata = {
  title: "Blog — The Social Buzz",
  description:
    "Articles, tips, case studies and industry updates from The Social Buzz team.",
};

 // Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function readTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} MIN READ`;
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="container-page pt-32 md:pt-40 pb-16">
      <div className="eyebrow mb-4">Blog</div>
      <h1 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05] mb-6">
        Notes from the desk.
      </h1>
      <p className="text-ink/60 max-w-xl text-lg leading-relaxed mb-14">
        Articles, tips, case studies and industry updates — updated on an
        ongoing basis as we ship new work.
      </p>

      {posts.length === 0 ? (
        <p className="text-ink/50">No posts published yet — check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} href={`/blog/${post.slug}`}>
              <div className="order-2 md:order-1 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/45">
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>
                <h2 className="font-display text-2xl md:text-3xl leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="text-sm md:text-base text-ink/60 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="inline-flex w-fit items-center rounded-full bg-paperdim px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
                  {post.category}
                </span>
                <div className="mt-auto pt-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-ink/45">
                  <span>By The Social Buzz Team</span>
                  <span>{readTime(post.content || post.excerpt)}</span>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <BlogCardMedia
                  src={post.media_url}
                  alt={post.title}
                  mediaType={post.media_type}
                />
              </div>
            </BlogCard>
          ))}
        </div>
      )}
    </section>
  );
}