import { weatherCodeMap } from "./weatherCodeMap";

type Props = {
  forecast: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  onSelect: (date: string) => void;
};

export default function ForecastList({ forecast, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {forecast.time.map((date, i) => {
        const weather = weatherCodeMap[forecast.weathercode[i]];
        return (
          <div
            key={date}
            className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:bg-blue-50 transition"
            onClick={() => onSelect(date)} // ✅ اصلاح شد
          >
            <p className="font-semibold text-gray-700">{new Date(date).toDateString()}</p>
            <p className="text-2xl">{weather?.icon}</p>
            <p className="text-sm text-gray-600">{weather?.label}</p>
            <p className="text-sm mt-2">
              🌡️ {forecast.temperature_2m_min[i]}°C → {forecast.temperature_2m_max[i]}°C
            </p>
          </div>
        );
      })}
    </div>
  );
}