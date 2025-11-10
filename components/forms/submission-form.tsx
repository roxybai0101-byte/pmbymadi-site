"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const submissionSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  contact: z.string().min(3, "Оставьте телефон или мессенджер"),
  service: z.string().optional(),
  message: z.string().optional()
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

type SubmissionFormProps = {
  type: "BOOKING" | "QUESTION";
  title: string;
  description?: string;
  submitLabel?: string;
  servicePlaceholder?: string;
  compact?: boolean;
};

export function SubmissionForm({
  type,
  title,
  description,
  submitLabel = "Отправить",
  servicePlaceholder = "Желаемая услуга",
  compact = false
}: SubmissionFormProps) {
  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: "",
      contact: "",
      service: "",
      message: ""
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: SubmissionFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...values, type })
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить заявку");
      }

      form.reset();
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Произошла ошибка. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-border/60 bg-card/70 p-6">
      <div>
        <h3 className="font-serif text-2xl text-foreground">{title}</h3>
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Как к вам обращаться" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Контакт</FormLabel>
                <FormControl>
                  <Input placeholder="Телефон или мессенджер" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type === "BOOKING" ? (
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Услуга</FormLabel>
                  <FormControl>
                    <Input placeholder={servicePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{type === "BOOKING" ? "Комментарий" : "Ваш вопрос"}</FormLabel>
                <FormControl>
                  <Textarea placeholder="Расскажите о пожеланиях или задайте вопрос" rows={compact ? 3 : 5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full md:w-auto" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Отправляем..." : submitLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
}
