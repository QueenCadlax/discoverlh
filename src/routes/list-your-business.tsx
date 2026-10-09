import { useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { MobileSiteMenu } from "@/components/MobileSiteMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { trackDiscoverEvent } from "@/lib/analytics";
import {
  categoryConfigs,
  discoverySubcategories,
  primaryDiscoveryCategorySlugs,
} from "@/lib/category-discovery";
import { submitBusinessListingRequest } from "@/lib/business-submissions.functions";
import { mpumalangaLocations } from "@/lib/location-discovery";

export const Route = createFileRoute("/list-your-business")({
  validateSearch: (search: Record<string, unknown>) => ({
    request: search.request === "claim" ? "claim" : undefined,
    business: typeof search.business === "string" ? search.business : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    location: typeof search.location === "string" ? search.location : undefined,
  }),
  head: () => ({
    meta: [
      { title: "List Your Business | Discover by Lowveld Hub" },
      {
        name: "description",
        content: "Submit or update a local business listing for review by Lowveld Hub.",
      },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: ListingRequestPage,
});

function ListingRequestPage() {
  const search = Route.useSearch();
  const categoryOptions = primaryDiscoveryCategorySlugs.map((slug) => categoryConfigs[slug]);
  const legacyCategoryLabels: Record<string, string> = {
    Accommodation: "Accommodation",
    "Food & Dining": "Restaurants",
    Eat: "Restaurants",
    Stay: "Accommodation",
    Events: "Leisure & Entertainment",
    "Events & Entertainment": "Leisure & Entertainment",
    "Professional Services": "Professional",
    "Home & Construction": "Home Services",
    "Home & Property": "Home Services",
    Automotive: "Automotive",
    Beauty: "Personal & Beauty",
    "Health & Wellness": "Health",
    "Education & Training": "Professional",
  };
  const initialCategory =
    categoryOptions.find((category) => category.label === search.category)?.label ??
    legacyCategoryLabels[search.category ?? ""] ??
    "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState("");
  const selectedCategorySlug = primaryDiscoveryCategorySlugs.find(
    (slug) => categoryConfigs[slug].label === selectedCategory,
  );
  const subcategoryOptions = selectedCategorySlug
    ? discoverySubcategories[selectedCategorySlug]
    : [];
  const [requestType, setRequestType] = useState(
    search.request === "claim" ? "Claim an existing listing" : "New listing",
  );
  const [submissionStatus, setSubmissionStatus] = useState<
    { kind: "success" | "error"; message: string } | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const submissionInProgress = useRef(false);
  const submitRequestToServer = useServerFn(submitBusinessListingRequest);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current || hasSubmitted) return;

    const values = new FormData(event.currentTarget);
    const getValue = (name: string) => {
      const value = values.get(name);
      return typeof value === "string" ? value.trim() : "";
    };

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmissionStatus(undefined);
    try {
      await submitRequestToServer({
        data: {
          requestType,
          businessName: getValue("businessName"),
          category: getValue("category"),
          location: getValue("location"),
          contactName: getValue("contactName"),
          email: getValue("email"),
          privacyConsent: values.get("privacyConsent") === "on",
          subcategory: getValue("subcategory"),
          address: getValue("address"),
          phone: getValue("phone"),
          website: getValue("website"),
          services: getValue("services"),
          businessNetworkTypes: values
            .getAll("businessNetworkTypes")
            .filter((value): value is string => typeof value === "string"),
          openingHours: getValue("openingHours"),
          logo: getValue("logo"),
          image: getValue("image"),
          images: getValue("images"),
          socialLinks: getValue("socialLinks"),
          description: getValue("description"),
        },
      });
      trackDiscoverEvent("listing_submission");
      setSubmissionStatus({
        kind: "success",
        message:
          "Thanks, your business has been submitted. We’ll review your details and get back to you shortly.",
      });
      setHasSubmitted(true);
    } catch {
      setSubmissionStatus({
        kind: "error",
        message: "We couldn’t submit your request right now. Please try again in a moment.",
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

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
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm font-medium text-[#536267] hover:text-[#172a31]">
              Back to Discover
            </a>
            <MobileSiteMenu />
          </div>
        </div>
      </header>

      <main className="container-x grid gap-10 py-8 md:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] md:py-12">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#39703b]">
            For local businesses
          </p>
          <h1 className="mt-2 max-w-sm font-display text-3xl font-medium leading-tight text-[#172a31]">
            Get your business discovered.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#68767a]">
            Submit your details securely to the Lowveld Hub team for review. They will confirm any
            missing information before a listing is published.
          </p>
          <div className="mt-5 rounded-sm border border-[#e5ebeb] bg-[#f7faf8] p-3 text-sm text-[#34474d]">
            Explore the available visibility options in our <a href="/business-packages" className="font-semibold text-[#172a31] underline underline-offset-2">Business Packages</a>.
          </div>
        </div>

        <form
          onSubmit={submitRequest}
          className="grid gap-5 border-t border-[#e5ebeb] pt-5 md:border-t-0 md:pt-0"
        >
          <fieldset>
            <legend className="text-sm font-semibold text-[#172a31]">Request type</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {["New listing", "Update an existing listing", "Claim an existing listing"].map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={requestType === option}
                    onClick={() => setRequestType(option)}
                    className={`min-h-10 rounded-sm border px-3 text-sm font-medium ${requestType === option ? "border-[#39703b] bg-[#eff6ef] text-[#285448]" : "border-[#dce4e5] text-[#536267] hover:bg-[#f7f9f9]"}`}
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Business name
              <input
                name="businessName"
                required
                maxLength={120}
                defaultValue={search.business}
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Category
              <select
                name="category"
                required
                value={selectedCategory}
                onChange={(event) => {
                  setSelectedCategory(event.target.value);
                  setSubcategory("");
                }}
                className="min-h-11 rounded-sm border border-[#dce4e5] bg-white px-3 font-normal outline-none focus:border-[#39703b]"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoryOptions.map((category) => (
                  <option key={category.slug}>{category.label}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Main service area
              <select
                name="location"
                required
                defaultValue={search.location ?? ""}
                className="min-h-11 rounded-sm border border-[#dce4e5] bg-white px-3 font-normal outline-none focus:border-[#39703b]"
              >
                <option value="" disabled>
                  Select location
                </option>
                {mpumalangaLocations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Subcategory <span className="font-normal text-[#788589]">Optional</span>
              <select
                name="subcategory"
                value={subcategory}
                onChange={(event) => setSubcategory(event.target.value)}
                className="min-h-11 rounded-sm border border-[#dce4e5] bg-white px-3 font-normal outline-none focus:border-[#39703b]"
              >
                <option value="">Select subcategory</option>
                {subcategoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Address or area <span className="font-normal text-[#788589]">Optional</span>
              <input
                name="address"
                maxLength={200}
                autoComplete="street-address"
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Contact person
              <input
                name="contactName"
                required
                autoComplete="name"
                maxLength={120}
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Contact email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Phone or WhatsApp <span className="font-normal text-[#788589]">Optional</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={32}
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Website <span className="font-normal text-[#788589]">Optional</span>
              <input
                name="website"
                type="url"
                maxLength={200}
                placeholder="https://"
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Services offered <span className="font-normal text-[#788589]">Optional</span>
              <input
                name="services"
                maxLength={300}
                placeholder="Separate services with commas"
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <fieldset className="grid gap-2 sm:col-span-2">
              <legend className="text-sm font-medium">
                Business Network <span className="font-normal text-[#788589]">Optional</span>
              </legend>
              <p className="text-xs text-[#788589]">
                Select only the connections your business genuinely offers. The team will review
                them before publication.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  ["supplier", "Supplies products or goods"],
                  ["business-services", "Provides services to businesses"],
                  ["partnerships", "Open to partnerships"],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className="inline-flex min-h-9 items-center gap-2 text-sm text-[#34474d]"
                  >
                    <input
                      type="checkbox"
                      name="businessNetworkTypes"
                      value={value}
                      className="h-4 w-4 accent-[#28718a]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Opening hours <span className="font-normal text-[#788589]">Optional</span>
              <textarea
                name="openingHours"
                maxLength={500}
                rows={3}
                placeholder="Mon–Fri 08:00–17:00, Sat 08:00–13:00, Sun closed"
                className="resize-y rounded-sm border border-[#dce4e5] px-3 py-2 font-normal leading-6 outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Logo URL <span className="font-normal text-[#788589]">Optional</span>
              <input
                name="logo"
                type="url"
                maxLength={500}
                placeholder="https://"
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Cover image URL <span className="font-normal text-[#788589]">Optional</span>
              <input
                name="image"
                type="url"
                maxLength={500}
                placeholder="https://"
                className="min-h-11 rounded-sm border border-[#dce4e5] px-3 font-normal outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Gallery image URLs <span className="font-normal text-[#788589]">Optional</span>
              <textarea
                name="images"
                maxLength={2000}
                rows={2}
                placeholder="Separate image URLs with commas"
                className="resize-y rounded-sm border border-[#dce4e5] px-3 py-2 font-normal leading-6 outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Social links <span className="font-normal text-[#788589]">Optional</span>
              <textarea
                name="socialLinks"
                maxLength={1000}
                rows={2}
                placeholder="Add profile URLs, one per line"
                className="resize-y rounded-sm border border-[#dce4e5] px-3 py-2 font-normal leading-6 outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Business description
              <textarea
                name="description"
                required
                minLength={20}
                maxLength={1200}
                rows={5}
                className="resize-y rounded-sm border border-[#dce4e5] px-3 py-2 font-normal leading-6 outline-none focus:border-[#39703b]"
              />
            </label>
            <label className="flex min-h-11 items-start gap-2 text-xs leading-5 text-[#536267] sm:col-span-2">
              <input
                name="privacyConsent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-[#28718a]"
              />
              <span>
                I agree that Lowveld Hub may use these details to review this listing request and
                contact me about it. See the{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold underline underline-offset-2 hover:text-[#172a31]"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>
          <div className="border-t border-[#e5ebeb] pt-4">
            <button
              type="submit"
              disabled={isSubmitting || hasSubmitted}
              className="min-h-11 rounded-sm bg-[#173b32] px-5 text-sm font-semibold text-white hover:bg-[#285448]"
            >
              {isSubmitting ? "Sending submission…" : hasSubmitted ? "Submitted" : "Submit"}
            </button>
            <p className="mt-2 text-xs leading-5 text-[#788589]">
              Your submission will be emailed to the Lowveld Hub team for manual review. It will not
              appear publicly unless approved.
            </p>
            {submissionStatus && (
              <p
                role={submissionStatus.kind === "error" ? "alert" : "status"}
                className={`mt-2 text-sm ${submissionStatus.kind === "error" ? "text-[#a53e34]" : "text-[#39703b]"}`}
              >
                {submissionStatus.message}
              </p>
            )}
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
