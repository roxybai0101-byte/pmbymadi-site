import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { idSchema } from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";
import { revalidatePath } from "next/cache";

export async function deleteMedia(formData: FormData): Promise<ActionState> {
  "use server";

  const mediaId = formData.get("mediaId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(mediaId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор файла");
  }

  const media = await prisma.media.delete({
    where: { id: parsedId.data }
  });

  if (media.url) {
    const relativePath = media.url.startsWith("/") ? media.url.slice(1) : media.url;
    const filePath = path.join(process.cwd(), "public", relativePath);
    try {
      await unlink(filePath);
    } catch (error) {
      console.warn("Не удалось удалить файл с диска", error);
    }
  }

  revalidatePath("/admin/media");

  return actionSuccess("Файл удалён");
}
