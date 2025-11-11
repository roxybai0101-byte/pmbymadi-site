import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { idSchema, promoSchema } from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

const createSchema = promoSchema.omit({ id: true });
const updateSchema = promoSchema.extend({ id: idSchema });

function normalize(value?: string | null) {
  if (!value || value.trim().length === 0) return null;
  return value.trim();
}

function parseDate(value?: string | null) {
  if (!value || value.trim() === "") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function revalidate() {
  revalidatePath("/promos");
  revalidatePath("/");
  revalidatePath("/admin/promos");
}

export async function createPromo(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось добавить акцию", parsed.error.flatten().fieldErrors);
  }

  const { title, description, details, imageUrl, isActive, startsAt, endsAt } = parsed.data;

  await prisma.promo.create({
    data: {
      title,
      description: normalize(description),
      details: normalize(details),
      imageUrl: normalize(imageUrl),
      isActive: isActive ?? true,
      startsAt: parseDate(startsAt),
      endsAt: parseDate(endsAt)
    }
  });

  revalidate();

  return actionSuccess("Акция добавлена");
}

export async function updatePromo(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить акцию", parsed.error.flatten().fieldErrors);
  }

  const { id, title, description, details, imageUrl, isActive, startsAt, endsAt } = parsed.data;

  await prisma.promo.update({
    where: { id },
    data: {
      title,
      description: normalize(description),
      details: normalize(details),
      imageUrl: normalize(imageUrl),
      isActive: isActive ?? true,
      startsAt: parseDate(startsAt),
      endsAt: parseDate(endsAt)
    }
  });

  revalidate();

  return actionSuccess("Акция обновлена");
}

export async function deletePromo(formData: FormData): Promise<ActionState> {
  "use server";

  const promoId = formData.get("promoId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(promoId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор");
  }

  await prisma.promo.delete({
    where: { id: parsedId.data }
  });

  revalidate();

  return actionSuccess("Акция удалена");
}
