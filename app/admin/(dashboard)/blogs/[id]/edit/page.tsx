import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blogPosts";
import BlogPostForm from "@/components/admin/BlogPostForm";

 // Always render at request time — avoids Next trying to prerender at
// Docker build time, when no real DATABASE_URL is available yet.
export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(Number(params.id));
  if (!post) notFound();

  return (
    <div>
      <div className="eyebrow mb-2">Content</div>
      <h1 className="font-display text-3xl mb-10">Edit Blog Post</h1>
      <BlogPostForm post={post} />
    </div>
  );
}
