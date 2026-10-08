import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, BedDouble, Bath, Building2, Heart, MapPin, Search } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import {
  filterPropertyListings,
  filterPropertyProfessionals,
  formatPropertyPrice,
  getPropertyListingPath,
  getPropertyProfessionalPath,
  propertyFeatures,
  propertyListingIntents,
  propertyLocations,
  propertyTypes,
  type PropertySearchParams,
} from "@/lib/property";
import type { PropertyListing } from "@/lib/category-discovery";
import type { PropertyProfessional } from "@/lib/property";
import { useSavedProperties } from "@/hooks/use-saved-properties";

export function PropertyNavigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e5ebeb] bg-white/95 backdrop-blur">
      <div className="container-x flex h-[68px] items-center justify-between gap-4">
        <a
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Discover by Lowveld Hub home"
        >
          <img src="/logo%202.jpg" alt="" className="h-9 w-9 rounded-sm object-contain" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[#17242b]">Discover</span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
              by Lowveld Hub
            </span>
          </span>
        </a>
        <nav aria-label="Property navigation" className="flex items-center gap-3 sm:gap-6">
          <a
            href="/property"
            aria-current="page"
            className="text-xs font-semibold text-[#17242b] sm:text-sm"
          >
            Property
          </a>
          <a
            href="/property?view=saved"
            className="text-xs text-[#687378] transition-colors hover:text-[#17242b] sm:text-sm"
          >
            Saved
          </a>
          <a
            href="/#categories"
            className="hidden text-xs text-[#687378] transition-colors hover:text-[#17242b] lg:inline"
          >
            Explore Discover
          </a>
        </nav>
      </div>
    </header>
  );
}

