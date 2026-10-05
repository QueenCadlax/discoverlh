const configuredSiteUrl =
  import.meta.env.VITE_PUBLIC_SITE_URL?.trim() || "https://discover.lowveldhub.co.za";

export function getPublicUrl(path: string): string | undefined {
  if (!configuredSiteUrl) return undefined;
  try {
    return new URL(path, configuredSiteUrl).toString();
  } catch {
    return undefined;
  }
}
