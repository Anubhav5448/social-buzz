import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/requireAdmin";
import { getAllProjects, createProject, type ProjectInput } from "@/lib/projects";

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const projects = await getAllProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
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

    const project = await createProject(input);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json({ error: "Could not create the project." }, { status: 500 });
  }
}
