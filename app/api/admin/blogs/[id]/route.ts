import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/requireAdmin";
import {
  getPostById,
  updatePost,
  deletePost,
  slugExists,
  type BlogPostInput,
} from "@/lib/blogPosts";
import { slugify } from "@/lib/slug";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const post = await getPostById(Number(params.id));
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    const existing = await getPostById(id);
    if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const body = await req.json();
    if (!body.title || !String(body.title).trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    let slug = slugify(body.slug?.trim() || body.title);
    if (!slug) {
      return NextResponse.json({ error: "Could not generate a valid slug from the title." }, { status: 400 });
    }
    let candidate = slug;
    let suffix = 2;
    while (await slugExists(candidate, id)) {
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

    const post = await updatePost(id, input);
    return NextResponse.json({ post });
  } catch (err) {
    console.error("Update post error:", err);
    return NextResponse.json({ error: "Could not update the post." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const ok = await deletePost(Number(params.id));
  if (!ok) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
