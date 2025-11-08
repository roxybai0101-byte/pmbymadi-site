"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "pm-by-madi-cookie-consent";

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(CONSENT_KEY) : null;
    if (!stored) {
      setOpen(true);
    } else {
      try {
        const parsed = JSON.parse(stored);
        setConsent(parsed);
      } catch {
        setOpen(true);
      }
    }
  }, []);

  const persist = (value: ConsentState) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  };

  const acceptAll = () => {
    const next = { analytics: true, marketing: true };
    setConsent(next);
    persist(next);
    setOpen(false);
  };

  const acceptSelected = () => {
    persist(consent);
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-2xl -translate-x-1/2 rounded-3xl border border-brand-cocoa/20 bg-white/95 p-6 shadow-soft backdrop-blur">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-serif text-brand-chocolate">Мы заботимся о приватности</h3>
          <p className="mt-2 text-sm text-brand-cocoa/80">
            Мы используем cookies для корректной работы сайта и аналитики. Подробнее в{" "}
            <Link href="/ru/privacy" className="underline decoration-brand-gold decoration-2">
              политике конфиденциальности
            </Link>
            .
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-center justify-between rounded-2xl border border-brand-cocoa/20 bg-brand-powder/40 px-4 py-3">
            <span className="font-medium text-brand-chocolate/90">Аналитика</span>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(event) => setConsent((prev) => ({ ...prev, analytics: event.target.checked }))}
              className="h-5 w-5 accent-brand-gold"
            />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-brand-cocoa/20 bg-brand-powder/40 px-4 py-3">
            <span className="font-medium text-brand-chocolate/90">Маркетинг</span>
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(event) => setConsent((prev) => ({ ...prev, marketing: event.target.checked }))}
              className="h-5 w-5 accent-brand-gold"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={acceptSelected}
            className="rounded-3xl border border-brand-cocoa/30 px-5 py-2 text-sm font-medium text-brand-chocolate transition hover:bg-brand-powder"
          >
            Сохранить выбор
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-3xl bg-brand-cocoa px-6 py-2 text-sm font-medium text-white shadow-soft transition hover:bg-brand-chocolate"
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}
