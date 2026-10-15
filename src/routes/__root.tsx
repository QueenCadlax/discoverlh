import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { DirectoryAssistant } from "../components/DirectoryAssistant";
import { trackDiscoverEvent } from "../lib/analytics";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { getPublicUrl } from "../lib/site-url";

const siteDescription =
  "Discover by Lowveld Hub helps people find local businesses, services and places across Mpumalanga.";
const siteLogo = getPublicUrl("/logo%202.jpg");

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-eyebrow">404</p>
        <h1 className="mt-4 h-section text-foreground">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for has moved, or never existed.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Return home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error instanceof Error ? error : new Error(String(error)), {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="h-section text-foreground">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">Please try again in a moment.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Discover by Lowveld Hub | Mpumalanga" },
      { name: "application-name", content: "Discover by Lowveld Hub" },
      {
        name: "description",
        content: siteDescription,
      },
      { name: "author", content: "Discover by Lowveld Hub" },
      { name: "robots", content: "index,follow" },
      {
        property: "og:title",
        content: "Discover by Lowveld Hub | Mpumalanga",
      },
      { property: "og:site_name", content: "Discover by Lowveld Hub" },
      {
        property: "og:description",
        content: siteDescription,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Discover by Lowveld Hub | Mpumalanga",
      },
      {
        name: "twitter:description",
        content: siteDescription,
      },
      ...(siteLogo ? [{ property: "og:image", content: siteLogo }] : []),
      ...(siteLogo ? [{ name: "twitter:image", content: siteLogo }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700&display=swap",
      },
      {
        rel: "icon",
        href: "/favicon_io%20(2)/favicon.ico",
        type: "image/x-icon",
      },
      {
        rel: "icon",
        href: "/favicon_io%20(2)/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        href: "/favicon_io%20(2)/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        rel: "apple-touch-icon",
        href: "/favicon_io%20(2)/apple-touch-icon.png",
      },
      { rel: "manifest", href: "/favicon_io%20(2)/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <DirectoryAssistant />
      <AnalyticsTracker />
    </QueryClientProvider>
  );
}

function AnalyticsTracker() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    trackDiscoverEvent("page_view", { page_path: pathname });
    if (/^\/(?:business|accommodation|properties|property)\//.test(pathname)) {
      trackDiscoverEvent("listing_view");
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const label = `${link.getAttribute("aria-label") ?? ""} ${link.textContent ?? ""}`
        .trim()
        .toLocaleLowerCase();
      const detail = { target_path: href.startsWith("/") ? href.split("?")[0] : "external" };
      if (href.startsWith("tel:")) {
        trackDiscoverEvent("phone_click", detail);
      } else if (href.startsWith("mailto:")) {
        trackDiscoverEvent("email_click", detail);
      } else if (href.includes("wa.me")) {
        trackDiscoverEvent("whatsapp_click", detail);
      } else if (label.includes("direction")) {
        trackDiscoverEvent("directions_click", detail);
      } else if (/\b(book|booking|availability|reserve)\b/.test(label)) {
        trackDiscoverEvent("booking_click", detail);
      } else if (/\b(menu)\b/.test(label)) {
        trackDiscoverEvent("menu_click", detail);
      } else if (/\b(order)\b/.test(label)) {
        trackDiscoverEvent("order_click", detail);
      } else if (/\b(instagram|facebook|tiktok|youtube|social)\b/.test(label)) {
        trackDiscoverEvent("social_click", detail);
      } else if (href.startsWith("/categories/")) {
        trackDiscoverEvent("category_click", {
          category: href.split("/")[2]?.split("?")[0] ?? "",
        });
      } else if (href.split("?")[0] === "/property") {
        trackDiscoverEvent("category_click", { category: "property" });
      } else if (/^\/(?:business|accommodation|properties|property)\//.test(href)) {
        trackDiscoverEvent("listing_click", detail);
      } else if (href.split("?")[0] === "/business-network") {
        trackDiscoverEvent("business_network_click");
      } else if (href.startsWith("/list-your-business")) {
        trackDiscoverEvent("list_business_click");
      } else if (/^https?:\/\//.test(href)) {
        trackDiscoverEvent("website_click", detail);
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      const form = event.target;
      const isSearch =
        form.id === "directory-search" ||
        form.action.includes("/business-network") ||
        form.querySelector('input[type="search"]') !== null;
      if (isSearch) {
        trackDiscoverEvent("search", { surface: window.location.pathname });
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
