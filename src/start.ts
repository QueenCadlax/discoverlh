import { createCsrfMiddleware, createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { generateSitemapXml } from "./lib/sitemap";
import { getPublicUrl } from "./lib/site-url";

const errorMiddleware = createMiddleware().server(async ({ next, request }) => {
  const requestUrl = new URL(request.url);
  if (request.method === "GET" && requestUrl.pathname === "/robots.txt") {
    const sitemapUrl = getPublicUrl("/sitemap.xml");
    const rules = [
      "User-agent: *",
      "Allow: /",
      "Disallow: /admin/",
      "Disallow: /dashboard/",
      "Disallow: /auth/",
      "Disallow: /login",
      "Disallow: /register",
      ...(sitemapUrl ? [`Sitemap: ${sitemapUrl}`] : []),
    ];
    return new Response(`${rules.join("\n")}\n`, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }

  if (request.method === "GET" && requestUrl.pathname === "/sitemap.xml") {
    return new Response(generateSitemapXml(), {
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }

  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (context) => context.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, errorMiddleware],
}));
