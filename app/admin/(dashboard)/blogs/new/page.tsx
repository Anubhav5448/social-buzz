import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="eyebrow mb-2">Content</div>
      <h1 className="font-display text-3xl mb-10">New Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}
