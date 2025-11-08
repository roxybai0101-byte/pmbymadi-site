 "use client";

import { createContext, useContext, type ReactNode } from "react";
import { Toaster } from "sonner";

interface MarketingProvidersProps {
  children: ReactNode;
  locale: string;
}

const LocaleContext = createContext<string>("ru");

export function useClientLocale() {
  return useContext(LocaleContext);
}

export function MarketingProviders({ children, locale }: MarketingProvidersProps) {
  return (
    <LocaleContext.Provider value={locale}>
      {children}
      <Toaster position="top-right" richColors theme="light" />
    </LocaleContext.Provider>
  );
}
