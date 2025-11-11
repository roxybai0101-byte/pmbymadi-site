import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  bookingSubmissionSchema,
  idSchema,
  questionSubmissionSchema,
  submissionStatusSchema
} from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

function revalidate() {
  revalidatePath("/admin/submissions");
}

export async function submitBooking(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = bookingSubmissionSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Заполните поля корректно", parsed.error.flatten().fieldErrors);
  }

  const { name, contact, serviceId, comment } = parsed.data;

  await prisma.submission.create({
    data: {
      type: "BOOKING",
      name,
      contact,
      message: comment && comment !== "" ? comment : null,
      serviceId: serviceId && serviceId !== "" ? serviceId : null
    }
  });

  revalidate();

  return actionSuccess("Заявка отправлена");
}

export async function submitQuestion(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = questionSubmissionSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Заполните поля корректно", parsed.error.flatten().fieldErrors);
  }

  const { name, contact, message } = parsed.data;

  await prisma.submission.create({
    data: {
      type: "QUESTION",
      name,
      contact,
      message
    }
  });

  revalidate();

  return actionSuccess("Вопрос отправлен");
}

export async function updateSubmissionStatus(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = submissionStatusSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Некорректный статус", parsed.error.flatten().fieldErrors);
  }

  const { id, status } = parsed.data;

  await prisma.submission.update({
    where: { id },
    data: { status }
  });

  revalidate();

  return actionSuccess("Статус обновлён");
}

export async function deleteSubmission(formData: FormData): Promise<ActionState> {
  "use server";

  const submissionId = formData.get("submissionId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(submissionId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор");
  }

  await prisma.submission.delete({
    where: { id: parsedId.data }
  });

  revalidate();

  return actionSuccess("Заявка удалена");
}
