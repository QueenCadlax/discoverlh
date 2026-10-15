import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/food-dining/pappas-kitchen")({
  beforeLoad: () => {
    throw redirect({
      to: "/business/$slug",
      params: { slug: "pappas-kitchen" },
    });
  },
});
