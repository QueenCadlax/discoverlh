import {
  BedDouble,
  BriefcaseBusiness,
  CalendarDays,
  CarFront,
  Compass,
  GraduationCap,
  HeartPulse,
  House,
  MapPin,
  Plane,
  Scale,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Utensils,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  stay: BedDouble,
  eat: Utensils,
  events: CalendarDays,
  shop: ShoppingBag,
  travel: Plane,
  "travel-transport": Plane,
  services: BriefcaseBusiness,
  professional: Scale,
  "professional-services": Scale,
  "home-property": House,
  "home-construction": House,
  automotive: CarFront,
  health: Stethoscope,
  "health-wellness": HeartPulse,
  "personal-beauty": Scissors,
  beauty: Scissors,
  property: House,
  "education-training": GraduationCap,
};

type CategoryIconProps = {
  src?: string;
  alt?: string;
  className: string;
};

export function CategoryIcon({ src, alt = "", className }: CategoryIconProps) {
  if (!src) return null;
  const iconName = src.split("/").pop()?.replace(/\.svg$/, "") ?? "";
  const fallbackIconName = iconName.replace(/[-_\s]+/g, "-").toLowerCase();
  const Icon = categoryIcons[fallbackIconName] ?? MapPin;

  return (
    <Icon
      aria-label={alt || undefined}
      aria-hidden={!alt}
      role={alt ? "img" : undefined}
      strokeWidth={1.6}
      className={className}
    />
  );
}

export function CategoryCard({
  href,
  label,
  description,
  icon,
}: {
  href: string;
  label: string;
  description: string;
  icon?: string;
}) {
  return (
    <a
      href={href}
      aria-label={`Browse ${label}`}
      className="group flex h-full min-h-[108px] w-full min-w-0 items-center gap-2.5 rounded-md border border-[#e3e8e7] bg-white p-2.5 text-left transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#c7d4d1] hover:shadow-[0_10px_22px_-18px_rgba(36,87,82,.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] motion-reduce:transition-none sm:min-h-[116px] sm:gap-3 sm:p-3"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#142b4a] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <CategoryIcon
          src={icon}
          alt=""
          className="h-[19px] w-[19px] transition-colors group-hover:text-[#d8c49e]"
        />
      </span>
      <span className="flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden">
        <span className="block line-clamp-2 break-words text-xs font-semibold leading-[1.2] text-[#17242b] sm:text-sm">
          {label}
        </span>
        <span className="mt-1 block line-clamp-2 break-words text-[10px] leading-[14px] text-[#687378] sm:text-xs sm:leading-4">
          {description}
        </span>
      </span>
    </a>
  );
}
