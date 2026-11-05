import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { MobileSiteMenu } from "@/components/MobileSiteMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { businessPackageOptions, businessPackageValues } from "@/lib/business-packages";

export const Route = createFileRoute("/business-packages")({
  component: BusinessPackagesPage,
  head: () => ({
    meta: [
      { title: "Business Packages | Discover Lowveld Hub" },
      {
        name: "description",
        content:
          "Compare Discover listing packages as the directory grows across Mpumalanga and Limpopo.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
});

function BusinessPackagesPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#17242b]">
      <header className="sticky inset-x-0 top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-md">
        <div className="container-x flex h-[68px] items-center justify-between gap-3">
          <a
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Discover Lowveld Hub home"
          >
            <img src="/logo%202.jpg" alt="" className="h-9 w-9 rounded-sm object-contain" />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-sm font-semibold text-[#17242b]">Discover</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                Lowveld Hub
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
            <a
              href="/business-packages"
              aria-current="page"
              className="site-nav-link font-medium text-[#17242b]"
            >
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
        <section className="bg-white">
          <div className="container-x py-14 md:py-20">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#39703b]">
                BUSINESS LISTINGS &amp; PACKAGES
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-[#17242b] sm:text-5xl">
                Get Your Business Discovered.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#59656a]">
                Give your business an online presence on Discover. Showcase your products and
                services as the directory grows across Mpumalanga and Limpopo.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#packages"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#17242b] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
                >
                  View Packages <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/list-your-business"
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#dfe7e6] px-5 py-3 text-sm font-semibold text-[#17242b] transition-colors hover:bg-[#f7f9f9]"
                >
                  List Your Business
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="packages" className="bg-[#f8f7f3]">
          <div className="container-x py-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-[#17242b] md:text-4xl">
                Simple Pricing. Greater Visibility.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#59656a]">
                Choose how long you want your business listed on Discover.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {businessPackageOptions.map(({ value, price }) => {
                const isLongTerm = value === businessPackageValues[1];
                return (
                  <article
                    key={value}
                    className={`flex flex-col justify-between gap-8 rounded-sm border p-6 md:p-7 ${isLongTerm ? "border-[#b8cdbb] bg-[#f5f9f5]" : "border-[#dfe7e6] bg-white"}`}
                  >
                    <div>
                      <h3 className="text-base font-semibold text-[#17242b]">{value}</h3>
                      <p className="mt-5 font-display text-5xl text-[#17242b]">{price}</p>
                      <p className="mt-2 text-sm text-[#687378]">Once-off payment.</p>
                    </div>
                    <a
                      href={`/list-your-business?package=${encodeURIComponent(value)}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#17242b] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b414a]"
                    >
                      Choose {value} <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                );
              })}
            </div>

            <p className="mt-5 text-sm leading-6 text-[#59656a]">
              Exclusive listing offers may be available to invited businesses.{" "}
              <a
                href="mailto:sales@discover.lowveldhub.co.za"
                className="font-medium text-[#285448] underline underline-offset-2"
              >
                Contact our team
              </a>{" "}
              for details.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-x py-12 md:py-16">
            <h2 className="max-w-2xl font-display text-3xl text-[#17242b] md:text-4xl">
              Everything Your Business Needs to Be Discovered.
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                "Dedicated business profile.",
                "Business description and category.",
                "Business photographs.",
                "Location and map integration, where applicable.",
                "Contact details and operating hours.",
                "Website and social media links, where available.",
                "Products and services information.",
                "Shareable business profile link.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[#536267]">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#39703b]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-[#e5ebeb] bg-[#f8f7f3]">
          <div className="container-x grid gap-3 py-8 md:grid-cols-[minmax(180px,0.6fr)_minmax(0,1.4fr)] md:gap-8">
            <h2 className="text-lg font-semibold text-[#17242b]">More Ways to Get Noticed</h2>
            <p className="max-w-3xl text-sm leading-6 text-[#59656a]">
              Selected businesses may have opportunities to participate in Discover promotional
              campaigns, social media features and business spotlights. These opportunities are
              subject to selection and are not guaranteed inclusions.
            </p>
          </div>
        </section>

        <section className="bg-[#17242b] text-white">
          <div className="container-x flex flex-col items-start gap-5 py-10 md:flex-row md:items-center md:justify-between md:py-12">
            <div>
              <h2 className="font-display text-3xl">Ready to Get Discovered?</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Build your online presence as Discover expands across Mpumalanga and Limpopo.
              </p>
            </div>
            <a
              href="/list-your-business"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold text-[#17242b] transition-colors hover:bg-[#f2f5f5]"
            >
              List Your Business <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
