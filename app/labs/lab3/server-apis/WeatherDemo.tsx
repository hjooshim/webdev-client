import "server-only";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=42.34&longitude=-71.09" +
  "&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph";

type Weather = {
  current: { time: string; temperature_2m: number; wind_speed_10m: number };
};

function isWeather(value: unknown): value is Weather {
  if (typeof value !== "object" || value === null || !("current" in value)) return false;
  const current = value.current;
  return (
    typeof current === "object" &&
    current !== null &&
    "time" in current &&
    "temperature_2m" in current &&
    "wind_speed_10m" in current &&
    typeof current.time === "string" &&
    typeof current.temperature_2m === "number" &&
    typeof current.wind_speed_10m === "number"
  );
}

export default async function WeatherDemo() {
  let weather: Weather | null = null;
  let error: string | null = null;
  try {
    const response = await fetch(WEATHER_URL, { next: { revalidate: 1800 } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const value: unknown = await response.json();
    if (!isWeather(value)) throw new Error("Unexpected response format");
    weather = value;
  } catch (err) {
    error = err instanceof Error ? err.message : "unknown error";
  }
  return (
    <div id="wd-weather-demo">
      <h3>Weather in Boston (Open-Meteo)</h3>
      {weather ? (
        <ul>
          <li>Temperature: {weather.current.temperature_2m} °F</li>
          <li>Wind: {weather.current.wind_speed_10m} mph</li>
          <li>Measured at (UTC): {weather.current.time}</li>
        </ul>
      ) : (
        <p>Weather is unavailable right now: {error}</p>
      )}
    </div>
  );
}
