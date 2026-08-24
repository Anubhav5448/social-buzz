import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/requireAdmin";
import { getProjectById, updateProject, deleteProject, type ProjectInput } from "@/lib/projects";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const project = await getProjectById(Number(params.id));
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    const existing = await getProjectById(id);
    if (!existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    const body = await req.json();
    if (!body.client_name || !String(body.client_name).trim()) {
      return NextResponse.json({ error: "Client / project name is required." }, { status: 400 });
    }

    const input: ProjectInput = {
      client_name: String(body.client_name).trim(),
      project_type: String(body.project_type || "").trim(),
      metric: String(body.metric || "").trim(),
      description: String(body.description || "").trim(),
      media_url: body.media_url || null,
      media_type: body.media_type === "video" ? "video" : "image",
      featured: body.featured !== false,
      sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0,
    };

    const project = await updateProject(id, input);
    return NextResponse.json({ project });
  } catch (err) {
    console.error("Update project error:", err);
    return NextResponse.json({ error: "Could not update the project." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const ok = await deleteProject(Number(params.id));
  if (!ok) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
