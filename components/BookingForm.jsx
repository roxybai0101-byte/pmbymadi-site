'use client';

import { useMemo, useState } from "react";
import services from "@/data/services.json";
import site from "@/data/site.json";
import Button from "./Button";
import { cn } from "@/lib/utils";

const initialState = {
  name: "",
  phone: "",
  service: services[0]?.title ?? ""
};

function getWhatsappNumber(urlString) {
  try {
    const url = new URL(urlString);
    return url.pathname.replace(/\//g, "") || url.searchParams.get("phone") || "";
  } catch (error) {
    return urlString.replace(/\D/g, "");
  }
}

export default function BookingForm() {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState({ type: null, message: "" });

  const whatsappNumber = useMemo(() => getWhatsappNumber(site.whatsapp), []);

  const handleChange = (field) => (event) => {
    setStatus({ type: null, message: "" });
    setFormState((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      setStatus({ type: "error", message: "Пожалуйста, заполните имя и телефон." });
      return;
    }

    const message = `Здравствуйте, Мади! Меня зовут ${formState.name.trim()}. Хочу записаться на услугу «${formState.service}». Мой телефон: ${formState.phone.trim()}.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setStatus({ type: "success", message: "Мы открыли диалог в WhatsApp. Если окно не открылось — проверьте всплывающие окна." });
    setFormState(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 rounded-[32px] border-white/70 bg-white/80 p-8 shadow-soft">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-ink/70">
          Имя *
          <input
            type="text"
            name="name"
            placeholder="Как к вам обращаться"
            value={formState.name}
            onChange={handleChange("name")}
            required
            className="rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-base text-ink outline-none transition-shadow focus:border-sand-400 focus:shadow-[0_8px_30px_rgba(201,165,129,0.15)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink/70">
          Номер телефона *
          <input
            type="tel"
            name="phone"
            placeholder="+7 (___) ___-__-__"
            value={formState.phone}
            onChange={handleChange("phone")}
            required
            className="rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-base text-ink outline-none transition-shadow focus:border-sand-400 focus:shadow-[0_8px_30px_rgba(201,165,129,0.15)]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-ink/70">
        Выберите услугу
        <select
          name="service"
          value={formState.service}
          onChange={handleChange("service")}
          className="rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-base text-ink outline-none transition-shadow focus:border-sand-400 focus:shadow-[0_8px_30px_rgba(201,165,129,0.15)]"
        >
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </label>

      <p className="text-sm leading-relaxed text-ink/50">
        Нажимая кнопку, вы перейдёте в диалог WhatsApp и сможете обсудить удобное время и детали процедуры.
      </p>

      {status.message && (
        <p
          className={cn(
            "rounded-2xl px-4 py-3 text-sm",
            status.type === "error"
              ? "bg-red-50 text-red-600"
              : "bg-sand-100/60 text-sand-700"
          )}
        >
          {status.message}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" className="mt-2">
        Отправить в WhatsApp
      </Button>
    </form>
  );
}
