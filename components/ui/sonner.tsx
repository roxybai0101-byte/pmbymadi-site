import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "rounded-2xl border border-brand-warm/40 bg-brand-white/90 text-brand-chocolate shadow-ambient backdrop-blur-lg",
          title: "font-medium text-sm text-brand-chocolate",
          description: "text-sm text-brand-cocoa/80",
          actionButton:
            "rounded-full bg-brand-chocolate px-3 py-1 text-xs font-medium text-brand-white",
          cancelButton:
            "rounded-full border border-brand-cocoa/40 px-3 py-1 text-xs font-medium text-brand-chocolate"
        }
      }}
      {...props}
    />
  );
}
