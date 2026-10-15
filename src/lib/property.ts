import {
  getBusinessSlug,
  getPublishedPropertyListings,
  type PropertyListing,
} from "@/lib/category-discovery";
import { findDiscoveryLocation, mpumalangaLocations } from "@/lib/location-discovery";

export type PropertyListingIntent = "sale" | "rent" | "holiday" | "commercial";

export const propertyListingIntents: readonly {
  value: PropertyListingIntent;
  label: string;
  transactionType: NonNullable<PropertyListing["transactionType"]>;
}[] = [
  { value: "sale", label: "For sale", transactionType: "For Sale" },
  { value: "rent", label: "For rent", transactionType: "To Rent" },
  { value: "holiday", label: "Holiday", transactionType: "Holiday" },
  { value: "commercial", label: "Commercial", transactionType: "Commercial" },
];

export const propertyTypes = [
  "House",
  "Apartment",
  "Townhouse",
  "Farm",
  "Vacant Land",
  "Land",
  "Estate",
  "Residential",
  "Commercial",
  "Office",
  "Retail",
  "Industrial",
  "Hospitality",
  "Guest Property",
  "Holiday Property",
] as const;

export const propertyFeatures = [
  "Pool",
  "Garden",
  "Pet Friendly",
  "Furnished",
  "Security Estate",
  "Air Conditioning",
  "Generator",
  "Solar",
  "Borehole",
] as const;

const otherMpumalangaLocations = "Other Mpumalanga locations";
export const propertyLocations = [...mpumalangaLocations, otherMpumalangaLocations] as const;

export type PropertyProfessionalType = "agent" | "agency" | "developer" | "manager";

export type PropertyProfessional = {
  id: string;
  slug: string;
  name: string;
  profileType: PropertyProfessionalType;
  status: "published" | "unpublished";
  description?: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  images?: string[];
  imageAlts?: string[];
  coverImage?: string;
  coverImageAlt?: string;
  logo?: string;
  logoAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  location?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  services?: string[];
  sourceUrl: string;
  latitude?: number;
  longitude?: number;
  agentId?: string;
  agencyId?: string;
};

export type PropertySearchParams = {
  view?: "listings" | "professionals" | "saved";
  listingType?: PropertyListingIntent;
  q?: string;
  location?: string;
  serviceType?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  features?: string[];
};

export const propertyProfessionals: PropertyProfessional[] = [
  {
    id: "pam-golding-mbombela",
    slug: "pam-golding-mbombela",
    name: "Pam Golding Properties",
    profileType: "agency",
    status: "published",
    description:
      "Pam Golding Properties offers property sales services in Mbombela (Nelspruit) and the surrounding Lowveld.",
    logo: "https://www.pamgolding.co.za/img/general/pgp-logo-new.svg",
    logoAlt: "Pam Golding Properties logo",
    location: "Mbombela (Nelspruit)",
    website: "https://www.pamgolding.co.za/",
    services: ["Property sales"],
    sourceUrl: "https://www.pamgolding.co.za/",
    seoTitle: "Pam Golding Properties Mbombela | Discover",
    seoDescription:
      "Find Pam Golding Properties in Mbombela (Nelspruit) for residential property sales across the Lowveld.",
  },
  {
    id: "remax-lifestyle-estates-nelspruit",
    slug: "remax-lifestyle-estates-nelspruit",
    name: "RE/MAX Lowveld",
    profileType: "agency",
    status: "published",
    description:
      "RE/MAX Lifestyle Estates serves Nelspruit and nearby White River, with sales expertise across homes, apartments and game farms.",
    logo: "https://s3-eu-west-1.amazonaws.com/stream-images.remax.co.za/office/57/logo/lowveld.remax.co.za.png",
    logoAlt: "RE/MAX Lowveld office logo",
    imageFit: "contain",
    images: ["https://www.remaxlowveld.co.za/images/balloon.png"],
    imageAlts: ["RE/MAX hot-air-balloon brand graphic"],
    location: "Nelspruit",
    website: "https://www.remaxlowveld.co.za/",
    services: ["Property sales", "Home sales", "Apartment sales", "Game farm sales"],
    sourceUrl: "https://www.remaxlowveld.co.za/contact-us/lifestyle-estates-(nelspruit)/800640",
    seoTitle: "RE/MAX Lowveld | Property Agency in Nelspruit | Discover",
    seoDescription:
      "Connect with RE/MAX Lifestyle Estates in Nelspruit for residential and game-farm property sales.",
  },
  {
    id: "chas-everitt-nelspruit-lowveld",
    slug: "chas-everitt-nelspruit-lowveld",
    name: "Chas Everitt Nelspruit / Lowveld",
    profileType: "agency",
    status: "published",
    description:
      "First Realty Nelspruit (Pty) Ltd trades as Chas Everitt Nelspruit / Lowveld, serving the Nelspruit property market.",
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRhbDUSEy_UFz-TAGgXgM242nsU-QeFbJw57VMQOrgmpJmit39_dteCmoG&s=10",
    coverImageAlt: "Chas Everitt Nelspruit / Lowveld",
    location: "Nelspruit",
    website: "https://www.chaseveritt.co.za/",
    sourceUrl: "https://www.chaseveritt.co.za/",
    seoTitle: "Chas Everitt Nelspruit / Lowveld | Discover",
    seoDescription:
      "Discover Chas Everitt Nelspruit / Lowveld, a local property agency serving Nelspruit.",
  },
];

