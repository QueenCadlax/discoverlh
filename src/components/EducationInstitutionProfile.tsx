import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { useState } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import {
  getCategoryListingPath,
  getCategoryListings,
  isPublishedListing,
  type CategoryListing,
} from "@/lib/category-discovery";
import { getPublicUrl } from "@/lib/site-url";
import { serializeJsonLd } from "@/lib/seo";

const educationCategoryPath = "/categories/education-training";

export function EducationInstitutionCard({ listing }: { listing: CategoryListing }) {
  const profile = listing.educationProfile;
  const href = getCategoryListingPath("education-training", listing);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [logoUnavailable, setLogoUnavailable] = useState(false);

  return (
    <article className="group h-full overflow-hidden rounded-xl border border-[#e4e9e8] bg-white shadow-[0_12px_28px_-24px_rgba(20,31,35,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d3ddda] hover:shadow-[0_24px_42px_-26px_rgba(20,31,35,0.55)] motion-reduce:transition-none">
      <a
        href={href}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28718a]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#142b4a]">
          {listing.image && !imageUnavailable ? (
            <img
              src={listing.image}
              alt={listing.imageAlt ?? `${listing.name} official institution image`}
              loading="lazy"
              onError={() => setImageUnavailable(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
            />
          ) : (
            <div
              aria-hidden="true"
              className="grid h-full place-items-center bg-[radial-gradient(circle_at_80%_15%,rgba(216,196,158,.3),transparent_34%),linear-gradient(135deg,#142b4a,#27435b)]"
            >
              <div className="flex flex-col items-center gap-3 text-white/90">
                <GraduationCap className="h-10 w-10 text-[#d8c49e]" strokeWidth={1.4} />
                <span className="font-display text-2xl font-medium tracking-[0.12em]">
                  {listing.name
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 3)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
            </div>
          )}
          {listing.logo && !logoUnavailable && (
            <span className="absolute bottom-3 left-3 grid h-12 w-12 place-items-center rounded-lg bg-white p-1.5 shadow-md">
              <img
                src={listing.logo}
                alt=""
                loading="lazy"
                onError={() => setLogoUnavailable(true)}
                className="max-h-full max-w-full object-contain"
              />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
            {listing.type ?? "Education"}
          </p>
          <h2 className="mt-2 line-clamp-2 font-display text-xl font-medium leading-tight text-[#172a31] transition-colors group-hover:text-[#28718a]">
            {listing.name}
          </h2>
          {listing.location && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-[#68767a]">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {listing.location}
            </p>
          )}
          {profile?.educationLevels.length ? (
            <p className="mt-2 line-clamp-1 text-xs font-medium text-[#536267]">
              {profile.educationLevels.join(" · ")}
            </p>
          ) : null}
          {listing.description && (
            <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#5f6d72]">
              {listing.description}
            </p>
          )}
          <span className="mt-auto inline-flex min-h-10 items-center gap-2 self-start rounded-sm bg-[#172a31] px-4 py-3 text-xs font-semibold text-white transition-colors group-hover:bg-[#285448]">
            View Institution <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    </article>
  );
}

export function EducationInstitutionProfile({ listing }: { listing: CategoryListing }) {
  const profile = listing.educationProfile;
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [logoUnavailable, setLogoUnavailable] = useState(false);
  if (!profile) {
    return (
      <main className="container-x flex min-h-[55vh] flex-col items-start justify-center py-16">
        <h1 className="font-display text-3xl font-medium text-[#172a31]">{listing.name}</h1>
        <a
          href={educationCategoryPath}
          className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#172a31] underline underline-offset-4"
        >
          <ArrowLeft className="h-4 w-4" /> Browse Education &amp; Training
        </a>
      </main>
    );
  }

  const profileUrl = getPublicUrl(getCategoryListingPath("education-training", listing));
  const image = listing.image;
  const relatedInstitutions = getCategoryListings("education-training")
    .filter(
      (candidate) =>
        candidate.id !== listing.id && isPublishedListing(candidate) && candidate.educationProfile,
    )
    .slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: listing.name,
    description: listing.description,
    url: profileUrl,
    ...(image ? { image } : {}),
    ...(listing.logo ? { logo: listing.logo } : {}),
    ...(listing.website ? { sameAs: [listing.website] } : {}),
    ...(listing.location
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: listing.location,
            ...(listing.province ? { addressRegion: listing.province } : {}),
            addressCountry: "ZA",
          },
        }
      : {}),
  };
  const primaryAction = profile.admissions?.applicationUrl;

  return (
    <div className="min-h-screen bg-white text-[#172a31]">
      <header className="border-b border-[#e5ebeb] bg-white">
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
            aria-label="Main navigation"
            className="hidden items-center gap-6 text-sm text-[#68767a] sm:flex"
          >
            <a href="/" className="hover:text-[#172a31]">
              Home
            </a>
            <a href="/#categories" className="hover:text-[#172a31]">
              Categories
            </a>
            <a href="/business-network" className="hover:text-[#172a31]">
              Business Network
            </a>
          </nav>
          <a
            href={educationCategoryPath}
            className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#34474d] hover:text-[#28718a]"
          >
            <ArrowLeft className="h-4 w-4" /> Education &amp; Training
          </a>
        </div>
      </header>

      <main className={primaryAction ? "pb-20 md:pb-0" : ""}>
        <div className="container-x py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#788589]"
          >
            <a href="/" className="hover:text-[#172a31]">
              Home
            </a>
            <span aria-hidden="true">/</span>
            <a href={educationCategoryPath} className="hover:text-[#172a31]">
              Education &amp; Training
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-[#34474d]">
              {listing.name}
            </span>
          </nav>
        </div>

        <section className="container-x pb-7 md:pb-10">
          <div className="relative isolate grid min-h-[280px] overflow-hidden rounded-xl bg-[#142b4a] md:min-h-[390px] md:grid-cols-[1.2fr_.8fr]">
            {image && !imageUnavailable ? (
              <>
                <img
                  src={image}
                  alt={listing.imageAlt ?? `${listing.name} official image`}
                  fetchPriority="high"
                  onError={() => setImageUnavailable(true)}
                  className="absolute inset-0 -z-20 h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102338]/95 via-[#102338]/75 to-[#102338]/15"
                />
              </>
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(216,196,158,.24),transparent_32%),linear-gradient(120deg,#142b4a,#263f57)]"
              />
            )}
            <div className="flex flex-col justify-end p-6 text-white sm:p-9 md:p-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0cfac]">
                {listing.type ?? "Education institution"}
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
                {listing.name}
              </h1>
              {(profile.campusName || listing.location) && (
                <p className="mt-4 flex items-center gap-2 text-sm text-white/85">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {[profile.campusName, listing.location].filter(Boolean).join(" · ")}
                </p>
              )}
              {profile.educationLevels.length > 0 && (
                <p className="mt-3 text-xs leading-5 text-white/80">
                  {profile.educationLevels.join(" · ")}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-white px-4 text-sm font-semibold text-[#172a31] transition-colors hover:bg-[#f0eee9]"
                  >
                    Visit Official Website <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {primaryAction && (
                  <a
                    href={primaryAction}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/50 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Admissions <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            {listing.logo && !logoUnavailable && (
              <div className="absolute right-5 top-5 grid h-16 w-16 place-items-center rounded-lg bg-white p-2 shadow-lg sm:right-8 sm:top-8 sm:h-20 sm:w-20">
                <img
                  src={listing.logo}
                  alt=""
                  onError={() => setLogoUnavailable(true)}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>
        </section>

        <div className="container-x grid gap-10 pb-12 md:grid-cols-[minmax(0,1fr)_300px] md:gap-14 md:pb-16">
          <div className="min-w-0">
            {listing.description && (
              <section className="border-b border-[#e6ebea] pb-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a7655]">
                  Institution overview
                </p>
                <h2 className="mt-2 font-display text-2xl font-medium">About {listing.name}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f6d72]">
                  {listing.description}
                </p>
              </section>
            )}

            {profile.programmeGroups?.length ? (
              <section className="border-b border-[#e6ebea] py-7">
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[#8a7655]" />
                  <div>
                    <h2 className="font-display text-2xl font-medium">Programmes and learning</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {profile.programmeGroups.map((group) => (
                        <article
                          key={group.title}
                          className="rounded-lg border border-[#e6ebea] bg-[#fbfcfb] p-4"
                        >
                          <h3 className="text-sm font-semibold">{group.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[#68767a]">
                            {group.description}
                          </p>
                          {group.programmes?.length ? (
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {group.programmes.map((programme) => (
                                <li
                                  key={programme}
                                  className="rounded-full bg-[#edf2f0] px-2.5 py-1 text-[11px] text-[#34474d]"
                                >
                                  {programme}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {group.href && (
                            <a
                              href={group.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#285448] underline underline-offset-4"
                            >
                              View official information <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {profile.admissions && (
              <section className="border-b border-[#e6ebea] py-7">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-[#8a7655]" />
                  <div className="w-full">
                    <h2 className="font-display text-2xl font-medium">
                      Admissions and applications
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#5f6d72]">
                      {profile.admissions.summary}
                    </p>
                    {profile.admissions.currentDates?.length ? (
                      <ul className="mt-4 space-y-2">
                        {profile.admissions.currentDates.map((date) => (
                          <li
                            key={date}
                            className="rounded-md bg-[#f5f7f5] px-3 py-2 text-sm leading-6 text-[#34474d]"
                          >
                            {date}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {profile.admissions.requirements?.length ? (
                      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-[#5f6d72]">
                        {profile.admissions.requirements.map((requirement) => (
                          <li key={requirement}>{requirement}</li>
                        ))}
                      </ul>
                    ) : null}
                    {profile.admissions.applicationUrl && (
                      <a
                        href={profile.admissions.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#172a31] px-4 text-sm font-semibold text-white hover:bg-[#285448]"
                      >
                        View Official Admissions <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </section>
            )}

            {(profile.facilities?.length || profile.studentExperience?.length) && (
              <section className="border-b border-[#e6ebea] py-7">
                <h2 className="font-display text-2xl font-medium">Campus and student experience</h2>
                {profile.facilities?.length ? (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {profile.facilities.map((facility) => (
                      <li
                        key={facility}
                        className="rounded-md border border-[#e6ebea] px-3 py-2 text-sm text-[#536267]"
                      >
                        {facility}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {profile.studentExperience?.length ? (
                  <ul className="mt-4 space-y-3">
                    {profile.studentExperience.map((item) => (
                      <li key={item} className="text-sm leading-7 text-[#5f6d72]">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )}

            {profile.sourceNotes.length > 0 && (
              <section className="pt-7">
                <h2 className="text-sm font-semibold">Useful links</h2>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {profile.sourceNotes.map((source) => (
                    <li key={`${source.label}:${source.href}`}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#536267] underline decoration-[#b8c4c3] underline-offset-4 hover:text-[#172a31]"
                      >
                        {source.label} <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-xl border border-[#e5ebeb] bg-[#fbfcfb] p-5 md:sticky md:top-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
              Plan your next step
            </p>
            <h2 className="mt-2 font-display text-xl font-medium">Contact the institution</h2>
            {listing.location ? (
              <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#68767a]">
                <MapPin className="mt-1 h-4 w-4 shrink-0" /> {listing.location}
              </p>
            ) : null}
            {listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[#172a31] px-4 text-sm font-semibold text-white hover:bg-[#285448]"
              >
                Official Website <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {profile.officialLinks?.length ? (
              <ul className="mt-4 divide-y divide-[#e6ebea]">
                {profile.officialLinks.map((link) => (
                  <li key={`${link.label}:${link.href}`}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 py-3 text-xs font-medium text-[#536267] hover:text-[#172a31]"
                    >
                      {link.label} <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>

        {relatedInstitutions.length > 0 && (
          <section className="border-t border-[#e6ebea] bg-[#f8faf9]">
            <div className="container-x py-9 md:py-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
                Keep exploring
              </p>
              <h2 className="mt-2 font-display text-2xl font-medium">
                More education in Mpumalanga
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedInstitutions.map((institution) => (
                  <a
                    key={institution.id}
                    href={getCategoryListingPath("education-training", institution)}
                    className="rounded-lg border border-[#e5ebeb] bg-white p-4 transition-colors hover:border-[#c7d4d1]"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a7655]">
                      {institution.type}
                    </span>
                    <span className="mt-2 block text-sm font-semibold text-[#172a31]">
                      {institution.name}
                    </span>
                    {institution.location && (
                      <span className="mt-1 block text-xs text-[#68767a]">
                        {institution.location}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </main>

      {primaryAction && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e5ebeb] bg-white/95 p-3 backdrop-blur md:hidden">
          <div className="container-x">
            <a
              href={primaryAction}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#172a31] px-4 text-sm font-semibold text-white"
            >
              Admissions <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
