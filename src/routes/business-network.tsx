import { createFileRoute } from "@tanstack/react-router";
import { Boxes, BriefcaseBusiness, Handshake, Store } from "lucide-react";

import { CategoryListingCard } from "@/components/CategoryDiscoveryPage";
import { SiteFooter } from "@/components/SiteFooter";
import {
  categoryConfigs,
  getCategoryListingPath,
  getPublishedCategoryListings,
  searchTextMatches,
  type BusinessNetworkConnectionType,
  type CategorySlug,
} from "@/lib/category-discovery";
import { mpumalangaLocations } from "@/lib/location-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

const connectionTypes: {
  value: BusinessNetworkConnectionType;
  label: string;
}[] = [
  { value: "supplier", label: "Suppliers" },
  { value: "business-services", label: "Business Services" },
  { value: "partnerships", label: "Partnerships" },
];

const title = "Business Network in Mpumalanga | Discover by Lowveld Hub";
const description =
  "Discover suppliers, professional service providers and potential business partners across Mpumalanga.";

export const Route = createFileRoute("/business-network")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
    type: connectionTypes.some((item) => item.value === search.type)
      ? (search.type as BusinessNetworkConnectionType)
      : undefined,
    location:
      typeof search.location === "string" &&
      (mpumalangaLocations as readonly string[]).includes(search.location)
        ? search.location
        : undefined,
    category:
      typeof search.category === "string" && search.category in categoryConfigs
        ? (search.category as CategorySlug)
        : undefined,
  }),
  head: ({ match }) => {
    const canonical = getPublicUrl("/business-network");
    const hasListings = getPublishedCategoryListings().some(
      ({ listing }) => (listing.businessNetworkTypes?.length ?? 0) > 0,
    );
    const hasFilters = Object.values(match.search).some(Boolean);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: !hasListings || hasFilters ? "noindex,follow" : "index,follow" },
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
  component: BusinessNetworkPage,
});

