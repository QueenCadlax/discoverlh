import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  categoryConfigs,
  discoverySubcategories,
  primaryDiscoveryCategorySlugs,
} from "./category-discovery";

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");
const optionalUrl = z
  .union([z.literal(""), z.string().url().max(500)])
  .optional()
  .default("");
const requiredSingleLineText = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((value) => !/[\r\n]/.test(value), "Must be a single line");

const SubmissionSchema = z
  .object({
    requestType: z.enum(["New listing", "Update an existing listing", "Claim an existing listing"]),
    package: z.enum(["Discover Plus", "Discover Premium", "Not sure yet"]).default("Not sure yet"),
    businessName: requiredSingleLineText(120),
    category: requiredSingleLineText(100).refine(
      (value) =>
        primaryDiscoveryCategorySlugs.some((slug) => categoryConfigs[slug].label === value),
      "Select one of the current Discover categories",
    ),
    location: requiredSingleLineText(100),
    contactName: requiredSingleLineText(120),
    email: z.string().trim().email().max(254),
    privacyConsent: z.literal(true),
    subcategory: optionalText(100),
    address: optionalText(200),
    phone: optionalText(32),
    website: optionalUrl,
    services: optionalText(300),
    businessNetworkTypes: z
      .array(z.enum(["supplier", "business-services", "partnerships"]))
      .max(3)
      .default([]),
    openingHours: optionalText(500),
    logo: optionalUrl,
    image: optionalUrl,
    images: optionalText(2000),
    socialLinks: optionalText(1000),
    description: z.string().trim().min(20).max(1200),
  })
  .superRefine((data, context) => {
    const categorySlug = primaryDiscoveryCategorySlugs.find(
      (slug) => categoryConfigs[slug].label === data.category,
    );
    if (
      data.subcategory &&
      (!categorySlug || !discoverySubcategories[categorySlug].includes(data.subcategory))
    ) {
      context.addIssue({
        code: "custom",
        path: ["subcategory"],
        message: "Select a subcategory that belongs to the chosen Discover category",
      });
    }
  });

const recipient = "sales@discover.lowveldhub.co.za";
const networkTypeLabels: Record<string, string> = {
  supplier: "Supplies products or goods",
  "business-services": "Provides services to businesses",
  partnerships: "Open to partnerships",
};

function formatSubmissionEmail(data: z.infer<typeof SubmissionSchema>) {
  const lines = [
    "New Discover by Lowveld Hub business listing submission",
    "",
    `Request type: ${data.requestType}`,
    `Preferred package: ${data.package}`,
    `Business name: ${data.businessName}`,
    `Category: ${data.category}`,
    `Subcategory: ${data.subcategory || "Not provided"}`,
    `Contact person: ${data.contactName}`,
    `Email: ${data.email}`,
    `Phone or WhatsApp: ${data.phone || "Not provided"}`,
    `Website: ${data.website || "Not provided"}`,
    `Address or area: ${data.address || "Not provided"}`,
    `Town / service area: ${data.location}`,
    `Description: ${data.description}`,
    `Services offered: ${data.services || "Not provided"}`,
    `Business Network: ${
      data.businessNetworkTypes.map((type) => networkTypeLabels[type]).join(", ") || "Not selected"
    }`,
    `Opening hours: ${data.openingHours || "Not provided"}`,
    `Logo URL: ${data.logo || "Not provided"}`,
    `Cover image URL: ${data.image || "Not provided"}`,
    `Gallery image URLs: ${data.images || "Not provided"}`,
    `Social media links: ${data.socialLinks || "Not provided"}`,
    `Contact follow-up consent: ${data.privacyConsent ? "Yes" : "No"}`,
  ];
  return lines.join("\n");
}

export const submitBusinessListingRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => SubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.BUSINESS_SUBMISSIONS_FROM?.trim();
    if (!apiKey || !from) {
      console.error("Business listing email is not configured on this server.");
      throw new Error("Business listing email is not configured.");
    }

    let response: Response;
    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [recipient],
          reply_to: data.email,
          subject: `New Business Listing Submission — ${data.businessName} (${data.package})`,
          text: formatSubmissionEmail(data),
        }),
      });
    } catch (error) {
      console.error("Resend business listing email request failed", {
        errorType: error instanceof Error ? error.name : "UnknownError",
      });
      throw new Error("The business listing email could not be sent.");
    }

    if (!response.ok) {
      console.error("Resend rejected a business listing email", {
        status: response.status,
      });
      throw new Error("The business listing email could not be sent.");
    }

    return { submitted: true };
  });
