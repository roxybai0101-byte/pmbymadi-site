import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { idSchema, pageSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

const createSchema = pageSchema.omit({ id: true });
const updateSchema = pageSchema.extend({ id: idSchema });

function normalize(value?: string | null) {
  if (!value || value.trim().length === 0) return null;
  return value.trim();
}

function revalidate(slug: string) {
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/pages");
  if (slug === "policy" || slug === "oferta" || slug === "faq" || slug === "master") {
    revalidatePath("/");
  }
}

export async function createPage(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось создать страницу", parsed.error.flatten().fieldErrors);
  }

  const { slug, title, description, content, metaTitle, metaDescription } = parsed.data;
  const finalSlug = slug && slug.length > 0 ? slug : slugify(title);

  await prisma.page.create({
    data: {
      slug: finalSlug,
      title,
      description: normalize(description),
      content,
      metaTitle: normalize(metaTitle),
      metaDescription: normalize(metaDescription)
    }
  });

  revalidate(finalSlug);

  return actionSuccess("Страница создана");
}

export async function updatePage(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить страницу", parsed.error.flatten().fieldErrors);
  }

  const { id, slug, title, description, content, metaTitle, metaDescription } = parsed.data;

  const existing = await prisma.page.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) {
    return actionError("Страница не найдена");
  }

  const finalSlug = slug && slug.length > 0 ? slug : slugify(title);

  await prisma.page.update({
    where: { id },
    data: {
      slug: finalSlug,
      title,
      description: normalize(description),
      content,
      metaTitle: normalize(metaTitle),
      metaDescription: normalize(metaDescription)
    }
  });

  revalidate(existing.slug);
  if (existing.slug !== finalSlug) {
    revalidate(finalSlug);
  }

  return actionSuccess("Страница обновлена");
}

export async function deletePage(formData: FormData): Promise<ActionState> {
  "use server";

  const pageId = formData.get("pageId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(pageId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор");
  }

  const page = await prisma.page.delete({
    where: { id: parsedId.data },
    select: { slug: true }
  });

  revalidate(page.slug);

  return actionSuccess("Страница удалена");
}
