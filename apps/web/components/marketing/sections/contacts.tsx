"use client";

import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";

import { Button, Input, Label, SectionDescription, SectionHeading, Textarea } from "@pmby/ui";
import { buildWhatsappUrl } from "../../../lib/utils";

const LeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  serviceId: z.string().optional(),
  comment: z.string().max(400).optional()
});

type LeadFormValues = z.infer<typeof LeadSchema>;

interface ContactSectionProps {
  locale: string;
  title: string;
  subtitle: string;
  labels: {
    name: string;
    phone: string;
    service: string;
    comment: string;
    submit: string;
    success: string;
    error: string;
  };
  services: Array<{ id: string; title: string }>;
  whatsappPhone?: string | null;
  telegramUrl?: string | null;
  instagramUrl?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  workingHours?: string | null;
}

export function ContactSection({
  locale,
  title,
  subtitle,
  labels,
  services,
  whatsappPhone,
  telegramUrl,
  instagramUrl,
  address,
  mapUrl,
  workingHours
}: ContactSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const tBooking = useTranslations("booking");
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(LeadSchema),
    defaultValues: { name: "", phone: "", comment: "" }
  });

  const whatsappLinkBase = buildWhatsappUrl(
    whatsappPhone ?? process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "+48000000000"
  );

  const onSubmit = async (values: LeadFormValues) => {
    if (!whatsappLinkBase) {
      toast.error(labels.error);
      return;
    }
    setSubmitting(true);
    const selectedService = services.find((s) => s.id === values.serviceId)?.title ?? "";
    const messageLines = [
      locale === "ru" ? "Здравствуйте! Хочу записаться в PM BY MADI." : "Hello! I would like to book at PM BY MADI.",
      `Имя: ${values.name}`,
      `Телефон: ${values.phone}`,
      selectedService ? `Услуга: ${selectedService}` : null,
      values.comment ? `Комментарий: ${values.comment}` : null
    ]
      .filter(Boolean)
      .join("\n");
    const whatsappLink = `${whatsappLinkBase}${whatsappLinkBase.includes("?") ? "&" : "?"}text=${encodeURIComponent(messageLines)}`;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale })
      });
      toast.success(labels.success);
      window.open(whatsappLink, "_blank");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(labels.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 rounded-[3rem] bg-white/80 p-10 shadow-soft">
          <SectionHeading accent="Contact">{title}</SectionHeading>
          <SectionDescription>{subtitle}</SectionDescription>
          <div className="space-y-4 text-sm text-brand-chocolate/80">
            {address ? (
              <p>
                <strong className="font-medium">{tBooking("title")}:</strong>{" "}
                {mapUrl ? (
                  <Link href={mapUrl} target="_blank" rel="noreferrer" className="underline hover:text-brand-chocolate">
                    {address}
                  </Link>
                ) : (
                  address
                )}
              </p>
            ) : null}
            {workingHours ? (
              <p>
                <strong className="font-medium">{tBooking("subtitle")}:</strong> {workingHours}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3 text-sm">
              {whatsappLinkBase ? (
                <Button asChild variant="soft" size="sm">
                  <a href={whatsappLinkBase} target="_blank" rel="noreferrer">
                    {tBooking("whatsapp")}
                  </a>
                </Button>
              ) : null}
              {telegramUrl ? (
                <Button asChild variant="outline" size="sm">
                  <a href={telegramUrl} target="_blank" rel="noreferrer">
                    {tBooking("telegram")}
                  </a>
                </Button>
              ) : null}
              {instagramUrl ? (
                <Button asChild variant="outline" size="sm">
                  <a href={instagramUrl} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 rounded-[3rem] border border-brand-cocoa/10 bg-white/95 p-8 shadow-soft"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{labels.name}</Label>
            <Input id="name" {...form.register("name")} placeholder="Ваше имя" />
            {form.formState.errors.name ? (
              <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{labels.phone}</Label>
            <PhoneInput
              country="pl"
              value={form.watch("phone")}
              onChange={(value) => form.setValue("phone", `+${value}`)}
              inputProps={{
                name: "phone",
                required: true
              }}
              inputClass="!w-full !h-12 !rounded-3xl !border !border-brand-cocoa/20 !bg-white !px-5 !text-sm !text-brand-chocolate"
              buttonClass="!rounded-l-3xl !border-brand-cocoa/20"
            />
            {form.formState.errors.phone ? (
              <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceId">{labels.service}</Label>
            <select
              id="serviceId"
              {...form.register("serviceId")}
              className="h-12 w-full rounded-3xl border border-brand-cocoa/20 bg-white px-5 text-sm text-brand-chocolate focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            >
              <option value="">{locale === "ru" ? "Выберите услугу" : "Select a service"}</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">{labels.comment}</Label>
            <Textarea id="comment" rows={4} {...form.register("comment")} placeholder="Пожелания или вопрос" />
          </div>

          <Button type="submit" size="lg" disabled={submitting} className="w-full">
            {submitting ? "..." : labels.submit}
          </Button>
        </form>
      </div>
    </section>
  );
}
