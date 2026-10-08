import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import {
  Bookmark,
  ChevronDown,
  Heart,
  List,
  Map as MapIcon,
  MapPin,
  Menu,
  Search,
  Share2,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { CategoryIcon } from "@/components/DiscoverCategory";
import { MpumalangaMap, type MpumalangaMapPlace } from "@/components/MpumalangaMap";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  categoryListings,
  getCanonicalCategorySlug,
  getCategoryListingPath,
  getCategoryListings,
  type AutomotiveMode,
  getListingOpenStatus,
  getBusinessSlug,
  isPublishedListing,
  primaryDiscoveryCategorySlugs,
  searchTextMatches,
  type CategoryConfig,
  type CategoryFilterConfig,
  type CategoryListing,
  type EventListing,
  type PropertyListing,
  type PropertyMode,
  propertyListings,
  vehicleListings,
  type CategorySlug,
  type CategorySortConfig,
} from "@/lib/category-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";
import { findDiscoveryLocation, locationDiscovery } from "@/lib/location-discovery";

type NumericFilterValue = [number | null, number | null];
type FilterValue = string | string[] | NumericFilterValue | undefined;
type ActiveChip = { id: string; label: string; clear: () => void };
type FilterSetter = (id: string, value: FilterValue) => void;
function isStringFilterValue(value: FilterValue): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

type SavedDirectorySearch = {
  id: string;
  categorySlug: CategorySlug;
  label: string;
  query: string;
  filters: Record<string, FilterValue>;
  openNowOnly: boolean;
  matchedIds: string[];
  automotiveMode?: AutomotiveMode;
};
type SavedSearchAlert = { searchLabel: string; listings: CategoryListing[] };
type AccommodationSearchState = {
  query: string;
  location?: string;
  type?: string;
  amenities: string[];
};
type FoodDiningSearchState = {
  query: string;
  location?: string;
  cuisine: string[];
  diningStyles: string[];
  mealTypes: string[];
};
type DiscoverySearchState = {
  query: string;
  location?: string;
  type?: string;
  date?: string;
  status?: string;
};
const listingContactHref = "/list-your-business";
const savedSearchesStorageKey = "discover:saved-searches:v1";

