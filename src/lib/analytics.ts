export type DiscoverAnalyticsEvent =
  | "page_view"
  | "listing_view"
  | "search"
  | "category_click"
  | "listing_click"
  | "website_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "directions_click"
  | "booking_click"
  | "menu_click"
  | "order_click"
  | "social_click"
  | "business_network_click"
  | "list_business_click"
  | "listing_submission";

export function trackDiscoverEvent(
  name: DiscoverAnalyticsEvent,
  properties: Record<string, string> = {},
) {
  if (typeof window === "undefined") return;

  const event = {
    event: "discover_event",
    event_name: name,
    page_path: window.location.pathname,
    ...properties,
  };
  const analyticsWindow = window as typeof window & {
    dataLayer?: Record<string, string>[];
  };
  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push(event);
  }
  window.dispatchEvent(new CustomEvent("discover:analytics", { detail: event }));
}
