export function formatPhone(phone: string | null | undefined) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

export function buildWhatsappUrl(phone: string | null | undefined, message?: string) {
  const sanitized = formatPhone(phone);
  if (!sanitized) return null;
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${sanitized.replace("+", "")}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
}

export function formatCurrency(amount: number | null | undefined, locale: string, currency = "EUR") {
  if (!amount) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  }).format(amount / 100);
}

export function fallback(value: string | null | undefined, fallbackValue: string) {
  return value && value.length > 0 ? value : fallbackValue;
}
