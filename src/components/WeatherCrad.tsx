import { weatherCodeMap } from './weatherCodeMap' 

type Props = {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
};

export default function WeatherCard({ temperature, windSpeed, weatherCode }: Props) {
  const weatherInfo = weatherCodeMap[weatherCode];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🌤️ Current Weather</h2>
      <p className="text-lg text-gray-700 mb-2">
        🌡️ Temperature: <span className="font-semibold">{temperature}°C</span>
      </p>
      <p className="text-lg text-gray-700 mb-2">
        💨 Wind Speed: <span className="font-semibold">{windSpeed} km/h</span>
      </p>
      <p className="text-lg text-gray-700">
        {weatherInfo?.icon} <span className="font-semibold">{weatherInfo?.label}</span>
      </p>
    </div>
  );
}