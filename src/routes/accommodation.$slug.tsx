import { createFileRoute } from "@tanstack/react-router";

import { AccommodationBusinessProfile } from "@/components/AccommodationBusinessProfile";
import { findBusinessBySlug } from "@/lib/category-discovery";
import { getPublicUrl } from "@/lib/site-url";

export const Route = createFileRoute("/accommodation/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    view: search.view === "wellness" ? "wellness" : undefined,
  }),
  head: ({ params, match }) => {
    const profile = findBusinessBySlug(params.slug);
    if (!profile || profile.category !== "accommodation") {
      return {
        meta: [
          { title: "Accommodation not found | Discover by Lowveld Hub" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }

    const wellnessView =
      match.search.view === "wellness" ? profile.listing.wellnessProfile : undefined;
    const title = wellnessView
      ? (wellnessView.seoTitle ??
        `${wellnessView.displayName} | ${profile.listing.location ?? "Mpumalanga"} Spa | Discover`)
      : (profile.listing.seoTitle ??
        `${profile.listing.name} | Accommodation in Mbombela | Discover by Lowveld Hub`);
    const description = wellnessView
      ? (wellnessView.seoDescription ?? wellnessView.description ?? wellnessView.summary)
      : (profile.listing.seoDescription ??
        profile.listing.description ??
        `${profile.listing.name} is a premium accommodation option in Mbombela, Mpumalanga.`);
    const canonical = getPublicUrl(`/accommodation/${params.slug}`);
    const image = wellnessView?.image ?? profile.listing.image;
    const socialImage = image
      ? image.startsWith("http")
        ? image
        : getPublicUrl(image)
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
        ...(socialImage ? [{ property: "og:image", content: socialImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(socialImage ? [{ name: "twitter:image", content: socialImage }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: AccommodationBySlug,
});

function AccommodationBySlug() {
  const { slug } = Route.useParams();
  const { view } = Route.useSearch();
  const profile = findBusinessBySlug(slug);

  if (!profile || profile.category !== "accommodation") {
    return (
      <main className="container-x flex min-h-[60vh] flex-col items-start justify-center py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
          Accommodation
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-[#172a31]">
          Accommodation not found
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[#68767a]">
          This accommodation listing is not available right now.
        </p>
        <a
          href="/categories/accommodation"
          className="mt-5 inline-flex min-h-11 items-center rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white"
        >
          Browse accommodation
        </a>
      </main>
    );
  }

  return (
    <AccommodationBusinessProfile
      listing={profile.listing}
      canonicalPath={`/accommodation/${slug}`}
      wellnessView={view === "wellness"}
    />
  );
}
