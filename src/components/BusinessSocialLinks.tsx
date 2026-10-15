import {
  Facebook,
  Instagram,
  Link2,
  Linkedin,
  MessageCircle,
  Music2,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

type SocialLink = { label: string; href: string };

const socialIcons: { match: RegExp; icon: LucideIcon; color: string }[] = [
  { match: /facebook|fb\.com/i, icon: Facebook, color: "#1877f2" },
  { match: /instagram/i, icon: Instagram, color: "#c13584" },
  { match: /linkedin/i, icon: Linkedin, color: "#0a66c2" },
  { match: /youtube|youtu\.be/i, icon: Youtube, color: "#e62117" },
  { match: /twitter|(^|[^a-z])x([^a-z]|$)/i, icon: Twitter, color: "#17242b" },
  { match: /tiktok/i, icon: Music2, color: "#17242b" },
  { match: /whatsapp/i, icon: MessageCircle, color: "#16834b" },
];

function getSocialIcon(label: string, href: string) {
  const platform = `${label} ${href}`;
  return (
    socialIcons.find(({ match }) => match.test(platform)) ?? {
      icon: Link2,
      color: "#536267",
    }
  );
}

export function BusinessSocialLinks({
  businessName,
  links,
}: {
  businessName: string;
  links: SocialLink[];
}) {
  if (!links.length) return null;

  return (
    <section aria-label={`${businessName} social media`} className="border-t border-[#e5ebeb] pt-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a7655]">
        Find us online
      </p>
      <p className="mt-1 text-xs text-[#68767a]">Follow {businessName} on social media.</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((link) => {
          const { icon: Icon, color } = getSocialIcon(link.label, link.href);
          return (
            <li key={`${link.label}-${link.href}`}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow ${businessName} on ${link.label}`}
                title={link.label}
                className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-[#e1e7e6] bg-white py-1 pl-1 pr-3 text-xs font-medium text-[#34474d] shadow-[0_2px_8px_-6px_rgba(23,42,49,.3)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#bdcbc7] hover:shadow-[0_8px_18px_-12px_rgba(23,42,49,.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] motion-reduce:transform-none"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f4f7f6] transition-colors group-hover:bg-[#edf2f0]">
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4"
                    style={{ color }}
                    strokeWidth={1.8}
                  />
                </span>
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
