export function cn(...values) {
  return values
    .flatMap((value) => {
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return value;
      if (value && typeof value === "object") {
        return Object.entries(value)
          .filter(([, condition]) => Boolean(condition))
          .map(([className]) => className);
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