export function PropertyMarketplace({
  search,
  onSearch,
}: {
  search: PropertySearchParams;
  onSearch: (nextSearch: PropertySearchParams) => void;
}) {
  const isProfessionalsView = search.view === "professionals";
  const isSavedView = search.view === "saved";
  const { savedPropertyIds, toggleSavedProperty } = useSavedProperties();
  const listings = filterPropertyListings(search).filter(
    (listing) => !isSavedView || savedPropertyIds.includes(listing.id),
  );
  const professionals = filterPropertyProfessionals(search);
  const [draft, setDraft] = useState<PropertySearchParams>(search);

  useEffect(() => {
    setDraft(search);
  }, [search]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({
      ...draft,
      view: isProfessionalsView ? "professionals" : isSavedView ? "saved" : undefined,
      q: draft.q?.trim() || undefined,
      location: draft.location || undefined,
      propertyType: draft.propertyType || undefined,
      minPrice: draft.minPrice,
      maxPrice: draft.maxPrice,
      bedrooms: draft.bedrooms,
      bathrooms: draft.bathrooms,
      features: draft.features?.length ? draft.features : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#17242b]">
      <PropertyNavigation />
      <main>
        <section className="relative isolate min-h-[450px] overflow-hidden bg-[#17242b] text-white md:min-h-[520px]">
          <img
            src="/PROPERTY.jpg"
            alt="Modern home exterior"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101c22]/90 via-[#101c22]/65 to-[#101c22]/10" />
          <div className="container-x flex min-h-[450px] flex-col justify-center py-14 md:min-h-[520px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e3cfaa]">
              Property
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.05] sm:text-5xl md:text-6xl">
              Property in Mpumalanga
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
              Find homes, rentals, land, commercial spaces and property professionals across
              Mpumalanga.
            </p>
          </div>
        </section>

        <section
          id="property-search"
          aria-label="Search Mpumalanga property"
          className="sticky top-[68px] z-30 border-b border-[#e5ebeb] bg-white shadow-[0_8px_18px_-20px_rgba(23,36,43,0.55)]"
        >
          <div className="container-x py-3 sm:py-4">
            <nav
              aria-label="Property sections"
              className="mb-3 flex gap-1 border-b border-[#e5ebeb]"
            >
              <a
                href="/property"
                aria-current={!isProfessionalsView ? "page" : undefined}
                className={`min-h-10 border-b-2 px-4 text-xs font-semibold transition-colors sm:text-sm ${
                  !isProfessionalsView
                    ? "border-[#8a7655] text-[#17242b]"
                    : "border-transparent text-[#687378] hover:text-[#17242b]"
                }`}
              >
                Properties
              </a>
              <a
                href="/property?view=professionals"
                aria-current={isProfessionalsView ? "page" : undefined}
                className={`min-h-10 border-b-2 px-4 text-xs font-semibold transition-colors sm:text-sm ${
                  isProfessionalsView
                    ? "border-[#8a7655] text-[#17242b]"
                    : "border-transparent text-[#687378] hover:text-[#17242b]"
                }`}
              >
                Property Professionals
              </a>
              {isSavedView && (
                <span className="ml-auto self-center text-xs font-medium text-[#8a7655]">
                  Saved properties
                </span>
              )}
            </nav>
            {!isProfessionalsView && !isSavedView && (
              <div
                className="mb-3 flex gap-1 overflow-x-auto"
                role="group"
                aria-label="Listing type"
              >
                {propertyListingIntents.map((intent) => {
                  const active = search.listingType === intent.value;
                  return (
                    <button
                      key={intent.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        onSearch({ ...search, listingType: active ? undefined : intent.value })
                      }
                      className={`min-h-9 shrink-0 border-b-2 px-3 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors sm:px-4 sm:text-xs ${
                        active
                          ? "border-[#8a7655] text-[#17242b]"
                          : "border-transparent text-[#687378] hover:text-[#17242b]"
                      }`}
                    >
                      {intent.label}
                    </button>
                  );
                })}
              </div>
            )}

            <form onSubmit={submitSearch} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
              {isProfessionalsView ? (
                <>
                  <label className="sm:col-span-1 lg:col-span-3">
                    <span className="sr-only">Search property professionals</span>
                    <input
                      type="search"
                      value={draft.q ?? ""}
                      onChange={(event) => setDraft({ ...draft, q: event.target.value })}
                      placeholder="Search property professionals..."
                      className="h-11 w-full border border-[#dfe5e3] bg-white px-3 text-sm outline-none focus:border-[#8a7655]"
                    />
                  </label>
                  <LocationSelect
                    value={draft.location}
                    onChange={(location) => setDraft({ ...draft, location })}
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17242b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#30474f]"
                  >
                    <Search className="h-4 w-4" />
                    Search professionals
                  </button>
                </>
              ) : (
                <>
                  <label className="sm:col-span-2 lg:col-span-2">
                    <span className="sr-only">Search by keyword</span>
                    <input
                      type="search"
                      value={draft.q ?? ""}
                      onChange={(event) => setDraft({ ...draft, q: event.target.value })}
                      placeholder="Area, keyword or reference"
                      className="h-11 w-full border border-[#dfe5e3] bg-white px-3 text-sm outline-none focus:border-[#8a7655]"
                    />
                  </label>
                  <LocationSelect
                    value={draft.location}
                    onChange={(location) => setDraft({ ...draft, location })}
                  />
                  <label>
                    <span className="sr-only">Property type</span>
                    <select
                      value={draft.propertyType ?? ""}
                      onChange={(event) =>
                        setDraft({ ...draft, propertyType: event.target.value || undefined })
                      }
                      className="h-11 w-full border border-[#dfe5e3] bg-white px-3 text-sm text-[#34474d] outline-none focus:border-[#8a7655]"
                    >
                      <option value="">Any property type</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17242b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#30474f]"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </>
              )}
            </form>

            {!isProfessionalsView && (
              <form
                onSubmit={submitSearch}
                className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-6"
              >
                <PriceInput
                  label="Minimum price"
                  value={draft.minPrice}
                  onChange={(minPrice) => setDraft({ ...draft, minPrice })}
                  anyLabel="Min price"
                />
                <PriceInput
                  label="Maximum price"
                  value={draft.maxPrice}
                  onChange={(maxPrice) => setDraft({ ...draft, maxPrice })}
                  anyLabel="Max price"
                />
                <NumberSelect
                  label="Bedrooms"
                  value={draft.bedrooms}
                  onChange={(bedrooms) => setDraft({ ...draft, bedrooms })}
                  options={[1, 2, 3, 4, 5]}
                  suffix="+ beds"
                  anyLabel="Any beds"
                />
                <NumberSelect
                  label="Bathrooms"
                  value={draft.bathrooms}
                  onChange={(bathrooms) => setDraft({ ...draft, bathrooms })}
                  options={[1, 2, 3, 4]}
                  suffix="+ baths"
                  anyLabel="Any baths"
                />
                <button
                  type="submit"
                  className="min-h-10 border border-[#dfe5e3] px-3 text-xs font-semibold text-[#34474d] hover:border-[#8a7655]"
                >
                  Apply filters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraft({ view: "listings" });
                    onSearch({ view: "listings" });
                  }}
                  className="min-h-10 px-3 text-xs font-medium text-[#687378] underline underline-offset-4 hover:text-[#17242b]"
                >
                  Clear filters
                </button>
                <fieldset className="sm:col-span-2 lg:col-span-6">
                  <legend className="mb-2 text-xs font-semibold text-[#34474d]">Features</legend>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {propertyFeatures.map((feature) => (
                      <label
                        key={feature}
                        className="inline-flex items-center gap-2 text-xs text-[#59656a]"
                      >
                        <input
                          type="checkbox"
                          checked={draft.features?.includes(feature) ?? false}
                          onChange={(event) => {
                            const features = new Set(draft.features ?? []);
                            if (event.target.checked) features.add(feature);
                            else features.delete(feature);
                            setDraft({ ...draft, features: [...features] });
                          }}
                          className="h-4 w-4 accent-[#17242b]"
                        />
                        {feature}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </form>
            )}
          </div>
        </section>

        <section className="container-x py-9 md:py-12">
          <div className="flex flex-col justify-between gap-3 border-b border-[#e5ebeb] pb-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
                {isProfessionalsView ? "Property professionals" : "Property listings"}
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium text-[#17242b] md:text-3xl">
                {isProfessionalsView
                  ? "Find a property professional"
                  : isSavedView
                    ? "Your saved properties"
                    : "Explore available property"}
              </h2>
            </div>
            <a
              href={
                isProfessionalsView
                  ? "/property"
                  : isSavedView
                    ? "/property"
                    : "/property?view=professionals"
              }
              className="inline-flex min-h-10 w-fit items-center gap-2 text-sm font-medium text-[#52636a] underline underline-offset-4 hover:text-[#17242b]"
            >
              {isProfessionalsView
                ? "Browse property"
                : isSavedView
                  ? "Browse available property"
                  : "Browse professionals"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {isProfessionalsView ? (
            professionals.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {professionals.map((professional) => (
                  <PropertyProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No property professionals are listed yet."
                description="Published agency and property-practitioner profiles will appear here when verified information is available."
              />
            )
          ) : listings.length ? (
            <div className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
            <EmptyState
              title={
                isSavedView
                  ? "You have no saved properties yet."
                  : "No published property listings match yet."
              }
              description={
                isSavedView
                  ? "Save a property from its listing card to keep it here for later."
                  : "There are no approved property listings for these filters. Try another search or check back as verified listings are added."
              }
            />
          )}
        </section>

        <section className="border-y border-[#e5ebeb] bg-[#f7f8f6]">
          <div className="container-x grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:items-center md:py-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
                For property professionals
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium text-[#17242b]">
                Bring your property listings to Discover
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687378]">
                Contact the Lowveld Hub team to discuss a verified property or professional profile.
              </p>
            </div>
            <a
              href="mailto:info@lowveldhub.co.za?subject=Discover%20Property%20listing%20enquiry"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17242b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#30474f]"
            >
              Make an enquiry
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function PropertyListingCard({
  listing,
  isSaved,
  onToggleSaved,
}: {
  listing: PropertyListing;
  isSaved: boolean;
  onToggleSaved: () => void;
}) {
  const image = listing.image ?? listing.images?.[0];
  const location = [listing.location, listing.province].filter(Boolean).join(", ");
  const price = formatPropertyPrice(listing.price, listing.currency);
  const facts = [
    listing.bedrooms !== undefined ? `${listing.bedrooms} beds` : undefined,
    listing.bathrooms !== undefined ? `${listing.bathrooms} baths` : undefined,
    listing.parking !== undefined ? `${listing.parking} parking` : undefined,
  ].filter(Boolean);

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef1ef]">
        {image ? (
          <img
            src={image}
            alt={listing.imageAlt ?? listing.name}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-[#687378]">
            Image not available
          </div>
        )}
        {listing.transactionType && (
          <span className="absolute left-3 top-3 bg-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#17242b]">
            {listing.transactionType}
          </span>
        )}
        <button
          type="button"
          aria-pressed={isSaved}
          aria-label={
            isSaved ? `Remove ${listing.name} from saved properties` : `Save ${listing.name}`
          }
          onClick={onToggleSaved}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#17242b] transition-colors hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-[#9b4b48] text-[#9b4b48]" : ""}`} />
        </button>
      </div>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a7655]">
              {listing.propertyType ?? "Property"}
            </p>
            <h3 className="mt-1 font-display text-xl font-medium leading-snug text-[#17242b]">
              <a href={getPropertyListingPath(listing)} className="hover:underline">
                {listing.name}
              </a>
            </h3>
          </div>
          {price && <p className="shrink-0 text-sm font-semibold text-[#17242b]">{price}</p>}
        </div>
        {location && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-[#687378]">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </p>
        )}
        {facts.length > 0 && (
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#59656a]">
            {listing.bedrooms !== undefined && (
              <span className="inline-flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" />
                {listing.bedrooms}
              </span>
            )}
            {listing.bathrooms !== undefined && (
              <span className="inline-flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {listing.bathrooms}
              </span>
            )}
            {listing.parking !== undefined && <span>{listing.parking} parking</span>}
          </p>
        )}
      </div>
    </article>
  );
}

function PropertyProfessionalCard({ professional }: { professional: PropertyProfessional }) {
  return (
    <article className="border border-[#e2e7e5] bg-white p-4 transition-shadow hover:shadow-[0_12px_30px_-24px_rgba(23,36,43,0.48)]">
      <div className="flex items-start gap-3">
        {professional.image ? (
          <img
            src={professional.image}
            alt={professional.imageAlt ?? professional.name}
            loading="lazy"
            decoding="async"
            className="h-16 w-16 shrink-0 object-cover"
          />
        ) : (
          <span className="grid h-16 w-16 shrink-0 place-items-center bg-[#f1f3f1] text-[#8a7655]">
            <Building2 className="h-6 w-6" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a7655]">
            Property {professional.profileType}
          </p>
          <h3 className="mt-1 font-display text-lg font-medium text-[#17242b]">
            {professional.name}
          </h3>
          {professional.location && (
            <p className="mt-1 flex items-center gap-1 text-xs text-[#687378]">
              <MapPin className="h-3.5 w-3.5" />
              {professional.location}
            </p>
          )}
        </div>
      </div>
      {professional.description && (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#687378]">
          {professional.description}
        </p>
      )}
      <a
        href={getPropertyProfessionalPath(professional)}
        className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#17242b]"
      >
        View professional
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

function LocationSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (location: string | undefined) => void;
}) {
  return (
    <label>
      <span className="sr-only">Location</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || undefined)}
        className="h-11 w-full border border-[#dfe5e3] bg-white px-3 text-sm text-[#34474d] outline-none focus:border-[#8a7655]"
      >
        <option value="">All Mpumalanga</option>
        {propertyLocations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </label>
  );
}

function PriceInput({
  label,
  value,
  onChange,
  anyLabel,
}: {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
  anyLabel: string;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <input
        type="number"
        min={0}
        step={1000}
        value={value ?? ""}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue ? Number(nextValue) : undefined);
        }}
        placeholder={`${anyLabel} (R)`}
        className="h-10 w-full border border-[#dfe5e3] bg-white px-3 text-xs text-[#34474d] outline-none focus:border-[#8a7655]"
      />
    </label>
  );
}

function NumberSelect({
  label,
  value,
  onChange,
  options,
  suffix,
  anyLabel,
}: {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
  options: number[];
  suffix?: string;
  anyLabel: string;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value ? Number(event.target.value) : undefined)}
        className="h-10 w-full border border-[#dfe5e3] bg-white px-3 text-xs text-[#34474d] outline-none focus:border-[#8a7655]"
      >
        <option value="">{anyLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
            {suffix}
          </option>
        ))}
      </select>
    </label>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="mt-6 border border-dashed border-[#d6ddda] bg-[#fafbf9] px-5 py-10 text-center sm:px-8">
      <Building2 className="mx-auto h-7 w-7 text-[#8a7655]" />
      <h3 className="mt-3 font-display text-xl font-medium text-[#17242b]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#687378]">{description}</p>
    </div>
  );
}
