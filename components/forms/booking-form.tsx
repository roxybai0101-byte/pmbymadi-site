"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitBooking, submitQuestion } from "@/actions/submissions";
import { initialActionState } from "@/actions/shared";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface BookingFormProps {
  services: { id: string; title: string; slug?: string }[];
  defaultServiceId?: string;
}

export function BookingForm({ services, defaultServiceId }: BookingFormProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitBooking, initialActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        variant: "success",
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами, чтобы согласовать дату и подготовку."
      });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Не удалось отправить заявку",
        description: state.message ?? "Повторите попытку или напишите в мессенджер."
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input id="name" name="name" required placeholder="Как к вам обращаться" />
        {state.errors?.name ? <ErrorText>{state.errors.name.join(", ")}</ErrorText> : null}
      </div>
      <div>
        <Label htmlFor="contact">Контакт</Label>
        <Input id="contact" name="contact" required placeholder="Телефон или WhatsApp" />
        {state.errors?.contact ? <ErrorText>{state.errors.contact.join(", ")}</ErrorText> : null}
      </div>
      <div>
        <Label htmlFor="serviceId">Услуга</Label>
        <select
          id="serviceId"
          name="serviceId"
          defaultValue={defaultServiceId ?? ""}
          className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Подберите со мной</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea id="comment" name="comment" placeholder="Уточните пожелания или удобное время" rows={4} />
      </div>
      <SubmitButton>Отправить заявку</SubmitButton>
    </form>
  );
}

export function QuestionForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitQuestion, initialActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        variant: "success",
        title: "Вопрос отправлен",
        description: "Ответим в ближайшее время и подскажем детали."
      });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Не удалось отправить вопрос",
        description: state.message ?? "Попробуйте ещё раз или напишите в мессенджер."
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
      <div>
        <Label htmlFor="q-name">Имя</Label>
        <Input id="q-name" name="name" required placeholder="Ваше имя" />
        {state.errors?.name ? <ErrorText>{state.errors.name.join(", ")}</ErrorText> : null}
      </div>
      <div>
        <Label htmlFor="q-contact">Контакт</Label>
        <Input id="q-contact" name="contact" required placeholder="Телефон, WhatsApp или Telegram" />
        {state.errors?.contact ? <ErrorText>{state.errors.contact.join(", ")}</ErrorText> : null}
      </div>
      <div>
        <Label htmlFor="q-message">Ваш вопрос</Label>
        <Textarea id="q-message" name="message" required rows={4} placeholder="Опишите, что хотите уточнить" />
        {state.errors?.message ? <ErrorText>{state.errors.message.join(", ")}</ErrorText> : null}
      </div>
      <SubmitButton>Задать вопрос</SubmitButton>
    </form>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full rounded-xl">
      {pending ? "Отправляем..." : children}
    </Button>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-destructive">{children}</p>;
}
