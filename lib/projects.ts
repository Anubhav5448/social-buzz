import { pool } from "@/lib/db";
import type { MediaType } from "@/lib/blogPosts";

export type Project = {
  id: number;
  client_name: string;
  project_type: string;
  metric: string;
  description: string;
  media_url: string | null;
  media_type: MediaType;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = {
  client_name: string;
  project_type: string;
  metric: string;
  description: string;
  media_url: string | null;
  media_type: MediaType;
  featured: boolean;
  sort_order: number;
};

// ---- Public reads ----

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const { rows } = await pool.query(
    `SELECT * FROM projects WHERE featured = TRUE ORDER BY sort_order ASC, created_at DESC LIMIT $1`,
    [limit]
  );
  return rows;
}

// ---- Admin reads/writes ----

export async function getAllProjects(): Promise<Project[]> {
  const { rows } = await pool.query(`SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC`);
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await pool.query(`SELECT * FROM projects WHERE id = $1`, [id]);
  return rows[0] ?? null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const { rows } = await pool.query(
    `INSERT INTO projects (client_name, project_type, metric, description, media_url, media_type, featured, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      input.client_name,
      input.project_type,
      input.metric,
      input.description,
      input.media_url,
      input.media_type,
      input.featured,
      input.sort_order,
    ]
  );
  return rows[0];
}

export async function updateProject(id: number, input: ProjectInput): Promise<Project | null> {
  const { rows } = await pool.query(
    `UPDATE projects
     SET client_name=$1, project_type=$2, metric=$3, description=$4, media_url=$5, media_type=$6, featured=$7, sort_order=$8
     WHERE id=$9 RETURNING *`,
    [
      input.client_name,
      input.project_type,
      input.metric,
      input.description,
      input.media_url,
      input.media_type,
      input.featured,
      input.sort_order,
      id,
    ]
  );
  return rows[0] ?? null;
}

export async function deleteProject(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM projects WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
