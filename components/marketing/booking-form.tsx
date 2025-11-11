"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Service } from "@prisma/client";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { BookingSchema } from "@/lib/validations/booking";
import { bookingSchema } from "@/lib/validations/booking";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

type BookingFormProps = {
  services: Service[];
  whatsappLink: string;
};

export function BookingForm({ services, whatsappLink }: BookingFormProps) {
  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceId: services[0]?.id ?? "",
      comment: ""
    }
  });

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        id: service.id,
        title: service.title
      })),
    [services]
  );

  const onSubmit = (values: BookingSchema) => {
    const serviceTitle =
      serviceOptions.find((service) => service.id === values.serviceId)?.title ?? "услугу";

    const message = `Здравствуйте! Меня зовут ${values.name}. Хочу записаться на ${serviceTitle}. Телефон: ${values.phone}.${values.comment ? ` Комментарий: ${values.comment}` : ""}`;
    const url = buildWhatsAppUrl(whatsappLink, message);

    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 rounded-[34px] border border-brand-warm/40 bg-white/90 p-8 shadow-soft md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Как к вам обращаться?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+7 700 000 00 00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Услуга</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceOptions.map((service) => (
                    <SelectItem value={service.id} key={service.id}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Комментарий (опционально)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите пожелания или уточните, если есть особенности здоровья"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <Button type="submit" size="lg" className="w-full md:w-auto">
            Отправить в WhatsApp
          </Button>
        </div>
      </form>
    </Form>
  );
}
