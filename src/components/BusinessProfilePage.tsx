import { useState } from "react";
import {
  ArrowLeft,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { RestaurantBusinessProfile } from "@/components/RestaurantBusinessProfile";
import {
  getBusinessSlug,
  type CategoryConfig,
  type CategoryListing,
} from "@/lib/category-discovery";
import { locationDiscovery, locationSlug } from "@/lib/location-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

const whatsappMessage =
  "Hi, I found your business on Discover by Lowveld Hub and would like to enquire about your services.";

export function BusinessProfilePage({
  listing,
  config,
}: {
  listing: CategoryListing;
  config: CategoryConfig;
}) {
  const [shareStatus, setShareStatus] = useState("");
  const phone = listing.phone?.replace(/[^\d+]/g, "");
  const whatsapp = listing.whatsapp?.replace(/\D/g, "");
  const email = listing.email?.trim();
  const website = getSafeExternalUrl(listing.website);
  const bookingUrl = getSafeExternalUrl(listing.bookingUrl);
  if (config.slug === "food-dining") {
    return <RestaurantBusinessProfile listing={listing} config={config} />;
  }
  const socialLinks = (listing.socialLinks ?? []).flatMap((link) => {
    const href = getSafeExternalUrl(link.href);
    return href ? [{ ...link, href }] : [];
  });
  const directionsQuery =
    listing.latitude != null && listing.longitude != null
      ? `${listing.latitude},${listing.longitude}`
      : [listing.address, listing.location, listing.province, listing.postalCode, listing.country]
          .filter(Boolean)
          .join(", ");
  const gallery = [...new Set([listing.image, ...(listing.images ?? [])].filter(isString))];
  const services = toDisplayValues(listing.services ?? listing.serviceType);
  const profileUrl = getPublicUrl(`/business/${getBusinessSlug(listing)}`);
  const profileImages = [...new Set([listing.image, ...(listing.images ?? [])].filter(isString))]
    .map(
      (image) =>
        getSafeExternalUrl(image) ?? (image.startsWith("/") ? getPublicUrl(image) : undefined),
    )
    .filter((image): image is string => Boolean(image));
  const logoUrl = listing.logo
    ? (getSafeExternalUrl(listing.logo) ??
      (listing.logo.startsWith("/") ? getPublicUrl(listing.logo) : undefined))
    : undefined;
  const locationPage = locationDiscovery.find(
    ({ name }) => name.toLocaleLowerCase() === listing.location?.trim().toLocaleLowerCase(),
  );
  const openingHoursSpecification = getOpeningHoursSpecification(listing.openingHours);
  const structuredData = {
    "@context": "https://schema.org",
    "@type":
      config.slug === "accommodation"
        ? "LodgingBusiness"
        : listing.diningType === "Restaurant"
          ? "Restaurant"
          : "LocalBusiness",
    name: listing.name,
    ...(listing.description ? { description: listing.description } : {}),
    ...(profileUrl ? { url: profileUrl } : {}),
    ...(listing.menuUrl ? { hasMenu: listing.menuUrl } : {}),
    ...(listing.roomCount ? { numberOfRooms: listing.roomCount } : {}),
    ...(listing.amenities?.length
      ? {
          amenityFeature: listing.amenities.map((amenity) => ({
            "@type": "LocationFeatureSpecification",
            name: amenity,
            value: true,
          })),
        }
      : {}),
    ...(profileImages.length ? { image: profileImages } : {}),
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(phone ? { telephone: listing.phone } : {}),
    ...(email ? { email } : {}),
    ...(website
      ? { sameAs: [website, ...socialLinks.map((link) => link.href)] }
      : socialLinks.length
        ? { sameAs: socialLinks.map((link) => link.href) }
        : {}),
    ...(listing.address || listing.location
      ? {
          address: {
            "@type": "PostalAddress",
            ...(listing.address ? { streetAddress: listing.address } : {}),
            ...(listing.location ? { addressLocality: listing.location } : {}),
            addressRegion: "Mpumalanga",
            addressCountry: "ZA",
          },
        }
      : {}),
    ...(Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude)
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: listing.latitude,
            longitude: listing.longitude,
          },
        }
      : {}),
    ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
  };
  async function shareProfile() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: listing.name, url });
        setShareStatus("Shared");
      } else {
        await navigator.clipboard.writeText(url);
        setShareStatus("Link copied");
      }
    } catch {
      setShareStatus("Sharing was cancelled");
    }
  }

  function shareOnWhatsApp() {
    const message = `${listing.name} on Discover by Lowveld Hub: ${window.location.href}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#172a31]">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-md">
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          <a
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Discover by Lowveld Hub home"
          >
            <img src="/logo%202.jpg" alt="" className="h-9 w-9 rounded-sm object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Discover</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                by Lowveld Hub
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[#68767a] md:flex">
            <a href="/" className="site-nav-link hover:text-[#172a31]">
              Home
            </a>
            <a href="/#categories" className="site-nav-link hover:text-[#172a31]">
              Categories
            </a>
            <a href="/business-network" className="site-nav-link hover:text-[#172a31]">
              Business Network
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="/list-your-business"
              className="hidden min-h-10 items-center rounded-sm bg-[#17242b] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#2b414a] sm:inline-flex"
            >
              List Your Business
            </a>
          </div>
        </div>
      </header>

      <main className="container-x py-6 md:py-9">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#788589]"
        >
          <a href="/" className="hover:text-[#172a31]">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <a href="/#categories" className="hover:text-[#172a31]">
            Categories
          </a>
          <span aria-hidden="true">/</span>
          <a href={`/categories/${config.slug}`} className="hover:text-[#172a31]">
            {config.label}
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-[#34474d]">
            {listing.name}
          </span>
        </nav>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.7fr)] lg:gap-10">
          <div className="min-w-0">
            {gallery.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {gallery.slice(0, 4).map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={
                      listing.imageAlts?.[index] ??
                      `${listing.name}${index ? ` gallery image ${index + 1}` : ""}`
                    }
                    fetchPriority={index === 0 ? "high" : undefined}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={`w-full rounded-sm bg-[#edf0f0] object-cover ${index === 0 ? "aspect-[16/10] sm:row-span-2 sm:h-full" : "aspect-[16/9]"}`}
                  />
                ))}
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="grid aspect-[16/10] place-items-center overflow-hidden rounded-sm bg-[linear-gradient(135deg,#eef2f1,#dce7e8)]"
              >
                <span className="font-display text-6xl font-medium tracking-wide text-[#8a7655]">
                  {listing.name
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4 border-b border-[#e5ebeb] pb-5">
              <div className="flex min-w-0 items-center gap-3">
                {listing.logo && (
                  <img
                    src={listing.logo}
                    alt={`${listing.name} logo`}
                    className="h-12 w-12 shrink-0 rounded-sm border border-[#e5ebeb] object-contain"
                  />
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#39703b]">
                      {config.label}
                    </p>
                    {listing.subcategory && (
                      <p className="text-[10px] font-medium text-[#68767a]">
                        {listing.subcategory}
                      </p>
                    )}
                  </div>
                  <h1 className="mt-1 font-display text-3xl font-medium leading-tight text-[#172a31] sm:text-4xl">
                    {listing.name}
                  </h1>
                  {(listing.address || listing.location) && (
                    <div className="mt-2 flex items-start gap-1.5 text-sm text-[#68767a]">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      <div>
                        {listing.address && <p>{listing.address}</p>}
                        {listing.location && (
                          <p>
                            {locationPage ? (
                              <a
                                href={`/locations/${locationSlug(locationPage.name)}`}
                                className="underline decoration-[#c7d0d2] underline-offset-2 hover:text-[#172a31]"
                              >
                                {listing.location}
                              </a>
                            ) : (
                              listing.location
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#dce4e5] px-3 text-sm font-medium text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </button>
                <button
                  type="button"
                  onClick={shareProfile}
                  className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#dce4e5] px-3 text-sm font-medium text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
                {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-[#142b4a] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#244568]"
                  >
                    <Globe className="h-4 w-4" /> View booking options
                  </a>
                )}
                {shareStatus && (
                  <span role="status" className="sr-only">
                    {shareStatus}
                  </span>
                )}
              </div>
            </div>
            {listing.description && (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">About</h2>
                <p className="mt-2 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#5f6d72]">
                  {listing.description}
                </p>
              </section>
            )}

            {config.slug === "accommodation" &&
              (listing.accommodationType || listing.roomCount || listing.roomTypes?.length) && (
                <section className="border-b border-[#e5ebeb] py-5">
                  <h2 className="text-base font-semibold">Accommodation</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {listing.accommodationType && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#788589]">
                          Type
                        </p>
                        <p className="mt-1 text-sm text-[#34474d]">{listing.accommodationType}</p>
                      </div>
                    )}
                    {listing.roomCount && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#788589]">
                          Rooms
                        </p>
                        <p className="mt-1 text-sm text-[#34474d]">{listing.roomCount}</p>
                      </div>
                    )}
                  </div>
                  {listing.roomTypes?.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-[#536267]">Room types</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {listing.roomTypes.map((roomType) => (
                          <li
                            key={roomType}
                            className="border border-[#e2e8e9] bg-[#f8faf9] px-2.5 py-1.5 text-xs text-[#536267]"
                          >
                            {roomType}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              )}

            {config.slug === "accommodation" &&
              ((listing.amenities?.length ?? 0) > 0 || (listing.facilities?.length ?? 0) > 0) && (
                <section className="border-b border-[#e5ebeb] py-5">
                  <h2 className="text-base font-semibold">Facilities & amenities</h2>
                  <ul className="mt-3 grid gap-x-5 gap-y-2 text-sm text-[#5f6d72] sm:grid-cols-2">
                    {[...(listing.amenities ?? []), ...(listing.facilities ?? [])].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a7655]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {services.length > 0 && (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">Services</h2>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5f6d72]">
                  {services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </section>
            )}

            {listing.openingHours && Object.keys(listing.openingHours).length > 0 && (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">Opening hours</h2>
                <dl className="mt-3 grid max-w-lg grid-cols-2 gap-x-5 gap-y-2 text-sm">
                  {Object.entries(listing.openingHours).map(([day, hours]) => (
                    <div key={day} className="contents">
                      <dt className="text-[#788589]">{day}</dt>
                      <dd className="text-[#34474d]">{hours}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <aside className="h-fit border-t border-[#e5ebeb] pt-5 lg:sticky lg:top-24 lg:border lg:p-5">
            <h2 className="text-base font-semibold">Contact {listing.name}</h2>
            <div className="mt-4 grid gap-2">
              {bookingUrl && (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#142b4a] px-4 text-sm font-semibold text-white hover:bg-[#244568]"
                >
                  View booking options
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#1f6b45] px-4 text-sm font-semibold text-white hover:bg-[#19583a]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Globe className="h-4 w-4" /> Website
                </a>
              )}
              {directionsQuery && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(directionsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Navigation className="h-4 w-4" /> Directions
                </a>
              )}
            </div>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#e5ebeb] pt-4 text-sm">
                {socialLinks.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#536267] underline underline-offset-4 hover:text-[#172a31]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            {listing.location && (
              <p className="mt-5 flex items-start gap-2 border-t border-[#e5ebeb] pt-4 text-sm leading-6 text-[#68767a]">
                <MapPin className="mt-1 h-4 w-4 shrink-0" /> {listing.location}
              </p>
            )}
          </aside>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </main>
      <div className="container-x pb-7">
        <a
          href={`/categories/${config.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#34474d] hover:text-[#39703b]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {config.label}
        </a>
      </div>
      <SiteFooter />
    </div>
  );
}

function getSafeExternalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function getOpeningHoursSpecification(hours?: Record<string, string>) {
  const days: Record<string, string> = {
    mon: "Monday",
    monday: "Monday",
    tue: "Tuesday",
    tues: "Tuesday",
    tuesday: "Tuesday",
    wed: "Wednesday",
    wednesday: "Wednesday",
    thu: "Thursday",
    thur: "Thursday",
    thurs: "Thursday",
    thursday: "Thursday",
    fri: "Friday",
    friday: "Friday",
    sat: "Saturday",
    saturday: "Saturday",
    sun: "Sunday",
    sunday: "Sunday",
  };
  const toTime = (value: string) => {
    const match = value.match(/^(\d{1,2}):(\d{2})$/);
    if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) return undefined;
    return `${match[1].padStart(2, "0")}:${match[2]}`;
  };

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return Object.entries(hours ?? {}).flatMap(([day, value]) => {
    const normalizedDay = day.trim().toLocaleLowerCase();
    const dayOfWeek = normalizedDay === "daily" ? weekdays : [days[normalizedDay]].filter(Boolean);
    const times = value.match(/(\d{1,2}:\d{2})\s*(?:-|–|to)\s*(\d{1,2}:\d{2})/i);
    const opens = times ? toTime(times[1]) : undefined;
    const closes = times ? toTime(times[2]) : undefined;
    return opens && closes
      ? dayOfWeek.map((dayName) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${dayName}`,
          opens,
          closes,
        }))
      : [];
  });
}

function toDisplayValues(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(isString);
  return isString(value) ? [value] : [];
}
