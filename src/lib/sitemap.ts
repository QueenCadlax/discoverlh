import {
  getCategoryListings,
  getBusinessSlug,
  getPublishedCategoryListings,
  getPublishedPropertyListings,
  isPublishedListing,
  primaryDiscoveryCategorySlugs,
  type CategorySlug,
} from "./category-discovery";
import { locationDiscovery, locationSlug } from "./location-discovery";
import { getPublicUrl } from "./site-url";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateSitemapXml() {
  const entries = getPublishedCategoryListings();
  const paths = new Set<string>();
  const homepage = getPublicUrl("/");
  if (homepage) paths.add(homepage);

  const sitemapCategories: CategorySlug[] = [
    ...primaryDiscoveryCategorySlugs,
    "accommodation",
    "food-dining",
  ];
  sitemapCategories.forEach((category) => {
    const url = getPublicUrl(`/categories/${category}`);
    if (url) paths.add(url);
  });

  ["/privacy-policy", "/terms-of-use", "/business-listing-terms"].forEach((path) => {
    const url = getPublicUrl(path);
    if (url) paths.add(url);
  });

  const hasPropertyBusinesses = getCategoryListings("property").some(
    (listing) => listing.listingKind === "business" && isPublishedListing(listing),
  );
  if (hasPropertyBusinesses) {
    const url = getPublicUrl("/categories/property?mode=businesses");
    if (url) paths.add(url);
  }

  const populatedLocations = new Set(
    entries.map(({ listing }) => listing.location?.trim().toLocaleLowerCase()).filter(Boolean),
  );
  locationDiscovery.forEach((location) => {
    if (!populatedLocations.has(location.name.toLocaleLowerCase())) return;
    const url = getPublicUrl(`/locations/${locationSlug(location.name)}`);
    if (url) paths.add(url);
  });

  entries.forEach(({ listing }) => {
    const path =
      listing.listingKind === "event"
        ? `/events/${getBusinessSlug(listing)}`
        : `/business/${getBusinessSlug(listing)}`;
    const url = getPublicUrl(path);
    if (url) paths.add(url);
  });

  getPublishedPropertyListings().forEach((listing) => {
    const url = getPublicUrl(`/properties/${getBusinessSlug(listing)}`);
    if (url) paths.add(url);
  });

  const urls = [...paths].map((url) => `<url><loc>${escapeXml(url)}</loc></url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}
