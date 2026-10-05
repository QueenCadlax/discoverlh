import { useState, useSyncExternalStore } from "react";
import { Bookmark, Check, Heart, Scale, X } from "lucide-react";

import {
  categoryConfigs,
  categoryListings,
  getBusinessSlug,
  isPublishedListing,
  type CategoryConfig,
  type CategoryListing,
} from "@/lib/category-discovery";

type Collections = { saved: string[]; compared: string[] };
type CollectionTab = keyof Collections;
type ListingReference = { listing: CategoryListing; config: CategoryConfig };
type ComparisonRow = { label: string; value: (item: ListingReference) => string };

const STORAGE_KEY = "discover:listing-collections:v1";
const EMPTY_SNAPSHOT = JSON.stringify({ saved: [], compared: [] });

export function listingCollectionKey(config: CategoryConfig, listing: CategoryListing) {
  return `${config.slug}:${listing.id}`;
}

export function useListingCollections(): Collections {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_SNAPSHOT);
  try {
    const parsed = JSON.parse(snapshot) as Partial<Collections>;
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      compared: Array.isArray(parsed.compared) ? parsed.compared.slice(0, 3) : [],
    };
  } catch {
    return { saved: [], compared: [] };
  }
}

export function toggleListingCollection(tab: CollectionTab, key: string) {
  const current = readCollections();
  const selected = current[tab];
  const next = selected.includes(key)
    ? selected.filter((item) => item !== key)
    : tab === "compared" && selected.length >= 3
      ? selected
      : [...selected, key];
  writeCollections({ ...current, [tab]: next });
}

