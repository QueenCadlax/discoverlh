import { SiteFooter } from "@/components/SiteFooter";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-white text-[#17242b]">
      <header className="border-b border-[#e5ebeb] bg-white">
        <div className="container-x flex min-h-[68px] flex-wrap items-center justify-between gap-3 py-3">
          <a href="/" className="flex items-center gap-2" aria-label="Discover by Lowveld Hub home">
            <img src="/logo%202.jpg" alt="" className="h-8 w-8 rounded-sm object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Discover</span>
              <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#687378]">
                by Lowveld Hub
              </span>
            </span>
          </a>
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#59656a] sm:gap-6 sm:text-sm"
          >
            <a href="/" className="hover:text-[#17242b]">
              Home
            </a>
            <a href="/#categories" className="hover:text-[#17242b]">
              Categories
            </a>
            <a href="/business-network" className="hover:text-[#17242b]">
              Business Network
            </a>
            <a href="/list-your-business" className="hover:text-[#17242b]">
              List Your Business
            </a>
          </nav>
        </div>
      </header>

      <main className="container-x max-w-4xl py-8 md:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7655]">
          Discover by Lowveld Hub
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium leading-tight text-[#17242b] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#687378]">{description}</p>
        <div className="mt-8 divide-y divide-[#e5ebeb] border-y border-[#e5ebeb]">
          {sections.map(({ heading, paragraphs }) => (
            <section key={heading} className="py-5">
              <h2 className="text-base font-semibold text-[#17242b]">{heading}</h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-sm leading-6 text-[#536267]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