function BusinessNetworkPage() {
  const search = Route.useSearch();
  const networkListings = getPublishedCategoryListings().flatMap(({ category, listing }) =>
    listing.businessNetworkTypes?.length ? [{ category, listing }] : [],
  );
  const categories = [...new Set(networkListings.map(({ category }) => category))];
  const matchingListings = networkListings.filter(({ category, listing }) => {
    const searchable = [
      listing.name,
      listing.subcategory,
      categoryConfigs[category].label,
      listing.description,
      ...(listing.products ?? []),
      ...(listing.services ?? []),
    ]
      .filter(Boolean)
      .join(" ");
    return (
      (!search.q || searchTextMatches(searchable, search.q)) &&
      (!search.type || listing.businessNetworkTypes?.includes(search.type)) &&
      (!search.location || listing.location?.trim() === search.location) &&
      (!search.category || category === search.category)
    );
  });
  const canonical = getPublicUrl("/business-network");
  const structuredData = matchingListings.length
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Business Network in Mpumalanga",
        description,
        ...(canonical ? { url: canonical } : {}),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: matchingListings.length,
          itemListElement: matchingListings.map(({ category, listing }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: listing.name,
            url: getPublicUrl(getCategoryListingPath(category, listing)),
          })),
        },
      }
    : undefined;

  return (
    <div className="min-h-screen bg-white text-[#17242b]">
      <header className="border-b border-[#e5ebeb] bg-white">
        <div className="container-x flex min-h-[68px] flex-wrap items-center justify-between gap-3 py-3">
          <a href="/" className="flex items-center gap-2" aria-label="Discover by Lowveld Hub home">
            <img src="/logo%202.jpg" alt="" className="h-8 w-8 rounded-sm object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Discover</span>
              <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                by Lowveld Hub
              </span>
            </span>
          </a>
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#59656a] sm:gap-6 sm:text-sm"
          >
            <a href="/" className="hover:text-[#17242b]">
              Home
            </a>
            <a href="/#categories" className="hover:text-[#17242b]">
              Categories
            </a>
            <a
              href="/business-network"
              aria-current="page"
              className="font-semibold text-[#246e85]"
            >
              Business Network
            </a>
            <a href="/list-your-business" className="hover:text-[#17242b]">
              List Your Business
            </a>
          </nav>
        </div>
      </header>

      <main className="container-x py-7 md:py-10">
        <section className="border-b border-[#dce9ed] pb-6 md:pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#28718a]">
            Discover business connections
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-medium leading-tight text-[#17242b] sm:text-4xl">
            Find the right businesses to work with.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687378] sm:text-base">
            Discover suppliers, professional service providers and potential business partners
            across Mpumalanga.
          </p>
        </section>

        <section
          aria-label="Search the Business Network"
          className="border-b border-[#e5ebeb] py-5"
        >
          <form
            method="get"
            action="/business-network"
            className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_repeat(3,minmax(150px,0.34fr))_auto] lg:items-end"
          >
            <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-[#536267]">
              Search businesses
              <input
                type="search"
                name="q"
                defaultValue={search.q ?? ""}
                placeholder="Search suppliers, products or business services…"
                className="min-h-11 min-w-0 rounded-sm border border-[#dce4e5] px-3 text-sm font-normal text-[#17242b] outline-none focus:border-[#28718a]"
              />
            </label>
            <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-[#536267]">
              Connection type
              <select
                name="type"
                defaultValue={search.type ?? ""}
                className="min-h-11 min-w-0 rounded-sm border border-[#dce4e5] bg-white px-3 text-sm font-normal text-[#17242b] outline-none focus:border-[#28718a]"
              >
                <option value="">All connection types</option>
                {connectionTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-[#536267]">
              Town or area
              <select
                name="location"
                defaultValue={search.location ?? ""}
                className="min-h-11 min-w-0 rounded-sm border border-[#dce4e5] bg-white px-3 text-sm font-normal text-[#17242b] outline-none focus:border-[#28718a]"
              >
                <option value="">All Mpumalanga</option>
                {mpumalangaLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-[#536267]">
              Category or industry
              <select
                name="category"
                defaultValue={search.category ?? ""}
                className="min-h-11 min-w-0 rounded-sm border border-[#dce4e5] bg-white px-3 text-sm font-normal text-[#17242b] outline-none focus:border-[#28718a]"
              >
                <option value="">All industries</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {categoryConfigs[category].label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="min-h-11 rounded-sm bg-[#17242b] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
            >
              Search
            </button>
          </form>
          {Object.values(search).some(Boolean) && (
            <a
              href="/business-network"
              className="mt-3 inline-flex text-xs font-semibold text-[#536267] underline underline-offset-4"
            >
              Clear filters
            </a>
          )}
        </section>

        <section aria-labelledby="network-results-title" className="py-6 md:py-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e5ebeb] pb-3">
            <div>
              <h2 id="network-results-title" className="text-lg font-semibold text-[#17242b]">
                Business Network
              </h2>
              {networkListings.length > 0 && (
                <p className="mt-1 text-sm text-[#687378]">
                  {matchingListings.length} matching businesses
                </p>
              )}
            </div>
            <a
              href="/list-your-business"
              className="text-sm font-semibold text-[#28718a] underline underline-offset-4"
            >
              Join the network
            </a>
          </div>

          {matchingListings.length ? (
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
              {matchingListings.map(({ category, listing }) => (
                <CategoryListingCard
                  key={`${category}:${listing.id}`}
                  listing={listing}
                  config={categoryConfigs[category]}
                />
              ))}
            </div>
          ) : (
            <div className="border-b border-[#e5ebeb] py-8">
              <h3 className="font-semibold text-[#17242b]">
                {networkListings.length
                  ? "No businesses match these filters."
                  : "The Business Network is getting started."}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#687378]">
                {networkListings.length
                  ? "Try another search term, connection type or town."
                  : "There are no reviewed supplier, business-service or partnership listings yet. If your business serves other businesses, submit your details for review."}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                {networkListings.length > 0 && (
                  <a
                    href="/business-network"
                    className="text-[#536267] underline underline-offset-4"
                  >
                    Clear filters
                  </a>
                )}
                <a
                  href="/list-your-business"
                  className="inline-flex min-h-10 items-center rounded-sm bg-[#28718a] px-4 text-white"
                >
                  Join the Business Network
                </a>
              </div>
            </div>
          )}
        </section>
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
