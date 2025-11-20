import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCrad";
import ForecastList from "./components/ForecastList";
import HourlyForecast from "./components/HourlyForecast";
import UnitToggle from "./components/UnitToggle";
import {
  getCoordinates,
  getCurrentWeather,
  getDailyForecast,
  getHourlyForecast,
} from "./services/weatherApi";

function App() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const convertTemp = (temp: number) =>
    unit === "imperial" ? Math.round((temp * 9) / 5 + 32) : temp;

  const convertWind = (speed: number) =>
    unit === "imperial" ? Math.round(speed / 1.609) : speed;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hourly, setHourly] = useState<null | {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  }>(null);

  const [forecast, setForecast] = useState<null | {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  }>(null);

  const [weather, setWeather] = useState<{
    temperature: number;
    windSpeed: number;
    weatherCode: number;
  } | null>(null);

  const [location, setLocation] = useState<{
    name: string;
    lat: number;
    lon: number;
    country: string;
  } | null>(null);

  const handleSearch = async (city: string) => {
    try {
      const result = await getCoordinates(city);
      setLocation(result);

      const weatherData = await getCurrentWeather(result.lat, result.lon);
      setWeather({
        temperature: weatherData.temperature,
        windSpeed: weatherData.windspeed,
        weatherCode: weatherData.weathercode,
      });

      const daily = await getDailyForecast(result.lat, result.lon);
      setForecast(daily);

      const hourlyData = await getHourlyForecast(result.lat, result.lon);
      setHourly(hourlyData);
    } catch (err) {
      console.error(err);
      setLocation(null);
      setWeather(null);
      setForecast(null);
      setHourly(null);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Weather App
      </h1>

      <SearchBar onSearch={handleSearch} />
      <UnitToggle unit={unit} onToggle={toggleUnit} />

      {location && (
        <div className="bg-white rounded-xl shadow-md p-4 text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {location.name}, {location.country}
          </h2>
          <p className="text-sm text-gray-600">Latitude: {location.lat}</p>
          <p className="text-sm text-gray-600">Longitude: {location.lon}</p>
        </div>
      )}

      {weather && (
        <WeatherCard
          temperature={convertTemp(weather.temperature)}
          windSpeed={convertWind(weather.windSpeed)}
          weatherCode={weather.weatherCode}
        />
      )}

      {forecast && (
        <ForecastList
          forecast={forecast}
          onSelect={(date) => setSelectedDate(date)}
        />
      )}

      {hourly && selectedDate && (
        <HourlyForecast hourly={hourly} selectedDate={selectedDate} />
      )}
    </main>
  );
}

export default App;