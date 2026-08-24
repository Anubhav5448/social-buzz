import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { isAdminRequest } from "@/lib/requireAdmin";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB
const MAX_VIDEO_BYTES = 80 * 1024 * 1024; // 80MB
const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
    }

    const isImage = ALLOWED_IMAGE.includes(file.type);
    const isVideo = ALLOWED_VIDEO.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload a JPG/PNG/WEBP/GIF image or an MP4/WEBM/MOV video." },
        { status: 400 }
      );
    }

    const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: `File is too large. Max size is ${Math.round(maxBytes / (1024 * 1024))}MB.` },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || (isImage ? ".jpg" : ".mp4");
    const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), bytes);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      media_type: isImage ? "image" : "video",
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
