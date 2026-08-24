import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/blogPosts";

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) return { title: "Post not found — The Social Buzz" };
  return {
    title: `${post.title} — The Social Buzz`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="container-page py-16 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-paperdim px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            Blog / {post.category}
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl leading-tight text-center mb-10">
          {post.title}
        </h1>

        {post.media_url && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-line">
            {post.media_type === "video" ? (
              <video src={post.media_url} controls className="w-full" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.media_url} alt={post.title} className="w-full object-cover" />
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 mb-12 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/45">
          <span className="w-7 h-7 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xs normal-case">
            S
          </span>
          <span className="normal-case font-body text-sm text-ink/70">
            By The Social Buzz Team
          </span>
          <span>·</span>
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          <span>·</span>
          <span>{readTime(post.content || post.excerpt)}</span>
        </div>

        <Link
          href="/blog"
          className="inline-block mb-10 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 hover:text-signal transition-colors"
        >
          ← Back to blog
        </Link>

        <div className="text-lg text-ink/75 leading-relaxed whitespace-pre-wrap">
          {post.content || post.excerpt}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-rule">
          <div className="container-page py-16">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-paperdim px-4 py-1.5 mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                  Recent articles
                </div>
                <h2 className="font-display text-3xl md:text-4xl">
                  You might also like
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center rounded-full border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.08em] hover:border-ink/30 transition-colors"
              >
                View all articles
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/45 mb-3">
                    {formatDate(p.created_at)}
                  </div>
                  <h3 className="font-display text-xl leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink/60 leading-relaxed mb-4 line-clamp-2">
                    {p.excerpt}
                  </p>
                  <span className="inline-flex w-fit items-center rounded-full bg-paperdim px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/70 mb-5">
                    {p.category}
                  </span>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-paperdim">
                    {p.media_url && p.media_type !== "video" && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.media_url}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}