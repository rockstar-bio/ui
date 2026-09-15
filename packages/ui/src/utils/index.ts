export function getCountryFlagUrl(
  countryCode: string,
  size: "16" | "24" | "32" | "48" | "64" | "128" = "24"
): string {
  if (!countryCode) return ""
  return `https://flagcdn.com/${size}x${Math.floor(Number(size) * 0.75)}/${countryCode.toLowerCase()}.png`
}
