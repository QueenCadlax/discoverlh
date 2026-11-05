const links = [
  ["Home", "/#top"],
  ["Categories", "/#categories"],
  ["Business Packages", "/business-packages"],
  ["List Your Business", "/list-your-business"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2d4148] bg-[#17242b] text-white">
      <div className="container-x">
        <div className="grid gap-8 py-8 sm:grid-cols-2 md:grid-cols-[1.4fr_0.8fr_1fr] md:gap-12 md:py-10">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <img src="/logo%202.jpg" alt="" className="h-8 w-8 rounded-sm object-contain" />
              <span className="flex flex-col leading-tight">
                <a href="/" className="text-sm font-semibold" aria-label="Discover home">
                  Discover
                </a>
                <span className="mt-0.5 flex items-center gap-1 text-[8px] font-normal uppercase tracking-[0.16em] text-[#b7c0c2]">
                  <a
                    href="https://lowveldhub.co.za/"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Lowveld Hub
                  </a>
                </span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-5 text-[#c1c9ca]">
              Growing local discovery across Mpumalanga and Limpopo.
            </p>
            <p className="mt-2 text-[10px] leading-5 text-[#9ba8aa]">
              Listed businesses operate independently.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9ba8aa]">
              Explore
            </h2>
            <ul className="mt-3 grid gap-3 text-xs text-[#c1c9ca]">
              {links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 md:col-span-1">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9ba8aa]">
              Get in touch
            </h2>
            <div className="mt-3 grid gap-3 text-xs text-[#c1c9ca]">
              <a
                href="mailto:discover@lowveldhub.co.za"
                className="break-words transition-colors hover:text-white"
              >
                discover@lowveldhub.co.za
              </a>
              <a
                href="mailto:sales@discover.lowveldhub.co.za"
                className="break-words transition-colors hover:text-white"
              >
                sales@discover.lowveldhub.co.za
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#2d4148] py-4 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Legal links"
            className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-[#9ba8aa]"
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
          </nav>
          <p className="text-[10px] text-[#9ba8aa]">© {new Date().getFullYear()} Lowveld Hub</p>
        </div>
      </div>
    </footer>
  );
}
