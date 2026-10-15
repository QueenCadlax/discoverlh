import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { getBusinessSlug, getPublishedEventListings } from "@/lib/category-discovery";
import { serializeJsonLd } from "@/lib/seo";
import { getPublicUrl } from "@/lib/site-url";

function findEvent(slug: string) {
  return getPublishedEventListings().find((event) => getBusinessSlug(event) === slug);
}

export const Route = createFileRoute("/events/$slug")({
  head: ({ params }) => {
    const event = findEvent(params.slug);
    const canonical = getPublicUrl(`/events/${params.slug}`);
    const title = event
      ? `${event.name} | Events in Mpumalanga | Discover`
      : "Event not found | Discover by Lowveld Hub";
    const description = event?.description;
    const socialImage = event?.image
      ? event.image.startsWith("http")
        ? event.image
        : getPublicUrl(event.image)
      : undefined;
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
        { name: "robots", content: event ? "index,follow" : "noindex,follow" },
        { property: "og:title", content: title },
        ...(description ? [{ property: "og:description", content: description }] : []),
        { property: "og:type", content: "website" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        ...(socialImage ? [{ property: "og:image", content: socialImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        ...(description ? [{ name: "twitter:description", content: description }] : []),
        ...(socialImage ? [{ name: "twitter:image", content: socialImage }] : []),
      ],
      ...(event && canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: EventBySlug,
});

function EventBySlug() {
  const { slug } = Route.useParams();
  const event = findEvent(slug);

  if (!event) {
    return (
      <main className="container-x flex min-h-[60vh] flex-col items-start justify-center py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
          Discover by Lowveld Hub
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-[#172a31]">Event not found</h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[#68767a]">
          This event may have ended or is not currently listed.
        </p>
        <a
          href="/categories/leisure-entertainment"
          className="mt-5 inline-flex min-h-11 items-center rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white"
        >
          Browse Leisure & Entertainment
        </a>
      </main>
    );
  }

  const date = new Date(`${event.eventStartDate}T00:00:00.000Z`);
  const dateLabel = Number.isNaN(date.getTime())
    ? event.eventStartDate
    : new Intl.DateTimeFormat("en-ZA", { dateStyle: "full", timeZone: "UTC" }).format(date);
  const externalHref = event.ticketUrl ?? event.website;
  const canonical = getPublicUrl(`/events/${slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    ...(event.description ? { description: event.description } : {}),
    ...(Number.isNaN(date.getTime())
      ? {}
      : { startDate: `${event.eventStartDate}T00:00:00+02:00` }),
    ...(event.image ? { image: event.image } : {}),
    ...(canonical ? { url: canonical } : {}),
    location: {
      "@type": "Place",
      name: event.venue,
      ...(event.location
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: event.location,
              addressRegion: "Mpumalanga",
              addressCountry: "ZA",
            },
          }
        : {}),
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#172a31]">
      <header className="border-b border-[#e5ebeb]">
        <div className="container-x flex min-h-[68px] items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2" aria-label="Discover by Lowveld Hub home">
            <img src="/logo%202.jpg" alt="" className="h-9 w-9 rounded-sm object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Discover</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                by Lowveld Hub
              </span>
            </span>
          </a>
          <a
            href="/categories/leisure-entertainment"
            className="text-sm font-medium text-[#536267]"
          >
            Browse Leisure & Entertainment
          </a>
        </div>
      </header>

      <main className="container-x max-w-5xl py-8 md:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
        <nav aria-label="Breadcrumb" className="mb-6 flex gap-2 text-xs text-[#7d898d]">
          <a href="/" className="hover:text-[#172a31]">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <a href="/categories/leisure-entertainment" className="hover:text-[#172a31]">
            Leisure & Entertainment
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#34474d]">
            {event.name}
          </span>
        </nav>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] md:gap-12">
          <div>
            {event.image && (
              <img
                src={event.image}
                alt={event.imageAlt ?? event.name}
                className="aspect-[16/10] w-full object-cover"
              />
            )}
            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
              {event.type ?? "Event"}
            </p>
            <h1 className="mt-2 font-display text-3xl font-medium leading-tight text-[#172a31] md:text-4xl">
              {event.name}
            </h1>
            {event.description && (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f6d72]">{event.description}</p>
            )}
          </div>

          <aside className="h-fit border border-[#e5ebeb] p-5 md:mt-12">
            <h2 className="text-sm font-semibold text-[#172a31]">Event details</h2>
            <dl className="mt-4 grid gap-4 text-sm">
              <div>
                <dt className="text-xs font-medium text-[#788589]">Date</dt>
                <dd className="mt-1 text-[#34474d]">{dateLabel}</dd>
                {event.eventEndDate && (
                  <dd className="mt-1 text-xs text-[#68767a]">Through {event.eventEndDate}</dd>
                )}
              </div>
              {event.eventTime && (
                <div>
                  <dt className="text-xs font-medium text-[#788589]">Time</dt>
                  <dd className="mt-1 text-[#34474d]">{event.eventTime}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium text-[#788589]">Venue</dt>
                <dd className="mt-1 text-[#34474d]">{event.venue}</dd>
                {event.location && (
                  <dd className="mt-1 text-xs text-[#68767a]">{event.location}</dd>
                )}
              </div>
              {event.eventStatus && (
                <div>
                  <dt className="text-xs font-medium text-[#788589]">Status</dt>
                  <dd className="mt-1 capitalize text-[#34474d]">{event.eventStatus}</dd>
                </div>
              )}
              {event.eventAdmission && (
                <div>
                  <dt className="text-xs font-medium text-[#788589]">Admission</dt>
                  <dd className="mt-1 text-[#34474d]">{event.eventAdmission}</dd>
                </div>
              )}
            </dl>
            {externalHref && (
              <a
                href={externalHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
              >
                {event.ticketUrl ? "Tickets & booking" : "Event website"}
              </a>
            )}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
