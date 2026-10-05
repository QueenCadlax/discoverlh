import { mpumalangaLocations } from "./location-discovery";

export type CategorySlug =
  | "stay"
  | "eat"
  | "health"
  | "professional"
  | "home-property"
  | "personal-beauty"
  | "travel-transport"
  | "events"
  | "shop"
  | "travel"
  | "services"
  | "accommodation"
  | "professional-services"
  | "home-construction"
  | "automotive"
  | "food-dining"
  | "health-wellness"
  | "beauty"
  | "property"
  | "events-entertainment"
  | "education-training";

export const primaryDiscoveryCategorySlugs = [
  "stay",
  "eat",
  "shop",
  "health",
  "professional",
  "home-property",
  "automotive",
  "personal-beauty",
  "travel-transport",
  "events",
] as const satisfies readonly CategorySlug[];

export type PrimaryDiscoveryCategorySlug = (typeof primaryDiscoveryCategorySlugs)[number];

export const discoverySubcategories: Record<PrimaryDiscoveryCategorySlug, readonly string[]> = {
  stay: [
    "Hotel",
    "Lodges",
    "Guesthouses",
    "Bed & Breakfasts",
    "Self-Catering",
    "Apartments",
    "Resorts",
    "Backpackers",
    "Campsites",
    "Farm Stays",
    "Unique Stays",
  ],
  eat: [
    "Restaurant",
    "Cafés",
    "Coffee Shops",
    "Fast Food",
    "Takeaways",
    "Bakeries",
    "Fine Dining",
    "Family Dining",
    "Bars & Lounges",
    "Food Markets",
    "Local Food",
  ],
  shop: [
    "Shopping Malls",
    "Shopping Centres",
    "Retail Stores",
    "Fashion",
    "Beauty",
    "Electronics",
    "Furniture & Home",
    "Groceries",
    "Automotive Retail",
    "Markets",
    "Specialty Stores",
    "Local Shops",
  ],
  health: [
    "Doctors",
    "Dentists",
    "Clinics",
    "Pharmacies",
    "Specialists",
    "Physiotherapy",
    "Optometrists",
    "Hospitals",
    "Medical Practices",
    "Mental Wellness",
    "Wellness Services",
  ],
  professional: [
    "Lawyers",
    "Accountants",
    "Auditors",
    "Consultants",
    "Financial Services",
    "Insurance",
    "Business Services",
    "Tax Services",
    "HR Services",
    "Marketing",
    "Real Estate Professionals",
    "Other Professional Services",
  ],
  "home-property": [
    "Estate Agents",
    "Property Agencies",
    "Property Developers",
    "Property Management",
    "Rentals",
    "Commercial Property",
    "Residential Property",
    "Holiday Property",
    "Plumbers",
    "Electricians",
    "Builders",
    "Construction",
    "Renovation",
    "Cleaning",
    "Landscaping",
    "Security",
    "Maintenance",
    "Roofing",
    "Painting",
    "Air Conditioning",
  ],
  automotive: [
    "Mechanics",
    "Auto Electrical",
    "Tyres",
    "Panel Beaters",
    "Vehicle Services",
    "Car Wash",
    "Car Detailing",
    "Vehicle Parts",
    "Dealerships",
    "Towing",
    "Vehicle Rentals",
  ],
  "personal-beauty": [
    "Hair Salons",
    "Barbers",
    "Beauty",
    "Nail Salons",
    "Spas",
    "Massage",
    "Wellness",
    "Fitness",
    "Personal Care",
  ],
  "travel-transport": [
    "Tour Operators",
    "Travel Agencies",
    "Car Rental",
    "Shuttle Services",
    "Transfers",
    "Airport Transfers",
    "Transport Services",
    "Guided Tours",
    "Travel Services",
  ],
  events: [
    "Concerts",
    "Festivals",
    "Markets",
    "Exhibitions",
    "Sporting Events",
    "Conferences",
    "Shows",
    "Community Events",
    "Family Events",
    "Cultural Events",
  ],
};

const eventVenueTypes = [
  "Wedding Venues",
  "Conference Venues",
  "Function Venues",
  "Party Venues",
  "Corporate/Event Spaces",
  "Outdoor Venues",
  "Entertainment Venues",
] as const;

export type FilterKind = "single" | "multi" | "tabs" | "range" | "number-range";

export type CategoryFilterConfig = {
  id: string;
  label: string;
  field: string;
  kind: FilterKind;
  options?: string[];
  optionsFromData?: boolean;
  optional?: boolean;
  secondField?: string;
  unit?: string;
  defaultValue?: string;
  placement?: "search" | "filters";
  match?: "any" | "all";
  dependsOn?: { filterId: string; values: string[] };
  datePreset?: boolean;
};

export type CategorySortConfig = {
  id: string;
  label: string;
  field?: string;
  direction?: "asc" | "desc";
  requiresData?: boolean;
};

export type AutomotiveMode = "vehicles" | "services";
export type PropertyMode = "listings" | "businesses";

export type CategoryCardField = {
  label: string;
  field: string;
  unit?: string;
};

export type BusinessNetworkConnectionType = "supplier" | "business-services" | "partnerships";

export type CategoryListing = {
  id: string;
  slug?: string;
  listingKind?: "business" | "vehicle" | "property" | "accommodation" | "course" | "event";
  type?: string;
  accommodationType?: string;
  roomTypes?: string[];
  roomCount?: number;
  amenities?: string[];
  facilities?: string[];
  features?: string[];
  bookingUrl?: string;
  seeded?: boolean;
  sourceType?: "seeded_public_data";
  sourceUrl?: string;
  additionalCategorySlugs?: CategorySlug[];
  locationAccuracy?: "address" | "approximate";
  name: string;
  location?: string;
  address?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  town?: string;
  directionsUrl?: string;
  subcategory?: string;
  cuisine?: string;
  cuisineTypes?: string[];
  diningStyles?: string[];
  mealTypes?: string[];
  dietaryOptions?: string[];
  diningType?: string;
  serviceType?: string | string[];
  description?: string;
  image?: string;
  imageAlt?: string;
  logo?: string;
  images?: string[];
  imageAlts?: string[];
  services?: string[];
  products?: string[];
  menuUrl?: string;
  deliveryAvailable?: boolean;
  deliveryFee?: number;
  source?: string;
  businessNetworkTypes?: BusinessNetworkConnectionType[];
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  socialLinks?: { label: string; href: string }[];
  openingHours?: Record<string, string>;
  latitude?: number;
  longitude?: number;
  verified?: boolean;
  featured?: boolean;
  openNow?: boolean;
  lastConfirmedAt?: string;
  status: "published" | "draft" | "unpublished";
  claimed?: boolean;
  href?: string;
  createdAt?: string;
  [field: string]: unknown;
};

export type VehicleListing = CategoryListing & {
  listingKind: "vehicle";
  make?: string;
  model?: string;
  vehicleType?: string;
  bodyType?: string;
  year?: number;
  mileage?: number;
  price?: number;
  condition?: string;
  transmission?: string;
  fuel?: string;
  sellerType?: "Private Seller" | "Dealership";
};

export type EventListing = CategoryListing & {
  listingKind: "event";
  eventStartDate: string;
  eventEndDate?: string;
  eventTime?: string;
  venue: string;
  ticketUrl?: string;
  eventStatus?: "upcoming" | "happening-now" | "past" | "cancelled" | "completed";
  eventAdmission?: "Free" | "Paid";
};

export type PropertyListing = CategoryListing & {
  listingKind: "property";
  propertyType?: string;
  transactionType?: "For Sale" | "To Rent";
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  floorSize?: number;
  erfSize?: number;
};

