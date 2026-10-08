import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";

import { PropertyMarketplace } from "@/components/PropertyMarketplace";
import {
  filterPropertyListings,
  getPublishedPropertyProfessionals,
  propertyFeatures,
  propertyLocations,
  propertyListingIntents,
  propertyTypes,
  type PropertySearchParams,
} from "@/lib/property";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

const propertyTitle = "Property in Mpumalanga | Discover by Lowveld Hub";
const propertyDescription =
  "Discover homes, apartments, land, commercial spaces and holiday properties across Mpumalanga.";

function safeNumber(value: unknown) {
  if (typeof value !== "string" || !/^\d{1,10}$/.test(value)) return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : undefined;
}

function safeFeatures(value: unknown) {
  const candidates =
    typeof value === "string"
      ? value.split(",")
      : Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : [];
  const validFeatures = new Set<string>(propertyFeatures);
  const selected = [
    ...new Set(candidates.map((item) => item.trim()).filter((item) => validFeatures.has(item))),
  ];
  return selected.length ? selected : undefined;
}

export const Route = createFileRoute("/property")({
  validateSearch: (search: Record<string, unknown>): PropertySearchParams => {
    const minPrice = safeNumber(search.minPrice);
    const maxPrice = safeNumber(search.maxPrice);
    const validPriceRange =
      minPrice === undefined || maxPrice === undefined || minPrice <= maxPrice;
    const listingIntent = propertyListingIntents.find(
      (intent) => intent.value === search.listingType,
    );
    const validPropertyTypes = new Set<string>(propertyTypes);
    return {
      view: search.view === "professionals" || search.view === "saved" ? search.view : undefined,
      listingType: listingIntent?.value,
      q:
        typeof search.q === "string" && search.q.trim().length <= 120
          ? search.q.trim() || undefined
          : undefined,
      location:
        typeof search.location === "string" && propertyLocations.includes(search.location)
          ? search.location
          : undefined,
      propertyType:
        typeof search.propertyType === "string" && validPropertyTypes.has(search.propertyType)
          ? search.propertyType
          : undefined,
      minPrice: validPriceRange ? minPrice : undefined,
      maxPrice: validPriceRange ? maxPrice : undefined,
      bedrooms: safeNumber(search.bedrooms),
      bathrooms: safeNumber(search.bathrooms),
      features: safeFeatures(search.features),
    };
  },
  head: ({ match }) => {
    const canonical = getPublicUrl("/property");
    const socialImage = getPublicUrl("/PROPERTY.jpg");
    const hasFilters =
      match.search.view === "saved" ||
      (match.search.view === "professionals" && getPublishedPropertyProfessionals().length === 0) ||
      Object.entries(match.search).some(([key, value]) => key !== "view" && value !== undefined);
    return {
      meta: [
        { title: propertyTitle },
        { name: "description", content: propertyDescription },
        { name: "robots", content: hasFilters ? "noindex,follow" : "index,follow" },
        { property: "og:title", content: propertyTitle },
        { property: "og:description", content: propertyDescription },
        { property: "og:type", content: "website" },
        ...(socialImage ? [{ property: "og:image", content: socialImage }] : []),
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: propertyTitle },
        { name: "twitter:description", content: propertyDescription },
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: PropertyPage,
});

function PropertyPage() {
  const navigate = useNavigate({ from: "/property" });
  const search = Route.useSearch();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const navigateToSearch = (nextSearch: PropertySearchParams) => {
    void navigate({
      replace: false,
      search: {
        ...nextSearch,
        features: nextSearch.features?.length ? nextSearch.features : undefined,
      },
    });
  };

  if (pathname !== "/property") return <Outlet />;

  const publishedCount =
    search.view === "professionals"
      ? getPublishedPropertyProfessionals().length
      : filterPropertyListings(search).length;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: propertyTitle,
    description: propertyDescription,
    url: getPublicUrl("/property"),
    isPartOf: {
      "@type": "WebSite",
      name: "Discover by Lowveld Hub",
      url: getPublicUrl("/"),
    },
    ...(publishedCount > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: publishedCount,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }}
      />
      <PropertyMarketplace search={search} onSearch={navigateToSearch} />
    </>
  );
}
