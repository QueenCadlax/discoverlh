import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingCard } from "@/components/CategoryDiscoveryPage";
import { SiteFooter } from "@/components/SiteFooter";
import {
  categoryConfigs,
  getBusinessSlug,
  getPublishedListingsInLocation,
} from "@/lib/category-discovery";
import { locationDiscovery, locationSlug } from "@/lib/location-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

function getLocation(nameOrSlug: string) {
  return locationDiscovery.find(
    (location) => locationSlug(location.name) === nameOrSlug || location.name === nameOrSlug,
  );
}

export const Route = createFileRoute("/locations/$location")({
  head: ({ params }) => {
    const location = getLocation(params.location);
    if (!location) {
      return {
        meta: [
          { title: "Location not found | Discover by Lowveld Hub" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }

    const listings = getPublishedListingsInLocation(location.name);
    const title = `Businesses in ${location.name} | Discover by Lowveld Hub`;
    const description = `Discover local businesses, services, restaurants, accommodation and more in ${location.name}, Mpumalanga.`;
    const canonical = getPublicUrl(`/locations/${locationSlug(location.name)}`);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: listings.length ? "index,follow" : "noindex,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: LocationBySlug,
});

function LocationBySlug() {
  const { location: locationParam } = Route.useParams();
  const location = getLocation(locationParam);

  if (!location) {
    return (
      <main className="container-x flex min-h-[60vh] flex-col items-start justify-center py-16">
        <h1 className="font-display text-3xl font-medium text-[#172a31]">Location not found</h1>
        <a href="/" className="mt-5 text-sm font-semibold text-[#17242b] underline">
          Return to Discover
        </a>
      </main>
    );
  }

  const listings = getPublishedListingsInLocation(location.name);
  const canonical = getPublicUrl(`/locations/${locationSlug(location.name)}`);
  const description = `Discover local businesses, services, restaurants, accommodation and more in ${location.name}, Mpumalanga.`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Businesses in ${location.name}`,
    description,
    ...(canonical ? { url: canonical } : {}),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: listings.length,
      itemListElement: listings.map(({ listing }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.name,
        url: getPublicUrl(`/business/${getBusinessSlug(listing)}`),
      })),
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#172a31]">
      <header className="border-b border-[#e5ebeb]">
        <div className="container-x flex h-[68px] items-center justify-between">
          <a href="/" className="text-sm font-semibold" aria-label="Discover by Lowveld Hub home">
            Discover <span className="font-normal text-[#68767a]">by Lowveld Hub</span>
          </a>
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#536267]"
          >
            <a href="/#categories" className="hover:text-[#172a31]">
              Browse categories
            </a>
            <a href="/business-network" className="hover:text-[#172a31]">
              Business Network
            </a>
          </nav>
        </div>
      </header>
      <main className="container-x py-5 md:py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#7d898d]">
          <a href="/" className="hover:text-[#172a31]">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-[#34474d]">
            {location.name}
          </span>
        </nav>
        <section className="border-b border-[#e5ebeb] py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#39703b]">
            Local discovery
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium text-[#172a31] sm:text-4xl">
            Businesses in {location.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68767a]">{description}</p>
        </section>
        <section className="py-6" aria-labelledby="location-results-title">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e5ebeb] pb-3">
            <h2 id="location-results-title" className="text-lg font-semibold">
              Local listings
            </h2>
            <p className="text-sm text-[#68767a]" aria-live="polite">
              {listings.length} {listings.length === 1 ? "business" : "businesses"}
            </p>
          </div>
          {listings.length ? (
            <div className="mt-5 grid gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">
              {listings.map(({ category, listing }) => (
                <CategoryListingCard
                  key={`${category}:${listing.id}`}
                  listing={listing}
                  config={categoryConfigs[category]}
                />
              ))}
            </div>
          ) : (
            <div className="py-8">
              <h3 className="font-semibold">No businesses listed in {location.name} yet.</h3>
              <p className="mt-1 text-sm text-[#68767a]">
                Try another town or browse categories while local businesses join.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <a href="/#categories" className="underline underline-offset-4">
                  Browse categories
                </a>
                <a href="/list-your-business" className="underline underline-offset-4">
                  List your business
                </a>
              </div>
            </div>
          )}
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
