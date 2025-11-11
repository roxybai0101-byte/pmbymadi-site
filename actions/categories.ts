import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { categorySchema, idSchema } from "@/lib/validators";
import { actionError, actionSuccess, initialActionState, type ActionState } from "@/actions/shared";
import { revalidatePath } from "next/cache";

const createSchema = categorySchema.omit({ id: true });
const updateSchema = categorySchema.extend({ id: idSchema });

export async function createCategory(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Проверьте корректность данных", parsed.error.flatten().fieldErrors);
  }

  const { name, description, order, slug } = parsed.data;
  const finalSlug = slug && slug.length > 0 ? slug : slugify(name);

  await prisma.serviceCategory.create({
    data: {
      name,
      description: description ? description : null,
      order: order ?? 0,
      slug: finalSlug
    }
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");

  return actionSuccess("Категория добавлена");
}

export async function updateCategory(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось сохранить категорию", parsed.error.flatten().fieldErrors);
  }

  const { id, name, description, order, slug } = parsed.data;
  const finalSlug = slug && slug.length > 0 ? slug : slugify(name);

  await prisma.serviceCategory.update({
    where: { id },
    data: {
      name,
      description: description ? description : null,
      order: order ?? 0,
      slug: finalSlug
    }
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");

  return actionSuccess("Категория обновлена");
}

export async function deleteCategory(formData: FormData): Promise<ActionState> {
  "use server";

  const categoryId = formData.get("categoryId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(categoryId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор категории");
  }

  await prisma.serviceCategory.delete({
    where: { id: parsedId.data }
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");

  return actionSuccess("Категория удалена");
}

export { initialActionState };
