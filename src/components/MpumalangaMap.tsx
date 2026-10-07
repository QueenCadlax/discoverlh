import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

import { locationDiscovery } from "@/lib/location-discovery";

type Coordinates = [number, number];

export type MpumalangaMapPlace = {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  href?: string;
  locationAccuracy?: "address" | "approximate";
};

type LeafletMarker = {
  addTo(map: LeafletMap): LeafletMarker;
  bindPopup(content: string, options?: object): LeafletMarker;
  on(event: string, handler: () => void): LeafletMarker;
  openPopup(): LeafletMarker;
};

type LeafletMap = {
  fitBounds(bounds: Coordinates[], options?: object): LeafletMap;
  flyTo(coordinates: Coordinates, zoom?: number, options?: object): LeafletMap;
  getZoom(): number;
  remove(): void;
  setZoom(zoom: number): LeafletMap;
};

type LeafletNamespace = {
  divIcon(options: object): unknown;
  map(element: HTMLElement, options?: object): LeafletMap;
  marker(coordinates: Coordinates, options?: object): LeafletMarker;
  tileLayer(url: string, options: object): { addTo(map: LeafletMap): void };
};

function loadLeaflet(): Promise<LeafletNamespace> {
  const leafletWindow = window as typeof window & { L?: LeafletNamespace };
  if (leafletWindow.L) return Promise.resolve(leafletWindow.L);

  if (!document.querySelector('link[data-leaflet-styles="true"]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    stylesheet.dataset.leafletStyles = "true";
    document.head.append(stylesheet);
  }

  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>('script[data-leaflet-script="true"]');
    if (!script) {
      script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.dataset.leafletScript = "true";
      document.head.append(script);
    }

    script.addEventListener(
      "load",
      () => {
        if (leafletWindow.L) resolve(leafletWindow.L);
        else reject(new Error("The map library did not initialize."));
      },
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error("The map library could not load.")), {
      once: true,
    });
  });
}

