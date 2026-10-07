import { createFileRoute, redirect } from "@tanstack/react-router";

import { CategoryDiscoveryPage } from "@/components/CategoryDiscoveryPage";
import {
  categoryConfigs,
  categoryListings,
  discoverySubcategories,
  getCategoryListings,
  isPublishedListing,
  primaryDiscoveryCategorySlugs,
  propertyListings,
  type AutomotiveMode,
  type CategoryConfig,
  type PropertyMode,
} from "@/lib/category-discovery";
import { mpumalangaLocations } from "@/lib/location-discovery";
import { getPublicUrl } from "@/lib/site-url";

const accommodationTypes = new Set([
  ...discoverySubcategories.stay,
  ...categoryListings.accommodation
    .map((listing) => listing.type)
    .filter((type): type is string => Boolean(type)),
]);
const discoveryTypes = new Set(Object.values(discoverySubcategories).flat());
const accommodationAmenities = new Set(
  categoryListings.accommodation.flatMap((listing) => listing.amenities ?? []),
);
const foodCuisines = new Set(
  categoryListings["food-dining"].flatMap((listing) => listing.cuisineTypes ?? []),
);
const foodDiningStyles = new Set(
  categoryListings["food-dining"].flatMap((listing) => listing.diningStyles ?? []),
);
const foodMealTypes = new Set(
  categoryListings["food-dining"].flatMap((listing) => listing.mealTypes ?? []),
);

