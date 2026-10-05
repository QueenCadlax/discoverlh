import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { findPropertyListingBySlug } from "@/lib/category-discovery";
import { getPublicUrl } from "@/lib/site-url";

export const Route = createFileRoute("/properties/$slug")({
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
      listing.description ??
      `${listing.transactionType ?? "Property"} in ${listing.location ?? "Mpumalanga"}.`;
    const canonical = getPublicUrl(`/properties/${params.slug}`);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: PropertyBySlug,
});

function PropertyBySlug() {
  const { slug } = Route.useParams();
  const listing = findPropertyListingBySlug(slug);

  if (!listing) {
    return (
      <main className="container-x flex min-h-[60vh] flex-col items-start justify-center py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
          Property marketplace
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-[#172a31]">
          Property listing not found
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[#68767a]">
          This property may have been removed or is not currently available.
        </p>
        <a
          href="/categories/property"
          className="mt-5 inline-flex min-h-11 items-center rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white"
        >
          Browse property listings
        </a>
      </main>
    );
  }

  const facts = [
    ["Property type", listing.propertyType],
    ["Bedrooms", listing.bedrooms],
    ["Bathrooms", listing.bathrooms],
    ["Parking", listing.parking],
    ["Floor size", listing.floorSize ? `${listing.floorSize} m²` : undefined],
    ["Erf size", listing.erfSize ? `${listing.erfSize} m²` : undefined],
  ].filter(([, value]) => value !== undefined && value !== null);

  return (
    <div className="min-h-screen bg-white text-[#172a31]">
      <header className="border-b border-[#e5ebeb]">
        <div className="container-x flex h-[68px] items-center">
          <a href="/" className="flex items-center gap-2" aria-label="Discover by Lowveld Hub home">
            <img src="/logo%202.jpg" alt="" className="h-9 w-9 rounded-sm object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Discover</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                by Lowveld Hub
              </span>
            </span>
          </a>
        </div>
      </header>
      <main className="container-x py-6 md:py-9">
        <nav aria-label="Breadcrumb" className="mb-5 flex gap-2 text-xs text-[#788589]">
          <a href="/" className="hover:text-[#172a31]">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <a href="/categories/property" className="hover:text-[#172a31]">
            Property
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{listing.name}</span>
        </nav>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.7fr)] lg:gap-10">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#edf0f0]">
              {listing.image ? (
                <img
                  src={listing.image}
                  alt={listing.imageAlt ?? listing.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid h-full place-items-center bg-[linear-gradient(135deg,#eef2f1,#dce7e8)]"
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
            <div className="border-b border-[#e5ebeb] py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#39703b]">
                {listing.transactionType ?? "Property listing"}
              </p>
              <h1 className="mt-1 font-display text-3xl font-medium leading-tight sm:text-4xl">
                {listing.name}
              </h1>
              {(listing.address || listing.location) && (
                <p className="mt-2 text-sm text-[#68767a]">
                  {[listing.address, listing.location, listing.province].filter(Boolean).join(", ")}
                </p>
              )}
              {listing.price != null && (
                <p className="mt-4 text-2xl font-semibold">
                  {listing.price.toLocaleString("en-ZA", {
                    style: "currency",
                    currency: "ZAR",
                    maximumFractionDigits: 0,
                  })}
                </p>
              )}
            </div>
            {listing.description && (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">About this property</h2>
                <p className="mt-2 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#5f6d72]">
                  {listing.description}
                </p>
              </section>
            )}
            {facts.length > 0 && (
              <section className="border-b border-[#e5ebeb] py-5">
                <h2 className="text-base font-semibold">Property details</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {facts.map(([label, value]) => (
                    <div key={label} className="border border-[#e5ebeb] p-3">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#788589]">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm text-[#34474d]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
          <aside className="h-fit border-t border-[#e5ebeb] pt-5 lg:sticky lg:top-24 lg:border lg:p-5">
            <h2 className="text-base font-semibold">Interested in this property?</h2>
            <p className="mt-2 text-sm leading-6 text-[#68767a]">
              Contact Lowveld Hub to enquire about a published property listing.
            </p>
            <a
              href="/list-your-business?category=Property&location=Mbombela"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white"
            >
              Contact Lowveld Hub
            </a>
          </aside>
        </div>
      </main>
      <div className="container-x pb-7">
        <a
          href="/categories/property"
          className="text-sm font-medium text-[#536267] underline underline-offset-4"
        >
          Back to Property
        </a>
      </div>
      <SiteFooter />
    </div>
  );
}
