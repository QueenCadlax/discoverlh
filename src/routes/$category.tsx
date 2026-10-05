import { createFileRoute, redirect } from "@tanstack/react-router";

import { primaryDiscoveryCategorySlugs } from "@/lib/category-discovery";

export const Route = createFileRoute("/$category")({
  beforeLoad: ({ params, location }) => {
    const slug = params.category;
    const directCategorySlugs = new Set(primaryDiscoveryCategorySlugs);

    if (directCategorySlugs.has(slug as (typeof primaryDiscoveryCategorySlugs)[number])) {
      throw redirect({
        to: "/categories/$category",
        params: { category: slug },
        search: location.search,
      });
    }

    throw redirect({ to: "/" });
  },
});