function validateFoodFilters(value: unknown, allowed: Set<string>) {
  let candidates: string[] = [];
  if (Array.isArray(value)) {
    candidates = value.filter((item): item is string => typeof item === "string");
  } else if (typeof value === "string") {
    const normalized = value.trim();
    if (normalized.startsWith("[")) {
      try {
        const parsed: unknown = JSON.parse(normalized);
        candidates = Array.isArray(parsed)
          ? parsed.filter((item): item is string => typeof item === "string")
          : [];
      } catch {
        candidates = [];
      }
    } else {
      candidates = normalized.split(",");
    }
  }
  const values = [
    ...new Set(candidates.map((item) => item.trim()).filter((item) => allowed.has(item))),
  ];
  return values.length ? values : undefined;
}
export const Route = createFileRoute("/categories/$category")({
  beforeLoad: ({ params }) => {
    const redirects: Record<string, string> = {
      events: "leisure-entertainment",
      "weddings-events": "leisure-entertainment",
      education: "education-training",
      travel: "travel-transport",
      "professional-services": "professional",
      "home-construction": "home-property",
      "health-wellness": "health",
      beauty: "personal-beauty",
      "events-entertainment": "leisure-entertainment",
    };
    const category = redirects[params.category];
    if (category) {
      throw redirect({
        to: "/categories/$category",
        params: { category },
        search: {
          q: undefined,
          location: undefined,
          mode: undefined,
          type: undefined,
          amenities: undefined,
          cuisine: undefined,
          style: undefined,
          meal: undefined,
          date: undefined,
          status: undefined,
        },
      });
    }
    if (params.category === "services") throw redirect({ to: "/" });
  },
  head: ({ params, match }) => {
    const config = (categoryConfigs as Record<string, CategoryConfig | undefined>)[params.category];
    if (!config) {
      return {
        meta: [
          { title: "Category not found | Discover by Lowveld Hub" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }

    const automotiveMode: AutomotiveMode =
      match.search.mode === "vehicles" ? "vehicles" : "services";
    const isAutomotive = config.slug === "automotive";
    const isFoodDining = config.slug === "food-dining" || config.slug === "eat";
    const propertyMode: PropertyMode =
      match.search.mode === "businesses" ? "businesses" : "listings";
    const isProperty = config.slug === "property";
    const isAccommodation = config.slug === "accommodation" || config.slug === "stay";
    const title = isFoodDining
      ? "Restaurants in Mpumalanga | Discover"
      : isAccommodation
        ? "Accommodation in Mpumalanga | Discover by Lowveld Hub"
        : isProperty
          ? propertyMode === "businesses"
            ? "Property Businesses in Mpumalanga | Discover by Lowveld Hub"
            : "Property for Sale or Rent in Mpumalanga | Discover by Lowveld Hub"
          : isAutomotive
            ? automotiveMode === "vehicles"
              ? "Vehicles for Sale in Mpumalanga | Discover by Lowveld Hub"
              : "Automotive Services in Mpumalanga | Discover by Lowveld Hub"
            : (config.seoTitle ?? `${config.label} in Mpumalanga | Discover by Lowveld Hub`);
    const description = isFoodDining
      ? "Discover places to eat, drink and enjoy across Mpumalanga."
      : isAccommodation
        ? "Discover hotels, lodges, guesthouses, apartments and unique stays across Mpumalanga."
        : isProperty
          ? propertyMode === "businesses"
            ? "Find estate agencies and property professionals serving Mbombela and Mpumalanga."
            : "Search property for sale and rent in Mpumalanga. Approved listings will appear here."
          : isAutomotive
            ? automotiveMode === "vehicles"
              ? "Browse vehicle listings across Mpumalanga, with useful details for comparing available vehicles."
              : "Find mechanics, tyre shops, auto electricians, panel beaters and other automotive services across Mpumalanga."
            : (config.seoDescription ?? config.description);
    const canonical = getPublicUrl(
      isProperty && propertyMode === "businesses"
        ? `/categories/${config.slug}?mode=businesses`
        : `/categories/${config.slug}`,
    );
    const socialImage = config.heroImage
      ? config.heroImage.startsWith("http")
        ? config.heroImage
        : getPublicUrl(config.heroImage)
      : undefined;
    const isEmpty = isProperty
      ? propertyMode === "listings"
        ? propertyListings.filter(isPublishedListing).length === 0
        : getCategoryListings("property").filter(isPublishedListing).length === 0
      : getCategoryListings(config.slug).filter(isPublishedListing).length === 0;
    const hasSearch = Boolean(
      match.search.q?.trim() ||
      match.search.location ||
      (isProperty && propertyMode === "businesses" && match.search.mode !== "businesses") ||
      (isFoodDining &&
        (match.search.cuisine?.length ||
          match.search.style?.length ||
          match.search.meal?.length)) ||
      (isAccommodation && (match.search.type || match.search.amenities)) ||
      match.search.type,
    );

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "robots",
          content: isEmpty || hasSearch ? "noindex,follow" : "index,follow",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        ...(socialImage ? [{ property: "og:image", content: socialImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(socialImage ? [{ name: "twitter:image", content: socialImage }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
    type:
      typeof search.type === "string"
        ? [
            ...new Set(
              search.type
                .split(",")
                .map((type) => type.trim())
                .filter((type) => accommodationTypes.has(type) || discoveryTypes.has(type)),
            ),
          ].join(",") || undefined
        : undefined,
    amenities:
      typeof search.amenities === "string"
        ? search.amenities
            .split(",")
            .filter((amenity) => accommodationAmenities.has(amenity))
            .join(",") || undefined
        : undefined,
    mode:
      search.mode === "services" ||
      search.mode === "vehicles" ||
      search.mode === "businesses" ||
      search.mode === "listings"
        ? search.mode
        : undefined,
    location:
      typeof search.location === "string" &&
      (mpumalangaLocations as readonly string[]).includes(search.location)
        ? search.location
        : undefined,
    cuisine: validateFoodFilters(search.cuisine, foodCuisines),
    style: validateFoodFilters(search.style, foodDiningStyles),
    meal: validateFoodFilters(search.meal, foodMealTypes),
  }),
  component: CategoryBySlug,
});

function CategoryBySlug() {
  const navigate = Route.useNavigate();
  const { category } = Route.useParams();
  const { q, location, mode, type, amenities, cuisine, style, meal } = Route.useSearch();
  const config = (categoryConfigs as Record<string, CategoryConfig | undefined>)[category];

  if (!config) {
    return (
      <main className="container-x py-24 text-center">
        <h1 className="text-3xl font-semibold text-[#172a31]">Category not found</h1>
        <a
          href="/"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#17242b]"
        >
          Return to Discover
        </a>
      </main>
    );
  }

  return (
    <CategoryDiscoveryPage
      key={`${config.slug}-${q ?? ""}-${location ?? ""}-${mode ?? ""}-${type ?? ""}`}
      config={config}
      initialQuery={q ?? ""}
      initialLocation={location}
      initialAutomotiveMode={(mode as AutomotiveMode | undefined) ?? "services"}
      initialPropertyMode={(mode as PropertyMode | undefined) ?? "listings"}
      initialAccommodationType={type && accommodationTypes.has(type) ? type : undefined}
      initialCategoryType={
        primaryDiscoveryCategorySlugs.some((slug) => slug === config.slug) ? type : undefined
      }
      initialDiscoveryFilters={{
        ...(type && config.slug === "automotive" ? { "service-type": type } : {}),
      }}
      initialAccommodationAmenities={amenities?.split(",").filter(Boolean) ?? []}
      initialFoodCuisines={cuisine ?? []}
      initialFoodDiningStyles={style ?? []}
      initialFoodMealTypes={meal ?? []}
      onAccommodationSearchChange={(state) => {
        if (config.slug !== "accommodation" && config.slug !== "stay") return;
        void navigate({
          replace: true,
          search: (previous) => ({
            ...previous,
            q: state.query || undefined,
            location: state.location ?? undefined,
            type: state.type,
            amenities: state.amenities.length ? state.amenities.join(",") : undefined,
          }),
        });
      }}
      onFoodSearchChange={(state) => {
        if (config.slug !== "food-dining" && config.slug !== "eat") return;
        void navigate({
          replace: true,
          search: (previous) => ({
            ...previous,
            q: state.query || undefined,
            location: state.location,
            cuisine: state.cuisine.length ? state.cuisine : undefined,
            style: state.diningStyles.length ? state.diningStyles : undefined,
            meal: state.mealTypes.length ? state.mealTypes : undefined,
          }),
        });
      }}
      onDiscoverySearchChange={(state) => {
        if (
          config.slug === "accommodation" ||
          config.slug === "stay" ||
          config.slug === "food-dining" ||
          config.slug === "eat"
        ) {
          return;
        }
        void navigate({
          replace: true,
          search: (previous) => ({
            ...previous,
            q: state.query || undefined,
            location: state.location,
            type: state.type,
          }),
        });
      }}
    />
  );
}
