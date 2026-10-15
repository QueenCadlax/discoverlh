import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { getPublicUrl } from "@/lib/site-url";

const title = "Privacy Policy";
const description =
  "How Discover by Lowveld Hub handles information submitted through the site and data used by its discovery features.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => {
    const canonical = getPublicUrl("/privacy-policy");
    return {
      meta: [
        { title: "Privacy Policy | Discover by Lowveld Hub" },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Discover by Lowveld Hub` },
        { property: "og:description", content: description },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPage
      title={title}
      description={description}
      sections={[
        {
          heading: "Information you submit",
          paragraphs: [
            "The List Your Business form collects the business and contact details you provide so the Lowveld Hub team can review the request and contact you. Optional fields include addresses, services, opening hours, website and social links, and image URLs. Requests are sent to the team by email using the server-side email delivery service; they are not published automatically.",
            "Do not submit sensitive personal information that is not needed to review a business listing. Contact info@lowveldhub.co.za to ask about a submission or request a correction.",
          ],
        },
        {
          heading: "Discovery features and service providers",
          paragraphs: [
            "Saved directory searches are stored in your browser on the device where you save them. The weather feature requests forecast data from Open-Meteo for the selected town. If you choose to use your location and grant browser permission, your coordinates are used for that weather request.",
            "The interactive map loads Leaflet and OpenStreetMap map tiles. Weather and map providers may receive technical request information such as your IP address under their own privacy terms. Links to business websites and social profiles are operated by third parties.",
          ],
        },
        {
          heading: "Usage events",
          paragraphs: [
            "The site emits basic page and action events through a browser analytics hook. This build does not configure an analytics provider or endpoint. If an analytics provider is connected later, the events are limited to page paths and action types; search text and submitted contact details are not included.",
          ],
        },
        {
          heading: "How information is used",
          paragraphs: [
            "Submitted information is used to review, respond to, and where approved prepare a public business listing. A listing is not published unless it is approved. Public listing details can be viewed by site visitors.",
            "The current application does not require visitor accounts. Contact the Lowveld Hub team if you have a privacy question about information submitted through this site.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: ["For privacy questions, email info@lowveldhub.co.za."],
        },
      ]}
    />
  );
}
