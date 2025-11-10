import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";
import sharp from "sharp";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6 MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Не авторизовано" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Неверный формат файла" }, { status: 415 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Файл слишком большой (максимум 6 МБ)" }, { status: 413 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const timestamp = new Date();
  const year = timestamp.getFullYear().toString();
  const month = `${timestamp.getMonth() + 1}`.padStart(2, "0");
  const uploadsDir = path.join(process.cwd(), "public", "uploads", year, month);

  await fs.mkdir(uploadsDir, { recursive: true });

  const extension = path.extname(file.name) || `.${file.type.split("/")[1] ?? "jpg"}`;
  const filename = `${timestamp.getTime()}-${randomUUID()}${extension.toLowerCase()}`;
  const filepath = path.join(uploadsDir, filename);
  const url = `/uploads/${year}/${month}/${filename}`;

  await fs.writeFile(filepath, buffer);

  const metadata = await sharp(buffer).metadata();

  const media = await prisma.media.create({
    data: {
      filename,
      url,
      mimeType: file.type,
      size: file.size,
      width: metadata.width ?? null,
      height: metadata.height ?? null
    }
  });

  return NextResponse.json(
    {
      success: true,
      media
    },
    { status: 201 }
  );
}
