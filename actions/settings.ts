import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  brandingSettingsSchema,
  contactsSettingsSchema,
  heroSettingsSchema,
  hoursSettingsSchema,
  socialsSettingsSchema
} from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/contacts");
  revalidatePath("/admin/settings");
}

async function upsertSetting(key: string, value: unknown) {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });
}

export async function updateBrandingSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = brandingSettingsSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось сохранить брендинг", parsed.error.flatten().fieldErrors);
  }

  await upsertSetting("site.branding", parsed.data);
  revalidateAll();

  return actionSuccess("Брендинг обновлён");
}

export async function updateContactsSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = contactsSettingsSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить контакты", parsed.error.flatten().fieldErrors);
  }

  await upsertSetting("site.contacts", parsed.data);
  revalidateAll();

  return actionSuccess("Контакты обновлены");
}

export async function updateSocialsSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = socialsSettingsSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить соцсети", parsed.error.flatten().fieldErrors);
  }

  await upsertSetting("site.socials", parsed.data);
  revalidateAll();

  return actionSuccess("Соцсети обновлены");
}

export async function updateHoursSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = hoursSettingsSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить расписание", parsed.error.flatten().fieldErrors);
  }

  await upsertSetting("site.hours", parsed.data);
  revalidateAll();

  return actionSuccess("Расписание обновлено");
}

export async function updateHeroSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = heroSettingsSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить блок hero", parsed.error.flatten().fieldErrors);
  }

  await upsertSetting("site.hero", parsed.data);
  revalidateAll();

  return actionSuccess("Hero обновлён");
}
