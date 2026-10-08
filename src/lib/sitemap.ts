import {
  getCategoryListings,
  getCanonicalCategorySlug,
  getCategoryListingPath,
  getBusinessSlug,
  getPublishedCategoryListings,
  getPublishedPropertyListings,
  getPublishedListingsInLocation,
  isPublishedListing,
  type CategorySlug,
} from "./category-discovery";
import { locationDiscovery } from "./location-discovery";
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

  const sitemapCategories = new Set<CategorySlug>();
  entries.forEach(({ category }) => {
    sitemapCategories.add(getCanonicalCategorySlug(category));
  });
  [...sitemapCategories].forEach((category) => {
    if (!getCategoryListings(category).some(isPublishedListing)) return;
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

  locationDiscovery.forEach((location) => {
    const locationListings = getPublishedListingsInLocation(location.name);
    if (!locationListings.length) return;
    const basePath = `/locations/${location.slug}`;
    const locationUrl = getPublicUrl(basePath);
    if (locationUrl) paths.add(locationUrl);
    const locationCategories = new Set(
      locationListings.map(({ category }) => getCanonicalCategorySlug(category)),
    );
    locationCategories.forEach((category) => {
      const categoryUrl = getPublicUrl(`${basePath}?category=${encodeURIComponent(category)}`);
      if (categoryUrl) paths.add(categoryUrl);
    });
  });

  entries.forEach(({ category, listing }) => {
    const url = getPublicUrl(getCategoryListingPath(category, listing));
    if (url) paths.add(url);
  });

  getPublishedPropertyListings().forEach((listing) => {
    const url = getPublicUrl(`/properties/${getBusinessSlug(listing)}`);
    if (url) paths.add(url);
  });

  const urls = [...paths].map((url) => `<url><loc>${escapeXml(url)}</loc></url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}