export function MpumalangaMap({
  onSelectTown,
  places,
  heading = "Explore Mpumalanga",
  description = "Discover towns and explore local businesses across the province.",
  placeLabel = "stay",
  placesLabel = "stays",
  showZoomControls = true,
  showTownArrows = true,
}: {
  onSelectTown?: (townName: string) => void;
  places?: readonly MpumalangaMapPlace[];
  heading?: string;
  description?: string;
  placeLabel?: string;
  placesLabel?: string;
  showZoomControls?: boolean;
  showTownArrows?: boolean;
}) {
  const availablePlaces = places ?? locationDiscovery;
  const placesSignature = JSON.stringify(availablePlaces);
  const mapPlaces = useMemo(
    () => JSON.parse(placesSignature) as MpumalangaMapPlace[],
    [placesSignature],
  );
  const customPlaces = places !== undefined;
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const townMarkers = useRef(new Map<string, LeafletMarker>());
  const onSelectTownRef = useRef(onSelectTown);
  const [selectedTown, setSelectedTown] = useState(mapPlaces[0]?.name ?? "Mbombela");
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    onSelectTownRef.current = onSelectTown;
  }, [onSelectTown]);

  useEffect(() => {
    setSelectedTown((current) =>
      mapPlaces.some((place) => place.name === current) ? current : (mapPlaces[0]?.name ?? ""),
    );
  }, [mapPlaces]);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;
    const markers = townMarkers.current;

    setMapLoading(true);
    setMapError(false);
    void loadLeaflet()
      .then((leaflet) => {
        if (cancelled || !mapElement.current) return;

        map = leaflet
          .map(mapElement.current, {
            scrollWheelZoom: false,
            attributionControl: false,
            zoomControl: showZoomControls,
          })
          .fitBounds(
            mapPlaces.map((town) => [town.latitude, town.longitude]),
            { padding: [36, 36] },
          );
        map.setZoom(Math.max(customPlaces ? 11 : 5, map.getZoom() - 1));
        mapInstance.current = map;

        leaflet
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          })
          .addTo(map);

        mapPlaces.forEach((town) => {
          const marker = leaflet
            .marker([town.latitude, town.longitude], {
              alt: town.name,
              icon: leaflet.divIcon({
                className: "",
                html: '<span class="mp-town-pin"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span>',
                iconSize: [20, 26],
                iconAnchor: [10, 24],
              }),
              riseOnHover: true,
              title: town.name,
            })
            .addTo(map as LeafletMap)
            .bindPopup(
              `<strong>${escapeMapHtml(town.name)}</strong><br><span>${escapeMapHtml(town.description ?? (customPlaces ? "Accommodation listing" : "Explore local businesses"))}</span>`,
              { closeButton: false, offset: [0, -28] },
            );
          marker.on("mouseover", () => {
            setSelectedTown(town.name);
            marker.openPopup();
          });
          marker.on("click", () => {
            setSelectedTown(town.name);
            if (!customPlaces) onSelectTownRef.current?.(town.name);
          });
          markers.set(town.name, marker);
        });
        setMapLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setMapError(true);
          setMapLoading(false);
        }
      });

    return () => {
      cancelled = true;
      markers.clear();
      const activeMap = mapInstance.current ?? map;
      activeMap?.remove();
      mapInstance.current = null;
    };
  }, [customPlaces, mapPlaces, showZoomControls]);

  const selectTown = (townName: string, latitude: number, longitude: number) => {
    setSelectedTown(townName);
    mapInstance.current?.flyTo([latitude, longitude], customPlaces ? 14 : 10, { duration: 0.45 });
    townMarkers.current.get(townName)?.openPopup();
    if (!customPlaces) onSelectTown?.(townName);
  };
  const activePlace = mapPlaces.find((place) => place.name === selectedTown) ?? mapPlaces[0];

  return (
    <section className="bg-[#f6f9f9] py-6 md:py-8">
      <div className="container-x">
        <div className="mb-4 md:mb-5">
          <h2 className="font-display text-xl font-medium text-[#17242b] md:text-2xl">{heading}</h2>
          <p className="mt-2 text-sm text-[#687378]">{description}</p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="relative h-[280px] overflow-hidden rounded-md border border-[#dfe9ed] bg-[#e8edef] shadow-[0_18px_40px_-30px_rgba(21,44,54,0.45)] sm:h-[350px]">
            <div
              ref={mapElement}
              className="h-full w-full"
              role="application"
              aria-label={
                customPlaces
                  ? `Interactive map of ${placesLabel}`
                  : "Interactive street map of Mpumalanga towns"
              }
            />
            {mapLoading && (
              <div
                role="status"
                className="absolute inset-0 z-[500] grid place-items-center bg-[#eef2f3] text-sm text-[#526671]"
              >
                Loading map…
              </div>
            )}
            {mapError && (
              <div className="absolute inset-0 z-[500] grid place-items-center bg-[#eef2f3] p-6 text-center text-sm text-[#526671]">
                {customPlaces
                  ? `The map could not be loaded. Use the ${placesLabel} list to open this listing.`
                  : "The map could not be loaded. Choose a town from the list to explore businesses."}
              </div>
            )}
            <div className="pointer-events-none absolute left-3 top-[78px] z-[400] rounded-sm border border-[#dfe8eb] bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6b808d]">
                {customPlaces ? `Selected ${placeLabel}` : "Selected town"}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-[#17242b]">
                <MapPin className="h-3.5 w-3.5 text-[#28718a]" /> {selectedTown}
              </p>
            </div>
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-0 right-0 z-[400] bg-white/85 px-1.5 py-0.5 text-[9px] leading-tight text-[#526671] hover:text-[#17242b]"
            >
              &copy; OpenStreetMap contributors
            </a>
          </div>

          <aside className="rounded-md border border-[#dfe9ed] bg-white p-2.5 md:p-3">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6b808d]">
              {customPlaces ? placesLabel : "Towns"}
            </p>
            {customPlaces && activePlace?.description && (
              <div className="mb-2 border-b border-[#e8eef1] pb-3">
                <h3 className="text-sm font-semibold text-[#17242b]">{activePlace.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#687378]">
                  {activePlace.description}
                </p>
                {activePlace.locationAccuracy === "approximate" && (
                  <p className="mt-1 text-[10px] text-[#788589]">Map position is approximate</p>
                )}
                {activePlace.href && (
                  <a
                    href={activePlace.href}
                    className="mt-2 inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-[#34474d] underline underline-offset-4 hover:text-[#39703b]"
                  >
                    View {placeLabel} <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}
            <div className="grid max-h-[320px] grid-cols-2 gap-1.5 overflow-y-auto sm:grid-cols-3 lg:grid-cols-1">
              {mapPlaces.map((town) => (
                <button
                  key={town.name}
                  type="button"
                  onClick={() => selectTown(town.name, town.latitude, town.longitude)}
                  aria-pressed={selectedTown === town.name}
                  className={`flex min-h-9 items-center justify-between gap-1.5 rounded-sm border px-2 py-1.5 text-left text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28718a] sm:text-xs ${
                    selectedTown === town.name
                      ? "border-[#9bb9c4] bg-[#edf5f7] font-semibold text-[#17242b]"
                      : "border-[#e8eef1] text-[#475d69] hover:border-[#c8dfe8] hover:bg-[#f2f8fa]"
                  }`}
                >
                  <span className="truncate">{town.name}</span>
                  {showTownArrows && <ArrowRight className="h-3.5 w-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function escapeMapHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}
