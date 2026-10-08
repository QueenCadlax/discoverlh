import { createFileRoute } from "@tanstack/react-router";

import { AccommodationBusinessProfile } from "@/components/AccommodationBusinessProfile";
import { BusinessProfilePage } from "@/components/BusinessProfilePage";
import {
  categoryConfigs,
  findBusinessBySlug,
  getCategoryListingPath,
  type CategoryConfig,
} from "@/lib/category-discovery";
import { getPublicUrl } from "@/lib/site-url";

export const Route = createFileRoute("/business/$slug")({
  head: ({ params }) => {
    const profile = findBusinessBySlug(params.slug);
    if (!profile) {
      return {
        meta: [
          { title: "Business not found | Discover by Lowveld Hub" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }
    const config = categoryConfigs[profile.category];
    const location = profile.listing.location?.trim();
    const categoryLabel = profile.listing.subcategory || config.label;
    const defaultTitle =
      profile.category === "accommodation"
        ? `${profile.listing.name} | Discover by Lowveld Hub`
        : profile.category === "food-dining"
          ? `${profile.listing.name} | Food & Dining in ${location || "Mpumalanga"} | Discover`
          : `${profile.listing.name} | ${categoryLabel}${location ? ` in ${location}` : ""} | Discover`;
    const title = profile.listing.seoTitle ?? defaultTitle;
    const locationSuffix = location ? ` Located in ${location}, Mpumalanga.` : "";
    const descriptionText = profile.listing.description?.trim();
    const descriptionLimit = 160 - locationSuffix.length;
    const clippedDescription = descriptionText
      ? truncateDescription(descriptionText, descriptionLimit)
      : undefined;
    const description =
      profile.listing.seoDescription ??
      (profile.listing.description
        ? `${clippedDescription}${locationSuffix}`
        : location
          ? `Discover ${profile.listing.name} in ${location}, Mpumalanga.`
          : undefined);
    const canonical = getPublicUrl(getCategoryListingPath(profile.category, profile.listing));
    const socialImage = profile.listing.image
      ? profile.listing.image.startsWith("http")
        ? profile.listing.image
        : getPublicUrl(profile.listing.image)
      : undefined;
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
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
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: BusinessBySlug,
});

function BusinessBySlug() {
  const { slug } = Route.useParams();
  const profile = findBusinessBySlug(slug);

  if (!profile) {
    return (
      <main className="container-x flex min-h-[60vh] flex-col items-start justify-center py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
          Discover by Lowveld Hub
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-[#172a31]">
          Business not found
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[#68767a]">
          This profile may have moved, or the business is not currently listed.
        </p>
        <a
          href="/#categories"
          className="mt-5 inline-flex min-h-11 items-center rounded-sm bg-[#17242b] px-4 text-sm font-semibold text-white"
        >
          Browse categories
        </a>
      </main>
    );
  }

  const config = categoryConfigs[profile.category] as CategoryConfig;
  if (profile.category === "accommodation") {
    return (
      <AccommodationBusinessProfile
        listing={profile.listing}
        canonicalPath={`/accommodation/${slug}`}
      />
    );
  }
  return <BusinessProfilePage listing={profile.listing} config={config} />;
}

function truncateDescription(value: string, maximumLength: number) {
  if (value.length <= maximumLength) return value;
  const clipped = value.slice(0, maximumLength + 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const wordBoundary = clipped.slice(0, lastSpace > 0 ? lastSpace : maximumLength).trimEnd();
  const sentenceEnd = Math.max(
    wordBoundary.lastIndexOf(". "),
    wordBoundary.lastIndexOf("! "),
    wordBoundary.lastIndexOf("? "),
  );
  return sentenceEnd >= maximumLength * 0.55
    ? wordBoundary.slice(0, sentenceEnd + 1).trimEnd()
    : wordBoundary;
}
