export function parseStringToBool(value: string): boolean {
  value = value.toLowerCase();
  return value === "true";
}
