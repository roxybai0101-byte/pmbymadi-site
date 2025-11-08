import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { Resend } from "resend";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  serviceId: z.string().optional(),
  comment: z.string().max(500).optional(),
  locale: z.string().default("ru")
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = leadSchema.parse(payload);

    const service = data.serviceId
      ? await prisma.service.findUnique({ where: { id: data.serviceId } })
      : null;

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        locale: data.locale,
        serviceName: service?.title
          ? (service.title as Record<string, string>)[data.locale as "ru" | "en"] ??
            (service.title as Record<string, string>).ru
          : null,
        comment: data.comment
      }
    });

    const settings = await prisma.settings.findUnique({ where: { id: 1 } });

    const messageLines = [
      `Новая заявка на сайте PM BY MADI`,
      `Имя: ${lead.name}`,
      `Телефон: ${lead.phone}`,
      lead.serviceName ? `Услуга: ${lead.serviceName}` : null,
      lead.comment ? `Комментарий: ${lead.comment}` : null,
      `Язык: ${lead.locale}`
    ]
      .filter(Boolean)
      .join("\n");

    if (resend && (settings?.emailNotifications ?? false)) {
      const to = settings?.contactEmail ?? process.env.ADMIN_EMAIL;
      if (to) {
        await resend.emails.send({
          from: settings?.resendFromEmail ?? "studio@pmbymadi.com",
          to,
          subject: "Новая заявка PM BY MADI",
          text: messageLines
        });
      }
    }

    if (settings?.telegramNotifications ?? false) {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = settings?.telegramAdminChatId ?? process.env.TELEGRAM_ADMIN_CHAT_ID;
      if (botToken && chatId) {
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: messageLines, parse_mode: "Markdown" })
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
