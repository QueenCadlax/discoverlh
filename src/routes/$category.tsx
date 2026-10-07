import { createFileRoute, redirect } from "@tanstack/react-router";

import { primaryDiscoveryCategorySlugs } from "@/lib/category-discovery";

export const Route = createFileRoute("/$category")({
  beforeLoad: ({ params, location }) => {
    const slug = params.category;
    const directCategorySlugs = new Set(primaryDiscoveryCategorySlugs);

    if (directCategorySlugs.has(slug as (typeof primaryDiscoveryCategorySlugs)[number])) {
      const searchParams = new URLSearchParams(location.searchStr);
      const getList = (key: string) =>
        searchParams
          .getAll(key)
          .flatMap((value) => value.split(","))
          .filter(Boolean);
      const mode = searchParams.get("mode");

      throw redirect({
        to: "/categories/$category",
        params: { category: slug },
        search: {
          q: searchParams.get("q") ?? undefined,
          type: searchParams.get("type") ?? undefined,
          amenities: searchParams.get("amenities") ?? undefined,
          mode:
            mode === "services" ||
            mode === "vehicles" ||
            mode === "businesses" ||
            mode === "listings"
              ? mode
              : undefined,
          location: searchParams.get("location") ?? undefined,
          cuisine: getList("cuisine").length ? getList("cuisine") : undefined,
          style: getList("style").length ? getList("style") : undefined,
          meal: getList("meal").length ? getList("meal") : undefined,
        },
      });
    }

    throw redirect({ to: "/" });
  },
});
