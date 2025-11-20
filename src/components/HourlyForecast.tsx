import { weatherCodeMap } from './weatherCodeMap';

type Props = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
  selectedDate: string;
};

export default function HourlyForecast({ hourly, selectedDate }: Props){
  const filtered = hourly.time
    .map((time, i) => ({
      time,
      temp: hourly.temperature_2m[i],
      code: hourly.weathercode[i],
    }))
    .filter((item) => item.time.startsWith(selectedDate));

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Hourly Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map(({ time, temp, code }) => {
          const hour = new Date(time).getHours();
          const weather = weatherCodeMap[code];
          return (
            <div key={time} className="bg-white rounded-lg shadow p-4 text-center">
              <p className="font-semibold">{hour}:00</p>
              <p className="text-2xl">{weather?.icon}</p>
              <p className="text-sm">{weather?.label}</p>
              <p className="text-sm">🌡️ {temp}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}