export type CategoryConfig = {
  slug: CategorySlug;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  shortDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  searchPlaceholder: string;
  searchFields: string[];
  heroImage: string;
  icon?: string;
  iconAlt?: string;
  cardVariant:
    | "business"
    | "accommodation"
    | "vehicle"
    | "property"
    | "venue"
    | "tour"
    | "education";
  cardFields: CategoryCardField[];
  filters: CategoryFilterConfig[];
  sortOptions: CategorySortConfig[];
  resultNoun: string;
  emptyTitle: string;
  emptyDescription: string;
  ownerHeading: string;
  ownerDescription: string;
  ownerBenefits: { title: string; description: string }[];
};

const locationFilter: CategoryFilterConfig = {
  id: "location",
  label: "Location",
  field: "location",
  kind: "single",
  options: mpumalangaLocations,
};
const accommodationLocationFilter: CategoryFilterConfig = {
  ...locationFilter,
  defaultValue: "Mbombela",
};
const discoveryLocationFilter: CategoryFilterConfig = {
  ...locationFilter,
  optionsFromData: true,
  optional: true,
};
const categoryTypeFilter = (
  label: string,
  options: readonly string[],
  kind: "single" | "multi" = "single",
): CategoryFilterConfig => ({
  id: "category-type",
  label,
  field: "type",
  kind,
  options: [...options],
});

const nameSort: CategorySortConfig = {
  id: "name",
  label: "Name A–Z",
  field: "name",
  direction: "asc",
};
const relevanceSort: CategorySortConfig = { id: "relevance", label: "Most Relevant" };
const newestSort: CategorySortConfig = {
  id: "newest",
  label: "Newest",
  field: "createdAt",
  direction: "desc",
  requiresData: true,
};
const highestRatedSort: CategorySortConfig = {
  id: "rating",
  label: "Highest Rated",
  field: "rating",
  direction: "desc",
  requiresData: true,
};
const lowPriceSort: CategorySortConfig = {
  id: "price-asc",
  label: "Price: Low to High",
  field: "price",
  direction: "asc",
  requiresData: true,
};
const highPriceSort: CategorySortConfig = {
  id: "price-desc",
  label: "Price: High to Low",
  field: "price",
  direction: "desc",
  requiresData: true,
};

const businessOwnerBenefits = [
  { title: "Showcase", description: "Share your services, team and expertise." },
  { title: "Get discovered", description: "Appear in relevant searches and locations." },
  { title: "Connect", description: "Make it easy for people to contact you." },
];

function primaryCategoryConfig({
  slug,
  label,
  description,
  shortDescription,
  searchPlaceholder,
  typeLabel,
  subcategories,
  heroImage,
  icon,
  cardVariant = "business",
  extraFilters = [],
}: {
  slug: PrimaryDiscoveryCategorySlug;
  label: string;
  description: string;
  shortDescription: string;
  searchPlaceholder: string;
  typeLabel: string;
  subcategories: readonly string[];
  heroImage: string;
  icon: string;
  cardVariant?: CategoryConfig["cardVariant"];
  extraFilters?: CategoryFilterConfig[];
}): CategoryConfig {
  return {
    slug,
    label,
    eyebrow: label,
    headline: `${label} in Mpumalanga`,
    description,
    shortDescription,
    searchPlaceholder,
    searchFields: ["name", "type", "subcategory", "location", "description"],
    heroImage,
    icon,
    iconAlt: `${label} category`,
    cardVariant,
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter(typeLabel, subcategories, "multi"),
      locationFilter,
      ...extraFilters,
    ],
    sortOptions: [nameSort],
    resultNoun: label.toLocaleLowerCase(),
    emptyTitle: "More to discover",
    emptyDescription: `We're adding more ${label.toLocaleLowerCase()} listings across Mpumalanga.`,
    ownerHeading: `List your ${label.toLocaleLowerCase()} business.`,
    ownerDescription: `Help people discover ${label.toLocaleLowerCase()} across Mpumalanga.`,
    ownerBenefits: businessOwnerBenefits,
  };
}

export const categorySlugByLabel: Record<string, CategorySlug> = {
  Accommodation: "stay",
  Restaurants: "eat",
  Shop: "shop",
  Health: "health",
  Professional: "professional",
  "Home & Property": "home-property",
  Automotive: "automotive",
  "Personal & Beauty": "personal-beauty",
  "Travel & Transport": "travel-transport",
  Events: "events",
};

