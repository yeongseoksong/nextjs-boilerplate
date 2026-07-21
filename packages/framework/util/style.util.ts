export function toCssColor(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.includes(".")
    ? `var(--mantine-color-${value.replace(".", "-")})`
    : value;
}