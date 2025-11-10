"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

const deleteMediaSchema = z.object({
  id: z.string().min(1),
  url: z.string().min(1)
});

export async function deleteMediaAction(formData: FormData) {
  const parsed = deleteMediaSchema.safeParse({
    id: formData.get("id"),
    url: formData.get("url")
  });

  if (!parsed.success) {
    throw new Error("Не удалось удалить медиафайл");
  }

  const { id, url } = parsed.data;

  await prisma.media.delete({
    where: { id }
  });

  const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""));

  try {
    await fs.unlink(filePath);
  } catch (error) {
    // ignore if file already removed
  }

  revalidatePath("/admin/media");
  revalidatePath("/portfolio");
}