function readSavedSearches(): SavedDirectorySearch[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(savedSearchesStorageKey) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (search): search is SavedDirectorySearch =>
        typeof search === "object" &&
        search !== null &&
        typeof search.id === "string" &&
        typeof search.categorySlug === "string" &&
        typeof search.label === "string" &&
        typeof search.query === "string" &&
        typeof search.filters === "object" &&
        search.filters !== null &&
        typeof search.openNowOnly === "boolean" &&
        (search.automotiveMode === undefined ||
          search.automotiveMode === "vehicles" ||
          search.automotiveMode === "services") &&
        Array.isArray(search.matchedIds) &&
        search.matchedIds.every((id: unknown) => typeof id === "string"),
    );
  } catch {
    return [];
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesSavedSearch(
  listing: CategoryListing,
  search: SavedDirectorySearch,
  config: CategoryConfig,
  automotiveMode: AutomotiveMode,
) {
  if (
    config.slug === "automotive" &&
    search.automotiveMode !== undefined &&
    search.automotiveMode !== automotiveMode
  ) {
    return false;
  }
  const searchable = config.searchFields
    .flatMap((field) => flattenValues(readField(listing, field)))
    .join(" ");
  return (
    (!search.query || searchTextMatches(searchable, search.query)) &&
    (!search.openNowOnly || getListingOpenStatus(listing) === true) &&
    config.filters.every((filter) => matchesFilter(listing, filter, search.filters[filter.id]))
  );
}

function parseSearchIntent(
  value: string,
  config: CategoryConfig,
  baseFilters: Record<string, FilterValue>,
) {
  let query = value.trim();
  const filters = { ...baseFilters };
  let openNowOnly = false;

  const locationFilter = config.filters.find((filter) => filter.field === "location");
  const matchingLocation = locationFilter?.options?.find((location) =>
    new RegExp(`\\b(?:in|near)\\s+${escapeRegExp(location)}\\b`, "i").test(query),
  );
  if (locationFilter && matchingLocation) {
    filters[locationFilter.id] = matchingLocation;
    query = query.replace(new RegExp(escapeRegExp(matchingLocation), "i"), " ");
  }

  const budgetPattern =
    /\b(?:under|below|less than|up to|max(?:imum)?|budget(?: of)?|over|above|more than|from)\s*(?:r\s*)?(\d[\d,]*(?:\s\d{3})?(?:\.\d+)?)\s*(k)?\b/i;
  const budgetMatch = query.match(budgetPattern);
  const priceFilter = config.filters.find(
    (filter) => filter.field === "price" && filter.kind === "range",
  );
  if (budgetMatch && priceFilter) {
    const amount = Number(budgetMatch[1].replace(/[\s,]/g, "")) * (budgetMatch[2] ? 1000 : 1);
    const isMinimum = /\b(?:over|above|more than|from)\b/i.test(budgetMatch[0]);
    if (Number.isFinite(amount))
      filters[priceFilter.id] = isMinimum ? [amount, null] : [null, amount];
    query = query.replace(budgetMatch[0], " ");
  }

  openNowOnly = /\b(?:open now|currently open)\b/i.test(query);
  query = query.replace(/\b(?:open now|currently open)\b/gi, " ");
  query = query.replace(/\b(?:in|near)\s*$/i, " ");

  return {
    query: query.replace(/[\s,.:;-]+/g, " ").trim(),
    filters,
    openNowOnly,
  };
}

const vehicleFilterIds = new Set([
  "vehicle-type",
  "make",
  "model",
  "seller-type",
  "price",
  "condition",
  "year",
  "mileage",
  "transmission",
  "fuel",
  "body-type",
  "location",
]);

const serviceFilterIds = new Set([
  "service-type",
  "location",
  "vehicle-type",
  "emergency",
  "booking-required",
  "mobile-service",
]);

function getCategoryViewConfig(
  config: CategoryConfig,
  automotiveMode: AutomotiveMode,
  propertyMode: PropertyMode,
) {
  if (config.slug === "property") {
    const isBusinessView = propertyMode === "businesses";
    const listingFilters = config.filters.filter((filter) =>
      isBusinessView
        ? filter.id === "service-type" || filter.field === "location"
        : filter.id !== "service-type",
    );
    return {
      ...config,
      headline: isBusinessView
        ? "Property professionals in Mpumalanga"
        : "Property for Sale or Rent in Mpumalanga",
      description: isBusinessView
        ? "Find estate agencies and property professionals serving Mbombela and Mpumalanga."
        : "Search local property listings for sale and rent. Inventory will appear as approved listings are submitted.",
      searchPlaceholder: isBusinessView
        ? "Search estate agents and property services..."
        : "Search properties, locations or listing details...",
      searchFields: isBusinessView
        ? ["name", "serviceType", "location", "description"]
        : [
            "name",
            "propertyType",
            "transactionType",
            "location",
            "address",
            "description",
            "features",
          ],
      cardVariant: isBusinessView ? ("business" as const) : ("property" as const),
      cardFields: isBusinessView
        ? [
            { label: "Services", field: "serviceType" },
            { label: "Location", field: "location" },
          ]
        : config.cardFields,
      filters: listingFilters,
      sortOptions: isBusinessView
        ? config.sortOptions.filter((option) => option.id === "name" || option.id === "relevance")
        : config.sortOptions,
      resultNoun: isBusinessView ? "property businesses" : "properties",
      emptyTitle: isBusinessView
        ? "No property businesses match your search."
        : "Property listings are coming soon.",
      emptyDescription: isBusinessView
        ? "There are no published property business profiles available to show right now."
        : "The property marketplace is ready for approved submissions. No properties are currently advertised.",
      ownerHeading: isBusinessView
        ? "Are you a property professional?"
        : "Have a property to list?",
      ownerDescription: isBusinessView
        ? "Contact the Lowveld Hub team about listing your property business."
        : "Contact the Lowveld Hub team about submitting a property for review.",
    } satisfies CategoryConfig;
  }
  if (config.slug !== "automotive") return config;

  const isVehicleView = automotiveMode === "vehicles";
  return {
    ...config,
    headline: isVehicleView ? "Cars for Sale in Mpumalanga" : "Automotive services near you.",
    description: isVehicleView
      ? "Explore cars listed by local sellers. Vehicle listings are coming as dealers and private sellers join."
      : "Find mechanics, tyre shops, auto electricians, panel beaters and other local specialists.",
    searchPlaceholder: isVehicleView
      ? "Search make, model or vehicle type..."
      : "Search mechanics, tyres or automotive services...",
    searchFields: isVehicleView
      ? ["name", "make", "model", "vehicleType", "bodyType", "location", "description"]
      : ["name", "type", "serviceType", "services", "location", "description"],
    cardVariant: isVehicleView ? ("vehicle" as const) : ("business" as const),
    cardFields: isVehicleView
      ? config.cardFields
      : [
          { label: "Service", field: "serviceType" },
          { label: "Location", field: "location" },
        ],
    filters: config.filters.filter((filter) =>
      (isVehicleView ? vehicleFilterIds : serviceFilterIds).has(filter.id),
    ),
    sortOptions: isVehicleView
      ? config.sortOptions
      : config.sortOptions.filter((option) => ["name", "relevance", "newest"].includes(option.id)),
    resultNoun: isVehicleView ? "vehicles" : "service providers",
    emptyTitle: isVehicleView
      ? "Cars for Sale are coming soon."
      : "No automotive service providers listed yet.",
    emptyDescription: isVehicleView
      ? "Vehicle listings will appear here as dealerships and private sellers join Discover."
      : "There are no published automotive service profiles available to show right now.",
    ownerHeading: isVehicleView
      ? "Are you a dealership or private seller?"
      : "Are you an automotive service provider?",
    ownerDescription: isVehicleView
      ? "Contact the Lowveld Hub team about adding a vehicle listing."
      : "Help local drivers discover your automotive services.",
  } satisfies CategoryConfig;
}

function matchesAutomotiveMode(listing: CategoryListing, automotiveMode: AutomotiveMode) {
  if (listing.listingKind) {
    return automotiveMode === "vehicles"
      ? listing.listingKind === "vehicle"
      : listing.listingKind === "business";
  }

  const hasVehicleAttributes = ["make", "model", "vehicleType", "bodyType"].some((field) =>
    hasValue(readField(listing, field)),
  );
  return automotiveMode === "vehicles" ? hasVehicleAttributes : !hasVehicleAttributes;
}

function getAutomotiveModeHref(automotiveMode: AutomotiveMode, query: string, location?: string) {
  const search = new URLSearchParams({ mode: automotiveMode });
  if (query.trim()) search.set("q", query.trim());
  if (location) search.set("location", location);
  return `/categories/automotive?${search.toString()}`;
}

function getPropertyModeHref(propertyMode: PropertyMode, query: string, location?: string) {
  const search = new URLSearchParams({ mode: propertyMode });
  if (query.trim()) search.set("q", query.trim());
  if (location) search.set("location", location);
  return `/categories/property?${search.toString()}`;
}

export function CategoryDiscoveryPage({
  config,
  initialQuery = "",
  initialLocation,
  initialAutomotiveMode = "vehicles",
  initialPropertyMode = "listings",
  initialAccommodationType,
  initialCategoryType,
  initialDiscoveryFilters = {},
  initialAccommodationAmenities = [],
  initialFoodCuisines = [],
  initialFoodDiningStyles = [],
  initialFoodMealTypes = [],
  onAccommodationSearchChange,
  onFoodSearchChange,
  onDiscoverySearchChange,
}: {
  config: CategoryConfig;
  initialQuery?: string;
  initialLocation?: string;
  initialAutomotiveMode?: AutomotiveMode;
  initialPropertyMode?: PropertyMode;
  initialAccommodationType?: string;
  initialCategoryType?: string;
  initialDiscoveryFilters?: Record<string, string>;
  initialAccommodationAmenities?: string[];
  initialFoodCuisines?: string[];
  initialFoodDiningStyles?: string[];
  initialFoodMealTypes?: string[];
  onAccommodationSearchChange?: (state: AccommodationSearchState) => void;
  onFoodSearchChange?: (state: FoodDiningSearchState) => void;
  onDiscoverySearchChange?: (state: DiscoverySearchState) => void;
}) {
  const pageConfig = useMemo(
    () => getCategoryViewConfig(config, initialAutomotiveMode, initialPropertyMode),
    [config, initialAutomotiveMode, initialPropertyMode],
  );
  const listings = useMemo(
    () =>
      (config.slug === "automotive" && initialAutomotiveMode === "vehicles"
        ? vehicleListings
        : config.slug === "property" && initialPropertyMode === "listings"
          ? propertyListings
          : getCategoryListings(config.slug)
      )
        .filter(isPublishedListing)
        .filter(
          (listing) =>
            config.slug !== "automotive" || matchesAutomotiveMode(listing, initialAutomotiveMode),
        ),
    [config.slug, initialAutomotiveMode, initialPropertyMode],
  );
  config = pageConfig;
  const defaultFilters = Object.fromEntries(
    config.filters
      .filter((filter) => filter.defaultValue)
      .map((filter) => [filter.id, filter.defaultValue]),
  ) as Record<string, FilterValue>;
  const initialFilters = { ...defaultFilters };
  const locationFilter = config.filters.find((filter) => filter.field === "location");
  if (locationFilter?.options?.includes(initialLocation ?? "")) {
    initialFilters[locationFilter.id] = initialLocation;
  }
  const categoryTypeFilter = config.filters.find((filter) => filter.id === "category-type");
  if (initialCategoryType && categoryTypeFilter?.options) {
    const selectedTypes = initialCategoryType
      .split(",")
      .filter((type) => categoryTypeFilter.options?.includes(type));
    if (selectedTypes.length) {
      initialFilters[categoryTypeFilter.id] =
        categoryTypeFilter.kind === "multi" ? selectedTypes : selectedTypes[0];
    }
  }
  config.filters.forEach((filter) => {
    const initialValue = initialDiscoveryFilters[filter.id];
    if (!initialValue) return;
    const initialValues = initialValue.split(",").filter(Boolean);
    const validValues = filter.options
      ? initialValues.filter((value) => filter.options?.includes(value))
      : initialValues;
    if (filter.kind === "multi" && validValues.length) {
      initialFilters[filter.id] = validValues;
    } else if (
      filter.kind !== "multi" &&
      (validValues.length > 0 || (filter.datePreset && /^\d{4}-\d{2}-\d{2}$/.test(initialValue)))
    ) {
      initialFilters[filter.id] = initialValue;
    }
  });
  if (config.slug === "accommodation" || config.slug === "stay") {
    if (initialAccommodationType) initialFilters.type = [initialAccommodationType];
    if (initialAccommodationAmenities.length > 0) {
      initialFilters.amenities = initialAccommodationAmenities;
    }
  }
  if (config.slug === "food-dining" || config.slug === "eat") {
    if (initialFoodCuisines.length) initialFilters.cuisine = initialFoodCuisines;
    if (initialFoodDiningStyles.length) {
      initialFilters["dining-style"] = initialFoodDiningStyles;
    }
    if (initialFoodMealTypes.length) initialFilters["meal-type"] = initialFoodMealTypes;
  }
  const initialIntent = parseSearchIntent(initialQuery, config, initialFilters);
  const [query, setQuery] = useState(initialIntent.query);
  const [filters, setFilters] = useState<Record<string, FilterValue>>(initialIntent.filters);
  const [openNowOnly, setOpenNowOnly] = useState(initialIntent.openNowOnly);
  const [savedSearches, setSavedSearches] = useState<SavedDirectorySearch[]>([]);
  const [savedSearchAlert, setSavedSearchAlert] = useState<SavedSearchAlert | null>(null);
  const [saveSearchMessage, setSaveSearchMessage] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [nearbyCenter, setNearbyCenter] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );
  const [nearbyRadiusKm, setNearbyRadiusKm] = useState(25);
  const [locationMessage, setLocationMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [directoryView, setDirectoryView] = useState<"list" | "map">("list");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const searchInputId = useId();
  const suggestionListId = useId();

  const searchTabs = config.filters.filter((filter) => filter.placement === "search");
  const searchTabOptions = searchTabs.flatMap((filter) =>
    [...new Set(filter.options ?? [])].map((option) => ({ filter, option })),
  );
  const enabledFilters = config.filters.filter(
    (filter) =>
      (filter.placement === "search" || isFilterAvailable(filter, listings)) &&
      (!filter.dependsOn ||
        (Array.isArray(filters[filter.dependsOn.filterId])
          ? (filters[filter.dependsOn.filterId] as string[]).some((value) =>
              filter.dependsOn?.values.includes(value),
            )
          : typeof filters[filter.dependsOn.filterId] === "string" &&
            filter.dependsOn.values.includes(filters[filter.dependsOn.filterId] as string))),
  );
  const visibleFilters = enabledFilters.filter((filter) => filter.placement !== "search");
  const suggestionTerms = query
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter((term) => term && !["a", "an", "and", "for", "in", "me", "near", "the"].includes(term));
  const suggestionCandidates = [
    ...new Set([
      ...listings.flatMap((listing) =>
        config.searchFields.flatMap((field) => flattenValues(readField(listing, field))),
      ),
      ...config.filters
        .filter((filter) => config.searchFields.includes(filter.field))
        .flatMap((filter) => filter.options ?? []),
    ]),
  ].filter((suggestion) => suggestion.length <= 80);
  const suggestions =
    searchFocused && suggestionTerms.length > 0
      ? suggestionCandidates
          .filter((suggestion) =>
            suggestionTerms.some((term) => searchTextMatches(suggestion, term)),
          )
          .slice(0, 6)
      : [];
  const availableSortOptions = config.sortOptions.filter(
    (option) =>
      (option.id !== "relevance" || Boolean(query.trim())) &&
      (!option.requiresData ||
        listings.some((listing) => hasValue(readField(listing, option.field ?? "")))),
  );
  const activeSortBy = availableSortOptions.some((option) => option.id === sortBy)
    ? sortBy
    : (availableSortOptions[0]?.id ?? "name");
  const activeLocationFilter = config.filters.find((filter) => filter.field === "location");
  const activeLocation = activeLocationFilter ? filters[activeLocationFilter.id] : initialLocation;
  const activeLocationName = typeof activeLocation === "string" ? activeLocation : undefined;
  const locationCategorySlug =
    config.slug === "stay" ? "accommodation" : config.slug === "eat" ? "food-dining" : config.slug;
  const locationsWithListings = locationDiscovery
    .filter((location) =>
      listings.some((listing) =>
        [listing.location, listing.area]
          .filter((value): value is string => typeof value === "string")
          .some((value) => findDiscoveryLocation(value)?.slug === location.slug),
      ),
    )
    .slice(0, 6);

  const matchingListings = listings.filter((listing) => {
    const searchable = config.searchFields
      .flatMap((field) => flattenValues(readField(listing, field)))
      .join(" ");
    if (query.trim() && !searchTextMatches(searchable, query)) return false;
    if (nearbyCenter) {
      const distance = distanceFromCenter(listing, nearbyCenter);
      if (distance == null || distance > nearbyRadiusKm) return false;
    }
    if (openNowOnly && getListingOpenStatus(listing) !== true) return false;

    return config.filters.every((filter) => matchesFilter(listing, filter, filters[filter.id]));
  });
  const sortedListings = [...matchingListings].sort((first, second) =>
    nearbyCenter
      ? (distanceFromCenter(first, nearbyCenter) ?? Infinity) -
        (distanceFromCenter(second, nearbyCenter) ?? Infinity)
      : compareListings(first, second, activeSortBy, query, config),
  );
  const isAccommodation = config.slug === "accommodation" || config.slug === "stay";
  const hasDesktopFilterSidebar =
    primaryDiscoveryCategorySlugs.includes(
      config.slug as (typeof primaryDiscoveryCategorySlugs)[number],
    ) &&
    config.slug !== "stay" &&
    config.slug !== "eat";
  const directoryMapPlaces = useMemo<MpumalangaMapPlace[]>(
    () =>
      sortedListings.flatMap((listing) =>
        Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude)
          ? [
              {
                name: listing.name,
                latitude: Number(listing.latitude),
                longitude: Number(listing.longitude),
                description: listing.description,
                href: getCategoryListingPath(config.slug, listing),
                locationAccuracy: listing.locationAccuracy,
              },
            ]
          : [],
      ),
    [config.slug, sortedListings],
  );
  const hasMappedListings = listings.some(
    (listing) => Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude),
  );
  const destinationChips =
    isAccommodation && listings.length > 0
      ? ["Mbombela", "White River", "Hazyview", "Sabie", "Graskop", "Lydenburg"].filter(
          (destination) =>
            listings.some((listing) => {
              const values = [listing.area, listing.location].filter(Boolean) as string[];
              return values.some((value) =>
                value.toLowerCase().includes(destination.toLowerCase()),
              );
            }),
        )
      : [];
  const categoryCanonical = getPublicUrl(`/categories/${getCanonicalCategorySlug(config.slug)}`);
  const categoryStructuredData = listings.length
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: config.label,
        description: config.description,
        ...(categoryCanonical ? { url: categoryCanonical } : {}),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: sortedListings.length,
          itemListElement: sortedListings.map((listing, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: listing.name,
            url: getPublicUrl(getCategoryListingPath(config.slug, listing)),
          })),
        },
      }
    : undefined;
  const categoryBreadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", url: getPublicUrl("/") },
      { name: "Categories", url: getPublicUrl("/#categories") },
      { name: config.label, url: categoryCanonical },
    ].flatMap(({ name, url }, index) =>
      url ? [{ "@type": "ListItem", position: index + 1, name, item: url }] : [],
    ),
  };

  useEffect(() => {
    const saved = readSavedSearches();
    let newMatchesAlert: SavedSearchAlert | null = null;
    const next = saved.map((search) => {
      if (search.categorySlug !== config.slug) return search;
      const currentMatches = listings.filter((listing) =>
        matchesSavedSearch(listing, search, config, initialAutomotiveMode),
      );
      const newMatches = currentMatches.filter(
        (listing) => !search.matchedIds.includes(listing.id),
      );
      if (!newMatchesAlert && newMatches.length > 0) {
        newMatchesAlert = { searchLabel: search.label, listings: newMatches };
      }
      return {
        ...search,
        matchedIds: [
          ...new Set([...search.matchedIds, ...currentMatches.map((listing) => listing.id)]),
        ],
      };
    });
    try {
      localStorage.setItem(savedSearchesStorageKey, JSON.stringify(next));
    } catch {
      setSaveSearchMessage("Saved searches are unavailable in this browser.");
    }
    setSavedSearches(next);
    if (newMatchesAlert) setSavedSearchAlert(newMatchesAlert);
  }, [config, initialAutomotiveMode, listings]);

  const activeChips: ActiveChip[] = [];
  if (query.trim()) {
    activeChips.push({
      id: "search",
      label: query.trim(),
      clear: () => {
        setQuery("");
        updateAccommodationSearch("", filters);
      },
    });
  }
  if (openNowOnly) {
    activeChips.push({ id: "open-now", label: "Open now", clear: () => setOpenNowOnly(false) });
  }
  const priceFilter = config.filters.find(
    (filter) => filter.field === "price" && filter.kind === "range",
  );
  const priceValue = priceFilter ? filters[priceFilter.id] : undefined;
  const hasPriceRange =
    Array.isArray(priceValue) && (priceValue[0] !== null || priceValue[1] !== null);
  if (priceFilter && hasPriceRange && !enabledFilters.includes(priceFilter)) {
    const [minimum, maximum] = priceValue as NumericFilterValue;
    activeChips.push({
      id: priceFilter.id,
      label: `${priceFilter.label}: ${formatRange(priceFilter, minimum, maximum)}`,
      clear: () => setFilter(priceFilter.id, priceFilter.defaultValue),
    });
  }
  enabledFilters.forEach((filter) => {
    const value = filters[filter.id];
    if (
      Array.isArray(value) &&
      value.length === 2 &&
      (filter.kind === "range" || filter.kind === "number-range")
    ) {
      const [minimum, maximum] = value as NumericFilterValue;
      if (minimum != null || maximum != null) {
        activeChips.push({
          id: filter.id,
          label: `${filter.label}: ${formatRange(filter, minimum, maximum)}`,
          clear: () => setFilter(filter.id, filter.defaultValue),
        });
      }
    } else if (isStringFilterValue(value)) {
      value.forEach((option) =>
        activeChips.push({
          id: `${filter.id}:${option}`,
          label: option,
          clear: () =>
            setFilter(
              filter.id,
              value.filter((selected) => selected !== option),
            ),
        }),
      );
    } else if (typeof value === "string" && value) {
      activeChips.push({
        id: filter.id,
        label: value,
        clear: () => setFilter(filter.id, filter.defaultValue),
      });
    }
  });
  const hasRefinements =
    Boolean(query.trim()) ||
    Boolean(nearbyCenter) ||
    openNowOnly ||
    hasPriceRange ||
    enabledFilters.some(
      (filter) =>
        JSON.stringify(filters[filter.id] ?? null) !== JSON.stringify(filter.defaultValue ?? null),
    );
  const currentSearchSignature = JSON.stringify({
    categorySlug: config.slug,
    query,
    filters,
    openNowOnly,
    automotiveMode: config.slug === "automotive" ? initialAutomotiveMode : undefined,
  });
  const currentSearchSaved = savedSearches.some(
    (search) =>
      JSON.stringify({
        categorySlug: search.categorySlug,
        query: search.query,
        filters: search.filters,
        openNowOnly: search.openNowOnly,
        automotiveMode: search.automotiveMode,
      }) === currentSearchSignature,
  );

  useEffect(() => {
    if (config.slug !== "accommodation" && config.slug !== "stay") return;
    setFilters((current) => ({
      ...current,
      type: initialAccommodationType ? [initialAccommodationType] : undefined,
      amenities: initialAccommodationAmenities.length ? initialAccommodationAmenities : undefined,
      location: initialLocation,
    }));
  }, [config.slug, initialAccommodationAmenities, initialAccommodationType, initialLocation]);

  useEffect(() => {
    if (config.slug !== "food-dining" && config.slug !== "eat") return;
    setFilters((current) => ({
      ...current,
      cuisine: initialFoodCuisines,
      "dining-style": initialFoodDiningStyles,
      "meal-type": initialFoodMealTypes,
      location: initialLocation,
    }));
  }, [
    config.slug,
    initialFoodCuisines,
    initialFoodDiningStyles,
    initialFoodMealTypes,
    initialLocation,
  ]);

  function updateFoodSearch(nextFilters: Record<string, FilterValue>, nextQuery = query) {
    if (config.slug !== "food-dining" && config.slug !== "eat") return;
    const selected = (id: string) => {
      const value = nextFilters[id];
      return isStringFilterValue(value) ? value : [];
    };
    onFoodSearchChange?.({
      query: nextQuery,
      location: typeof nextFilters.location === "string" ? nextFilters.location : undefined,
      cuisine: selected("cuisine"),
      diningStyles: selected("dining-style"),
      mealTypes: selected("meal-type"),
    });
  }

  function updateDiscoverySearch(nextFilters: Record<string, FilterValue>, nextQuery = query) {
    if (
      config.slug === "accommodation" ||
      config.slug === "stay" ||
      config.slug === "food-dining" ||
      config.slug === "eat"
    ) {
      return;
    }
    const valueFor = (id: string) => {
      const value = nextFilters[id];
      return typeof value === "string"
        ? value
        : isStringFilterValue(value)
          ? value.join(",")
          : undefined;
    };
    onDiscoverySearchChange?.({
      query: nextQuery,
      location: valueFor("location"),
      type: valueFor("category-type") ?? valueFor("service-type"),
      date: valueFor("event-date"),
      status: valueFor("event-status"),
    });
  }

  function updateAccommodationSearch(
    nextQuery = query,
    nextFilters: Record<string, FilterValue> = filters,
  ) {
    if (config.slug !== "accommodation" && config.slug !== "stay") return;
    onAccommodationSearchChange?.({
      query: nextQuery,
      location: typeof nextFilters.location === "string" ? nextFilters.location : undefined,
      type: isStringFilterValue(nextFilters.type) ? nextFilters.type[0] : undefined,
      amenities: isStringFilterValue(nextFilters.amenities) ? nextFilters.amenities : [],
    });
  }

  function setFilter(id: string, value: FilterValue) {
    const nextFilters = { ...filters, [id]: value };
    const selected = typeof value === "string" ? [value] : isStringFilterValue(value) ? value : [];
    config.filters.forEach((filter) => {
      if (
        filter.dependsOn?.filterId === id &&
        !selected.some((item) => filter.dependsOn?.values.includes(item))
      ) {
        nextFilters[filter.id] = undefined;
      }
    });
    setFilters(nextFilters);
    updateAccommodationSearch(query, nextFilters);
    updateFoodSearch(nextFilters);
    updateDiscoverySearch(nextFilters);
  }

  function clearAll() {
    setQuery("");
    setFilters(defaultFilters);
    setOpenNowOnly(false);
    setNearbyCenter(null);
    setNearbyRadiusKm(25);
    setLocationMessage("");
    updateAccommodationSearch("", defaultFilters);
    updateFoodSearch(defaultFilters, "");
    updateDiscoverySearch(defaultFilters, "");
  }

  function toggleSavedSearch() {
    const saved = readSavedSearches();
    const existing = saved.find(
      (search) =>
        JSON.stringify({
          categorySlug: search.categorySlug,
          query: search.query,
          filters: search.filters,
          openNowOnly: search.openNowOnly,
          automotiveMode: search.automotiveMode,
        }) === currentSearchSignature,
    );
    const next = existing
      ? saved.filter((search) => search.id !== existing.id)
      : [
          {
            id: `${config.slug}:${Date.now()}`,
            categorySlug: config.slug,
            label: [...activeChips.map((chip) => chip.label), config.label]
              .filter((part, index, parts) => index === 0 || part !== config.label)
              .join(" · "),
            query,
            filters: { ...filters },
            openNowOnly,
            matchedIds: sortedListings.map((listing) => listing.id),
            ...(config.slug === "automotive" ? { automotiveMode: initialAutomotiveMode } : {}),
          },
          ...saved,
        ].slice(0, 20);
    try {
      localStorage.setItem(savedSearchesStorageKey, JSON.stringify(next));
      setSavedSearches(next);
      setSaveSearchMessage(existing ? "Saved search removed." : "Saved on this device.");
    } catch {
      setSaveSearchMessage("Saved searches are unavailable in this browser.");
    }
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const intent = parseSearchIntent(query, config, filters);
    setQuery(intent.query);
    setFilters(intent.filters);
    setOpenNowOnly(intent.openNowOnly);
    setSearchFocused(false);
    updateAccommodationSearch(intent.query, intent.filters);
    updateFoodSearch(intent.filters, intent.query);
    updateDiscoverySearch(intent.filters, intent.query);
    document.getElementById("category-results")?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleNearbySearch() {
    if (nearbyCenter) {
      setNearbyCenter(null);
      setLocationMessage("");
      return;
    }
    if (!navigator.geolocation) {
      setLocationMessage("Location is unavailable in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setNearbyCenter({ latitude: coords.latitude, longitude: coords.longitude });
        setLocationMessage("");
      },
      () => setLocationMessage("Allow location access to search nearby."),
      { enableHighAccuracy: false, maximumAge: 300_000, timeout: 10_000 },
    );
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Escape") {
      setSearchFocused(false);
    } else if (event.key === "Enter" && suggestions[activeSuggestion]) {
      setSearchFocused(false);
      if (suggestionTerms.length === 1) {
        event.preventDefault();
        const selectedSuggestion = suggestions[activeSuggestion];
        setQuery(selectedSuggestion);
        updateAccommodationSearch(selectedSuggestion, filters);
        document.getElementById("category-results")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-white text-[#172a31]">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-md">
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          <a
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Discover by Lowveld Hub home"
          >
            <img src="/logo%202.jpg" alt="" className="h-9 w-9 rounded-sm object-contain" />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-sm font-semibold text-[#17242b]">Discover</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                by Lowveld Hub
              </span>
            </span>
          </a>
          <nav
            className="hidden items-center gap-6 text-sm text-[#68767a] lg:flex"
            aria-label="Main navigation"
          >
            <a href="/" className="site-nav-link hover:text-[#172a31]">
              Home
            </a>
            <a
              href="/#categories"
              aria-current="page"
              className="site-nav-link font-semibold text-[#172a31] after:scale-x-100"
            >
              Categories
            </a>
            <a href="/business-network" className="site-nav-link hover:text-[#172a31]">
              Business Network
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={listingContactHref}
              className="hidden rounded-sm bg-[#17242b] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2b414a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a58c61] sm:inline-flex"
            >
              List Your Business
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              className="grid h-10 w-10 place-items-center rounded-md border border-[#e1e7e8] text-[#34474d] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav
            className="border-t border-[#e8edef] bg-white px-6 py-4 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto grid max-w-6xl gap-1">
              {[
                ["Home", "/"],
                ["Categories", "/#categories"],
                ["Business Network", "/business-network"],
                ["List Your Business", listingContactHref],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm hover:bg-[#f5f8f8]"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <div className="container-x py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#7d898d]">
            <a className="transition-colors hover:text-[#172a31]" href="/">
              Home
            </a>
            <span aria-hidden="true">/</span>
            <a className="transition-colors hover:text-[#172a31]" href="/#categories">
              Categories
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-[#34474d]">
              {config.label}
            </span>
          </nav>
        </div>

        <section
          className="accommodation-hero-surface category-image-hero border-b border-[#e4eaea]"
          style={{ "--category-hero-image": `url("${config.heroImage}")` } as CSSProperties}
        >
          <div className="container-x py-4 md:py-5">
            <div className="max-w-3xl">
              {(config.slug === "automotive" || config.slug === "property") && (
                <nav
                  aria-label={
                    config.slug === "automotive" ? "Automotive discovery" : "Property discovery"
                  }
                  className="mb-4 inline-flex max-w-full rounded-sm border border-[#dce4e5] bg-white p-1"
                >
                  {config.slug === "automotive"
                    ? (
                        [
                          ["vehicles", "Cars for Sale"],
                          ["services", "Automotive Services"],
                        ] as const
                      ).map(([mode, label]) => (
                        <a
                          key={mode}
                          href={getAutomotiveModeHref(mode, query, activeLocationName)}
                          aria-current={initialAutomotiveMode === mode ? "page" : undefined}
                          className={`rounded-sm px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] sm:px-4 sm:text-sm ${
                            initialAutomotiveMode === mode
                              ? "bg-[#142b4a] text-white"
                              : "text-[#536267] hover:bg-[#f2f5f5] hover:text-[#17242b]"
                          }`}
                        >
                          {label}
                        </a>
                      ))
                    : (
                        [
                          ["listings", "Property for Sale / Rent"],
                          ["businesses", "Property Businesses"],
                        ] as const
                      ).map(([mode, label]) => (
                        <a
                          key={mode}
                          href={getPropertyModeHref(mode, query, activeLocationName)}
                          aria-current={initialPropertyMode === mode ? "page" : undefined}
                          className={`rounded-sm px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] sm:px-4 sm:text-sm ${
                            initialPropertyMode === mode
                              ? "bg-[#142b4a] text-white"
                              : "text-[#536267] hover:bg-[#f2f5f5] hover:text-[#17242b]"
                          }`}
                        >
                          {label}
                        </a>
                      ))}
                </nav>
              )}
              <div className="flex items-start gap-3 sm:gap-4">
                {config.icon && (
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10 text-white"
                  >
                    <CategoryIcon src={config.icon} alt="" className="h-5 w-5" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="accommodation-hero-enter flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">
                    <span className="h-px w-8 bg-current" />{" "}
                    {isAccommodation ? "Accommodation" : config.eyebrow}
                  </p>
                  <h1
                    className="accommodation-hero-enter mt-2 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl"
                    style={{ animationDelay: "90ms" }}
                  >
                    {isAccommodation ? "Accommodation in Mpumalanga" : config.headline}
                  </h1>
                  <p
                    className="accommodation-hero-enter mt-2 max-w-2xl text-sm leading-5 text-white/85 sm:text-base sm:leading-6"
                    style={{ animationDelay: "170ms" }}
                  >
                    {isAccommodation
                      ? "Discover hotels, lodges, guesthouses, apartments and unique stays across Mpumalanga."
                      : config.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="category-search" className="border-b border-[#e4eaea] bg-white">
          <div className="container-x py-4 md:py-5">
            <form
              onSubmit={submitSearch}
              className="directory-search accommodation-search mx-auto max-w-5xl rounded-lg border border-[#e0e6e7] bg-white p-2 shadow-[0_16px_38px_-30px_rgba(25,45,52,.28)]"
            >
              {searchTabs.length > 0 && (
                <div className="flex gap-1 border-b border-[#e8eded] px-2 pb-2">
                  {searchTabOptions.map(({ filter, option }) => {
                    const selected = filters[filter.id] === option;
                    return (
                      <button
                        key={`${filter.id}:${option}`}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setFilter(filter.id, option)}
                        className={`rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${selected ? "bg-[#17242b] text-white" : "text-[#68767a] hover:bg-[#edf0f0] hover:text-[#17242b]"}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="grid gap-1 md:grid-cols-[1fr_auto] md:items-center">
                <div className="relative min-w-0">
                  <div className="flex min-w-0 items-center gap-3 rounded-md px-3 py-2.5 md:px-4">
                    <Search className="h-[18px] w-[18px] shrink-0 text-[#17242b]" />
                    <span className="min-w-0 flex-1">
                      <label
                        htmlFor={searchInputId}
                        className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7d898d]"
                      >
                        {isAccommodation
                          ? "Find accommodation"
                          : config.slug === "automotive"
                            ? initialAutomotiveMode === "vehicles"
                              ? "vehicles"
                              : "automotive services"
                            : `Search ${config.label.toLocaleLowerCase()}`}
                      </label>
                      <input
                        id={searchInputId}
                        value={query}
                        onChange={(event) => {
                          setQuery(event.target.value);
                          setActiveSuggestion(0);
                          setSearchFocused(true);
                        }}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        onKeyDown={handleSearchKeyDown}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={suggestions.length > 0}
                        aria-controls={suggestionListId}
                        aria-activedescendant={
                          suggestions[activeSuggestion]
                            ? `${suggestionListId}-${activeSuggestion}`
                            : undefined
                        }
                        autoComplete="off"
                        placeholder={
                          isAccommodation
                            ? "Search places to stay or destinations"
                            : config.searchPlaceholder
                        }
                        className="mt-1 w-full bg-transparent text-sm text-[#34474d] outline-none placeholder:text-[#98a3a6]"
                      />
                    </span>
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          updateAccommodationSearch("", filters);
                        }}
                        aria-label="Clear search"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-sm text-[#68767a] hover:bg-[#f2f5f5] hover:text-[#17242b] focus-visible:outline-2 focus-visible:outline-[#17242b]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div
                      id={suggestionListId}
                      role="listbox"
                      className="absolute inset-x-1 top-full z-30 mt-1 overflow-hidden rounded-sm border border-[#dce4e5] bg-white py-1 shadow-[0_14px_34px_-22px_rgba(23,42,49,.4)] md:inset-x-2"
                    >
                      {suggestions.map((suggestion, index) => (
                        <button
                          id={`${suggestionListId}-${index}`}
                          key={suggestion}
                          type="button"
                          role="option"
                          aria-selected={activeSuggestion === index}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            setQuery(suggestion);
                            setSearchFocused(false);
                            document
                              .getElementById("category-results")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm text-[#34474d] ${activeSuggestion === index ? "bg-[#f1f5f4]" : "hover:bg-[#f7f9f9]"}`}
                        >
                          <Search className="h-3.5 w-3.5 shrink-0 text-[#788589]" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="flex h-11 items-center justify-center gap-2 rounded-sm bg-[#17242b] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a58c61]"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
            </form>
          </div>
        </section>

        <section
          id="category-results"
          className={`container-x scroll-mt-20 py-6 md:py-8 ${isAccommodation || hasDesktopFilterSidebar ? "lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-8" : ""}`}
        >
          <div
            className={`min-w-0 ${isAccommodation || hasDesktopFilterSidebar ? "lg:contents" : ""}`}
          >
            <div
              className={`mb-4 hidden flex-wrap items-center gap-2 lg:flex ${isAccommodation || hasDesktopFilterSidebar ? "lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mb-0 lg:flex-col lg:items-stretch lg:rounded-sm lg:border lg:border-[#e0e6e7] lg:bg-white lg:p-3" : ""}`}
              aria-label="Filter options"
            >
              {visibleFilters.map((filter) => (
                <details
                  key={filter.id}
                  className={`group relative ${isAccommodation || hasDesktopFilterSidebar ? "lg:w-full" : ""}`}
                >
                  <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 rounded-sm border border-[#dce4e5] bg-white px-3 text-sm text-[#34474d] transition-colors hover:border-[#aab9bc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17242b] [&::-webkit-details-marker]:hidden">
                    {filter.label}
                    <ChevronDown className="h-3.5 w-3.5 text-[#788589] transition-transform group-open:rotate-180" />
                  </summary>
                  <div
                    className={`absolute left-0 top-full z-30 mt-1 max-h-[min(65vh,28rem)] w-72 overflow-y-auto rounded-sm border border-[#dce4e5] bg-white p-3 shadow-[0_14px_34px_-22px_rgba(23,42,49,.4)] ${isAccommodation || hasDesktopFilterSidebar ? "lg:w-full" : ""}`}
                  >
                    <CategoryFilterControl
                      filter={filter}
                      listings={listings}
                      value={filters[filter.id]}
                      setValue={(value) => setFilter(filter.id, value)}
                      id={`desktop-${filter.id}`}
                    />
                  </div>
                </details>
              ))}
              <button
                type="button"
                onClick={clearAll}
                disabled={activeChips.length === 0}
                className="min-h-10 px-2 text-xs font-medium text-[#536267] underline underline-offset-4 transition-colors hover:text-[#17242b] disabled:cursor-default disabled:opacity-40"
              >
                Clear all
              </button>
            </div>
            <div
              className={`min-w-0 ${isAccommodation || hasDesktopFilterSidebar ? "lg:col-start-2 lg:row-start-1 lg:row-span-2" : ""}`}
            >
              <div className="mb-5 lg:hidden">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#dce4e5] bg-white px-3.5 text-sm font-medium text-[#34474d] shadow-sm transition-colors hover:bg-[#f7f9f9]"
                  >
                    <SlidersHorizontal className="h-4 w-4 text-[#39703b]" /> Filters
                    {activeChips.length > 0 && (
                      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#173b32] px-1 text-[10px] text-white">
                        {activeChips.length}
                      </span>
                    )}
                  </button>
                  <SheetContent
                    side="bottom"
                    className="flex max-h-[90dvh] flex-col gap-0 rounded-t-xl border-[#dce4e5] p-0"
                  >
                    <SheetHeader className="border-b border-[#e7eded] px-5 py-4 text-left">
                      <SheetTitle className="text-[#172a31]">Filters</SheetTitle>
                      <SheetDescription className="sr-only">
                        Refine {config.label.toLocaleLowerCase()} search results.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="min-h-0 flex-1 overflow-y-auto px-5">
                      <CategoryFilterPanel
                        config={config}
                        filters={visibleFilters}
                        listings={listings}
                        values={filters}
                        setFilter={setFilter}
                        clearAll={clearAll}
                        idPrefix="mobile"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-t border-[#e7eded] bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                      <button
                        type="button"
                        onClick={clearAll}
                        className="min-h-11 rounded-md border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] transition-colors hover:bg-[#f7f9f9]"
                      >
                        Clear all
                      </button>
                      <SheetClose asChild>
                        <button
                          type="button"
                          className="min-h-11 rounded-md bg-[#173b32] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#285448]"
                        >
                          Apply filters
                        </button>
                      </SheetClose>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex flex-col justify-between gap-4 border-b border-[#e5ebeb] pb-4 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight text-[#172a31] sm:text-3xl">
                    {isAccommodation
                      ? "Accommodation in Mpumalanga"
                      : config.slug === "automotive"
                        ? initialAutomotiveMode === "vehicles"
                          ? "Vehicles for sale"
                          : "Automotive services"
                        : config.slug === "food-dining" || config.slug === "eat"
                          ? "Restaurants in Mpumalanga"
                          : `Explore ${config.label}`}
                  </h2>
                  <p className="mt-1.5 text-sm text-[#68767a]">
                    {isAccommodation
                      ? sortedListings.length === 0
                        ? "Discover stays across Mpumalanga and find your next memorable base."
                        : sortedListings.length === 1
                          ? `1 stay in ${activeLocationName ?? "Mpumalanga"}`
                          : `${sortedListings.length} stays ${activeLocationName ? `in ${activeLocationName}` : "across Mpumalanga"}`
                      : config.slug === "home-construction"
                        ? "Find the right professionals for your project."
                        : config.slug === "food-dining" || config.slug === "eat"
                          ? "Discover restaurants by cuisine, dining style and location."
                          : "Find listings by category, details and location."}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {hasMappedListings && (
                    <div
                      className="inline-flex h-10 items-center rounded-sm border border-[#dce4e5] bg-white p-1"
                      aria-label="Directory results view"
                    >
                      <button
                        type="button"
                        aria-pressed={directoryView === "list"}
                        onClick={() => setDirectoryView("list")}
                        className={`inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs font-semibold transition-colors ${directoryView === "list" ? "bg-[#142b4a] text-white" : "text-[#536267] hover:bg-[#f2f5f5]"}`}
                      >
                        <List className="h-3.5 w-3.5" /> List
                      </button>
                      <button
                        type="button"
                        aria-pressed={directoryView === "map"}
                        onClick={() => setDirectoryView("map")}
                        className={`inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs font-semibold transition-colors ${directoryView === "map" ? "bg-[#142b4a] text-white" : "text-[#536267] hover:bg-[#f2f5f5]"}`}
                      >
                        <MapIcon className="h-3.5 w-3.5" /> Map
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={toggleNearbySearch}
                    aria-pressed={Boolean(nearbyCenter)}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition-colors ${nearbyCenter ? "border-[#39703b] bg-[#eff6ef] text-[#285448]" : "border-[#dce4e5] text-[#34474d] hover:bg-[#f7f9f9]"}`}
                  >
                    <MapPin className="h-4 w-4" /> {nearbyCenter ? "Clear nearby" : "Near me"}
                  </button>
                  {nearbyCenter && (
                    <label className="flex items-center gap-2 text-xs text-[#68767a]">
                      <span className="sr-only">Distance</span>
                      <select
                        value={nearbyRadiusKm}
                        onChange={(event) => setNearbyRadiusKm(Number(event.target.value))}
                        className="min-h-10 rounded-md border border-[#dce4e5] bg-white px-2 text-sm text-[#34474d]"
                        aria-label="Search radius in kilometres"
                      >
                        {[10, 25, 50, 100].map((radius) => (
                          <option key={radius} value={radius}>
                            Within {radius} km
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  <label className="flex items-center gap-2 text-xs text-[#68767a]">
                    <span className="shrink-0">Sort:</span>
                    <select
                      value={activeSortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="min-h-10 min-w-40 rounded-md border border-[#dce4e5] bg-white px-3 text-sm text-[#34474d] outline-none focus:border-[#17242b]"
                    >
                      {availableSortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              {!activeLocationName && locationsWithListings.length > 0 && (
                <nav
                  aria-label={`${config.label} by location`}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#e5ebeb] py-3 text-xs"
                >
                  <span className="font-semibold text-[#68767a]">Explore by town</span>
                  {locationsWithListings.map((location) => (
                    <a
                      key={location.slug}
                      href={`/locations/${location.slug}?category=${locationCategorySlug}`}
                      className="font-medium text-[#34474d] underline underline-offset-4 hover:text-[#28718a]"
                    >
                      {location.name}
                    </a>
                  ))}
                </nav>
              )}
              {locationMessage && (
                <p className="mt-2 text-xs text-[#a53e34]" role="status">
                  {locationMessage}
                </p>
              )}
              {savedSearchAlert && (
                <div
                  role="status"
                  className="mt-3 flex items-start justify-between gap-4 border-l-2 border-[#39703b] bg-[#f3f8f2] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#172a31]">
                      {savedSearchAlert.listings.length} new match
                      {savedSearchAlert.listings.length === 1 ? "" : "es"} for{" "}
                      {savedSearchAlert.searchLabel}
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      {savedSearchAlert.listings.slice(0, 3).map((listing) => (
                        <li key={listing.id}>
                          <a
                            href={`/accommodation/${getBusinessSlug(listing)}`}
                            className="font-medium text-[#285448] underline underline-offset-2"
                          >
                            {listing.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSavedSearchAlert(null)}
                    aria-label="Dismiss new matches"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-sm text-[#536267] hover:bg-[#e8f0e6]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {activeChips.length > 0 && (
                <div
                  className="flex flex-wrap gap-2 border-b border-[#e5ebeb] py-3"
                  aria-label="Active filters"
                >
                  {activeChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={chip.clear}
                      aria-label={`Remove ${chip.label} filter`}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-sm border border-[#dce4e5] bg-[#fbfcfc] px-2.5 text-xs text-[#536267] transition-colors hover:border-[#17242b] hover:bg-[#edf0f0]"
                    >
                      {chip.label} <X className="h-3 w-3" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="min-h-8 px-2 text-xs font-medium text-[#536267] underline underline-offset-4 hover:text-[#39703b]"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {hasMappedListings && directoryView === "map" ? (
                directoryMapPlaces.length > 0 ? (
                  <div className="mt-5">
                    <MpumalangaMap
                      places={directoryMapPlaces}
                      heading={`${config.label} in ${activeLocationName ?? "Mpumalanga"}`}
                      description={`Select a marker to explore ${config.label.toLocaleLowerCase()}.`}
                      placeLabel={
                        config.resultNoun === "restaurants"
                          ? "restaurant"
                          : config.resultNoun === "accommodation"
                            ? "place to stay"
                            : "listing"
                      }
                      placesLabel={config.resultNoun}
                    />
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-[#68767a]">
                    No matching listings have mapped coordinates.
                  </p>
                )
              ) : sortedListings.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
                  {sortedListings.map((listing) => (
                    <CategoryListingCard key={listing.id} listing={listing} config={config} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-start gap-5 border-b border-[#e5ebeb] py-8 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#172a31]">
                      {listings.length === 0 && !hasRefinements
                        ? config.emptyTitle
                        : isAccommodation
                          ? "Nothing matched your search."
                          : "No matching listings found."}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-[#68767a]">
                      {listings.length === 0 && !hasRefinements
                        ? config.emptyDescription
                        : isAccommodation
                          ? "Try changing your location or removing a filter."
                          : "Try adjusting or clearing your search and filters."}
                    </p>
                    {hasRefinements && (
                      <button
                        type="button"
                        onClick={clearAll}
                        className="mt-3 text-sm font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#39703b]"
                      >
                        {isAccommodation ? "Clear filters" : "Clear filters and view all"}
                      </button>
                    )}
                    <a
                      href="/#categories"
                      className="mt-3 inline-flex text-sm font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#39703b]"
                    >
                      Browse other categories
                    </a>
                    {config.slug === "automotive" && (
                      <a
                        href={getAutomotiveModeHref(
                          initialAutomotiveMode === "vehicles" ? "services" : "vehicles",
                          query,
                          activeLocationName,
                        )}
                        className="mt-3 inline-flex text-sm font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#39703b]"
                      >
                        {initialAutomotiveMode === "vehicles"
                          ? "Browse automotive services"
                          : "Browse vehicles for sale"}
                      </a>
                    )}
                  </div>
                  <a
                    href={
                      config.slug === "automotive" && initialAutomotiveMode === "vehicles"
                        ? "/list-your-business?category=Automotive&location=Mbombela"
                        : listingContactHref
                    }
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md bg-[#173b32] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#285448]"
                  >
                    {config.slug === "automotive" && initialAutomotiveMode === "vehicles"
                      ? "List a vehicle"
                      : listings.length === 0
                        ? "Be the first to list"
                        : "List your business"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-[#e5ebeb] bg-[#f8faf9]">
          <div className="container-x py-8 md:py-9">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
                For local businesses
              </p>
              <h2 className="max-w-xl text-xl font-semibold leading-tight text-[#172a31] sm:text-2xl">
                {config.slug === "automotive" ||
                config.slug === "food-dining" ||
                config.slug === "eat"
                  ? config.ownerHeading
                  : "Own a business? Get discovered."}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#68767a]">
                {config.slug === "automotive" ||
                config.slug === "food-dining" ||
                config.slug === "eat"
                  ? config.ownerDescription
                  : "Get your business in front of people searching for services and businesses across Mpumalanga."}
              </p>
              <a
                href={
                  config.slug === "automotive" && initialAutomotiveMode === "vehicles"
                    ? "/list-your-business?category=Automotive&location=Mbombela"
                    : listingContactHref
                }
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#17242b] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
              >
                {config.slug === "automotive" && initialAutomotiveMode === "vehicles"
                  ? "List a Vehicle"
                  : "List Your Business"}
              </a>
            </div>
          </div>
        </section>
        {categoryStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(categoryStructuredData) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(categoryBreadcrumbStructuredData) }}
        />
      </main>

      <CategoryFooter />
    </div>
  );
}

function CategoryFilterPanel({
  config,
  filters,
  listings,
  values,
  setFilter,
  clearAll,
  idPrefix,
  showHeading = false,
}: {
  config: CategoryConfig;
  filters: CategoryFilterConfig[];
  listings: CategoryListing[];
  values: Record<string, FilterValue>;
  setFilter: FilterSetter;
  clearAll: () => void;
  idPrefix: string;
  showHeading?: boolean;
}) {
  return (
    <div>
      {showHeading && (
        <div className="mb-3 flex items-center justify-between border-b border-[#e5ebeb] pb-3">
          <h2 className="text-lg font-semibold text-[#172a31]">Filters</h2>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-medium text-[#536267] underline decoration-[#b9c9cb] underline-offset-4 transition-colors hover:text-[#39703b]"
          >
            Clear all
          </button>
        </div>
      )}
      {filters
        .filter((filter) => filter.placement !== "search")
        .map((filter) => (
          <CategoryFilterControl
            key={filter.id}
            filter={filter}
            listings={listings}
            value={values[filter.id]}
            setValue={(value) => setFilter(filter.id, value)}
            id={`${idPrefix}-${filter.id}`}
          />
        ))}
    </div>
  );
}

function CategoryFilterControl({
  filter,
  listings,
  value,
  setValue,
  id,
}: {
  filter: CategoryFilterConfig;
  listings: CategoryListing[];
  value: FilterValue;
  setValue: (value: FilterValue) => void;
  id: string;
}) {
  const rawOptions = filter.optionsFromData
    ? getUniqueValues(listings, filter.field)
    : [...new Set(filter.options ?? [])];
  const options =
    filter.id === "amenities" ? [...new Set(rawOptions.map(canonicalAmenityLabel))] : rawOptions;
  const numericBounds = getNumericBounds(listings, filter.field);
  const selectedOptions =
    Array.isArray(value) && (filter.kind === "multi" || filter.kind === "tabs")
      ? (value as string[])
      : [];

  return (
    <fieldset className="border-b border-[#e8eded] py-4">
      <legend className="text-sm font-semibold text-[#34474d]">{filter.label}</legend>
      {filter.kind === "multi" && (
        <div className="mt-2 grid grid-cols-2 gap-x-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex min-h-8 cursor-pointer items-center gap-2 text-xs text-[#536267] hover:text-[#172a31]"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => setValue(toggleValue(selectedOptions, option))}
                className="h-3.5 w-3.5 shrink-0 accent-[#39703b]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
      {filter.kind === "single" && (
        <label className="mt-2 block">
          <span className="sr-only">{filter.label}</span>
          <select
            value={
              filter.datePreset && typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
                ? "Custom Date"
                : typeof value === "string"
                  ? value
                  : ""
            }
            onChange={(event) =>
              setValue(
                event.target.value === "Custom Date" && filter.datePreset
                  ? "Custom Date"
                  : event.target.value || undefined,
              )
            }
            className="h-10 w-full rounded-md border border-[#dce4e5] bg-white px-3 text-sm text-[#34474d] outline-none focus:border-[#17242b]"
          >
            <option value="">
              {filter.id === "location"
                ? "All Mpumalanga"
                : `Any ${filter.label.toLocaleLowerCase()}`}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )}
      {filter.datePreset &&
        typeof value === "string" &&
        (value === "Custom Date" || /^\d{4}-\d{2}-\d{2}$/.test(value)) && (
          <label className="mt-2 block">
            <span className="sr-only">Choose a date</span>
            <input
              type="date"
              value={/^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ""}
              onChange={(event) => setValue(event.target.value || "Custom Date")}
              className="h-10 w-full rounded-md border border-[#dce4e5] bg-white px-3 text-sm text-[#34474d] outline-none focus:border-[#17242b]"
            />
          </label>
        )}
      {filter.kind === "range" && numericBounds && numericBounds[0] < numericBounds[1] && (
        <div className="mt-3">
          <p className="text-xs text-[#536267]">
            {formatNumeric(
              filter,
              (value as NumericFilterValue | undefined)?.[0] ?? numericBounds[0],
            )}{" "}
            –{" "}
            {formatNumeric(
              filter,
              (value as NumericFilterValue | undefined)?.[1] ?? numericBounds[1],
            )}
          </p>
          <Slider
            aria-label={filter.label}
            min={numericBounds[0]}
            max={numericBounds[1]}
            step={1}
            value={(value as [number, number] | undefined) ?? numericBounds}
            onValueChange={(next) => setValue([next[0], next[1]])}
            className="mt-4"
          />
          <div className="mt-2 flex justify-between text-[10px] text-[#899699]">
            <span>{formatNumeric(filter, numericBounds[0])}</span>
            <span>{formatNumeric(filter, numericBounds[1])}</span>
          </div>
        </div>
      )}
      {filter.kind === "range" && (!numericBounds || numericBounds[0] === numericBounds[1]) && (
        <p className="mt-2 text-xs leading-relaxed text-[#899699]">
          {numericBounds
            ? `Listed at ${formatNumeric(filter, numericBounds[0])}`
            : "Available when listings include this information."}
        </p>
      )}
      {filter.kind === "number-range" && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {([0, 1] as const).map((index) => {
            const current = value as NumericFilterValue | undefined;
            return (
              <label key={index}>
                <span className="sr-only">
                  {index === 0 ? "Minimum" : "Maximum"} {filter.label}
                </span>
                <input
                  type="number"
                  min="0"
                  value={current?.[index] ?? ""}
                  placeholder={index === 0 ? "Min" : "Max"}
                  onChange={(event) => {
                    const next: NumericFilterValue = current ? [...current] : [null, null];
                    next[index] = event.target.value === "" ? null : Number(event.target.value);
                    setValue(next[0] == null && next[1] == null ? undefined : next);
                  }}
                  className="h-10 w-full min-w-0 rounded-md border border-[#dce4e5] bg-white px-2.5 text-sm text-[#34474d] outline-none focus:border-[#17242b] placeholder:text-[#98a3a6]"
                />
              </label>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}

export function CategoryListingCard({
  listing,
  config,
}: {
  listing: CategoryListing;
  config: CategoryConfig;
}) {
  if (config.slug === "property" && isPropertyListing(listing)) {
    return <PropertyListingCard listing={listing} config={config} />;
  }
  if (config.slug === "leisure-entertainment" && isEventListing(listing)) {
    return <EventListingCard listing={listing} config={config} />;
  }
  if (config.slug === "food-dining" || config.slug === "eat") {
    return <FoodDiningListingCard listing={listing} config={config} />;
  }
  if (config.slug === "accommodation" || config.slug === "stay") {
    return <AccommodationListingCard listing={listing} config={config} />;
  }
  if (
    listing.seeded &&
    [
      "professional-services",
      "home-construction",
      "health-wellness",
      "beauty",
      "property",
      "events-entertainment",
      "education-training",
      "property",
    ].includes(config.slug)
  ) {
    return <SeededCategoryBusinessCard listing={listing} config={config} />;
  }
  return <PremiumListingCard listing={listing} config={config} />;
}

function PremiumListingCard({
  listing,
  config,
  href = getListingCardHref(listing),
}: {
  listing: CategoryListing;
  config: CategoryConfig;
  href?: string;
}) {
  const isDining = config.slug === "food-dining" || config.slug === "eat";
  const cuisine = listing.cuisineTypes?.[0] ?? listing.cuisine;
  const extraDescriptor = isDining
    ? cuisine
    : listing.listingKind === "property"
      ? [listing.propertyType, listing.transactionType].filter(Boolean).join(" · ")
      : listing.listingKind === "event"
        ? listing.eventStartDate
        : listing.subcategory;
  const descriptor = [
    listing.accommodationType ??
      listing.type ??
      listing.listingType ??
      listing.propertyType ??
      listing.serviceType ??
      listing.businessType ??
      config.label,
    extraDescriptor,
  ]
    .filter((value, index, values) => Boolean(value) && values.indexOf(value) === index)
    .slice(0, 2)
    .join(" · ");
  const location =
    listing.location ?? (typeof listing.area === "string" ? listing.area : undefined);
  const showListingImage = config.slug !== "automotive";

  return (
    <article className="group relative h-full min-w-0 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none">
      <a
        href={href}
        className={`block h-full min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28718a] ${showListingImage ? "" : "border border-[#e5ebeb] bg-white p-3 transition-colors hover:border-[#c7d4d1]"}`}
      >
        {showListingImage && (
          <DiscoveryCardImage
            image={listing.image}
            alt={listing.imageAlt ?? `${listing.name}${location ? ` in ${location}` : ""}`}
            name={listing.name}
          />
        )}
        <div className={showListingImage ? "pt-3" : ""}>
          <h3 className="line-clamp-1 text-[15px] font-semibold leading-5 text-[#172a31] transition-colors group-hover:text-[#28718a]">
            {listing.listingKind === "vehicle" && listing.listingType === "Vehicles for Sale"
              ? [listing.year, listing.make, listing.model].filter(hasValue).join(" ") ||
                listing.name
              : listing.name}
          </h3>
          {descriptor && (
            <p className="mt-1 line-clamp-1 text-xs leading-4 text-[#68767a]">{descriptor}</p>
          )}
          {location && (
            <p className="mt-1 line-clamp-1 text-xs leading-4 text-[#68767a]">{location}</p>
          )}
          {listing.description && (
            <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#536267]">
              {listing.description}
            </p>
          )}
        </div>
      </a>
      <ShareListingButton name={listing.name} href={href} />
      <SavedListingButton name={listing.name} />
    </article>
  );
}

function getListingCardHref(listing: CategoryListing): string {
  const slug = getBusinessSlug(listing);
  if (listing.listingKind === "event") return `/events/${slug}`;
  if (listing.listingKind === "property") return `/properties/${slug}`;
  if (listing.listingKind === "accommodation") return `/accommodation/${slug}`;
  return `/business/${slug}`;
}

function SavedListingButton({ name }: { name: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      aria-pressed={saved}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setSaved((current) => !current);
      }}
      className={`absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-[0_1px_8px_rgba(20,30,30,.18)] transition-[transform,opacity,color,background-color] duration-200 hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172a31] motion-reduce:transition-none ${saved ? "text-[#c84f58]" : "text-[#34474d]"}`}
    >
      <Heart
        aria-hidden="true"
        className="h-[17px] w-[17px]"
        fill={saved ? "currentColor" : "none"}
        strokeWidth={1.8}
      />
    </button>
  );
}

function ShareListingButton({ name, href }: { name: string; href: string }) {
  const [status, setStatus] = useState("");

  async function shareListing(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const url = new URL(href, window.location.origin).toString();

    try {
      if (navigator.share) {
        await navigator.share({ title: name, url });
        setStatus("Listing shared.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus("Listing link copied.");
      } else {
        setStatus("Sharing is unavailable in this browser.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Could not share this listing.");
    }
  }

  return (
    <button
      type="button"
      aria-label={`Share ${name}`}
      title="Share"
      onClick={shareListing}
      className="absolute right-12 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#34474d] shadow-[0_1px_8px_rgba(20,30,30,.18)] transition-[transform,color,background-color] duration-200 hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172a31] motion-reduce:transition-none"
    >
      <Share2 aria-hidden="true" className="h-4 w-4" />
      <span className="sr-only" role="status" aria-live="polite">
        {status}
      </span>
    </button>
  );
}

export function DiscoveryCardImage({
  image,
  alt,
  name,
}: {
  image?: string;
  alt: string;
  name: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative block aspect-[4/3] overflow-hidden rounded-md bg-[#eef2f1]">
      {image && !imageFailed ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            setImageFailed(true);
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none"
        />
      ) : (
        <div aria-hidden="true" className="grid h-full place-items-center bg-[#eef2f1]">
          <span className="font-display text-3xl font-medium tracking-wide text-[#8a7655]">
            {initials || "LH"}
          </span>
        </div>
      )}
    </div>
  );
}

function isPropertyListing(listing: CategoryListing): listing is PropertyListing {
  return listing.listingKind === "property";
}

function PropertyListingCard({
  listing,
  config,
}: {
  listing: PropertyListing;
  config: CategoryConfig;
}) {
  return (
    <PremiumListingCard
      listing={listing}
      config={config}
      href={`/properties/${getBusinessSlug(listing)}`}
    />
  );
}

function isEventListing(listing: CategoryListing): listing is EventListing {
  return (
    listing.listingKind === "event" &&
    typeof listing.eventStartDate === "string" &&
    typeof listing.venue === "string"
  );
}

function EventListingCard({ listing, config }: { listing: EventListing; config: CategoryConfig }) {
  return <PremiumListingCard listing={listing} config={config} />;
}

function SeededCategoryBusinessCard({
  listing,
  config,
}: {
  listing: CategoryListing;
  config: CategoryConfig;
}) {
  return <PremiumListingCard listing={listing} config={config} />;
}

function FoodDiningListingCard({
  listing,
  config,
}: {
  listing: CategoryListing;
  config: CategoryConfig;
}) {
  return <PremiumListingCard listing={listing} config={config} />;
}

function AccommodationListingCard({
  listing,
  config,
}: {
  listing: CategoryListing;
  config: CategoryConfig;
}) {
  return <PremiumListingCard listing={listing} config={config} />;
}

function CategoryFooter() {
  return <SiteFooter />;
}

function isFilterAvailable(filter: CategoryFilterConfig, listings: CategoryListing[]): boolean {
  const values = getUniqueValues(listings, filter.field);
  if (filter.optional && values.length === 0) return false;
  if (filter.optionsFromData && values.length === 0) return false;
  if (filter.kind === "range" && getNumericBounds(listings, filter.field) === null) return false;
  return true;
}

function matchesFilter(
  listing: CategoryListing,
  filter: CategoryFilterConfig,
  value: FilterValue,
): boolean {
  if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0))
    return true;
  if (filter.datePreset && typeof value === "string") {
    const dateText = String(readField(listing, filter.field) ?? "");
    const match = dateText.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return false;
    const eventDate = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return eventDate.getTime() === new Date(`${value}T00:00:00`).getTime();
    }
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + mondayOffset);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const weekendStart = new Date(today);
    weekendStart.setDate(today.getDate() + ((6 - day + 7) % 7));
    const weekendEnd = new Date(weekendStart);
    weekendEnd.setDate(weekendStart.getDate() + 1);
    switch (value.toLocaleLowerCase()) {
      case "today":
        return eventDate.getTime() === today.getTime();
      case "this week":
        return eventDate >= weekStart && eventDate <= weekEnd;
      case "this weekend":
        return eventDate >= weekendStart && eventDate <= weekendEnd;
      case "this month":
        return (
          eventDate.getFullYear() === today.getFullYear() &&
          eventDate.getMonth() === today.getMonth()
        );
    }
    return true;
  }
  if (filter.id === "event-status" && typeof value === "string") {
    const eventStatus = String(readField(listing, filter.field) ?? "")
      .toLocaleLowerCase()
      .replaceAll("-", " ");
    if (eventStatus) return eventStatus === value.toLocaleLowerCase();
    const eventDate = Date.parse(String(readField(listing, "eventStartDate") ?? ""));
    if (!Number.isFinite(eventDate)) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const normalized = value.toLocaleLowerCase();
    return normalized === "upcoming"
      ? eventDate >= today.getTime()
      : normalized === "past"
        ? eventDate < today.getTime()
        : false;
  }
  if (filter.id === "rating" && typeof value === "string") {
    const threshold = Number.parseFloat(value);
    const rating = Number(readField(listing, filter.field));
    return Number.isFinite(rating) && rating >= threshold;
  }
  const listingValues = flattenValues(readField(listing, filter.field));
  if (filter.kind === "multi") {
    const selectedValues = value as string[];
    const matchingValues =
      filter.id === "amenities" ? listingValues.map(canonicalAmenityLabel) : listingValues;
    return filter.match === "all"
      ? selectedValues.every((selected) => matchingValues.includes(selected))
      : selectedValues.some((selected) => matchingValues.includes(selected));
  }
  if (filter.field === "location" && typeof value === "string") {
    const selectedLocation = findDiscoveryLocation(value);
    if (selectedLocation) {
      return listingValues.some(
        (listingLocation) => findDiscoveryLocation(listingLocation)?.slug === selectedLocation.slug,
      );
    }
  }
  if (filter.kind === "range") {
    const [minimum, maximum] = value as NumericFilterValue;
    const numericValues = listingValues.map(Number).filter(Number.isFinite);
    return numericValues.some(
      (number) => (minimum == null || number >= minimum) && (maximum == null || number <= maximum),
    );
  }
  if (filter.kind === "number-range") {
    const [minimum, maximum] = value as NumericFilterValue;
    const numericValues = listingValues.map(Number).filter(Number.isFinite);
    return numericValues.some(
      (number) => (minimum == null || number >= minimum) && (maximum == null || number <= maximum),
    );
  }
  return listingValues.includes(String(value));
}

function canonicalAmenityLabel(value: string) {
  const normalized = value
    .trim()
    .toLocaleLowerCase()
    .replace(/[\s-]+/g, " ");
  if (/\bwi ?fi\b|wireless internet/.test(normalized)) return "Wi-Fi";
  if (/parking/.test(normalized)) return "Parking";
  if (/pool/.test(normalized)) return "Swimming pool";
  if (/breakfast/.test(normalized)) return "Breakfast";
  if (/air conditioning|aircon/.test(normalized)) return "Air conditioning";
  if (/restaurant|dining/.test(normalized)) return "Restaurant";
  if (/garden/.test(normalized)) return "Garden";
  return value.trim();
}

function compareListings(
  first: CategoryListing,
  second: CategoryListing,
  sortId: string,
  query: string,
  config: CategoryConfig,
): number {
  const option = config.sortOptions.find((candidate) => candidate.id === sortId);
  if (!option?.field) {
    if (sortId !== "relevance" || !query.trim()) return 0;
    return relevanceScore(second, query, config) - relevanceScore(first, query, config);
  }
  const firstValue = readField(first, option.field);
  const secondValue = readField(second, option.field);
  const direction = option.direction === "desc" ? -1 : 1;
  if (typeof firstValue === "number" && typeof secondValue === "number")
    return (firstValue - secondValue) * direction;
  return (
    String(firstValue ?? "").localeCompare(String(secondValue ?? ""), undefined, {
      numeric: true,
    }) * direction
  );
}

function distanceFromCenter(
  listing: CategoryListing,
  center: { latitude: number; longitude: number },
): number | null {
  if (listing.latitude == null || listing.longitude == null) return null;
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(listing.latitude - center.latitude);
  const longitudeDelta = radians(listing.longitude - center.longitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(radians(center.latitude)) *
      Math.cos(radians(listing.latitude)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function relevanceScore(listing: CategoryListing, query: string, config: CategoryConfig): number {
  const text = config.searchFields
    .flatMap((field) => flattenValues(readField(listing, field)))
    .join(" ")
    .toLocaleLowerCase();
  return query
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter((word) => text.includes(word)).length;
}

function getNumericBounds(listings: CategoryListing[], field: string): [number, number] | null {
  const values = listings.flatMap((listing) =>
    flattenValues(readField(listing, field)).map(Number).filter(Number.isFinite),
  );
  if (values.length === 0) return null;
  return [Math.min(...values), Math.max(...values)];
}

function getUniqueValues(listings: CategoryListing[], field: string): string[] {
  return [...new Set(listings.flatMap((listing) => flattenValues(readField(listing, field))))].sort(
    (a, b) => a.localeCompare(b),
  );
}

function readField(listing: CategoryListing, field: string): unknown {
  return listing[field];
}

function flattenValues(value: unknown): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value.flatMap(flattenValues);
  if (typeof value === "object") return [];
  return [String(value)];
}

function hasValue(value: unknown): boolean {
  return value != null && value !== "" && (!Array.isArray(value) || value.length > 0);
}

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function formatNumeric(filter: CategoryFilterConfig, value: number): string {
  if (filter.unit === "ZAR") return formatCurrency(value);
  return `${new Intl.NumberFormat("en-ZA").format(value)}${filter.unit ? ` ${filter.unit}` : ""}`;
}

function formatRange(
  filter: CategoryFilterConfig,
  minimum: number | null,
  maximum: number | null,
): string {
  return `${minimum == null ? "Any" : formatNumeric(filter, minimum)} – ${maximum == null ? "Any" : formatNumeric(filter, maximum)}`;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);
}
