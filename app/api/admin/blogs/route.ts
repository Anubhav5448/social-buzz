import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/requireAdmin";
import { getAllPosts, createPost, slugExists, type BlogPostInput } from "@/lib/blogPosts";
import { slugify } from "@/lib/slug";

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title || !String(body.title).trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    let slug = slugify(body.slug?.trim() || body.title);
    if (!slug) {
      return NextResponse.json({ error: "Could not generate a valid slug from the title." }, { status: 400 });
    }
    // Ensure uniqueness by suffixing if needed.
    let candidate = slug;
    let suffix = 2;
    while (await slugExists(candidate)) {
      candidate = `${slug}-${suffix++}`;
    }
    slug = candidate;

    const input: BlogPostInput = {
      title: String(body.title).trim(),
      slug,
      category: String(body.category || "Digital Marketing").trim(),
      excerpt: String(body.excerpt || "").trim(),
      content: String(body.content || "").trim(),
      media_url: body.media_url || null,
      media_type: body.media_type === "video" ? "video" : "image",
      published: body.published !== false,
    };

    const post = await createPost(input);
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("Create post error:", err);
    return NextResponse.json({ error: "Could not create the post." }, { status: 500 });
  }
}
