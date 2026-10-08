const productionSiteUrl = "https://discover.lowveldhub.co.za";
const productionHostname = new URL(productionSiteUrl).hostname;
const configuredSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL?.trim();

function getCanonicalOrigin() {
  if (!configuredSiteUrl) return productionSiteUrl;
  try {
    const configuredUrl = new URL(configuredSiteUrl);
    if (
      configuredUrl.protocol === "https:" &&
      configuredUrl.hostname.toLocaleLowerCase() === productionHostname
    ) {
      return configuredUrl.origin;
    }
    return productionSiteUrl;
  } catch {
    return productionSiteUrl;
  }
}

export function getPublicUrl(path: string): string | undefined {
  return new URL(path, getCanonicalOrigin()).toString();
}
