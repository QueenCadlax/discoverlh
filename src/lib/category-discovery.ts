import { findDiscoveryLocation, mpumalangaLocations } from "./location-discovery";

export type CategorySlug =
  | "stay"
  | "eat"
  | "health"
  | "professional"
  | "home-property"
  | "travel-transport"
  | "leisure-entertainment"
  | "shop"
  | "travel"
  | "services"
  | "accommodation"
  | "professional-services"
  | "home-construction"
  | "automotive"
  | "food-dining"
  | "health-wellness"
  | "property"
  | "education-training"
  | "beauty-wellness-fitness"
  | "events"
  | "agriculture"
  | "security";

export const primaryDiscoveryCategorySlugs = [
  "stay",
  "eat",
  "shop",
  "health",
  "professional",
  "home-property",
  "automotive",
  "travel-transport",
  "leisure-entertainment",
  "beauty-wellness-fitness",
  "events",
  "education-training",
  "agriculture",
  "security",
] as const satisfies readonly CategorySlug[];

export const newDiscoveryCategorySlugs = [
  "beauty-wellness-fitness",
  "events",
  "education-training",
  "agriculture",
  "security",
] as const satisfies readonly PrimaryDiscoveryCategorySlug[];

export type PrimaryDiscoveryCategorySlug = (typeof primaryDiscoveryCategorySlugs)[number];

export function getCanonicalCategorySlug(category: CategorySlug): CategorySlug {
  if (category === "accommodation") return "stay";
  if (category === "food-dining") return "eat";
  return category;
}

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
    "Spas",
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
    "Other Professional Services",
  ],
  "home-property": [
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
  "leisure-entertainment": [
    "Casino & Entertainment",
    "Water Park & Recreation",
    "Attractions",
    "Family Entertainment",
    "Adventure Activities",
    "Outdoor Experiences",
    "Cinema & Theatre",
    "Gaming & Nightlife",
    "Tourist Attractions",
    "Amusement Parks",
    "Activity Centres",
    "Experiences",
  ],
  "beauty-wellness-fitness": [
    "Hair & Barbers",
    "Nails & Lashes",
    "Spas & Wellness",
    "Skincare & Aesthetics",
    "Makeup Artists & Beauty Therapists",
    "Gyms & Fitness",
    "Personal Trainers",
  ],
  events: [
    "Wedding Venues",
    "Event Planners",
    "Decor & Styling",
    "Photography & Video",
    "Catering",
    "Florists",
    "Bridal Boutiques",
    "Conference & Function Venues",
    "DJs & Entertainment",
    "Equipment Hire",
  ],
  "education-training": [
    "Schools & Preschools",
    "Creches",
    "Tutors",
    "Driving Schools",
    "Vocational Training",
    "Computer Training",
    "Skills Development",
    "Music & Art Schools",
    "Professional Training",
  ],
  agriculture: [
    "Agricultural Suppliers",
    "Farm Equipment",
    "Irrigation",
    "Seeds & Fertiliser",
    "Animal Feed",
    "Agricultural Services",
    "Forestry",
  ],
  security: [
    "Security Companies",
    "Guarding Services",
    "Armed Response",
    "CCTV & Surveillance",
    "Alarm Systems",
    "Access Control",
    "Electric Fencing",
  ],
};

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
  visitorInformation?: string[];
  features?: string[];
  bookingUrl?: string;
  orderingUrl?: string;
  seeded?: boolean;
  sourceType?: "seeded_public_data";
  sourceUrl?: string;
  additionalCategorySlugs?: CategorySlug[];
  locationAccuracy?: "address" | "approximate";
  restaurantProfile?: {
    story: string[];
    experienceHighlights: { title: string; description: string }[];
    menuLinks: { label: string; description: string; href: string }[];
    storyHeading?: string;
    experienceEyebrow?: string;
    experienceHeading?: string;
    menuIntroduction?: string;
    recognition?: string[];
    celebrationTypes?: string[];
  };
  seoTitle?: string;
  seoDescription?: string;
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
  imageSourceUrls?: string[];
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
  transactionType?: "For Sale" | "To Rent" | "Holiday" | "Commercial";
  price?: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  floorSize?: number;
  erfSize?: number;
  agentId?: string;
  agencyId?: string;
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
  parentSlug?: CategorySlug;
  childSlugs?: readonly CategorySlug[];
  relatedSlugs?: readonly CategorySlug[];
  searchKeywords?: readonly string[];
  relevantLocationSlugs?: readonly string[];
  indexability?: "data-dependent" | "always";
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
  field = "type",
): CategoryFilterConfig => ({
  id: "category-type",
  label,
  field,
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
  "Home Services": "home-property",
  Property: "property",
  Automotive: "automotive",
  "Travel & Transport": "travel-transport",
  "Leisure & Entertainment": "leisure-entertainment",
  "Beauty, Wellness & Fitness": "beauty-wellness-fitness",
  "Events, Weddings & Celebrations": "events",
  "Education & Training": "education-training",
  "Agriculture & Farming": "agriculture",
  "Security Services": "security",
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
    label: "Home Services",
    description: "Find trusted home services and trades across Mpumalanga.",
    shortDescription: "Plumbing, building, electrical and home services.",
    searchPlaceholder: "Search home services...",
    typeLabel: "Home Service",
    subcategories: discoverySubcategories["home-property"],
    heroImage: "/PROPERTY.jpg",
    icon: "home-property",
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
  "leisure-entertainment": {
    slug: "leisure-entertainment",
    label: "Leisure & Entertainment",
    eyebrow: "Leisure & Entertainment",
    headline: "Find something worth experiencing.",
    description: "Discover places to relax, play, explore and enjoy across the Lowveld.",
    shortDescription: "Attractions, recreation and experiences across Mpumalanga.",
    seoTitle: "Leisure & Entertainment in Mpumalanga | Discover by Lowveld Hub",
    seoDescription:
      "Find things to do in Mpumalanga, from entertainment in Mbombela to water parks and attractions across the Lowveld.",
    searchPlaceholder: "Search casinos, attractions or experiences...",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "location",
      "address",
      "description",
      "services",
      "facilities",
    ],
    heroImage: "/leisure/mafunyane-pool-and-slide.jpg",
    icon: "leisure-entertainment",
    iconAlt: "Leisure and entertainment category",
    cardVariant: "venue",
    cardFields: [{ label: "Location", field: "location" }],
    filters: [
      categoryTypeFilter(
        "Experience Type",
        discoverySubcategories["leisure-entertainment"],
        "multi",
      ),
      discoveryLocationFilter,
    ],
    sortOptions: [nameSort],
    resultNoun: "places",
    emptyTitle: "More to discover",
    emptyDescription: "We're adding more places and experiences across the Lowveld.",
    ownerHeading: "List a leisure or entertainment business.",
    ownerDescription: "Help people discover the places and experiences you offer.",
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
        ...discoverySubcategories["home-property"],
        ...discoverySubcategories.automotive,
        ...discoverySubcategories.health,
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
  property: {
    slug: "property",
    label: "Property",
    eyebrow: "Property",
    headline: "Property in Mpumalanga",
    description:
      "Find homes, rentals, land, commercial spaces and property professionals across Mpumalanga.",
    shortDescription: "Find property across Mpumalanga.",
    searchPlaceholder: "Search properties, estate agents, rentals...",
    icon: "property",
    iconAlt: "Property category",
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
    headline: "Education & Training in Mpumalanga",
    description:
      "Explore schools, tutors, training providers and learning opportunities across Mpumalanga.",
    shortDescription: "Schools, tutors and skills training.",
    seoTitle: "Education & Training in Mpumalanga | Discover by Lowveld Hub",
    seoDescription:
      "Explore schools, tutors, driving schools and skills training providers across Mpumalanga.",
    searchPlaceholder: "Search schools, tutors, courses...",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "educationType",
      "trainingType",
      "level",
      "subject",
      "subjects",
      "course",
      "location",
      "description",
      "services",
    ],
    heroImage: "",
    icon: "education-training",
    iconAlt: "Education and training category",
    cardVariant: "education",
    cardFields: [
      { label: "Type", field: "educationType" },
      { label: "Courses", field: "courses" },
      { label: "Format", field: "learningFormat" },
    ],
    filters: [
      categoryTypeFilter(
        "Education type",
        discoverySubcategories["education-training"],
        "multi",
        "educationType",
      ),
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
    indexability: "always",
  },
  "beauty-wellness-fitness": {
    ...primaryCategoryConfig({
      slug: "beauty-wellness-fitness",
      label: "Beauty, Wellness & Fitness",
      description:
        "Discover beauty professionals, wellness spaces, salons and fitness services across Mpumalanga.",
      shortDescription: "Beauty professionals, wellness spaces and fitness services.",
      searchPlaceholder: "Search salons, spas, gyms or beauty services...",
      typeLabel: "Service type",
      subcategories: discoverySubcategories["beauty-wellness-fitness"],
      heroImage: "",
      icon: "beauty-wellness-fitness",
    }),
    headline: "Beauty, Wellness & Fitness in Mpumalanga",
    seoTitle: "Beauty, Wellness & Fitness in Mpumalanga | Discover",
    seoDescription:
      "Find salons, spas, skincare professionals, gyms and fitness services across Mpumalanga.",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "serviceType",
      "services",
      "products",
      "location",
      "description",
    ],
    resultNoun: "providers",
    indexability: "always",
    emptyTitle: "Beauty and wellness listings are being added.",
    emptyDescription:
      "Explore this category again soon as salons, wellness practitioners and fitness providers join Discover.",
    ownerHeading: "List your beauty, wellness or fitness business.",
    ownerDescription:
      "Help people find your salon, spa, studio or fitness services across Mpumalanga.",
  },
  events: {
    ...primaryCategoryConfig({
      slug: "events",
      label: "Events, Weddings & Celebrations",
      description: "Find wedding venues, event specialists and suppliers for memorable occasions.",
      shortDescription: "Venues and suppliers for weddings and events.",
      searchPlaceholder: "Search venues, planners or event services...",
      typeLabel: "Event service",
      subcategories: discoverySubcategories.events,
      heroImage: "",
      icon: "events",
    }),
    headline: "Events, Weddings & Celebrations in Mpumalanga",
    seoTitle: "Events, Weddings & Celebrations in Mpumalanga | Discover",
    seoDescription:
      "Find wedding venues, event planners, caterers, photographers and celebration suppliers across Mpumalanga.",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "serviceType",
      "services",
      "products",
      "location",
      "description",
    ],
    resultNoun: "event providers",
    indexability: "always",
    emptyTitle: "Event listings are being added.",
    emptyDescription:
      "Wedding venues, event specialists and celebration suppliers will appear here as genuine listings are added.",
    ownerHeading: "List your event or wedding business.",
    ownerDescription:
      "Help people planning weddings, celebrations and functions discover your services.",
  },
  agriculture: {
    ...primaryCategoryConfig({
      slug: "agriculture",
      label: "Agriculture & Farming",
      description:
        "Discover agricultural suppliers, farming services and equipment providers across the region.",
      shortDescription: "Farming supplies, equipment and agricultural support.",
      searchPlaceholder: "Search farm supplies, equipment or services...",
      typeLabel: "Agricultural service",
      subcategories: discoverySubcategories.agriculture,
      heroImage: "",
      icon: "agriculture",
    }),
    headline: "Agriculture & Farming in Mpumalanga",
    seoTitle: "Agriculture & Farming in Mpumalanga | Discover",
    seoDescription:
      "Explore agricultural suppliers, farm equipment, irrigation and farming support services across Mpumalanga.",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "serviceType",
      "services",
      "products",
      "location",
      "description",
    ],
    resultNoun: "agricultural providers",
    indexability: "always",
    emptyTitle: "Agriculture listings are being added.",
    emptyDescription:
      "Agricultural suppliers, equipment providers and farming support services will appear as genuine listings are added.",
    ownerHeading: "List your agricultural business.",
    ownerDescription:
      "Help farmers and growers discover your products, equipment or support services.",
  },
  security: {
    ...primaryCategoryConfig({
      slug: "security",
      label: "Security Services",
      description:
        "Find security companies and specialists offering protection, surveillance and access-control solutions.",
      shortDescription: "Security, surveillance and access control.",
      searchPlaceholder: "Search security, CCTV or alarm services...",
      typeLabel: "Security service",
      subcategories: discoverySubcategories.security,
      heroImage: "",
      icon: "security",
    }),
    headline: "Security Services in Mpumalanga",
    seoTitle: "Security Services in Mpumalanga | Discover",
    seoDescription:
      "Find security companies, guarding, armed response, CCTV, alarms and access-control specialists in Mpumalanga.",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "serviceType",
      "services",
      "products",
      "location",
      "description",
    ],
    resultNoun: "security providers",
    indexability: "always",
    emptyTitle: "Security listings are being added.",
    emptyDescription:
      "Security companies and installation specialists will appear here as genuine listings are added.",
    ownerHeading: "List your security business.",
    ownerDescription:
      "Help households and businesses discover your security services across Mpumalanga.",
  },
};

