import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  Sparkles,
  X,
  Send,
  Loader2,
  Clock,
  RotateCcw,
  ArrowRight,
  MapPin,
  Bed,
  UtensilsCrossed,
  Compass,
  Car,
  Mountain,
  ExternalLink,
  Bookmark,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { generateItinerary, type Itinerary } from "@/lib/concierge.functions";

const PROMPTS = [
  "Plan my honeymoon",
  "Weekend getaway under R5,000",
  "Luxury safari near Kruger",
  "Romantic restaurants in Cape Town",
  "Family holiday on the Garden Route",
  "Business trip to Johannesburg",
  "Luxury villas with a private pool",
  "Best wine farms in Franschhoek",
  "Pet-friendly accommodation",
  "Create my itinerary",
];

export function ConciergeFab() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const generate = useServerFn(generateItinerary);
  const mutation = useMutation({
    mutationFn: (prompt: string) => generate({ data: { prompt } }),
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ prompt?: string }>).detail;
      setOpen(true);
      if (detail?.prompt) {
        setInput(detail.prompt);
        mutation.mutate(detail.prompt);
      }
    };
    window.addEventListener("discover:open-concierge", handler);
    return () => window.removeEventListener("discover:open-concierge", handler);
  }, [mutation]);

  const submit = (p: string) => {
    const q = p.trim();
    if (!q) return;
    setInput(q);
    mutation.mutate(q);
  };
  const reset = () => {
    mutation.reset();
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-float transition-transform hover:-translate-y-0.5"
        aria-label="Open AI Concierge"
      >
        <Sparkles className="h-4 w-4" />
        AI Concierge
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-stretch justify-end animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-card shadow-float animate-scale-in"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold">Discover Concierge</div>
                  <div className="text-xs text-muted-foreground">
                    {mutation.isPending
                      ? "Crafting your itinerary…"
                      : "Your personal travel planner"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(mutation.data || mutation.isError) && (
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> New request
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!mutation.data && !mutation.isPending && !mutation.isError && (
                <Intro prompts={PROMPTS} onPick={submit} />
              )}
              {mutation.isPending && <LoadingState query={input} />}
              {mutation.isError && (
                <div className="px-6 py-10 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
                    <X className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm text-foreground">
                    The concierge couldn't complete that request.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {mutation.error instanceof Error ? mutation.error.message : "Please try again."}
                  </p>
                  <button
                    onClick={() => submit(input)}
                    className="mt-6 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
                  >
                    Try again
                  </button>
                </div>
              )}
              {mutation.data && <ItineraryView itinerary={mutation.data} />}
            </div>

            <div className="border-t border-border bg-card px-4 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(input);
                }}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 focus-within:ring-focus"
              >
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your ideal trip…"
                  disabled={mutation.isPending}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={mutation.isPending || input.trim().length < 2}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background disabled:opacity-50"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                  {mutation.isPending ? "Planning" : "Plan"}
                </button>
              </form>
              <p className="mt-2 px-2 text-[11px] text-muted-foreground">
                Powered by Lovable AI · Itineraries are suggestions and prices are estimates in ZAR.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Intro({ prompts, onPick }: { prompts: string[]; onPick: (p: string) => void }) {
  return (
    <div className="space-y-6 px-6 py-8">
      <div className="rounded-2xl bg-section px-5 py-4 text-sm leading-relaxed">
        <span className="font-medium text-foreground">Hi — where would you like to go?</span>
        <span className="text-muted-foreground">
          {" "}
          Describe your dream trip and I'll craft a full itinerary with stays, dining and
          experiences — including estimated pricing and one-tap booking.
        </span>
      </div>
      <div>
        <p className="text-eyebrow">Try one of these</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => onPick(p)}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:shadow-soft hover:bg-secondary"
            >
              <span>{p}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingState({ query }: { query: string }) {
  return (
    <div className="space-y-4 px-6 py-8">
      <div className="rounded-2xl bg-section px-5 py-4 text-sm">
        <span className="font-medium">You:</span>{" "}
        <span className="text-muted-foreground">{query}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Curating stays, tables and experiences…
      </div>
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl bg-section"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

const typeMeta: Record<
  Itinerary["days"][number]["items"][number]["type"],
  { label: string; Icon: typeof Bed }
> = {
  stay: { label: "Accommodation", Icon: Bed },
  dining: { label: "Dining", Icon: UtensilsCrossed },
  experience: { label: "Experience", Icon: Compass },
  transfer: { label: "Transfer", Icon: Car },
  activity: { label: "Activity", Icon: Mountain },
};

function ItineraryView({ itinerary }: { itinerary: Itinerary }) {
  return (
    <div className="space-y-8 px-6 py-8">
      <div>
        <p className="text-eyebrow">Your itinerary</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{itinerary.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{itinerary.summary}</p>
        {itinerary.totalEstimateZAR != null && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-section px-4 py-2 text-sm">
            <span className="text-muted-foreground">Estimated total</span>
            <span className="font-semibold">
              R {itinerary.totalEstimateZAR.toLocaleString("en-ZA")}
            </span>
          </div>
        )}
      </div>

      {itinerary.days.map((day) => (
        <div key={day.day} className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
              {day.day}
            </span>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Day {day.day}
              </div>
              <div className="text-base font-semibold tracking-tight">{day.heading}</div>
            </div>
          </div>
          <div className="space-y-3 border-l border-border pl-5 ml-4">
            {day.items.map((item, idx) => (
              <ItemCard key={idx} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ItemCard({ item }: { item: Itinerary["days"][number]["items"][number] }) {
  const meta = typeMeta[item.type] ?? typeMeta.activity;
  const Icon = meta.Icon;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name} ${item.location}`)}`;
  const bookType = item.type === "dining" ? "dining" : item.type === "stay" ? "stay" : "experience";
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>{meta.label}</span>
            <span className="text-border">•</span>
            <Clock className="h-3.5 w-3.5" />
            <span>{item.time}</span>
          </div>
          <div className="mt-2 text-base font-semibold tracking-tight">{item.name}</div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <MapPin className="h-3 w-3" /> {item.location}
            <ExternalLink className="h-3 w-3" />
          </a>
          {item.description && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          )}
        </div>
        {item.priceZAR != null && (
          <div className="shrink-0 text-right">
            <div className="text-sm font-semibold">R {item.priceZAR.toLocaleString("en-ZA")}</div>
            <div className="text-[11px] text-muted-foreground">estimate</div>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          to="/book"
          search={{
            type: bookType,
            name: item.name,
            location: item.location,
            price: item.priceZAR,
            priceUnit: bookType === "stay" ? "per night" : "per person",
            hint:
              item.bookingHint ??
              (bookType === "dining"
                ? "Reserve table"
                : bookType === "stay"
                  ? "Reserve stay"
                  : "Book experience"),
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:-translate-y-0.5 transition-transform"
        >
          {bookType === "dining"
            ? "Reserve table"
            : bookType === "stay"
              ? "Book now"
              : "Book experience"}
          <ArrowRight className="h-3 w-3" />
        </Link>
        <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-secondary">
          <Bookmark className="h-3 w-3" /> Save
        </button>
      </div>
    </div>
  );
}
