import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Camera, Check, Megaphone, MapPinned, Sparkles } from "lucide-react";

import { MobileSiteMenu } from "@/components/MobileSiteMenu";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/business-packages")({
  component: BusinessPackagesPage,
  head: () => ({
    meta: [
      { title: "Business Packages | Discover by Lowveld Hub" },
      {
        name: "description",
        content:
          "Explore Discover business visibility packages designed to help local businesses get more visibility, better listings, and promotional opportunities across Mpumalanga.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
});

const packageGroups = {
  plus: [
    {
      title: "Business listing",
      items: [
        "Dedicated business profile on Discover.",
        "Business name, description and category information.",
        "Location and map integration, where applicable.",
        "Operating hours, telephone and email contact details.",
        "Website, WhatsApp and social links, where available.",
        "Product and service descriptions and shareable profile link.",
      ],
    },
    {
      title: "Visual content",
      items: [
        "Display of approved business photographs.",
        "Showcase of relevant products, services, premises or facilities.",
        "One promotional video feature, subject to agreed scope and production arrangements.",
        "Support identifying suitable content for the profile.",
      ],
    },
    {
      title: "Social media and marketing",
      items: [
        "Eligibility for relevant Discover social media campaigns.",
        "Opportunities to feature in selected category-related content.",
        "Local business spotlight opportunities and themed campaigns.",
        "Potential TikTok exposure through selected promotional content.",
      ],
    },
    {
      title: "Digital presence",
      items: [
        "Dedicated online business profile.",
        "Convenient access to available contact channels.",
        "Inclusion in the relevant business category on Discover.",
        "Eligibility for relevant local business marketing initiatives.",
      ],
    },
  ],
  premium: [
    {
      title: "Enhanced business listing",
      items: [
        "Everything included in Discover Plus.",
        "A 12-month subscription for extended digital visibility.",
        "Dedicated business profile with business photographs and category relevance.",
        "Website, WhatsApp and social media links, where available.",
        "Operating hours, product and service information, and shareable profile link.",
      ],
    },
    {
      title: "Visual content opportunities",
      items: [
        "Display of approved business photographs.",
        "One promotional video feature, subject to scope and production arrangements.",
        "Presentation of relevant promotional material.",
        "Opportunities to participate in selected visual business campaigns.",
      ],
    },
    {
      title: "Social media and marketing opportunities",
      items: [
        "Eligibility for relevant Discover social media campaigns.",
        "Opportunities for TikTok features and local spotlight campaigns.",
        "Participation in promotional activities highlighting local businesses.",
      ],
    },
    {
      title: "Extended visibility",
      items: [
        "Wider campaign participation across selected Discover promotional initiatives.",
        "A longer-term presence for continuous local discovery and brand awareness.",
        "Ongoing support to present the business effectively to potential customers.",
      ],
    },
  ],
};

const valuePoints = [
  {
    icon: MapPinned,
    title: "Local visibility",
    description:
      "Showcase your business where local customers are actively looking for services and products in Mpumalanga.",
  },
  {
    icon: Camera,
    title: "Better brand presentation",
    description:
      "Present your business clearly with photos, service details, contact channels and a shareable profile.",
  },
  {
    icon: Megaphone,
    title: "Promotional opportunities",
    description:
      "Take part in selected campaigns, spotlights and local marketing initiatives designed to increase reach.",
  },
];

function BusinessPackagesPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#17242b]">
      <header className="sticky inset-x-0 top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-md">
        <div className="container-x flex h-[68px] items-center justify-between gap-3">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Discover by Lowveld Hub home">
            <img src="/logo%202.jpg" alt="" className="h-9 w-9 rounded-sm object-contain" />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-sm font-semibold text-[#17242b]">Discover</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                by Lowveld Hub
              </span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-7 text-sm text-[#59656a] md:flex"
            aria-label="Main navigation"
          >
            <a href="/" className="site-nav-link hover:text-[#17242b]">
              Home
            </a>
            <a href="/#categories" className="site-nav-link hover:text-[#17242b]">
              Categories
            </a>
            <a href="/business-network" className="site-nav-link hover:text-[#17242b]">
              Business Network
            </a>
            <a href="/business-packages" aria-current="page" className="site-nav-link font-medium text-[#17242b]">
              Business Packages
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/list-your-business"
              className="hidden rounded-sm bg-[#17242b] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2b414a] sm:inline-flex"
            >
              List Your Business
            </a>
            <MobileSiteMenu />
          </div>
        </div>
      </header>

      <main>
        <section className="bg-[#17242b] text-white">
          <div className="container-x grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
            <div className="max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d0bd97]">
                BUSINESS VISIBILITY PACKAGES
              </p>
              <h1 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">
                Your Business. More Visible.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/75">
                Discover helps businesses showcase what they do, strengthen their digital presence,
                and access promotional opportunities through a growing local discovery platform.
              </p>
              <p className="mt-3 max-w-lg text-base leading-7 text-white/75">
                Choose a package that suits your business and explore additional opportunities to
                promote your products and services.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold text-[#17242b] transition-transform hover:-translate-y-0.5"
                >
                  Explore Packages <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/list-your-business"
                  className="inline-flex items-center justify-center rounded-sm border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  List Your Business
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#1d2d38] p-5 shadow-[0_18px_44px_-22px_rgba(0,0,0,0.48)]">
                <div className="rounded-[22px] border border-white/10 bg-[#f5f2ea] p-5 text-[#17242b]">
                  <div className="inline-flex items-center rounded-full bg-[#17242b] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#f2e6d0]">
                    Local visibility
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3 rounded-2xl border border-[#dfe7e6] bg-white p-4">
                      <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-sm bg-[#eaf0f3] text-[#17242b]">
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#17242b]">Premium business profile</p>
                        <p className="mt-1 text-xs leading-5 text-[#687378]">
                          Clear service information, location details and discoverability across categories.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-[#dfe7e6] bg-white p-4">
                      <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-sm bg-[#eaf0f3] text-[#17242b]">
                        <Camera className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#17242b]">Visual storytelling</p>
                        <p className="mt-1 text-xs leading-5 text-[#687378]">
                          Highlight your premises, services and promotional material in a more polished way.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-[#dfe7e6] bg-white p-4">
                      <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-sm bg-[#eaf0f3] text-[#17242b]">
                        <Megaphone className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#17242b]">Campaign access</p>
                        <p className="mt-1 text-xs leading-5 text-[#687378]">
                          Participate in relevant local business campaigns and social promotions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="packages" className="container-x py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#39703b]">
              Choose a package
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#17242b] md:text-5xl">
              Visibility choices built for growing local businesses.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-[28px] border border-[#dfe7e6] bg-white p-6 shadow-[0_14px_34px_-28px_rgba(23,36,43,0.32)] md:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#39703b]">
                    Discover Plus
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-display text-5xl text-[#17242b]">R1,500</span>
                    <span className="pb-2 text-sm text-[#687378]">/ 6 months</span>
                  </div>
                </div>
                <span className="rounded-full border border-[#dfe7e6] bg-[#f3f7f5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#285448]">
                  Most practical
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#59656a]">
                A practical digital visibility package for businesses looking to establish their
                presence on Discover and showcase their products and services to potential customers.
              </p>

              <div className="mt-7 space-y-6">
                {packageGroups.plus.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#17242b]">
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#536267]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#39703b]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <a
                href="/list-your-business"
                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#173b32] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#285448]"
              >
                Choose Discover Plus <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            <article className="flex h-full flex-col rounded-[28px] bg-[#17242b] p-6 text-white shadow-[0_18px_42px_-24px_rgba(17,27,35,0.75)] md:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d0bd97]">
                    Discover Premium
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-display text-5xl text-white">R2,500</span>
                    <span className="pb-2 text-sm text-white/70">/ 12 months</span>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d0bd97]">
                  Extended reach
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/75">
                A longer-term business visibility package designed for companies seeking an extended
                presence on Discover and continued opportunities to participate in relevant
                promotional activities.
              </p>

              <div className="mt-7 space-y-6">
                {packageGroups.premium.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d0bd97]">
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-6 text-white/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d0bd97]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <a
                href="/list-your-business"
                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold text-[#17242b] transition-transform hover:-translate-y-0.5"
              >
                Choose Discover Premium <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <section className="bg-white py-14 md:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#28718a]">
                Why businesses choose Discover
              </p>
              <h2 className="mt-3 font-display text-3xl text-[#17242b] md:text-4xl">
                Honest visibility for real local growth.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {valuePoints.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-[#dfe7e6] bg-[#f8f6f2] p-5 shadow-[0_14px_30px_-28px_rgba(23,36,43,0.28)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-sm bg-[#17242b] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl text-[#17242b]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#59656a]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f2f5f5] py-14 md:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl rounded-[28px] border border-[#dfe7e6] bg-white p-6 shadow-[0_18px_40px_-32px_rgba(23,36,43,0.34)] md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#39703b]">
                Ready to get started?
              </p>
              <h2 className="mt-3 font-display text-3xl text-[#17242b] md:text-4xl">
                Tell us about your business and we’ll guide you to the right fit.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#59656a]">
                Whether you’re just getting started or looking for a longer-term local visibility
                strategy, Discover can help present your business in a more compelling and credible
                way.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/list-your-business"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#17242b] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
                >
                  List Your Business <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="mailto:sales@discover.lowveldhub.co.za"
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#dfe7e6] bg-white px-5 py-3 text-sm font-semibold text-[#17242b] transition-colors hover:bg-[#f7f9f9]"
                >
                  Talk to the team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
