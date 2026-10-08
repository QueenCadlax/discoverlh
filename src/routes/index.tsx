import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Boxes,
  Cloud,
  CloudRain,
  CloudSun,
  Handshake,
  LoaderCircle,
  LocateFixed,
  MapPin,
  Search,
  Store,
  SunMedium,
  type LucideIcon,
} from "lucide-react";

import { CategoryCard } from "@/components/DiscoverCategory";
import { MobileSiteMenu } from "@/components/MobileSiteMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { CategoryListingCard, DiscoveryCardImage } from "@/components/CategoryDiscoveryPage";
import { MpumalangaMap } from "@/components/MpumalangaMap";
import {
  categoryConfigs,
  getCategoryListings,
  getBusinessSlug,
  isPublishedListing,
  primaryDiscoveryCategorySlugs,
  searchTextMatches,
  type CategorySlug,
} from "@/lib/category-discovery";
import { locationDiscovery, locationSlug, mpumalangaLocations } from "@/lib/location-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";
import {
  getDefaultWeatherTown,
  getWeatherForCoordinates,
  getWeatherForTown,
  type WeatherSnapshot,
} from "@/lib/weather";

const homepageTitle = "Discover by Lowveld Hub | Mpumalanga Directory";
const homepageDescription =
  "Discover by Lowveld Hub is a local directory for finding businesses, services and places across Mpumalanga, published by Lowveld Hub.";
