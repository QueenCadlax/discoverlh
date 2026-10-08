import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/properties/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/property/$slug",
      params: { slug: params.slug },
      replace: true,
    });
  },
});
