import { useEffect, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LoaderCircle, MapPin, MessageCircle, Send, X } from "lucide-react";

import { findDirectoryMatches } from "@/lib/concierge.functions";

const exampleRequests = [
  "Find a builder in Mbombela",
  "Affordable accommodation near Hazyview",
  "Find a local car repair service",
];

export function DirectoryAssistant() {
  const [open, setOpen] = useState(false);
  const [formControlFocused, setFormControlFocused] = useState(false);
  const [prompt, setPrompt] = useState("");
  const findMatches = useServerFn(findDirectoryMatches);
  const mutation = useMutation({
    mutationFn: (request: string) => findMatches({ data: { prompt: request } }),
  });

  useEffect(() => {
    const isFormControl = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      target.matches("input, textarea, select, [contenteditable='true']");
    let focusFrame = 0;
    const handleFocus = () => {
      cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(() => {
        setFormControlFocused(isFormControl(document.activeElement));
      });
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleFocus);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleFocus);
      cancelAnimationFrame(focusFrame);
    };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const request = prompt.trim();
    if (request.length >= 2) mutation.mutate(request);
  }

  function ask(request: string) {
    setPrompt(request);
    mutation.mutate(request);
  }

  return (
    <>
      <div
        aria-hidden={formControlFocused}
        className={`fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-40 flex items-center gap-2 transition-opacity sm:bottom-4 sm:right-4 ${formControlFocused ? "pointer-events-none invisible opacity-0" : "opacity-100"}`}
      >
        <a
          href="https://wa.me/27673749762"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Lowveld Hub on WhatsApp"
          title="Chat on WhatsApp"
          className="grid h-10 w-10 place-items-center rounded-full bg-[#25d366] text-white shadow-md transition-colors hover:bg-[#1fb85a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b32] sm:h-8 sm:w-8"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 min-w-[52px] items-center justify-center rounded-full bg-[#173b32] px-2 text-[11px] font-semibold text-white shadow-md transition-colors hover:bg-[#285448] sm:h-8 sm:min-h-8 sm:w-auto sm:gap-1.5 sm:rounded-sm sm:px-2.5"
          aria-label="Open Lowveld Hub Assistant"
        >
          <span className="sm:hidden">LH AI</span>
          <span className="hidden sm:inline">Lowveld Hub Assistant</span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/35"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="directory-assistant-title"
            className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[#e5ebeb] px-5 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#39703b]">
                  Lowveld Hub Assistant
                </p>
                <h2
                  id="directory-assistant-title"
                  className="mt-1 text-lg font-semibold text-[#172a31]"
                >
                  Find the right local business
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-sm hover:bg-[#f1f4f4]"
                aria-label="Close Lowveld Hub Assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {!mutation.data && !mutation.isPending && !mutation.isError && (
                <div>
                  <p className="max-w-md text-sm leading-6 text-[#536267]">
                    Describe what you need, where you need it, and any budget or service
                    requirements.
                  </p>
                  <div className="mt-5 grid gap-2">
                    {exampleRequests.map((request) => (
                      <button
                        key={request}
                        type="button"
                        onClick={() => ask(request)}
                        className="min-h-11 rounded-sm border border-[#dce4e5] px-3 text-left text-sm text-[#34474d] hover:bg-[#f7f9f9]"
                      >
                        {request}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mutation.isPending && (
                <p className="flex items-center gap-2 text-sm text-[#536267]" role="status">
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Checking listed businesses
                  against your request…
                </p>
              )}

              {mutation.isError && (
                <div role="alert" className="border-l-2 border-[#a53e34] py-1 pl-3">
                  <p className="text-sm font-semibold text-[#172a31]">
                    Search is temporarily unavailable.
                  </p>
                  <p className="mt-1 text-sm text-[#68767a]">Please try again in a moment.</p>
                </div>
              )}

              {mutation.data?.inventoryEmpty && (
                <div className="border-l-2 border-[#a58c61] py-1 pl-3">
                  <p className="text-sm font-semibold text-[#172a31]">
                    No businesses are listed yet.
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#68767a]">
                    The directory currently has no business records to recommend. Check back as
                    local businesses join.
                  </p>
                </div>
              )}

              {mutation.data &&
                !mutation.data.inventoryEmpty &&
                mutation.data.matches.length === 0 && (
                  <p className="text-sm leading-6 text-[#536267]">
                    No listed business clearly matches that request. Try a different town, service,
                    or requirement.
                  </p>
                )}

              {mutation.data && mutation.data.matches.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-medium text-[#68767a]">Matches for “{prompt}”</p>
                  <ul className="divide-y divide-[#e5ebeb]">
                    {mutation.data.matches.map((match) => (
                      <li key={`${match.category}:${match.listingId}`} className="py-4">
                        <a
                          href={match.href}
                          className="text-base font-semibold text-[#172a31] hover:underline"
                        >
                          {match.name}
                        </a>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#788589]">
                          <MapPin className="h-3.5 w-3.5" />
                          {[match.categoryLabel, match.location].filter(Boolean).join(" · ")}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#536267]">{match.reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <form
              onSubmit={submit}
              className="flex items-center gap-2 border-t border-[#e5ebeb] p-4"
            >
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                maxLength={600}
                placeholder="What are you looking for?"
                aria-label="Describe the business or service you need"
                className="min-h-11 min-w-0 flex-1 rounded-sm border border-[#dce4e5] px-3 text-sm outline-none focus:border-[#39703b]"
              />
              <button
                type="submit"
                disabled={prompt.trim().length < 2 || mutation.isPending}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-[#173b32] text-white hover:bg-[#285448] disabled:opacity-50"
                aria-label="Search directory"
              >
                {mutation.isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