export const categoryConfigs: Record<CategorySlug, CategoryConfig> = {
  stay: {
    slug: "stay",
    label: "Accommodation",
    eyebrow: "Accommodation",
    headline: "Accommodation in Mpumalanga",
    description: "Hotels, lodges, guesthouses and unique places to stay across Mpumalanga.",
    shortDescription: "Hotels, lodges, guesthouses and unique stays.",
    searchPlaceholder: "Search accommodation or areas...",
    searchFields: ["name", "type", "location", "description"],
    heroImage: "/ACCOMODATION.jpg",
    icon: "stay",
    iconAlt: "Accommodation category",
    cardVariant: "accommodation",
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter("Accommodation Type", discoverySubcategories.stay),
      discoveryLocationFilter,
      {
        id: "amenities",
        label: "Facilities & amenities",
        field: "amenities",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [nameSort],
    resultNoun: "accommodation",
    emptyTitle: "More to discover",
    emptyDescription: "We're adding more places to stay across Mpumalanga.",
    ownerHeading: "Own accommodation? Get discovered.",
    ownerDescription: "Help travellers find the right place to stay.",
    ownerBenefits: [
      { title: "Showcase", description: "Your property, rooms and amenities." },
      { title: "Get discovered", description: "Appear in relevant stay searches." },
      { title: "Connect", description: "Make it easy for guests to enquire directly." },
    ],
  },
  eat: {
    slug: "eat",
    label: "Restaurants",
    eyebrow: "Restaurants",
    headline: "Restaurants in Mpumalanga",
    description: "Discover places to eat, drink and linger across Mpumalanga.",
    shortDescription: "Restaurants, cafés, coffee shops and local food.",
    searchPlaceholder: "Search restaurants or cuisines...",
    searchFields: ["name", "type", "cuisineTypes", "location", "description"],
    heroImage: "/FOOD.jpg",
    icon: "eat",
    iconAlt: "Restaurants category",
    cardVariant: "venue",
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter("Dining Type", discoverySubcategories.eat),
      discoveryLocationFilter,
      {
        id: "cuisine",
        label: "Cuisine",
        field: "cuisineTypes",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [nameSort],
    resultNoun: "restaurants",
    emptyTitle: "More to discover",
    emptyDescription: "We're adding more places to eat and enjoy across Mpumalanga.",
    ownerHeading: "Own a food business? Get discovered.",
    ownerDescription: "Help people discover your menu, food and location.",
    ownerBenefits: businessOwnerBenefits,
  },
  health: primaryCategoryConfig({
    slug: "health",
    label: "Health",
    description: "Find healthcare, medical practices and wellness services across Mpumalanga.",
    shortDescription: "Doctors, clinics, pharmacies and wellness.",
    searchPlaceholder: "Search doctors, clinics or health services...",
    typeLabel: "Health Type",
    subcategories: discoverySubcategories.health,
    heroImage: "/meds.jpg",
    icon: "health",
    extraFilters: [
      {
        id: "emergency-services",
        label: "Emergency services",
        field: "emergencyServices",
        kind: "single",
        options: ["Yes", "No"],
        optional: true,
        optionsFromData: true,
      },
      {
        id: "appointment-required",
        label: "Appointment required",
        field: "appointmentRequired",
        kind: "single",
        options: ["Yes", "No"],
        optional: true,
        optionsFromData: true,
      },
      {
        id: "medical-aid",
        label: "Medical aid accepted",
        field: "medicalAidAccepted",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "walk-ins",
        label: "Walk-ins",
        field: "walkIns",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "specialist-type",
        label: "Specialist type",
        field: "specialistType",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
  }),
  professional: primaryCategoryConfig({
    slug: "professional",
    label: "Professional",
    description: "Discover legal, financial, consulting and business professionals.",
    shortDescription: "Legal, finance, consulting and business services.",
    searchPlaceholder: "Search lawyers, accountants or consultants...",
    typeLabel: "Professional Type",
    subcategories: discoverySubcategories.professional,
    heroImage: "/PROFFESIONAL.jpg",
    icon: "professional",
    extraFilters: [
      {
        id: "business-type",
        label: "Business / Individual",
        field: "businessType",
        kind: "single",
        options: ["Business", "Individual"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "work-mode",
        label: "Remote / In-person",
        field: "workMode",
        kind: "single",
        options: ["Remote", "In-person", "Both"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "appointment-required",
        label: "Appointment required",
        field: "appointmentRequired",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "service-type",
        label: "Service type",
        field: "serviceType",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
  }),
  "home-property": primaryCategoryConfig({
    slug: "home-property",
    label: "Home & Property",
    description: "Find property professionals and trusted home services across Mpumalanga.",
    shortDescription: "Property, plumbing, building and home services.",
    searchPlaceholder: "Search property or home services...",
    typeLabel: "Property or Service Type",
    subcategories: discoverySubcategories["home-property"],
    heroImage: "/PROPERTY.jpg",
    icon: "home-property",
    extraFilters: [
      {
        id: "property-type",
        label: "Property type",
        field: "propertyType",
        kind: "multi",
        optionsFromData: true,
        optional: true,
        dependsOn: {
          filterId: "category-type",
          values: discoverySubcategories["home-property"].slice(0, 8),
        },
      },
      {
        id: "transaction-type",
        label: "For Sale / To Rent",
        field: "transactionType",
        kind: "single",
        options: ["For Sale", "To Rent"],
        optionsFromData: true,
        optional: true,
        dependsOn: {
          filterId: "category-type",
          values: discoverySubcategories["home-property"].slice(0, 8),
        },
      },
      {
        id: "price",
        label: "Price range",
        field: "price",
        kind: "range",
        optional: true,
        unit: "ZAR",
        dependsOn: {
          filterId: "category-type",
          values: discoverySubcategories["home-property"].slice(0, 8),
        },
      },
      {
        id: "bedrooms",
        label: "Bedrooms",
        field: "bedrooms",
        kind: "number-range",
        optional: true,
        dependsOn: {
          filterId: "category-type",
          values: discoverySubcategories["home-property"].slice(0, 8),
        },
      },
      {
        id: "emergency",
        label: "Emergency / Standard",
        field: "emergency",
        kind: "single",
        options: ["Emergency", "Standard"],
        optionsFromData: true,
        optional: true,
        dependsOn: {
          filterId: "category-type",
          values: discoverySubcategories["home-property"].slice(8),
        },
      },
      {
        id: "property-use",
        label: "Residential / Commercial",
        field: "propertyUse",
        kind: "single",
        options: ["Residential", "Commercial"],
        optionsFromData: true,
        optional: true,
        dependsOn: {
          filterId: "category-type",
          values: [...discoverySubcategories["home-property"]],
        },
      },
    ],
  }),
  "personal-beauty": primaryCategoryConfig({
    slug: "personal-beauty",
    label: "Personal & Beauty",
    description: "Discover salons, barbers, spas, fitness and personal care.",
    shortDescription: "Hair, beauty, spas, massage and fitness.",
    searchPlaceholder: "Search salons, barbers or wellness...",
    typeLabel: "Service Type",
    subcategories: discoverySubcategories["personal-beauty"],
    heroImage: "/beauty%20SALOON.jpg",
    icon: "personal-beauty",
    extraFilters: [
      {
        id: "audience",
        label: "Men / Women / Unisex",
        field: "audience",
        kind: "single",
        options: ["Men", "Women", "Unisex"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "appointment-required",
        label: "Appointment required",
        field: "appointmentRequired",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "walk-ins",
        label: "Walk-ins",
        field: "walkIns",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "price",
        label: "Price range",
        field: "price",
        kind: "range",
        optional: true,
        unit: "ZAR",
      },
    ],
  }),
  "travel-transport": primaryCategoryConfig({
    slug: "travel-transport",
    label: "Travel & Transport",
    description: "Find tours, transfers, shuttles and transport services.",
    shortDescription: "Tour operators, shuttles, transfers and car hire.",
    searchPlaceholder: "Search shuttles, transfers or travel services...",
    typeLabel: "Travel / Transport Type",
    subcategories: discoverySubcategories["travel-transport"],
    heroImage: "/TRAVEL.jpg",
    icon: "travel-transport",
    cardVariant: "tour",
    extraFilters: [
      {
        id: "service-area",
        label: "Service area",
        field: "serviceArea",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "transfer-type",
        label: "Private / Shared",
        field: "transferType",
        kind: "single",
        options: ["Private", "Shared"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "booking-required",
        label: "Booking required",
        field: "bookingRequired",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "airport-transfer",
        label: "Airport transfer",
        field: "airportTransfer",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
    ],
  }),
  events: {
    slug: "events",
    label: "Events",
    eyebrow: "Events",
    headline: "Find what’s happening",
    description: "Discover events, venues and local happenings across Mpumalanga.",
    shortDescription: "Festivals, concerts, markets, venues and local events.",
    searchPlaceholder: "Search events, venues or locations...",
    searchFields: [
      "name",
      "type",
      "eventStartDate",
      "venue",
      "venueType",
      "location",
      "description",
    ],
    heroImage: "/EVENTS.jpg",
    icon: "events",
    iconAlt: "Events category",
    cardVariant: "venue",
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter("Event Type", discoverySubcategories.events),
      {
        id: "venue-type",
        label: "Venue Type",
        field: "venueType",
        kind: "single",
        options: [...eventVenueTypes],
        optional: true,
      },
      discoveryLocationFilter,
      {
        id: "event-date",
        label: "Date",
        field: "eventStartDate",
        kind: "single",
        datePreset: true,
        options: ["Today", "This Week", "This Weekend", "This Month", "Custom Date"],
      },
      {
        id: "event-status",
        label: "Event Status",
        field: "eventStatus",
        kind: "single",
        options: ["Upcoming", "Happening Now", "Past"],
        defaultValue: "Upcoming",
      },
      {
        id: "event-admission",
        label: "Admission",
        field: "eventAdmission",
        kind: "single",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [nameSort],
    resultNoun: "events",
    emptyTitle: "More to discover",
    emptyDescription: "We're adding more events and local experiences across Mpumalanga.",
    ownerHeading: "List an event.",
    ownerDescription: "Help people find your event and plan their visit.",
    ownerBenefits: businessOwnerBenefits,
  },
  shop: {
    slug: "shop",
    label: "Shop",
    eyebrow: "Shop",
    headline: "Discover places to shop",
    description: "Browse shopping malls, local markets and lifestyle destinations.",
    shortDescription: "Malls, markets, boutiques and local stores.",
    searchPlaceholder: "Search shopping destinations...",
    searchFields: ["name", "type", "location", "description"],
    heroImage: "/SHOP.jpg",
    icon: "shop",
    iconAlt: "Shop category",
    cardVariant: "venue",
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter("Shopping Type", discoverySubcategories.shop),
      discoveryLocationFilter,
      ...["Parking", "Food Court", "Cinema", "ATM", "Wi-Fi", "Family Friendly"].map((label) => ({
        id: `shop-${label.toLocaleLowerCase().replaceAll(" ", "-")}`,
        label,
        field: label.toLocaleLowerCase().replaceAll(" ", ""),
        kind: "single" as const,
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      })),
    ],
    sortOptions: [nameSort],
    resultNoun: "shopping destinations",
    emptyTitle: "More to discover",
    emptyDescription: "We're adding more shopping and lifestyle destinations across Mpumalanga.",
    ownerHeading: "List a shopping destination.",
    ownerDescription: "Connect local shoppers with the places they want to discover.",
    ownerBenefits: businessOwnerBenefits,
  },
  travel: {
    slug: "travel",
    label: "Travel",
    eyebrow: "Travel",
    headline: "Travel well in Mpumalanga",
    description: "Discover transport, transfers and travel services across the region.",
    shortDescription: "Shuttles, transfers, car hire and travel services.",
    searchPlaceholder: "Search travel services...",
    searchFields: ["name", "type", "location", "description"],
    heroImage: "/TRAVEL.jpg",
    icon: "travel",
    iconAlt: "Travel category",
    cardVariant: "tour",
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter("Travel Type", discoverySubcategories["travel-transport"]),
      discoveryLocationFilter,
    ],
    sortOptions: [nameSort],
    resultNoun: "travel services",
    emptyTitle: "More to discover",
    emptyDescription: "We're adding more transport and travel options across Mpumalanga.",
    ownerHeading: "Offer travel services? Get discovered.",
    ownerDescription: "Help visitors find reliable transport and travel support.",
    ownerBenefits: businessOwnerBenefits,
  },
  services: {
    slug: "services",
    label: "Services",
    eyebrow: "Services",
    headline: "Find useful local services",
    description: "Discover practical services that help people get things done in Mpumalanga.",
    shortDescription: "Professional, home, automotive and personal services.",
    searchPlaceholder: "Search local services...",
    searchFields: ["name", "type", "location", "description"],
    heroImage: "/SERVICES.jpg",
    icon: "services",
    iconAlt: "Services category",
    cardVariant: "business",
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter("Service Type", [
        ...discoverySubcategories.professional,
        ...discoverySubcategories["home-property"].slice(8),
        ...discoverySubcategories.automotive,
        ...discoverySubcategories.health,
        ...discoverySubcategories["personal-beauty"],
      ]),
      discoveryLocationFilter,
    ],
    sortOptions: [nameSort],
    resultNoun: "services",
    emptyTitle: "More to discover",
    emptyDescription: "We're adding more useful local services across Mpumalanga.",
    ownerHeading: "List your service business.",
    ownerDescription: "Help people find the service providers they need.",
    ownerBenefits: businessOwnerBenefits,
  },
  accommodation: {
    slug: "accommodation",
    label: "Accommodation",
    eyebrow: "Accommodation",
    headline: "Accommodation in Mpumalanga",
    description:
      "Discover hotels, lodges, guesthouses, apartments and unique stays across Mpumalanga.",
    searchPlaceholder: "Search stays, accommodation types or areas...",
    searchFields: [
      "name",
      "type",
      "accommodationType",
      "roomTypes",
      "location",
      "area",
      "description",
      "amenities",
      "facilities",
    ],
    heroImage: "/ACCOMODATION.jpg",
    icon: "stay",
    iconAlt: "Accommodation category",
    cardVariant: "accommodation",
    cardFields: [
      { label: "Type", field: "type" },
      { label: "Amenities", field: "amenities" },
    ],
    filters: [
      {
        id: "type",
        label: "Accommodation Type",
        field: "type",
        kind: "multi",
        options: [...discoverySubcategories.stay],
      },
      accommodationLocationFilter,
      {
        id: "amenities",
        label: "Facilities & amenities",
        field: "amenities",
        kind: "multi",
        optionsFromData: true,
        match: "all",
      },
    ],
    sortOptions: [nameSort],
    resultNoun: "places",
    emptyTitle: "No accommodation listings yet.",
    emptyDescription: "More stays are being added across Mpumalanga.",
    ownerHeading: "Own an accommodation business? Get discovered.",
    ownerDescription: "Help travellers discover your place to stay and contact you directly.",
    ownerBenefits: [
      { title: "Showcase", description: "Your accommodation, rooms and facilities." },
      { title: "Get discovered", description: "Appear in relevant searches and locations." },
      { title: "Connect", description: "Make it easy for interested guests to contact you." },
    ],
  },
  "professional-services": {
    slug: "professional-services",
    label: "Professional Services",
    eyebrow: "Professional Services",
    headline: "Find the right professional service.",
    description: "Discover trusted professional services across Mpumalanga.",
    searchPlaceholder: "Search lawyers, accountants, consultants...",
    searchFields: ["name", "serviceType", "specialisation", "location", "description"],
    heroImage: "/PROFFESIONAL.jpg",
    cardVariant: "business",
    cardFields: [
      { label: "Service", field: "serviceType" },
      { label: "Specialisation", field: "specialisation" },
      { label: "Credentials", field: "credentials" },
    ],
    filters: [
      {
        id: "service-type",
        label: "Service type",
        field: "serviceType",
        kind: "multi",
        options: [
          "Lawyers",
          "Attorneys",
          "Accountants",
          "Auditors",
          "Tax Consultants",
          "Business Consultants",
          "Financial Advisors",
          "HR Consultants",
          "Recruitment",
          "Insurance",
          "Business Services",
          "Professional Consulting",
          "IT Consultants",
          "Marketing Consultants",
          "Legal Consultants",
          "Other Professional Services",
        ],
      },
      {
        id: "specialisation",
        label: "Professional Area",
        field: "specialisation",
        kind: "multi",
        options: [
          "Corporate",
          "Commercial",
          "Tax",
          "Family",
          "Property",
          "Labour",
          "Litigation",
          "Business Advisory",
          "Accounting",
          "Audit",
          "Strategy",
          "Technology",
        ],
      },
      {
        ...locationFilter,
        options: [...mpumalangaLocations, "Other towns"],
      },
      {
        id: "business-type",
        label: "Business type",
        field: "businessType",
        kind: "multi",
        options: ["Independent Professional", "Firm", "Consultancy", "Agency"],
      },
      {
        id: "languages",
        label: "Languages",
        field: "languages",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "credentials",
        label: "Verified / Credentials",
        field: "credentials",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [nameSort, relevanceSort, newestSort],
    resultNoun: "professionals",
    emptyTitle: "No professional listings yet.",
    emptyDescription: "We're growing the professional services network across Mpumalanga.",
    ownerHeading: "List your practice on Discover.",
    ownerDescription: "Give people a clear way to discover your expertise and get in touch.",
    ownerBenefits: businessOwnerBenefits,
  },
  "home-construction": {
    slug: "home-construction",
    label: "Home & Construction",
    eyebrow: "Home & Construction",
    headline: "Find the right people for the job.",
    description: "Discover builders, contractors and home service professionals across Mpumalanga.",
    searchPlaceholder: "Search builders, plumbers, electricians...",
    searchFields: [
      "name",
      "serviceType",
      "specialisation",
      "projectType",
      "location",
      "description",
    ],
    heroImage: "/HOME%20CONSTRUCTION.jpg",
    cardVariant: "business",
    cardFields: [
      { label: "Service", field: "serviceType" },
      { label: "Project type", field: "projectType" },
    ],
    filters: [
      {
        id: "service",
        label: "Service",
        field: "serviceType",
        kind: "multi",
        options: [
          "Building",
          "Builders",
          "Renovations",
          "Plumbing",
          "Electrical",
          "Roofing",
          "Painting",
          "Tiling",
          "Flooring",
          "Carpentry",
          "Landscaping",
          "Welding",
          "Security",
          "Solar",
          "Air Conditioning",
          "Pools",
          "Quantity Surveying",
          "Architecture",
          "Interior Design",
        ],
      },
      {
        id: "project-type",
        label: "Project type",
        field: "projectType",
        kind: "multi",
        options: [
          "New Build",
          "Renovation",
          "Repair",
          "Installation",
          "Maintenance",
          "Commercial",
          "Residential",
        ],
      },
      locationFilter,
      {
        id: "budget",
        label: "Price / Budget",
        field: "price",
        kind: "range",
        optional: true,
        unit: "ZAR",
      },
      {
        id: "availability",
        label: "Availability",
        field: "availability",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [
      nameSort,
      relevanceSort,
      newestSort,
      {
        id: "rating",
        label: "Highest Rated",
        field: "rating",
        direction: "desc",
        requiresData: true,
      },
    ],
    resultNoun: "listings",
    emptyTitle: "We're growing our network in Mpumalanga.",
    emptyDescription:
      "We're bringing local home service professionals together on Discover. Check back as more businesses join, or list your business to get started.",
    ownerHeading: "Are you a home service professional?",
    ownerDescription:
      "Get your business discovered by people looking for services across Mpumalanga.",
    ownerBenefits: businessOwnerBenefits,
  },
  automotive: {
    slug: "automotive",
    label: "Automotive",
    eyebrow: "Automotive",
    headline: "Find the right automotive service.",
    description: "Explore vehicles, automotive businesses and services across Mpumalanga.",
    searchPlaceholder: "Search dealerships, mechanics, tyres...",
    searchFields: [
      "name",
      "make",
      "model",
      "vehicleType",
      "serviceType",
      "listingType",
      "location",
      "description",
    ],
    heroImage: "/CAR%203.jpg",
    icon: "automotive",
    iconAlt: "Automotive category",
    cardVariant: "vehicle",
    cardFields: [
      { label: "Year", field: "year" },
      { label: "Mileage", field: "mileage", unit: "km" },
      { label: "Transmission", field: "transmission" },
      { label: "Fuel", field: "fuel" },
      { label: "Seller", field: "sellerName" },
    ],
    filters: [
      {
        id: "service-type",
        label: "Automotive Type",
        field: "type",
        kind: "multi",
        options: [...discoverySubcategories.automotive],
      },
      {
        id: "vehicle-type",
        label: "Vehicle type",
        field: "vehicleType",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "emergency",
        label: "Emergency service",
        field: "emergency",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "booking-required",
        label: "Booking required",
        field: "bookingRequired",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "mobile-service",
        label: "Mobile service",
        field: "mobileService",
        kind: "single",
        options: ["Yes", "No"],
        optionsFromData: true,
        optional: true,
      },
      {
        id: "make",
        label: "Make",
        field: "make",
        kind: "single",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "model",
        label: "Model",
        field: "model",
        kind: "single",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "seller-type",
        label: "Seller type",
        field: "sellerType",
        kind: "multi",
        options: ["Dealership", "Private Seller"],
      },
      { id: "price", label: "Price", field: "price", kind: "range", optional: true, unit: "ZAR" },
      {
        id: "condition",
        label: "Condition",
        field: "condition",
        kind: "multi",
        options: ["New", "Used"],
      },
      { id: "year", label: "Year", field: "year", kind: "number-range", optional: true },
      {
        id: "mileage",
        label: "Mileage",
        field: "mileage",
        kind: "number-range",
        optional: true,
        unit: "km",
      },
      {
        id: "transmission",
        label: "Transmission",
        field: "transmission",
        kind: "multi",
        options: ["Automatic", "Manual"],
      },
      {
        id: "fuel",
        label: "Fuel",
        field: "fuel",
        kind: "multi",
        options: ["Petrol", "Diesel", "Hybrid", "Electric"],
      },
      {
        id: "body-type",
        label: "Body type",
        field: "bodyType",
        kind: "multi",
        options: ["Sedan", "Hatchback", "SUV", "Coupe", "Convertible", "Bakkie", "Van", "Other"],
      },
      locationFilter,
    ],
    sortOptions: [
      nameSort,
      newestSort,
      lowPriceSort,
      highPriceSort,
      { id: "year", label: "Year: Newest", field: "year", direction: "desc", requiresData: true },
      {
        id: "mileage",
        label: "Mileage: Lowest",
        field: "mileage",
        direction: "asc",
        requiresData: true,
      },
    ],
    resultNoun: "listings",
    emptyTitle: "No automotive listings yet.",
    emptyDescription: "We're growing the automotive network across Mpumalanga.",
    ownerHeading: "List your automotive business.",
    ownerDescription: "Help local drivers discover your vehicles, services and expertise.",
    ownerBenefits: businessOwnerBenefits,
  },
  "health-wellness": {
    slug: "health-wellness",
    label: "Health & Wellness",
    eyebrow: "Health & Wellness",
    headline: "Find care that fits your needs.",
    description: "Discover healthcare, wellness and professional practitioners across Mpumalanga.",
    searchPlaceholder: "Search clinics, practitioners, wellness services...",
    searchFields: [
      "name",
      "serviceType",
      "practitionerType",
      "specialisation",
      "location",
      "description",
    ],
    heroImage: "/meds.jpg",
    cardVariant: "business",
    cardFields: [
      { label: "Service", field: "serviceType" },
      { label: "Specialisation", field: "specialisation" },
    ],
    filters: [
      {
        id: "service-type",
        label: "Service type",
        field: "serviceType",
        kind: "multi",
        options: [
          "Medical Clinic",
          "General Practitioner",
          "Dentist",
          "Optometry",
          "Fitness",
          "Physiotherapist",
          "Psychologist",
          "Dietitian",
          "Nutrition",
          "Mental Wellness Services",
          "Occupational Therapist",
          "Chiropractor",
          "Pharmacy",
          "Wellness Centre",
          "Hospital",
          "Massage & Wellness",
          "Specialist",
          "Other",
        ],
      },
      {
        id: "practitioner-type",
        label: "Practitioner Type",
        field: "practitionerType",
        kind: "multi",
        options: [
          "Doctor",
          "Dentist",
          "Pharmacist",
          "Physiotherapist",
          "Optometrist",
          "Wellness Practitioner",
          "Nutritionist",
        ],
      },
      locationFilter,
      {
        id: "for",
        label: "For",
        field: "audience",
        kind: "multi",
        options: ["Adults", "Children", "Families"],
        optional: true,
      },
      {
        id: "appointment",
        label: "Appointment type",
        field: "appointmentType",
        kind: "multi",
        options: ["In Person", "Online"],
        optional: true,
      },
      {
        id: "accessibility",
        label: "Accessibility",
        field: "accessibility",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "languages",
        label: "Languages",
        field: "languages",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [nameSort, relevanceSort, newestSort, highestRatedSort],
    resultNoun: "providers",
    emptyTitle: "No health and wellness listings yet.",
    emptyDescription: "We're growing the health and wellness network across Mpumalanga.",
    ownerHeading: "List your practice on Discover.",
    ownerDescription: "Help people discover your services and contact your practice.",
    ownerBenefits: businessOwnerBenefits,
  },
  beauty: {
    slug: "beauty",
    label: "Beauty",
    eyebrow: "Beauty",
    headline: "Discover your next beauty destination.",
    description: "Explore salons, spas and wellness experiences across Mpumalanga.",
    searchPlaceholder: "Search salons, barbers, beauty professionals...",
    searchFields: ["name", "businessType", "services", "location", "description"],
    heroImage: "/beauty%20SALOON.jpg",
    cardVariant: "business",
    cardFields: [
      { label: "Beauty Type", field: "businessType" },
      { label: "Beauty Service", field: "services" },
    ],
    filters: [
      {
        id: "business-type",
        label: "Beauty Type",
        field: "businessType",
        kind: "multi",
        options: [
          "Hair Salon",
          "Barber",
          "Nail Salon",
          "Beauty Salon",
          "Spa",
          "Wellness Centre",
          "Skin Clinic",
          "Makeup Artist",
          "Aesthetician",
        ],
      },
      {
        id: "services",
        label: "Beauty Service",
        field: "services",
        kind: "multi",
        options: [
          "Hair",
          "Nails",
          "Facials",
          "Massage",
          "Skincare",
          "Makeup",
          "Brows",
          "Lashes",
          "Body Treatments",
          "Barbering",
          "Aesthetics",
          "Wellness",
          "Manicures",
          "Pedicures",
          "Threading",
          "Tinting",
          "Waxing",
          "Foot Care",
        ],
      },
      {
        id: "price",
        label: "Price range",
        field: "price",
        kind: "range",
        optional: true,
        unit: "ZAR",
      },
      locationFilter,
      {
        id: "audience",
        label: "For",
        field: "audience",
        kind: "multi",
        options: ["Women", "Men", "Children"],
        optional: true,
      },
      {
        id: "amenities",
        label: "Amenities",
        field: "amenities",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [nameSort, relevanceSort, newestSort, lowPriceSort, highestRatedSort],
    resultNoun: "businesses",
    emptyTitle: "No beauty listings yet.",
    emptyDescription: "We're growing the beauty network across Mpumalanga.",
    ownerHeading: "List your beauty business.",
    ownerDescription: "Help people discover your services, location and contact details.",
    ownerBenefits: businessOwnerBenefits,
  },
  property: {
    slug: "property",
    label: "Property",
    eyebrow: "Property",
    headline: "Find your next property.",
    description: "Discover estate agents, property services, sales and rentals across Mpumalanga.",
    searchPlaceholder: "Search properties, estate agents, rentals...",
    searchFields: [
      "name",
      "propertyType",
      "transactionType",
      "serviceType",
      "location",
      "reference",
      "description",
      "features",
    ],
    heroImage: "/PROPERTY.jpg",
    cardVariant: "property",
    cardFields: [
      { label: "Bedrooms", field: "bedrooms" },
      { label: "Bathrooms", field: "bathrooms" },
      { label: "Parking", field: "parking" },
      { label: "Floor size", field: "floorSize", unit: "m²" },
      { label: "Erf size", field: "erfSize", unit: "m²" },
      { label: "Agent", field: "agentName" },
    ],
    filters: [
      {
        id: "intent",
        label: "Listing type",
        field: "transactionType",
        kind: "tabs",
        options: ["For Sale", "To Rent", "Property Management", "Development"],
        defaultValue: "For Sale",
        placement: "search",
      },
      {
        id: "property-type",
        label: "Property type",
        field: "propertyType",
        kind: "multi",
        options: [
          "House",
          "Apartment",
          "Townhouse",
          "Farm",
          "Plot / Land",
          "Commercial",
          "Industrial",
          "Office",
          "Retail",
          "Residential",
          "Land",
        ],
      },
      {
        id: "service-type",
        label: "Property service",
        field: "serviceType",
        kind: "multi",
        options: [
          "Estate Agents",
          "Property Agencies",
          "Property Developers",
          "Property Sales",
          "Property Rentals",
          "Property Management",
          "Property Services",
        ],
      },
      { id: "price", label: "Price", field: "price", kind: "range", optional: true, unit: "ZAR" },
      {
        id: "bedrooms",
        label: "Bedrooms",
        field: "bedrooms",
        kind: "number-range",
        optional: true,
      },
      {
        id: "bathrooms",
        label: "Bathrooms",
        field: "bathrooms",
        kind: "number-range",
        optional: true,
      },
      {
        id: "parking",
        label: "Parking / Garage",
        field: "parking",
        kind: "number-range",
        optional: true,
      },
      {
        id: "floor-size",
        label: "Floor size",
        field: "floorSize",
        kind: "number-range",
        optional: true,
        unit: "m²",
      },
      {
        id: "erf-size",
        label: "Erf size",
        field: "erfSize",
        kind: "number-range",
        optional: true,
        unit: "m²",
      },
      {
        id: "features",
        label: "Features",
        field: "features",
        kind: "multi",
        options: [
          "Pool",
          "Garden",
          "Pet Friendly",
          "Security Estate",
          "Flatlet",
          "Solar",
          "Borehole",
          "Fibre",
          "Furnished",
        ],
        optional: true,
      },
      locationFilter,
      {
        id: "listing-status",
        label: "Listing status",
        field: "listingStatus",
        kind: "multi",
        options: ["New", "Reduced"],
        optional: true,
      },
    ],
    sortOptions: [
      nameSort,
      newestSort,
      lowPriceSort,
      highPriceSort,
      {
        id: "largest",
        label: "Largest",
        field: "floorSize",
        direction: "desc",
        requiresData: true,
      },
      {
        id: "updated",
        label: "Recently Updated",
        field: "updatedAt",
        direction: "desc",
        requiresData: true,
      },
    ],
    resultNoun: "properties",
    emptyTitle: "No property listings yet.",
    emptyDescription: "We're building the property network across Mpumalanga.",
    ownerHeading: "List your property on Discover.",
    ownerDescription: "Give people a clear way to discover your property and get in touch.",
    ownerBenefits: businessOwnerBenefits,
  },
  "events-entertainment": {
    slug: "events-entertainment",
    label: "Events & Entertainment",
    eyebrow: "Events & Entertainment",
    headline: "Plan something worth remembering.",
    description: "Discover wedding and event venues, planners and suppliers across Mpumalanga.",
    searchPlaceholder: "Search venues, event services, entertainment...",
    searchFields: ["name", "serviceType", "eventType", "location", "description"],
    heroImage: "/WEDDING.jpg",
    cardVariant: "venue",
    cardFields: [
      { label: "Venue type", field: "serviceType" },
      { label: "Capacity", field: "guestCapacity", unit: "guests" },
      { label: "Features", field: "features" },
    ],
    filters: [
      {
        id: "service-type",
        label: "Service type",
        field: "serviceType",
        kind: "multi",
        options: [
          "Wedding Venue",
          "Event Venue",
          "Wedding Planner",
          "Decor",
          "Catering",
          "Photography",
          "Videography",
          "Florist",
          "DJ",
          "Entertainment",
          "Makeup",
          "Wedding Dress",
          "Suits",
          "Cakes",
          "Transport",
          "Equipment Hire",
          "Event Planners",
          "Party Services",
          "Event Equipment",
          "Event Suppliers",
        ],
      },
      {
        id: "event-type",
        label: "Event type",
        field: "eventType",
        kind: "multi",
        options: [
          "Wedding",
          "Birthday",
          "Corporate",
          "Private Event",
          "Conference",
          "Celebration",
          "Party",
          "Entertainment",
        ],
      },
      {
        id: "capacity",
        label: "Guest capacity",
        field: "guestCapacity",
        kind: "number-range",
        optional: true,
      },
      {
        id: "venue-type",
        label: "Venue Type",
        field: "venueType",
        kind: "multi",
        options: [
          "Wedding Venue",
          "Event Venue",
          "Conference Venue",
          "Banquet Hall",
          "Outdoor Venue",
        ],
      },
      {
        id: "budget",
        label: "Price / Budget",
        field: "price",
        kind: "range",
        optional: true,
        unit: "ZAR",
      },
      locationFilter,
      {
        id: "venue-features",
        label: "Venue features",
        field: "features",
        kind: "multi",
        options: [
          "Indoor",
          "Outdoor",
          "Accommodation",
          "Catering",
          "Parking",
          "Garden",
          "Chapel",
          "Conference Facilities",
        ],
        optional: true,
      },
    ],
    sortOptions: [
      nameSort,
      relevanceSort,
      newestSort,
      {
        id: "capacity",
        label: "Capacity",
        field: "guestCapacity",
        direction: "desc",
        requiresData: true,
      },
      lowPriceSort,
    ],
    resultNoun: "listings",
    emptyTitle: "No events and entertainment listings yet.",
    emptyDescription: "We're growing the events and entertainment network across Mpumalanga.",
    ownerHeading: "List your event business.",
    ownerDescription: "Help people discover your venue, services or event expertise.",
    ownerBenefits: businessOwnerBenefits,
  },
  "food-dining": {
    slug: "food-dining",
    label: "Restaurants",
    eyebrow: "Food & Dining",
    headline: "Food & Dining",
    description: "Discover places to eat, drink and enjoy across Mpumalanga.",
    seoTitle: "Food & Dining in Mpumalanga | Discover",
    seoDescription: "Discover places to eat, drink and enjoy across Mpumalanga.",
    searchPlaceholder: "Search restaurants, cuisines or locations...",
    searchFields: [
      "name",
      "subcategory",
      "cuisine",
      "cuisineTypes",
      "diningStyles",
      "mealTypes",
      "diningType",
      "serviceType",
      "services",
      "location",
      "address",
      "description",
    ],
    heroImage: "/FOOD.jpg",
    cardVariant: "venue",
    cardFields: [
      { label: "Cuisine", field: "cuisineTypes" },
      { label: "Dining style", field: "diningStyles" },
      { label: "Meal type", field: "mealTypes" },
    ],
    filters: [
      {
        id: "cuisine",
        label: "Cuisine",
        field: "cuisineTypes",
        kind: "multi",
        optionsFromData: true,
      },
      {
        id: "dining-style",
        label: "Dining style",
        field: "diningStyles",
        kind: "multi",
        optionsFromData: true,
      },
      {
        id: "meal-type",
        label: "Meal type",
        field: "mealTypes",
        kind: "multi",
        optionsFromData: true,
      },
      locationFilter,
    ],
    sortOptions: [nameSort, relevanceSort],
    resultNoun: "restaurants",
    emptyTitle: "No food and dining listings yet.",
    emptyDescription: "We're growing the food and dining network across Mpumalanga.",
    ownerHeading: "List your food business.",
    ownerDescription: "Help people discover your food, service and location.",
    ownerBenefits: businessOwnerBenefits,
  },
  "education-training": {
    slug: "education-training",
    label: "Education & Training",
    eyebrow: "Education & Training",
    headline: "Find the right place to learn.",
    description:
      "Discover schools, tutors, training providers and learning opportunities across Mpumalanga.",
    searchPlaceholder: "Search schools, tutors, courses...",
    searchFields: [
      "name",
      "educationType",
      "trainingType",
      "level",
      "subject",
      "subjects",
      "course",
      "location",
      "description",
    ],
    heroImage: "/EDUCATION.jpg",
    cardVariant: "education",
    cardFields: [
      { label: "Type", field: "educationType" },
      { label: "Courses", field: "courses" },
      { label: "Format", field: "learningFormat" },
    ],
    filters: [
      {
        id: "education-type",
        label: "Education type",
        field: "educationType",
        kind: "multi",
        options: [
          "School",
          "College",
          "Training Provider",
          "Tutor",
          "Academy",
          "Skills Centre",
          "Early Childhood Development",
          "Driving School",
          "Professional Training",
          "Computer Training",
          "Childcare",
          "Educational Services",
        ],
      },
      {
        id: "training-type",
        label: "Training Type",
        field: "trainingType",
        kind: "multi",
        options: [
          "Skills Training",
          "Computer Training",
          "Professional Training",
          "Driving School",
          "Childcare",
          "Tutoring",
        ],
      },
      {
        id: "subject",
        label: "Subject / Service",
        field: "subjects",
        kind: "multi",
        options: [
          "Mathematics",
          "Languages",
          "Science",
          "Business Studies",
          "Computer Literacy",
          "Driving",
          "Skills Training",
        ],
      },
      {
        id: "format",
        label: "Learning format",
        field: "learningFormat",
        kind: "multi",
        options: ["In Person", "Online", "Hybrid"],
      },
      {
        id: "age-group",
        label: "Age group",
        field: "ageGroup",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      locationFilter,
      { id: "price", label: "Price", field: "price", kind: "range", optional: true, unit: "ZAR" },
    ],
    sortOptions: [nameSort, relevanceSort, newestSort, lowPriceSort],
    resultNoun: "providers",
    emptyTitle: "No education and training listings yet.",
    emptyDescription: "We're growing the education and training network across Mpumalanga.",
    ownerHeading: "List your education business.",
    ownerDescription: "Help learners and families discover your courses and services.",
    ownerBenefits: businessOwnerBenefits,
  },
};

export const eventListings: EventListing[] = [];

export const categoryListings: Record<CategorySlug, CategoryListing[]> = {
  stay: [],
  eat: [],
  health: [],
  professional: [],
  "home-property": [],
  "personal-beauty": [],
  "travel-transport": [],
  events: eventListings,
  shop: [
    {
      id: "riverside-mall",
      slug: "riverside-mall",
      listingKind: "business",
      type: "Shopping Malls",
      name: "Riverside Mall",
      location: "Mbombela",
      address: "Government Boulevard, Mbombela, 1201",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "A shopping, dining and entertainment destination in Mbombela, with selected stores, restaurants and entertainment.",
      website: "https://riversidemall.co.za/",
      image: "https://riversidemall.co.za/wp-content/uploads/Riverside-Mall-Opengraph.jpg",
      imageAlt: "Riverside Mall in Mbombela",
      source: "https://riversidemall.co.za/",
      sourceUrl: "https://riversidemall.co.za/",
      latitude: -25.4371664,
      longitude: 30.9676139,
      locationAccuracy: "address",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "ilanga-mall",
      slug: "ilanga-mall",
      listingKind: "business",
      type: "Shopping Malls",
      name: "I’Langa Mall",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "A premium lifestyle and shopping destination in Mbombela, with stores, dining and entertainment.",
      website: "https://www.ilangamall.co.za/",
      image: "https://www.ilangamall.co.za/wp-content/uploads/2025/04/logo.png",
      imageAlt: "I’Langa Mall",
      imageFit: "contain",
      source: "https://www.ilangamall.co.za/",
      sourceUrl: "https://www.ilangamall.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
  ],
  travel: [],
  services: [],
  accommodation: [
    {
      id: "the-capital-mbombela",
      slug: "the-capital-mbombela",
      listingKind: "accommodation",
      name: "The Capital Mbombela",
      type: "Hotel",
      accommodationType: "Hotel",
      location: "Mbombela",
      area: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "The Capital Mbombela offers contemporary accommodation in the heart of Mbombela, combining a comfortable place to stay with practical amenities for both business and leisure travel.",
      amenities: [
        "Wi-Fi",
        "Swimming pool",
        "Restaurant",
        "Parking",
        "Air conditioning",
        "Reception",
        "Conference facilities",
        "Breakfast",
      ],
      facilities: ["On-site restaurant", "Reception", "Secure parking", "Pool deck"],
      website: "https://thecapital.co.za/destinations/mbombela/",
      bookingUrl: "https://thecapital.co.za/destinations/mbombela/",
      locationAccuracy: "approximate",
      claimed: true,
      verified: true,
      featured: true,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      source: "https://thecapital.co.za/destinations/mbombela/",
      sourceUrl: "https://thecapital.co.za/destinations/mbombela/",
      image: "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_One-Bedroom-11.jpg.webp",
      images: [
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_One-Bedroom-11.jpg.webp",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_One-Bedroom-18-768x432.jpg.webp",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_Pool-1-768x432.jpg.webp",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_Pool-4-768x432.jpg",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_Pool-18.jpg",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_Restaurant-45.jpg.webp",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_Restaurant-10-768x432.jpg.webp",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_Restaurant-43-768x432.jpg.webp",
        "https://thecapital.co.za/wp-content/uploads/2026/07/Mbombela_Front-Desk-4-768x432.jpg.webp",
      ],
      status: "published",
    },
  ],
  "professional-services": [],
  "home-construction": [],
  automotive: [],
  "food-dining": [
    {
      id: "pappas-kitchen",
      slug: "pappas-kitchen",
      listingKind: "business",
      type: "Restaurant",
      name: "Pappas Kitchen",
      subcategory: "Wood-fired pizza and Italian comfort food",
      cuisineTypes: ["Italian", "Pizza", "Pasta", "Burgers", "Shawarma"],
      diningType: "Restaurant",
      location: "Mbombela",
      address: "56 Brown St, Sonheuwel Central",
      province: "Mpumalanga",
      postalCode: "1200",
      country: "South Africa",
      latitude: -25.4709,
      longitude: 30.9739,
      locationAccuracy: "address",
      description:
        "Pappa's Kitchen is a family-owned Italian restaurant in Nelspruit serving wood-fired pizzas, pastas, burgers, shawarmas and comfort food since 1989. Dine in, takeaway and delivery are available.",
      services: ["Dine in", "Takeaway", "Delivery"],
      deliveryAvailable: true,
      phone: "+27 13 755 1660",
      menuUrl: "https://pappaskitchen.co.za/menu",
      socialLinks: [{ label: "Instagram", href: "https://instagram.com/pappas_kitchen_" }],
      openingHours: { Daily: "09:30–22:00" },
      image: "https://pappaskitchen.co.za/assets/IMG-20251125-WA0027_1764007158738-C2akuYl9.jpg",
      imageAlt: "Pappas Kitchen restaurant",
      images: [
        "https://pappaskitchen.co.za/assets/IMG-20251125-WA0027_1764007158738-C2akuYl9.jpg",
        "https://pappaskitchen.co.za/assets/IMG-20251125-WA0029_1764007158730-Dj5ql1qj.jpg",
        "https://pappaskitchen.co.za/assets/IMG-20251125-WA0033_1764007158702-C7OpEalk.jpg",
        "https://pappaskitchen.co.za/assets/IMG-20251125-WA0025_1764007158746-D9FaC28o.jpg",
      ],
      imageAlts: [
        "Pappas Kitchen restaurant",
        "Pappas Kitchen dining photo",
        "Pappas Kitchen food photo",
        "Pappas Kitchen restaurant photo",
      ],
      website: "https://pappaskitchen.co.za/",
      source: "https://pappaskitchen.co.za/",
      sourceUrl: "https://pappaskitchen.co.za/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
  ],
  "health-wellness": [],
  beauty: [],
  property: [],
  "events-entertainment": [],
  "education-training": [],
};

export const vehicleListings: VehicleListing[] = [];
export const propertyListings: PropertyListing[] = [];

export function getCategoryListings(category: CategorySlug): CategoryListing[] {
  const baseListings = categoryListings[category] ?? [];
  const crossListed = Object.values(categoryListings)
    .flat()
    .filter((listing) => listing.additionalCategorySlugs?.includes(category));
  return [...baseListings, ...crossListed];
}

export function getPublishedVehicleListings() {
  return vehicleListings.filter(isPublishedListing);
}

export function getPublishedPropertyListings() {
  return propertyListings.filter(isPublishedListing);
}

const listingConfirmationMaxAgeMs = 30 * 24 * 60 * 60 * 1000;

export function isListingDataCurrent(listing: CategoryListing, now = Date.now()) {
  const confirmedAt = Date.parse(listing.lastConfirmedAt ?? "");
  return (
    Number.isFinite(confirmedAt) &&
    confirmedAt <= now &&
    now - confirmedAt <= listingConfirmationMaxAgeMs
  );
}

export function getListingOpenStatus(listing: CategoryListing): boolean | undefined {
  const hasOpeningHours = Object.keys(listing.openingHours ?? {}).length > 0;
  return hasOpeningHours && isListingDataCurrent(listing) && typeof listing.openNow === "boolean"
    ? listing.openNow
    : undefined;
}

export function getListingConfirmationLabel(listing: CategoryListing) {
  const confirmedAt = Date.parse(listing.lastConfirmedAt ?? "");
  if (!Number.isFinite(confirmedAt) || confirmedAt > Date.now()) return undefined;
  const date = new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeZone: "Africa/Johannesburg",
  }).format(confirmedAt);
  return `${isListingDataCurrent(listing) ? "Confirmed" : "Last confirmed"} ${date}`;
}

export function isPublishedListing(listing: CategoryListing) {
  return listing.status === "published";
}

export function getPublishedCategoryListings() {
  const publishedBusinesses = (
    Object.entries(categoryListings) as [CategorySlug, CategoryListing[]][]
  ).flatMap(([category, listings]) =>
    listings.filter(isPublishedListing).map((listing) => ({ category, listing })),
  );
  return [
    ...publishedBusinesses,
    ...getPublishedVehicleListings().map((listing) => ({
      category: "automotive" as const,
      listing,
    })),
  ];
}

export function getPublishedListingsInLocation(location: string) {
  const normalizedLocation = location.trim().toLocaleLowerCase();
  return getPublishedCategoryListings().filter(
    ({ listing }) => listing.location?.trim().toLocaleLowerCase() === normalizedLocation,
  );
}

export function getBusinessSlug(listing: CategoryListing): string {
  const slugPart = (value: string) =>
    value
      .toLocaleLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  if (listing.slug) return slugPart(listing.slug) || "business-listing";
  return `${slugPart(listing.name) || "business"}-${slugPart(listing.id) || "listing"}`;
}

export function findBusinessBySlug(slug: string) {
  return getPublishedCategoryListings().find(
    ({ category, listing }) =>
      !(category === "events" && listing.listingKind === "event") &&
      getBusinessSlug(listing) === slug,
  );
}

export function findPropertyListingBySlug(slug: string) {
  return getPublishedPropertyListings().find((listing) => getBusinessSlug(listing) === slug);
}

export function searchTextMatches(searchableText: string, query: string): boolean {
  const ignoredTerms = new Set(["a", "an", "and", "for", "in", "me", "near", "the"]);
  const terms = query
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter((term) => term && !ignoredTerms.has(term));
  if (!terms.length) return query.trim().length === 0;
  const searchable = searchableText.toLocaleLowerCase();
  const searchableWords = searchable.split(/[^a-z0-9]+/).filter(Boolean);
  return terms.every((term) => {
    const normalizedTerm = normalizeSearchWord(term);
    return (
      searchable.includes(term) ||
      searchableWords.some(
        (word) => word.includes(term) || normalizeSearchWord(word) === normalizedTerm,
      )
    );
  });
}

function normalizeSearchWord(term: string): string {
  return term
    .toLocaleLowerCase()
    .replace(/ers$/, "")
    .replace(/er$/, "")
    .replace(/ing$/, "")
    .replace(/s$/, "");
}
