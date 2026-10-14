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
    "University",
    "TVET College",
    "Private School",
    "Private College",
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

export type EducationInstitutionProfile = {
  campusName?: string;
  educationLevels: string[];
  programmeGroups?: {
    title: string;
    description: string;
    programmes?: string[];
    href?: string;
  }[];
  admissions?: {
    summary: string;
    applicationUrl?: string;
    currentDates?: string[];
    requirements?: string[];
  };
  facilities?: string[];
  studentExperience?: string[];
  officialLinks?: { label: string; href: string }[];
  sourceNotes: { label: string; href: string }[];
};

export type EventBusinessProfile = {
  displayType: string;
  serviceSections: { title: string; description: string }[];
  venueSpaces?: { name: string; description: string }[];
  facts?: { label: string; value: string; note?: string }[];
  accommodation?: string;
  dining?: string;
  enquiryNote?: string;
  officialLinks: { label: string; href: string }[];
};

export type WellnessBusinessProfile = {
  displayName: string;
  providerType: string;
  summary: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  website?: string;
  bookingUrl?: string;
  bookingLabel?: string;
  email?: string;
  logo?: string;
  logoAlt?: string;
  image?: string;
  imageAlt?: string;
  images?: string[];
  imageAlts?: string[];
  imageSourceUrls?: string[];
  treatmentSections: { title: string; items: string[]; note?: string }[];
  facilities?: string[];
  facilitiesNote?: string;
  visitNotes?: string[];
};

