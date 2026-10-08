import type { CategorySlug } from "./category-discovery";

export type DiscoveryLocation = {
  name: string;
  slug: string;
  province: string;
  country: string;
  alternateNames: readonly string[];
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  relevantCategorySlugs: readonly CategorySlug[];
  latitude: number;
  longitude: number;
  image: string;
  locationAccuracy?: "approximate";
  parentLocation?: string;
  nearbyLocations: readonly string[];
  indexability: "data-dependent" | "always";
};

const province = "Mpumalanga";
const country = "South Africa";
const commonCategories = ["accommodation", "food-dining", "health"] as const;

export const locationDiscovery: readonly DiscoveryLocation[] = [
  {
    name: "Mbombela",
    slug: "mbombela",
    province,
    country,
    alternateNames: ["Nelspruit", "Mbombela / Nelspruit"],
    seoTitle: "Businesses in Mbombela (Nelspruit) | Discover",
    seoDescription:
      "Explore currently listed businesses, services, places to eat and accommodation in Mbombela, also known as Nelspruit.",
    introduction:
      "Browse published local listings in Mbombela, also known as Nelspruit. Discover available services, places to eat, accommodation and other local businesses.",
    relevantCategorySlugs: [
      ...commonCategories,
      "professional",
      "home-property",
      "automotive",
      "shop",
      "leisure-entertainment",
    ],
    latitude: -25.4745,
    longitude: 30.9703,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["White River", "Hazyview", "Sabie", "Barberton"],
    indexability: "data-dependent",
  },
  {
    name: "White River",
    slug: "white-river",
    province,
    country,
    alternateNames: ["White River, Mpumalanga"],
    seoTitle: "Businesses in White River, Mpumalanga | Discover",
    seoDescription:
      "Browse published businesses, services, dining and places to stay in White River, Mpumalanga.",
    introduction:
      "Explore local listings serving White River. Browse the businesses and services currently published for this Mpumalanga town.",
    relevantCategorySlugs: [...commonCategories, "leisure-entertainment", "shop"],
    latitude: -25.3318,
    longitude: 31.0117,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Mbombela", "Hazyview", "Sabie"],
    indexability: "data-dependent",
  },
  {
    name: "Hazyview",
    slug: "hazyview",
    province,
    country,
    alternateNames: ["Hazyview, Mpumalanga"],
    seoTitle: "Businesses in Hazyview, Mpumalanga | Discover",
    seoDescription:
      "Find currently listed accommodation, dining, activities and local businesses in Hazyview, Mpumalanga.",
    introduction:
      "Discover currently published listings in Hazyview, including local businesses, places to stay and visitor experiences where available.",
    relevantCategorySlugs: [...commonCategories, "leisure-entertainment"],
    latitude: -25.0436,
    longitude: 31.1306,
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["White River", "Mbombela", "Sabie", "Komatipoort"],
    indexability: "data-dependent",
  },
  {
    name: "Sabie",
    slug: "sabie",
    province,
    country,
    alternateNames: ["Sabie, Mpumalanga"],
    seoTitle: "Businesses in Sabie, Mpumalanga | Discover",
    seoDescription:
      "Browse published accommodation, businesses and visitor services in Sabie, Mpumalanga.",
    introduction:
      "Explore the local listings currently available for Sabie, from places to stay to businesses and services.",
    relevantCategorySlugs: [...commonCategories, "leisure-entertainment"],
    latitude: -25.0965,
    longitude: 30.7802,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Mbombela", "White River", "Hazyview", "Lydenburg"],
    indexability: "data-dependent",
  },
  {
    name: "Barberton",
    slug: "barberton",
    province,
    country,
    alternateNames: ["Barberton, Mpumalanga"],
    seoTitle: "Businesses in Barberton, Mpumalanga | Discover",
    seoDescription:
      "Explore published local businesses, services, dining and accommodation in Barberton, Mpumalanga.",
    introduction:
      "Browse the businesses and local services currently listed for Barberton, Mpumalanga.",
    relevantCategorySlugs: [...commonCategories, "leisure-entertainment"],
    latitude: -25.7884,
    longitude: 31.0532,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Mbombela", "Malelane"],
    indexability: "data-dependent",
  },
  {
    name: "Lydenburg",
    slug: "lydenburg",
    province,
    country,
    alternateNames: ["Mashishing", "Lydenburg / Mashishing"],
    seoTitle: "Businesses in Lydenburg (Mashishing) | Discover",
    seoDescription:
      "Find published businesses and local services in Lydenburg, also known as Mashishing, Mpumalanga.",
    introduction:
      "Explore currently available local listings in Lydenburg, also known as Mashishing.",
    relevantCategorySlugs: [...commonCategories, "automotive", "home-property"],
    latitude: -25.095,
    longitude: 30.4597,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Sabie", "Middelburg"],
    indexability: "data-dependent",
  },
  {
    name: "eMalahleni",
    slug: "emalahleni",
    province,
    country,
    alternateNames: ["Witbank", "eMalahleni / Witbank"],
    seoTitle: "Businesses in eMalahleni (Witbank) | Discover",
    seoDescription:
      "Browse published businesses and local services in eMalahleni, also known as Witbank, Mpumalanga.",
    introduction:
      "Discover the businesses and services currently listed in eMalahleni, also known as Witbank.",
    relevantCategorySlugs: [...commonCategories, "professional", "automotive", "home-property"],
    latitude: -25.8713,
    longitude: 29.2332,
    image:
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Middelburg", "Secunda"],
    indexability: "data-dependent",
  },
  {
    name: "Middelburg",
    slug: "middelburg",
    province,
    country,
    alternateNames: ["Middelburg, Mpumalanga"],
    seoTitle: "Businesses in Middelburg, Mpumalanga | Discover",
    seoDescription:
      "Explore published businesses, services, dining and accommodation in Middelburg, Mpumalanga.",
    introduction:
      "Browse local businesses and services currently listed in Middelburg, Mpumalanga.",
    relevantCategorySlugs: [...commonCategories, "professional", "automotive", "home-property"],
    latitude: -25.7751,
    longitude: 29.4648,
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["eMalahleni", "Lydenburg", "Secunda"],
    indexability: "data-dependent",
  },
  {
    name: "Secunda",
    slug: "secunda",
    province,
    country,
    alternateNames: ["Secunda, Mpumalanga"],
    seoTitle: "Businesses in Secunda, Mpumalanga | Discover",
    seoDescription:
      "Find currently published businesses, professional services and local amenities in Secunda, Mpumalanga.",
    introduction: "Explore businesses and services currently listed in Secunda.",
    relevantCategorySlugs: [...commonCategories, "professional", "automotive", "home-property"],
    latitude: -26.55,
    longitude: 29.17,
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Middelburg", "eMalahleni", "Ermelo"],
    indexability: "data-dependent",
  },
  {
    name: "Ermelo",
    slug: "ermelo",
    province,
    country,
    alternateNames: ["Ermelo, Mpumalanga"],
    seoTitle: "Businesses in Ermelo, Mpumalanga | Discover",
    seoDescription: "Browse published businesses and local services in Ermelo, Mpumalanga.",
    introduction: "Explore local businesses and services currently available in Ermelo.",
    relevantCategorySlugs: [...commonCategories, "professional", "automotive", "home-property"],
    latitude: -26.5333,
    longitude: 29.9833,
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Secunda", "Mkhondo / Piet Retief"],
    indexability: "data-dependent",
  },
  {
    name: "Mkhondo / Piet Retief",
    slug: "mkhondo-piet-retief",
    province,
    country,
    alternateNames: ["Mkhondo", "Piet Retief", "Mkhondo / Piet Retief"],
    seoTitle: "Businesses in Mkhondo (Piet Retief) | Discover",
    seoDescription:
      "Discover published local businesses and services in Mkhondo, also known as Piet Retief, Mpumalanga.",
    introduction:
      "Browse the local businesses and services currently listed for Mkhondo, also known as Piet Retief.",
    relevantCategorySlugs: [...commonCategories, "automotive", "home-property"],
    latitude: -27.0071,
    longitude: 30.8132,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Ermelo"],
    indexability: "data-dependent",
  },
  {
    name: "Malelane",
    slug: "malelane",
    province,
    country,
    alternateNames: ["Malalane", "Malelane, Mpumalanga"],
    seoTitle: "Businesses in Malelane, Mpumalanga | Discover",
    seoDescription:
      "Explore published accommodation, businesses and visitor services in Malelane, Mpumalanga.",
    introduction: "Browse local businesses and visitor services currently listed in Malelane.",
    relevantCategorySlugs: [...commonCategories, "leisure-entertainment", "travel-transport"],
    latitude: -25.49,
    longitude: 31.51,
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=85",
    locationAccuracy: "approximate",
    nearbyLocations: ["Barberton", "Komatipoort"],
    indexability: "data-dependent",
  },
  {
    name: "Komatipoort",
    slug: "komatipoort",
    province,
    country,
    alternateNames: ["Komatipoort, Mpumalanga"],
    seoTitle: "Businesses in Komatipoort, Mpumalanga | Discover",
    seoDescription:
      "Browse published accommodation, local businesses and services in Komatipoort, Mpumalanga.",
    introduction: "Explore businesses and visitor services currently listed in Komatipoort.",
    relevantCategorySlugs: [...commonCategories, "leisure-entertainment", "travel-transport"],
    latitude: -25.4332,
    longitude: 31.9548,
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=85",
    nearbyLocations: ["Hazyview", "Malelane"],
    indexability: "data-dependent",
  },
] as const;

export const mpumalangaLocations = locationDiscovery.map(({ name }) => name);

export function locationSlug(name: string) {
  return name
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findDiscoveryLocation(nameOrSlug: string) {
  const normalize = (value: string) =>
    value
      .trim()
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const normalized = normalize(nameOrSlug);
  const tokens = new Set(normalized.split(/\s+/));
  return locationDiscovery.find(
    (location) =>
      location.slug === nameOrSlug.trim().toLocaleLowerCase() ||
      [location.name, ...location.alternateNames].some((name) => {
        const alias = normalize(name);
        return (
          alias === normalized ||
          (alias.length > 0 && alias.split(/\s+/).every((token) => tokens.has(token)))
        );
      }),
  );
}