export const propertyProfessionalServiceTypes = [
  ...new Set(propertyProfessionals.flatMap((professional) => professional.services ?? [])),
].sort((a, b) => a.localeCompare(b));

export function getPublishedPropertyProfessionals() {
  return propertyProfessionals.filter((professional) => professional.status === "published");
}

export function findPropertyProfessionalBySlug(slug: string) {
  return getPublishedPropertyProfessionals().find((professional) => professional.slug === slug);
}

export function findPropertyProfessionalById(id: string | undefined) {
  if (!id) return undefined;
  return getPublishedPropertyProfessionals().find((professional) => professional.id === id);
}

export function getPropertyListingsForProfessional(professional: PropertyProfessional) {
  return getPublishedPropertyListings().filter(
    (listing) =>
      listing.agentId === professional.id ||
      listing.agencyId === professional.id ||
      (professional.agentId !== undefined && listing.agentId === professional.agentId) ||
      (professional.agencyId !== undefined && listing.agencyId === professional.agencyId),
  );
}

export function getPropertyListingIntent(value: string | undefined) {
  return propertyListingIntents.find((intent) => intent.value === value);
}

export function getPropertyListingPath(listing: PropertyListing) {
  return `/property/${getBusinessSlug(listing)}`;
}

export function getPropertyProfessionalPath(professional: PropertyProfessional) {
  return `/property/professionals/${professional.slug}`;
}

export function getPropertyContactHref(phone: string | undefined) {
  return phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;
}

export function getPropertyWhatsAppHref(whatsapp: string | undefined) {
  if (!whatsapp) return undefined;
  if (/^https:\/\/wa\.me\//i.test(whatsapp)) return whatsapp;
  const number = whatsapp.replace(/\D/g, "");
  return number ? `https://wa.me/${number}` : undefined;
}

export function filterPropertyListings(search: PropertySearchParams) {
  const intent = getPropertyListingIntent(search.listingType);
  const query = search.q?.trim().toLocaleLowerCase();
  const targetLocation = search.location ? findDiscoveryLocation(search.location) : undefined;
  return getPublishedPropertyListings().filter((listing) => {
    if (intent && listing.transactionType !== intent.transactionType) return false;
    if (search.location) {
      const listingLocation = listing.location
        ? findDiscoveryLocation(listing.location)
        : undefined;
      if (search.location === otherMpumalangaLocations) {
        if (!listing.location || listingLocation) return false;
      } else if (targetLocation && listingLocation) {
        if (targetLocation.slug !== listingLocation.slug) return false;
      } else if (listing.location?.toLocaleLowerCase() !== search.location.toLocaleLowerCase()) {
        return false;
      }
    }
    if (search.propertyType && listing.propertyType !== search.propertyType) return false;
    if (
      search.minPrice !== undefined &&
      (listing.price === undefined || listing.price < search.minPrice)
    )
      return false;
    if (
      search.maxPrice !== undefined &&
      (listing.price === undefined || listing.price > search.maxPrice)
    )
      return false;
    if (
      search.bedrooms !== undefined &&
      (listing.bedrooms === undefined || listing.bedrooms < search.bedrooms)
    )
      return false;
    if (
      search.bathrooms !== undefined &&
      (listing.bathrooms === undefined || listing.bathrooms < search.bathrooms)
    )
      return false;
    if (search.features?.some((feature) => !listing.features?.includes(feature))) return false;
    if (!query) return true;
    const searchable = [
      listing.name,
      listing.description,
      listing.location,
      listing.address,
      listing.propertyType,
      listing.transactionType,
      ...(listing.features ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase();
    return searchable.includes(query);
  });
}

export function filterPropertyProfessionals(search: PropertySearchParams) {
  const query = search.q?.trim().toLocaleLowerCase();
  const targetLocation = search.location ? findDiscoveryLocation(search.location) : undefined;
  return getPublishedPropertyProfessionals().filter((professional) => {
    if (search.serviceType && !professional.services?.includes(search.serviceType)) return false;
    if (search.location) {
      const professionalLocation = professional.location
        ? findDiscoveryLocation(professional.location)
        : undefined;
      if (search.location === otherMpumalangaLocations) {
        if (!professional.location || professionalLocation) return false;
      } else if (targetLocation && professionalLocation) {
        if (targetLocation.slug !== professionalLocation.slug) return false;
      } else if (
        professional.location?.toLocaleLowerCase() !== search.location.toLocaleLowerCase()
      ) {
        return false;
      }
    }
    if (!query) return true;
    return [
      professional.name,
      professional.description,
      professional.location,
      professional.services,
    ]
      .flat()
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase()
      .includes(query);
  });
}

export function formatPropertyPrice(price: number | undefined, currency = "ZAR") {
  if (price === undefined) return undefined;
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
