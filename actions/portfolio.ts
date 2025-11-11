import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { idSchema, portfolioSchema } from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

const createSchema = portfolioSchema.omit({ id: true });
const updateSchema = portfolioSchema.extend({ id: idSchema });

function normalize(value?: string | null) {
  if (!value || value.trim().length === 0) return null;
  return value.trim();
}

function revalidate(serviceSlug?: string | null) {
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  if (serviceSlug) {
    revalidatePath(`/services/${serviceSlug}`);
  }
}

export async function createPortfolioItem(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось добавить работу", parsed.error.flatten().fieldErrors);
  }

  const { title, description, imageId, serviceId, order } = parsed.data;

  const item = await prisma.portfolioItem.create({
    data: {
      title,
      description: normalize(description),
      imageId: imageId && imageId !== "" ? imageId : null,
      serviceId: serviceId && serviceId !== "" ? serviceId : null,
      order: order ?? 0
    },
    select: {
      id: true,
      service: { select: { slug: true } }
    }
  });

  revalidate(item.service?.slug);

  return actionSuccess("Работа добавлена");
}

export async function updatePortfolioItem(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить работу", parsed.error.flatten().fieldErrors);
  }

  const { id, title, description, imageId, serviceId, order } = parsed.data;

  const item = await prisma.portfolioItem.update({
    where: { id },
    data: {
      title,
      description: normalize(description),
      imageId: imageId && imageId !== "" ? imageId : null,
      serviceId: serviceId && serviceId !== "" ? serviceId : null,
      order: order ?? 0
    },
    select: {
      service: { select: { slug: true } }
    }
  });

  revalidate(item.service?.slug);

  return actionSuccess("Работа обновлена");
}

export async function deletePortfolioItem(formData: FormData): Promise<ActionState> {
  "use server";

  const portfolioId = formData.get("portfolioId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(portfolioId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор");
  }

  const item = await prisma.portfolioItem.delete({
    where: { id: parsedId.data },
    select: {
      service: { select: { slug: true } }
    }
  });

  revalidate(item.service?.slug);

  return actionSuccess("Работа удалена");
}
