import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Images,
  Mail,
  MapPin,
  Navigation,
  Phone,
  X,
} from "lucide-react";

import { CategoryListingCard, WellnessProfileDetails } from "@/components/CategoryDiscoveryPage";
import { BusinessSocialLinks } from "@/components/BusinessSocialLinks";
import { MpumalangaMap } from "@/components/MpumalangaMap";
import { SiteFooter } from "@/components/SiteFooter";
import {
  categoryConfigs,
  getCategoryListingPath,
  getCategoryListings,
  getPublishedListingsInLocation,
  isPublishedListing,
  type CategoryListing,
} from "@/lib/category-discovery";
import { findDiscoveryLocation } from "@/lib/location-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

export function AccommodationBusinessProfile({
  listing,
  canonicalPath,
  wellnessView = false,
}: {
  listing: CategoryListing;
  canonicalPath?: string;
  wellnessView?: boolean;
}) {
  const config = categoryConfigs.accommodation;
  const wellnessProfile = wellnessView ? listing.wellnessProfile : undefined;
  const categoryConfig = wellnessProfile ? categoryConfigs["beauty-wellness-fitness"] : config;
  const gallery = wellnessProfile
    ? [...new Set([wellnessProfile.image, ...(wellnessProfile.images ?? [])].filter(isString))]
    : [...new Set([listing.image, ...(listing.images ?? [])].filter(isString))];
  const galleryAlts = wellnessProfile?.imageAlts ?? listing.imageAlts;
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const visibleGallery = gallery.filter((image) => !failedImages.includes(image));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const galleryTriggerRef = useRef<HTMLButtonElement>(null);
  const lightboxTouchStartX = useRef<number | null>(null);
  const website = getSafeExternalUrl(wellnessProfile?.website ?? listing.website);
  const bookingUrl = getSafeExternalUrl(wellnessProfile?.bookingUrl ?? listing.bookingUrl);
  const logoUrl = getSafeExternalUrl(wellnessProfile?.logo ?? listing.logo);
  const socialLinks = (listing.socialLinks ?? []).flatMap((link) => {
    const href = getSafeExternalUrl(link.href);
    return href ? [{ ...link, href }] : [];
  });
  const phone = listing.phone?.replace(/[^\d+]/g, "");
  const email = (wellnessProfile?.email ?? listing.email)?.trim();
  const phoneLabel = wellnessProfile
    ? listing.phone && !wellnessProfile.email
      ? "Call resort"
      : "Call spa"
    : "Call";
  const emailLabel = wellnessProfile
    ? wellnessProfile.email
      ? "Email spa"
      : "Email resort"
    : "Email";
  const propertyType = wellnessProfile?.providerType ?? listing.accommodationType ?? listing.type;
  const propertyFeatures = [
    ...new Set([...(listing.amenities ?? []), ...(listing.facilities ?? [])].map(normalizeFeature)),
  ];
  const visibleFeatures = showAllFeatures ? propertyFeatures : propertyFeatures.slice(0, 6);
  const profileUrl = getPublicUrl(
    canonicalPath ?? getCategoryListingPath("accommodation", listing),
  );
  const locationPage = listing.location ? findDiscoveryLocation(listing.location) : undefined;
  const directionsQuery =
    listing.latitude != null && listing.longitude != null
      ? `${listing.latitude},${listing.longitude}`
      : [listing.address, listing.location, listing.province, listing.country]
          .filter(Boolean)
          .join(", ");
  const directionsUrl =
    getSafeExternalUrl(listing.directionsUrl) ??
    (directionsQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(directionsQuery)}`
      : undefined);
  const recommendationCategory = wellnessProfile ? "beauty-wellness-fitness" : "accommodation";
  const recommendations = getCategoryListings(recommendationCategory)
    .filter(
      (stay) =>
        stay.id !== listing.id &&
        isPublishedListing(stay) &&
        (!wellnessProfile || Boolean(stay.wellnessProfile)),
    )
    .slice(0, 4);
  const nearbyListings = listing.location
    ? getPublishedListingsInLocation(listing.location)
        .filter(({ listing: nearby }) => nearby.id !== listing.id)
        .slice(0, 4)
    : [];
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    galleryTriggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") {
        setLightboxIndex((index) => (index === null ? null : (index + 1) % visibleGallery.length));
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((index) =>
          index === null ? null : (index - 1 + visibleGallery.length) % visibleGallery.length,
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
    lightboxCloseRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, lightboxIndex, visibleGallery.length]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": wellnessProfile ? "HealthAndBeautyBusiness" : "LodgingBusiness",
    name: wellnessProfile?.displayName ?? listing.name,
    ...((wellnessProfile?.description ?? wellnessProfile?.summary ?? listing.description)
      ? {
          description:
            wellnessProfile?.description ?? wellnessProfile?.summary ?? listing.description,
        }
      : {}),
    ...(profileUrl ? { url: profileUrl } : {}),
    ...(gallery.length ? { image: gallery } : {}),
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(!wellnessProfile && listing.roomCount ? { numberOfRooms: listing.roomCount } : {}),
    ...(website || socialLinks.length
      ? { sameAs: [...(website ? [website] : []), ...socialLinks.map((link) => link.href)] }
      : {}),
    ...(phone ? { telephone: listing.phone } : {}),
    ...(email ? { email } : {}),
    ...(listing.address || listing.location
      ? {
          address: {
            "@type": "PostalAddress",
            ...(listing.address ? { streetAddress: listing.address } : {}),
            ...(listing.location ? { addressLocality: listing.location } : {}),
            ...(listing.province ? { addressRegion: listing.province } : {}),
            ...(listing.country ? { addressCountry: listing.country } : {}),
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
    ...(!wellnessProfile && listing.amenities?.length
      ? {
          amenityFeature: listing.amenities.map((amenity) => ({
            "@type": "LocationFeatureSpecification",
            name: amenity,
            value: true,
          })),
        }
      : {}),
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", url: getPublicUrl("/") },
      ...(locationPage
        ? [
            {
              name: locationPage.name,
              url: getPublicUrl(`/locations/${locationPage.slug}`),
            },
          ]
        : []),
      {
        name: categoryConfig.label,
        url: getPublicUrl(`/categories/${wellnessProfile ? "beauty-wellness-fitness" : "stay"}`),
      },
      { name: wellnessProfile?.displayName ?? listing.name, url: profileUrl },
    ].flatMap(({ name, url }, index) =>
      url ? [{ "@type": "ListItem", position: index + 1, name, item: url }] : [],
    ),
  };

  return (
    <div className="min-h-screen bg-white text-[#172a31]">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-md">
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          <a href="/" className="flex shrink-0 items-center gap-2" aria-label="Discover home">
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

      <main className="container-x py-5 pb-24 md:py-8 md:pb-8">
        <a
          href={wellnessProfile ? "/categories/beauty-wellness-fitness" : "/categories/stay"}
          className="mb-3 inline-flex min-h-9 items-center gap-1.5 text-xs font-medium text-[#68767a] transition-colors hover:text-[#172a31] sm:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {categoryConfig.label}
        </a>
        <nav
          aria-label="Breadcrumb"
          className="mb-4 hidden flex-wrap items-center gap-2 text-xs text-[#788589] sm:flex"
        >
          <a href="/" className="hover:text-[#172a31]">
            Home
          </a>
          <span aria-hidden="true">/</span>
          {locationPage ? (
            <a href={`/locations/${locationPage.slug}`} className="hover:text-[#172a31]">
              {locationPage.name}
            </a>
          ) : (
            <span>{[listing.location, listing.province].filter(Boolean).join(", ")}</span>
          )}
          <span aria-hidden="true">/</span>
          <a
            href={wellnessProfile ? "/categories/beauty-wellness-fitness" : "/categories/stay"}
            className="hover:text-[#172a31]"
          >
            {categoryConfig.label}
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-[#34474d]">
            {wellnessProfile?.displayName ?? listing.name}
          </span>
        </nav>

        {visibleGallery.length > 0 ? (
          <section
            aria-label={
              wellnessProfile ? `${propertyType} photo gallery` : "Property photo gallery"
            }
            className="relative"
          >
            <div
              role="group"
              aria-label={`Select a ${wellnessProfile ? "spa" : "property"} photo to enlarge`}
              className="grid grid-cols-2 gap-2 overflow-hidden rounded-md sm:h-[280px] sm:grid-cols-[1.8fr_1fr_1fr] sm:grid-rows-2 md:h-[340px]"
            >
              {visibleGallery.slice(0, 5).map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={(event) => {
                    galleryTriggerRef.current = event.currentTarget;
                    setLightboxIndex(index);
                  }}
                  aria-label={`Open photo ${index + 1} of ${visibleGallery.length} for ${listing.name}`}
                  className={`group relative block min-w-0 overflow-hidden bg-[#edf0f0] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] sm:h-full sm:aspect-auto ${index === 0 ? "col-span-2 aspect-[16/9] sm:col-span-1 sm:row-span-2" : `aspect-[4/3] ${index > 2 ? "hidden sm:block" : ""}`}`}
                >
                  <img
                    src={image}
                    alt={
                      galleryAlts?.[gallery.indexOf(image)] ??
                      `${listing.name}${index ? `, photo ${index + 1}` : ""}`
                    }
                    fetchPriority={index === 0 ? "high" : undefined}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    onError={() => {
                      setFailedImages((current) =>
                        current.includes(image) ? current : [...current, image],
                      );
                      setLightboxIndex(null);
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
                  />
                </button>
              ))}
            </div>
            {visibleGallery.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-2 rounded-sm border border-white/80 bg-white/95 px-3 text-xs font-semibold text-[#17242b] shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a]"
              >
                <Images className="h-4 w-4" />
                View all {visibleGallery.length} photos
              </button>
            )}
          </section>
        ) : (
          <div className="grid h-48 place-items-center rounded-md bg-[#edf2f0] px-6 text-center text-sm text-[#68767a]">
            Photos coming soon
          </div>
        )}

        {lightboxIndex !== null && visibleGallery[lightboxIndex] && (
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${listing.name} photo gallery`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
            onTouchStart={(event) => {
              lightboxTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = lightboxTouchStartX.current;
              const endX = event.changedTouches[0]?.clientX;
              lightboxTouchStartX.current = null;
              if (startX == null || endX == null || Math.abs(endX - startX) < 40) return;
              setLightboxIndex((index) =>
                index === null
                  ? null
                  : (index + (endX < startX ? 1 : -1) + visibleGallery.length) %
                    visibleGallery.length,
              );
            }}
          >
            <button
              type="button"
              aria-label="Close photo gallery"
              ref={lightboxCloseRef}
              onClick={closeLightbox}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() =>
                setLightboxIndex((index) =>
                  index === null
                    ? null
                    : (index - 1 + visibleGallery.length) % visibleGallery.length,
                )
              }
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <img
              src={visibleGallery[lightboxIndex]}
              alt={
                galleryAlts?.[gallery.indexOf(visibleGallery[lightboxIndex])] ??
                `${listing.name} photo ${lightboxIndex + 1}`
              }
              onError={() => {
                setFailedImages((current) => [...current, visibleGallery[lightboxIndex]]);
                closeLightbox();
              }}
              className="max-h-[82vh] max-w-full rounded-sm object-contain"
            />
            <button
              type="button"
              aria-label="Next photo"
              onClick={() =>
                setLightboxIndex((index) =>
                  index === null ? null : (index + 1) % visibleGallery.length,
                )
              }
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <p className="absolute bottom-5 text-xs text-white/80" aria-live="polite">
              {lightboxIndex + 1} of {visibleGallery.length}
            </p>
          </div>
        )}

        <section className="mt-4 border-b border-[#e5ebeb] pb-4 sm:mt-5 sm:pb-5">
          <div className="flex items-center gap-3">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={wellnessProfile?.logoAlt ?? `${listing.name} logo`}
                className="h-11 w-16 shrink-0 object-contain"
              />
            )}
            <h1 className="font-display text-2xl font-medium leading-tight text-[#172a31] sm:text-3xl">
              {wellnessProfile?.displayName ?? listing.name}
            </h1>
          </div>
          {listing.location ? (
            locationPage ? (
              <a
                href={`/locations/${locationPage.slug}`}
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-[#536267] underline decoration-[#c7d0d2] underline-offset-4 hover:text-[#172a31]"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                {[propertyType, listing.location, listing.province].filter(isString).join(" · ")}
              </a>
            ) : (
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-[#536267]">
                <MapPin className="h-4 w-4 shrink-0" />
                {[propertyType, listing.location, listing.province].filter(isString).join(" · ")}
              </p>
            )
          ) : (
            <p className="mt-1.5 text-sm text-[#536267]">{propertyType}</p>
          )}
          <p className="mt-3 text-xs text-[#68767a]">
            {gallery.length} {wellnessProfile ? "spa photos" : "photos"}
          </p>
        </section>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.34fr)] lg:gap-12">
          <aside className="order-first h-fit border-b border-[#e5ebeb] pb-5 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 lg:border lg:p-5">
            <h2 className="text-base font-semibold">
              {wellnessProfile ? "Plan a spa visit" : "Plan your stay"}
            </h2>
            <div className="mt-4 grid gap-2">
              {bookingUrl && (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#142b4a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#244568]"
                >
                  {wellnessProfile?.bookingLabel ?? "Check availability"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              {!bookingUrl && website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#142b4a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#244568]"
                >
                  Visit website <Globe className="h-4 w-4" />
                </a>
              )}
              {listing.whatsapp && (
                <a
                  href={`https://wa.me/${listing.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I found ${wellnessProfile?.displayName ?? listing.name} on Discover by Lowveld Hub and would like to enquire about ${wellnessProfile ? "a spa treatment" : "a stay"}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  WhatsApp
                </a>
              )}
              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Navigation className="h-4 w-4" /> Get directions
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Phone className="h-4 w-4" /> {phoneLabel}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Mail className="h-4 w-4" /> {emailLabel}
                </a>
              )}
              {website && bookingUrl && (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#dce4e5] px-4 text-sm font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
                >
                  <Globe className="h-4 w-4" /> Visit website
                </a>
              )}
            </div>
            <div className="mt-4">
              <BusinessSocialLinks businessName={listing.name} links={socialLinks} />
            </div>
            {wellnessProfile && (
              <a
                href={getCategoryListingPath("accommodation", listing)}
                className="mt-4 inline-flex min-h-9 items-center text-xs font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#28718a]"
              >
                View {listing.name} accommodation
              </a>
            )}
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            {!wellnessProfile && listing.description && (
              <section className="border-b border-[#e5ebeb] pb-5">
                <h2 className="text-lg font-semibold">About {listing.name}</h2>
                <p className="mt-2 text-sm leading-7 text-[#5f6d72]">{listing.description}</p>
              </section>
            )}

            {wellnessProfile && <WellnessProfileDetails profile={wellnessProfile} />}

            {!wellnessProfile && listing.roomTypes?.length ? (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-lg font-semibold">The rooms</h2>
                <p className="mt-2 text-sm leading-6 text-[#68767a]">
                  Room options include {listing.roomTypes.join(", ")}.
                </p>
              </section>
            ) : null}

            {!wellnessProfile && propertyFeatures.length > 0 && (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-lg font-semibold">At a glance</h2>
                <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm text-[#68767a] sm:grid-cols-2">
                  {visibleFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-[#28718a]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {propertyFeatures.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setShowAllFeatures((shown) => !shown)}
                    className="mt-3 inline-flex min-h-9 items-center text-xs font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#28718a]"
                  >
                    {showAllFeatures ? "Show fewer amenities" : "Show all amenities"}
                  </button>
                )}
              </section>
            )}

            {(listing.address || Number.isFinite(listing.latitude)) && (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-lg font-semibold">Where you’ll find it</h2>
                <p className="mt-2 text-sm text-[#68767a]">
                  {[listing.location, listing.province].filter(Boolean).join(", ")}
                </p>
                {listing.address && (
                  <details className="mt-2 text-sm text-[#68767a]">
                    <summary className="w-fit cursor-pointer underline decoration-[#c7d0d2] underline-offset-4">
                      Full address
                    </summary>
                    <p className="mt-2">{listing.address}</p>
                  </details>
                )}
                {directionsUrl && (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#39703b]"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Get directions
                  </a>
                )}
                {Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude) && (
                  <div className="mt-4">
                    <MpumalangaMap
                      places={[
                        {
                          name: listing.name,
                          latitude: Number(listing.latitude),
                          longitude: Number(listing.longitude),
                          description: listing.address ?? listing.location,
                          href: getCategoryListingPath("accommodation", listing),
                          locationAccuracy: listing.locationAccuracy,
                        },
                      ]}
                      heading={wellnessProfile ? "Explore the spa location" : "Explore the area"}
                      description={
                        wellnessProfile
                          ? `Explore the location of ${wellnessProfile.displayName}.`
                          : "Explore the property location on the map."
                      }
                    />
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        {nearbyListings.length > 0 && (
          <section className="mt-9 border-t border-[#e5ebeb] pt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
              Local discovery
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#172a31]">Explore nearby</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
              {nearbyListings.map(({ category, listing: nearby }) => (
                <CategoryListingCard
                  key={`${category}:${nearby.id}`}
                  listing={nearby}
                  config={categoryConfigs[category]}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 border-t border-[#e5ebeb] pt-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
                Keep exploring
              </p>
              <h2 className="mt-1 text-xl font-semibold text-[#172a31]">
                {wellnessProfile ? "More wellness experiences" : "You might also like"}
              </h2>
            </div>
            <a
              href={
                wellnessProfile
                  ? "/categories/beauty-wellness-fitness"
                  : "/categories/accommodation"
              }
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#34474d] hover:text-[#39703b]"
            >
              {wellnessProfile ? "All wellness" : "All stays"}{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          {recommendations.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
              {recommendations.map((stay) => (
                <CategoryListingCard key={stay.id} listing={stay} config={categoryConfig} />
              ))}
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5ebeb] py-4">
              <p className="text-sm text-[#68767a]">
                {wellnessProfile
                  ? "More wellness experiences are being added across Mpumalanga."
                  : "More stays are being added across Mpumalanga."}
              </p>
              <a
                href={
                  wellnessProfile
                    ? "/categories/beauty-wellness-fitness"
                    : "/categories/accommodation"
                }
                className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#28718a]"
              >
                {wellnessProfile ? "Explore wellness" : "Explore Accommodation"}{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbStructuredData) }}
        />
      </main>

      {(bookingUrl || website || directionsUrl) && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 grid gap-2 border-t border-[#dce4e5] bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_28px_-18px_rgba(23,36,43,.28)] backdrop-blur-md md:hidden"
          style={{
            gridTemplateColumns: `repeat(${Number(Boolean(bookingUrl || website)) + Number(Boolean(directionsUrl))}, minmax(0, 1fr))`,
          }}
          role="group"
          aria-label={wellnessProfile ? "Quick spa actions" : "Quick accommodation actions"}
        >
          {(bookingUrl || website) && (
            <a
              href={bookingUrl ?? website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm bg-[#142b4a] px-2 text-xs font-semibold text-white"
            >
              {bookingUrl
                ? (wellnessProfile?.bookingLabel ?? "Check availability")
                : "Visit website"}
            </a>
          )}
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-[#dce4e5] px-2 text-xs font-semibold text-[#34474d]"
            >
              <Navigation className="h-3.5 w-3.5" /> Directions
            </a>
          )}
        </div>
      )}

      <div className="container-x pb-24 md:pb-7">
        <a
          href="/categories/accommodation"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#34474d] hover:text-[#39703b]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all stays
        </a>
      </div>
      <SiteFooter />
    </div>
  );
}

function getSafeExternalUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function normalizeFeature(value: string) {
  const normalized = value
    .trim()
    .toLocaleLowerCase()
    .replace(/[\s-]+/g, " ");
  if (/\bwi ?fi\b|wireless internet/.test(normalized)) return "Wi-Fi";
  if (/parking/.test(normalized)) return /secure/.test(normalized) ? "Secure parking" : "Parking";
  if (/pool/.test(normalized)) {
    if (/terrace|deck/.test(normalized)) return "Pool terrace";
    return "Swimming pool";
  }
  if (/breakfast/.test(normalized)) return "Breakfast";
  if (/air conditioning|aircon/.test(normalized)) return "Air conditioning";
  if (/restaurant|dining/.test(normalized)) return "Restaurant";
  if (/garden/.test(normalized)) return "Garden";
  return value.trim();
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}
