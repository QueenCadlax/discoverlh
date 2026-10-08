import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Home", "/"],
  ["Categories", "/#categories"],
  ["Property", "/property"],
  ["Auto", "/categories/automotive?mode=vehicles"],
  ["Business Network", "/business-network"],
  ["List Your Business", "/list-your-business"],
];

export function MobileSiteMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((open) => !open)}
        className="grid h-10 w-10 place-items-center rounded-sm border border-[#dce2e3] text-[#17242b]"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {isOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute right-0 top-full z-50 mt-2 w-[min(90vw,18rem)] border border-[#e5ebeb] bg-white p-2 shadow-[0_14px_32px_-22px_rgba(23,36,43,0.4)]"
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block min-h-11 rounded-sm px-3 py-3 text-sm font-medium text-[#34474d] hover:bg-[#f5f8f8]"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
