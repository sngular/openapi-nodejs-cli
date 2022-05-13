export function toPascalCase(string: string): string {
  return string
    .replace(
      /([a-zA-Z0-9+])*/g,
      (m) => m.charAt(0).toUpperCase() + m.substring(1).toLowerCase()
    )
    .replace(/[^a-zA-Z0-9]/g, "");
}
