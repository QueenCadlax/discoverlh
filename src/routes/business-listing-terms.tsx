import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { getPublicUrl } from "@/lib/site-url";

const title = "Business Listing Terms";
const description =
  "Terms for submitting business information for review on Discover by Lowveld Hub.";

export const Route = createFileRoute("/business-listing-terms")({
  head: () => {
    const canonical = getPublicUrl("/business-listing-terms");
    return {
      meta: [
        { title: "Business Listing Terms | Discover by Lowveld Hub" },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Discover by Lowveld Hub` },
        { property: "og:description", content: description },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      ],
      ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    };
  },
  component: BusinessListingTermsPage,
});

function BusinessListingTermsPage() {
  return (
    <LegalPage
      title={title}
      description={description}
      sections={[
        {
          heading: "Submitting information",
          paragraphs: [
            "Submit accurate, current information about a business you are authorised to represent. You are responsible for having permission to share the text, image URLs, logos and links you provide.",
            "Do not submit misleading, unlawful, harmful or infringing content, or personal information about another person without permission.",
          ],
        },
        {
          heading: "Review and publication",
          paragraphs: [
            "Every submission is sent to the Lowveld Hub team for manual review. Submission does not guarantee approval, publication, a particular placement, or continued inclusion. Details will not appear publicly unless approved.",
            "If approved, the information you provided may be displayed as a public listing so visitors can discover and contact the business. The listed business remains independent from Lowveld Hub and is responsible for its own services and dealings with customers.",
          ],
        },
        {
          heading: "Updates and removal",
          paragraphs: [
            "Contact sales@discover.lowveldhub.co.za to request a correction or removal. The team may ask for information to confirm that the request is authorised.",
          ],
        },
      ]}
    />
  );
}