export function ListingCollectionActions({
  listing,
  config,
}: {
  listing: CategoryListing;
  config: CategoryConfig;
}) {
  const collections = useListingCollections();
  const key = listingCollectionKey(config, listing);
  const isSaved = collections.saved.includes(key);
  const isCompared = collections.compared.includes(key);
  const compareLimitReached = collections.compared.length >= 3 && !isCompared;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={isSaved}
        onClick={() => toggleListingCollection("saved", key)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-sm border border-[#dce4e5] px-3 text-xs font-medium text-[#34474d] hover:bg-[#f7f9f9]"
      >
        {isSaved ? <Check className="h-3.5 w-3.5" /> : <Heart className="h-3.5 w-3.5" />}
        {isSaved ? "Saved" : "Save"}
      </button>
      <button
        type="button"
        aria-pressed={isCompared}
        disabled={compareLimitReached}
        title={compareLimitReached ? "Compare up to 3 listings" : undefined}
        onClick={() => toggleListingCollection("compared", key)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-sm border border-[#dce4e5] px-3 text-xs font-medium text-[#34474d] hover:bg-[#f7f9f9] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isCompared ? <Check className="h-3.5 w-3.5" /> : <Scale className="h-3.5 w-3.5" />}
        {isCompared ? "Comparing" : "Compare"}
      </button>
    </div>
  );
}

export function ListingCollectionsPanel() {
  const collections = useListingCollections();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<CollectionTab>("saved");
  const listingByKey = new Map<string, ListingReference>(
    (Object.keys(categoryListings) as (keyof typeof categoryListings)[]).flatMap((slug) =>
      categoryListings[slug].filter(isPublishedListing).map((listing) => {
        const config = categoryConfigs[slug];
        return [listingCollectionKey(config, listing), { listing, config }] as const;
      }),
    ),
  );
  const activeKeys = collections[tab].filter((key) => listingByKey.has(key));
  const comparisonRows: ComparisonRow[] = [
    { label: "Category", value: (item) => item.config.label },
    { label: "Location", value: (item) => displayValue(item.listing.location) },
    { label: "Price", value: (item) => displayValue(item.listing.price) },
    { label: "Rating", value: (item) => displayValue(item.listing.rating) },
    { label: "Verified", value: (item) => (item.listing.verified ? "Verified" : "Not listed") },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#dce4e5] px-3 text-xs font-semibold text-[#34474d] hover:bg-[#f7f9f9]"
        aria-label={`Saved listings ${collections.saved.length}, compare ${collections.compared.length}`}
      >
        <Bookmark className="h-4 w-4" />
        <span className="hidden md:inline">Saved {collections.saved.length}</span>
        <span className="md:hidden">{collections.saved.length}</span>
        {collections.compared.length > 0 && (
          <span className="hidden border-l border-[#dce4e5] pl-2 md:inline">
            Compare {collections.compared.length}
          </span>
        )}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/35 p-0 sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="listing-collections-title"
            className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-t-md bg-white shadow-2xl sm:rounded-md"
          >
            <header className="flex items-center justify-between border-b border-[#e5ebeb] px-5 py-4">
              <div>
                <h2 id="listing-collections-title" className="text-lg font-semibold text-[#172a31]">
                  Your listings
                </h2>
                <p className="mt-0.5 text-xs text-[#68767a]">Saved on this device</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-sm hover:bg-[#f1f4f4]"
                aria-label="Close saved listings"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="flex gap-1 border-b border-[#e5ebeb] px-5">
              {(["saved", "compared"] as const).map((collectionTab) => (
                <button
                  key={collectionTab}
                  type="button"
                  onClick={() => setTab(collectionTab)}
                  aria-pressed={tab === collectionTab}
                  className={`min-h-11 border-b-2 px-3 text-sm font-medium capitalize ${tab === collectionTab ? "border-[#39703b] text-[#172a31]" : "border-transparent text-[#788589]"}`}
                >
                  {collectionTab} ({collections[collectionTab].length})
                </button>
              ))}
            </div>
            <div className="max-h-[65vh] overflow-auto p-5">
              {activeKeys.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#68767a]">
                  {tab === "saved"
                    ? "No saved listings yet."
                    : "Choose up to 3 listings to compare."}
                </p>
              ) : tab === "saved" ? (
                <ul className="divide-y divide-[#e5ebeb]">
                  {activeKeys.map((key) => {
                    const item = listingByKey.get(key)!;
                    return (
                      <li key={key} className="flex items-center justify-between gap-4 py-3">
                        <div className="min-w-0">
                          <a
                            href={`/business/${getBusinessSlug(item.listing)}`}
                            className="truncate text-sm font-semibold text-[#172a31] hover:underline"
                          >
                            {item.listing.name}
                          </a>
                          <p className="mt-1 text-xs text-[#788589]">
                            {[item.config.label, item.listing.location].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleListingCollection("saved", key)}
                          className="min-h-9 shrink-0 px-2 text-xs font-medium text-[#536267] underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                    <thead>
                      <tr>
                        <th className="border-b border-[#dce4e5] py-2 pr-4 text-xs font-medium text-[#788589]">
                          Details
                        </th>
                        {activeKeys.map((key) => {
                          const item = listingByKey.get(key)!;
                          return (
                            <th
                              key={key}
                              className="min-w-36 border-b border-[#dce4e5] px-3 py-2 align-top"
                            >
                              <a
                                href={`/business/${getBusinessSlug(item.listing)}`}
                                className="font-semibold text-[#172a31] hover:underline"
                              >
                                {item.listing.name}
                              </a>
                              <button
                                type="button"
                                onClick={() => toggleListingCollection("compared", key)}
                                className="mt-1 block text-xs font-normal text-[#68767a] underline underline-offset-2"
                              >
                                Remove
                              </button>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map(({ label, value }) => (
                        <tr key={label}>
                          <th className="border-b border-[#edf0f0] py-3 pr-4 text-xs font-medium text-[#788589]">
                            {label}
                          </th>
                          {activeKeys.map((key) => (
                            <td
                              key={key}
                              className="border-b border-[#edf0f0] px-3 py-3 text-[#34474d]"
                            >
                              {value(listingByKey.get(key)!)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("discover:listing-collections", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("discover:listing-collections", callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function readCollections(): Collections {
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT,
    ) as Partial<Collections>;
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      compared: Array.isArray(parsed.compared) ? parsed.compared.slice(0, 3) : [],
    };
  } catch {
    return { saved: [], compared: [] };
  }
}

function writeCollections(collections: Collections) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    window.dispatchEvent(new Event("discover:listing-collections"));
  } catch {
    return;
  }
}

function displayValue(value: unknown) {
  return value == null || value === "" ? "Not listed" : String(value);
}
