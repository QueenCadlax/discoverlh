import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bath, BedDouble, Heart, MapPin } from "lucide-react";

import { PropertyNavigation } from "@/components/PropertyMarketplace";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SiteFooter } from "@/components/SiteFooter";
import { findPropertyListingBySlug, type PropertyListing } from "@/lib/category-discovery";
import {
  findPropertyProfessionalById,
  formatPropertyPrice,
  getPropertyContactHref,
  getPropertyProfessionalPath,
  getPropertyWhatsAppHref,
} from "@/lib/property";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

export const Route = createFileRoute("/property/$slug")({
  beforeLoad: ({ params }) => {
    if (!findPropertyListingBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const listing = findPropertyListingBySlug(params.slug);
    if (!listing) {
      return {
        meta: [
          { title: "Property listing not found | Discover by Lowveld Hub" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }
    const title = `${listing.name} | Property in ${listing.location ?? "Mpumalanga"} | Discover`;
    const description =
      listing.seoDescription ??
      listing.description ??
      `${listing.transactionType ?? "Property"} in ${listing.location ?? "Mpumalanga"}.`;
    const canonical = getPublicUrl(`/property/${params.slug}`);
    const image = listing.image
      ? listing.image.startsWith("http")
        ? listing.image
        : getPublicUrl(listing.image)
      : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        ...(image ? [{ property: "og:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(image ? [{ name: "twitter:image", content: image }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: PropertyListingPage,
});

function PropertyListingPage() {
  const { slug } = Route.useParams();
  const listing = findPropertyListingBySlug(slug);

  if (!listing) {
    return (
      <main className="container-x flex min-h-[55vh] flex-col items-start justify-center py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
          Property
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-[#172a31]">
          Property listing not found
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[#68767a]">
          This listing may have been removed or is not currently available.
        </p>
        <a
          href="/property"
          className="mt-5 inline-flex min-h-11 items-center bg-[#17242b] px-4 text-sm font-semibold text-white"
        >
          Browse Property
        </a>
      </main>
    );
  }

  return <PropertyListingDetails listing={listing} />;
}

function PropertyListingDetails({ listing }: { listing: PropertyListing }) {
  const images = listing.images?.length ? listing.images : listing.image ? [listing.image] : [];
  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { savedPropertyIds, toggleSavedProperty } = useSavedProperties();
  const agent = findPropertyProfessionalById(listing.agentId);
  const agency = findPropertyProfessionalById(listing.agencyId);
  const contact = agent ?? agency;
  const phoneHref = getPropertyContactHref(contact?.phone ?? listing.phone);
  const whatsappHref = getPropertyWhatsAppHref(contact?.whatsapp ?? listing.whatsapp);
  const email = contact?.email ?? listing.email;
  const website = contact?.website ?? listing.website;
  const location = [listing.address, listing.location, listing.province].filter(Boolean).join(", ");
  const price = formatPropertyPrice(listing.price, listing.currency);
  const facts = [
    listing.bedrooms !== undefined ? `${listing.bedrooms} bedrooms` : undefined,
    listing.bathrooms !== undefined ? `${listing.bathrooms} bathrooms` : undefined,
    listing.parking !== undefined ? `${listing.parking} parking` : undefined,
    listing.floorSize !== undefined ? `${listing.floorSize} m² floor area` : undefined,
    listing.erfSize !== undefined ? `${listing.erfSize} m² erf` : undefined,
  ].filter((fact): fact is string => Boolean(fact));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.name,
    url: getPublicUrl(`/property/${listing.slug ?? listing.id}`),
    ...(listing.description ? { description: listing.description } : {}),
    ...(images.length ? { image: images } : {}),
    ...(listing.createdAt ? { datePosted: listing.createdAt } : {}),
    ...(listing.price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: listing.price,
            priceCurrency: listing.currency ?? "ZAR",
            ...(listing.transactionType ? { category: listing.transactionType } : {}),
          },
        }
      : {}),
    ...(listing.location || listing.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...(listing.address ? { streetAddress: listing.address } : {}),
            ...(listing.location ? { addressLocality: listing.location } : {}),
            ...(listing.province ? { addressRegion: listing.province } : {}),
            addressCountry: "ZA",
          },
        }
      : {}),
    ...(listing.latitude !== undefined && listing.longitude !== undefined
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: listing.latitude,
            longitude: listing.longitude,
          },
        }
      : {}),
    ...(contact
      ? {
          seller: {
            "@type": contact.profileType === "agent" ? "RealEstateAgent" : "RealEstateAgency",
            name: contact.name,
            url: getPublicUrl(getPropertyProfessionalPath(contact)),
          },
        }
      : {}),
  };

  return (
    <div className="min-h-screen bg-white text-[#17242b]">
      <PropertyNavigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <main className="container-x pb-24 pt-5 md:pb-12 md:pt-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-xs text-[#788589]">
          <a href="/" className="hover:text-[#17242b]">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <a href="/property" className="hover:text-[#17242b]">
            Property
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{listing.name}</span>
        </nav>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(270px,0.65fr)] lg:gap-10">
          <div>
            <section aria-label="Property photos">
              {images.length ? (
                <div className="grid gap-2 sm:grid-cols-[1.4fr_0.6fr]">
                  <button
                    type="button"
                    onClick={() => setGalleryOpen(true)}
                    aria-label="Open property photo gallery"
                    className="relative aspect-[4/3] overflow-hidden bg-[#eef1ef] text-left"
                  >
                    <img
                      src={images[activeImage]}
                      alt={listing.imageAlts?.[activeImage] ?? listing.imageAlt ?? listing.name}
                      fetchPriority="high"
                      className="h-full w-full object-cover"
                    />
                    {listing.transactionType && (
                      <span className="absolute left-3 top-3 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em]">
                        {listing.transactionType}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-white/95 px-3 py-2 text-xs font-semibold">
                      View photos
                    </span>
                  </button>
                  {images.length > 1 ? (
                    <div className="hidden grid-rows-2 gap-2 sm:grid">
                      {images.slice(1, 3).map((image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => {
                            setActiveImage(index + 1);
                            setGalleryOpen(true);
                          }}
                          aria-label={`View property photo ${index + 2}`}
                          className="aspect-[4/3] overflow-hidden bg-[#eef1ef]"
                        >
                          <img
                            src={image}
                            alt={listing.imageAlts?.[index + 1] ?? listing.imageAlt ?? listing.name}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform hover:scale-[1.02]"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="hidden items-center justify-center border border-[#e5ebeb] text-xs text-[#687378] sm:flex">
                      {listing.propertyType ?? "Property"}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid aspect-[16/9] place-items-center bg-[#f1f3f1] text-sm text-[#687378]">
                  Images are not available for this listing.
                </div>
              )}
              <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
                <DialogContent className="max-w-[96vw] border-0 bg-transparent p-2 shadow-none sm:max-w-[96vw]">
                  <DialogTitle className="sr-only">{listing.name} photo gallery</DialogTitle>
                  <DialogDescription className="sr-only">
                    Photo {activeImage + 1} of {images.length}
                  </DialogDescription>
                  {images.length > 0 && (
                    <div className="relative">
                      <img
                        src={images[activeImage]}
                        alt={listing.imageAlts?.[activeImage] ?? listing.imageAlt ?? listing.name}
                        className="mx-auto max-h-[82vh] max-w-full object-contain"
                      />
                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label="Previous property photo"
                            onClick={() =>
                              setActiveImage((activeImage - 1 + images.length) % images.length)
                            }
                            className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white text-[#17242b]"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Next property photo"
                            onClick={() => setActiveImage((activeImage + 1) % images.length)}
                            className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white text-[#17242b]"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </section>

            <section className="border-b border-[#e5ebeb] py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a7655]">
                    {listing.transactionType ?? "Property"}
                    {listing.propertyType ? ` · ${listing.propertyType}` : ""}
                  </p>
                  <h1 className="mt-1 font-display text-3xl font-medium leading-tight sm:text-4xl">
                    {listing.name}
                  </h1>
                  {location && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-[#687378]">
                      <MapPin className="h-4 w-4" />
                      {location}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  aria-pressed={savedPropertyIds.includes(listing.id)}
                  aria-label={
                    savedPropertyIds.includes(listing.id)
                      ? "Remove this property from saved properties"
                      : "Save this property"
                  }
                  onClick={() => toggleSavedProperty(listing.id)}
                  className="grid h-10 w-10 shrink-0 place-items-center border border-[#dfe5e3] text-[#17242b] hover:border-[#8a7655]"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      savedPropertyIds.includes(listing.id) ? "fill-[#9b4b48] text-[#9b4b48]" : ""
                    }`}
                  />
                </button>
              </div>
              {price && <p className="mt-4 text-2xl font-semibold">{price}</p>}
              {facts.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#59656a]">
                  {listing.bedrooms !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="h-4 w-4" />
                      {listing.bedrooms} beds
                    </span>
                  )}
                  {listing.bathrooms !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Bath className="h-4 w-4" />
                      {listing.bathrooms} baths
                    </span>
                  )}
                  {listing.parking !== undefined && <span>{listing.parking} parking</span>}
                </div>
              )}
            </section>

            {listing.description && (
              <section id="about" className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">About this property</h2>
                <p className="mt-2 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#5f6d72]">
                  {listing.description}
                </p>
              </section>
            )}
            {facts.length > 0 && (
              <section id="details" className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">Property details</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {facts.map((fact) => (
                    <div key={fact} className="border border-[#e5ebeb] p-3">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#788589]">
                        {fact.split(" ").slice(-2).join(" ")}
                      </dt>
                      <dd className="mt-1 text-sm text-[#34474d]">{fact}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            {listing.features?.length ? (
              <section id="features" className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">Features</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {listing.features.map((feature) => (
                    <li
                      key={feature}
                      className="border border-[#e5ebeb] px-3 py-2 text-xs text-[#59656a]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(location || (listing.latitude !== undefined && listing.longitude !== undefined)) && (
              <section id="location" className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">Location</h2>
                {location && <p className="mt-2 text-sm text-[#68767a]">{location}</p>}
                {listing.latitude !== undefined && listing.longitude !== undefined && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium underline underline-offset-4"
                  >
                    View location on Google Maps
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </section>
            )}
            {contact && (
              <section id="professional" className="border-b border-[#e5ebeb] py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a7655]">
                  Listed by
                </p>
                <h2 className="mt-1 font-display text-xl font-medium">{contact.name}</h2>
                <a
                  href={getPropertyProfessionalPath(contact)}
                  className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium underline underline-offset-4"
                >
                  View professional
                  <ArrowRight className="h-4 w-4" />
                </a>
              </section>
            )}
          </div>

          <aside className="h-fit border-t border-[#e5ebeb] pt-5 lg:sticky lg:top-24 lg:border lg:p-5">
            <h2 className="text-base font-semibold">
              {contact ? `Contact ${contact.name}` : "Contact the listing professional"}
            </h2>
            {price && <p className="mt-2 text-xl font-semibold">{price}</p>}
            <div className="mt-4 grid gap-2">
              {phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex min-h-11 items-center justify-center bg-[#17242b] px-4 text-sm font-semibold text-white"
                >
                  Call
                </a>
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-[#dfe5e3] px-4 text-sm font-semibold text-[#17242b]"
                >
                  WhatsApp
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 items-center justify-center border border-[#dfe5e3] px-4 text-sm font-semibold text-[#17242b]"
                >
                  Email
                </a>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-[#dfe5e3] px-4 text-sm font-semibold text-[#17242b]"
                >
                  Website
                </a>
              )}
              {!phoneHref && !whatsappHref && !email && !website && (
                <p className="text-sm leading-6 text-[#687378]">
                  Contact details are not available for this listing.
                </p>
              )}
            </div>
            {agency && agency.id !== contact?.id && (
              <p className="mt-4 text-xs text-[#687378]">Agency: {agency.name}</p>
            )}
          </aside>
        </div>
      </main>
      {(phoneHref || whatsappHref) && (
        <nav
          aria-label="Contact listing professional"
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#e5ebeb] bg-white p-3 md:hidden"
        >
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex min-h-11 items-center justify-center bg-[#17242b] px-3 text-sm font-semibold text-white"
            >
              Call
            </a>
          )}
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-[#dfe5e3] px-3 text-sm font-semibold text-[#17242b]"
            >
              WhatsApp
            </a>
          )}
        </nav>
      )}
      <SiteFooter />
    </div>
  );
}