export type CategoryListing = {
  id: string;
  slug?: string;
  listingKind?: "business" | "vehicle" | "property" | "accommodation" | "course" | "event";
  type?: string;
  accommodationType?: string;
  roomTypes?: string[];
  roomCount?: number;
  accommodationProfile?: {
    rooms: {
      name: string;
      image: string;
      imageAlt: string;
      description: string;
      amenities: string[];
      images?: { image: string; imageAlt: string }[];
    }[];
    nearbyDescription: string;
  };
  amenities?: string[];
  facilities?: string[];
  visitorInformation?: string[];
  features?: string[];
  bookingUrl?: string;
  enquiryUrl?: string;
  orderingUrl?: string;
  seeded?: boolean;
  sourceType?: "seeded_public_data";
  sourceUrl?: string;
  additionalCategorySlugs?: CategorySlug[];
  locationAccuracy?: "address" | "approximate";
  educationType?: string;
  educationLevels?: string[];
  subjects?: string[];
  educationProfile?: EducationInstitutionProfile;
  eventBusinessTypes?: string[];
  eventProfile?: EventBusinessProfile;
  wellnessProfile?: WellnessBusinessProfile;
  featuredOrder?: number;
  directoryOrder?: number;
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
  addressLabel?: string;
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
  imageFit?: "cover" | "contain";
  logo?: string;
  logoAlt?: string;
  images?: string[];
  imageAlts?: string[];
  imageSourceUrls?: string[];
  services?: string[];
  specialties?: string[];
  serviceAreas?: string[];
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
const directoryOrderSort: CategorySortConfig = {
  id: "curated",
  label: "Curated order",
  field: "directoryOrder",
  direction: "asc",
  requiresData: true,
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
    sortOptions: [directoryOrderSort, nameSort],
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
      "Compare universities, colleges and schools across Mpumalanga, with links to programme and admissions information.",
    shortDescription: "Schools, tutors and skills training.",
    seoTitle: "Education & Training in Mpumalanga | Discover by Lowveld Hub",
    seoDescription:
      "Explore universities, TVET colleges, private schools and colleges across Mpumalanga, with programme and admissions links.",
    searchPlaceholder: "Search institutions, programmes or locations...",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "educationLevels",
      "subjects",
      "location",
      "description",
      "services",
    ],
    heroImage: "https://www.penryn.co.za/wp-content/uploads/2024/11/collegebtm-1.webp",
    icon: "education-training",
    iconAlt: "Education and training category",
    cardVariant: "education",
    cardFields: [
      { label: "Institution", field: "type" },
      { label: "Levels", field: "educationLevels" },
      { label: "Location", field: "location" },
    ],
    filters: [
      {
        id: "category-type",
        label: "Institution type",
        field: "type",
        kind: "multi",
        optionsFromData: true,
      },
      {
        id: "education-level",
        label: "Education level",
        field: "educationLevels",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "programme-area",
        label: "Programme area",
        field: "subjects",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      discoveryLocationFilter,
    ],
    sortOptions: [nameSort, relevanceSort],
    resultNoun: "institutions",
    emptyTitle: "No institutions match those choices.",
    emptyDescription:
      "Try adjusting your search or filters, or clear them to see every listed institution.",
    ownerHeading: "Represent an education institution?",
    ownerDescription:
      "Help learners and families find accurate information about your campus, programmes and admissions.",
    ownerBenefits: businessOwnerBenefits,
    indexability: "always",
  },
  "beauty-wellness-fitness": {
    ...primaryCategoryConfig({
      slug: "beauty-wellness-fitness",
      label: "Beauty, Wellness & Fitness",
      description:
        "Find considered spa, beauty and wellness experiences across Mpumalanga, from mobile treatments in Mbombela to riverside retreats and country-estate spas.",
      shortDescription: "Spa, beauty and wellness experiences across Mpumalanga.",
      searchPlaceholder: "Search spas, treatments or locations...",
      typeLabel: "Wellness service",
      subcategories: discoverySubcategories["beauty-wellness-fitness"],
      heroImage:
        "https://beautyonwheelsgroup.com/wp-content/uploads/2026/08/bow-wellness-picture.jpg",
      icon: "beauty-wellness-fitness",
    }),
    headline: "Discover Your Moment of Wellbeing",
    seoTitle: "Spas, Beauty & Wellness in Mpumalanga | Discover",
    seoDescription:
      "Explore spa, beauty and wellness providers in Mpumalanga, with treatment details, locations, galleries and direct enquiry links.",
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
    filters: [
      discoveryLocationFilter,
      {
        id: "wellness-services",
        label: "Treatments & services",
        field: "services",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [
      {
        id: "featured",
        label: "Curated order",
        field: "featuredOrder",
        direction: "asc",
        requiresData: true,
      },
      nameSort,
    ],
    resultNoun: "providers",
    indexability: "always",
    emptyTitle: "No wellness providers match those choices.",
    emptyDescription:
      "Try another treatment or location, or clear the filters to browse every spa and wellness provider.",
    ownerHeading: "List your beauty, spa or wellness business.",
    ownerDescription:
      "Help people find your salon, spa, studio or fitness services across Mpumalanga.",
  },
  events: {
    ...primaryCategoryConfig({
      slug: "events",
      label: "Events, Weddings & Celebrations",
      description:
        "Explore distinctive wedding venues, event estates and experienced celebration professionals across Mpumalanga.",
      shortDescription: "Wedding venues, event estates and planners across the Lowveld.",
      searchPlaceholder: "Search venues, planners or event services...",
      typeLabel: "Event service",
      subcategories: discoverySubcategories.events,
      heroImage: "https://www.umbali.co.za/wp-content/uploads/2021/11/troue_627.png",
      icon: "events",
    }),
    headline: "Weddings, Events & Celebrations",
    seoTitle: "Wedding Venues & Event Planners in Mpumalanga | Discover",
    seoDescription:
      "Discover wedding venues, event estates and experienced planners for celebrations, conferences and functions across Mpumalanga.",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "eventBusinessTypes",
      "serviceType",
      "services",
      "products",
      "location",
      "description",
    ],
    filters: [
      {
        id: "event-business-type",
        label: "Business type",
        field: "eventBusinessTypes",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "event-services",
        label: "Services & occasions",
        field: "services",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      discoveryLocationFilter,
    ],
    sortOptions: [
      {
        id: "featured",
        label: "Curated order",
        field: "featuredOrder",
        direction: "asc",
        requiresData: true,
      },
      nameSort,
    ],
    resultNoun: "venues and event professionals",
    indexability: "always",
    emptyTitle: "No event businesses match those choices.",
    emptyDescription:
      "Try changing your filters, or explore the full collection of wedding venues and event professionals.",
    ownerHeading: "Bring your event business to Discover.",
    ownerDescription:
      "Showcase your venue or event services to people planning weddings and celebrations across Mpumalanga.",
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
        "Compare security providers serving Mpumalanga, from guarding and armed response to CCTV, monitoring and access control.",
      shortDescription: "Guarding, response, monitoring and access control.",
      searchPlaceholder: "Search security, CCTV or alarm services...",
      typeLabel: "Security service",
      subcategories: discoverySubcategories.security,
      heroImage: "",
      icon: "security",
    }),
    headline: "Security Services in Mpumalanga",
    seoTitle: "Security Companies & Services in Mpumalanga | Discover",
    seoDescription:
      "Explore security companies serving Mpumalanga, with service information, service areas and direct contact details.",
    searchFields: [
      "name",
      "type",
      "subcategory",
      "serviceType",
      "services",
      "specialties",
      "serviceAreas",
      "products",
      "location",
      "description",
    ],
    filters: [
      {
        id: "security-service",
        label: "Service type",
        field: "services",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
      {
        id: "security-area",
        label: "Area served",
        field: "serviceAreas",
        kind: "multi",
        optionsFromData: true,
        optional: true,
      },
    ],
    sortOptions: [
      {
        id: "featured",
        label: "Curated order",
        field: "featuredOrder",
        direction: "asc",
        requiresData: true,
      },
      nameSort,
    ],
    resultNoun: "security providers",
    indexability: "always",
    emptyTitle: "No security providers match those filters.",
    emptyDescription:
      "Try another service or area, or clear the filters to browse all security providers.",
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
      "Emnotweni Casino brings gaming, dining and entertainment together in Mbombela, with slot machines, table games and dining.",
    image: "/leisure/emnotweni-casino-floor.jpg",
    imageAlt: "Casino gaming floor with slot machines",
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
    seoDescription: "Discover Emnotweni Casino in Mbombela for gaming, dining and entertainment.",
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
      "A seasonal water park in Mbombela with water rides, a recreational pool, an adventure river, shaded seating, braai facilities and a tuck shop.",
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

const wellnessListings: CategoryListing[] = [
  {
    id: "beauty-on-wheels-health-spa",
    slug: "beauty-on-wheels-health-spa",
    listingKind: "business",
    featuredOrder: 1,
    type: "Mobile Spa",
    subcategory: "Spas & Wellness",
    name: "Beauty On Wheels Health Spa",
    location: "Mbombela",
    town: "Mbombela",
    address: "41 Protea Crescent, West Acres, Mbombela",
    province: "Mpumalanga",
    country: "South Africa",
    description:
      "Beauty On Wheels Health Spa offers massage, skin-care, hands-and-feet and body treatments from its Mbombela base, as well as mobile spa experiences for homes, workplaces, events and private groups.",
    image: "https://beautyonwheelsgroup.com/wp-content/uploads/2026/08/bow-wellness-picture.jpg",
    imageAlt: "Wellness experience offered by Beauty On Wheels Health Spa",
    images: [
      "https://beautyonwheelsgroup.com/wp-content/uploads/2026/05/5Q1A5392_1-scaled.jpg",
      "https://beautyonwheelsgroup.com/wp-content/uploads/2026/09/spa-pic-3.jpg",
      "https://beautyonwheelsgroup.com/wp-content/uploads/2026/10/wellness-retreat-5.jpeg",
    ],
    imageAlts: [
      "Wellness experience offered by Beauty On Wheels Health Spa",
      "Beauty On Wheels Health Spa treatment experience",
      "Spa treatment at Beauty On Wheels Health Spa",
      "Wellness retreat experience by Beauty On Wheels Health Spa",
    ],
    imageSourceUrls: [
      "https://beautyonwheelsgroup.com/wp-content/uploads/2026/08/bow-wellness-picture.jpg",
      "https://beautyonwheelsgroup.com/wp-content/uploads/2026/05/5Q1A5392_1-scaled.jpg",
      "https://beautyonwheelsgroup.com/wp-content/uploads/2026/09/spa-pic-3.jpg",
      "https://beautyonwheelsgroup.com/wp-content/uploads/2026/10/wellness-retreat-5.jpeg",
    ],
    services: [
      "Massage therapy",
      "Facials & skin care",
      "Hands & feet",
      "Body & beauty treatments",
      "Mobile group & corporate wellness",
    ],
    phone: "+27 72 857 1904",
    email: "bowhealthspa19@gmail.com",
    website: "https://beautyonwheelsgroup.com/",
    bookingUrl:
      "https://www.fresha.com/book-now/beauty-on-wheels-health-spa-hx1infif/all-offer?share=true&pId=1338762",
    source: "https://beautyonwheelsgroup.com/",
    sourceUrl: "https://beautyonwheelsgroup.com/spa-treatments/",
    locationAccuracy: "address",
    wellnessProfile: {
      displayName: "Beauty On Wheels Health Spa",
      providerType: "Mobile spa & health spa",
      summary:
        "Mbombela-based spa treatments, with mobile experiences for homes, workplaces, events and groups.",
      website: "https://beautyonwheelsgroup.com/spa-treatments/",
      bookingUrl:
        "https://www.fresha.com/book-now/beauty-on-wheels-health-spa-hx1infif/all-offer?share=true&pId=1338762",
      bookingLabel: "View treatments & book",
      treatmentSections: [
        {
          title: "Massage therapy",
          items: [
            "Swedish massage",
            "Deep-tissue massage",
            "Hot-stone massage",
            "Back, neck and shoulder massage",
            "Couples massage",
          ],
        },
        {
          title: "Facials & skin care",
          items: ["Deep-cleansing facials", "Dermaplaning", "Targeted facial treatments"],
        },
        {
          title: "Hands, feet & beauty",
          items: [
            "Manicures and pedicures",
            "Gel nails",
            "Foot scrubs, massage, peels and paraffin treatments",
            "Waxing, eyelash extensions and makeup",
          ],
        },
        {
          title: "Body & group wellness",
          items: [
            "Lymphatic drainage",
            "G5 body treatments",
            "Mobile spa packages for groups and corporate wellness",
          ],
        },
      ],
      visitNotes: [
        "Mobile enquiries can include the date, venue, group size and preferred treatments.",
      ],
    },
    seoTitle: "Beauty On Wheels Health Spa | Mbombela Spa | Discover",
    seoDescription:
      "Explore Beauty On Wheels Health Spa in Mbombela, with massages, facials, beauty treatments and mobile wellness experiences for homes, workplaces and events.",
    seeded: true,
    sourceType: "seeded_public_data",
    claimed: false,
    verified: false,
    featured: false,
    status: "published",
  },
  {
    id: "body-bliss-day-spa-hazyview-cabanas",
    slug: "body-bliss-day-spa-hazyview-cabanas",
    listingKind: "business",
    featuredOrder: 3,
    type: "Day Spa",
    subcategory: "Spas & Wellness",
    name: "Body Bliss Day Spa at Hazyview Cabanas",
    location: "Hazyview",
    town: "Hazyview",
    address: "R536, Hazyview, 1242, South Africa",
    province: "Mpumalanga",
    postalCode: "1242",
    country: "South Africa",
    latitude: -25.034583131606404,
    longitude: 31.057292567715347,
    description:
      "Set beside the Sabie River at Hazyview Cabanas, Body Bliss Day Spa offers massage, facial and body treatments to resort guests and day visitors.",
    image:
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/featured-image.webp",
    imageAlt: "Body Bliss Day Spa at Hazyview Cabanas",
    images: [
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/gallery/thumb/1_Hazyview_BodyBliss.webp",
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/gallery/thumb/4_Hazyview_BodyBliss.webp",
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/gallery/thumb/11_Hazyview_BodyBliss.webp",
    ],
    imageAlts: [
      "Body Bliss Day Spa at Hazyview Cabanas",
      "Body Bliss Day Spa gallery at Hazyview Cabanas",
      "Spa experience at Body Bliss Day Spa, Hazyview",
      "Treatment setting at Body Bliss Day Spa, Hazyview",
    ],
    imageSourceUrls: [
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/featured-image.webp",
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/gallery/thumb/1_Hazyview_BodyBliss.webp",
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/gallery/thumb/4_Hazyview_BodyBliss.webp",
      "https://www.hazyviewcabanas.co.za/assets/img/facilities/body-bliss-day-spa/gallery/thumb/11_Hazyview_BodyBliss.webp",
    ],
    services: ["Massages", "Facials", "Body treatments"],
    phone: "+27 13 737 8041",
    email: "hazyviewspa@bodybliss.co.za",
    website: "https://www.hazyviewcabanas.co.za/body-bliss-day-spa",
    bookingUrl: "https://www.bodybliss.co.za/hazyview-cabanas#bookings-2",
    openingHours: {
      Monday: "8:00 AM - 5:00 PM",
      Tuesday: "8:00 AM - 5:00 PM",
      Wednesday: "8:00 AM - 5:00 PM",
      Thursday: "8:00 AM - 5:00 PM",
      Friday: "8:00 AM - 5:00 PM",
      Saturday: "8:00 AM - 5:00 PM",
      Sunday: "8:00 AM - 5:00 PM",
    },
    source: "https://www.hazyviewcabanas.co.za/body-bliss-day-spa",
    sourceUrl: "https://www.bodybliss.co.za/hazyview-cabanas",
    locationAccuracy: "address",
    wellnessProfile: {
      displayName: "Body Bliss Day Spa",
      providerType: "Riverside day spa",
      summary:
        "A Sabie River-side spa at Hazyview Cabanas, open to resort guests and day visitors.",
      website: "https://www.bodybliss.co.za/hazyview-cabanas",
      bookingUrl: "https://www.bodybliss.co.za/hazyview-cabanas#bookings-2",
      bookingLabel: "Book a treatment",
      email: "hazyviewspa@bodybliss.co.za",
      logo: "https://www.bodybliss.co.za/assets/img/svg/body-bliss-day-spa-logo.svg",
      logoAlt: "Body Bliss Day Spa logo",
      treatmentSections: [
        {
          title: "Spa treatments",
          items: ["Massages", "Facials", "Body treatments"],
        },
      ],
      facilities: ["Treatment rooms", "Riverfront setting"],
      visitNotes: [
        "The spa welcomes Hazyview Cabanas resort guests and day visitors.",
        "Open daily, 08:00-17:00.",
      ],
    },
    seoTitle: "Body Bliss Day Spa at Hazyview Cabanas | Discover",
    seoDescription:
      "Visit Body Bliss Day Spa at Hazyview Cabanas in Hazyview for massages, facials and body treatments beside the Sabie River. Day visitors are welcome.",
    seeded: true,
    sourceType: "seeded_public_data",
    claimed: false,
    verified: false,
    featured: false,
    status: "published",
  },
  {
    id: "pause-spa-anew-resort-hazyview",
    slug: "pause-spa-anew-resort-hazyview",
    listingKind: "business",
    featuredOrder: 5,
    type: "Resort Spa",
    subcategory: "Spas & Wellness",
    name: "Pause Spa at ANEW Resort Hazyview",
    location: "Hazyview",
    town: "Hazyview",
    province: "Mpumalanga",
    country: "South Africa",
    description:
      "Pause Spa at ANEW Resort Hazyview offers massages, facials, manicures, pedicures, tinting and waxing. Appointments are arranged directly with the spa.",
    image: "https://anewhotels.com/wp-content/uploads/2025/11/Spa-9.jpg",
    imageAlt: "Spa treatment setting at Pause Spa, ANEW Resort Hazyview",
    images: [
      "https://anewhotels.com/wp-content/uploads/2025/11/Spa-6.jpg",
      "https://anewhotels.com/wp-content/uploads/2025/11/Spa.jpg",
      "https://anewhotels.com/wp-content/uploads/2025/11/Spa-11.jpg",
    ],
    imageAlts: [
      "Spa treatment setting at Pause Spa, ANEW Resort Hazyview",
      "Spa experience at ANEW Resort Hazyview",
      "Treatment setting at Pause Spa, ANEW Resort Hazyview",
      "Pause Spa treatment room at ANEW Resort Hazyview",
    ],
    imageSourceUrls: [
      "https://anewhotels.com/wp-content/uploads/2025/11/Spa-9.jpg",
      "https://anewhotels.com/wp-content/uploads/2025/11/Spa-6.jpg",
      "https://anewhotels.com/wp-content/uploads/2025/11/Spa.jpg",
      "https://anewhotels.com/wp-content/uploads/2025/11/Spa-11.jpg",
    ],
    services: ["Massages", "Facials", "Manicures & pedicures", "Tinting & waxing"],
    phone: "+27 72 309 9585",
    email: "pause@sanbonani.com",
    website: "https://anewhotels.com/hotels/hazyview/spa/",
    source: "https://anewhotels.com/hotels/hazyview/spa/",
    sourceUrl: "https://anewhotels.com/hotels/hazyview/",
    locationAccuracy: "approximate",
    wellnessProfile: {
      displayName: "Pause Spa",
      providerType: "Resort spa",
      summary:
        "A treatment spa at ANEW Resort Hazyview, with appointments made directly with the spa team.",
      website: "https://anewhotels.com/hotels/hazyview/spa/",
      email: "pause@sanbonani.com",
      treatmentSections: [
        {
          title: "Massages",
          items: [
            "Tension Release Body Vigour Massage",
            "Full Body Massage",
            "TheraNaka CBD-Infused Heated Balm Massage",
          ],
        },
        {
          title: "Facials",
          items: ["TheraNaka Essential Care Facial", "TheraNaka Essential Phyto-Boost Facial"],
        },
        {
          title: "Hands, feet & finishing treatments",
          items: [
            "TheraNaka Manicure and Hands & Feet Collection",
            "Tinting and waxing for eyebrows and lashes",
          ],
        },
      ],
      visitNotes: [
        "Treatments are available by appointment, with after-hours appointments arranged in advance.",
      ],
    },
    seoTitle: "Pause Spa at ANEW Resort Hazyview | Discover",
    seoDescription:
      "Explore massage, facial, manicure, pedicure, tinting and waxing services at Pause Spa at ANEW Resort Hazyview.",
    seeded: true,
    sourceType: "seeded_public_data",
    claimed: false,
    verified: false,
    featured: false,
    status: "published",
  },
  {
    id: "amani-spa-and-wellness-sabi-sabi",
    slug: "amani-spa-and-wellness-sabi-sabi",
    listingKind: "business",
    featuredOrder: 6,
    type: "Safari Spa & Wellness",
    subcategory: "Spas & Wellness",
    name: "Amani Spa & Wellness at Sabi Sabi",
    location: "Sabi Sabi Private Game Reserve",
    province: "Mpumalanga",
    country: "South Africa",
    description:
      "Amani Spa & Wellness is Sabi Sabi's spa offering within its safari setting, with indigenous healing treatments, natural products, rejuvenating massages and soothing rituals.",
    image:
      "https://www.sabisabi.com/application/files/thumbnails/image_1910x796/8716/5685/7723/luxurious-treatments-sabi-sabi.jpg?fID=1883&ftid=9&d=0",
    imageAlt: "Amani Spa treatments at Sabi Sabi",
    images: [
      "https://www.sabisabi.com/application/files/thumbnails/image_836x676/5616/5685/7783/create-memories-amani-spa.jpg?fID=1908&ftid=5&d=0",
      "https://www.sabisabi.com/application/files/thumbnails/image_955x624/5416/6738/3368/outdoor-massage.jpg?fID=29778&ftid=136&d=0",
      "https://www.sabisabi.com/application/files/thumbnails/image_962x540/4816/6738/3295/couples-treatment-spa.jpg?fID=29776&ftid=141&d=0",
      "https://www.sabisabi.com/application/files/thumbnails/image_643x540/7816/5685/7759/healing-rituals-earth-spa.jpg?fID=1898&ftid=142&d=0",
    ],
    imageAlts: [
      "Amani Spa treatments at Sabi Sabi",
      "Amani Spa experience at Sabi Sabi",
      "Outdoor spa massage at Sabi Sabi",
      "Spa treatment setting at Sabi Sabi",
      "Healing ritual at the Sabi Sabi Earth Lodge spa",
    ],
    imageSourceUrls: [
      "https://www.sabisabi.com/application/files/thumbnails/image_1910x796/8716/5685/7723/luxurious-treatments-sabi-sabi.jpg?fID=1883&ftid=9&d=0",
      "https://www.sabisabi.com/application/files/thumbnails/image_836x676/5616/5685/7783/create-memories-amani-spa.jpg?fID=1908&ftid=5&d=0",
      "https://www.sabisabi.com/application/files/thumbnails/image_955x624/5416/6738/3368/outdoor-massage.jpg?fID=29778&ftid=136&d=0",
      "https://www.sabisabi.com/application/files/thumbnails/image_962x540/4816/6738/3295/couples-treatment-spa.jpg?fID=29776&ftid=141&d=0",
      "https://www.sabisabi.com/application/files/thumbnails/image_643x540/7816/5685/7759/healing-rituals-earth-spa.jpg?fID=1898&ftid=142&d=0",
    ],
    services: ["Rejuvenating massages", "Soothing rituals", "Indigenous healing treatments"],
    website: "https://www.sabisabi.com/experience/amani-spa",
    source: "https://www.sabisabi.com/experience/amani-spa",
    sourceUrl: "https://www.sabisabi.com/experience/amani-spa",
    locationAccuracy: "approximate",
    wellnessProfile: {
      displayName: "Amani Spa & Wellness",
      providerType: "Safari lodge spa",
      summary:
        "Sabi Sabi's spa experience pairs restorative treatments with the setting of its private game reserve.",
      website: "https://www.sabisabi.com/experience/amani-spa",
      treatmentSections: [
        {
          title: "Holistic treatments",
          items: ["Rejuvenating massages", "Soothing rituals", "Indigenous healing treatments"],
          note: "Spa treatments complement a safari experience in the reserve.",
        },
      ],
    },
    seoTitle: "Amani Spa & Wellness at Sabi Sabi | Discover",
    seoDescription:
      "Discover Amani Spa & Wellness at Sabi Sabi in Mpumalanga, with indigenous healing treatments, massages and restorative spa rituals in a safari setting.",
    seeded: true,
    sourceType: "seeded_public_data",
    claimed: false,
    verified: false,
    featured: false,
    status: "published",
  },
];

export const categoryListings: Record<CategorySlug, CategoryListing[]> = {
  stay: [],
  eat: [],
  "beauty-wellness-fitness": wellnessListings,
  events: [
    {
      id: "umbali",
      slug: "umbali",
      listingKind: "business",
      featuredOrder: 1,
      type: "Wedding & Events Venue",
      subcategory: "Wedding & Events Venue",
      eventBusinessTypes: ["Wedding venue", "Event venue", "Conference venue"],
      name: "Umbali",
      location: "Mbombela",
      address: "Cromdale Road, Mbombela, 1200",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Set on a bushveld hillside overlooking Mbombela, Umbali hosts weddings, conferences and functions. Its reception venue accommodates 450+ guests, with a separate conference facility for 500+ delegates.",
      image:
        "https://www.umbali.co.za/wp-content/uploads/elementor/thumbs/130928544_1567564683436672_2985487094220209599_n-phg83rr78h5dc9z99ho7h538jljcnjjv43i2g0unj4.jpg",
      imageAlt: "Wedding reception tables at Umbali overlooking the Lowveld hills",
      images: [
        "https://www.umbali.co.za/wp-content/uploads/elementor/thumbs/18198660_629922387200911_7146792381489541966_n-phg83rr7yseen0qa4j3udhfqlxb8i242vmab72o9xq.jpg",
        "https://www.umbali.co.za/wp-content/uploads/2021/11/HomePage-Hero-img_1-1.jpg",
        "https://www.umbali.co.za/wp-content/uploads/2021/11/troue_627.png",
      ],
      imageAlts: [
        "Outdoor ceremony seating and tent at Umbali",
        "Bride at the Umbali wedding venue",
        "Wedding ceremony at Umbali",
      ],
      imageSourceUrls: [
        "https://www.umbali.co.za/wp-content/uploads/elementor/thumbs/130928544_1567564683436672_2985487094220209599_n-phg83rr78h5dc9z99ho7h538jljcnjjv43i2g0unj4.jpg",
        "https://www.umbali.co.za/wp-content/uploads/elementor/thumbs/18198660_629922387200911_7146792381489541966_n-phg83rr7yseen0qa4j3udhfqlxb8i242vmab72o9xq.jpg",
        "https://www.umbali.co.za/wp-content/uploads/2021/11/HomePage-Hero-img_1-1.jpg",
        "https://www.umbali.co.za/wp-content/uploads/2021/11/troue_627.png",
      ],
      services: [
        "Weddings",
        "Receptions",
        "Conferences",
        "Corporate functions",
        "Catering",
        "Function rentals",
        "Tent hire",
      ],
      phone: "+27 72 838 5985",
      email: "Melandri@umbaliprestige.co.za",
      website: "https://www.umbali.co.za/",
      bookingUrl: "https://www.umbali.co.za/contact-us/",
      source: "Umbali",
      sourceUrl: "https://www.umbali.co.za/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
      eventProfile: {
        displayType: "Weddings, conferences & functions",
        serviceSections: [
          {
            title: "Weddings & receptions",
            description:
              "A bushveld setting, dedicated reception venue and on-site chapel provide spaces for wedding ceremonies and receptions.",
          },
          {
            title: "Conferences & corporate functions",
            description: "Modern conference facilities accommodate groups of 500+ delegates.",
          },
          {
            title: "Catering, rentals & tent hire",
            description: "Catering, function rentals and tent hire are available for events.",
          },
        ],
        venueSpaces: [
          {
            name: "Wedding and reception venue",
            description:
              "An upmarket reception space with views across Mbombela and the Kaapschehoop Escarpment.",
          },
          {
            name: "The Chapel",
            description: "An on-site chapel provides a dedicated ceremony space.",
          },
          {
            name: "Conference facilities",
            description:
              "Modern conference facilities for business meetings and larger corporate gatherings.",
          },
        ],
        facts: [
          {
            label: "Reception capacity",
            value: "450+ guests",
          },
          {
            label: "Conference capacity",
            value: "500+ delegates",
          },
        ],
        enquiryNote:
          "Contact the venue about dates, event layouts, catering, rentals and included services.",
        officialLinks: [
          { label: "Wedding venues", href: "https://www.umbali.co.za/our-wedding-venues/" },
          {
            label: "Conference facilities",
            href: "https://www.umbali.co.za/conference-facilities/",
          },
          { label: "Catering and rentals", href: "https://www.umbali.co.za/rentals/" },
          { label: "Contact Umbali", href: "https://www.umbali.co.za/contact-us/" },
        ],
      },
    },
    {
      id: "mabalel-lodge",
      slug: "mabalel-lodge",
      listingKind: "business",
      featuredOrder: 2,
      type: "Wedding & Events Lodge",
      subcategory: "Wedding & Events Venue",
      eventBusinessTypes: ["Wedding venue", "Event venue", "Lodge & accommodation"],
      name: "Mabalel Lodge",
      location: "Mbombela",
      address: "Farm 134, Uitkyk Road, Karino, Mpumalanga, South Africa",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Mabalel Lodge pairs an open-air wedding setting with on-site accommodation in Karino, near Mbombela. The lodge also hosts private celebrations and corporate functions, with dining through its spit-braai facilities or restaurant and bar.",
      image: "https://www.mabalel.co.za/wp-content/uploads/2025/10/IMG_3263-e1759469251284.jpeg",
      imageAlt: "Open-air wedding ceremony setting at Mabalel Lodge",
      images: [
        "https://www.mabalel.co.za/wp-content/uploads/2025/09/IMG-20240605-WA0032.webp",
        "https://www.mabalel.co.za/wp-content/uploads/2025/10/IMG_3262.jpeg",
        "https://www.mabalel.co.za/wp-content/uploads/2025/10/IMG_3264.jpeg",
      ],
      imageAlts: [
        "Tented reception setup at Mabalel Lodge",
        "Outdoor ceremony area at Mabalel Lodge",
        "Wedding table styling at Mabalel Lodge",
      ],
      imageSourceUrls: [
        "https://www.mabalel.co.za/wp-content/uploads/2025/10/IMG_3263-e1759469251284.jpeg",
        "https://www.mabalel.co.za/wp-content/uploads/2025/09/IMG-20240605-WA0032.webp",
        "https://www.mabalel.co.za/wp-content/uploads/2025/10/IMG_3262.jpeg",
        "https://www.mabalel.co.za/wp-content/uploads/2025/10/IMG_3264.jpeg",
      ],
      services: [
        "Weddings",
        "Private functions",
        "Corporate events",
        "Spit-braai dining",
        "Restaurant and bar",
        "On-site accommodation",
      ],
      phone: "+27 79 510 2445",
      email: "info@mabalel.co.za",
      website: "https://www.mabalel.co.za/",
      bookingUrl: "https://www.mabalel.co.za/contact/",
      source: "Mabalel Lodge",
      sourceUrl: "https://www.mabalel.co.za/weddings/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
      eventProfile: {
        displayType: "Wedding venue, functions & lodge",
        serviceSections: [
          {
            title: "Open-air weddings",
            description: "An open-air ceremony venue set within the lodge's natural landscape.",
          },
          {
            title: "Private & corporate functions",
            description:
              "The lodge hosts workshops and training, product launches, team days, strategy meetings, year-end functions, birthdays, anniversaries and reunions.",
          },
        ],
        venueSpaces: [
          {
            name: "Open-air wedding setting",
            description: "An outdoor setting for ceremonies and wedding photography.",
          },
          {
            name: "Restaurant, bar & spit-braai facilities",
            description: "Dining options include spit-braai facilities, a restaurant and a bar.",
          },
        ],
        facts: [
          {
            label: "Address",
            value: "Farm 134, Uitkyk Road, Karino",
          },
        ],
        accommodation: "On-site accommodation is available at the lodge.",
        dining: "The lodge offers spit-braai dining, a restaurant and a bar.",
        officialLinks: [
          { label: "Weddings", href: "https://www.mabalel.co.za/weddings/" },
          { label: "Events", href: "https://www.mabalel.co.za/events/" },
          { label: "Contact Mabalel Lodge", href: "https://www.mabalel.co.za/contact/" },
        ],
      },
    },
    {
      id: "whispering-thorns",
      slug: "whispering-thorns",
      listingKind: "business",
      featuredOrder: 3,
      type: "Wedding Venue & Event Estate",
      subcategory: "Wedding Venue",
      eventBusinessTypes: ["Wedding venue", "Event venue", "Lodge & accommodation"],
      name: "Whispering Thorns",
      location: "White River",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Whispering Thorns is an exclusive-use wedding estate in White River, centred on a light-filled glass venue and chapel. The estate offers destination wedding coordination, private viewings and an on-site farmhouse with 11 suites for up to 22 guests. The chapel seats up to 200.",
      image: "https://whisperingthorns.com/wp-content/uploads/2026/07/13.jpg",
      imageAlt: "Wedding reception setting at Whispering Thorns",
      images: [
        "https://whisperingthorns.com/wp-content/uploads/2026/07/IMG_6118.jpeg",
        "https://whisperingthorns.com/wp-content/uploads/2026/07/2.jpg",
        "https://whisperingthorns.com/wp-content/uploads/2026/07/10.jpg",
      ],
      imageAlts: [
        "Wedding couple outside the glass venue at Whispering Thorns",
        "Glass wedding venue at Whispering Thorns",
        "Reception details at Whispering Thorns",
      ],
      imageSourceUrls: [
        "https://whisperingthorns.com/wp-content/uploads/2026/07/13.jpg",
        "https://whisperingthorns.com/wp-content/uploads/2026/07/IMG_6118.jpeg",
        "https://whisperingthorns.com/wp-content/uploads/2026/07/2.jpg",
        "https://whisperingthorns.com/wp-content/uploads/2026/07/10.jpg",
      ],
      services: [
        "Destination weddings",
        "Exclusive-use estate",
        "All-inclusive wedding planning",
        "Corporate events",
        "Private viewings",
        "On-site accommodation",
      ],
      phone: "+27 83 276 1206",
      whatsapp: "+27 83 276 1206",
      email: "info@whisperingthorns.com",
      website: "https://whisperingthorns.com/",
      bookingUrl: "https://whisperingthorns.com/contact/",
      source: "Whispering Thorns",
      sourceUrl: "https://whisperingthorns.com/venue/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
      eventProfile: {
        displayType: "Exclusive-use glass wedding venue",
        serviceSections: [
          {
            title: "All-inclusive destination weddings",
            description:
              "An in-house planning team and coordinator manage wedding details through one coordinated process.",
          },
          {
            title: "Ceremonies & celebrations",
            description:
              "The glass chapel is a ceremony space, while the wider estate hosts wedding celebrations. Enquiries are also welcome for receptions, engagements, corporate functions and other events.",
          },
          {
            title: "Private viewings & packages",
            description: "The venue offers private viewings and wedding packages.",
          },
        ],
        venueSpaces: [
          {
            name: "Glass chapel",
            description:
              "A glass-walled ceremony space with views of the surrounding acacia trees and landscape.",
          },
          {
            name: "Glass wedding venue",
            description:
              "An exclusive-use, all-inclusive venue for destination weddings in the Lowveld.",
          },
        ],
        facts: [
          {
            label: "Chapel seating",
            value: "Up to 200 guests",
          },
          {
            label: "On-site farmhouse",
            value: "11 suites · up to 22 guests",
          },
        ],
        accommodation:
          "The on-site farmhouse has 11 individually styled suites and sleeps up to 22 guests. The venue also lists self-catering apartments near White River separately as off-site accommodation.",
        enquiryNote: "Enquire about private viewings and wedding packages.",
        officialLinks: [
          { label: "Weddings & packages", href: "https://whisperingthorns.com/weddings/" },
          { label: "The venue", href: "https://whisperingthorns.com/venue/" },
          { label: "Gallery", href: "https://whisperingthorns.com/gallery/" },
          { label: "Accommodation", href: "https://whisperingthorns.com/accommodation/" },
          { label: "Book a private viewing", href: "https://whisperingthorns.com/contact/" },
        ],
      },
    },
    {
      id: "trudaisy-celebrations",
      slug: "trudaisy-celebrations",
      listingKind: "business",
      featuredOrder: 4,
      type: "Wedding & Event Planner",
      subcategory: "Event Planner",
      eventBusinessTypes: [
        "Event planner",
        "Wedding planner",
        "Event styling",
        "Destination wedding planner",
      ],
      name: "Trudaisy Celebrations",
      location: "Mbombela",
      address: "37 Msila Street, Kamagugu, Mbombela, Mpumalanga 1201",
      province: "Mpumalanga",
      postalCode: "1201",
      country: "South Africa",
      description:
        "Trudaisy Celebrations plans and styles weddings, private celebrations and corporate events in Mbombela and surrounding areas, from full-service coordination to on-the-day support.",
      image: "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/28.png",
      imageAlt: "Elegant event table setting by Trudaisy Celebrations",
      images: [
        "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/27.png",
        "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/35.png",
        "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/34.png",
      ],
      imageAlts: [
        "White celebration table styled by Trudaisy Celebrations",
        "Black and gold milestone celebration styled by Trudaisy Celebrations",
        "Formal event table styling by Trudaisy Celebrations",
      ],
      imageSourceUrls: [
        "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/28.png",
        "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/27.png",
        "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/35.png",
        "https://www.trudaisycelebrations.co.za/wp-content/uploads/2026/04/34.png",
      ],
      services: [
        "Full-service wedding planning",
        "Event design and styling",
        "On-the-day coordination",
        "Private celebrations",
        "Corporate events",
        "Destination wedding planning",
      ],
      phone: "+27 72 216 1143",
      whatsapp: "+27 72 216 1143",
      email: "info@trudaisycelebrations.co.za",
      website: "https://www.trudaisycelebrations.co.za/",
      bookingUrl: "https://www.trudaisycelebrations.co.za/contact/",
      source: "Trudaisy Celebrations",
      sourceUrl: "https://www.trudaisycelebrations.co.za/services/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
      eventProfile: {
        displayType: "Wedding & event planner",
        serviceSections: [
          {
            title: "Wedding planning & coordination",
            description:
              "Services include full-service wedding planning and on-the-day coordination, from organising the event to supporting its delivery.",
          },
          {
            title: "Event design & styling",
            description:
              "Trudaisy develops an event concept with design, timeline and vendor recommendations, then styles the celebration around the client's brief.",
          },
          {
            title: "Celebrations & corporate events",
            description:
              "Planning and styling for private celebrations, corporate events and destination weddings.",
          },
        ],
        facts: [
          {
            label: "Service area",
            value: "Mbombela and surrounding areas",
          },
          {
            label: "Office",
            value: "37 Msila Street, Kamagugu",
          },
        ],
        enquiryNote: "Request a quote by phone, WhatsApp or email.",
        officialLinks: [
          { label: "Services", href: "https://www.trudaisycelebrations.co.za/services/" },
          { label: "Portfolio", href: "https://www.trudaisycelebrations.co.za/portfolio/" },
          { label: "Request a quote", href: "https://www.trudaisycelebrations.co.za/contact/" },
        ],
      },
    },
    {
      id: "arch-and-arrow",
      slug: "arch-and-arrow",
      listingKind: "business",
      featuredOrder: 5,
      type: "Wedding Venue & Event Spaces",
      subcategory: "Wedding Venue",
      eventBusinessTypes: ["Wedding venue", "Event venue"],
      name: "Arch & Arrow",
      location: "White River",
      address: "34 Yaverland Road, White River",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Arch & Arrow is a wedding venue on Braemar Farm in White River, with three spaces: The Big Hall, The Chapel and The Boma. The Big Hall opens onto a deck overlooking Braemar Dam, while the chapel and boma offer alternative settings.",
      image: "https://archandarrow.co.za/wp-content/uploads/2025/04/2O1A0658-scaled.jpg",
      imageAlt: "Bride at an outdoor wedding setting at Arch & Arrow",
      images: [
        "https://archandarrow.co.za/wp-content/uploads/2025/04/Arch-Arrow-Styled-Shoot-116-scaled.jpg",
        "https://archandarrow.co.za/wp-content/uploads/2025/04/Arch-Arrow-Styled-Shoot-39-scaled.jpg",
        "https://archandarrow.co.za/wp-content/uploads/2025/04/Arch-Arrow-Styled-Shoot-31-scaled.jpg",
      ],
      imageAlts: [
        "Wedding ceremony styling at Arch & Arrow",
        "Wedding reception styling at Arch & Arrow",
        "Wedding venue details at Arch & Arrow",
      ],
      imageSourceUrls: [
        "https://archandarrow.co.za/wp-content/uploads/2025/04/2O1A0658-scaled.jpg",
        "https://archandarrow.co.za/wp-content/uploads/2025/04/Arch-Arrow-Styled-Shoot-116-scaled.jpg",
        "https://archandarrow.co.za/wp-content/uploads/2025/04/Arch-Arrow-Styled-Shoot-39-scaled.jpg",
        "https://archandarrow.co.za/wp-content/uploads/2025/04/Arch-Arrow-Styled-Shoot-31-scaled.jpg",
      ],
      services: [
        "Weddings",
        "The Big Hall",
        "Chapel ceremonies",
        "The Boma",
        "Wedding packages",
        "Venue viewings",
      ],
      phone: "+27 79 305 1248",
      email: "info@archandarrow.co.za",
      website: "https://archandarrow.co.za/",
      bookingUrl: "https://archandarrow.co.za/contact-us/",
      source: "Arch & Arrow",
      sourceUrl: "https://archandarrow.co.za/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
      eventProfile: {
        displayType: "Wedding venue with three event spaces",
        serviceSections: [
          {
            title: "The Big Hall",
            description:
              "A reception space with floor-to-ceiling windows opening onto a deck overlooking Braemar Dam, with layouts for grand and intimate gatherings.",
          },
          {
            title: "The Chapel & The Boma",
            description: "A dedicated chapel and separate boma complement The Big Hall.",
          },
          {
            title: "Wedding packages & viewings",
            description: "Wedding packages and venue viewings are available through Arch & Arrow.",
          },
        ],
        venueSpaces: [
          {
            name: "The Big Hall",
            description: "A flexible reception hall with a deck and views across Braemar Dam.",
          },
          {
            name: "The Chapel",
            description: "A dedicated ceremony space on the Braemar Farm venue.",
          },
          {
            name: "The Boma",
            description: "An additional outdoor space listed as part of the venue.",
          },
        ],
        facts: [
          {
            label: "Address",
            value: "34 Yaverland Road, White River",
          },
        ],
        enquiryNote: "Enquire about venue viewings and wedding packages.",
        officialLinks: [
          { label: "The Big Hall", href: "https://archandarrow.co.za/the-big-hall/" },
          { label: "The Chapel", href: "https://archandarrow.co.za/the-chapel/" },
          { label: "The Boma", href: "https://archandarrow.co.za/the-boma/" },
          { label: "Wedding packages", href: "https://archandarrow.co.za/wedding-packages" },
          { label: "Gallery", href: "https://archandarrow.co.za/gallery/" },
        ],
      },
    },
    {
      id: "olivers-lodge",
      slug: "olivers-lodge",
      listingKind: "business",
      featuredOrder: 6,
      type: "Wedding Venue & Lodge",
      subcategory: "Wedding Venue",
      eventBusinessTypes: ["Wedding venue", "Event venue", "Lodge & accommodation"],
      name: "Oliver's Lodge & Restaurant",
      location: "White River",
      address: "White River Country Estate, White River, Mpumalanga",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Oliver's combines a garden and gazebo ceremony setting with an in-house wedding coordinator, chef-prepared menus and 14 on-site rooms. Its restaurant area seats up to 120 guests and can be configured for smaller groups; that figure applies to the restaurant area, not the full venue's wedding capacity.",
      image: "https://olivers.co.za/wp-content/uploads/2023/05/Wedding-in-Whiteriver.jpg",
      imageAlt: "Wedding celebration in the gardens at Oliver's Lodge",
      images: [
        "https://olivers.co.za/wp-content/uploads/2023/05/Wedding-middle-restaurant.jpg",
        "https://olivers.co.za/wp-content/uploads/2023/05/Olivers-Veranda-7.jpg",
        "https://olivers.co.za/wp-content/uploads/2023/05/Olivers-Restaurant-Garden-Veranda-3.jpg",
      ],
      imageAlts: [
        "Wedding reception at Oliver's restaurant",
        "Veranda at Oliver's Lodge",
        "Garden and veranda at Oliver's Lodge",
      ],
      imageSourceUrls: [
        "https://olivers.co.za/wp-content/uploads/2023/05/Wedding-in-Whiteriver.jpg",
        "https://olivers.co.za/wp-content/uploads/2023/05/Wedding-middle-restaurant.jpg",
        "https://olivers.co.za/wp-content/uploads/2023/05/Olivers-Veranda-7.jpg",
        "https://olivers.co.za/wp-content/uploads/2023/05/Olivers-Restaurant-Garden-Veranda-3.jpg",
      ],
      services: [
        "Weddings",
        "Garden ceremonies",
        "In-house wedding coordinator",
        "Restaurant dining",
        "On-site accommodation",
        "Custom wedding packages",
      ],
      phone: "+27 13 750 0479",
      email: "info@olivers.co.za",
      website: "https://olivers.co.za/",
      bookingUrl: "https://olivers.co.za/contact/",
      source: "Oliver's Lodge & Restaurant",
      sourceUrl: "https://olivers.co.za/weddings/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
      eventProfile: {
        displayType: "Wedding venue, lodge & restaurant",
        serviceSections: [
          {
            title: "Garden ceremonies & receptions",
            description:
              "Gardens, a gazebo, a water feature and views over the golf course and farmland set the scene for ceremonies and receptions. The restaurant, lounge, bar and verandas provide additional gathering spaces.",
          },
          {
            title: "Food & wedding coordination",
            description:
              "Chef-prepared food, an in-house coordinator and wedding packages tailored to the event.",
          },
        ],
        venueSpaces: [
          {
            name: "Gardens & gazebo",
            description: "Outdoor ceremony areas with garden and golf-course views.",
          },
          {
            name: "Restaurant, verandas, lounge & bar",
            description:
              "The restaurant area seats up to 120 and can be arranged for smaller gatherings; ask about event-specific layouts.",
          },
        ],
        facts: [
          {
            label: "On-site rooms",
            value: "14 rooms",
          },
          {
            label: "Restaurant seating",
            value: "Up to 120 guests",
          },
        ],
        accommodation: "Fourteen rooms are available on-site.",
        dining:
          "The hotel serves chef-prepared food and offers customizable wedding packages. Restaurant seating is separate from the venue's other event spaces.",
        enquiryNote: "Enquire about wedding packages, restaurant layouts and room options.",
        officialLinks: [
          { label: "Weddings", href: "https://olivers.co.za/weddings/" },
          { label: "Functions", href: "https://olivers.co.za/functions/" },
          { label: "Accommodation", href: "https://olivers.co.za/accommodation/" },
          { label: "Gallery", href: "https://olivers.co.za/gallery/" },
        ],
      },
    },
  ],
  agriculture: [],
  security: [
    {
      id: "divergent-ops",
      slug: "divergent-ops",
      listingKind: "business",
      featuredOrder: 1,
      type: "Security Company",
      subcategory: "Security Company",
      serviceType: "Security and guarding",
      name: "Divergent Ops",
      location: "Mbombela",
      address: "Unit D, Murrayfield Place, 30 Waterfall Ave, Riverside Industrial",
      addressLabel: "Office",
      province: "Mpumalanga",
      postalCode: "1200",
      country: "South Africa",
      description:
        "Headquartered in Mbombela, Divergent Ops serves Nelspruit, White River and Barberton. Services include armed response, professional guarding, event security, specialist security, and CCTV and AI camera monitoring, sales, installation and maintenance.",
      seoTitle: "Divergent Ops | Security Services in Mbombela | Discover",
      seoDescription:
        "Guarding, armed response, event security and CCTV services in Mbombela, White River and Barberton from Divergent Ops.",
      image:
        "https://static.wixstatic.com/media/e453ee_ebc0c448735a4f15b904a5e6c4d3480f~mv2.png/v1/fill/w_594,h_521,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e453ee_ebc0c448735a4f15b904a5e6c4d3480f~mv2.png",
      imageAlt: "Divergent Ops security services image",
      imageSourceUrls: ["https://www.divergent-ops.co.za/services"],
      services: [
        "Armed response",
        "Professional guarding",
        "Specialist security",
        "Event security",
        "CCTV and AI camera monitoring",
        "Camera sales, installation and maintenance",
      ],
      specialties: ["Business security", "Event security", "Property security"],
      serviceAreas: ["Nelspruit", "White River", "Barberton"],
      logo: "https://static.wixstatic.com/media/e453ee_1f6c7368bfe94805a9d4f1dfb263a3cf~mv2.png/v1/fill/w_450,h_80,al_c,q_85,enc_avif,quality_auto/e453ee_1f6c7368bfe94805a9d4f1dfb263a3cf~mv2.png",
      phone: "0861 911 677",
      email: "admin@divergent-ops.co.za",
      website: "https://www.divergent-ops.co.za/",
      source: "Divergent Ops",
      sourceUrl: "https://www.divergent-ops.co.za/services",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
    },
    {
      id: "acs-security",
      slug: "acs-security",
      listingKind: "business",
      featuredOrder: 2,
      type: "Security Company",
      subcategory: "Security Company",
      serviceType: "Guarding and security technology",
      name: "ACS Security",
      location: "Nelspruit",
      address:
        "Ground Level, Niël Le Roux Building, 8 Bester Street North, Canary Walk Business Park",
      addressLabel: "Office",
      province: "Mpumalanga",
      postalCode: "1200",
      country: "South Africa",
      description:
        "ACS Security provides access control, roaming guards, armed response, alarm monitoring, retail and car-park guarding, and CCTV and alarm systems in Nelspruit.",
      seoTitle: "ACS Security | Guarding & CCTV in Nelspruit | Discover",
      seoDescription:
        "Contact ACS Security in Nelspruit about access control, roaming guards, armed response, alarm monitoring, retail guarding and CCTV.",
      image: "https://www.acssecurity.co.za/wp-content/uploads/2019/08/cctvkits.png",
      imageAlt: "CCTV security equipment offered by ACS Security",
      imageSourceUrls: [
        "https://www.acssecurity.co.za/",
        "https://www.acssecurity.co.za/contact-us/",
      ],
      services: [
        "Access control",
        "Roaming guards",
        "Armed response",
        "Alarm monitoring",
        "Retail guarding",
        "Car-park guarding",
        "CCTV and security technology",
        "Alarm systems",
        "K9 services",
      ],
      specialties: ["Retail security", "Car-park security"],
      serviceAreas: ["Nelspruit"],
      logo: "https://www.acssecurity.co.za/wp-content/uploads/2019/08/logo-350x350-ws-1.png",
      phone: "+27 13 752 4792",
      email: "info@acssecurity.co.za",
      website: "https://www.acssecurity.co.za/",
      source: "ACS Security",
      sourceUrl: "https://www.acssecurity.co.za/contact-us/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
    },
    {
      id: "ribos-national-security-force",
      slug: "ribos-national-security-force",
      listingKind: "business",
      featuredOrder: 3,
      type: "Security Company",
      subcategory: "Security Company",
      serviceType: "Security and guarding",
      name: "Ribos National Security Force",
      description:
        "Ribos National Security Force provides guarding and patrols for commercial, industrial and residential properties, alongside secure transport, personal protection, security consultation, response services and event security in Mbombela.",
      seoTitle: "Ribos National Security Force | Security in Mbombela | Discover",
      seoDescription:
        "Explore guarding, secure transport, personal protection, security consulting and event security from Ribos National Security Force in Mbombela.",
      image:
        "https://static.zarlacdn.com/website/ctjqd84gjf4ftdtwrft3/image/719043ac54034574abae25545889fbbb20b424d57eb6d76ed7d7091f8e54b35d/desktop-920@2x",
      imageAlt: "Ribos National Security Force security vehicle",
      images: [
        "https://static.zarlacdn.com/website/ctjqd84gjf4ftdtwrft3/image/20b31c804ff74d471e845a10ec03e34ab11d5cf762ab477c93b8263b8c8d1fe7/desktop-920@2x",
        "https://static.zarlacdn.com/image/07244af69d4ce28c67083132e06436a7f6f4c5846a5577e3bea3809881cd2d6d/desktop-920@2x",
        "https://static.zarlacdn.com/image/8afd72035c85124928e3fa49bed10a2188a278692758e7c4657e2130b0c25771/desktop-920@2x",
      ],
      imageAlts: [
        "Ribos National Security Force safety and security imagery",
        "Ribos National Security Force response services imagery",
        "Ribos National Security Force event-security imagery",
      ],
      imageSourceUrls: ["https://www.ribos.co.za/"],
      services: [
        "Guarding and patrolling",
        "Secure transport",
        "Personal protection",
        "Security consultation",
        "Response services",
        "Event security",
        "Risk assessment",
      ],
      specialties: [
        "Residential security",
        "Commercial security",
        "Industrial security",
        "Event security",
      ],
      serviceAreas: ["Mbombela"],
      logo: "https://static.zarlacdn.com/website/ctjqd84gjf4ftdtwrft3/image/6fcfcb871b96ceec62c43b4d2901e072c5385d6a7afc7d4f4adcc4ca50810d12/logo-132@2x",
      phone: "073 190 4000",
      website: "https://www.ribos.co.za/",
      source: "Ribos National Security Force",
      sourceUrl: "https://www.ribos.co.za/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
    },
    {
      id: "thorburn-security-solutions",
      slug: "thorburn-security-solutions",
      listingKind: "business",
      featuredOrder: 4,
      type: "Security Company",
      subcategory: "Security Company",
      serviceType: "Physical security and guarding",
      name: "Thorburn Security Solutions",
      location: "Midrand",
      address: "4 Challenger Avenue, International Business Gateway, New Road, Midrand",
      addressLabel: "Regional contact office",
      province: "Gauteng",
      country: "South Africa",
      description:
        "Thorburn Security Solutions is part of the Tsebo Solutions Group and provides integrated security services for businesses. Its capabilities include physical guarding, off-site monitoring, consulting, integrated technology, specialist security services and data analytics.",
      seoTitle: "Thorburn Security Solutions | Serving Mpumalanga | Discover",
      seoDescription:
        "Explore Thorburn Security Solutions' physical guarding, off-site monitoring, consulting, integrated technology and specialist security services in Mpumalanga.",
      image: "https://www.thorburn.co.za/wp-content/uploads/1-Physical-and-guarding.webp",
      imageAlt: "Physical security and guarding services from Thorburn",
      images: [
        "https://www.thorburn.co.za/wp-content/uploads/2-Advanced-off-site.webp",
        "https://www.thorburn.co.za/wp-content/uploads/4-integrated-technnology.webp",
        "https://www.thorburn.co.za/wp-content/uploads/5-Property-and-facilities.webp",
      ],
      imageAlts: [
        "Off-site security monitoring from Thorburn",
        "Integrated security technology from Thorburn",
        "Property and facilities security from Thorburn",
      ],
      imageSourceUrls: ["https://www.thorburn.co.za/", "https://www.thorburn.co.za/contact-us/"],
      services: [
        "Physical security and guarding",
        "Off-site monitoring",
        "Consulting and advisory",
        "Integrated technology",
        "Specialised security services",
        "Data analytics and insights",
      ],
      specialties: ["Physical and guarding", "Off-site monitoring", "Integrated technology"],
      serviceAreas: ["Mpumalanga"],
      logo: "https://www.thorburn.co.za/wp-content/uploads/Thorburn-logoAsset-1.svg",
      phone: "+27 12 803 5982",
      email: "info@thorburn.co.za",
      website: "https://www.thorburn.co.za/",
      source: "Thorburn Security Solutions",
      sourceUrl: "https://www.thorburn.co.za/contact-us/",
      sourceType: "seeded_public_data",
      seeded: true,
      status: "published",
    },
  ],
  "education-training": [
    {
      id: "university-of-mpumalanga",
      slug: "university-of-mpumalanga",
      listingKind: "business",
      type: "University",
      subcategory: "University",
      educationType: "University",
      educationLevels: ["Undergraduate", "Postgraduate"],
      name: "University of Mpumalanga",
      seoTitle: "University of Mpumalanga | Discover by Lowveld Hub",
      seoDescription:
        "Explore University of Mpumalanga programme options and 2027 application information.",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "The University of Mpumalanga is a public university focused on knowledge creation and dissemination in an African context. Prospective students can explore its programme catalogue for qualification details, entry requirements and campus availability.",
      image:
        "https://www.sowetan.co.za/resizer/v2/47HTF3TX6BNBXJIKBXRBOJRROA.png?smart=true&auth=580cfa1b7b745ded0e1c646feb4f0dae18c8ef3fe57dffc0d0d2565c48a8a90d&width=1200&height=630",
      imageAlt: "University of Mpumalanga anniversary feature image",
      imageSourceUrls: [
        "https://www.sowetan.co.za/news/south-africa/2024-03-14-native-university-of-mpumalanga-celebrates-10-years-of-academic-achievements/",
      ],
      website: "https://www.ump.ac.za/",
      source: "https://www.ump.ac.za/",
      sourceUrl: "https://www.ump.ac.za/",
      services: ["Undergraduate study", "Postgraduate study"],
      educationProfile: {
        campusName: "Mbombela",
        educationLevels: ["Undergraduate", "Postgraduate"],
        programmeGroups: [
          {
            title: "Programme catalogue",
            description:
              "Browse undergraduate and postgraduate programmes, qualification requirements and campus information.",
            href: "https://www.ump.ac.za/Study-with-us/",
          },
        ],
        admissions: {
          summary:
            "UMP's online process asks applicants to create a portal profile, enter personal and school-leaving details, upload supporting documents and select up to two academic programme choices. Residence applications are submitted separately in the portal.",
          applicationUrl: "https://ienabler.ump.ac.za/pls/prodi41/w03pkg.call_dyn_val",
          currentDates: [
            "2027 applications opened 1 June 2026.",
            "Undergraduate programmes and advanced diplomas close 30 November 2026.",
            "Honours, postgraduate diplomas, master's and doctoral applications close 30 January 2027.",
          ],
          requirements: [
            "Certified identity and school-leaving documents, plus other programme-specific supporting documents.",
            "Review the application page for current document and fee requirements.",
          ],
        },
        officialLinks: [
          { label: "2027 applications and process", href: "https://www.ump.ac.za/apply/" },
          {
            label: "Online application portal",
            href: "https://ienabler.ump.ac.za/pls/prodi41/w03pkg.call_dyn_val",
          },
        ],
        sourceNotes: [
          {
            label: "University of Mpumalanga",
            href: "https://www.ump.ac.za/",
          },
          { label: "Applications and application steps", href: "https://www.ump.ac.za/apply/" },
        ],
      },
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      status: "published",
    },
    {
      id: "tshwane-university-of-technology-mbombela",
      slug: "tshwane-university-of-technology-mbombela",
      listingKind: "business",
      type: "University",
      subcategory: "University",
      educationType: "University",
      educationLevels: ["Undergraduate", "Postgraduate"],
      name: "Tshwane University of Technology — Mbombela Campus",
      seoTitle: "TUT Mbombela Campus | Discover by Lowveld Hub",
      seoDescription:
        "Explore Tshwane University of Technology's Mbombela Campus, study options and admissions resources.",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Tshwane University of Technology is a university of technology with a campus in Mbombela, offering undergraduate and postgraduate study.",
      logo: "https://veldfiremedia.com/wp-content/uploads/2022/12/TUT-logo-1200x620-1.png",
      logoAlt: "Tshwane University of Technology logo",
      imageSourceUrls: [
        "https://veldfiremedia.com/wp-content/uploads/2022/12/TUT-logo-1200x620-1.png",
      ],
      website: "https://www.tut.ac.za/",
      source: "https://www.tut.ac.za/study-at-tut/",
      sourceUrl: "https://www.tut.ac.za/study-at-tut/",
      services: ["Undergraduate study", "Postgraduate study"],
      educationProfile: {
        campusName: "Mbombela Campus",
        educationLevels: ["Undergraduate", "Postgraduate"],
        programmeGroups: [
          {
            title: "Study options",
            description:
              "TUT offers more than 300 programme options across seven faculties. Browse its study catalogue for programme and campus details.",
            href: "https://www.tut.ac.za/study-at-tut/",
          },
        ],
        admissions: {
          summary:
            "TUT provides an online application portal, application guidance and programme closing dates.",
          applicationUrl: "https://applications-prod.tut.ac.za/",
        },
        officialLinks: [
          { label: "Study at TUT", href: "https://www.tut.ac.za/study-at-tut/" },
          {
            label: "Application steps and closing dates",
            href: "https://www.tut.ac.za/programme-closing-dates/undergraduate-first-time-applicant/",
          },
          { label: "Apply online", href: "https://applications-prod.tut.ac.za/" },
        ],
        sourceNotes: [
          {
            label: "TUT undergraduate study and campuses",
            href: "https://www.tut.ac.za/study-at-tut/undergraduate/",
          },
          { label: "TUT study options", href: "https://www.tut.ac.za/study-at-tut/" },
        ],
      },
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      status: "published",
    },
    {
      id: "ehlanzeni-tvet-college-nelspruit",
      slug: "ehlanzeni-tvet-college-nelspruit",
      listingKind: "business",
      type: "TVET College",
      subcategory: "TVET College",
      educationType: "TVET College",
      educationLevels: ["Technical and vocational education"],
      name: "Ehlanzeni TVET College — Nelspruit Campus",
      seoTitle: "Ehlanzeni TVET College, Nelspruit Campus | Discover",
      seoDescription:
        "Explore Ehlanzeni TVET College's Nelspruit Campus and its technical and vocational education programmes.",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Ehlanzeni TVET College serves the Ehlanzeni District through seven campuses, including Nelspruit Campus in the Mbombela Local Municipality.",
      image:
        "https://www.ehlanzenicollege.co.za/_next/image?url=https%3A%2F%2Fdecisive-serenity-7fc9a48de1.media.strapiapp.com%2Fwelcome_3ed2ac41c2.jpg&w=640&q=75",
      imageAlt: "Welcome image for Ehlanzeni TVET College",
      imageSourceUrls: [
        "https://www.ehlanzenicollege.co.za/_next/image?url=https%3A%2F%2Fdecisive-serenity-7fc9a48de1.media.strapiapp.com%2Fwelcome_3ed2ac41c2.jpg&w=640&q=75",
      ],
      website: "https://www.ehlanzenicollege.co.za/",
      source: "https://www.ehlanzenicollege.co.za/",
      sourceUrl: "https://www.ehlanzenicollege.co.za/",
      services: ["Technical and vocational education"],
      educationProfile: {
        campusName: "Nelspruit Campus",
        educationLevels: ["Technical and vocational education"],
        admissions: {
          summary:
            "The College provides technical and vocational education across its campus network.",
          applicationUrl: "https://www.ehlanzenicollege.co.za/",
        },
        officialLinks: [
          {
            label: "College website and current notices",
            href: "https://www.ehlanzenicollege.co.za/",
          },
        ],
        sourceNotes: [
          {
            label: "Ehlanzeni TVET College campuses",
            href: "https://www.ehlanzenicollege.co.za/",
          },
        ],
      },
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      status: "published",
    },
    {
      id: "penryn-school",
      slug: "penryn-school",
      listingKind: "business",
      type: "Private School",
      subcategory: "Private School",
      educationType: "Private School",
      educationLevels: ["Preschool", "Preparatory school", "High school"],
      name: "Penryn School",
      seoTitle: "Penryn School | Education in Mpumalanga | Discover",
      seoDescription: "Explore Penryn School's preschool, preparatory and college phases.",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Penryn School offers preschool, preparatory school and college phases, with age-appropriate learning and a focus on belonging and preparing scholars to participate in a changing world.",
      image: "https://www.penryn.co.za/wp-content/uploads/2024/11/collegebtm-1.webp",
      imageAlt: "Penryn College campus",
      logo: "https://www.penryn.co.za/wp-content/uploads/2025/01/Penryn-Emblem.svg",
      imageSourceUrls: ["https://www.penryn.co.za/wp-content/uploads/2024/11/collegebtm-1.webp"],
      website: "https://www.penryn.co.za/",
      source: "https://www.penryn.co.za/",
      sourceUrl: "https://www.penryn.co.za/",
      services: ["Preschool", "Preparatory school", "College"],
      educationProfile: {
        campusName: "Penryn School",
        educationLevels: ["Preschool", "Preparatory school", "College"],
        programmeGroups: [
          {
            title: "School phases",
            description: "Penryn School offers preschool, preparatory school and college phases.",
            programmes: ["Preschool", "Preparatory school", "College"],
            href: "https://www.penryn.co.za/",
          },
        ],
        studentExperience: [
          "Sport is part of school life, with activities and coaching across different skill levels.",
          "The Preparatory programme combines academics, sport and co-curricular activities each week.",
        ],
        officialLinks: [
          { label: "About Penryn", href: "https://www.penryn.co.za/about/" },
          { label: "Preparatory school", href: "https://www.penryn.co.za/preparatory/" },
          { label: "College", href: "https://www.penryn.co.za/college/" },
          { label: "Preschool", href: "https://www.penryn.co.za/preschool/" },
        ],
        sourceNotes: [
          { label: "About Penryn", href: "https://www.penryn.co.za/about/" },
          { label: "Penryn Preparatory", href: "https://www.penryn.co.za/preparatory/" },
          { label: "Penryn College", href: "https://www.penryn.co.za/college/" },
          { label: "Penryn Preschool", href: "https://www.penryn.co.za/preschool/" },
        ],
      },
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      status: "published",
    },
    {
      id: "curro-nelspruit",
      slug: "curro-nelspruit",
      listingKind: "business",
      type: "Private School",
      subcategory: "Private School",
      educationType: "Private School",
      educationLevels: ["Grades 8–12"],
      subjects: ["Robotics", "Siswati", "Business and entrepreneurship"],
      name: "Curro Nelspruit High School",
      seoTitle: "Curro Nelspruit High School | Discover by Lowveld Hub",
      seoDescription:
        "Explore Curro Nelspruit High School's Grades 8–12 and IEB pathway in Sonheuwel.",
      location: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Curro Nelspruit High School is in Sonheuwel, within The Rest Nature Estate, and offers high school education from Grade 8 to Grade 12. The school teaches in English and Afrikaans and prepares learners for IEB examinations, with subjects including Robotics and Siswati.",
      image:
        "https://www.curro.co.za/media/urrfjvj5/curro-nelspruit-high-school-in-sonheuwel-ieb-school-curro-school-curro-fees-schools-in-nelspruit-ieb-school-private-schools-in-nelspruit-curro-near-me-08.jpg?rmode=max&width=807&height=442",
      imageAlt: "Curro Nelspruit High School in Sonheuwel",
      imageSourceUrls: ["https://www.curro.co.za/schools/curro-nelspruit-high-school/"],
      website: "https://www.curro.co.za/schools/curro-nelspruit-high-school/",
      source: "https://www.curro.co.za/schools/curro-nelspruit-high-school/",
      sourceUrl: "https://www.curro.co.za/schools/curro-nelspruit-high-school/",
      services: ["High school", "Grades 8–12", "IEB"],
      educationProfile: {
        campusName: "Sonheuwel, The Rest Nature Estate",
        educationLevels: ["Grades 8–12"],
        programmeGroups: [
          {
            title: "High school",
            description:
              "The school offers Grade 8 to Grade 12 education, teaches in English and Afrikaans, and prepares learners for IEB examinations.",
            programmes: ["Robotics", "Siswati", "Business and entrepreneurship"],
            href: "https://www.curro.co.za/schools/curro-nelspruit-high-school/",
          },
        ],
        studentExperience: [
          "Class sizes are limited to no more than 25 learners.",
          "School activities include sports and cultural programmes such as soccer and cheerleading.",
          "Support programmes include a full-time school counsellor, subject-choice assessments and academic support.",
        ],
        officialLinks: [
          {
            label: "Curro Nelspruit High School",
            href: "https://www.curro.co.za/schools/curro-nelspruit-high-school/",
          },
          {
            label: "School fact sheet and downloads",
            href: "https://www.curro.co.za/schools/curro-nelspruit-high-school/downloads/",
          },
        ],
        sourceNotes: [
          {
            label: "Curro Nelspruit High School",
            href: "https://www.curro.co.za/schools/curro-nelspruit-high-school/",
          },
        ],
      },
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      status: "published",
    },
    {
      id: "unigrad-college",
      slug: "unigrad-college",
      listingKind: "business",
      type: "Private College",
      subcategory: "Private College",
      educationType: "Private College",
      educationLevels: ["Full-time study", "Part-time study", "Corporate training"],
      name: "Unigrad College",
      seoTitle: "Unigrad College | Discover by Lowveld Hub",
      seoDescription:
        "Explore Unigrad College's career-focused learning, career guidance and official registration information.",
      country: "South Africa",
      description:
        "Unigrad College offers career-focused, practical learning with industry exposure, field trips and career guidance. An adviser interview forms part of the application and registration process.",
      image:
        "https://www.unigradcollege.co.za/wp-content/uploads/2026/01/about-image-copy-final.webp",
      imageAlt: "Unigrad College",
      imageSourceUrls: [
        "https://www.unigradcollege.co.za/wp-content/uploads/2026/01/about-image-copy-final.webp",
      ],
      website: "https://www.unigradcollege.co.za/",
      source: "https://www.unigradcollege.co.za/why-unigrad/",
      sourceUrl: "https://www.unigradcollege.co.za/why-unigrad/",
      services: ["Full-time courses", "Part-time courses", "Corporate training", "Career guidance"],
      subjects: ["Marketing and sales management", "Workplace skills", "Career guidance"],
      educationProfile: {
        educationLevels: ["Full-time study", "Part-time study", "Corporate training"],
        programmeGroups: [
          {
            title: "Study formats",
            description:
              "Full-time courses run for one or two years, alongside part-time study and corporate training.",
            programmes: ["Full-time courses", "Part-time courses", "Corporate training"],
          },
          {
            title: "Marketing and sales management",
            description: "A short-learning programme in marketing and sales management.",
            href: "https://www.unigradcollege.co.za/part-time-course/short-learning-in-marketing-and-sales-management-programmes/",
          },
        ],
        admissions: {
          summary:
            "Applicants can meet with a career and study adviser to discuss course choices and registration.",
          applicationUrl: "https://www.unigradcollege.co.za/registration/",
        },
        studentExperience: [
          "Some courses include practicals, field trips and industry visits.",
          "Career guidance includes a career profile assessment.",
        ],
        officialLinks: [
          { label: "Why Unigrad", href: "https://www.unigradcollege.co.za/why-unigrad/" },
          { label: "Registration", href: "https://www.unigradcollege.co.za/registration/" },
          {
            label: "Marketing and sales management",
            href: "https://www.unigradcollege.co.za/part-time-course/short-learning-in-marketing-and-sales-management-programmes/",
          },
        ],
        sourceNotes: [
          { label: "Why Unigrad", href: "https://www.unigradcollege.co.za/why-unigrad/" },
          { label: "Registration", href: "https://www.unigradcollege.co.za/registration/" },
          { label: "Unigrad College", href: "https://www.unigradcollege.co.za/" },
        ],
      },
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      status: "published",
    },
  ],
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIE5iYWcS05hnjqyNzarxFreBYgJAvc-E4na3DDV7K6OhqrxemJnXWbEJ&s=10",
      imageAlt: "Ampath Laboratories",
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
  "travel-transport": [
    {
      id: "citybug-durban",
      slug: "citybug-durban",
      listingKind: "business",
      type: "Shuttle Service",
      subcategory: "Shuttle Services",
      name: "Citybug Nelspruit",
      location: "Nelspruit, Mpumalanga",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Citybug provides daily shuttle bus services between Durban and Nelspruit, with more than 10 destinations en route and scheduled airport connections to OR Tambo International Airport.",
      image:
        "https://images.caxton.co.za/wp-content/uploads/sites/44/2018/06/31634200_1726025474156729_4390059246322974720_n.jpg",
      imageAlt:
        "Citybug Nelspruit shuttle service connecting Nelspruit and OR Tambo airport routes",
      website: "https://citybug.co.za/",
      phone: "087 537 1444",
      source: "https://citybug.co.za/citybug-durban/",
      sourceUrl: "https://citybug.co.za/citybug-durban/",
      services: [
        "Daily Durban to Nelspruit shuttle services",
        "Airport transfer connections to OR Tambo",
        "Scheduled intercity route travel",
        "Regional shuttle stops and transfers",
      ],
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "limetime-shuttle",
      slug: "limetime-shuttle",
      listingKind: "business",
      type: "Shuttle Service",
      subcategory: "Shuttle Services",
      name: "LimeTime Shuttle",
      location: "Mbombela / Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "LimeTime Shuttle operates scheduled passenger transport between Mpumalanga and Gauteng, with airport transfer services, university transfers, parcel services and regional routes including Nelspruit, Bloemfontein, Klerksdorp, Potchefstroom and OR Tambo.",
      image: "https://www.limetimeshuttle.co.za/wp-content/uploads/2024/02/new-bus-2.png",
      imageAlt: "LimeTime shuttle bus in service across Mpumalanga and Gauteng routes",
      website: "https://www.limetimeshuttle.co.za/",
      phone: "087 094 9444",
      whatsapp: "+27 82 770 4654",
      source: "https://www.limetimeshuttle.co.za/",
      sourceUrl: "https://www.limetimeshuttle.co.za/",
      services: [
        "Daily shuttle services",
        "Airport and airport transfer routes",
        "Private transfer bookings",
        "University and commuter transfers",
        "Event transport and parcel delivery",
      ],
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "kruger-transfers",
      slug: "kruger-transfers",
      listingKind: "business",
      type: "Transfer Service",
      subcategory: "Airport & Lodge Transfers",
      name: "Kruger Transfers",
      location: "Nelspruit, Mpumalanga",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Kruger Transfers is based around 10 minutes from Kruger Mpumalanga International Airport in Nelspruit and focuses on transport for airport, lodge and Kruger-region travel.",
      image:
        "https://z-p3-scontent.fjnb12-1.fna.fbcdn.net/v/t39.30808-1/241454650_315404847044293_6448819179122271178_n.jpg?stp=dst-jpg_tt6&cstp=mx1000x667&ctp=s960x960&_nc_cat=108&_nc_sid=3ab345&_nc_ohc=nNlZXHyoGm8Q7kNvwFlJya_&_nc_oc=AdrCWVEqWUsQ54ypMhGzSe6nlOs1N-G6pNrjW17hWCndkGkWFCtrDwuHmgZ5i2SNY8s&_nc_zt=24&_nc_ht=z-p3-scontent.fjnb12-1.fna&_nc_gid=5EAaibDFEvk3dFFGqfV5Fw&_nc_ss=7c20f&oh=00_AQMswGfdppasr4KSipVFdjflffBXA71rfNAyfmOrchiJKw&oe=6AD24FBA",
      imageAlt: "Kruger Transfers passenger shuttle",
      website: "https://www.facebook.com/krugertransfers/",
      source: "https://www.facebook.com/krugertransfers/",
      sourceUrl: "https://www.facebook.com/krugertransfers/",
      services: [
        "Airport transfers",
        "Lodge and accommodation transfers",
        "Kruger-region transport",
        "Safari-area transfer connections",
      ],
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "jsl-transport",
      slug: "jsl-transport",
      listingKind: "business",
      type: "Shuttle & Tours",
      subcategory: "Shuttle Services",
      name: "JSL Transport",
      location: "Marloth Park / Mpumalanga",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "JSL Transport and Tours provides shuttle, transfer and guided tour services across South Africa and neighbouring countries, with airport transfers from OR Tambo and Kruger Mpumalanga International Airport to accommodation in Marloth Park, Komatipoort, Malelane and Nelspruit.",
      image: "https://jsltransport.co.za/images/our-fleet.jpg",
      imageAlt: "JSL Transport vehicle fleet and shuttle services in Mpumalanga",
      website: "https://jsltransport.co.za/",
      phone: "+27 76 849 0965",
      whatsapp: "+27 76 849 0965",
      source: "https://jsltransport.co.za/",
      sourceUrl: "https://jsltransport.co.za/",
      services: [
        "Airport transfers from OR Tambo and KMIA",
        "Day tours and safari transport",
        "Private and group shuttle services",
        "Kruger-area transfer connections",
      ],
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
    {
      id: "myboets-transport",
      slug: "myboets-transport",
      listingKind: "business",
      type: "Public Bus Transport",
      subcategory: "Passenger Transport",
      name: "Myboets Transport",
      location: "Hazyview, Mpumalanga",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Myboets Transport is a public transport provider serving Mpumalanga communities with safe, reliable and efficient passenger transport focused on accessibility, sustainability and convenient regional connectivity.",
      image: "https://www.myboetstransport.co.za/img/gallery/Gallery-3.JPG",
      imageAlt: "Myboets Transport passenger bus and community service image",
      website: "https://www.myboetstransport.co.za/",
      phone: "013 798 5012",
      whatsapp: "+27 79 340 7442",
      email: "info@myboetstransport.co.za",
      source: "https://www.myboetstransport.co.za/",
      sourceUrl: "https://www.myboetstransport.co.za/",
      services: [
        "Public bus transport",
        "Passenger mobility and commuter routes",
        "Regional community transport",
        "Scheduled transport for local passengers",
      ],
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: true,
      status: "published",
    },
  ],
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
      id: "leopard-hills-private-game-reserve",
      slug: "leopard-hills-private-game-reserve",
      listingKind: "accommodation",
      name: "Leopard Hills Private Game Reserve",
      type: "Private Game Lodge",
      accommodationType: "Lodge",
      location: "Sabi Sand",
      area: "Sabi Sand Nature Reserve",
      province: "Mpumalanga",
      country: "South Africa",
      addressLabel: "Sabi Sand Nature Reserve",
      latitude: -24.983333,
      longitude: 31.55,
      description:
        "Set on a hill overlooking the Sabi Sand, Leopard Hills brings together eight glass-fronted, air-conditioned suites, each with a private plunge pool and sundeck looking out over the African bushveld. Wildlife experiences in the reserve shape the days, while dinner can be enjoyed beneath the stars in the traditional boma, in the dining room or on the upper deck.",
      roomCount: 8,
      roomTypes: ["Glass-fronted luxury suites"],
      amenities: [
        "Eight glass-fronted suites",
        "Air conditioning",
        "Private plunge pool with each suite",
        "Private sundeck",
        "Views over the African bushveld",
        "Spa treatment sala",
        "Gym",
      ],
      facilities: [
        "Glass-fronted spa treatment sala",
        "Spa treatments",
        "Gym",
        "Traditional boma dining",
        "Dining room",
        "Upper deck",
      ],
      services: [
        "Game viewing in the Sabi Sand Nature Reserve",
        "Honeymoon safaris",
        "Photographic safaris",
        "Facial treatments",
        "African Rungu massage",
        "Hot stone therapy",
        "Deep tissue massage",
        "Manicure and pedicure",
        "Indian head massage",
        "Anti-stress back treatment",
      ],
      phone: "+27 13 735 5000",
      email: "book@leopardhills.com",
      website: "https://www.leopardhills.com/",
      bookingUrl: "https://direct-book.com/properties/leopardhillsdirect",
      enquiryUrl: "https://www.leopardhills.com/enquiry/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Leopard+Hills+Private+Game+Reserve%2C+Sabi+Sand%2C+Mpumalanga",
      socialLinks: [
        { label: "Facebook", href: "https://www.facebook.com/LeopardHills/" },
        { label: "Instagram", href: "https://www.instagram.com/leopardhills/" },
      ],
      logo: "https://www.leopardhills.com/wp-content/uploads/2024/10/LH-Logo-General-White.png",
      logoAlt: "Leopard Hills logo",
      image:
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-14-1350x900.jpg",
      imageAlt: "Suite at Leopard Hills Private Game Reserve",
      images: [
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-14-1350x900.jpg",
        "https://www.leopardhills.com/wp-content/uploads/2024/07/Cal-Butler-safari-leopard-01-800x800.jpg",
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-02-1350x900.jpg",
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-07-1350x900.jpg",
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-09-1350x900.jpg",
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-23-1350x900.jpg",
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-24-1350x900.jpg",
        "https://www.leopardhills.com/wp-content/uploads/2024/06/leopard-hills-mvr-2024-accommodation-suite-27-1350x900.jpg",
      ],
      imageAlts: [
        "Suite at Leopard Hills Private Game Reserve",
        "Leopard photographed on safari",
        "Suite at Leopard Hills Private Game Reserve",
        "Suite at Leopard Hills Private Game Reserve",
        "Suite at Leopard Hills Private Game Reserve",
        "Suite at Leopard Hills Private Game Reserve",
        "Suite at Leopard Hills Private Game Reserve",
        "Suite at Leopard Hills Private Game Reserve",
      ],
      seoTitle: "Leopard Hills Private Game Reserve | Sabi Sand | Discover",
      seoDescription:
        "Discover Leopard Hills in the Sabi Sand Nature Reserve. Explore eight glass-fronted suites, private plunge pools, safari experiences, spa treatments and direct booking options.",
      source: "https://www.leopardhills.com/",
      sourceUrl: "https://www.leopardhills.com/",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      seeded: true,
      sourceType: "seeded_public_data",
      status: "published",
    },
    {
      id: "singita-boulders-lodge",
      slug: "singita-boulders-lodge",
      listingKind: "accommodation",
      directoryOrder: 1,
      name: "Singita Boulders Lodge",
      type: "Safari Lodge",
      accommodationType: "Lodge",
      location: "Sabi Sand",
      area: "Sabi Sand",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Set along the boulder-strewn banks of the Sand River in Singita’s privately owned Sabi Sand reserve, Boulders Lodge draws on the textures and tones of its wilderness setting. Its glass-walled suites open onto private decks and plunge pools, while the lodge offers guided safari experiences, dining and wellness facilities.",
      roomCount: 12,
      roomTypes: ["River Suites", "Bush Suites", "Family Suites"],
      accommodationProfile: {
        rooms: [
          {
            name: "River Suite",
            image:
              "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%2818%29-1024x678.jpg",
            imageAlt: "Suite at Singita Boulders Lodge",
            description:
              "One of seven river-facing suites, with a private sitting room, game-viewing deck and plunge pool.",
            amenities: [
              "En-suite bedroom",
              "Private sitting room",
              "Private deck",
              "Private plunge pool",
            ],
          },
          {
            name: "Bush Suite",
            image:
              "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%2819%29-1024x678.jpg",
            imageAlt: "Bush suite at Singita Boulders Lodge",
            description:
              "Three suites set in the lodge’s natural surroundings; two overlook a frequently visited watering hole.",
            amenities: [
              "En-suite bedroom",
              "Private sitting room",
              "Private deck",
              "Private plunge pool",
            ],
          },
          {
            name: "Family Suite",
            image:
              "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%2811%29-1024x678.jpg",
            imageAlt: "Family suite at Singita Boulders Lodge",
            description:
              "Two-bedroom suites with an en-suite main bedroom and a separate en-suite twin bedroom.",
            amenities: [
              "En-suite main bedroom",
              "En-suite twin bedroom",
              "Private deck",
              "Private plunge pool",
            ],
          },
        ],
        nearbyDescription:
          "The lodge is set beside the Sand River in the Sabi Sand, a wildlife sanctuary known for its diverse wildlife and birdlife. Guided game drives and walks are offered in the surrounding reserve.",
      },
      amenities: [
        "Private deck and plunge pool with each suite",
        "Main lodge swimming pool",
        "Wellness and fitness centre",
        "Complimentary Wi-Fi",
        "Singita Boutique & Gallery",
        "Premier Wine Boutique",
      ],
      facilities: [
        "Outdoor dining and lounge area",
        "Stone fireplace",
        "Main lodge swimming pool",
        "Wellness and fitness centre",
        "Singita Boutique & Gallery",
        "Premier Wine Boutique",
      ],
      services: [
        "Guided game drives",
        "Guided safari walks",
        "Wine experience",
        "Bird watching",
        "Wellness",
        "Stargazing",
      ],
      phone: "+27 13 735 9800",
      email: "enquiries@singita.com",
      website: "https://singita.com/lodge/singita-boulders-lodge/",
      enquiryUrl: "https://singita.com/contact/",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Singita+Boulders+Lodge%2C+Sabi+Sand%2C+Mpumalanga%2C+South+Africa",
      socialLinks: [
        { label: "Instagram", href: "https://www.instagram.com/singita_/?hl=en" },
        { label: "Facebook", href: "https://www.facebook.com/singita.gamereserves/" },
      ],
      image:
        "https://singitacdn.s3.eu-west-1.amazonaws.com/library/wp-content/uploads/SSS_LODGE_Boulders_Lodge_Main_Deck_Ross_Couper_A1_01649-1024x682.jpg",
      imageAlt: "Main deck at Singita Boulders Lodge",
      images: [
        "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%2818%29-1024x678.jpg",
        "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%2819%29-1024x678.jpg",
        "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%289%29-1024x678.jpg",
        "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%2811%29-1024x678.jpg",
        "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/_DSC0409-1024x684.jpg",
        "https://s3-eu-west-1.amazonaws.com/singitacdn/library/wp-content/uploads/Singita%20Boulders%20Lodge%20%2812%29-1024x678.jpg",
        "https://singitacdn.s3.eu-west-1.amazonaws.com/library/wp-content/uploads/singita_0923_boulders_50_high-min-scaled-1024x683.jpg",
        "https://singitacdn.s3.eu-west-1.amazonaws.com/library/wp-content/uploads/SSS_LODGE_Boulders_Lodge_Bar_Ross_Couper_AR51873.jpg",
      ],
      imageAlts: [
        "Main deck at Singita Boulders Lodge",
        "Lodge suite at Singita Boulders Lodge",
        "Lodge suite at Singita Boulders Lodge",
        "Lodge interior at Singita Boulders Lodge",
        "Lodge suite at Singita Boulders Lodge",
        "Singita Boulders Lodge and its surroundings",
        "Lodge suite at Singita Boulders Lodge",
        "Singita Boulders Lodge and its surroundings",
        "Bar at Singita Boulders Lodge",
      ],
      seoTitle: "Singita Boulders Lodge | Sabi Sand Accommodation | Discover",
      seoDescription:
        "Explore Singita Boulders Lodge in the Sabi Sand, with river-facing and bush suites, private plunge pools, guided safari experiences and direct enquiry details.",
      source: "https://singita.com/lodge/singita-boulders-lodge/",
      sourceUrl:
        "https://singita.com/lodge/singita-boulders-lodge/information/?section=57yCMzNdCIs3baT4tv6y67",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      status: "published",
    },
    {
      id: "sabi-sabi-earth-lodge",
      slug: "sabi-sabi-earth-lodge",
      listingKind: "accommodation",
      directoryOrder: 2,
      name: "Sabi Sabi Earth Lodge",
      type: "Safari Lodge",
      accommodationType: "Lodge",
      location: "Sabi Sabi Private Game Reserve",
      area: "Sabi Sabi Private Game Reserve",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Earth Lodge is a one-of-a-kind safari lodge in the Sabi Sabi Private Game Reserve, shaped by organic design and dramatic minimalism. Its suites are set into the landscape, with indoor-outdoor living spaces and private pools; the lodge pairs this secluded setting with dining and safari experiences.",
      roomTypes: ["Luxury Suites", "Amber Villa"],
      accommodationProfile: {
        rooms: [
          {
            name: "Luxury Suite",
            image:
              "https://www.sabisabi.com/application/files/thumbnails/image_768x653/1516/5777/4503/earth-lodge-luxury-suite-bedroom.jpg?fID=2378&ftid=18&d=0",
            imageAlt: "Bedroom in a Sabi Sabi Earth Lodge Luxury Suite",
            description:
              "A private suite with bespoke furnishings, an indoor-outdoor lounge, a private pool and a marble en-suite bathroom.",
            amenities: [
              "King-size bed or twin beds",
              "Private deck with bushveld views",
              "Private plunge pool",
              "Bath and rain shower",
              "Outdoor shower",
              "Minibar and tea and coffee station",
              "Air conditioning",
              "Electronic safe",
            ],
          },
          {
            name: "Amber Villa",
            image:
              "https://www.sabisabi.com/application/files/thumbnails/image_1910x600/1616/8597/1908/Amber_Villa_Exterior_3.jpg?fID=32160&ftid=17&d=0",
            imageAlt: "Exterior of Amber Villa at Sabi Sabi Earth Lodge",
            description:
              "A private two-bedroom villa for up to four guests, with a personal game vehicle and guide, a spacious living area, terrace lounge and private plunge pool.",
            amenities: [
              "Two bedrooms for up to four guests",
              "Personal game vehicle and guide",
              "Private fitness area",
              "Terrace lounge and private deck",
              "Private plunge pool",
              "En-suite bathrooms",
              "Minibar and tea and coffee station",
              "Air conditioning",
            ],
            images: [
              {
                image:
                  "https://www.sabisabi.com/application/files/thumbnails/image_460x306/4416/8597/2067/Amber_Villa_Main_Bedroom_View.jpg?fID=32162&ftid=19&d=0",
                imageAlt: "Main bedroom view in the Amber Villa",
              },
              {
                image:
                  "https://www.sabisabi.com/application/files/thumbnails/image_768x653/5116/8597/2145/Amber_Villa_Main_Bathroom_5.jpg?fID=32164&ftid=18&d=0",
                imageAlt: "Main bathroom in the Amber Villa",
              },
              {
                image:
                  "https://www.sabisabi.com/application/files/thumbnails/image_1074x806/6616/8597/2646/Amber_Villa_Main_Bathroom_2.jpg?fID=32170&ftid=4&d=0",
                imageAlt: "Bathroom in the Amber Villa",
              },
              {
                image:
                  "https://www.sabisabi.com/application/files/thumbnails/image_1074x806/8116/8796/1153/Amber_Villa_Main_Bedroom_3.jpg?fID=32387&ftid=4&d=0",
                imageAlt: "Main bedroom in the Amber Villa",
              },
              {
                image:
                  "https://www.sabisabi.com/application/files/thumbnails/image_923x508/6516/8597/3352/Amber_Villa_Second_Bedroom_2.jpg?fID=32186&ftid=130&d=0",
                imageAlt: "Second bedroom in the Amber Villa",
              },
              {
                image:
                  "https://www.sabisabi.com/application/files/thumbnails/image_923x508/2816/8597/3403/Amber_Villa_Lounge_Area_4.jpg?fID=32188&ftid=130&d=0",
                imageAlt: "Lounge area in the Amber Villa",
              },
              {
                image:
                  "https://www.sabisabi.com/application/files/thumbnails/image_1074x806/7517/3452/3766/Amber_Villa_Main_Bedroom_2.jpg?fID=36278&ftid=4&d=0",
                imageAlt: "Main bedroom in the Amber Villa",
              },
            ],
          },
        ],
        nearbyDescription:
          "Earth Lodge is located in the Sabi Sabi Private Game Reserve. Safari activities are offered within the reserve; the lodge is part of the wider Sabi Sabi experience.",
      },
      amenities: [
        "Luxury suites with private plunge pools",
        "Indoor-outdoor lounge areas",
        "Earth Lodge dining experience",
        "Game drives and walking safaris",
      ],
      facilities: ["Dining experience", "Relaxation and wellness", "Luxury suites", "Amber Villa"],
      services: [
        "Game drives",
        "Walking safaris",
        "Tracker and ranger experiences",
        "Dining inspired by nature",
      ],
      phone: "+27 11 447 7172",
      email: "reservations@sabisabi.com",
      website: "https://www.sabisabi.com/lodges/earth-lodge",
      enquiryUrl: "https://www.sabisabi.com/rates/bookings",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Sabi+Sabi+Earth+Lodge%2C+Sabi+Sabi+Private+Game+Reserve%2C+Mpumalanga",
      image:
        "https://www.sabisabi.com/application/files/thumbnails/image_1910x600/6117/3452/3774/sabi-sabi-earth-lodge-entrance-view.jpg?fID=36284&ftid=17&d=0",
      imageAlt: "Entrance view of Sabi Sabi Earth Lodge",
      images: [
        "https://www.sabisabi.com/application/files/thumbnails/image_768x653/1516/5777/4503/earth-lodge-luxury-suite-bedroom.jpg?fID=2378&ftid=18&d=0",
        "https://www.sabisabi.com/application/files/thumbnails/image_768x653/1116/6849/6093/earth-lodge-luxury-suite-exterior.jpg?fID=29912&ftid=18&d=0",
        "https://www.sabisabi.com/application/files/thumbnails/image_1074x806/4516/5685/7076/oganic-design-earth-lodge.jpg?fID=1571&ftid=4&d=0",
        "https://www.sabisabi.com/application/files/thumbnails/image_1910x600/9517/3856/7509/earth-lodge-indoor-lounge.jpg?fID=36643&ftid=17&d=0",
        "https://www.sabisabi.com/application/files/thumbnails/image_768x653/2216/5685/6961/earth-lodge-luxury-suite-shower-bathroom.jpg?fID=1532&ftid=18&d=0",
        "https://www.sabisabi.com/application/files/thumbnails/image_460x306/5316/5685/6949/earth-lodge-luxury-suite-study.jpg?fID=1530&ftid=19&d=0",
        "https://www.sabisabi.com/application/files/thumbnails/image_1074x806/5216/5685/6977/privacy-luxury-bathroom-earth-lodge.jpg?fID=1537&ftid=4&d=0",
        "https://www.sabisabi.com/application/files/thumbnails/image_1074x806/1516/6851/0562/earth-lodge-luxury-suite-terrace-lounge.jpg?fID=29936&ftid=4&d=0",
      ],
      imageAlts: [
        "Entrance view of Sabi Sabi Earth Lodge",
        "Bedroom in a Sabi Sabi Earth Lodge Luxury Suite",
        "Exterior of a Sabi Sabi Earth Lodge Luxury Suite",
        "Organic design at Sabi Sabi Earth Lodge",
        "Indoor lounge at Sabi Sabi Earth Lodge",
        "Bathroom in a Sabi Sabi Earth Lodge Luxury Suite",
        "Study in a Sabi Sabi Earth Lodge Luxury Suite",
        "Luxury bathroom at Sabi Sabi Earth Lodge",
        "Terrace lounge at Sabi Sabi Earth Lodge",
      ],
      seoTitle: "Sabi Sabi Earth Lodge | Sabi Sabi Reserve | Discover",
      seoDescription:
        "Discover Sabi Sabi Earth Lodge in Mpumalanga, with organic architecture, private-pool suites, the Amber Villa, dining and safari experiences.",
      source: "https://www.sabisabi.com/lodges/earth-lodge",
      sourceUrl: "https://www.sabisabi.com/lodges/earth-lodge/luxury-suite",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      featured: false,
      seeded: true,
      sourceType: "seeded_public_data",
      status: "published",
    },
    {
      id: "abangane-guest-lodge",
      slug: "abangane-guest-lodge",
      listingKind: "accommodation",
      name: "Abangane Guest Lodge",
      type: "Guest Lodge",
      accommodationType: "Guest Lodge",
      location: "Hazyview",
      area: "Hazyview",
      province: "Mpumalanga",
      country: "South Africa",
      description:
        "Set on a 22-hectare portion of the original Farm de Rust along Sabie Road in Hazyview, Abangane is a private guest lodge surrounded by bushveld and landscaped gardens. Its valley-facing infinity pool and relaxed outdoor spaces offer a peaceful base for a Lowveld stay.",
      address: "Farm de Rust, Sabie Road",
      accommodationProfile: {
        rooms: [
          {
            name: "Luxury Room",
            image: "https://abangane.com/assets/images/rooms/lux.jpg",
            imageAlt: "Luxury guest room with a king bed, canopy net and sitting area",
            description:
              "An air-conditioned king room with an en-suite glass shower, a separate lounge corner and its own veranda.",
            amenities: [
              "King-size bed",
              "Air conditioning",
              "Block-out curtains",
              "Mosquito net",
              "En-suite glass shower",
              "Coffee and tea facilities",
              "Fridge",
              "Separate lounge corner",
              "Dressing table",
              "Ceiling fan",
              "Electronic safe",
              "Flat-screen DStv",
              "Veranda",
            ],
          },
          {
            name: "Honeymoon Room",
            image: "https://abangane.com/assets/images/rooms/Honeymoon-1.jpg",
            imageAlt: "Honeymoon room with a king bed and an adjoining seating area",
            description:
              "A spacious king room with an en-suite bathroom featuring a separate corner jet spa, two basins and a separate toilet.",
            amenities: [
              "King-size bed",
              "Air conditioning",
              "Block-out curtains",
              "Mosquito net",
              "En-suite glass shower",
              "Separate corner jet spa",
              "Two basins",
              "Separate toilet",
              "Flat-screen DStv",
              "Coffee and tea facilities",
              "Fridge",
              "Lounge corner",
              "Dressing table",
              "Ceiling fan",
              "Electronic safe",
              "Veranda",
            ],
          },
          {
            name: "The Villa",
            image: "https://abangane.com/assets/images/villa7.jpg",
            imageAlt: "Canopy bed and sitting area in The Villa",
            description:
              "A private, self-contained section of the lodge for up to three guests, with separate sitting and dining spaces and garden views.",
            amenities: [
              "Accommodates up to three guests",
              "Private, self-contained section",
              "Sitting and dining spaces",
              "Garden views",
              "Outdoor hot tub",
              "Air conditioning",
              "Ceiling fan",
              "Desk",
              "Dining table",
              "Fireplace",
              "Seating area",
              "Bath and shower combination",
              "Hairdryer",
              "Coffee and tea facilities",
              "Wi-Fi",
            ],
          },
        ],
        nearbyDescription:
          "Hazyview is a gateway to the Kruger National Park and the Panorama Route. These regional destinations and activities are outside the lodge; ask the property about planning your time in the area.",
      },
      amenities: [
        "Infinity swimming pool with valley views",
        "Landscaped gardens and outdoor relaxation spaces",
        "Free Wi-Fi",
      ],
      facilities: [
        "Lounge and breakfast room",
        "Dining room and veranda",
        "Continental and full English breakfast",
        "Fireplace and licensed bar",
        "Fine wine cellar",
      ],
      phone: "+27 64 530 2538",
      email: "info@abangane.com",
      website: "https://abangane.com/",
      bookingUrl: "http://abangane.com/bookings/availability",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Abangane+Guest+Lodge+Hazyview+Mpumalanga",
      socialLinks: [
        {
          label: "Facebook",
          href: "https://www.facebook.com/pages/Abangane-Guest-Lodge/115960867354",
        },
      ],
      logo: "http://abangane.com/assets/images/abangane-logo-transparent-horizontal.png",
      image: "https://abangane.com/assets/images/rooms/lux.jpg",
      imageAlt: "Luxury guest room with a king bed, canopy net and sitting area",
      images: [
        "https://abangane.com/assets/images/rooms/lux.jpg",
        "https://abangane.com/assets/components/phpthumbof/cache/patio1.caed0dac3e3ac0b2ce50a266e3300da8.jpg",
        "https://abangane.com/assets/components/phpthumbof/cache/view.606c4924825a0a8aa723f2cae32e0ccf.jpg",
        "https://abangane.com/assets/components/phpthumbof/cache/bathroom-r1.3b154ccff062ade606f31bbba9ce6d29.jpg",
        "https://abangane.com/assets/components/phpthumbof/cache/dsc5359-resize.3b154ccff062ade606f31bbba9ce6d29.jpg",
        "https://abangane.com/assets/images/rooms/Honeymoon-1.jpg",
        "https://abangane.com/assets/images/villa7.jpg",
        "https://abangane.com/assets/components/phpthumbof/cache/villa16.3b154ccff062ade606f31bbba9ce6d29.jpg",
        "https://abangane.com/assets/components/phpthumbof/cache/lounge-2.606c4924825a0a8aa723f2cae32e0ccf.jpg",
        "https://abangane.com/assets/components/phpthumbof/cache/img-20250730-wa0026.8c0f014c10d0bf7059884ea939033bae.jpg",
      ],
      imageAlts: [
        "Luxury guest room with a king bed, canopy net and sitting area",
        "Shaded outdoor patio with wicker seating at the lodge",
        "Outdoor terrace seating beneath trees overlooking green hills",
        "En-suite bathroom with a double vanity",
        "Dressing table and mirror in a guest room",
        "Honeymoon room with a king bed and an adjoining seating area",
        "Canopy bed and sitting area in The Villa",
        "Outdoor wicker seating beside a guest room",
        "Lodge lounge with comfortable seating and a fireplace",
        "Breakfast bowls with fruit, yoghurt and cereal",
      ],
      seoTitle: "Abangane Guest Lodge | Accommodation in Hazyview | Discover",
      seoDescription:
        "Discover Abangane Guest Lodge in Hazyview, Mpumalanga. Explore luxury rooms, the private villa, valley views, garden setting, facilities and direct booking options on Discover by Lowveld Hub.",
      source: "https://abangane.com/",
      sourceUrl: "https://abangane.com/",
      locationAccuracy: "approximate",
      claimed: false,
      verified: false,
      seeded: true,
      sourceType: "seeded_public_data",
      status: "published",
    },
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
      featuredOrder: 2,
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
      additionalCategorySlugs: ["stay", "beauty-wellness-fitness"],
      source: "https://summerfields.co.za/",
      sourceUrl: "https://summerfields.co.za/retreat",
      wellnessProfile: {
        displayName: "Rose Spa at Summerfields",
        providerType: "Riverside retreat spa",
        summary:
          "An open-air spa by the Sabie River, a short walk from Summerfields' tented suites and River Café.",
        description:
          "Rose Spa at Summerfields offers a riverside spa experience on the Sabie River. Bookings are essential and can be made online; guests can contact the spa about available treatments.",
        seoTitle: "Rose Spa at Summerfields | Hazyview Spa | Discover",
        seoDescription:
          "Enjoy a riverside spa experience at Summerfields in Hazyview. Rose Spa is open daily, and bookings are essential.",
        website: "https://summerfields.co.za/rose-spa",
        bookingUrl:
          "https://online.salonbridge.co.za/includes/widget/bookNowiFrame.php?businessID=3712&businessUID=f478bb0d-17bc-11ec-8fa7-0a919287fb63",
        bookingLabel: "Book a spa treatment",
        logo: "https://summerfields.co.za/images/logo2.png",
        logoAlt: "Summerfields Rose Retreat & Spa logo",
        image:
          "https://summerfields.co.za/assets/components/phpthumbof/cache/image00005.69cecccc100f974c4c3582b32f024c6e.jpg",
        imageAlt: "Rose Spa treatment setting at Summerfields",
        images: [
          "https://summerfields.co.za/assets/components/phpthumbof/cache/image00004.69cecccc100f974c4c3582b32f024c6e.jpg",
          "https://summerfields.co.za/assets/components/phpthumbof/cache/image00006.69cecccc100f974c4c3582b32f024c6e.jpg",
          "https://summerfields.co.za/assets/components/phpthumbof/cache/jan09344.69cecccc100f974c4c3582b32f024c6e.jpg",
        ],
        imageAlts: [
          "Rose Spa treatment setting at Summerfields",
          "Rose Spa at Summerfields beside the Sabie River",
          "Spa experience at Summerfields Rose Spa",
          "Summerfields Rose Spa",
        ],
        imageSourceUrls: [
          "https://summerfields.co.za/assets/components/phpthumbof/cache/image00005.69cecccc100f974c4c3582b32f024c6e.jpg",
          "https://summerfields.co.za/assets/components/phpthumbof/cache/image00004.69cecccc100f974c4c3582b32f024c6e.jpg",
          "https://summerfields.co.za/assets/components/phpthumbof/cache/image00006.69cecccc100f974c4c3582b32f024c6e.jpg",
          "https://summerfields.co.za/assets/components/phpthumbof/cache/jan09344.69cecccc100f974c4c3582b32f024c6e.jpg",
        ],
        treatmentSections: [],
        facilities: ["Riverside spa setting"],
        visitNotes: [
          "Open daily. Bookings are essential.",
          "Set beside the river, a short walk from the tented suites and River Café.",
        ],
      },
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
      featuredOrder: 4,
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
      wellnessProfile: {
        displayName: "Walkersons Spa",
        providerType: "Country-estate spa",
        summary:
          "A garden spa on the Walkersons Estate, offering massages, skin-care rituals and facials in Dullstroom.",
        description:
          "Walkersons Spa is a garden spa on the hotel's Dullstroom estate, offering massages, skin-care rituals and facials. Sauna access is reserved for hotel guests and groups booking the Revive Package.",
        seoTitle: "Walkersons Spa | Dullstroom Spa Treatments | Discover",
        seoDescription:
          "Explore Walkersons Spa in Dullstroom for massages, skin-care rituals, facials and a garden-estate setting. Sauna access is for hotel guests and Revive Package groups.",
        website: "https://www.walkersons.co.za/spa/",
        email: "spa@walkersons.co.za",
        logo: "https://www.walkersons.co.za/wp-content/uploads/2024/06/thumbnail_Walkersons-logo-transparent-updated-1.png",
        logoAlt: "Walkersons Hotel logo",
        image:
          "https://www.walkersons.co.za/wp-content/uploads/2026/05/FOM-Shoot-Walkersons-Spa-2-667x1000.jpg",
        imageAlt: "Walkersons Spa treatment room in Dullstroom",
        images: [
          "https://www.walkersons.co.za/wp-content/uploads/2025/03/1.jpg",
          "https://www.walkersons.co.za/wp-content/uploads/2024/07/Babor-Spa-Products-1-667x1000.jpg",
          "https://www.walkersons.co.za/wp-content/uploads/2026/08/FOM-Shoot-Walkersons-Spa-3-1280x853.jpg",
          "https://www.walkersons.co.za/wp-content/uploads/2026/08/FOM-Shoot-Walkersons-Spa-4-667x1000.jpg",
        ],
        imageAlts: [
          "Walkersons Spa treatment room in Dullstroom",
          "Walkersons Spa",
          "BABOR products used at Walkersons Spa",
          "Treatment setting at Walkersons Spa",
          "Walkersons Spa experience",
        ],
        imageSourceUrls: [
          "https://www.walkersons.co.za/wp-content/uploads/2026/05/FOM-Shoot-Walkersons-Spa-2-667x1000.jpg",
          "https://www.walkersons.co.za/wp-content/uploads/2025/03/1.jpg",
          "https://www.walkersons.co.za/wp-content/uploads/2024/07/Babor-Spa-Products-1-667x1000.jpg",
          "https://www.walkersons.co.za/wp-content/uploads/2026/08/FOM-Shoot-Walkersons-Spa-3-1280x853.jpg",
          "https://www.walkersons.co.za/wp-content/uploads/2026/08/FOM-Shoot-Walkersons-Spa-4-667x1000.jpg",
        ],
        treatmentSections: [
          {
            title: "Spa treatments",
            items: ["Massages", "Skin-care rituals", "Facials"],
          },
          {
            title: "Spa facilities",
            items: ["On-site sauna"],
            note: "Sauna access is for hotel guests and groups booking the Revive Package.",
          },
        ],
        facilities: ["Garden spa", "On-site sauna"],
        facilitiesNote:
          "Sauna access is limited to hotel guests and groups booking the Revive Package.",
        visitNotes: ["Contact the spa to enquire about treatments and bookings."],
      },
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
      additionalCategorySlugs: ["stay", "beauty-wellness-fitness"],
      status: "published",
    },
    {
      id: "a-pilgrims-rest-guesthouse",
      slug: "a-pilgrims-rest-guesthouse",
      listingKind: "accommodation",
      directoryOrder: 999,
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
        "Established in Nelspruit (now Mbombela) in 1976, DU TOIT-SMUTS & PARTNERS ATTORNEYS serves private and public-sector clients, businesses and individuals across Mpumalanga. Its practice areas include conveyancing, commercial and company law, estates and trusts, family law, litigation and more.",
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
        "Kruger & Partners Inc. is a law firm in Mbombela (Nelspruit) focused on corporate and commercial law. It also handles litigation, wills and trusts, transnational insolvency, personal injury and collections.",
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
        "VZLR Attorneys serves clients and the wider community through a nationwide team. Its Nelspruit office is at The Pinnacle Building on Parkin Street, with practice areas across commercial, property, family, labour and other legal matters. The firm has served clients for 80 years.",
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
  automotive: [
    {
      id: "bmw-mbombela",
      slug: "bmw-mbombela",
      listingKind: "business",
      type: "Dealerships",
      name: "BMW Mbombela",
      subcategory: "BMW dealership",
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      serviceType: "New and approved-used BMW vehicles",
      services: [
        "New BMW vehicles",
        "BMW Approved Used vehicles",
        "Vehicle servicing",
        "Genuine BMW parts",
      ],
      description:
        "BMW Mbombela offers new and Approved Used BMW vehicles, vehicle servicing and genuine BMW parts.",
      image:
        "https://bmw.scene7.com/is/image/BMW/BEV_Range_mobile:3to1?fmt=webp-alpha&wid=1919&fit=constrain%2C1",
      imageAlt: "BMW electric vehicle model range",
      imageFit: "contain",
      logo: "https://www.bmwmpumalanga.co.za/wp-content/uploads/2025/11/cropped-Site-Icon.png",
      logoAlt: "BMW logo",
      website: "https://www.bmwmpumalanga.co.za/",
      source: "https://www.bmwmpumalanga.co.za/",
      sourceUrl: "https://www.bmwmpumalanga.co.za/",
      seoTitle: "BMW Mbombela | BMW Dealership in Mpumalanga | Discover",
      seoDescription:
        "Explore new and Approved Used BMW vehicles, servicing and genuine parts at BMW Mbombela.",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "audi-centre-mbombela",
      slug: "audi-centre-mbombela",
      listingKind: "business",
      type: "Dealerships",
      name: "Audi Centre Mbombela",
      subcategory: "Audi dealership",
      location: "Mbombela / Nelspruit",
      town: "Mbombela",
      address: "C/o Government Boulevard and Madiba Drive, Mbombela/Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      serviceType: "Audi vehicle sales and test-drive enquiries",
      services: ["Audi vehicle sales", "Test-drive enquiries"],
      description:
        "Audi Centre Mbombela is the Westvaal Audi dealership serving Mbombela/Nelspruit, with vehicle sales and test-drive enquiries.",
      image: "https://image.blob.ix.co.za/modelInfo/657/1/657-1-file-1-1920x933.png",
      imageAlt: "Audi vehicle model",
      imageFit: "contain",
      logo: "https://d2638j3z8ek976.cloudfront.net/6162db9520beba39059972d5701f03b46326924c/1788255413/images/edition/audi/franchise-badge.png",
      logoAlt: "Audi logo",
      phone: "+27137548800",
      website: "https://www.westvaal.co.za/audi/contact-us/audi-centre-mbombela/",
      source: "https://www.westvaal.co.za/audi/contact-us/audi-centre-mbombela/",
      sourceUrl: "https://www.westvaal.co.za/audi/contact-us/audi-centre-mbombela/",
      seoTitle: "Audi Centre Mbombela | Audi Dealership | Discover",
      seoDescription:
        "Find Audi Centre Mbombela at Government Boulevard and Madiba Drive in Mbombela/Nelspruit for Audi sales and test-drive enquiries.",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "webuycars-mbombela",
      slug: "webuycars-mbombela",
      listingKind: "business",
      type: "Dealerships",
      name: "WeBuyCars Mbombela",
      subcategory: "Used vehicle buying and selling",
      location: "Mbombela",
      town: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      serviceType: "Used vehicle buying and selling",
      services: [
        "Buy used cars, bakkies and motorcycles",
        "Sell used cars, bakkies and motorcycles",
      ],
      description:
        "WeBuyCars buys and sells pre-owned cars, bakkies and motorcycles, with Mbombela vehicles shown in its local inventory.",
      image:
        "https://images.openai.com/static-rsc-4/fvpvifBs1A878ejsdzYCTFDixeVK_RseUTlv9Ugon1e2Bbqm9Kl83mTXQugUcdweYW1WTsX4O4IR26mZL6rXQUeWJ-h5MtFV_znXKcOQ-WBKNeUfHfxqJyfVuuRwnzMtepsoxxirWghcGHOCqV50WmoIUuDZ_6i4iO0zzlsBf1Y?purpose=inline",
      imageAlt: "WeBuyCars showroom building",
      phone: "+27870570000",
      website: "https://www.webuycars.co.za/cars-for-sale/b/Mbombela%20(MP)",
      source: "https://www.webuycars.co.za/",
      sourceUrl: "https://www.webuycars.co.za/cars-for-sale/b/Mbombela%20(MP)",
      seoTitle: "WeBuyCars Mbombela | Buy or Sell Used Vehicles | Discover",
      seoDescription:
        "Explore WeBuyCars' Mbombela vehicle inventory and its used-car, bakkie and motorcycle buying and selling services.",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
    {
      id: "eastvaal-middelburg-gwm",
      slug: "eastvaal-middelburg-gwm",
      listingKind: "business",
      type: "Dealerships",
      name: "Eastvaal Middelburg GWM",
      subcategory: "Eastvaal Motors GWM dealership",
      location: "Middelburg",
      town: "Middelburg",
      province: "Mpumalanga",
      country: "South Africa",
      serviceType: "New, used and demo GWM vehicles",
      services: ["New GWM vehicles", "Used GWM vehicles", "Demo GWM vehicles"],
      description:
        "Eastvaal Middelburg GWM offers new, used and demo GWM vehicles from its dealership in Middelburg.",
      image:
        "https://www.eastvaal.co.za/wp-content/themes/generatepress_child_EastvaalGroup/assets/images/logos/Eastvaal-Motors-Logo.png",
      imageAlt: "Eastvaal Motors logo",
      imageFit: "contain",
      logo: "https://www.eastvaal.co.za/wp-content/themes/generatepress_child_EastvaalGroup/assets/images/logos/Eastvaal-Motors-Logo.png",
      logoAlt: "Eastvaal Motors logo",
      website: "https://www.eastvaal.co.za/dealership/eastvaal-middelburg-gwm/",
      source: "https://www.eastvaal.co.za/dealership/eastvaal-middelburg-gwm/",
      sourceUrl: "https://www.eastvaal.co.za/dealership/eastvaal-middelburg-gwm/",
      seoTitle: "Eastvaal Middelburg GWM | Eastvaal Motors | Discover",
      seoDescription:
        "Explore new, used and demo GWM vehicles at Eastvaal Middelburg GWM, an Eastvaal Motors dealership in Middelburg, Mpumalanga.",
      seeded: true,
      sourceType: "seeded_public_data",
      claimed: false,
      verified: false,
      featured: false,
      status: "published",
    },
  ],
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
          "The restaurant welcomes guests for romantic evenings, family celebrations and memorable occasions, serving lunch and dinner seven days a week.",
          "A built-in bar manned by a cocktail maker and a winter indoor fire help set the mood, while air-conditioning keeps the space comfortable in the Lowveld summer heat.",
        ],
        experienceHighlights: [
          {
            title: "Hilltop Lowveld setting",
            description:
              "Set on a hill above Mbombela, the restaurant offers elevated views across the surrounding area.",
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
              "A warm setting for romantic evenings, family celebrations and other memorable occasions.",
          },
        ],
        menuLinks: [
          {
            label: "View menu",
            description: "Browse the current menu.",
            href: "https://www.eatatorange.co.za/wp-content/uploads/2025/10/ORANGE-RESTAURANT-MENU-2025.pdf",
          },
          {
            label: "Book a table",
            description: "Reserve a table.",
            href: "https://eatatorange.co.za/booking/",
          },
        ],
        storyHeading: "Our story",
        experienceEyebrow: "Lowveld dining",
        experienceHeading: "A memorable hilltop setting",
        menuIntroduction:
          "Browse the menu and reserve a table for lunch, dinner or a special occasion.",
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
        "Salsa Mexican Grill brings vibrant Mexican dining to Ilanga Mall in Mbombela, with tacos, burritos, quesadillas, cocktails and a lively, family-friendly atmosphere.",
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
          "The fiesta-inspired menu features tacos, burritos and cocktails, with a lively setting for meals with family and friends.",
          "At Ilanga Mall, the restaurant positions itself as a place to celebrate, dine casually and enjoy a warm, energetic Mexican food experience in the Lowveld.",
        ],
        experienceHighlights: [
          {
            title: "Mexican favourites",
            description:
              "The menu features tacos, burritos, quesadillas, nachos and other signature Mexican dishes designed for sharing and celebration.",
          },
          {
            title: "Festive atmosphere",
            description:
              "Salsa’s brand language emphasises celebration, birthday specials and good times, making it a natural choice for casual dining, dates and family meals.",
          },
          {
            title: "Reservations and celebrations",
            description:
              "Guests can book a table for date nights, group dining and special occasions.",
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
            description: "Reserve a table for your visit.",
            href: "https://salsamexicangrill.co.za/make-a-reservation-2/",
          },
        ],
        storyHeading: "Our story",
        experienceEyebrow: "Lowveld dining",
        experienceHeading: "A lively Mexican fiesta",
        menuIntroduction:
          "Explore the menu and reserve a table for Mexican favourites, cocktails and group dining.",
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
              "Hearty breakfasts include Eggs Benedict, breakfast bagels and other brunch choices.",
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
            description: "Browse current lunch dishes.",
            href: "https://www.muggandbean.co.za/our-menu/sit-down-menu/#hearty-generous",
          },
          {
            label: "Freshly Baked",
            description: "Explore freshly baked treats.",
            href: "https://www.muggandbean.co.za/our-menu/sit-down-menu/#freshly-baked",
          },
        ],
        storyHeading: "Our Story",
        experienceEyebrow: "Coffee, breakfast & lunch",
        experienceHeading: "More & More at Crossing Centre",
        menuIntroduction:
          "Explore the sit-down menu for breakfast, lunch and freshly baked treats.",
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
    category === "beauty-wellness-fitness" &&
    listing.listingKind === "accommodation" &&
    listing.wellnessProfile
  ) {
    return `/accommodation/${slug}?view=wellness`;
  }
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
