export function buildWhatsAppUrl(baseLink: string, message: string) {
  const encodedMessage = encodeURIComponent(message.trim());

  if (!baseLink.includes("?")) {
    return `${baseLink}?text=${encodedMessage}`;
  }

  const separator = baseLink.endsWith("&") || baseLink.endsWith("?") ? "" : "&";
  return `${baseLink}${separator}text=${encodedMessage}`;
}
