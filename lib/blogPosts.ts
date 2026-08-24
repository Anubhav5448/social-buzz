import { pool } from "@/lib/db";

export type MediaType = "image" | "video";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  media_url: string | null;
  media_type: MediaType;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  media_url: string | null;
  media_type: MediaType;
  published: boolean;
};

// ---- Public reads ----

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { rows } = await pool.query(
    `SELECT * FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC`
  );
  return rows;
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const { rows } = await pool.query(
    `SELECT * FROM blog_posts WHERE slug = $1 AND published = TRUE LIMIT 1`,
    [slug]
  );
  return rows[0] ?? null;
}

// ---- Admin reads/writes ----

export async function getAllPosts(): Promise<BlogPost[]> {
  const { rows } = await pool.query(`SELECT * FROM blog_posts ORDER BY created_at DESC`);
  return rows;
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  const { rows } = await pool.query(`SELECT * FROM blog_posts WHERE id = $1`, [id]);
  return rows[0] ?? null;
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const { rows } = await pool.query(
    `INSERT INTO blog_posts (title, slug, category, excerpt, content, media_url, media_type, published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      input.title,
      input.slug,
      input.category,
      input.excerpt,
      input.content,
      input.media_url,
      input.media_type,
      input.published,
    ]
  );
  return rows[0];
}

export async function updatePost(id: number, input: BlogPostInput): Promise<BlogPost | null> {
  const { rows } = await pool.query(
    `UPDATE blog_posts
     SET title=$1, slug=$2, category=$3, excerpt=$4, content=$5, media_url=$6, media_type=$7, published=$8
     WHERE id=$9 RETURNING *`,
    [
      input.title,
      input.slug,
      input.category,
      input.excerpt,
      input.content,
      input.media_url,
      input.media_type,
      input.published,
      id,
    ]
  );
  return rows[0] ?? null;
}

export async function deletePost(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM blog_posts WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}

export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  const { rows } = await pool.query(
    excludeId
      ? `SELECT 1 FROM blog_posts WHERE slug = $1 AND id != $2`
      : `SELECT 1 FROM blog_posts WHERE slug = $1`,
    excludeId ? [slug, excludeId] : [slug]
  );
  return rows.length > 0;
}