const leisureEntertainmentListings: CategoryListing[] = [
  {
    id: "emnotweni-casino",
    slug: "emnotweni-casino",
    listingKind: "business",
    type: "Casino & Entertainment",
    subcategory: "Casino & Entertainment",
    name: "Emnotweni Casino",
    location: "Mbombela",
    province: "Mpumalanga",
    country: "South Africa",
    description:
      "Emnotweni Casino brings gaming, dining and entertainment together in Mbombela. Its official site lists slot machines, table games and dining; check there for current visitor information.",
    image: "/leisure/emnotweni-casino-floor.jpg",
    imageAlt: "Representative casino gaming floor; this is not a photograph of Emnotweni",
    images: ["/leisure/emnotweni-bel-ombre-dining.jpg", "/leisure/emnotweni-deli.jpg"],
    imageAlts: [
      "Restaurant dining room image supplied for Emnotweni",
      "Deli food image supplied for Emnotweni",
    ],
    imageSourceUrls: [
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://zb2g8qspmxpc-u2909.pressidiumcdn.com/wp-content/uploads/elementor/thumbs/belombrehome-rlzvapgckbuwmsohk8xs1gldd9fftxjxzv564pufyi.jpg",
      "https://zb2g8qspmxpc-u2909.pressidiumcdn.com/wp-content/uploads/elementor/thumbs/DELI-main-image-rlzwdwc3iniaphr3possi2k90m9drm51puczh1qiiy.jpg",
    ],
    website: "https://www.tsogosun.com/casino/emnotweni-home/",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Emnotweni+Casino+Mbombela+Mpumalanga",
    services: ["Slot machines", "Table games", "Dining", "Entertainment"],
    seoTitle: "Emnotweni Casino | Discover by Lowveld Hub",
    seoDescription:
      "Discover Emnotweni Casino in Mbombela, with gaming, dining and entertainment. Check the official site for current visitor information.",
    source: "https://www.tsogosun.com/casino/emnotweni-home/",
    sourceUrl: "https://www.tsogosun.com/casino/emnotweni-home/",
    locationAccuracy: "approximate",
    seeded: true,
    sourceType: "seeded_public_data",
    claimed: false,
    verified: false,
    status: "published",
  },
  {
    id: "mafunyane-water-park",
    slug: "mafunyane-water-park",
    listingKind: "business",
    type: "Water Park & Recreation",
    subcategory: "Water Park & Recreation",
    name: "Mafunyane Water Park",
    location: "Mbombela",
    province: "Mpumalanga",
    country: "South Africa",
    description:
      "A seasonal water park in Mbombela with water rides, a recreational pool and an adventure river with tubes. The park also lists shaded seating, braai facilities and a tuck shop. Hours and ride availability depend on the season and weather, so check the official site before visiting.",
    image: "/leisure/mafunyane-pool-and-slide.jpg",
    imageAlt: "Pool and water slides at Mafunyane Water Park",
    images: [
      "/leisure/mafunyane-aerial-pools.jpg",
      "/leisure/mafunyane-recreational-pool.jpg",
      "/leisure/mafunyane-water-slide.jpg",
      "/leisure/mafunyane-entrance.jpg",
    ],
    imageAlts: [
      "Aerial view of pools and slides at Mafunyane Water Park",
      "Visitors in the recreational pool at Mafunyane Water Park",
      "Water slide at Mafunyane Water Park",
      "Mafunyane Water Park entrance",
    ],
    imageSourceUrls: [
      "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlkxY92bd9mIKy1M-CSenSKkO6HibdTb1XWBxCTQVeQeWNJMfCQo-hMw8ke5QDwhGDqq5c9eWCcSyPnuEVxiHg17CpKEbfxv1OhfBb9RKbJaos7jjOqK0SbjEkkaVgH_keLzRAH=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlJWQV22oRMWf8O0cG1QwDtyjO8V1HbZAWrEWi51tRbJc_13d40gpaTemjeHCCXdoh_daSCl9ZWryo7G0wgSvDMOhjb3pnNTNch7FzOTty435_tQ7gJFWE7-q_pdzeYEgoFs2VMZQ=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlUvqp2xNhLHCYG4kmC4UjYJLpbhYIJqQVTw18iYRJDpAYOX2N40uWw5ADqt1rMMsNZeDu4QZ6QdzjZ-dL9ruI0MbdDg3O1xZsOfOXKnx5CT5GHRZqs_X455tBFQVkTdJkcVP6t=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnbQNk-EdbwJAGm3Pz_XSd65NW3Mau8xKcUYkTSK_Ep-CVYAsrf5qMWnaw0S9EK1kpk1_2K_w7Av-kGTDTDumtNfwW_Wa5s4fODuGJJqzU0m3HJcSy0BIo8SxvzpB-QoUO_PB3y=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlz6_ZBEH3VrLabr8c2twzxlDxL6HYHQ5UivWs2sUPq-y--kxh3wPzT4l2KmRcIZV8-kCJgECVfkjv1EL1ZnG1LDErMG3oqMQkrPJDriD_E3CS3E2gHzECV5Co8s10_9Rtl-iBwFMTOEE3S=s680-w680-h510-rw",
    ],
    website: "https://www.mafunyane.co.za/",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mafunyane+Riverside+Water+Park+Mbombela+Mpumalanga",
    socialLinks: [{ label: "Facebook", href: "https://www.facebook.com/mafunyanewaterpark/" }],
    services: ["11 water rides", "Recreational pool", "Adventure river with tubes"],
    facilities: [
      "Wheelchair access",
      "Shaded seating",
      "Braai facilities",
      "Tuck shop and takeaways",
      "Parking",
    ],
    visitorInformation: [
      "Children under 12 must be accompanied by a parent or guardian.",
      "Proper swimwear is required; glass items are not allowed.",
      "Weather and safety conditions can affect ride and pool availability.",
    ],
    openingHours: {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "14:00–17:00",
      Thursday: "14:00–17:00",
      Friday: "14:00–17:00",
      Saturday: "09:30–17:00",
      Sunday: "09:30–17:00",
      "Public and school holidays": "09:30–17:00",
    },
    seoTitle: "Mafunyane Water Park | Discover by Lowveld Hub",
    seoDescription:
      "Plan a day at Mafunyane Water Park in Mbombela, with water rides, a recreational pool and an adventure river. Check seasonal hours before visiting.",
    source: "https://www.mafunyane.co.za/",
    sourceUrl: "https://www.mafunyane.co.za/",
    locationAccuracy: "approximate",
    seeded: true,
    sourceType: "seeded_public_data",
    claimed: false,
    verified: false,
    status: "published",
  },
];

const oceanBasketGalleryImages = [
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/06/insert-prawns.png",
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/06/big5-fish.jpg",
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/06/big5-sushi.jpg",
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/06/big5-mussels.jpg",
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/06/big5-prawns.jpg",
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/06/big5-cala.jpg",
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/07/menu-baklava.jpg",
  "https://za.oceanbasket.com/wp-content/uploads/sites/2/2025/07/menu-full-deck-filp.jpg",
];

const oceanBasketGalleryAlts = [
  "Ocean Basket prawns dish",
  "Ocean Basket Big 5 fish dish",
  "Ocean Basket Big 5 sushi",
  "Ocean Basket Big 5 mussels dish",
  "Ocean Basket Big 5 prawns dish",
  "Ocean Basket Big 5 calamari dish",
  "Baklava dessert from the Ocean Basket menu",
  "Ocean Basket menu selection",
];

