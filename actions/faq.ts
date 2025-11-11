import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { faqSchema, idSchema } from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

const createSchema = faqSchema.omit({ id: true });
const updateSchema = faqSchema.extend({ id: idSchema });

function revalidate() {
  revalidatePath("/faq");
  revalidatePath("/admin/pages");
}

export async function createFaqItem(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось добавить вопрос", parsed.error.flatten().fieldErrors);
  }

  const { question, answer, order } = parsed.data;

  await prisma.faqItem.create({
    data: {
      question,
      answer,
      order: order ?? 0
    }
  });

  revalidate();

  return actionSuccess("FAQ добавлен");
}

export async function updateFaqItem(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить вопрос", parsed.error.flatten().fieldErrors);
  }

  const { id, question, answer, order } = parsed.data;

  await prisma.faqItem.update({
    where: { id },
    data: {
      question,
      answer,
      order: order ?? 0
    }
  });

  revalidate();

  return actionSuccess("FAQ обновлён");
}

export async function deleteFaqItem(formData: FormData): Promise<ActionState> {
  "use server";

  const faqId = formData.get("faqId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(faqId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор");
  }

  await prisma.faqItem.delete({
    where: { id: parsedId.data }
  });

  revalidate();

  return actionSuccess("FAQ удалён");
}
