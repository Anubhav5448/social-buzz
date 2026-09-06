import type { Metadata } from "next";
import Link from "next/link";
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
    <>
      {/* BLOG HERO */}
      <section className="hero-band py-24 md:py-28 text-center">
        <div className="relative z-10 container-page">
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.15] text-ink max-w-3xl mx-auto">
            Our <span className="text-signal">Blog</span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-2 font-mono text-sm text-ink/50">
            <Link href="/" className="hover:text-signal transition-colors">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-ink font-medium">Blog</span>
          </div>
        </div>
      </section>

      {/* BLOG TILES */}
      <section className="container-page pb-20">
      {posts.length === 0 ? (
        <p className="text-ink/50">No posts published yet — check back soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} href={`/blog/${post.slug}`}>
              <div className="flex flex-col h-full">
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

              <div>
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
    </>
  );
}