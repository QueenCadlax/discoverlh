import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Coffee,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
  Truck,
  UtensilsCrossed,
  X,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { MpumalangaMap } from "@/components/MpumalangaMap";
import { SavedBusinessButton } from "@/components/SavedBusinessButton";
import {
  getListingOpenStatus,
  getBusinessSlug,
  type CategoryConfig,
  type CategoryListing,
} from "@/lib/category-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function RestaurantBusinessProfile({
  listing,
  config,
}: {
  listing: CategoryListing;
  config: CategoryConfig;
}) {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [liveOpenStatus, setLiveOpenStatus] = useState<boolean>();
  const profileRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const phoneHref = getPhoneHref(listing.phone, listing.country);
  const menuUrl = getSafeExternalUrl(listing.menuUrl);
  const orderingUrl = getSafeExternalUrl(listing.orderingUrl);
  const reservationUrl = getSafeExternalUrl(listing.bookingUrl);
  const website = getSafeExternalUrl(listing.website);
  const socialLinks = (listing.socialLinks ?? []).flatMap((link) => {
    const href = getSafeExternalUrl(link.href);
    return href ? [{ ...link, href }] : [];
  });
  const emailHref = listing.email ? `mailto:${listing.email}` : undefined;
  const restaurantProfile = listing.restaurantProfile;
  const fullAddress = [
    listing.address,
    listing.location,
    listing.province,
    listing.postalCode,
    listing.country,
  ]
    .filter(Boolean)
    .join(", ");
  const directionsQuery =
    Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude)
      ? `${listing.latitude},${listing.longitude}`
      : fullAddress;
  const directionsUrl =
    getSafeExternalUrl(listing.directionsUrl) ??
    (directionsQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(directionsQuery)}`
      : undefined);
  const images = [...new Set([listing.image, ...(listing.images ?? [])].filter(isString))];
  const profileUrl = getPublicUrl(`/business/${getBusinessSlug(listing)}`);
  const openingHours = Object.entries(listing.openingHours ?? {});
  const hoursSummary =
    restaurantProfile
      ? "See daily opening hours"
      : openingHours.length === 1 && openingHours[0][0].toLocaleLowerCase() === "daily"
      ? `${openingHours[0][1]} daily`
      : openingHours.map(([day, hours]) => `${day}: ${hours}`).join(" · ");
  const services = listing.services ?? [];
  const diningDetails = [
    ...(listing.cuisineTypes ?? (listing.cuisine ? [listing.cuisine] : [])),
    ...(listing.diningStyles ?? []),
    ...(listing.mealTypes ?? []),
  ];
  const schemaOpeningHours = openingHours.flatMap(([day, hours]) => {
    const normalizedHours = normalizeSchemaHours(hours);
    const schemaDay = schemaDays[day.trim().toLocaleLowerCase()];
    return day.trim().toLocaleLowerCase() === "daily"
      ? [`Mo-Su ${normalizedHours}`]
      : schemaDay
        ? [`${schemaDay} ${normalizedHours}`]
        : [];
  });
  useEffect(() => {
    if (listing.id !== "mugg-and-bean-crossing-centre") {
      setLiveOpenStatus(undefined);
      return;
    }
    const updateOpenStatus = () => setLiveOpenStatus(getListingOpenStatus(listing));
    updateOpenStatus();
    const intervalId = window.setInterval(updateOpenStatus, 60_000);
    return () => window.clearInterval(intervalId);
  }, [listing]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: listing.name,
    description: listing.description,
    url: profileUrl,
    ...(images.length ? { image: images } : {}),
    ...(phoneHref ? { telephone: listing.phone } : {}),
    ...(listing.email ? { email: listing.email } : {}),
    ...(website || socialLinks.length
      ? {
          sameAs: [
            ...(website ? [website] : []),
            ...socialLinks.map((link) => link.href),
          ],
        }
      : {}),
    ...(listing.address || listing.location
      ? {
          address: {
            "@type": "PostalAddress",
            ...(listing.address ? { streetAddress: listing.address } : {}),
            ...(listing.location ? { addressLocality: listing.location } : {}),
            ...(listing.province ? { addressRegion: listing.province } : {}),
            ...(listing.postalCode ? { postalCode: listing.postalCode } : {}),
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
    ...(listing.cuisineTypes?.length ? { servesCuisine: listing.cuisineTypes } : {}),
    ...(listing.menuUrl ? { hasMenu: listing.menuUrl } : {}),
    ...(reservationUrl
      ? {
          potentialAction: {
            "@type": "ReserveAction",
            target: reservationUrl,
          },
        }
      : {}),
    ...(schemaOpeningHours.length ? { openingHours: schemaOpeningHours } : {}),
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", url: getPublicUrl("/") },
      { name: config.label, url: getPublicUrl(`/categories/${config.slug}`) },
      { name: listing.name, url: profileUrl },
    ].flatMap(({ name, url }, index) =>
      url ? [{ "@type": "ListItem", position: index + 1, name, item: url }] : [],
    ),
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

  useEffect(() => {
    const updateVisibility = () => {
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? Infinity;
      setShowMobileActions(window.scrollY > 320 && footerTop > window.innerHeight);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    if (activeImage === null) return;
    const handleGalleryKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveImage((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveImage((current) => (current === null ? null : (current + 1) % images.length));
      }
    };
    window.addEventListener("keydown", handleGalleryKey);
    return () => window.removeEventListener("keydown", handleGalleryKey);
  }, [activeImage, images.length]);

  useEffect(() => {
    const sections = profileRef.current?.querySelectorAll<HTMLElement>("[data-profile-reveal]");
    if (!sections?.length) return;
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => (section.dataset.revealed = "true"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={profileRef} className="min-h-screen overflow-x-clip bg-white text-[#172a31]">
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
          <nav
            className="hidden items-center gap-6 text-sm text-[#68767a] md:flex"
            aria-label="Main navigation"
          >
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

      <main className="pb-24 md:pb-0">
        <div className="container-x pt-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#788589]"
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
        </div>

        <section
          data-profile-reveal
          data-scroll-reveal="true"
          data-revealed="false"
          className="container-x pt-5 md:pt-7"
        >
          <div className="grid overflow-hidden border border-[#e5ebeb] bg-[#f7f9f8] md:min-h-[390px] md:grid-cols-[0.88fr_1.12fr]">
            <div className="relative order-first min-h-[210px] overflow-hidden bg-[#dce7e8] md:order-last md:min-h-[390px]">
              {listing.image ? (
                <img
                  src={listing.image}
                  alt={listing.imageAlt ?? `${listing.name} in ${listing.location ?? "Mpumalanga"}`}
                  fetchPriority="high"
                  width={1800}
                  height={1100}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025] motion-reduce:transform-none"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#eef2f1,#dce7e8)]"
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
            </div>
            <div className="flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 md:px-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                {config.label}
                {listing.subcategory ? ` · ${listing.subcategory}` : ""}
              </p>
              <h1 className="mt-2 font-display text-4xl font-medium leading-[1.02] text-[#17242b] sm:text-5xl">
                {listing.name}
              </h1>
              {listing.diningStyles?.length ? (
                <p className="mt-2 text-sm font-medium text-[#536267]">
                  {listing.diningStyles.join(" · ")}
                </p>
              ) : null}
              <p className="mt-3 flex items-center gap-2 text-sm text-[#536267]">
                <MapPin className="h-4 w-4 shrink-0 text-[#28718a]" />
                {[listing.location, listing.province].filter(Boolean).join(", ")}
              </p>
              {listing.description && (
                <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-6 text-[#536267]">
                  {listing.description}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {orderingUrl && (
                  <ExternalAction
                    href={orderingUrl}
                    primary
                    newTab
                    icon={<ExternalLink className="h-4 w-4" />}
                  >
                    Order Online
                  </ExternalAction>
                )}
                {reservationUrl && (
                  <ExternalAction
                    href={reservationUrl}
                    light={Boolean(orderingUrl)}
                    primary={!orderingUrl}
                    newTab
                    icon={<CalendarDays className="h-4 w-4" />}
                  >
                    Reserve a Table
                  </ExternalAction>
                )}
                {menuUrl && (
                  <ExternalAction
                    href={menuUrl}
                    light={Boolean(reservationUrl || orderingUrl)}
                    primary={!reservationUrl && !orderingUrl}
                    newTab
                    icon={<UtensilsCrossed className="h-4 w-4" />}
                  >
                    View Menu
                  </ExternalAction>
                )}
                {phoneHref && (
                  <ExternalAction
                    href={`tel:${phoneHref}`}
                    light
                    icon={<Phone className="h-4 w-4" />}
                  >
                    Call
                  </ExternalAction>
                )}
                {directionsUrl && (
                  <ExternalAction
                    href={directionsUrl}
                    light
                    newTab
                    icon={<Navigation className="h-4 w-4" />}
                  >
                    Get Directions
                  </ExternalAction>
                )}
                {website && (
                  <ExternalAction href={website} light newTab icon={<Globe className="h-4 w-4" />}>
                    Website
                  </ExternalAction>
                )}
                {emailHref && (
                  <ExternalAction href={emailHref} light icon={<Mail className="h-4 w-4" />}>
                    Email
                  </ExternalAction>
                )}
                {listing.id === "mugg-and-bean-crossing-centre" && (
                  <SavedBusinessButton id={listing.id} name={listing.name} />
                )}
                {images.length > 0 && (
                  <a
                    href="#restaurant-photos"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#d7e0e0] bg-white px-3.5 text-xs font-semibold text-[#34474d] transition-colors hover:border-[#aac3ca] hover:bg-[#f7faf9] sm:text-sm"
                  >
                    View all photos
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {(hoursSummary || fullAddress || phoneHref || services.length > 0) && (
          <section
            data-profile-reveal
            data-scroll-reveal="true"
            data-revealed="false"
            className="container-x grid border-b border-[#e5ebeb] sm:grid-cols-2 lg:grid-cols-4"
          >
            {hoursSummary && (
              <InfoPanel icon={<Clock3 className="h-4 w-4" />} eyebrow="Opening hours">
                <p>{hoursSummary}</p>
                {listing.id === "mugg-and-bean-crossing-centre" &&
                  typeof liveOpenStatus === "boolean" && (
                    <p
                      className={`mt-1 font-semibold ${liveOpenStatus ? "text-[#287247]" : "text-[#687378]"}`}
                      role="status"
                    >
                      {liveOpenStatus ? "Open now" : "Closed now"} · South African local time
                    </p>
                  )}
              </InfoPanel>
            )}
            {fullAddress && (
              <InfoPanel icon={<MapPin className="h-4 w-4" />} eyebrow="Location">
                <p>{fullAddress}</p>
              </InfoPanel>
            )}
            {phoneHref && (
              <InfoPanel icon={<Phone className="h-4 w-4" />} eyebrow="Phone">
                <a
                  href={`tel:${phoneHref}`}
                  className="underline decoration-[#b7c8cc] underline-offset-4 hover:text-[#246e85]"
                >
                  {listing.phone}
                </a>
              </InfoPanel>
            )}
            {services.length > 0 && (
              <InfoPanel icon={<Truck className="h-4 w-4" />} eyebrow="Service options">
                <p>{services.join(" · ")}</p>
                {listing.deliveryAvailable && <p>Delivery available</p>}
              </InfoPanel>
            )}
          </section>
        )}
        {!restaurantProfile &&
          Number.isFinite(listing.latitude) &&
          Number.isFinite(listing.longitude) && (
          <section className="container-x py-8 md:py-10">
            <MpumalangaMap
              places={[
                {
                  name: listing.name,
                  latitude: Number(listing.latitude),
                  longitude: Number(listing.longitude),
                  description: listing.address,
                  href: website,
                  locationAccuracy: listing.locationAccuracy,
                },
              ]}
              heading="Find Pappas Kitchen"
              description={fullAddress}
              placeLabel="restaurant"
              placesLabel="restaurants"
            />
          </section>
          )}

        <section className="container-x flex flex-wrap items-center justify-between gap-3 border-b border-[#e5ebeb] py-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <button
              type="button"
              onClick={shareOnWhatsApp}
              className="inline-flex min-h-10 items-center gap-1 text-xs font-medium text-[#536267] hover:text-[#246e85]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Share on WhatsApp
            </button>
            <button
              type="button"
              onClick={shareProfile}
              className="inline-flex min-h-10 items-center gap-1 text-xs font-medium text-[#536267] hover:text-[#246e85]"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            {shareStatus && (
              <span role="status" className="sr-only">
                {shareStatus}
              </span>
            )}
          </div>
        </section>

        {!restaurantProfile && (menuUrl || diningDetails.length > 0) && (
          <section
            data-profile-reveal
            data-scroll-reveal="true"
            data-revealed="false"
            className="container-x py-10 md:py-14"
          >
            <div className="max-w-3xl py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                {menuUrl ? "The menu" : "Dining details"}
              </p>
              <h2 className="mt-2 max-w-xl font-display text-3xl font-medium leading-tight text-[#17242b] sm:text-4xl">
                {menuUrl ? `A taste of ${listing.name}` : `Dining at ${listing.name}`}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#687378]">
                {menuUrl
                  ? "Explore the restaurant's cuisine profile, then visit its official menu for current dishes and details."
                  : "Explore the cuisine and dining details provided for this restaurant."}
              </p>
              {diningDetails.length > 0 && (
                <div className="mt-5 border-y border-[#e5ebeb] py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#687378]">
                    Cuisine profile
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#34474d]">
                    {[...new Set(diningDetails)].join(" · ")}
                  </p>
                  <p className="mt-1 text-xs text-[#687378]">
                    Cuisine descriptors, not a menu listing.
                  </p>
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                {menuUrl && (
                  <ExternalAction
                    href={menuUrl}
                    primary
                    newTab
                    icon={<UtensilsCrossed className="h-4 w-4" />}
                  >
                    View Full Menu
                  </ExternalAction>
                )}
              </div>
            </div>
          </section>
        )}

        {images.length > 0 && (
          <section
            id="restaurant-photos"
            data-profile-reveal
            data-scroll-reveal="true"
            data-revealed="false"
            className="bg-[#f7f9fa] py-9 md:py-12"
          >
            <div className="container-x">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                    Photos
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-medium text-[#17242b] sm:text-3xl">
                    A closer look at {listing.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveImage(0)}
                  className="inline-flex min-h-10 items-center gap-2 border border-[#d7e0e0] bg-white px-3.5 text-xs font-semibold text-[#34474d] transition-colors hover:border-[#aac3ca] hover:bg-[#f7faf9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a]"
                >
                  View all photos <span className="text-[#687378]">({images.length})</span>
                </button>
              </div>
              <div className="mt-5 grid auto-cols-[82%] grid-flow-col snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:h-[420px] md:grid-flow-row md:grid-cols-[minmax(0,1.6fr)_minmax(180px,0.8fr)] md:grid-rows-3 md:overflow-visible">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View photo ${index + 1}: ${listing.imageAlts?.[index] ?? listing.name}`}
                    className={`group relative h-60 min-w-0 snap-center overflow-hidden bg-[#e9eff2] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] md:h-full ${index === 0 ? "md:row-span-3" : index === 1 ? "md:col-start-2 md:row-start-1" : index === 2 ? "md:col-start-2 md:row-start-2" : "md:col-start-2 md:row-start-3"}`}
                  >
                    <img
                      src={image}
                      alt={listing.imageAlts?.[index] ?? `${listing.name} photo ${index + 1}`}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="h-full w-full object-cover transition-[transform,filter] duration-500 group-hover:scale-[1.035] group-hover:brightness-105 motion-reduce:transform-none"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      View photo
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {(listing.description || listing.cuisine || listing.cuisineTypes?.length) && (
          <section
            data-profile-reveal
            data-scroll-reveal="true"
            data-revealed="false"
            className="border-y border-[#e5ebeb] bg-white py-9 md:py-12"
          >
            <div className="container-x grid gap-4 md:grid-cols-[0.35fr_1fr] md:gap-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                About
              </p>
              <div className="max-w-3xl">
                <h2 className="font-display text-2xl font-medium text-[#17242b] sm:text-3xl">
                  {restaurantProfile?.storyHeading ?? `About ${listing.name}`}
                </h2>
                {restaurantProfile
                  ? restaurantProfile.story.map((paragraph) => (
                      <p key={paragraph} className="mt-3 text-sm leading-7 text-[#5f6d72]">
                        {paragraph}
                      </p>
                    ))
                  : listing.description && (
                  <p className="mt-3 text-sm leading-7 text-[#5f6d72]">{listing.description}</p>
                    )}
                {(listing.cuisine || listing.cuisineTypes?.length) && (
                  <p className="mt-4 text-xs font-medium text-[#536267]">
                    {listing.cuisineTypes?.join(" · ") ?? listing.cuisine}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {restaurantProfile && (
          <>
            <section
              data-profile-reveal
              data-scroll-reveal="true"
              data-revealed="false"
              className="container-x py-10 md:py-14"
            >
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                  {restaurantProfile.experienceEyebrow ?? `Dining at ${listing.name}`}
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium text-[#17242b] sm:text-4xl">
                  {restaurantProfile.experienceHeading ?? `The ${listing.name} Experience`}
                </h2>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {restaurantProfile.experienceHighlights.map((highlight, index) => {
                  const Icon = index === 1 || index === 3 ? Coffee : UtensilsCrossed;
                  return (
                    <article
                      key={highlight.title}
                      className="border border-[#e5ebeb] bg-white p-5 sm:p-6"
                    >
                      <Icon aria-hidden="true" className="h-5 w-5 text-[#8a7655]" />
                      <h3 className="mt-4 font-display text-xl font-medium text-[#17242b]">
                        {highlight.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#687378]">
                        {highlight.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {restaurantProfile.menuLinks.length > 0 && (
              <section
                id="restaurant-menu"
                data-profile-reveal
                data-scroll-reveal="true"
                data-revealed="false"
                className="bg-[#f7f9f8] py-10 md:py-14"
              >
                <div className="container-x">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                    Official menus
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium text-[#17242b] sm:text-4xl">
                    Explore the menu
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687378]">
                    {restaurantProfile.menuIntroduction ??
                      `Visit ${listing.name}'s official menu pages for current dishes and details.`}
                  </p>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {restaurantProfile.menuLinks.map((menu) => {
                      const href = getSafeExternalUrl(menu.href);
                      if (!href) return null;
                      return (
                        <a
                          key={menu.label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex min-h-28 items-center justify-between gap-4 border border-[#e0e7e5] bg-white p-5 transition-colors hover:border-[#bdcbc7] sm:p-6"
                        >
                          <span>
                            <span className="block font-display text-xl font-medium text-[#17242b]">
                              {menu.label}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-[#687378]">
                              {menu.description}
                            </span>
                          </span>
                          <ExternalLink
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-[#8a7655] transition-transform group-hover:translate-x-0.5"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {restaurantProfile.recognition?.length ? (
              <section className="container-x border-b border-[#e5ebeb] py-9 md:py-11">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                  Brand recognition
                </p>
                <h2 className="mt-2 font-display text-2xl font-medium text-[#17242b] sm:text-3xl">
                  Recognition
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {restaurantProfile.recognition.map((item) => (
                    <li
                      key={item}
                      className="border border-[#e5ebeb] bg-[#fbfcfb] px-3 py-2 text-sm text-[#536267]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {listing.amenities?.length ? (
              <section className="container-x py-10 md:py-14">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                  At a glance
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium text-[#17242b] sm:text-4xl">
                  Amenities
                </h2>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                  {listing.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-2 text-sm text-[#536267]">
                      <span aria-hidden="true" className="mt-0.5 text-[#8a7655]">
                        ·
                      </span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {openingHours.length > 0 && (
              <section className="bg-[#f7f9f8] py-10 md:py-14">
                <div className="container-x grid gap-6 md:grid-cols-[0.7fr_1fr] md:gap-12">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                      Plan your visit
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-medium text-[#17242b] sm:text-4xl">
                      Opening hours
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#687378]">
                      Official opening hours for {listing.name}.
                    </p>
                  </div>
                  <dl className="divide-y divide-[#e1e8e6] border-y border-[#e1e8e6] bg-white px-4 sm:px-5">
                    {openingHours.map(([day, hours]) => (
                      <div
                        key={day}
                        className="flex min-h-12 items-center justify-between gap-4 py-2 text-sm"
                      >
                        <dt className="font-medium text-[#34474d]">{day}</dt>
                        <dd className="text-right text-[#687378]">{hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>
            )}

            {restaurantProfile.celebrationTypes?.length ? (
              <section className="container-x py-10 md:py-14">
                <div className="grid items-center gap-6 border border-[#e5ebeb] bg-white p-5 sm:p-8 md:grid-cols-[1fr_auto] md:p-10">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                      Gather around the table
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-medium text-[#17242b] sm:text-4xl">
                      Make It A Celebration
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#687378]">
                      Turn 'n Tender welcomes celebrations and special occasions.
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#536267]">
                      {restaurantProfile.celebrationTypes.map((occasion) => (
                        <li key={occasion}>{occasion}</li>
                      ))}
                    </ul>
                  </div>
                  {reservationUrl && (
                    <ExternalAction
                      href={reservationUrl}
                      primary
                      newTab
                      icon={<CalendarDays className="h-4 w-4" />}
                    >
                      Reserve Your Table
                    </ExternalAction>
                  )}
                </div>
              </section>
            ) : null}

            <section className="bg-[#f7f9f8] py-10 md:py-14">
              <div className="container-x grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                    Location & contact
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium text-[#17242b] sm:text-4xl">
                    Find {listing.name}
                  </h2>
                  <address className="mt-4 not-italic text-sm leading-6 text-[#536267]">
                    {listing.address}
                    <br />
                    {listing.location}, {listing.province} {listing.postalCode}
                    <br />
                    {listing.country}
                  </address>
                  <div className="mt-5 grid gap-2 text-sm">
                    {phoneHref && (
                      <a className="text-[#34474d] underline decoration-[#b7c8cc] underline-offset-4" href={`tel:${phoneHref}`}>
                        {listing.phone}
                      </a>
                    )}
                    {emailHref && (
                      <a className="break-all text-[#34474d] underline decoration-[#b7c8cc] underline-offset-4" href={emailHref}>
                        {listing.email}
                      </a>
                    )}
                    {website && (
                      <a
                        className="text-[#34474d] underline decoration-[#b7c8cc] underline-offset-4"
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Official website
                      </a>
                    )}
                  </div>
                  {socialLinks.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold">
                      {socialLinks.map((link) => (
                        <a
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#536267] underline decoration-[#c7d0d2] underline-offset-4 hover:text-[#28718a]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {orderingUrl && (
                      <ExternalAction
                        href={orderingUrl}
                        primary
                        newTab
                        icon={<ExternalLink className="h-4 w-4" />}
                      >
                        Order Online
                      </ExternalAction>
                    )}
                    {menuUrl && (
                      <ExternalAction
                        href={menuUrl}
                        light
                        newTab
                        icon={<UtensilsCrossed className="h-4 w-4" />}
                      >
                        View Menu
                      </ExternalAction>
                    )}
                    {directionsUrl && (
                      <ExternalAction
                        href={directionsUrl}
                        light={!orderingUrl}
                        newTab
                        icon={<Navigation className="h-4 w-4" />}
                      >
                        Get Directions
                      </ExternalAction>
                    )}
                    {reservationUrl && (
                      <ExternalAction
                        href={reservationUrl}
                        primary
                        newTab
                        icon={<CalendarDays className="h-4 w-4" />}
                      >
                        Reserve a Table
                      </ExternalAction>
                    )}
                  </div>
                </div>
                {Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude) ? (
                  <MpumalangaMap
                    places={[
                      {
                        name: listing.name,
                        latitude: Number(listing.latitude),
                        longitude: Number(listing.longitude),
                        description: fullAddress,
                        href: directionsUrl,
                        locationAccuracy: listing.locationAccuracy,
                      },
                    ]}
                    heading={`Find ${listing.name}`}
                    description={fullAddress}
                    placeLabel="restaurant"
                    placesLabel="restaurants"
                  />
                ) : (
                  <iframe
                    title={`Map to ${listing.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${listing.name}, ${fullAddress}`)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-72 w-full border border-[#e1e8e6] bg-[#e8eeec] md:h-96"
                  />
                )}
              </div>
            </section>
          </>
        )}

        {!restaurantProfile && (menuUrl || phoneHref || directionsUrl || website) && (
          <section
            data-profile-reveal
            data-scroll-reveal="true"
            data-revealed="false"
            className="bg-[#f0f6f9] py-9 md:py-12"
          >
            <div className="container-x flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                  {listing.name}
                </p>
                <h2 className="mt-1 font-display text-2xl font-medium text-[#17242b] sm:text-3xl">
                  {directionsUrl ? "Plan your visit" : "Get in touch"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#687378]">
                  {menuUrl
                    ? `View the current menu${listing.location ? ` or get directions to ${listing.location}` : ""}.`
                    : directionsUrl
                      ? `Find ${listing.name}${listing.location ? ` in ${listing.location}` : ""}.`
                      : `Contact ${listing.name} directly.`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {menuUrl && (
                  <ExternalAction
                    href={menuUrl}
                    primary
                    newTab
                    icon={<UtensilsCrossed className="h-4 w-4" />}
                  >
                    View Menu
                  </ExternalAction>
                )}
                {phoneHref && (
                  <ExternalAction
                    href={`tel:${phoneHref}`}
                    light
                    icon={<Phone className="h-4 w-4" />}
                  >
                    Call {listing.name}
                  </ExternalAction>
                )}
                {directionsUrl && (
                  <ExternalAction
                    href={directionsUrl}
                    light
                    newTab
                    icon={<Navigation className="h-4 w-4" />}
                  >
                    Get Directions
                  </ExternalAction>
                )}
                {website && (
                  <ExternalAction
                    href={website}
                    light
                    newTab
                    icon={<ExternalLink className="h-4 w-4" />}
                  >
                    Visit Website
                  </ExternalAction>
                )}
              </div>
            </div>
          </section>
        )}
        <section className="border-t border-[#e5ebeb] bg-[#f8faf9] py-9 md:py-12">
          <div className="container-x flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#28718a]">
                Discover by Lowveld Hub
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium text-[#17242b] sm:text-3xl">
                Discover more in Mpumalanga
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#687378]">
                Find more places, businesses and experiences across the region.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/categories/food-dining"
                className="inline-flex min-h-11 items-center gap-2 bg-[#17242b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
              >
                Explore Food &amp; Dining
              </a>
              <a
                href="/#categories"
                className="inline-flex min-h-11 items-center gap-2 border border-[#d7e0e0] bg-white px-4 text-sm font-semibold text-[#34474d] transition-colors hover:border-[#aac3ca] hover:bg-[#f7faf9]"
              >
                Explore Discover
              </a>
            </div>
          </div>
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

      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 gap-2 border-t border-[#dce4e5] bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_28px_-18px_rgba(23,36,43,.28)] backdrop-blur-md transition-transform duration-300 md:hidden ${showMobileActions ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
        role="group"
        aria-label="Quick restaurant actions"
      >
        {orderingUrl ? (
          <a
            href={orderingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm bg-[#17242b] px-2 text-xs font-semibold text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Order
          </a>
        ) : reservationUrl ? (
          <a
            href={reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm bg-[#17242b] px-2 text-xs font-semibold text-white"
          >
            <CalendarDays className="h-3.5 w-3.5" /> Reserve
          </a>
        ) : menuUrl ? (
          <a
            href={menuUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm bg-[#17242b] px-2 text-xs font-semibold text-white"
          >
            <UtensilsCrossed className="h-3.5 w-3.5" /> Menu
          </a>
        ) : null}
        {phoneHref && (
          <a
            href={`tel:${phoneHref}`}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-[#dce4e5] px-2 text-xs font-semibold text-[#34474d]"
          >
            <Phone className="h-3.5 w-3.5" /> Call
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
        {(reservationUrl || orderingUrl) && menuUrl ? (
          <a
            href={menuUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-[#dce4e5] px-2 text-xs font-semibold text-[#34474d]"
          >
            <UtensilsCrossed className="h-3.5 w-3.5" /> Menu
          </a>
        ) : website && !reservationUrl && !orderingUrl ? (
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-[#dce4e5] px-2 text-xs font-semibold text-[#34474d]"
          >
            <Globe className="h-3.5 w-3.5" /> Website
          </a>
        ) : null}
      </div>

      <Dialog open={activeImage !== null} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent
          className="[&>button]:hidden max-w-5xl border-0 bg-[#101d28] p-2 text-white sm:p-3"
          aria-describedby="gallery-description"
        >
          <DialogTitle className="sr-only">
            {activeImage === null
              ? "Restaurant photo"
              : (listing.imageAlts?.[activeImage] ?? `${listing.name} photo`)}
          </DialogTitle>
          <DialogDescription id="gallery-description" className="sr-only">
            Photo {activeImage === null ? "" : activeImage + 1} of {images.length}. Use the arrow
            keys to browse photos.
          </DialogDescription>
          {activeImage !== null && images[activeImage] && (
            <div
              className="relative"
              onTouchStart={(event) => {
                touchStartX.current = event.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const startX = touchStartX.current;
                const endX = event.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (startX == null || endX == null || Math.abs(endX - startX) < 40) return;
                setActiveImage((current) =>
                  current === null
                    ? null
                    : (current + (endX < startX ? 1 : -1) + images.length) % images.length,
                );
              }}
            >
              <img
                src={images[activeImage]}
                alt={listing.imageAlts?.[activeImage] ?? `${listing.name} photo ${activeImage + 1}`}
                className="max-h-[82vh] w-full rounded-sm object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveImage((activeImage + 1) % images.length)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 text-xs text-white">
                {activeImage + 1} / {images.length}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close photo viewer"
            className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogContent>
      </Dialog>
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

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function getPhoneHref(value?: string, country?: string) {
  if (!value) return undefined;
  const normalized = value.replace(/[^\d+]/g, "");
  if (normalized.startsWith("+")) return normalized;
  const digits = normalized.replace(/\D/g, "");
  if (country === "South Africa" && digits.startsWith("0")) return `+27${digits.slice(1)}`;
  if (digits.startsWith("27")) return `+${digits}`;
  return normalized;
}

const schemaDays: Record<string, string> = {
  monday: "Mo",
  tuesday: "Tu",
  wednesday: "We",
  thursday: "Th",
  friday: "Fr",
  saturday: "Sa",
  sunday: "Su",
};

function normalizeSchemaHours(value: string) {
  const twelveHourRange = value.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–—-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i,
  );
  if (!twelveHourRange) return value.replace(/[–—]/g, "-").replace(/\s+/g, "");
  const [, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod] =
    twelveHourRange;
  return `${toTwentyFourHourTime(startHour, startMinute, startPeriod)}-${toTwentyFourHourTime(endHour, endMinute, endPeriod)}`;
}

function toTwentyFourHourTime(hour: string, minute: string, period: string) {
  const numericHour = Number(hour) % 12;
  const adjustedHour = period.toUpperCase() === "PM" ? numericHour + 12 : numericHour;
  return `${String(adjustedHour).padStart(2, "0")}:${minute}`;
}

function InfoPanel({
  eyebrow,
  icon,
  children,
}: {
  eyebrow: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="min-h-[112px] px-3 py-4 transition-colors duration-200 hover:bg-[#f8faf9] sm:px-4">
      <div className="flex items-center gap-2 text-[#28718a]">
        {icon}
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{eyebrow}</p>
      </div>
      <div className="mt-3 text-sm leading-5 text-[#34474d] [&>p+p]:mt-0.5">{children}</div>
    </article>
  );
}

function ExternalAction({
  href,
  children,
  icon,
  primary = false,
  light = false,
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  primary?: boolean;
  light?: boolean;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-3.5 text-xs font-semibold transition-[transform,box-shadow,background-color,color,border-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:text-sm ${primary ? "border-[#68b6d1] bg-[#68b6d1] text-[#102a39] shadow-sm hover:border-[#82c4da] hover:bg-[#82c4da] hover:shadow-md" : light ? "border-[#d7e0e0] bg-white text-[#34474d] hover:border-[#aac3ca] hover:bg-[#f7faf9]" : "border-white/55 bg-white/10 text-white hover:bg-white/20"}`}
    >
      {icon}
      {children}
      {primary && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}
