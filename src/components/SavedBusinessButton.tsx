import { useEffect, useState, type MouseEvent } from "react";
import { Heart } from "lucide-react";

const savedBusinessStorageKey = "discover:saved-businesses:v1";
const savedBusinessesChangedEvent = "discover:saved-businesses-changed";

export function SavedBusinessButton({
  id,
  name,
  compact = false,
}: {
  id: string;
  name: string;
  compact?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const syncSavedState = (event?: Event) => {
      try {
        if (event instanceof StorageEvent && event.key === savedBusinessStorageKey) {
          const parsed: unknown = event.newValue ? JSON.parse(event.newValue) : [];
          if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
            throw new Error("Saved businesses could not be read.");
          }
          setSaved(parsed.includes(id));
        } else {
          setSaved(readSavedBusinessIds().includes(id));
        }
      } catch {
        setStatus("Saved businesses are unavailable in this browser.");
      }
    };
    const onSavedBusinessesChanged = () => syncSavedState();
    syncSavedState();
    window.addEventListener("storage", syncSavedState);
    window.addEventListener(savedBusinessesChangedEvent, onSavedBusinessesChanged);
    return () => {
      window.removeEventListener("storage", syncSavedState);
      window.removeEventListener(savedBusinessesChangedEvent, onSavedBusinessesChanged);
    };
  }, [id]);

  function toggleSaved(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    try {
      const savedIds = readSavedBusinessIds();
      const next = saved
        ? savedIds.filter((savedId) => savedId !== id)
        : [...new Set([...savedIds, id])];
      window.localStorage.setItem(savedBusinessStorageKey, JSON.stringify(next));
      setSaved(!saved);
      setStatus(saved ? "Removed from saved businesses." : "Saved on this device.");
      window.dispatchEvent(new Event(savedBusinessesChangedEvent));
    } catch {
      setStatus("Could not save this business in this browser.");
    }
  }

  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      aria-pressed={saved}
      onClick={toggleSaved}
      className={
        compact
          ? `absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-[0_1px_8px_rgba(20,30,30,.18)] transition-[transform,color,background-color] duration-200 hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172a31] motion-reduce:transition-none ${saved ? "text-[#c84f58]" : "text-[#34474d]"}`
          : `inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] sm:text-sm ${saved ? "border-[#e7c6c8] bg-[#fff7f7] text-[#b9434e]" : "border-[#d7e0e0] bg-white text-[#34474d] hover:border-[#aac3ca] hover:bg-[#f7faf9]"}`
      }
    >
      <Heart
        aria-hidden="true"
        className={compact ? "h-[17px] w-[17px]" : "h-4 w-4"}
        fill={saved ? "currentColor" : "none"}
        strokeWidth={1.8}
      />
      {!compact && (saved ? "Saved" : "Save")}
      <span className="sr-only" role="status" aria-live="polite">
        {status}
      </span>
    </button>
  );
}

function readSavedBusinessIds(): string[] {
  const parsed: unknown = JSON.parse(window.localStorage.getItem(savedBusinessStorageKey) ?? "[]");
  if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
    throw new Error("Saved businesses could not be read.");
  }
  return parsed;
}
