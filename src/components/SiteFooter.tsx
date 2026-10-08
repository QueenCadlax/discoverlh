const links = [
  ["Home", "/#top"],
  ["Categories", "/#categories"],
  ["Property", "/property"],
  ["Auto", "/categories/automotive?mode=vehicles"],
  ["Business Network", "/business-network"],
  ["List Your Business", "/list-your-business"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2d4148] bg-[#17242b] text-white">
      <div className="container-x flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2.5">
            <img src="/logo%202.jpg" alt="" className="h-8 w-8 rounded-sm object-contain" />
            <span className="flex flex-col leading-tight">
              <a href="/" className="text-sm font-semibold" aria-label="Discover home">
                Discover
              </a>
              <span className="mt-0.5 flex items-center gap-1 text-[8px] font-normal uppercase tracking-[0.16em] text-[#b7c0c2]">
                by{" "}
                <a
                  href="https://lowveldhub.co.za/"
                  className="underline underline-offset-2 hover:text-white"
                >
                  Lowveld Hub
                </a>
              </span>
            </span>
          </div>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#c1c9ca]">
            Discover businesses, places, services and experiences across Mpumalanga.
          </p>
          <p className="mt-2 max-w-sm text-[10px] leading-relaxed text-[#9ba8aa]">
            Listed businesses are independent. Details may change; confirm information directly with
            the business.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#c1c9ca]"
        >
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <nav
          aria-label="Legal and contact links"
          className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#c1c9ca]"
        >
          <a href="/privacy-policy" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms-of-use" className="transition-colors hover:text-white">
            Terms of Use
          </a>
          <a href="/business-listing-terms" className="transition-colors hover:text-white">
            Business Listing Terms
          </a>
          <a href="mailto:info@lowveldhub.co.za" className="transition-colors hover:text-white">
            Contact
          </a>
        </nav>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#c1c9ca]">
          <a
            href="mailto:sales@discover.lowveldhub.co.za"
            className="transition-colors hover:text-white"
          >
            sales@discover.lowveldhub.co.za
          </a>
          <a href="mailto:info@lowveldhub.co.za" className="transition-colors hover:text-white">
            info@lowveldhub.co.za
          </a>
          <a href="tel:+27673749762" className="transition-colors hover:text-white">
            +27 67 374 9762
          </a>
        </div>
        <p className="text-[10px] text-[#9ba8aa]">© {new Date().getFullYear()} Lowveld Hub</p>
      </div>
    </footer>
  );
}
