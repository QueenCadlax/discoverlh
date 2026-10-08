import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Globe,
  Images,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
  X,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { BusinessSocialLinks } from "@/components/BusinessSocialLinks";
import { RestaurantBusinessProfile } from "@/components/RestaurantBusinessProfile";
import {
  getCanonicalCategorySlug,
  getCategoryListingPath,
  type CategoryConfig,
  type CategoryListing,
} from "@/lib/category-discovery";
import { findDiscoveryLocation } from "@/lib/location-discovery";
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
  const isAutomotive = config.slug === "automotive";
  const isProfessionalServices =
    config.slug === "professional" || config.slug === "professional-services";
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
  const gallery = isAutomotive
    ? []
    : [...new Set([listing.image, ...(listing.images ?? [])].filter(isString))];
  const services = toDisplayValues(listing.services ?? listing.serviceType);
  const profileUrl = getPublicUrl(getCategoryListingPath(config.slug, listing));
  const profileImages = (
    isAutomotive ? [] : [...new Set([listing.image, ...(listing.images ?? [])].filter(isString))]
  )
    .map(
      (image) =>
        getSafeExternalUrl(image) ?? (image.startsWith("/") ? getPublicUrl(image) : undefined),
    )
    .filter((image): image is string => Boolean(image));
  const logoUrl =
    listing.logo && !isAutomotive
      ? (getSafeExternalUrl(listing.logo) ??
        (listing.logo.startsWith("/") ? getPublicUrl(listing.logo) : undefined))
      : undefined;
  const locationPage = listing.location ? findDiscoveryLocation(listing.location) : undefined;
  const openingHoursSpecification = getOpeningHoursSpecification(listing.openingHours);
  const structuredData = {
    "@context": "https://schema.org",
    "@type":
      listing.type === "Law Firm"
        ? "LegalService"
        : config.slug === "accommodation"
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
            ...(listing.postalCode ? { postalCode: listing.postalCode } : {}),
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
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: getPublicUrl("/") },
        ...(locationPage
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: locationPage.name,
                item: getPublicUrl(`/locations/${locationPage.slug}`),
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: locationPage ? 3 : 2,
          name: config.label,
          item: getPublicUrl(`/categories/${getCanonicalCategorySlug(config.slug)}`),
        },
        {
          "@type": "ListItem",
          position: locationPage ? 4 : 3,
          name: listing.name,
          ...(profileUrl ? { item: profileUrl } : {}),
        },
      ],
    },
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
          {locationPage ? (
            <>
              <a href={`/locations/${locationPage.slug}`} className="hover:text-[#172a31]">
                {locationPage.name}
              </a>
              <span aria-hidden="true">/</span>
            </>
          ) : (
            <>
              <a href="/#categories" className="hover:text-[#172a31]">
                Categories
              </a>
              <span aria-hidden="true">/</span>
            </>
          )}
          <a
            href={`/categories/${getCanonicalCategorySlug(config.slug)}`}
            className="hover:text-[#172a31]"
          >
            {config.label}
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-[#34474d]">
            {listing.name}
          </span>
        </nav>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.7fr)] lg:gap-10">
          <div className="min-w-0">
            {config.slug === "leisure-entertainment" ? (
              <LeisurePhotoGallery listing={listing} images={gallery} />
            ) : gallery.length > 0 ? (
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
                {listing.logo && !isAutomotive && (
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
                                href={`/locations/${locationPage.slug}`}
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
                {!isProfessionalServices && (
                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#dce4e5] px-3 text-sm font-medium text-[#34474d] hover:bg-[#f7f9f9]"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </button>
                )}
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
                <h2 className="text-base font-semibold">
                  {isProfessionalServices ? "Practice areas" : "Services"}
                </h2>
                <ul
                  className={`mt-3 flex flex-wrap gap-2 ${isProfessionalServices ? "" : "gap-x-5 gap-y-2 text-sm text-[#5f6d72]"}`}
                >
                  {services.map((service) => (
                    <li
                      key={service}
                      className={
                        isProfessionalServices
                          ? "border border-[#e2e8e9] bg-[#f8faf9] px-3 py-2 text-xs font-medium text-[#536267]"
                          : undefined
                      }
                    >
                      {service}
                    </li>
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
            <div className="mt-5">
              <BusinessSocialLinks businessName={listing.name} links={socialLinks} />
            </div>
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
      {isProfessionalServices && (
        <>
          <nav
            aria-label={`Contact ${listing.name}`}
            className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[#dce4e5] bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_28px_-18px_rgba(23,36,43,.28)] backdrop-blur-md md:hidden"
          >
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-[#dce4e5] px-3 text-sm font-semibold text-[#34474d]"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            )}
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#1f6b45] px-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#142b4a] px-3 text-sm font-semibold text-white"
              >
                <Globe className="h-4 w-4" /> Website
              </a>
            )}
          </nav>
          <div aria-hidden="true" className="h-16 md:hidden" />
        </>
      )}
    </div>
  );
}

function LeisurePhotoGallery({ listing, images }: { listing: CategoryListing; images: string[] }) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const visibleImages = images.filter((image) => !failedImages.includes(image));
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryTriggerRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const closeGallery = useCallback(() => {
    setActiveImage(null);
    galleryTriggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (activeImage === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowRight") {
        setActiveImage((index) => (index === null ? null : (index + 1) % visibleImages.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((index) =>
          index === null ? null : (index - 1 + visibleImages.length) % visibleImages.length,
        );
      }
      if (event.key === "Tab") {
        const buttons = lightboxRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, closeGallery, visibleImages.length]);

  const getAlt = (image: string, index: number) => {
    const sourceIndex = images.indexOf(image);
    return (
      (sourceIndex === 0 ? listing.imageAlt : listing.imageAlts?.[sourceIndex - 1]) ??
      `${listing.name}${index ? `, photo ${index + 1}` : ""}`
    );
  };

  if (!visibleImages.length) {
    return (
      <div className="grid h-48 place-items-center rounded-md bg-[#edf2f0] px-6 text-center text-sm text-[#68767a]">
        Photos coming soon
      </div>
    );
  }

  return (
    <>
      <section aria-label={`${listing.name} photo gallery`} className="relative">
        <div
          role="group"
          aria-label="Select a photo to enlarge"
          className="grid grid-cols-2 gap-2 overflow-hidden rounded-md sm:h-[280px] sm:grid-cols-[1.8fr_1fr_1fr] sm:grid-rows-2 md:h-[340px]"
        >
          {visibleImages.slice(0, 5).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={(event) => {
                galleryTriggerRef.current = event.currentTarget;
                setActiveImage(index);
              }}
              aria-label={`Open photo ${index + 1} of ${visibleImages.length} for ${listing.name}`}
              className={`group relative block min-w-0 overflow-hidden bg-[#edf0f0] text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] sm:h-full sm:aspect-auto ${index === 0 ? "col-span-2 aspect-[16/9] sm:col-span-1 sm:row-span-2" : `aspect-[4/3] ${index > 2 ? "hidden sm:block" : ""}`}`}
            >
              <img
                src={image}
                alt={getAlt(image, index)}
                fetchPriority={index === 0 ? "high" : undefined}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                onError={() => {
                  setFailedImages((current) =>
                    current.includes(image) ? current : [...current, image],
                  );
                  setActiveImage(null);
                }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
              />
            </button>
          ))}
        </div>
        {visibleImages.length > 1 && (
          <button
            type="button"
            onClick={() => {
              galleryTriggerRef.current =
                document.activeElement instanceof HTMLButtonElement ? document.activeElement : null;
              setActiveImage(0);
            }}
            className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-2 rounded-sm border border-white/80 bg-white/95 px-3 text-xs font-semibold text-[#17242b] shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a]"
          >
            <Images className="h-4 w-4" />
            View all {visibleImages.length} photos
          </button>
        )}
      </section>

      {activeImage !== null && visibleImages[activeImage] && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${listing.name} photo gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (startX == null || endX == null || Math.abs(endX - startX) < 40) return;
            setActiveImage((index) =>
              index === null
                ? null
                : (index + (endX < startX ? 1 : -1) + visibleImages.length) % visibleImages.length,
            );
          }}
        >
          <button
            type="button"
            aria-label="Close photo gallery"
            ref={closeButtonRef}
            onClick={closeGallery}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() =>
              setActiveImage((index) =>
                index === null ? null : (index - 1 + visibleImages.length) % visibleImages.length,
              )
            }
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={visibleImages[activeImage]}
            alt={getAlt(visibleImages[activeImage], activeImage)}
            onError={() => {
              setFailedImages((current) =>
                current.includes(visibleImages[activeImage])
                  ? current
                  : [...current, visibleImages[activeImage]],
              );
              closeGallery();
            }}
            className="max-h-[82vh] max-w-full rounded-sm object-contain"
          />
          <button
            type="button"
            aria-label="Next photo"
            onClick={() =>
              setActiveImage((index) =>
                index === null ? null : (index + 1) % visibleImages.length,
              )
            }
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <p className="absolute bottom-5 text-xs text-white/80" aria-live="polite">
            {activeImage + 1} of {visibleImages.length}
          </p>
        </div>
      )}
    </>
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
