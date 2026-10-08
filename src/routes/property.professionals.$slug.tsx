import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";

import { PropertyNavigation, PropertyListingCard } from "@/components/PropertyMarketplace";
import { SiteFooter } from "@/components/SiteFooter";
import {
  findPropertyProfessionalBySlug,
  getPropertyContactHref,
  getPropertyListingsForProfessional,
  getPropertyProfessionalPath,
  getPropertyWhatsAppHref,
} from "@/lib/property";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

export const Route = createFileRoute("/property/professionals/$slug")({
  beforeLoad: ({ params }) => {
    if (!findPropertyProfessionalBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const professional = findPropertyProfessionalBySlug(params.slug);
    if (!professional) {
      return {
        meta: [
          { title: "Property professional not found | Discover by Lowveld Hub" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }
    const locality = professional.location ? ` in ${professional.location}` : " in Mpumalanga";
    const title = `${professional.name} | Property Professional${locality} | Discover`;
    const description =
      professional.description ??
      `View the published property professional profile for ${professional.name}${locality}.`;
    const canonical = getPublicUrl(getPropertyProfessionalPath(professional));
    const image = professional.image
      ? professional.image.startsWith("http")
        ? professional.image
        : getPublicUrl(professional.image)
      : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
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
  component: PropertyProfessionalPage,
});

function PropertyProfessionalPage() {
  const { slug } = Route.useParams();
  const professional = findPropertyProfessionalBySlug(slug);
  const { savedPropertyIds, toggleSavedProperty } = useSavedProperties();

  if (!professional) {
    return (
      <main className="container-x flex min-h-[55vh] flex-col items-start justify-center py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
          Property professionals
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-[#172a31]">
          Professional profile not found
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[#68767a]">
          This profile may have moved or is not currently published.
        </p>
        <a
          href="/property?view=professionals"
          className="mt-5 inline-flex min-h-11 items-center bg-[#17242b] px-4 text-sm font-semibold text-white"
        >
          Browse professionals
        </a>
      </main>
    );
  }

  const listings = getPropertyListingsForProfessional(professional);
  const phoneHref = getPropertyContactHref(professional.phone);
  const whatsappHref = getPropertyWhatsAppHref(professional.whatsapp);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": professional.profileType === "agent" ? "RealEstateAgent" : "RealEstateAgency",
    "@id": getPublicUrl(`${getPropertyProfessionalPath(professional)}#professional`),
    name: professional.name,
    url: getPublicUrl(getPropertyProfessionalPath(professional)),
    ...(professional.description ? { description: professional.description } : {}),
    ...(professional.image ? { image: professional.image } : {}),
    ...(professional.phone ? { telephone: professional.phone } : {}),
    ...(professional.email ? { email: professional.email } : {}),
    ...(professional.website ? { sameAs: [professional.website] } : {}),
    ...(professional.location || professional.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...(professional.address ? { streetAddress: professional.address } : {}),
            ...(professional.location ? { addressLocality: professional.location } : {}),
            addressRegion: "Mpumalanga",
            addressCountry: "ZA",
          },
        }
      : {}),
    ...(professional.latitude !== undefined && professional.longitude !== undefined
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: professional.latitude,
            longitude: professional.longitude,
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
          <a href="/property?view=professionals" className="hover:text-[#17242b]">
            Professionals
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{professional.name}</span>
        </nav>

        <section className="grid gap-6 border-b border-[#e5ebeb] pb-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="flex items-start gap-4">
            {professional.image && (
              <img
                src={professional.image}
                alt={professional.imageAlt ?? professional.name}
                fetchPriority="high"
                className="h-20 w-20 shrink-0 object-cover sm:h-24 sm:w-24"
              />
            )}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
                Property Professionals
              </p>
              <h1 className="mt-1 font-display text-3xl font-medium leading-tight sm:text-4xl">
                {professional.name}
              </h1>
              {professional.location && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#687378]">
                  <MapPin className="h-4 w-4" />
                  {professional.location}, Mpumalanga
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
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
                className="inline-flex min-h-11 items-center justify-center border border-[#dfe5e3] px-4 text-sm font-semibold"
              >
                WhatsApp
              </a>
            )}
            {professional.website && (
              <a
                href={professional.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-[#dfe5e3] px-4 text-sm font-semibold"
              >
                Website
              </a>
            )}
          </div>
        </section>

        {professional.description && (
          <section id="about" className="border-b border-[#e5ebeb] py-6">
            <h2 className="text-base font-semibold">About</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#5f6d72]">
              {professional.description}
            </p>
          </section>
        )}

        {professional.services?.length ? (
          <section id="services" className="border-b border-[#e5ebeb] py-6">
            <h2 className="text-base font-semibold">Services</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {professional.services.map((service) => (
                <li
                  key={service}
                  className="border border-[#e5ebeb] px-3 py-2 text-xs text-[#59656a]"
                >
                  {service}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section id="listings" className="border-b border-[#e5ebeb] py-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a7655]">
                Property listings
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium">
                Properties by this professional
              </h2>
            </div>
            {listings.length > 0 && (
              <span className="text-xs text-[#687378]">
                {listings.length} {listings.length === 1 ? "listing" : "listings"}
              </span>
            )}
          </div>
          {listings.length ? (
            <div className="mt-5 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <PropertyListingCard
                  key={listing.id}
                  listing={listing}
                  isSaved={savedPropertyIds.includes(listing.id)}
                  onToggleSaved={() => toggleSavedProperty(listing.id)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-[#687378]">
              No property listings are currently published for this professional.
            </p>
          )}
        </section>

        {(professional.location || professional.address) && (
          <section id="location" className="border-b border-[#e5ebeb] py-6">
            <h2 className="text-base font-semibold">Location</h2>
            <p className="mt-2 text-sm text-[#687378]">
              {[professional.address, professional.location, "Mpumalanga"]
                .filter(Boolean)
                .join(", ")}
            </p>
            {professional.latitude !== undefined && professional.longitude !== undefined && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${professional.latitude},${professional.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium underline underline-offset-4"
              >
                View on Google Maps
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </section>
        )}

        <section id="contact" className="py-6">
          <h2 className="text-base font-semibold">Contact</h2>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {phoneHref && (
              <a className="underline underline-offset-4" href={phoneHref}>
                Call
              </a>
            )}
            {whatsappHref && (
              <a
                className="underline underline-offset-4"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            )}
            {professional.email && (
              <a className="underline underline-offset-4" href={`mailto:${professional.email}`}>
                Email
              </a>
            )}
            {professional.website && (
              <a
                className="underline underline-offset-4"
                href={professional.website}
                target="_blank"
                rel="noreferrer"
              >
                Website
              </a>
            )}
            {!phoneHref && !whatsappHref && !professional.email && !professional.website && (
              <p className="text-sm text-[#687378]">No contact details are currently published.</p>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