const homepageUrl = getPublicUrl("/");
const lowveldHubOrganizationId = "https://lowveldhub.co.za/#organization";
const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": lowveldHubOrganizationId,
      name: "Lowveld Hub",
      url: "https://lowveldhub.co.za/",
      logo: getPublicUrl("/lowveldhublogo.png"),
    },
    {
      "@type": "WebSite",
      "@id": `${homepageUrl}#website`,
      name: "Discover by Lowveld Hub",
      url: homepageUrl,
      description: homepageDescription,
      publisher: { "@id": lowveldHubOrganizationId },
    },
  ],
};

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (
      !element ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.revealed = "true";
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      data-scroll-reveal="true"
      className={className}
      style={{ "--scroll-reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Home,
  head: () => {
    const canonical = getPublicUrl("/");
    const socialImage = getPublicUrl("/logo%202.jpg");
    return {
      meta: [
        { title: homepageTitle },
        { name: "description", content: homepageDescription },
        { name: "robots", content: "index,follow" },
        { property: "og:site_name", content: "Discover by Lowveld Hub" },
        { property: "og:title", content: homepageTitle },
        { property: "og:description", content: homepageDescription },
        { property: "og:type", content: "website" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        ...(socialImage ? [{ property: "og:image", content: socialImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: homepageTitle },
        { name: "twitter:description", content: homepageDescription },
        ...(socialImage ? [{ name: "twitter:image", content: socialImage }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
});

type Shortcut = {
  slug: CategorySlug;
  terms: string[];
};

const listingContactHref = "/list-your-business";

const categorySearchTerms: Record<
  (typeof primaryDiscoveryCategorySlugs)[number] | "property",
  string[]
> = {
  stay: ["hotel", "lodge", "guesthouse", "guest house", "resort", "b&b", "camp", "accommodation"],
  eat: ["restaurant", "cafe", "café", "food", "dining", "takeaway", "brewery"],
  shop: ["mall", "market", "boutique", "store", "shopping"],
  health: ["doctor", "dentist", "clinic", "pharmacy", "health", "wellness"],
  professional: ["lawyer", "accountant", "auditor", "consultant", "professional", "business"],
  "home-property": [
    "plumber",
    "electrician",
    "builder",
    "cleaning",
    "landscaping",
    "roofing",
    "painting",
    "air conditioning",
    "maintenance",
    "security",
    "home service",
  ],
  property: ["property", "real estate", "estate agent", "house for sale", "home for sale"],
  automotive: ["mechanic", "car", "tyres", "towing", "automotive", "auto electrical"],
  "personal-beauty": ["beauty", "salon", "barber", "spa", "massage", "fitness"],
  "travel-transport": ["airport transfer", "shuttle", "car hire", "tour operator", "travel"],
  "leisure-entertainment": [
    "leisure",
    "entertainment",
    "casino",
    "attraction",
    "water park",
    "things to do",
    "activities",
  ],
};

const shortcuts: Shortcut[] = primaryDiscoveryCategorySlugs.map((slug) => ({
  slug,
  terms: categorySearchTerms[slug],
}));
shortcuts.push({ slug: "property", terms: categorySearchTerms.property });

const searchSuggestions = [
  {
    label: "Hotels and lodges",
    category: "Accommodation",
    terms: ["hotel", "lodge", "accommodation"],
  },
  { label: "Restaurants and cafés", category: "Restaurants", terms: ["restaurant", "cafe"] },
  { label: "Health and wellness", category: "Health", terms: ["doctor", "clinic"] },
  { label: "Lawyers and accountants", category: "Professional", terms: ["lawyer", "accountant"] },
  {
    label: "Plumbers and home services",
    category: "Home Services",
    terms: ["plumber", "electrician", "home service"],
  },
  {
    label: "Property across Mpumalanga",
    category: "Property",
    terms: ["property", "house for sale", "home for sale", "property for rent"],
  },
  { label: "Mechanics and tyres", category: "Automotive", terms: ["mechanic", "tyres"] },
  { label: "Salons and beauty", category: "Personal & Beauty", terms: ["salon", "beauty"] },
  {
    label: "Leisure and entertainment",
    category: "Leisure & Entertainment",
    terms: ["casino", "water park", "attraction", "things to do"],
  },
  { label: "Malls and markets", category: "Shop", terms: ["mall", "market"] },
  {
    label: "Shuttles and transfers",
    category: "Travel & Transport",
    terms: ["shuttle", "transfer"],
  },
] as const;

const discoveryCategorySlugs = new Set<CategorySlug>(primaryDiscoveryCategorySlugs);

const configuredSearchSuggestions = Object.values(categoryConfigs)
  .filter((config) => discoveryCategorySlugs.has(config.slug))
  .flatMap((config) => [
    { label: config.label, category: config.label, terms: [config.label] },
    ...config.filters
      .filter((filter) => config.searchFields.includes(filter.field))
      .flatMap((filter) =>
        (filter.options ?? []).map((option) => ({
          label: option,
          category: config.label,
          terms: [option],
        })),
      ),
  ]);

const locationSearchSuggestions = locationDiscovery.flatMap(({ name, alternateNames }) =>
  [name, ...alternateNames].map((location) => ({
    label: location,
    category: "Location",
    terms: [name],
  })),
);

const allSearchSuggestions = [
  ...searchSuggestions,
  ...configuredSearchSuggestions,
  ...locationSearchSuggestions,
].filter(
  (suggestion, index, suggestions) =>
    suggestions.findIndex(
      (candidate) =>
        candidate.label.toLocaleLowerCase() === suggestion.label.toLocaleLowerCase() &&
        candidate.category === suggestion.category,
    ) === index,
);

function getSuggestions(value: string) {
  const query = value.trim().toLocaleLowerCase();
  if (query.length < 2) return [];
  return allSearchSuggestions
    .filter(
      ({ label, category, terms }) =>
        label.toLocaleLowerCase().includes(query) ||
        category.toLocaleLowerCase().includes(query) ||
        terms.some((term) => term.includes(query) || query.includes(term)),
    )
    .slice(0, 5);
}

function normalizeQuery(value: string) {
  return value
    .replace(/\b(?:i need|looking for|find me|find|search for|best)\s+/i, "")
    .replace(/^(?:a|an|the)\s+/i, "")
    .trim();
}

function containsKnownLocation(value: string) {
  const query = value.toLocaleLowerCase();
  return locationDiscovery.some(({ name, alternateNames }) =>
    [name, ...alternateNames].some((locationName) =>
      query.includes(locationName.toLocaleLowerCase()),
    ),
  );
}

function getIntent(value: string, selectedLocation: string) {
  const lowerQuery = value.toLocaleLowerCase();
  const matchingLocation = locationDiscovery.find(({ name, alternateNames }) =>
    [name, ...alternateNames].some((town) => lowerQuery.includes(town.toLocaleLowerCase())),
  );
  let query = value.trim();
  if (matchingLocation) {
    const matchedName = [matchingLocation.name, ...matchingLocation.alternateNames]
      .filter((town) => lowerQuery.includes(town.toLocaleLowerCase()))
      .sort((first, second) => second.length - first.length)[0];
    if (matchedName) {
      query = query.replace(
        new RegExp(matchedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
        " ",
      );
    }
  }
  query = query
    .replace(/\b(?:in|near)\s+me\b/gi, " ")
    .replace(/\b(?:in|near)\s*$/i, " ")
    .replace(/[\s,.:;-]+$/g, " ");
  query = normalizeQuery(query);
  const normalized = query.toLocaleLowerCase();
  const propertyIntent =
    /\b(?:property|real estate|estate agent|house|home|apartment|townhouse|farm|land for sale|house for sale|home for sale|house to rent|home to rent|property for sale|property for rent)\b/i.test(
      normalized,
    );
  const category = propertyIntent
    ? undefined
    : (shortcuts.find(({ slug, terms }) => {
        const label = categoryConfigs[slug].label;
        return (
          normalized.includes(label.toLocaleLowerCase()) ||
          terms.some((term) => normalized.includes(term))
        );
      }) ??
      shortcuts.find(({ slug }) => {
        const label = categoryConfigs[slug].label;
        const matchedSuggestion = allSearchSuggestions.find(
          (suggestion) =>
            suggestion.category !== "Location" &&
            suggestion.label.length >= 3 &&
            normalized.includes(suggestion.label.toLocaleLowerCase()),
        );
        return label === matchedSuggestion?.category;
      }));

  return {
    query,
    category,
    propertyIntent,
    location: matchingLocation?.name ?? selectedLocation,
    automotiveMode:
      category?.slug === "automotive" &&
      /\b(?:vehicles? for sale|cars? for sale|used cars?|dealership inventory)\b/i.test(value)
        ? "vehicles"
        : "services",
  };
}

function Home() {
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Mpumalanga");
  const [submittedSearch, setSubmittedSearch] = useState<{
    query: string;
    location: string;
  } | null>(null);

  const search = (value: string) => {
    const intent = getIntent(value, location);
    setQuery(value);
    setLocation(intent.location);
    if (intent.propertyIntent) {
      void navigate({
        to: "/property",
        search: {
          q: intent.query || undefined,
          location: intent.location === "Mpumalanga" ? undefined : intent.location,
        },
      });
      return;
    }
    if (intent.category?.slug) {
      void navigate({
        to: "/categories/$category",
        params: { category: intent.category.slug },
        search: {
          q: intent.query,
          mode: intent.category.slug === "automotive" ? intent.automotiveMode : undefined,
          location: intent.location === "Mpumalanga" ? undefined : intent.location,
          type: undefined,
          amenities: undefined,
          cuisine: undefined,
          style: undefined,
          meal: undefined,
        },
      });
      return;
    }
    setSubmittedSearch({ query: intent.query, location: intent.location });
    window.setTimeout(() => {
      document.getElementById("directory-results")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const clearSearch = () => {
    setQuery("");
    setLocation("Mpumalanga");
    setSubmittedSearch(null);
  };

  const submitSearch = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    search(query);
  };

  return (
    <div className="min-h-screen bg-white text-[#17242b]">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homepageStructuredData) }}
      />
      <WeatherWidget />
      <Hero
        query={query}
        setQuery={setQuery}
        location={location}
        setLocation={setLocation}
        onSearch={submitSearch}
        onSearchQuery={search}
      />
      <CategoryShortcuts />
      <FeaturedPartnersSection />
      <MpumalangaMap
        showZoomControls={false}
        showTownArrows={false}
        onSelectTown={(townName) => {
          void navigate({
            to: "/locations/$location",
            params: { location: locationSlug(townName) },
            search: { category: undefined },
          });
        }}
      />
      <BusinessNetworkSection />
      {submittedSearch && (
        <ScrollReveal>
          <SearchResults
            query={submittedSearch.query}
            location={submittedSearch.location}
            onClear={clearSearch}
          />
        </ScrollReveal>
      )}
      <ScrollReveal>
        <ForBusiness />
      </ScrollReveal>
      <ScrollReveal>
        <SiteFooter />
      </ScrollReveal>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="container-x flex h-[68px] items-center justify-between gap-3">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5"
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
          className="hidden items-center gap-7 text-sm text-[#59656a] md:flex"
          aria-label="Main navigation"
        >
          <a href="#top" aria-current="page" className="site-nav-link font-medium text-[#17242b]">
            Home
          </a>
          <a href="#categories" className="site-nav-link hover:text-[#17242b]">
            Categories
          </a>
          <a href="/property" className="site-nav-link hover:text-[#17242b]">
            Property
          </a>
          <a
            href="/categories/automotive?mode=vehicles"
            className="site-nav-link hover:text-[#17242b]"
          >
            Auto
          </a>
          <a href="/business-network" className="site-nav-link hover:text-[#17242b]">
            Business Network
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={listingContactHref}
            className="nav-cta hidden rounded-sm bg-[#17242b] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2b414a] sm:inline-flex"
          >
            List Your Business
          </a>
          <MobileSiteMenu />
        </div>
      </div>
    </header>
  );
}

function Hero({
  query,
  setQuery,
  location,
  setLocation,
  onSearch,
  onSearchQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  onSearch: (event?: FormEvent<HTMLFormElement>) => void;
  onSearchQuery: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const inputId = useId();
  const listId = useId();
  const suggestions = focused ? getSuggestions(query) : [];

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Escape") {
      setFocused(false);
    } else if (event.key === "Enter" && suggestions[activeSuggestion]) {
      event.preventDefault();
      setFocused(false);
      if (containsKnownLocation(query)) {
        onSearch();
      } else {
        onSearchQuery(suggestions[activeSuggestion].label);
      }
    }
  };

  return (
    <section id="top" className="relative overflow-hidden bg-[#f8f7f3] pt-0 text-[#17242b]">
      <div className="hero-landscape absolute inset-0 md:inset-y-0 md:left-auto md:right-0 md:w-[72%]" />
      <div className="hero-image-overlay absolute inset-0" />
      <div className="container-x relative flex min-h-[300px] items-end pb-5 pt-6 sm:min-h-[330px] md:min-h-[320px] md:items-center md:py-6">
        <div className="w-full max-w-[800px]">
          <div className="max-w-[590px] text-white md:text-[#17242b]">
            <p className="homepage-hero-enter flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e2c99a] md:text-[#8a7655]">
              <span className="h-px w-7 bg-current" /> Local discovery · Mpumalanga
            </p>
            <h1
              className="homepage-hero-enter mt-3 font-display text-[2rem] font-medium leading-[1] sm:text-[2.5rem] lg:text-[2.75rem]"
              style={{ animationDelay: "70ms" }}
            >
              Discover Mpumalanga
            </h1>
            <p
              className="homepage-hero-enter mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base sm:leading-7 md:text-[#58646a]"
              style={{ animationDelay: "140ms" }}
            >
              Find places, businesses, services and experiences worth discovering.
            </p>
            <p className="mt-2 text-xs leading-5 text-white/75 md:text-[#687378]">
              Discover is a local directory from{" "}
              <a
                href="https://lowveldhub.co.za/"
                className="underline underline-offset-2 hover:text-white md:hover:text-[#17242b]"
              >
                Lowveld Hub
              </a>
              .
            </p>
          </div>
          <form
            id="directory-search"
            onSubmit={onSearch}
            className="homepage-hero-enter directory-search hero-search mt-5 grid w-full grid-cols-[minmax(0,1fr)_auto] gap-1 rounded-md border border-white/50 bg-white p-1.5 shadow-[0_18px_48px_-30px_rgba(0,0,0,.42)] md:grid-cols-[1.5fr_0.78fr_auto] md:items-center md:gap-0 md:p-1.5"
            style={{ animationDelay: "210ms" }}
          >
            <div className="relative col-span-2 min-w-0 md:col-span-1">
              <label
                htmlFor={inputId}
                className="flex min-w-0 items-center gap-3 px-3 py-2.5 md:px-4 md:py-3"
              >
                <Search className="h-[17px] w-[17px] shrink-0 text-[#17242b]" />
                <span className="min-w-0 flex-1">
                  <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#687378]">
                    What are you looking for?
                  </span>
                  <input
                    id={inputId}
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActiveSuggestion(0);
                      setFocused(true);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={handleKeyDown}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={suggestions.length > 0}
                    aria-controls={listId}
                    aria-activedescendant={
                      suggestions[activeSuggestion] ? `${listId}-${activeSuggestion}` : undefined
                    }
                    autoComplete="off"
                    placeholder="Search businesses, services or categories"
                    className="w-full bg-transparent text-sm text-[#17242b] outline-none placeholder:text-[#858d90]"
                  />
                </span>
              </label>
              {suggestions.length > 0 && (
                <div
                  id={listId}
                  role="listbox"
                  className="absolute inset-x-1 top-full z-30 mt-1 overflow-hidden rounded-md border border-[#e1e3e1] bg-white py-1 shadow-[0_16px_32px_-20px_rgba(20,30,30,.45)] md:inset-x-0"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      id={`${listId}-${index}`}
                      key={suggestion.label}
                      type="button"
                      role="option"
                      aria-selected={activeSuggestion === index}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setFocused(false);
                        if (containsKnownLocation(query)) {
                          onSearch();
                        } else {
                          onSearchQuery(suggestion.label);
                        }
                      }}
                      className={`flex min-h-12 w-full items-center justify-between gap-4 px-4 text-left ${activeSuggestion === index ? "bg-[#edf0f0]" : "hover:bg-[#f6f7f6]"}`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Search className="h-4 w-4 shrink-0 text-[#687378]" />
                        <span className="truncate text-sm font-medium text-[#17242b]">
                          {suggestion.label}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-[#687378]">{suggestion.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <label className="flex min-w-0 items-center gap-2 border-t border-[#e6e5e0] px-2 py-2.5 md:gap-3 md:border-l md:border-t-0 md:px-4 md:py-3">
              <MapPin className="h-[17px] w-[17px] shrink-0 text-[#17242b]" />
              <span className="min-w-0 flex-1">
                <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#687378]">
                  Choose a town or area
                </span>
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="w-full appearance-none bg-transparent text-sm text-[#27353b] outline-none"
                >
                  <option value="Mpumalanga">All Mpumalanga</option>
                  {mpumalangaLocations.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
              </span>
            </label>
            <button
              type="submit"
              className="group search-submit flex h-10 items-center justify-center gap-2 rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a] active:scale-[0.98] md:h-11 md:px-6"
            >
              Search{" "}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function WeatherWidget() {
  const [selectedTown, setSelectedTown] = useState(getDefaultWeatherTown());
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMbombelaFallback = useCallback(async (message: string) => {
    try {
      const fallback = await getWeatherForTown(getDefaultWeatherTown());
      setWeather(fallback);
      setSelectedTown(getDefaultWeatherTown());
      setError(message);
    } catch (fallbackError) {
      setWeather(null);
      setSelectedTown(getDefaultWeatherTown());
      setError("Weather is temporarily unavailable. Please try again later.");
      console.error("Mbombela weather fallback failed", {
        errorType: fallbackError instanceof Error ? fallbackError.name : "UnknownError",
      });
    }
  }, []);

  const loadWeather = useCallback(
    async (townName: string) => {
      setLoading(true);
      setError(null);
      try {
        const next = await getWeatherForTown(townName);
        setWeather(next);
        setSelectedTown(townName);
      } catch {
        await loadMbombelaFallback("Weather is temporarily unavailable. Showing Mbombela instead.");
      } finally {
        setLoading(false);
      }
    },
    [loadMbombelaFallback],
  );

  useEffect(() => {
    void loadWeather(getDefaultWeatherTown());
  }, [loadWeather]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Location access is not available in this browser.");
      return;
    }

    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const next = await getWeatherForCoordinates(
            coords.latitude,
            coords.longitude,
            "My location",
          );
          setWeather(next);
          setSelectedTown(getDefaultWeatherTown());
        } catch {
          await loadMbombelaFallback(
            "Your location weather could not be loaded. Showing Mbombela instead.",
          );
        } finally {
          setLoading(false);
        }
      },
      async () => {
        try {
          await loadMbombelaFallback(
            "Location access was denied. Showing Mbombela weather instead.",
          );
        } finally {
          setLoading(false);
        }
      },
      { enableHighAccuracy: false, maximumAge: 30 * 60 * 1000, timeout: 15_000 },
    );
  };

  const weatherIcon = (() => {
    if (!weather) {
      return CloudSun;
    }
    if (weather.conditionCode === 0 || weather.conditionCode === 1 || weather.conditionCode === 2) {
      return SunMedium;
    }
    if (weather.conditionCode >= 61 && weather.conditionCode <= 82) {
      return CloudRain;
    }
    if (weather.conditionCode >= 95) {
      return Cloud;
    }
    return CloudSun;
  })();

  const WeatherIcon = weatherIcon;

  return (
    <section className="relative z-30 mt-[68px] h-12 border-b border-white/10 bg-[#142b4a] text-white">
      <div className="container-x flex h-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5" aria-live="polite">
          {loading ? (
            <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-[#d8c49e]" />
          ) : (
            <WeatherIcon className="h-4 w-4 shrink-0 text-[#d8c49e]" aria-hidden="true" />
          )}
          <span className="truncate text-xs font-medium sm:text-sm">
            {weather?.locationName ?? selectedTown}
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          {weather ? (
            <span className="flex shrink-0 items-center gap-2 text-xs sm:text-sm">
              <strong className="text-sm font-semibold sm:text-base">
                {Math.round(weather.temperature)}°C
              </strong>
              <span className="max-w-[72px] truncate text-[10px] text-white/75 sm:max-w-none sm:text-sm">
                {weather.condition}
              </span>
              <span className="hidden text-white/60 md:inline">
                H {Math.round(weather.high)}° · L {Math.round(weather.low)}°
              </span>
            </span>
          ) : (
            <span className="truncate text-xs text-white/70">
              {error ?? (loading ? "Loading weather..." : "Weather unavailable")}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <label>
            <span className="sr-only">Select weather location</span>
            <select
              value={selectedTown}
              onChange={(event) => void loadWeather(event.target.value)}
              className="h-8 max-w-[126px] rounded-sm border border-white/20 bg-white/10 px-2 text-xs text-white outline-none focus-visible:ring-2 focus-visible:ring-[#d8c49e] sm:max-w-[160px]"
            >
              {mpumalangaLocations.map((town) => (
                <option key={town} value={town} className="bg-white text-[#17242b]">
                  {town}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleUseMyLocation}
            aria-label="Use my location for weather"
            title="Use my location"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-sm border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8c49e]"
          >
            <LocateFixed className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryShortcuts() {
  return (
    <section id="categories" className="category-rail-surface relative z-10">
      <div className="container-x py-8 md:py-10">
        <ScrollReveal className="mb-5">
          <h2 className="font-display text-2xl font-medium text-[#17242b] md:text-3xl">
            Explore by category
          </h2>
          <p className="mt-2 text-sm text-[#687378]">
            Find the right business, service or place for what you need.
          </p>
        </ScrollReveal>
        <div className="grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {shortcuts.map((shortcut, index) => {
            const category = categoryConfigs[shortcut.slug];
            return (
              <ScrollReveal
                key={shortcut.slug}
                className="h-full min-w-0 w-full max-w-[270px]"
                delay={Math.min(index * 40, 280)}
              >
                <CategoryCard
                  href={shortcut.slug === "property" ? "/property" : `/categories/${shortcut.slug}`}
                  label={category.label}
                  description={category.shortDescription ?? category.description}
                  icon={category.icon}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedPartnerImage({
  name,
  image,
  fit,
}: {
  name: string;
  image: string;
  fit: "cover" | "contain";
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
    <div className="relative aspect-[16/10] overflow-hidden bg-[#edf3f4]">
      {image && !imageFailed ? (
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className={`absolute inset-0 h-full w-full ${
            fit === "contain" ? "object-contain p-8" : "object-cover"
          }`}
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid h-full place-items-center bg-[linear-gradient(135deg,#eef2f1,#e4eceb)]"
        >
          <span className="font-display text-4xl font-medium tracking-wide text-[#8a7655]">
            {initials || "LH"}
          </span>
        </div>
      )}
    </div>
  );
}

function FeaturedPartnersSection() {
  const featuredItems = [
    (() => {
      const stay = getCategoryListings("accommodation").find(
        (listing) => listing.name === "The Capital Mbombela",
      );
      if (!stay) return null;
      return {
        name: stay.name,
        category: "Accommodation",
        location: stay.location ?? "Mbombela",
        image: stay.image ?? "",
        imageFit: "cover" as const,
        href: `/accommodation/${getBusinessSlug(stay)}`,
        summary: "A refined stay in the heart of Mbombela, ideal for exploring the Lowveld.",
        cta: "Explore The Capital",
        secondary: stay.bookingUrl
          ? {
              label: "Check availability",
              href: stay.bookingUrl,
            }
          : undefined,
      };
    })(),
    (() => {
      const dining = getCategoryListings("food-dining").find(
        (listing) => listing.name === "Pappas Kitchen",
      );
      if (!dining) return null;
      return {
        name: dining.name,
        category: "Restaurants",
        location: dining.location ?? "Mbombela",
        image: dining.image ?? "",
        imageFit: "cover" as const,
        href: `/business/${getBusinessSlug(dining)}`,
        summary:
          "Wood-fired pizza, Italian comfort food and a local favourite serving Mbombela since 1989.",
        cta: "Explore Pappas Kitchen",
        secondary: dining.menuUrl
          ? {
              label: "View Menu",
              href: dining.menuUrl,
            }
          : undefined,
      };
    })(),
    (() => {
      const mall = getCategoryListings("shop").find((listing) => listing.id === "riverside-mall");
      if (!mall) return null;
      return {
        name: mall.name,
        category: "Shop",
        location: mall.location ?? "Mbombela",
        image: mall.image ?? "",
        imageFit: "cover" as const,
        href: `/business/${getBusinessSlug(mall)}`,
        summary: mall.description ?? "Discover Riverside Mall in Mbombela.",
        cta: "Explore Riverside Mall",
        secondary: mall.website ? { label: "Mall website", href: mall.website } : undefined,
      };
    })(),
    (() => {
      const mall = getCategoryListings("shop").find((listing) => listing.id === "ilanga-mall");
      if (!mall) return null;
      return {
        name: mall.name,
        category: "Shop",
        location: mall.location ?? "Mbombela",
        image: mall.image ?? "",
        imageFit: "contain" as const,
        href: `/business/${getBusinessSlug(mall)}`,
        summary: mall.description ?? "Discover I’Langa Mall in Mbombela.",
        cta: "Explore I’Langa Mall",
        secondary: mall.website ? { label: "Mall website", href: mall.website } : undefined,
      };
    })(),
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));
  const pappasFeaturedImage = featuredItems.find((item) => item.name === "Pappas Kitchen")?.image;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (!pappasFeaturedImage) return;
    const image = new Image();
    image.decoding = "async";
    image.src = pappasFeaturedImage;
  }, [pappasFeaturedImage]);

  useEffect(() => {
    if (featuredItems.length < 2) return;
    const intervalId = window.setInterval(() => {
      if (!isPaused) {
        setActiveIndex((current) => (current + 1) % featuredItems.length);
      }
    }, 6000);
    return () => window.clearInterval(intervalId);
  }, [featuredItems.length, isPaused]);

  if (!featuredItems.length) return null;

  const activeItem = featuredItems[activeIndex];

  return (
    <section className="relative border-t border-[#edf0f0] bg-white">
      <div className="container-x py-8 md:py-10">
        <ScrollReveal>
          <div className="mx-auto max-w-[1040px]">
            <h2 className="font-display text-2xl font-medium text-[#17242b] md:text-3xl">
              Featured Partners
            </h2>
            <p className="mt-2 max-w-[640px] text-sm leading-6 text-[#687378]">
              Discover places, businesses and destinations we’re proud to feature.
            </p>
          </div>
        </ScrollReveal>

        <div
          className="mx-auto mt-6 max-w-[1040px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchStartX == null) return;
            const endX = event.changedTouches[0]?.clientX ?? touchStartX;
            const delta = endX - touchStartX;
            setTouchStartX(null);
            if (Math.abs(delta) < 40) return;
            setIsPaused(true);
            setActiveIndex(
              (current) =>
                (current + (delta < 0 ? 1 : -1) + featuredItems.length) % featuredItems.length,
            );
            window.setTimeout(() => setIsPaused(false), 1800);
          }}
        >
          <div className="overflow-hidden rounded-md border border-[#e5ebeb] bg-white shadow-[0_16px_32px_-28px_rgba(23,36,43,0.3)]">
            <div className="grid md:grid-cols-2">
              <FeaturedPartnerImage
                key={activeItem.name}
                name={activeItem.name}
                image={activeItem.image}
                fit={activeItem.imageFit}
              />

              <div className="flex h-[284px] flex-col justify-between border-t border-[#edf0f0] bg-white p-4 sm:p-5 md:h-auto md:border-l md:border-t-0 md:p-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
                    Featured
                  </p>
                  <h3 className="mt-2 line-clamp-2 min-h-[52px] font-display text-2xl font-medium leading-tight text-[#17242b] md:text-[1.9rem]">
                    {activeItem.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#526066]">
                    {activeItem.category} · {activeItem.location}
                  </p>
                  <p className="mt-3 line-clamp-3 min-h-[66px] max-w-xl text-sm leading-[22px] text-[#5f6d72]">
                    {activeItem.summary}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a
                    href={activeItem.href}
                    className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
                  >
                    {activeItem.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                  {activeItem.secondary && (
                    <a
                      href={activeItem.secondary.href}
                      target={activeItem.secondary.href.startsWith("http") ? "_blank" : undefined}
                      rel={activeItem.secondary.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex min-h-10 items-center rounded-sm border border-[#dce3e5] bg-white px-4 text-sm font-semibold text-[#34474d] transition-colors hover:bg-[#f7fafb]"
                    >
                      {activeItem.secondary.label}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#edf0f0] px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous featured partner"
                  onClick={() =>
                    setActiveIndex(
                      (current) => (current - 1 + featuredItems.length) % featuredItems.length,
                    )
                  }
                  className="grid h-9 w-9 place-items-center rounded-sm border border-[#dce4e5] text-lg leading-none text-[#17242b] transition-colors hover:bg-[#f4f7f7]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next featured partner"
                  onClick={() => setActiveIndex((current) => (current + 1) % featuredItems.length)}
                  className="grid h-9 w-9 place-items-center rounded-sm border border-[#dce4e5] text-lg leading-none text-[#17242b] transition-colors hover:bg-[#f4f7f7]"
                >
                  ›
                </button>
              </div>

              <div className="flex items-center gap-2">
                {featuredItems.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Show slide ${index + 1} for ${item.name}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex ? "w-7 bg-[#17242b]" : "w-2.5 bg-[#c7d1d4]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessNetworkSection() {
  const cards = [
    {
      title: "Find Suppliers",
      description:
        "Discover suppliers, products and businesses that provide the goods your company needs.",
      href: "/business-network?type=supplier",
      icon: Boxes,
    },
    {
      title: "Business Services",
      description:
        "Find companies offering accounting, marketing, web development, logistics and other professional services.",
      href: "/business-network?type=business-services",
      icon: BriefcaseBusiness,
    },
    {
      title: "Find Business Partners",
      description: "Discover businesses you can collaborate with, work alongside or partner with.",
      href: "/business-network?type=partnerships",
      icon: Handshake,
    },
    {
      title: "Showcase Your Business",
      description: "Help other businesses discover your products, services and capabilities.",
      href: "/list-your-business",
      icon: Store,
    },
  ];

  return (
    <section id="business-network" className="border-y border-[#dce9ed] bg-[#f5f9fa]">
      <div className="container-x py-7 md:py-8">
        <ScrollReveal>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
              Business Network
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium text-[#17242b] md:text-3xl">
              Businesses need connections too.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687378]">
              A place for suppliers, service providers, partnerships, referrals and
              business-to-business connections across Mpumalanga.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, description, href, icon: Icon }, index) => (
            <ScrollReveal key={title} className="min-w-0" delay={Math.min(index * 60, 180)}>
              <a
                href={href}
                className="group flex min-h-[92px] items-start gap-3 border border-[#dce9ed] bg-white p-3 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-[#8fb9c6] hover:shadow-[0_12px_24px_-20px_rgba(36,110,133,.34)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-[#142b4a] text-white transition-transform duration-200 group-hover:-translate-y-0.5">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#17242b]">{title}</span>
                  <span className="mt-1 block text-xs leading-4 text-[#687378]">{description}</span>
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-4 flex justify-start sm:justify-end" delay={200}>
          <a
            href="/business-network"
            className="group inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#246e85] transition-colors duration-200 hover:text-[#17242b]"
          >
            Explore Business Network{" "}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SearchResults({
  query,
  location,
  onClear,
}: {
  query: string;
  location: string;
  onClear: () => void;
}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const seenListingIds = new Set<string>();
  const results = (Object.keys(categoryConfigs) as CategorySlug[])
    .flatMap((slug) =>
      getCategoryListings(slug)
        .filter(isPublishedListing)
        .filter((listing) => {
          const config = categoryConfigs[slug];
          const searchable = [
            config.label,
            ...config.searchFields.map((field) => {
              const value = listing[field];
              if (Array.isArray(value)) {
                return value
                  .filter(
                    (item): item is string | number =>
                      typeof item === "string" || typeof item === "number",
                  )
                  .join(" ");
              }
              return typeof value === "string" || typeof value === "number" ? String(value) : "";
            }),
          ].join(" ");
          return (
            (!normalizedQuery || searchTextMatches(searchable, normalizedQuery)) &&
            (location === "Mpumalanga" ||
              listing.location?.toLocaleLowerCase().includes(location.toLocaleLowerCase()))
          );
        })
        .map((listing) => ({ listing, slug })),
    )
    .filter(({ listing }) => {
      if (seenListingIds.has(listing.id)) return false;
      seenListingIds.add(listing.id);
      return true;
    });

  return (
    <section id="directory-results" className="scroll-mt-[68px] bg-[#f7f6f2] py-8 md:py-10">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e4e2dc] pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
              Search results
            </p>
            <h2 className="mt-2 font-display text-2xl font-medium text-[#18262d] sm:text-3xl">
              {query ? `Results for “${query}”` : `Businesses in ${location}`}
            </h2>
            <p className="mt-2 text-sm text-[#687378]">{location}</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-[#17242b] underline underline-offset-4"
          >
            Clear search
          </button>
        </div>
        {results.length ? (
          <div className="grid gap-x-4 gap-y-6 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map(({ listing, slug }) => (
              <CategoryListingCard
                key={`${slug}-${listing.id}`}
                listing={listing}
                config={categoryConfigs[slug]}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between"
            role="status"
          >
            <div>
              <p className="font-medium text-[#18262d]">No matching businesses found.</p>
              <p className="mt-1 text-sm text-[#687378]">
                Try another keyword, location or category.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onClear}
                className="text-sm font-semibold text-[#17242b] underline underline-offset-4"
              >
                Clear search
              </button>
              <a
                href="#categories"
                className="text-sm font-semibold text-[#17242b] underline underline-offset-4"
              >
                Browse categories
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ForBusiness() {
  return (
    <section id="list-your-business" className="bg-[#17242b] text-white">
      <div className="container-x flex flex-col gap-6 py-9 sm:flex-row sm:items-center sm:justify-between md:py-11">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d0bd97]">
            For local businesses
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium sm:text-3xl">
            Own a business? Get discovered.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
            Create a professional presence on Discover and connect with customers across Mpumalanga.
          </p>
        </div>
        <a
          href={listingContactHref}
          className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-white px-5 py-2.5 text-sm font-semibold text-[#17242b] shadow-sm transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#edf0f0] hover:shadow-md active:scale-[0.98]"
        >
          List Your Business{" "}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
