import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { idSchema, postSchema } from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

const createSchema = postSchema.omit({ id: true });
const updateSchema = postSchema.extend({ id: idSchema });

function normalize(value?: string | null) {
  if (!value || value.trim().length === 0) return null;
  return value.trim();
}

function parseDate(value?: string | null) {
  if (!value || value.trim() === "") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function revalidate(slugs: string[]) {
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  slugs.forEach((slug) => {
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
  });
}

export async function createPost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось создать запись блога", parsed.error.flatten().fieldErrors);
  }

  const { title, slug, excerpt, content, coverId, publishedAt } = parsed.data;
  const finalSlug = slug && slug.length > 0 ? slug : slugify(title);

  await prisma.post.create({
    data: {
      title,
      slug: finalSlug,
      excerpt: normalize(excerpt),
      content,
      coverId: coverId && coverId !== "" ? coverId : null,
      publishedAt: parseDate(publishedAt)
    }
  });

  revalidate([finalSlug]);

  return actionSuccess("Пост добавлен");
}

export async function updatePost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить пост", parsed.error.flatten().fieldErrors);
  }

  const { id, title, slug, excerpt, content, coverId, publishedAt } = parsed.data;

  const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) {
    return actionError("Пост не найден");
  }

  const finalSlug = slug && slug.length > 0 ? slug : slugify(title);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug: finalSlug,
      excerpt: normalize(excerpt),
      content,
      coverId: coverId && coverId !== "" ? coverId : null,
      publishedAt: parseDate(publishedAt)
    }
  });

  revalidate([existing.slug, finalSlug]);

  return actionSuccess("Пост обновлён");
}

export async function deletePost(formData: FormData): Promise<ActionState> {
  "use server";

  const postId = formData.get("postId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(postId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор");
  }

  const post = await prisma.post.delete({
    where: { id: parsedId.data },
    select: { slug: true }
  });

  revalidate([post.slug]);

  return actionSuccess("Пост удалён");
}
