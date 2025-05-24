/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "./Load";
import WeatherCard from "./WeatherCard";
import DefaultWeather from "./DefaultWeather";

export default function WeatherScreen(){
    const [city,setCity] = useState('');
    const [weather,setWeather] = useState<any>(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('')

    const fetchWeather = async () => {
  setLoading(true);
  setError('');

  try {
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        units: 'metric',
        lang: 'ru',
        appid: 'f964541f67e01def850ba3bb8690d0c4'
      },
    });
    setWeather(res.data);
  } catch {
    setError('Ошибка ввода');
    setWeather(null);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
    setCity('');
  }
};

return (
  <div className="p-6 max-w-sm mx-auto space-y-6">
    {/* Погода по умолчанию — всегда сверху */}
    <DefaultWeather city="Санкт-Петербург" />

    {/* Основной UI */}
    <div className="bg-blue-100 dark:bg-zinc-900 rounded-2xl shadow-xl text-center space-y-6 transition-all p-6">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Погода</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Введите город"
      />

      <button
        onClick={fetchWeather}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Узнать погоду
      </button>

      {loading && <Loader />}

      {!loading && error && (
        <p className="text-red-500 text-xl font-medium">{error}</p>
      )}

      {!loading && weather && (
        <WeatherCard
          city={weather.name}
          temp={weather.main.temp}
          feelsLike={weather.main.feels_like}
          description={weather.weather[0].description}
          icon={weather.weather[0].icon}
          humidity={weather.main.humidity}
          wind={weather.wind.speed}
          pressure={weather.main.pressure}
          sunrise={weather.sys.sunrise}
          sunset={weather.sys.sunset}
        />
      )}
    </div>
  </div>
);


}