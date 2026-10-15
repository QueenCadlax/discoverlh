import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { getPublicUrl } from "@/lib/site-url";

const title = "Terms of Use";
const description =
  "Terms for using Discover by Lowveld Hub to find places, businesses, events and services in Mpumalanga.";

export const Route = createFileRoute("/terms-of-use")({
  head: () => {
    const canonical = getPublicUrl("/terms-of-use");
    return {
      meta: [
        { title: "Terms of Use | Discover by Lowveld Hub" },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Discover by Lowveld Hub` },
        { property: "og:description", content: description },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: TermsOfUsePage,
});

function TermsOfUsePage() {
  return (
    <LegalPage
      title={title}
      description={description}
      sections={[
        {
          heading: "Using the discovery platform",
          paragraphs: [
            "Use Discover lawfully and do not misuse the site, interfere with its operation, or submit content you are not permitted to share.",
            "Discover provides information to help visitors find independent businesses and destinations. A listing is not a guarantee, endorsement, recommendation, or verification by Lowveld Hub.",
          ],
        },
        {
          heading: "Business and destination information",
          paragraphs: [
            "Details may be provided by a business or drawn from its public information and can change. Confirm current hours, availability, prices, services and other important details directly with the business before making plans.",
            "Discover does not process payments or bookings. Booking, menu, order and social links may take you to third-party services that have their own terms.",
          ],
        },
        {
          heading: "Availability and contact",
          paragraphs: [
            "The site is provided as an information service and may occasionally be unavailable or contain outdated information. Contact info@lowveldhub.co.za to report an issue or ask a question.",
          ],
        },
      ]}
    />
  );
}
