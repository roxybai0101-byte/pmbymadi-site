import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title")?.toString() ?? null;
    const alt = formData.get("alt")?.toString() ?? null;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Файл не найден." }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Поддерживаются только изображения (jpeg, png, webp)." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Файл превышает 5MB." }, { status: 400 });
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const uploadsDir = path.join(process.cwd(), "public", "uploads", `${year}`, month);
    await mkdir(uploadsDir, { recursive: true });

    const fileExtension = path.extname(file.name) || ".png";
    const fileName = `${now.getTime()}-${Math.random().toString(16).slice(2)}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${year}/${month}/${fileName}`;

    const media = await prisma.media.create({
      data: {
        title,
        alt,
        url: relativeUrl,
        size: file.size,
        mimeType: file.type
      }
    });

    return NextResponse.json({ url: relativeUrl, media }, { status: 201 });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "Не удалось загрузить файл, попробуйте еще раз." },
      { status: 500 }
    );
  }
}
