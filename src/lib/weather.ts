import { locationDiscovery } from "./location-discovery";

export type WeatherSnapshot = {
  locationName: string;
  latitude: number;
  longitude: number;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionCode: number;
  high: number;
  low: number;
  updatedAt: string;
  forecast: Array<{
    day: string;
    code: number;
    high: number;
    low: number;
  }>;
};

const weatherCache = new Map<string, { expiresAt: number; data: WeatherSnapshot }>();

const weatherCodeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Foggy",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Showers",
  81: "Heavy showers",
  82: "Violent showers",
  85: "Light snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm",
};

export function getWeatherLabel(code: number) {
  return weatherCodeMap[code] ?? "Conditions vary";
}

function formatDayLabel(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);
}

function getTownByName(name: string) {
  return locationDiscovery.find((town) => town.name === name);
}

export function getDefaultWeatherTown() {
  return "Mbombela";
}

export async function getWeatherForCoordinates(
  latitude: number,
  longitude: number,
  locationName = "My location",
): Promise<WeatherSnapshot> {
  const cacheKey = `${latitude.toFixed(3)}:${longitude.toFixed(3)}`;
  const now = Date.now();
  const cached = weatherCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,apparent_temperature,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "auto",
    forecast_days: "3",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Weather service unavailable (${response.status}).`);
  }

  const payload = await response.json();
  const current = payload.current;
  const daily = payload.daily;

  if (!current || !daily) {
    throw new Error("Weather data is missing.");
  }

  const high = Number(daily.temperature_2m_max?.[0]);
  const low = Number(daily.temperature_2m_min?.[0]);
  const code = Number(current.weather_code ?? 0);
  const weather: WeatherSnapshot = {
    locationName,
    latitude,
    longitude,
    temperature: Number(current.temperature_2m),
    feelsLike: Number(current.apparent_temperature),
    condition: getWeatherLabel(code),
    conditionCode: code,
    high: Number.isFinite(high) ? high : Number(current.temperature_2m),
    low: Number.isFinite(low) ? low : Number(current.temperature_2m),
    updatedAt: new Date().toISOString(),
    forecast: (daily.time ?? []).slice(0, 3).map((day: string, index: number) => ({
      day: formatDayLabel(day),
      code: Number(daily.weather_code?.[index] ?? 0),
      high: Number(daily.temperature_2m_max?.[index] ?? 0),
      low: Number(daily.temperature_2m_min?.[index] ?? 0),
    })),
  };

  weatherCache.set(cacheKey, { expiresAt: now + 30 * 60 * 1000, data: weather });
  return weather;
}

export async function getWeatherForTown(townName: string): Promise<WeatherSnapshot> {
  const town = getTownByName(townName) ?? getTownByName(getDefaultWeatherTown());

  if (!town) {
    throw new Error("Town not found.");
  }

  return getWeatherForCoordinates(town.latitude, town.longitude, town.name);
}
