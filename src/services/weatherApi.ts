export const getCoordinates = async (city: string) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );

  const data = await res.json();
  const location = data.results?.[0];

  if (!location) throw new Error('City not found');

  return {
    name: location.name,
    lat: location.latitude,
    lon: location.longitude,
    country: location.country,
  };
};

export const getCurrentWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );

  const data = await res.json();
  return data.current_weather;
};

export const getDailyForecast = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
  );
  const data = await res.json();
  return data.daily;
};

export const getHourlyForecast = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=auto`
  );
  const data = await res.json();
  return data.hourly;
};