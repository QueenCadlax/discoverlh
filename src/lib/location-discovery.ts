export const locationDiscovery = [
  {
    name: "Mbombela",
    latitude: -25.4745,
    longitude: 30.9703,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "White River",
    latitude: -25.3318,
    longitude: 31.0117,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Hazyview",
    latitude: -25.0436,
    longitude: 31.1306,
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Sabie",
    latitude: -25.0965,
    longitude: 30.7802,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Barberton",
    latitude: -25.7884,
    longitude: 31.0532,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Lydenburg",
    latitude: -25.095,
    longitude: 30.4597,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "eMalahleni",
    latitude: -25.8713,
    longitude: 29.2332,
    image:
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Middelburg",
    latitude: -25.7751,
    longitude: 29.4648,
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Secunda",
    latitude: -26.55,
    longitude: 29.17,
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Ermelo",
    latitude: -26.5333,
    longitude: 29.9833,
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Mkhondo / Piet Retief",
    latitude: -27.0071,
    longitude: 30.8132,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Komatipoort",
    latitude: -25.4332,
    longitude: 31.9548,
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=85",
  },
] as const;

export const mpumalangaLocations = locationDiscovery.map(({ name }) => name);

export function locationSlug(name: string) {
  return name
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
