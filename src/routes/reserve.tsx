import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/reserve")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
