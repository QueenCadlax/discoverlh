import { useState } from "react";

export function DiscoveryCardImage({
  image,
  alt,
  name,
  fit = "cover",
}: {
  image?: string;
  alt: string;
  name: string;
  fit?: "cover" | "contain";
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative block aspect-[4/3] overflow-hidden rounded-t-xl bg-[#eef2f1]">
      {image && !imageFailed ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => {
            setImageFailed(true);
          }}
          className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} transition-[transform,filter] duration-500 group-hover:scale-[1.04] group-hover:contrast-[1.02] motion-reduce:transform-none`}
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid h-full place-items-center bg-[radial-gradient(circle_at_top,_#f7f4ec_0%,_#edf2f1_38%,_#dfe9e3_100%)]"
        >
          <span className="font-display text-3xl font-medium tracking-[0.25em] text-[#8a7655]">
            {initials || "LH"}
          </span>
        </div>
      )}
    </div>
  );
}
