import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingCard } from "@/components/CategoryDiscoveryPage";
import { SiteFooter } from "@/components/SiteFooter";
import {
  categoryConfigs,
  getCanonicalCategorySlug,
  getCategoryListingPath,
  getPublishedListingsInLocation,
  type CategorySlug,
} from "@/lib/category-discovery";
import { findDiscoveryLocation, locationDiscovery, locationSlug } from "@/lib/location-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

function getCategoryListings(locationName: string, category?: CategorySlug) {
  const listings = getPublishedListingsInLocation(locationName);
  return category
    ? listings.filter(
        ({ category: listingCategory, listing }) =>
          getCanonicalCategorySlug(listingCategory) === category ||
          listing.additionalCategorySlugs?.some(
            (slug) => getCanonicalCategorySlug(slug) === category,
          ),
      )
    : listings;
}

function getLocationPath(locationSlugValue: string, category?: CategorySlug) {
  const canonicalCategory = category ? getCanonicalCategorySlug(category) : undefined;
  const search = canonicalCategory ? `?category=${encodeURIComponent(canonicalCategory)}` : "";
  return `/locations/${locationSlugValue}${search}`;
}

function getLocationPageSeo(
  location: NonNullable<ReturnType<typeof findDiscoveryLocation>>,
  category?: CategorySlug,
) {
  const config = category ? categoryConfigs[category] : undefined;
  return {
    config,
    title: config ? `${config.label} in ${location.name}` : `Businesses in ${location.name}`,
    description: config
      ? `Explore currently listed ${config.label.toLocaleLowerCase()} in ${location.name}, ${location.province}. ${location.introduction}`
      : location.seoDescription,
    canonicalPath: getLocationPath(location.slug, category),
  };
}

export const Route = createFileRoute("/locations/$location")({
  validateSearch: (search: Record<string, unknown>) => ({
    category:
      typeof search.category === "string" && search.category in categoryConfigs
        ? getCanonicalCategorySlug(search.category as CategorySlug)
        : undefined,
  }),
  head: ({ params, match }) => {
    const location = findDiscoveryLocation(params.location);
    if (!location) {
      return {
        meta: [
          { title: "Location not found | Discover by Lowveld Hub" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }

    const category = match.search.category;
    const listings = getCategoryListings(location.name, category);
    const seo = getLocationPageSeo(location, category);
    const title = category ? `${seo.title} | Discover by Lowveld Hub` : location.seoTitle;
    const canonical = getPublicUrl(seo.canonicalPath);
    const socialImage = location.image;
    const isIndexable =
      listings.length > 0 || (location.indexability === "always" && category === undefined);

    return {
      meta: [
        { title },
        { name: "description", content: seo.description },
        { name: "robots", content: isIndexable ? "index,follow" : "noindex,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        { property: "og:image", content: socialImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: socialImage },
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: LocationBySlug,
});

function LocationBySlug() {
  const { location: locationParam } = Route.useParams();
  const { category } = Route.useSearch();
  const location = findDiscoveryLocation(locationParam);

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

  const allListings = getPublishedListingsInLocation(location.name);
  const listings = getCategoryListings(location.name, category);
  const listedCategories = new Set(
    allListings.map(({ category: slug }) => getCanonicalCategorySlug(slug)),
  );
  const categorySlugs = [
    ...new Set([
      ...location.relevantCategorySlugs
        .map(getCanonicalCategorySlug)
        .filter((slug) => listedCategories.has(slug)),
      ...listedCategories,
    ]),
  ];
  const seo = getLocationPageSeo(location, category);
  const { config, title } = seo;
  const description = config ? seo.description : location.introduction;
  const canonical = getPublicUrl(seo.canonicalPath);
  const nearbyLocations = location.nearbyLocations.flatMap((nearbyName) => {
    const nearby = locationDiscovery.find(({ name }) => name === nearbyName);
    return nearby && getPublishedListingsInLocation(nearby.name).length > 0 ? [nearby] : [];
  });
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    ...(canonical ? { url: canonical } : {}),
    about: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.province,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: getPublicUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: location.name,
          item: getPublicUrl(getLocationPath(location.slug)),
        },
        ...(config
          ? [{ "@type": "ListItem", position: 3, name: config.label, item: canonical }]
          : []),
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: listings.length,
      itemListElement: listings.map(({ category: listingCategory, listing }, index) => {
        return {
          "@type": "ListItem",
          position: index + 1,
          name: listing.name,
          url: getPublicUrl(getCategoryListingPath(listingCategory, listing)),
        };
      }),
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
          {config ? (
            <>
              <a href={getLocationPath(location.slug)} className="hover:text-[#172a31]">
                {location.name}
              </a>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="font-medium text-[#34474d]">
                {config.label}
              </span>
            </>
          ) : (
            <span aria-current="page" className="font-medium text-[#34474d]">
              {location.name}
            </span>
          )}
        </nav>
        <section className="border-b border-[#e5ebeb] py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#39703b]">
            Local discovery · {location.province}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium text-[#172a31] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68767a]">{description}</p>
        </section>
        {categorySlugs.length > 0 && (
          <nav aria-label={`Categories in ${location.name}`} className="flex flex-wrap gap-2 py-4">
            <a
              href={getLocationPath(location.slug)}
              aria-current={category ? undefined : "page"}
              className={`rounded-sm border px-3 py-2 text-xs font-semibold ${
                category
                  ? "border-[#dce4e5] text-[#536267]"
                  : "border-[#17242b] bg-[#17242b] text-white"
              }`}
            >
              All listings
            </a>
            {categorySlugs.map((slug) => (
              <a
                key={slug}
                href={getLocationPath(location.slug, slug)}
                aria-current={category === slug ? "page" : undefined}
                className={`rounded-sm border px-3 py-2 text-xs font-semibold ${
                  category === slug
                    ? "border-[#17242b] bg-[#17242b] text-white"
                    : "border-[#dce4e5] text-[#536267]"
                }`}
              >
                {categoryConfigs[slug].label}
              </a>
            ))}
          </nav>
        )}
        <section className="py-6" aria-labelledby="location-results-title">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e5ebeb] pb-3">
            <h2 id="location-results-title" className="text-lg font-semibold">
              {config
                ? `${config.label} in ${location.name}`
                : `Local listings in ${location.name}`}
            </h2>
            <p className="text-sm text-[#68767a]" aria-live="polite">
              {listings.length} {listings.length === 1 ? "listing" : "listings"}
            </p>
          </div>
          {listings.length ? (
            <div className="mt-5 grid gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">
              {listings.map(({ category: listingCategory, listing }) => (
                <CategoryListingCard
                  key={`${listingCategory}:${listing.id}`}
                  listing={listing}
                  config={categoryConfigs[listingCategory]}
                />
              ))}
            </div>
          ) : (
            <div className="py-8">
              <h3 className="font-semibold">
                No {config ? `${config.label.toLocaleLowerCase()} ` : ""}listings in {location.name}{" "}
                yet.
              </h3>
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
        {nearbyLocations.length > 0 && (
          <nav
            aria-label={`Nearby locations to ${location.name}`}
            className="border-t border-[#e5ebeb] py-5"
          >
            <h2 className="text-sm font-semibold">Explore nearby locations</h2>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {nearbyLocations.map((nearby) => (
                <a
                  key={nearby.slug}
                  href={getLocationPath(nearby.slug)}
                  className="text-[#536267] underline underline-offset-4 hover:text-[#172a31]"
                >
                  {nearby.name}
                </a>
              ))}
            </div>
          </nav>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