export const categoryListings: Record<CategorySlug, CategoryListing[]> = {
  stay: [],
  eat: [],
  "beauty-wellness-fitness": [],
  events: [],
  agriculture: [],
  security: [],
  "education-training": [],
  health: [
    {
      id: "mediclinic-nelspruit",
      slug: "mediclinic-nelspruit",
      listingKind: "business",
      type: "Private Hospital",
      name: "Mediclinic Nelspruit",
      subcategory: "Hospital",
      location: "Sonheuwel, Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      address: "1 Louise Street, Sonheuwel, Mbombela, Mpumalanga, South Africa",
      description:
        "Mediclinic Nelspruit is a private hospital in Sonheuwel providing emergency care, specialist services, diagnostics and inpatient support to the broader Lowveld community.",
      image:
        "https://mediclinic.scene7.com/is/image/mediclinic/Mediclinic%20Nelspruit?_ck=1616192312977",
      imageAlt: "Mediclinic Nelspruit hospital building and main facility",
      website: "https://www.mediclinic.co.za/en/nelspruit/home.html",
      phone: "086 117 4448",
      emergencyPhone: "013 759 0645",
      phoneAlt: "013 759 0500",
      services: [
        "Emergency Centre",
        "Cardiac Intensive Care",
        "Neonatal Intensive Care",
        "Woundcare Clinic",
        "Cathlab",
        "CT",
        "MRI",
        "Nuclear Medicine",
        "Oncology",
        "Pathology",
        "PET CT",
        "Radiology",
        "Renal Dialysis",
      ],
      source: "https://www.mediclinic.co.za/en/nelspruit/home.html",
      sourceUrl: "https://www.mediclinic.co.za/en/nelspruit/home.html",
      locationAccuracy: "address",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: true,
      featured: true,
      status: "published",
    },
    {
      id: "kiaat-private-hospital",
      slug: "kiaat-private-hospital",
      listingKind: "business",
      type: "Private Hospital",
      name: "Kiaat Private Hospital",
      subcategory: "Hospital",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Kiaat Private Hospital is a private medical facility in Mbombela serving the local community with hospital-level care and specialist treatment.",
      image:
        "https://z-p3-scontent.fjnb12-1.fna.fbcdn.net/v/t39.30808-1/558046305_1253818243428267_2769257100528381657_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s720x720&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=3ab345&_nc_ohc=8Lf40eJ8sJUQ7kNvwHaqW-H&_nc_oc=AdpjOV9h0NreF9WMSjyhVTauoyKmm0y_rmMeiwglYvV_bhBY6h3whgmCupl0pzyMuOg&_nc_zt=24&_nc_ht=z-p3-scontent.fjnb12-1.fna&_nc_gid=-eFzjrI8yrHq0-Fl3-Ac2A&_nc_ss=7f100&oh=00_AQOB9OJWYe2V-ZzGXyeqjWVjGECGmDT06s84CXr8CvuPGw&oe=6ACBA080",
      services: ["Hospital care", "Specialist services", "Medical treatment", "Patient support"],
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "clicks-pharmacy-riverside",
      slug: "clicks-pharmacy-riverside",
      listingKind: "business",
      type: "Pharmacy",
      name: "Clicks Pharmacy Riverside",
      subcategory: "Pharmacy",
      location: "Riverside, Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Clicks Pharmacy Riverside is a community pharmacy in Mbombela offering prescription services, day-to-day health products and wellness support.",
      image: "https://riversidemall.co.za/wp-content/uploads/Clicks.jpg",
      imageAlt: "Clicks Pharmacy Riverside brand signage and store identity",
      website: "https://www.clicks.co.za/",
      services: [
        "Prescription services",
        "Health and beauty products",
        "Over-the-counter medication",
        "Vaccinations",
        "Chronic medication",
        "Baby care",
      ],
      source: "https://www.clicks.co.za/",
      sourceUrl: "https://www.clicks.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "dischem-pharmacy-ilanga-mall",
      slug: "dischem-pharmacy-ilanga-mall",
      listingKind: "business",
      type: "Pharmacy",
      name: "Dis-Chem Pharmacy i'Langa Mall",
      subcategory: "Pharmacy",
      location: "iLanga Mall, Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Dis-Chem Pharmacy at iLanga Mall offers a broad pharmacy, wellness and healthcare retail service for local shoppers and families in Mbombela.",
      image: "https://www.ilangamall.co.za/wp-content/uploads/2025/05/dischem.jpg",
      imageAlt: "Dis-Chem pharmacy at i'Langa Mall",
      website: "https://www.dischem.co.za/",
      services: [
        "Prescription services",
        "Chronic medication",
        "Vaccinations",
        "Health screening",
        "Beauty and wellness products",
        "Medical aid services",
      ],
      source: "https://www.dischem.co.za/",
      sourceUrl: "https://www.dischem.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "pathcare-nelspruit",
      slug: "pathcare-nelspruit",
      listingKind: "business",
      type: "Laboratory",
      name: "PathCare Nelspruit",
      subcategory: "Laboratory",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "PathCare Nelspruit provides pathology and laboratory services for medical practitioners and patients across the Lowveld.",
      image: "https://www.panoramahcc.co.za/wp-content/uploads/2020/07/pathcare-logo.png",
      imageAlt: "PathCare Nelspruit laboratory branding",
      website: "https://www.pathcare.co.za/",
      services: [
        "Pathology tests",
        "Diagnostic laboratory services",
        "Medical screening",
        "Patient result support",
      ],
      source: "https://www.pathcare.co.za/",
      sourceUrl: "https://www.pathcare.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "ampath-laboratories-nelspruit",
      slug: "ampath-laboratories-nelspruit",
      listingKind: "business",
      type: "Laboratory",
      name: "Ampath Laboratories Nelspruit",
      subcategory: "Laboratory",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Ampath Laboratories Nelspruit provides diagnostic laboratory services and patient results support for healthcare providers and patients in the Lowveld.",
      image: "https://www.ampath.co.za/img/logo.svg",
      imageAlt: "Ampath Laboratories official company logo",
      website: "https://www.ampath.co.za/",
      services: ["Laboratory testing", "Diagnostic pathology", "Patient results support"],
      source: "https://www.ampath.co.za/",
      sourceUrl: "https://www.ampath.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "lancet-laboratories-nelspruit",
      slug: "lancet-laboratories-nelspruit",
      listingKind: "business",
      type: "Laboratory",
      name: "Lancet Laboratories Nelspruit",
      subcategory: "Laboratory",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Lancet Laboratories Nelspruit provides pathology and testing services to support medical diagnosis and ongoing patient care in the region.",
      image: "https://www.lancet.co.za/wp-content/uploads/2022/03/IMG_4019-scaled.jpg",
      imageAlt: "Lancet Laboratories facility image",
      website: "https://www.lancet.co.za/",
      services: ["Pathology services", "Diagnostic testing", "Medical laboratory support"],
      source: "https://www.lancet.co.za/",
      sourceUrl: "https://www.lancet.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "medicross-nelspruit",
      slug: "medicross-nelspruit",
      listingKind: "business",
      type: "Medical Centre",
      name: "MediCross Nelspruit",
      subcategory: "Medical Centre",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "MediCross Nelspruit is a medical centre providing accessible primary healthcare and clinical support services in Mbombela.",
      image: "https://nelmed.co.za/wp-content/uploads/2020/12/nelmed-logo.png",
      imageAlt: "Nelmed Medicross logo",
      website: "https://www.medicross.co.za/",
      services: ["Primary healthcare", "Clinical consultations", "General medical care"],
      source: "https://www.medicross.co.za/",
      sourceUrl: "https://www.medicross.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: true,
      verified: false,
      featured: true,
      status: "published",
    },
  ],
  "professional-services": [],
  "home-property": [],
  "travel-transport": [],
  "leisure-entertainment": leisureEntertainmentListings,
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
    {
      id: "matumi-golf-lodge",
      slug: "matumi-golf-lodge",
      listingKind: "accommodation",
      name: "Matumi Golf Lodge",
      type: "Lodge",
      accommodationType: "Lodge",
      location: "Mbombela / Nelspruit",
      area: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Matumi Golf Lodge is situated on a golf estate, offering luxurious accommodation, exceptional service, and a range of activities, the ultimate choice for accommodation in Nelspruit.",
      roomCount: 6,
      roomTypes: [
        "Standard suite",
        "Family suite",
        "Honeymoon suite",
        "Luxury suite",
        "Executive suite",
      ],
      amenities: [
        "Free Wi-Fi",
        "Private bathrooms",
        "Fridge",
        "Flat screen with DStv",
        "Microwave in room",
        "Ceiling fans",
        "Swimming pool",
        "Golf",
        "Conference facility",
        "Airport transfers",
        "Family room",
      ],
      facilities: [
        "Swimming pool",
        "Golf estate setting",
        "Conference facility",
        "Airport transfers",
        "Family room",
      ],
      email: "bookings@matumigolflodge.co.za",
      website: "https://matumigolflodge.co.za/",
      bookingUrl: "http://matumigolflodge.co.za/book/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Matumi+Golf+Lodge+Nelspruit+Mpumalanga",
      locationAccuracy: "approximate",
      claimed: true,
      verified: true,
      featured: true,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      source: "https://matumigolflodge.co.za/",
      sourceUrl: "https://matumigolflodge.co.za/accommodation/",
      image: "https://matumigolflodge.co.za/wp-content/uploads/2025/01/3.png",
      images: [
        "https://matumigolflodge.co.za/wp-content/uploads/2025/01/3.png",
        "https://matumigolflodge.co.za/wp-content/uploads/2025/01/2.png",
        "https://matumigolflodge.co.za/wp-content/uploads/2025/01/1.png",
        "https://matumigolflodge.co.za/wp-content/uploads/2025/01/5.png",
        "https://matumigolflodge.co.za/wp-content/uploads/2025/01/Kamer-4-3-1024x683.jpg",
        "https://matumigolflodge.co.za/wp-content/uploads/2025/01/Kamer-7-5-1024x683.jpg",
      ],
      imageAlt: "Matumi Golf Lodge accommodation exterior and guest room setting",
      imageAlts: [
        "Matumi Golf Lodge accommodation exterior and guest room setting",
        "Matumi Golf Lodge property view",
        "Matumi Golf Lodge guest room and interior",
        "Matumi Golf Lodge lifestyle image",
        "Matumi Golf Lodge bedroom setting",
        "Matumi Golf Lodge guest room view",
      ],
      seoTitle: "Matumi Golf Lodge | Accommodation in Mbombela | Discover",
      seoDescription:
        "Discover Matumi Golf Lodge in Mbombela. Explore the golf estate accommodation, rooms, amenities, booking and stay experience on Discover by Lowveld Hub.",
      status: "published",
    },
    {
      id: "kinloch-lodge",
      slug: "kinloch-lodge",
      listingKind: "accommodation",
      name: "Kinloch Lodge",
      type: "Self-catering cottages",
      accommodationType: "Lodge",
      location: "Dullstroom",
      area: "Dullstroom",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Kinloch Lodge is a beautiful self-catering farm perfectly situated 12 km outside Dullstroom, offering five cottages that can host up to 14 guests together and a peaceful countryside setting with fishing dams, hiking paths and scenic views.",
      roomCount: 5,
      roomTypes: ["Dunbar Cottage", "Inverness", "Skye", "Sterling"],
      amenities: [
        "Self-catering",
        "Kitchenette",
        "Braai",
        "Private patio",
        "Linen and towels provided",
        "Gas heater",
        "Fishing dams",
        "Walking trails",
        "Scenic views",
      ],
      facilities: [
        "Self-catering cottages",
        "Fishing dams",
        "Hiking trails",
        "Private patios",
        "Farm setting",
      ],
      phone: "+27 13 254 0020",
      website: "https://dullstroom.co.za/kinloch-lodge-dunbar/",
      bookingUrl: "https://dullstroom.co.za/kinloch-lodge-dunbar/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Kinloch+Lodge+Dullstroom+Mpumalanga",
      source: "https://dullstroom.co.za/kinloch-lodge-dunbar/",
      sourceUrl: "https://dullstroom.co.za/kinloch-lodge-dunbar/",
      image:
        "https://dullstroom.co.za/wp-content/uploads/2022/10/kinloch-landscapes-1-1024x683.jpg",
      images: [
        "https://dullstroom.co.za/wp-content/uploads/2022/10/kinloch-landscapes-1-1024x683.jpg",
        "https://dullstroom.co.za/wp-content/uploads/2022/10/kinloch-landscapes-22-1024x683.jpg",
        "https://dullstroom.co.za/wp-content/uploads/2022/10/kinloch-skye-4.jpg",
        "https://dullstroom.co.za/wp-content/uploads/2022/10/kinloch-skye-10.jpg",
        "https://dullstroom.co.za/wp-content/uploads/2022/10/kinloch-Inverness-11.jpg",
        "https://dullstroom.co.za/wp-content/uploads/2022/10/kinloch-Inverness-12.jpg",
      ],
      imageAlt: "Kinloch Lodge scenic Dullstroom farm setting and self-catering cottages",
      imageAlts: [
        "Kinloch Lodge scenic Dullstroom farm setting and self-catering cottages",
        "Kinloch Lodge landscape view in Dullstroom",
        "Kinloch Lodge cottage exterior and building detail",
        "Kinloch Lodge interior and cottage detail",
        "Kinloch Lodge Inverness cottage and surroundings",
        "Kinloch Lodge cottage feature and view",
      ],
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: true,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      seoTitle: "Kinloch Lodge | Dullstroom Accommodation | Discover",
      seoDescription:
        "Discover Kinloch Lodge in Dullstroom: self-catering cottages, fishing dams, scenic farm views and a peaceful country escape in Mpumalanga.",
      status: "published",
    },
    {
      id: "summerfields-rose-retreat-and-spa",
      slug: "summerfields-rose-retreat-and-spa",
      listingKind: "accommodation",
      name: "Summerfields Rose Retreat & Spa",
      type: "Retreat",
      accommodationType: "Retreat",
      location: "Hazyview",
      area: "Hazyview",
      province: "Mpumalanga",
      country: "South Africa",
      address: "R536 Hazyview-Sabie Road, Hazyview 1242, South Africa",
      latitude: -25.039972222222225,
      longitude: 31.081444444444443,
      description:
        "Summerfields is a luxury riverside retreat on the Sabie River, offering secluded tented suites, spa experiences, farm-to-table dining and a peaceful Lowveld escape close to the Kruger National Park.",
      roomCount: 11,
      roomTypes: ["Luxury tented suites", "Forest suite", "Family houses"],
      amenities: [
        "Wi-Fi",
        "Air conditioning",
        "Private bath and outdoor shower",
        "Fridge",
        "Tea and coffee facilities",
        "Hairdryer",
        "Electronic safe",
        "Spa",
        "Dining",
        "Garden and river setting",
      ],
      facilities: [
        "Luxury tented suites",
        "Rose Spa",
        "River Café",
        "Garden and river setting",
        "Farm experience",
      ],
      phone: "+27 13 737 6500",
      email: "reservations@summerfields.co.za",
      website: "https://summerfields.co.za/",
      bookingUrl: "https://booking.roomraccoon.co.za/summerfields-farm-lodge/en/?&coupon=STAY2026",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Summerfields+Rose+Retreat+%26+Spa+Hazyview",
      image:
        "https://summerfields.co.za/assets/components/phpthumbof/cache/main.0e6722299908c36e20e76670c67c08f5.jpg",
      images: [
        "https://summerfields.co.za/assets/components/phpthumbof/cache/main.0e6722299908c36e20e76670c67c08f5.jpg",
        "https://summerfields.co.za/assets/components/phpthumbof/cache/70af0f8e-d8d8-4bc4-bbcb-24e6ebca8eea.0e6722299908c36e20e76670c67c08f5.jpg",
        "https://summerfields.co.za/assets/components/phpthumbof/cache/9b356b74-34db-4cfa-b09e-7ffa0d5b31f1.0e6722299908c36e20e76670c67c08f5.jpg",
        "https://summerfields.co.za/assets/components/phpthumbof/cache/image00005.69cecccc100f974c4c3582b32f024c6e.jpg",
        "https://summerfields.co.za/assets/components/phpthumbof/cache/summerfields-11.21f12ef76a00375e69e785dd090998e5.jpg",
        "https://summerfields.co.za/assets/components/phpthumbof/cache/summerfields-retreat-unit-12-king-kong-tented-suite-08112022-221226.5168ed2164611789634fbdb75641a819.jpg",
      ],
      imageAlt: "Summerfields Rose Retreat & Spa luxury lodge on the Sabie River",
      imageAlts: [
        "Summerfields Rose Retreat & Spa luxury lodge on the Sabie River",
        "Summerfields riverside accommodation and landscape",
        "Summerfields retreat and tented suite setting",
        "Summerfields guest experience and farm setting",
        "Summerfields scenic property and lodge atmosphere",
        "Summerfields tented suite detail and retreat setting",
      ],
      locationAccuracy: "address",
      claimed: true,
      verified: true,
      featured: true,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      source: "https://summerfields.co.za/",
      sourceUrl: "https://summerfields.co.za/retreat",
      seoTitle: "Summerfields Rose Retreat & Spa | Hazyview Accommodation | Discover",
      seoDescription:
        "Discover Summerfields Rose Retreat & Spa in Hazyview. Explore luxury tented accommodation, spa experiences, dining and riverfront stays on Discover by Lowveld Hub.",
      status: "published",
    },
    {
      id: "southern-sun-mbombela",
      slug: "southern-sun-mbombela",
      listingKind: "accommodation",
      name: "Southern Sun Mbombela",
      type: "Hotel",
      accommodationType: "Hotel",
      location: "Mbombela",
      area: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      postalCode: "1200",
      address:
        "15 Government Boulevard, Riverside Park Exit 1, Mbombela (Nelspruit), Mpumalanga, South Africa",
      description:
        "Southern Sun Mbombela is a 109-room hotel near the Lowveld National Botanical Garden. Standard Rooms, Family Rooms and Suites include breakfast, uncapped Wi-Fi, air conditioning, DStv and en-suite bathrooms. Jasmine Restaurant serves themed dinners, buffets and à la carte options, with drinks on the poolside terrace. The hotel also has a swimming pool, gardens and gym. Two children under 18 stay free when sharing with an adult.",
      roomCount: 109,
      roomTypes: ["Standard Rooms", "Family Rooms", "Suites"],
      amenities: [
        "Uncapped Wi-Fi",
        "Air conditioning",
        "DStv",
        "En-suite bathroom with bath and shower",
        "Tea and coffee facilities",
        "Breakfast included in room rates",
        "Workspace in rooms",
        "Wheelchair accessible rooms on request",
        "Smoking rooms on request",
      ],
      facilities: ["Jasmine Restaurant", "Poolside terrace", "Swimming pool", "Gardens", "Gym"],
      phone: "+27137573000",
      email: "mbombela.reservations@southernsun.com",
      website: "https://www.southernsun.com/southern-sun-mbombela",
      bookingUrl:
        "https://hotelreservations.southernsun.com/?locale=en-GB&currency=ZAR&themecode=ssmba&configcode=sshi&hotel=5336",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=-25.440685%2C30.967202",
      socialLinks: [
        { label: "Facebook", href: "https://www.facebook.com/SouthernSunHotels/" },
        { label: "Twitter", href: "https://twitter.com/SouthernSunGrp" },
        { label: "Instagram", href: "https://www.instagram.com/southernsunhotels/" },
        { label: "YouTube", href: "https://www.youtube.com/@southernsun8648" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/southern-sun/" },
      ],
      latitude: -25.440685,
      longitude: 30.967202,
      image:
        "https://drsprnoe9nnhf.cloudfront.net/southernsun-04222022/cms/cache/v2/68d624c85d7b3.jpg/710x865/fit/80/ba5dbfeb00010fac208839c2b0c10b8b.jpg",
      imageAlt: "Standard Room at Southern Sun Mbombela",
      images: [
        "https://drsprnoe9nnhf.cloudfront.net/southernsun-04222022/cms/cache/v2/68d624c85d7b3.jpg/710x865/fit/80/ba5dbfeb00010fac208839c2b0c10b8b.jpg",
        "https://drsprnoe9nnhf.cloudfront.net/southernsun-04222022/cms/cache/v2/68d4d60384053.jpg/710x865/fit;c:0,0,1642,2000/80/f9f5cc0d509fa6cb5f5299fb259c485c.jpg",
        "https://drsprnoe9nnhf.cloudfront.net/southernsun-04222022/cms/cache/v2/68d624c4cda09.jpg/710x865/fit;c:796,0,2439,2000/80/ddff3a3e413e53583fe3ccbb3e6e66a5.jpg",
      ],
      imageAlts: [
        "Standard Room at Southern Sun Mbombela",
        "Suite at Southern Sun Mbombela",
        "Standard Double Room at Southern Sun Mbombela",
      ],
      source: "https://www.southernsun.com/southern-sun-mbombela",
      sourceUrl: "https://www.southernsun.com/southern-sun-mbombela/accommodation",
      seoTitle: "Southern Sun Mbombela | Hotel in Mbombela | Discover",
      seoDescription:
        "Explore Southern Sun Mbombela: 109 rooms and suites, Jasmine Restaurant, pool, gardens, gym, room amenities, booking and directions.",
      locationAccuracy: "address",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "muluwa-lodge",
      slug: "muluwa-lodge",
      listingKind: "accommodation",
      name: "Muluwa Lodge",
      type: "Lodge",
      accommodationType: "Lodge",
      location: "White River",
      area: "Likweti Hills",
      province: "Mpumalanga",
      country: "South Africa",
      address:
        "Likweti Bushveld Estate, Curlews Road, Likweti Hills, White River, 1240, South Africa",
      description:
        "A luxury safari lodge in Mpumalanga, Muluwa Lodge offers safari tents, Superior Rooms and Luxury Suites within Likweti Bushveld Estate near White River.",
      roomTypes: ["Luxury Safari Tents", "Superior Rooms", "Luxury Suites"],
      amenities: ["Free uncovered parking"],
      facilities: ["Uncovered parking"],
      phone: "+27 72 618 9246",
      email: "centralres@muluwa.co.za",
      website: "https://www.muluwa.co.za/",
      source: "https://www.muluwa.co.za/",
      sourceUrl: "https://www.muluwa.co.za/hotel/rooms",
      image:
        "https://wa-uploads.profitroom.com/muluwalodge/800x550/17345151111537_.copyofsuperiorroominterior8.webp",
      images: [
        "https://wa-uploads.profitroom.com/muluwalodge/17291901391996_luxurysuiteinterior2.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17345152468943_copyofsuperiorroombathroom4.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17418640622811_copyof5aprilmorningsatmuluwa1.jpeg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322856074083_copyofdsc9002.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322856094684_copyofdsc9009.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322854414411_copyofdsc8978.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322854316095_copyofdsc8944.jpg",
      ],
      imageAlt: "Muluwa Lodge Superior Room interior with a freestanding bathtub and double vanity",
      imageAlts: [
        "Muluwa Lodge Superior Room interior with a freestanding bathtub and double vanity",
        "Muluwa Lodge Luxury Suite bedroom beneath a thatched ceiling",
        "Muluwa Lodge Superior Room bathroom with a walk-in shower and vanity",
        "Muluwa Lodge pool among the trees at sunset",
        "Muluwa Lodge bedroom with a thatched ceiling and sitting area",
        "Muluwa Lodge open-plan kitchen and dining area",
        "Muluwa Lodge suite veranda overlooking the pool and surrounding hills",
        "Muluwa Lodge kitchen with a central island and built-in appliances",
      ],
      imageSourceUrls: [
        "https://wa-uploads.profitroom.com/muluwalodge/800x550/17345151111537_.copyofsuperiorroominterior8.webp",
        "https://wa-uploads.profitroom.com/muluwalodge/17291901391996_luxurysuiteinterior2.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17345152468943_copyofsuperiorroombathroom4.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17418640622811_copyof5aprilmorningsatmuluwa1.jpeg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322856074083_copyofdsc9002.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322856094684_copyofdsc9009.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322854414411_copyofdsc8978.jpg",
        "https://wa-uploads.profitroom.com/muluwalodge/17322854316095_copyofdsc8944.jpg",
      ],
      seoTitle: "Muluwa Lodge | White River Accommodation | Discover",
      seoDescription:
        "Discover Muluwa Lodge in White River, with Superior Rooms and Luxury Suites at Likweti Bushveld Estate.",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "kruger-shalati",
      slug: "kruger-shalati",
      listingKind: "accommodation",
      name: "Kruger Shalati - The Train on the Bridge",
      type: "Lodge",
      accommodationType: "Lodge",
      location: "Skukuza",
      area: "Kruger National Park",
      province: "Mpumalanga",
      country: "South Africa",
      address: "Selati Bridge, Sabie River, Kruger National Park, Mpumalanga, South Africa",
      description:
        "Kruger Shalati is a luxury safari lodge on the historic Selati Bridge above the Sabie River in Kruger National Park, with 31 luxury rooms, a pool deck, a signature restaurant and unforgettable wildlife-viewing experiences in Big Five territory.",
      roomTypes: ["Luxury Rooms", "Universal-Access Rooms"],
      amenities: ["Pool deck", "Bridge House restaurant", "Gift store", "Game drives"],
      facilities: ["Pool deck", "Restaurant", "Gift shop", "Game drives", "Wildlife viewing"],
      website: "https://www.krugershalati.com/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Kruger+Shalati+Selati+Bridge+Kruger+National+Park+Mpumalanga",
      source: "https://www.krugershalati.com/",
      sourceUrl: "https://www.krugershalati.com/",
      image:
        "https://www.krugershalati.com/wp-content/uploads/2022/02/Kruger-Shalati_Mia-Louw__038.jpg",
      images: [
        "https://www.krugershalati.com/wp-content/uploads/2022/02/Kruger-Shalati_Mia-Louw__038.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-252-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati_Fuji-Astia-100F-_Mia-Louw__058-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-218-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/DSC_6262-1024x718.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/02/KRUGER-STATXSHAL-370-683x1024.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-230-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati_Fuji-Astia-100F-_15_12_2021__048-683x1024.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-217-1024x683.jpg",
      ],
      imageAlt:
        "Kruger Shalati luxury train lodge on the historic Selati Bridge above the Sabie River",
      imageAlts: [
        "Kruger Shalati luxury train lodge on the historic Selati Bridge above the Sabie River",
        "Kruger Shalati bridge deck and river views in Kruger National Park",
        "Kruger Shalati train carriage and bridge setting at sunset",
        "Kruger Shalati exterior and panoramic safari scenery",
        "Kruger Shalati private deck and river-facing views",
        "Kruger Shalati train cabin detail on the bridge",
        "Kruger Shalati scenic river panorama in the park",
        "Kruger Shalati guest accommodation and bridge architecture",
        "Kruger Shalati lodge landscape with wildlife-rich surroundings",
      ],
      imageSourceUrls: [
        "https://www.krugershalati.com/wp-content/uploads/2022/02/Kruger-Shalati_Mia-Louw__038.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-252-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati_Fuji-Astia-100F-_Mia-Louw__058-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-218-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/DSC_6262-1024x718.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/02/KRUGER-STATXSHAL-370-683x1024.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-230-1024x683.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati_Fuji-Astia-100F-_15_12_2021__048-683x1024.jpg",
        "https://www.krugershalati.com/wp-content/uploads/2022/05/Kruger-Shalati-Africa-Photographic-Kyle-Lewin-217-1024x683.jpg",
      ],
      seoTitle: "Kruger Shalati | Kruger National Park Accommodation | Discover",
      seoDescription:
        "Discover Kruger Shalati in Kruger National Park, a luxury train lodge on the Selati Bridge with wildlife viewing, a swimming deck and a destination dining experience.",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "hippo-hollow-country-estate",
      slug: "hippo-hollow-country-estate",
      listingKind: "accommodation",
      name: "Hippo Hollow Country Estate",
      type: "Hotel",
      accommodationType: "Hotel",
      location: "Hazyview",
      area: "Sabie River",
      province: "Mpumalanga",
      country: "South Africa",
      address: "Sabie River, Hazyview, Mpumalanga, South Africa",
      description:
        "Hippo Hollow Country Estate is a family-friendly hotel on the banks of the Sabie River in Hazyview, offering comfortable accommodation, dining, conferencing, weddings and access to the Lowveld’s outdoor attractions.",
      roomTypes: ["Guest rooms", "Suites"],
      amenities: [
        "Restaurant",
        "Conference facilities",
        "Wedding venue",
        "Family-friendly setting",
      ],
      facilities: ["Restaurant", "Conference facilities", "Wedding venue", "River setting"],
      phone: "+27 (0) 13 737 7752",
      whatsapp: "+27 (0) 72 752 0952",
      email: "reservations@hippohollow.co.za",
      website: "https://www.hippohollow.co.za/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Hippo+Hollow+Country+Estate+Hazyview+Mpumalanga",
      source: "https://www.hippohollow.co.za/",
      sourceUrl: "https://www.hippohollow.co.za/",
      image:
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Courtyard-Pool-01-1024x684.jpg",
      images: [
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Courtyard-Pool-01-1024x684.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Restaurant-06-3-1024x683.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Pizza-05-1-1024x683.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Restaurant-02-3-1350x900.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Rest-Buffet-11-1-1350x900.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Lounge-07-1256x900.jpg",
      ],
      imageAlt: "Hippo Hollow Country Estate courtyard pool beside the Sabie River",
      imageAlts: [
        "Hippo Hollow Country Estate courtyard pool beside the Sabie River",
        "Hippo Hollow restaurant dining area with warm Lowveld styling",
        "Hippo Hollow pizza and dining experience in the estate restaurant",
        "Hippo Hollow restaurant interior with a polished dining setting",
        "Hippo Hollow buffet and shared dining experience",
        "Hippo Hollow lounge with a comfortable, modern country-estate feel",
      ],
      imageSourceUrls: [
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Courtyard-Pool-01-1024x684.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Restaurant-06-3-1024x683.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Pizza-05-1-1024x683.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Restaurant-02-3-1350x900.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Rest-Buffet-11-1-1350x900.jpg",
        "https://www.hippohollow.co.za/wp-content/uploads/2025/08/Hippo-Hollow-Lounge-07-1256x900.jpg",
      ],
      seoTitle: "Hippo Hollow Country Estate | Hazyview Accommodation | Discover",
      seoDescription:
        "Discover Hippo Hollow Country Estate in Hazyview, a family-friendly hotel on the Sabie River with comfortable accommodation, dining and event spaces.",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "nut-grove-manor",
      slug: "nut-grove-manor",
      listingKind: "accommodation",
      name: "Nut Grove Manor",
      type: "Boutique Hotel",
      accommodationType: "Boutique Hotel",
      location: "White River",
      area: "Lowveld",
      province: "Mpumalanga",
      country: "South Africa",
      address: "White River, Mpumalanga, South Africa",
      description:
        "Nut Grove Manor is a boutique hotel and retreat in White River, offering a luxury countryside setting, spa experiences, breakfast, restaurant dining and a memorable escape close to the Lowveld’s top attractions.",
      roomTypes: ["Boutique rooms", "Self-catering stays"],
      amenities: ["Spa", "Restaurant", "Breakfast", "Self-catering options", "Garden views"],
      facilities: [
        "Spa",
        "Restaurant",
        "Self-catering stays",
        "Breakfast service",
        "Boutique accommodation",
      ],
      phone: "+27 76 697 4886",
      website: "https://nutgrovemanor.co.za/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Nut+Grove+Manor+White+River+Mpumalanga",
      source: "https://nutgrovemanor.co.za/",
      sourceUrl: "https://nutgrovemanor.co.za/",
      image:
        "https://nutgrovemanor.co.za/wp-content/uploads/elementor/thumbs/DSC_8573-scaled-r9kenc6i7s1lyjrphp6n68ykrhakt3gmu3ocj1ku98.jpg",
      images: [
        "https://nutgrovemanor.co.za/wp-content/uploads/elementor/thumbs/DSC_8573-scaled-r9kenc6i7s1lyjrphp6n68ykrhakt3gmu3ocj1ku98.jpg",
        "https://nutgrovemanor.co.za/wp-content/uploads/elementor/thumbs/DSC_9212-scaled-r9kenfxuz46r8zm8vqt5g80f50s1nvvk6maag5f9kc.jpg",
      ],
      imageAlt: "Nut Grove Manor boutique accommodation in the Mpumalanga countryside",
      imageAlts: [
        "Nut Grove Manor boutique accommodation in the Mpumalanga countryside",
        "Nut Grove Manor scenic guest experience with a warm, elegant interior",
      ],
      imageSourceUrls: [
        "https://nutgrovemanor.co.za/wp-content/uploads/elementor/thumbs/DSC_8573-scaled-r9kenc6i7s1lyjrphp6n68ykrhakt3gmu3ocj1ku98.jpg",
        "https://nutgrovemanor.co.za/wp-content/uploads/elementor/thumbs/DSC_9212-scaled-r9kenfxuz46r8zm8vqt5g80f50s1nvvk6maag5f9kc.jpg",
      ],
      seoTitle: "Nut Grove Manor | White River Accommodation | Discover",
      seoDescription:
        "Discover Nut Grove Manor in White River, a boutique hotel and spa retreat with stylish rooms, restaurant dining and countryside charm in Mpumalanga.",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "walkersons-hotel-spa",
      slug: "walkersons-hotel-spa",
      listingKind: "accommodation",
      name: "Walkersons Hotel & Spa",
      type: "Hotel",
      accommodationType: "Hotel",
      location: "Dullstroom",
      area: "Private estate",
      province: "Mpumalanga",
      country: "South Africa",
      address: "Walkersons Estate, Dullstroom, Mpumalanga, South Africa",
      description:
        "Walkersons Hotel & Spa is a five-star country house on an 800-hectare estate in Dullstroom, offering luxury hotel rooms, self-catering cottages, spa treatments, dining and scenic views across trout dams and rolling countryside.",
      roomTypes: ["Hotel Rooms", "Self-Catering Family Cottages"],
      amenities: ["Spa", "Restaurant", "Private estate", "Scenic views", "Trout dams"],
      facilities: [
        "Spa",
        "Dining",
        "Conference facilities",
        "Self-catering cottages",
        "Estate setting",
      ],
      phone: "+27 (13) 253 7000",
      website: "https://www.walkersons.co.za/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Walkersons+Hotel+and+Spa+Dullstroom+Mpumalanga",
      source: "https://www.walkersons.co.za/",
      sourceUrl: "https://www.walkersons.co.za/",
      image:
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Kyle-Lewin-Lounge-33-1280x852.jpg",
      images: [
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Kyle-Lewin-Lounge-33-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Hotel-_-Spa-Kyle-Lewin-76-Luxury-Lakeside-Suite-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Terrace-Kyle-Lewin-247-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Spa-Kyle-Lewin-199-1280x851.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/FOM-Shoot-Honeymoon-Suite-6-1280x853.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Hotel-_-Spa-Kyle-Lewin-119-Luxury-Lakeside-Suite-1280x853.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Kyle-Lewin-186-Lakeside-Suites-Classic-Rooms--1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Kyle-Lewin-230-Room-One-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Food-Kyle-Lewin-22-1353x900.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Food-Kyle-Lewin-32-1353x900.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Hotel-_-Spa-Kyle-Lewin-147-Food-1353x900.jpg",
      ],
      imageAlt: "Walkersons Hotel & Spa lounge and country-house interiors in Dullstroom",
      imageAlts: [
        "Walkersons Hotel & Spa lounge and country-house interiors in Dullstroom",
        "Luxury lakeside suite at Walkersons Hotel & Spa",
        "Terrace at Walkersons Hotel & Spa overlooking the estate",
        "Spa treatment area at Walkersons Hotel & Spa",
        "Honeymoon suite at Walkersons Hotel & Spa",
        "Luxury lakeside suite with contemporary country-house styling",
        "Lakeside suites and classic rooms at Walkersons Hotel & Spa",
        "Room One at Walkersons Hotel & Spa",
        "Dining experience at Walkersons Hotel & Spa",
        "Food at Walkersons Hotel & Spa",
        "Fine dining at Walkersons Hotel & Spa",
      ],
      imageSourceUrls: [
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Kyle-Lewin-Lounge-33-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Hotel-_-Spa-Kyle-Lewin-76-Luxury-Lakeside-Suite-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Terrace-Kyle-Lewin-247-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Spa-Kyle-Lewin-199-1280x851.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/FOM-Shoot-Honeymoon-Suite-6-1280x853.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Hotel-_-Spa-Kyle-Lewin-119-Luxury-Lakeside-Suite-1280x853.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Kyle-Lewin-186-Lakeside-Suites-Classic-Rooms--1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Kyle-Lewin-230-Room-One-1280x852.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Food-Kyle-Lewin-22-1353x900.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/10/Walkersons-Food-Kyle-Lewin-32-1353x900.jpg",
        "https://www.walkersons.co.za/wp-content/uploads/2024/06/Walkersons-Hotel-_-Spa-Kyle-Lewin-147-Food-1353x900.jpg",
      ],
      seoTitle: "Walkersons Hotel & Spa | Dullstroom Accommodation | Discover",
      seoDescription:
        "Discover Walkersons Hotel & Spa in Dullstroom, a country-house retreat with luxury rooms, spa experiences, fine dining and a scenic estate setting.",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "a-pilgrims-rest-guesthouse",
      slug: "a-pilgrims-rest-guesthouse",
      listingKind: "accommodation",
      name: "A Pilgrim's Rest Guesthouse",
      type: "Guesthouse",
      accommodationType: "Guesthouse",
      location: "Graskop",
      area: "Panorama Route",
      province: "Mpumalanga",
      country: "South Africa",
      address: "8 Louis Trichardt Street, Graskop, Mpumalanga, South Africa",
      description:
        "A Victorian-style guesthouse in Graskop, with individually styled rooms, a welcoming lounge, honesty bar and garden, close to the Panorama Route.",
      roomTypes: [
        "Gold Room",
        "Family Room",
        "Twin Room",
        "Deluxe Double - Green",
        "Deluxe Double - Red",
      ],
      amenities: [
        "Complimentary Wi-Fi throughout the guesthouse",
        "Guest lounge",
        "Honesty bar",
        "Garden and patio",
        "Breakfast and dining",
      ],
      facilities: ["Guest lounge", "Honesty bar", "Garden and patio", "Breakfast and dining"],
      phone: "+27 82 304 7157",
      whatsapp: "+27 82 304 7157",
      website: "https://apilgrimsrestguesthouse.com/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=8+Louis+Trichardt+Street%2C+Graskop%2C+Mpumalanga%2C+South+Africa",
      source: "https://apilgrimsrestguesthouse.com/",
      sourceUrl: "https://apilgrimsrestguesthouse.com/rooms/",
      image: "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/greenroom_pic4.jpg",
      images: [
        "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/twinroom_pic3.jpg",
        "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/commonarea_pic2.jpg",
        "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/commonarea_pic3.jpg",
      ],
      imageAlt: "Deluxe Green Room bathroom at A Pilgrim's Rest Guesthouse",
      imageAlts: [
        "Twin Room tea station and framed artwork at A Pilgrim's Rest Guesthouse",
        "Victorian lounge with antique furniture, ceiling fan and chandelier",
        "Victorian spiral staircase and period decor inside the guesthouse",
      ],
      imageSourceUrls: [
        "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/greenroom_pic4.jpg",
        "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/twinroom_pic3.jpg",
        "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/commonarea_pic2.jpg",
        "https://apilgrimsrestguesthouse.com/wp-content/uploads/2026/03/commonarea_pic3.jpg",
      ],
      locationAccuracy: "address",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "mount-high-luxury-country-estate",
      slug: "mount-high-luxury-country-estate",
      listingKind: "accommodation",
      name: "Mount High Luxury Country Estate",
      type: "Country Estate",
      accommodationType: "Country Estate",
      location: "Lydenburg",
      area: "Panorama Route",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "A mountain country estate near Lydenburg on the Panorama Route, with a Manor House and six en-suite Deluxe Stable Rooms. The farm offers mountain biking, hiking, guided walks and picnics.",
      roomTypes: [
        "Manor House - six rooms, sleeps 12 guests",
        "Deluxe Stable Rooms - six en-suite double rooms, sleeps 12 guests",
      ],
      amenities: [
        "Manor House swimming pool",
        "Manor House bar area with snooker table",
        "Manor House kitchen",
        "500-thread Egyptian cotton linen",
        "Wi-Fi",
        "DSTV",
        "Laundry service",
        "Communal kitchen and TV room at the stables",
        "Mountain biking and hiking routes",
        "Guided walks and picnics",
      ],
      facilities: [
        "Manor House swimming pool",
        "Manor House bar area with snooker table",
        "Six en-suite Deluxe Stable Rooms",
        "Communal stable kitchen and TV room",
        "Mountain biking and hiking routes",
        "Guided walks and picnics",
      ],
      phone: "+27 82 568 7519",
      email: "info@mounthigh.co.za",
      website: "https://www.mounthigh.co.za/",
      bookingUrl: "https://www.nightsbridge.co.za/bridge/book?bbid=22394",
      directionsUrl:
        "https://www.google.com/maps/place/Mount+High+Luxury+Country+House/@-25.0484402,30.5283517,15z/",
      latitude: -25.0484402,
      longitude: 30.5283517,
      source: "https://www.mounthigh.co.za/",
      sourceUrl: "https://www.mounthigh.co.za/collections/accommodation-2/",
      image: "https://b-cdn.springnest.com/media/img/sa/manor_house_1_b.jpg?width=800",
      images: ["https://b-cdn.springnest.com/media/img/sa/manor_house_1_b.jpg?width=800"],
      imageAlt: "Manor House at Mount High Luxury Country Estate",
      imageAlts: ["Manor House at Mount High Luxury Country Estate"],
      imageSourceUrls: ["https://b-cdn.springnest.com/media/img/sa/manor_house_1_b.jpg?width=800"],
      locationAccuracy: "address",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
    {
      id: "ndhula-luxury-tented-lodge",
      slug: "ndhula-luxury-tented-lodge",
      listingKind: "accommodation",
      name: "Ndhula Luxury Tented Lodge",
      type: "Lodge",
      accommodationType: "Lodge",
      location: "White River",
      area: "Likweti Bushveld Estate",
      province: "Mpumalanga",
      country: "South Africa",
      address: "Likweti Bushveld Farm Estate, Curlews Road, White River, 1240, South Africa",
      description:
        "A luxury tented lodge on Likweti Bushveld Estate near White River, with safari and family tents on raised timber decks overlooking the bushveld and surrounding valleys.",
      roomTypes: ["Luxury safari tents", "Luxury family tent"],
      amenities: [
        "Air-conditioned tents",
        "En-suite bathroom with shower",
        "Tea and coffee making facilities",
        "Hairdryer",
        "Minibar fridge",
        "Electric blankets in winter",
        "Safari chairs and coffee table on the deck",
        "Wellness spa",
      ],
      facilities: ["Wellness spa", "Dining experience"],
      phone: "+27 (0) 66 479 8061",
      email: "reservations@ndhula.co.za",
      website: "https://www.ndhula.co.za/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Ndhula+Luxury+Tented+Lodge%2C+Likweti+Bushveld+Farm+Estate%2C+Curlews+Road%2C+White+River%2C+1240",
      source: "https://www.ndhula.co.za/",
      sourceUrl: "https://www.ndhula.co.za/accommodation",
      image:
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/7.+Luxury+Tent+Interior-1920w.jpg",
      images: [
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/4.+Luxury+Tent+Exterior-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/12.+Main+Area+Terrace+and+Pool-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/16.+Luxury+Tent+Bathroom-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/18.+Family+Tent+Exterior-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/19.+Family+Tent+Private+Deck-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/26.+Sunset+Viewpoint-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/40.+Breakfast-1920w.jpg",
      ],
      imageAlt: "Interior of a luxury safari tent at Ndhula Luxury Tented Lodge",
      imageAlts: [
        "Exterior of a luxury safari tent at Ndhula Luxury Tented Lodge",
        "Main area terrace and pool at Ndhula Luxury Tented Lodge",
        "Bathroom inside a luxury safari tent at Ndhula Luxury Tented Lodge",
        "Exterior of the luxury family tent at Ndhula Luxury Tented Lodge",
        "Private deck of the family tent at Ndhula Luxury Tented Lodge",
        "Sunset viewpoint at Ndhula Luxury Tented Lodge",
        "Breakfast at Ndhula Luxury Tented Lodge",
      ],
      imageSourceUrls: [
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/7.+Luxury+Tent+Interior-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/4.+Luxury+Tent+Exterior-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/12.+Main+Area+Terrace+and+Pool-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/16.+Luxury+Tent+Bathroom-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/18.+Family+Tent+Exterior-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/19.+Family+Tent+Private+Deck-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/26.+Sunset+Viewpoint-1920w.jpg",
        "https://irp.cdn-website.com/e2ca489d/dms3rep/multi/opt/40.+Breakfast-1920w.jpg",
      ],
      locationAccuracy: "address",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["stay"],
      status: "published",
    },
  ],
  professional: [
    {
      id: "du-toit-smuts-partners-attorneys",
      slug: "du-toit-smuts-partners-attorneys",
      listingKind: "business",
      type: "Law Firm",
      name: "DU TOIT-SMUTS & PARTNERS ATTORNEYS",
      subcategory: "Attorneys",
      serviceType: "Attorneys",
      specialisation: [
        "Conveyancing",
        "Commercial",
        "Estates & Trusts",
        "Family",
        "Litigation",
        "Labour",
        "Intellectual Property",
        "Land Claims",
        "Debt Collections",
        "Insolvency",
        "Personal Injury",
        "Criminal Law",
      ],
      businessType: "Firm",
      location: "Mbombela / Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      address: "7 Van Niekerk Street, Nelspruit",
      postalCode: "1200",
      description:
        "Established in Nelspruit (now Mbombela) in 1976, DU TOIT-SMUTS & PARTNERS ATTORNEYS serves private and public-sector clients, businesses and individuals across Mpumalanga. Its published practice areas include conveyancing, commercial and company law, estates and trusts, family law, litigation and more.",
      image:
        "https://www.dtsmp.co.za/wp-content/uploads/2023/09/DU-TOITS-SMUTS-PARTNERS-contatc-.jpg",
      imageAlt: "DU TOIT-SMUTS & PARTNERS ATTORNEYS",
      website: "https://www.dtsmp.co.za/",
      phone: "013 745 3200",
      email: "library@dtsmp.co.za",
      services: [
        "Conveyancing & Notarial Practice",
        "Commercial Law & Company Law",
        "Estates & Trusts",
        "Family & Matrimonial Law",
        "Litigation",
        "Labour Law",
        "Intellectual Property Law",
        "Land Claims",
        "Debt Collections",
        "Insolvency",
        "Third Party & Personal Injury Claims",
        "Criminal Law",
      ],
      source: "https://www.dtsmp.co.za/",
      sourceUrl: "https://www.dtsmp.co.za/contact-us/",
      seoTitle: "DU TOIT-SMUTS & PARTNERS ATTORNEYS | Law Firm in Mbombela | Discover",
      seoDescription:
        "Explore DU TOIT-SMUTS & PARTNERS ATTORNEYS in Mbombela (Nelspruit), with practice areas including conveyancing, commercial law, litigation and estates.",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "kruger-and-partners",
      slug: "kruger-and-partners",
      listingKind: "business",
      type: "Law Firm",
      name: "Kruger & Partners Inc.",
      subcategory: "Attorneys",
      serviceType: "Attorneys",
      specialisation: [
        "Corporate",
        "Commercial",
        "Litigation",
        "Estates & Trusts",
        "Insolvency",
        "Personal Injury",
        "Debt Collections",
        "Public-Private Partnerships",
      ],
      businessType: "Firm",
      location: "Mbombela / Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      address: "1st Floor, Volante House, 20 Ferreira Street, Nelspruit",
      postalCode: "1201",
      description:
        "Kruger & Partners Inc. is a law firm in Mbombela (Nelspruit) with a published focus on corporate and commercial legal services. Its listed practice areas also include litigation, wills and trusts, transnational insolvency, personal injury and collections.",
      image:
        "https://www.krugerandpartners.co.za/wp-content/uploads/2025/10/Kruger-and-partners-Our-Policy-1536x1024.webp",
      imageAlt: "Kruger & Partners Inc.",
      website: "https://www.krugerandpartners.co.za/",
      phone: "+27 13 745 5300",
      email: "info@krugerandpartners.co.za",
      services: [
        "Corporate Law",
        "Commercial Law",
        "Litigation",
        "Wills & Trusts",
        "Transnational Insolvency",
        "Personal Injury Law",
        "Collections",
        "Public-Private Partnerships",
      ],
      openingHours: {
        Monday: "08:00–16:30",
        Tuesday: "08:00–16:30",
        Wednesday: "08:00–16:30",
        Thursday: "08:00–16:30",
        Friday: "07:30–15:30",
      },
      source: "https://www.krugerandpartners.co.za/",
      sourceUrl:
        "https://www.krugerandpartners.co.za/kruger-partners-inc-contact-the-trusted-law-firm-in-nelspruit/",
      seoTitle: "Kruger & Partners Inc. | Attorneys in Mbombela | Discover",
      seoDescription:
        "Contact Kruger & Partners Inc. in Mbombela (Nelspruit) for corporate and commercial law, litigation, wills and trusts, and other legal services.",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "vzlr-attorneys",
      slug: "vzlr-attorneys",
      listingKind: "business",
      type: "Law Firm",
      name: "VZLR Attorneys",
      subcategory: "Attorneys",
      serviceType: "Attorneys",
      specialisation: [
        "Banking & Financial Law",
        "Conveyancing & Real Estate",
        "Corporate & Commercial Law",
        "Cost Consulting",
        "Family Law",
        "General Litigation",
        "Insurance Law",
        "Intellectual Property",
        "Labour Law",
        "Medical Law",
        "Personal Injury",
        "Settlement Trusts",
        "Wills & Estates",
      ],
      businessType: "Firm",
      location: "Mbombela / Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      address: "The Pinnacle Building, Suite 301, 1 Parkin Street, Nelspruit",
      image: "https://vzlr.co.za/wp-content/uploads/2021/01/Labour-Law-VZLR.jpg",
      imageAlt: "VZLR Attorneys",
      website: "https://vzlr.co.za/",
      phone: "013 752 2065",
      email: "vzlr@vzlr.co.za",
      services: [
        "Banking & Financial Law",
        "Conveyancing & Real Estate",
        "Corporate & Commercial Law",
        "Cost Consulting",
        "Family Law",
        "General Litigation",
        "Insurance Law",
        "Intellectual Property",
        "Labour Law",
        "Medical Law",
        "Personal Injury & Third Party Claims",
        "Settlement Trusts",
        "Wills & Estates",
      ],
      description:
        "VZLR Attorneys describes its practice as serving clients and the wider community through a nationwide team. Its Nelspruit office is at The Pinnacle Building on Parkin Street, with published practice areas across commercial, property, family, labour and other legal matters. VZLR states that it has served clients for 80 years.",
      source: "https://vzlr.co.za/",
      sourceUrl: "https://vzlr.co.za/legal-services/",
      seoTitle: "VZLR Attorneys | Law Firm in Mbombela | Discover",
      seoDescription:
        "Find VZLR Attorneys in Mbombela (Nelspruit), with legal services including corporate and commercial law, conveyancing, family law, labour law and litigation.",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
  ],
  "home-construction": [],
  automotive: [],
  "food-dining": [
    {
      id: "turn-n-tender-mbombela",
      slug: "turn-n-tender-mbombela",
      listingKind: "business",
      type: "Restaurant",
      name: "Turn 'n Tender Steakhouse",
      subcategory: "Steakhouse",
      cuisineTypes: ["Steakhouse", "Burgers", "Seafood", "Chicken", "Ribs"],
      diningType: "Restaurant",
      diningStyles: ["Casual Dining", "Fine Dining"],
      mealTypes: ["Lunch", "Dinner"],
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Turn 'n Tender Steakhouse in Mbombela serves hearty steaks, burgers, chicken, seafood and ribs in a welcoming Lowveld dining setting.",
      image:
        "https://turnntender.co.za/_next/image?url=%2Fimages%2Fpages%2Fhomepage%2Fweb_excelsteaks.jpg&w=1920&q=75",
      imageAlt: "Turn 'n Tender Steakhouse steak platter in Mbombela",
      images: [
        "https://turnntender.co.za/_next/image?url=%2Fimages%2Fpages%2Fhomepage%2Fweb_excelsteaks.jpg&w=1920&q=75",
      ],
      imageAlts: ["Turn 'n Tender Steakhouse steak platter in Mbombela"],
      website: "https://turnntender.co.za/",
      menuUrl: "https://turnntender.co.za/steakhouse-menu/our-food-menu/steak-and-ribs",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Turn+%27n+Tender+Steakhouse+Mbombela+Mpumalanga",
      source: "https://turnntender.co.za/",
      sourceUrl: "https://turnntender.co.za/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "magnolia-restaurant-white-river",
      slug: "magnolia-restaurant-white-river",
      listingKind: "business",
      type: "Restaurant",
      name: "Magnolia Restaurant",
      subcategory: "Restaurant",
      cuisineTypes: ["Contemporary Dining"],
      diningType: "Restaurant",
      diningStyles: ["Casual Dining", "Family Dining"],
      mealTypes: ["Lunch", "Dinner"],
      location: "White River",
      town: "White River",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Magnolia Restaurant brings relaxed, contemporary dining to White River, with a warm hospitality setting and a strong focus on fresh, shareable meals.",
      image:
        "https://www.casterbridgehollow.co.za/wordpress/wp-content/uploads/2025/11/Magnolia-Restaurant-05-15-1024x683.jpg",
      imageAlt: "Magnolia Restaurant dining venue in White River",
      images: [
        "https://www.casterbridgehollow.co.za/wordpress/wp-content/uploads/2025/11/Magnolia-Restaurant-05-15-1024x683.jpg",
        "https://www.casterbridgehollow.co.za/wordpress/wp-content/uploads/2025/11/Magnolia-Food-Seafood-04-1350x900.jpg",
        "https://www.casterbridgehollow.co.za/wordpress/wp-content/uploads/2025/11/Magnolia-Food-Shank-01-768x512.jpg",
        "https://www.casterbridgehollow.co.za/wordpress/wp-content/uploads/2025/11/Magnolia-Food-Sushi-01-768x512.jpg",
      ],
      imageAlts: [
        "Magnolia Restaurant dining venue in White River",
        "Magnolia Restaurant seafood dish and dining detail",
        "Magnolia Restaurant shank dish and plated meal",
        "Magnolia Restaurant sushi dish and meal presentation",
      ],
      website: "https://www.casterbridgehollow.co.za/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Magnolia+Restaurant+White+River+Mpumalanga",
      source: "https://www.casterbridgehollow.co.za/",
      sourceUrl: "https://www.casterbridgehollow.co.za/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "pioneers-grill-hazyview",
      slug: "pioneers-grill-hazyview",
      listingKind: "business",
      type: "Restaurant",
      name: "Pioneer's Grill",
      subcategory: "Steakhouse",
      cuisineTypes: ["Steakhouse", "Seafood", "Chicken", "Grill"],
      diningType: "Restaurant",
      diningStyles: ["Casual Dining", "Fine Dining"],
      mealTypes: ["Lunch", "Dinner"],
      location: "Hazyview",
      town: "Hazyview",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Pioneer's Grill in Hazyview offers a welcoming steakhouse experience with grilled meats, fresh seafood, a relaxed atmosphere and a classic road-trip stop for Lowveld travellers.",
      image: "https://www.pioneersgrill.co.za/gallery/R5CF3556-HDR-1380.webp",
      imageAlt: "Pioneer's Grill dining room and steakhouse setting in Hazyview",
      images: [
        "https://www.pioneersgrill.co.za/gallery/R5CF3556-HDR-1380.webp",
        "https://www.pioneersgrill.co.za/gallery/R5CF3601-HDR-1380.webp",
        "https://www.pioneersgrill.co.za/gallery/pioneers-115-1380.webp",
        "https://www.pioneersgrill.co.za/gallery/DALF8480-HDR-1380.webp",
        "https://www.pioneersgrill.co.za/gallery/R5CF3661-HDR-1380.webp",
        "https://www.pioneersgrill.co.za/gallery/R5CF3611-HDR-1380.webp",
      ],
      imageAlts: [
        "Pioneer's Grill dining room and steakhouse setting in Hazyview",
        "Pioneer's Grill restaurant interior and table setting",
        "Pioneer's Grill dining space and wall feature",
        "Pioneer's Grill warm ambience and meal presentation",
        "Pioneer's Grill fine dining ambience",
        "Pioneer's Grill restaurant atmosphere and seating",
      ],
      website: "https://www.pioneersgrill.co.za/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Pioneers+Grill+Hazyview+Mpumalanga",
      source: "https://www.pioneersgrill.co.za/",
      sourceUrl: "https://www.pioneersgrill.co.za/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "mcdonalds-mbombela",
      slug: "mcdonalds-mbombela",
      listingKind: "business",
      type: "Restaurant",
      name: "McDonald's Mbombela",
      subcategory: "Fast Food",
      cuisineTypes: ["Fast Food", "Burgers", "Chicken", "Breakfast"],
      diningType: "Restaurant",
      diningStyles: ["Quick Service"],
      mealTypes: ["Breakfast", "Lunch", "Dinner"],
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "McDonald's Mbombela offers burgers, chicken meals, salads, breakfast and family favourites in a quick-service restaurant format.",
      image: "https://www.mcdonalds.co.za/media/products/bigmac-meal/Big-Mac-meal.webp",
      imageAlt: "McDonald's Big Mac meal in Mbombela",
      images: [
        "https://www.mcdonalds.co.za/media/products/bigmac-meal/Big-Mac-meal.webp",
        "https://www.mcdonalds.co.za/media/products/beef-share-bag/Beef-Sharebag-1-1.png",
      ],
      imageAlts: [
        "McDonald's Big Mac meal in Mbombela",
        "McDonald's beef share bag in the McDonald's product range",
      ],
      website: "https://www.mcdonalds.co.za/",
      menuUrl: "https://www.mcdonalds.co.za/menu/big-mac",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=McDonald%27s+Mbombela+Mpumalanga",
      source: "https://www.mcdonalds.co.za/",
      sourceUrl: "https://www.mcdonalds.co.za/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "kfc-mbombela",
      slug: "kfc-mbombela",
      listingKind: "business",
      type: "Restaurant",
      name: "KFC Mbombela",
      subcategory: "Fast Food",
      cuisineTypes: ["Fast Food", "Chicken", "Burgers"],
      diningType: "Restaurant",
      diningStyles: ["Quick Service"],
      mealTypes: ["Lunch", "Dinner"],
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "KFC Mbombela serves chicken buckets, burgers, wraps and family meal deals in a quick-service restaurant format.",
      image:
        "https://images.ctfassets.net/0p42pznmbeec/1RjOXMuEGaOkSPxr7pwYh1/0a94d45dfca02f0474fcf836ac5950c0/Ultimate_Burger_Deal_1200x900.jpg?h=900&w=1200&fm=webp&fit=fill",
      imageAlt: "KFC burger meal deal and chicken bucket in Mbombela",
      images: [
        "https://images.ctfassets.net/0p42pznmbeec/1RjOXMuEGaOkSPxr7pwYh1/0a94d45dfca02f0474fcf836ac5950c0/Ultimate_Burger_Deal_1200x900.jpg?h=900&w=1200&fm=webp&fit=fill",
        "https://images.ctfassets.net/0p42pznmbeec/3E1whfFVZgVzA04raBohfk/51e609ce7f9f12d7e3b76305d4c0a8a1/Project-Sparta_Ecomms_Double-Dunked-Burger-Box-SF_1200x900.jpg?h=900&w=1200&fm=webp&fit=fill",
        "https://images.ctfassets.net/0p42pznmbeec/7tx9aMw6o0YUUhrdvQeB6j/a07bdb84fa8ef7bfa85f0e6896b2474f/15_Piece_Original_Recipe_Bucket_1200x900.jpg?h=600&w=800&fm=webp&fit=fill",
        "https://images.ctfassets.net/0p42pznmbeec/79UZ2rcUj7dVqi9032PQhM/51b37b6b951321a85d99989efda963b8/Project-Sparta_Ecomms_Double-Colonel-Burger-Box-Buddy_1200x900.jpg?h=600&w=800&fm=webp&fit=fill",
      ],
      imageAlts: [
        "KFC burger meal deal and chicken bucket in Mbombela",
        "KFC double dunked burger box in official menu photography",
        "KFC original recipe bucket in official menu photography",
        "KFC double colonel burger box in official menu photography",
      ],
      website: "https://www.kfc.co.za/",
      menuUrl: "https://www.kfc.co.za/menu",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=KFC+Mbombela+Mpumalanga",
      source: "https://www.kfc.co.za/",
      sourceUrl: "https://www.kfc.co.za/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "mixolog-mbombela",
      slug: "mixolog-mbombela",
      listingKind: "business",
      type: "Restaurant",
      name: "MixoloG",
      subcategory: "Restaurant",
      diningType: "Restaurant",
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "MixoloG is a restaurant venue in Mbombela that pairs a polished dining atmosphere with contemporary hospitality, food-led experiences and a welcoming Lowveld setting.",
      image:
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Interior-34-scaled.webp",
      imageAlt: "MixoloG dining interior in Mbombela",
      images: [
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Interior-34-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Interior-6-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Interior-17-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Interior-18-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Interior-19-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-13-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-15-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-18-scaled.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2026/03/MixoloG-Food-11-768x546-1.webp",
        "https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-4-scaled.webp",
      ],
      imageAlts: [
        "MixoloG dining interior in Mbombela",
        "MixoloG elegant dining room and interior detail",
        "MixoloG interior seating and atmosphere",
        "MixoloG restaurant interior and warm ambience",
        "MixoloG interior dining space",
        "MixoloG food presentation and plated dish",
        "MixoloG dining experience and menu item",
        "MixoloG plated food and restaurant mood",
        "MixoloG restaurant dish and presentation",
        "MixoloG food photography used to showcase the menu",
      ],
      website: "https://www.mixologmbombela.co.za/",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=MixoloG+Mbombela+Mpumalanga",
      source: "https://www.mixologmbombela.co.za/",
      sourceUrl: "https://www.mixologmbombela.co.za/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "the-orange-restaurant",
      slug: "the-orange-restaurant",
      listingKind: "business",
      type: "Restaurant",
      name: "The Orange Restaurant",
      subcategory: "Fine Dining",
      cuisineTypes: ["International", "Family Dining", "Cocktails"],
      diningType: "Restaurant",
      diningStyles: ["Fine Dining", "Casual Dining", "Romantic Dining"],
      mealTypes: ["Lunch", "Dinner"],
      location: "Mbombela / Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Tucked in a corner of Mbombela on top of a hill lies The Orange Restaurant, where a contemporary, warm and unique interior meets thoughtfully prepared dishes in a setting made for memorable meals. Open seven days a week for lunch and dinner, it is known for a welcoming Lowveld dining experience, a built-in cocktail bar, and a sense of occasion for romantic evenings, family gatherings and celebrations.",
      image:
        "https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-63Orange-Home1.jpg",
      imageAlt: "The Orange Restaurant exterior and hilltop setting in Mbombela",
      images: [
        "https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-63Orange-Home1.jpg",
        "https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-28.jpg",
        "https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-34.jpg",
        "https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-40.jpg",
      ],
      imageAlts: [
        "The Orange Restaurant exterior and hilltop setting in Mbombela",
        "The Orange Restaurant venue atmosphere",
        "The Orange Restaurant interior setting",
        "The Orange Restaurant dining ambience",
      ],
      website: "https://www.eatatorange.co.za/",
      bookingUrl: "https://eatatorange.co.za/booking/",
      menuUrl:
        "https://www.eatatorange.co.za/wp-content/uploads/2025/10/ORANGE-RESTAURANT-MENU-2025.pdf",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Orange+Restaurant+Mbombela+Mpumalanga",
      services: ["Dine in", "Lunch", "Dinner", "Cocktails", "Bar", "Private events"],
      amenities: [
        "Bar",
        "Cocktails",
        "Air conditioning",
        "Indoor fire",
        "Lunch",
        "Dinner",
        "Family friendly",
        "Romantic dining",
      ],
      openingHours: {
        Monday: "Lunch & dinner",
        Tuesday: "Lunch & dinner",
        Wednesday: "Lunch & dinner",
        Thursday: "Lunch & dinner",
        Friday: "Lunch & dinner",
        Saturday: "Lunch & dinner",
        Sunday: "Lunch & dinner",
      },
      restaurantProfile: {
        story: [
          "Tucked in a corner of Mbombela on top of a hill lies The Orange Restaurant, a hidden gem known for its contemporary, warm interior and welcoming Lowveld hospitality.",
          "The official website describes the restaurant as a place for romantic evenings, family celebrations and memorable occasions, with lovingly prepared dishes served for lunch and dinner seven days a week.",
          "A built-in bar manned by a cocktail maker and a winter indoor fire help set the mood, while air-conditioning keeps the space comfortable in the Lowveld summer heat.",
        ],
        experienceHighlights: [
          {
            title: "Hilltop Lowveld setting",
            description:
              "The restaurant is positioned on a hill above Mbombela, with the official website describing the views as breathtaking and the setting as a hidden gem of the area.",
          },
          {
            title: "Seven days a week",
            description:
              "The restaurant is open every day for lunch and dinner, supporting casual lunches, relaxed dinners and special occasions alike.",
          },
          {
            title: "Cocktails and bar service",
            description:
              "A built-in bar with a cocktail maker offers a clear focal point for drinks before or after dining.",
          },
          {
            title: "Occasion dining",
            description:
              "The official site specifically highlights romantic evenings and celebrations with family, positioning the venue for memorable occasions.",
          },
        ],
        menuLinks: [
          {
            label: "Official menu PDF",
            description: "Download the current menu directly from The Orange Restaurant website.",
            href: "https://www.eatatorange.co.za/wp-content/uploads/2025/10/ORANGE-RESTAURANT-MENU-2025.pdf",
          },
          {
            label: "Book a table",
            description: "Reserve your table through the official restaurant booking page.",
            href: "https://eatatorange.co.za/booking/",
          },
        ],
        storyHeading: "Our story",
        experienceEyebrow: "Lowveld dining",
        experienceHeading: "A memorable hilltop setting",
        menuIntroduction:
          "Browse the official menu PDF and booking page for the latest dining details from The Orange Restaurant.",
      },
      seoTitle: "The Orange Restaurant | Discover Mbombela",
      seoDescription:
        "Discover The Orange Restaurant in Mbombela. Explore the dining experience, menu, booking, location and opening hours on Discover by Lowveld Hub.",
      source: "https://www.eatatorange.co.za/",
      sourceUrl: "https://www.eatatorange.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "salsa-mexican-grill-ilanga-mall",
      slug: "salsa-mexican-grill-ilanga-mall",
      listingKind: "business",
      type: "Restaurant",
      name: "Salsa Mexican Grill",
      subcategory: "Mexican Cuisine",
      cuisineTypes: ["Mexican", "Tacos", "Burritos", "Quesadillas", "Cocktails"],
      diningType: "Restaurant",
      diningStyles: ["Casual Dining", "Family Dining", "Group Dining"],
      mealTypes: ["Lunch", "Dinner"],
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      address: "Ilanga Mall, Mbombela / Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Salsa Mexican Grill brings vibrant Mexican dining to Mbombela with tacos, burritos, quesadillas, cocktails and a lively celebration atmosphere. The official site highlights festive dining, family-friendly gatherings and a warm fiesta spirit at Ilanga Mall.",
      image: "https://salsamexicangrill.co.za/wp-content/uploads/2020/11/Salsa-Web-1.png",
      imageAlt: "Salsa Mexican Grill restaurant at Ilanga Mall",
      images: [
        "https://salsamexicangrill.co.za/wp-content/uploads/2020/11/Salsa-Web-1.png",
        "https://salsamexicangrill.co.za/wp-content/uploads/2020/11/Salsa-Web-2.png",
        "https://salsamexicangrill.co.za/wp-content/uploads/2020/11/Salsa-Web-3.png",
        "https://salsamexicangrill.co.za/wp-content/uploads/2020/11/Salsa-Web-4.png",
        "https://salsamexicangrill.co.za/wp-content/uploads/2020/11/Salsa-Web-5.png",
      ],
      imageAlts: [
        "Salsa Mexican Grill restaurant at Ilanga Mall",
        "Salsa Mexican Grill dining and restaurant atmosphere",
        "Salsa Mexican Grill interior and seating experience",
        "Salsa Mexican Grill food presentation and restaurant mood",
        "Salsa Mexican Grill warm and vibrant dining setting",
      ],
      website: "https://salsamexicangrill.co.za/",
      menuUrl: "https://salsamexicangrill.co.za/food-menu-2/",
      bookingUrl: "https://salsamexicangrill.co.za/make-a-reservation-2/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Salsa+Mexican+Grill+Ilanga+Mall+Mbombela",
      services: ["Dine in", "Lunch", "Dinner", "Reservations", "Cocktails"],
      amenities: [
        "Reservations",
        "Lunch",
        "Dinner",
        "Cocktails",
        "Family friendly",
        "Mexican cuisine",
      ],
      restaurantProfile: {
        story: [
          "Salsa Mexican Grill brings a lively Mexican dining experience to Mbombela, with a focus on celebratory meals, fresh flavours and a vibrant social atmosphere.",
          "The official website celebrates 10 years of Salsa, a fiesta-inspired brand built around tacos, burritos, cocktails and memorable gatherings with family and friends.",
          "At Ilanga Mall, the restaurant positions itself as a place to celebrate, dine casually and enjoy a warm, energetic Mexican food experience in the Lowveld.",
        ],
        experienceHighlights: [
          {
            title: "Mexican favourites",
            description:
              "The official menu highlights tacos, burritos, quesadillas, nachos and other signature Mexican dishes designed for sharing and celebration.",
          },
          {
            title: "Festive atmosphere",
            description:
              "Salsa’s brand language emphasises celebration, birthday specials and good times, making it a natural choice for casual dining, dates and family meals.",
          },
          {
            title: "Reservations and celebrations",
            description:
              "The site explicitly invites guests to book a table for date nights, group dining and special occasions, reinforcing its social and celebratory positioning.",
          },
        ],
        menuLinks: [
          {
            label: "Full menu",
            description: "View the current Salsa Mexican Grill menu online.",
            href: "https://salsamexicangrill.co.za/food-menu-2/",
          },
          {
            label: "Make a reservation",
            description: "Book your table directly through the official Salsa reservation page.",
            href: "https://salsamexicangrill.co.za/make-a-reservation-2/",
          },
        ],
        storyHeading: "Our story",
        experienceEyebrow: "Lowveld dining",
        experienceHeading: "A lively Mexican fiesta",
        menuIntroduction:
          "Browse the official Salsa menu and reservation page for the latest dishes, offers and table booking details.",
      },
      seoTitle: "Salsa Mexican Grill | Discover Mbombela",
      seoDescription:
        "Discover Salsa Mexican Grill in Mbombela. Explore the Mexican cuisine, menu, reservations, location and celebratory dining experience on Discover by Lowveld Hub.",
      source: "https://salsamexicangrill.co.za/",
      sourceUrl: "https://salsamexicangrill.co.za/",
      locationAccuracy: "approximate",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "mugg-and-bean-crossing-centre",
      slug: "mugg-and-bean-crossing-centre",
      listingKind: "business",
      type: "Restaurant",
      name: "Mugg & Bean Crossing Centre",
      subcategory: "Coffee · Breakfast · Lunch",
      diningType: "Restaurant",
      diningStyles: ["Coffee", "Breakfast & Brunch", "Lunch"],
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      address: "Shop 31 & 32, The Crossing Shopping Centre, Madiba Drive, West Acres",
      province: "Mpumalanga",
      postalCode: "1211",
      country: "South Africa",
      description:
        "Enjoy freshly brewed coffee, all-day breakfast and brunch, generous lunches, and baked treats at Mugg & Bean Crossing Centre. Dine in, take away, or order online at The Crossing Shopping Centre in Mbombela.",
      image:
        "https://d1fbczgvp9hkii.cloudfront.net/assets/images/img-pages/blog/2026/lunch/may/M%26B_Lunch_Banner.webp",
      imageAlt: "Mugg & Bean lunch campaign",
      images: [
        "https://d1fbczgvp9hkii.cloudfront.net/assets/images/img-pages/blog/2026/lunch/may/M%26B_Lunch_Banner.webp",
        "https://d1fbczgvp9hkii.cloudfront.net/assets/images/img-pages/blog/2026/lunch/july/lunch-sit-down-burger-salad-bowl.webp",
      ],
      imageAlts: ["Mugg & Bean lunch campaign", "A burger with fries served alongside lunch bowls"],
      phone: "+27137522250",
      email: "info@muggandbean.co.za",
      website: "https://www.muggandbean.co.za/",
      orderingUrl: "https://app.muggandbean.co.za/",
      menuUrl: "https://www.muggandbean.co.za/our-menu/sit-down-menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Mugg+%26+Bean+Crossing+Centre&destination_place_id=ChIJa5koog1K6B4RIPJK1h2eTHM",
      socialLinks: [
        { label: "Facebook", href: "https://www.facebook.com/MuggandBeanSA" },
        { label: "Instagram", href: "https://www.instagram.com/mugg_and_bean/" },
        { label: "X", href: "https://twitter.com/Mugg_and_Bean" },
        { label: "YouTube", href: "https://www.youtube.com/channel/UCMxLW91u2x5icTigTpeSAmQ" },
      ],
      amenities: [
        "Breakfast",
        "Brunch",
        "Coffee",
        "Debit cards",
        "Dessert",
        "Dine-in",
        "Dinner",
        "Family friendly",
        "Good for kids",
        "Counter service",
      ],
      openingHours: {
        Monday: "7:00 AM–5:00 PM",
        Tuesday: "7:00 AM–5:00 PM",
        Wednesday: "7:00 AM–5:00 PM",
        Thursday: "7:00 AM–5:00 PM",
        Friday: "7:00 AM–5:00 PM",
        Saturday: "7:00 AM–4:00 PM",
        Sunday: "8:00 AM–3:00 PM",
      },
      latitude: -25.472708,
      longitude: 30.96794,
      restaurantProfile: {
        story: [
          "Mugg & Bean Crossing Centre serves freshly brewed coffee, bottomless drinks, generous breakfast, brunch and lunch, plus muffins and cakes baked from scratch.",
          "Visit for a sit-down meal, pick up takeaway, or order online. The branch is at The Crossing Shopping Centre on Madiba Drive in Mbombela.",
        ],
        experienceHighlights: [
          {
            title: "All-day breakfast & brunch",
            description:
              "The official branch menu features hearty breakfasts, Eggs Benedict, breakfast bagels and other brunch choices.",
          },
          {
            title: "Generous lunch",
            description:
              "Choose from a range of lunch meals, including plant-based and hearty options, with sharing platters also listed.",
          },
          {
            title: "Freshly baked",
            description:
              "The branch profile highlights muffins and cakes baked from scratch, alongside other freshly baked treats.",
          },
          {
            title: "Coffee & bottomless drinks",
            description:
              "Freshly brewed coffee and bottomless drinks are part of the Crossing Centre location's listed offering.",
          },
        ],
        menuLinks: [
          {
            label: "Breakfast & Brunch",
            description: "See the current sit-down breakfast and brunch menu.",
            href: "https://www.muggandbean.co.za/our-menu/sit-down-menu/#breakfast-brunch",
          },
          {
            label: "Generous Lunch",
            description: "Browse current lunch dishes on the official sit-down menu.",
            href: "https://www.muggandbean.co.za/our-menu/sit-down-menu/#hearty-generous",
          },
          {
            label: "Freshly Baked",
            description: "Explore the baked treats featured on the official menu.",
            href: "https://www.muggandbean.co.za/our-menu/sit-down-menu/#freshly-baked",
          },
        ],
        storyHeading: "Our Story",
        experienceEyebrow: "Coffee, breakfast & lunch",
        experienceHeading: "More & More at Crossing Centre",
        menuIntroduction:
          "Browse Mugg & Bean's official sit-down menu for current dishes and details.",
      },
      seoDescription:
        "Visit Mugg & Bean Crossing Centre in Mbombela for coffee, breakfast, brunch, lunch and freshly baked treats. See its menu, opening hours, directions and contact details.",
      source:
        "https://locations.muggandbean.co.za/restaurants-TheCrossingShoppingCentre-MuggBeanCrossingCentre",
      sourceUrl:
        "https://locations.muggandbean.co.za/restaurants-TheCrossingShoppingCentre-MuggBeanCrossingCentre",
      seeded: true,
      sourceType: "seeded_public_data",
      locationAccuracy: "address",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
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
    {
      id: "zest-restaurant-mbombela",
      slug: "zest-restaurant-mbombela",
      listingKind: "business",
      type: "Restaurant",
      name: "Zest Restaurant",
      subcategory: "Modern Fusion Cuisine",
      cuisineTypes: ["Modern fusion cuisine", "French", "Mediterranean", "Italian"],
      diningType: "Restaurant",
      diningStyles: ["Breakfast", "Lunch", "Dinner", "Fine wine"],
      mealTypes: ["Breakfast", "Lunch", "Dinner"],
      location: "Mbombela",
      town: "Mbombela",
      address: "Lowveld Living Guesthouse, 28 Hunter Street",
      province: "Mpumalanga",
      postalCode: "1201",
      country: "South Africa",
      description:
        "Zest Restaurant at Lowveld Living Guesthouse serves modern fusion cuisine and fine wines, drawing on French, Mediterranean and Italian traditions with local flavours. The restaurant is open for breakfast, lunch and dinner.",
      image: "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_9975.jpg",
      imageAlt: "Zest Restaurant official gallery photo 1",
      images: [
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_9975.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_9916.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_9887.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_5428.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_5405.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_1129-Edit.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_1181.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_0182.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_0834.jpg",
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/09/IMG_0872.jpg",
      ],
      imageAlts: [
        "Zest Restaurant official gallery photo 1",
        "Zest Restaurant official gallery photo 2",
        "Zest Restaurant official gallery photo 3",
        "Zest Restaurant official gallery photo 4",
        "Zest Restaurant official gallery photo 5",
        "Zest Restaurant official gallery photo 6",
        "Zest Restaurant official gallery photo 7",
        "Zest Restaurant official gallery photo 8",
        "Zest Restaurant official gallery photo 9",
        "Zest Restaurant official gallery photo 10",
      ],
      phone: "+27 74 637 0067",
      email: "info@llgh.co.za",
      website: "https://lowveldlivingguesthouse.co.za/home-page-zest-restaurant/",
      menuUrl:
        "https://lowveldlivingguesthouse.co.za/wp-content/uploads/2022/11/ZEST-SET-MENU-Winter-2024.pdf",
      directionsUrl:
        "https://www.google.com/maps/dir//zest+nelspruit/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x1ee8496d8496ee25:0xf280ab0b60e9f60f",
      source: "https://lowveldlivingguesthouse.co.za/home-page-zest-restaurant/",
      sourceUrl: "https://lowveldlivingguesthouse.co.za/home-page-zest-restaurant/",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-hazyview",
      slug: "ocean-basket-hazyview",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Hazyview",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Hazyview",
      town: "Hazyview",
      address: "Shop 20 & 21, Hazyview Junction, Poria Shabangu Street",
      province: "Mpumalanga",
      postalCode: "1242",
      country: "South Africa",
      description:
        "Ocean Basket Hazyview brings people together over grilled seafood, freshly prepared sushi, sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27137373097",
      email: "hazyview@oceanbasket.com",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Hazyview&destination_place_id=ChIJdwgk4_Wdwh4RZ7Rr_9J1TUQ",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 8:30 PM",
        Tuesday: "11:00 AM - 8:30 PM",
        Wednesday: "11:00 AM - 8:30 PM",
        Thursday: "11:00 AM - 8:30 PM",
        Friday: "11:00 AM - 9:00 PM",
        Saturday: "11:00 AM - 9:00 PM",
        Sunday: "10:00 AM - 8:00 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-hazyview",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-hazyview",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-highveld-mall",
      slug: "ocean-basket-highveld-mall",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Highveld Mall",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Emalahleni",
      town: "Emalahleni",
      address: "Shop 9, Highveld Mall, Mandela Street",
      province: "Mpumalanga",
      postalCode: "1035",
      country: "South Africa",
      description:
        "Ocean Basket serves grilled seafood, freshly prepared sushi, generous sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27136970046",
      email: "highveld@oceanbasket.com",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Highveld+Mall&destination_place_id=ChIJBSx7W_fy6h4R3MpjudlNTno",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 8:00 PM",
        Tuesday: "11:00 AM - 8:00 PM",
        Wednesday: "11:00 AM - 8:00 PM",
        Thursday: "11:00 AM - 8:00 PM",
        Friday: "11:00 AM - 9:00 PM",
        Saturday: "11:00 AM - 9:00 PM",
        Sunday: "11:00 AM - 8:00 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-highveld-mall",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-highveld-mall",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-witbank",
      slug: "ocean-basket-witbank",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Witbank",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Emalahleni",
      town: "Emalahleni",
      address: "Shop E-26, Saveways Crescent Centre, Mandela Street, Witbank",
      province: "Mpumalanga",
      postalCode: "1035",
      country: "South Africa",
      description:
        "Ocean Basket serves grilled seafood, freshly prepared sushi, generous sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27136903946",
      email: "operations@magagu.co.za",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Witbank&destination_place_id=ChIJJ9hVEKHy6h4RwhE6Ywn91oU",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 9:00 PM",
        Tuesday: "11:00 AM - 9:00 PM",
        Wednesday: "11:00 AM - 9:00 PM",
        Thursday: "11:00 AM - 9:00 PM",
        Friday: "11:00 AM - 9:30 PM",
        Saturday: "11:00 AM - 9:00 PM",
        Sunday: "11:00 AM - 8:00 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-witbank",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-witbank",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-ermelo",
      slug: "ocean-basket-ermelo",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Ermelo",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Ermelo",
      town: "Ermelo",
      address: "Shop 21, Merino Mall, Voortrekker Street",
      province: "Mpumalanga",
      postalCode: "2351",
      country: "South Africa",
      description:
        "Ocean Basket serves grilled seafood, freshly prepared sushi, generous sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27178111262",
      email: "danielc@oceanbasket.com",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Ermelo&destination_place_id=ChIJF3Sxbubl6x4ReATLsx5c3gs",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 8:00 PM",
        Tuesday: "11:00 AM - 8:00 PM",
        Wednesday: "11:00 AM - 8:00 PM",
        Thursday: "11:00 AM - 8:00 PM",
        Friday: "11:00 AM - 8:00 PM",
        Saturday: "11:00 AM - 9:00 PM",
        Sunday: "11:00 AM - 9:00 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-ermelo",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-ermelo",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-lydenburg",
      slug: "ocean-basket-lydenburg",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Lydenburg",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Lydenburg",
      town: "Lydenburg",
      address: "46 Voortrekker Street",
      province: "Mpumalanga",
      postalCode: "1120",
      country: "South Africa",
      description:
        "Ocean Basket serves grilled seafood, freshly prepared sushi, generous sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27131103143",
      email: "lydenburg@oceanbasket.com",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Lydenburg&destination_place_id=ChIJYecdSsENwh4RIs7ilYUKiY8",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 8:30 PM",
        Tuesday: "11:00 AM - 8:30 PM",
        Wednesday: "11:00 AM - 8:30 PM",
        Thursday: "11:00 AM - 8:30 PM",
        Friday: "11:00 AM - 8:30 PM",
        Saturday: "11:00 AM - 8:30 PM",
        Sunday: "11:00 AM - 3:00 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-lydenburg",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-lydenburg",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-nelspruit",
      slug: "ocean-basket-nelspruit",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Nelspruit",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Mbombela",
      town: "Mbombela",
      address: "17 Ferreira Street",
      province: "Mpumalanga",
      postalCode: "1201",
      country: "South Africa",
      description:
        "Ocean Basket serves grilled seafood, freshly prepared sushi, generous sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27130010362",
      email: "nelspruit@oceanbasket.com",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Nelspruit&destination_place_id=ChIJ82M57BtK6B4RkLbw4wI0bOk",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 9:30 PM",
        Tuesday: "11:00 AM - 9:30 PM",
        Wednesday: "11:00 AM - 9:30 PM",
        Thursday: "11:00 AM - 9:30 PM",
        Friday: "11:00 AM - 9:30 PM",
        Saturday: "11:00 AM - 9:30 PM",
        Sunday: "11:00 AM - 8:00 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-nelspruit",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-nelspruit",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-middelburg",
      slug: "ocean-basket-middelburg",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Middelburg",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Middelburg",
      town: "Middelburg",
      address: "Shop 55A, Midwater Shopping Centre, Keiskamma Drive, Aerorand",
      province: "Mpumalanga",
      postalCode: "1055",
      country: "South Africa",
      description:
        "Ocean Basket serves grilled seafood, freshly prepared sushi, generous sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27131708022",
      email: "obmiddelburg@gmail.com",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Middelburg&destination_place_id=ChIJAQAAAJdg6h4RbNTC_z9aOvY",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 8:30 PM",
        Tuesday: "11:00 AM - 8:30 PM",
        Wednesday: "11:00 AM - 8:30 PM",
        Thursday: "11:00 AM - 8:30 PM",
        Friday: "11:00 AM - 8:30 PM",
        Saturday: "11:00 AM - 8:30 PM",
        Sunday: "11:00 AM - 7:30 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-middelburg",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-middelburg",
      seeded: true,
      sourceType: "seeded_public_data",
      additionalCategorySlugs: ["eat"],
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "ocean-basket-secunda",
      slug: "ocean-basket-secunda",
      listingKind: "business",
      type: "Restaurant",
      name: "Ocean Basket Secunda",
      subcategory: "Seafood and sushi",
      cuisineTypes: ["Seafood", "Sushi"],
      diningType: "Restaurant",
      location: "Secunda",
      town: "Secunda",
      address: "Block E, Lake Umuzi, 1 Kiewiet Street",
      province: "Mpumalanga",
      postalCode: "2302",
      country: "South Africa",
      description:
        "Ocean Basket serves grilled seafood, freshly prepared sushi, generous sharing platters and family favourites.",
      image: oceanBasketGalleryImages[0],
      imageAlt: oceanBasketGalleryAlts[0],
      images: oceanBasketGalleryImages,
      imageAlts: oceanBasketGalleryAlts,
      phone: "+27176315353",
      email: "secunda@oceanbasket.com",
      website: "https://za.oceanbasket.com/",
      menuUrl: "https://za.oceanbasket.com/menu/",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Ocean+Basket+Secunda&destination_place_id=ChIJt6JvlwcT6x4Rc3N0Ozelkf8",
      services: ["Dine-in", "Delivery", "Accepts reservations"],
      openingHours: {
        Monday: "11:00 AM - 9:00 PM",
        Tuesday: "11:00 AM - 9:00 PM",
        Wednesday: "11:00 AM - 9:00 PM",
        Thursday: "11:00 AM - 9:00 PM",
        Friday: "11:00 AM - 9:30 PM",
        Saturday: "11:00 AM - 9:30 PM",
        Sunday: "11:00 AM - 8:30 PM",
      },
      source: "https://locations.za.oceanbasket.com/seafood-restaurant-secunda",
      sourceUrl: "https://locations.za.oceanbasket.com/seafood-restaurant-secunda",
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
  property: [],
};

export const vehicleListings: VehicleListing[] = [];
export const propertyListings: PropertyListing[] = [];

export function getCategoryListings(category: CategorySlug): CategoryListing[] {
  const sourceCategory =
    category === "stay" ? "accommodation" : category === "eat" ? "food-dining" : category;
  const baseListings = categoryListings[sourceCategory] ?? [];
  const crossListed = Object.values(categoryListings)
    .flat()
    .filter((listing) => listing.additionalCategorySlugs?.includes(category));
  return [
    ...new Map([...baseListings, ...crossListed].map((listing) => [listing.id, listing])).values(),
  ];
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

export function getListingOpenStatus(
  listing: CategoryListing,
  now = new Date(),
): boolean | undefined {
  if (listing.id === "mugg-and-bean-crossing-centre") {
    return getMuggAndBeanOpenStatus(listing.openingHours, now);
  }
  const hasOpeningHours = Object.keys(listing.openingHours ?? {}).length > 0;
  return hasOpeningHours &&
    isListingDataCurrent(listing, now.getTime()) &&
    typeof listing.openNow === "boolean"
    ? listing.openNow
    : undefined;
}

function getMuggAndBeanOpenStatus(openingHours?: Record<string, string>, now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Johannesburg",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  const hoursForToday = weekday ? openingHours?.[weekday] : undefined;
  const match = hoursForToday?.match(
    /^\s*(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)\s*$/i,
  );
  if (!match || !Number.isFinite(hour) || !Number.isFinite(minute)) return undefined;

  const toMinutes = (hourValue: string, minuteValue: string, meridiem: string) => {
    const normalizedHour = Number(hourValue) % 12;
    return (
      (normalizedHour + (meridiem.toLocaleUpperCase() === "PM" ? 12 : 0)) * 60 + Number(minuteValue)
    );
  };
  const opensAt = toMinutes(match[1], match[2], match[3]);
  const closesAt = toMinutes(match[4], match[5], match[6]);
  const currentTime = hour * 60 + minute;
  return currentTime >= opensAt && currentTime < closesAt;
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

export function isEventListing(listing: CategoryListing): listing is EventListing {
  return (
    listing.listingKind === "event" &&
    typeof listing.eventStartDate === "string" &&
    typeof listing.venue === "string"
  );
}

export function getPublishedEventListings() {
  return getCategoryListings("leisure-entertainment")
    .filter(isEventListing)
    .filter(isPublishedListing);
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
  const target = findDiscoveryLocation(location);
  const normalizedLocation = location.trim().toLocaleLowerCase();
  return getPublishedCategoryListings().filter(({ listing }) => {
    const listingLocation = listing.location?.trim();
    if (!listingLocation) return false;
    const discoveredLocation = findDiscoveryLocation(listingLocation);
    if (target && discoveredLocation) return target.slug === discoveredLocation.slug;
    return listingLocation.toLocaleLowerCase() === normalizedLocation;
  });
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

export function getCategoryListingPath(category: CategorySlug, listing: CategoryListing) {
  const slug = getBusinessSlug(listing);
  if (listing.listingKind === "event") return `/events/${slug}`;
  if (listing.listingKind === "property") return `/property/${slug}`;
  if (
    category === "accommodation" ||
    category === "stay" ||
    listing.listingKind === "accommodation"
  ) {
    return `/accommodation/${slug}`;
  }
  return `/business/${slug}`;
}

export function findBusinessBySlug(slug: string) {
  return getPublishedCategoryListings().find(
    ({ listing }) => listing.listingKind !== "event" && getBusinessSlug(listing) === slug,
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
