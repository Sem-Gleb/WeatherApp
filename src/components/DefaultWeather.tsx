/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "e4e67488a82d1c4e66366cb461522afc"; // замени на свой

const DefaultWeather = ({ city }: { city: string }) => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city,
            units: 'metric',
            lang: 'ru',
            appid: API_KEY,
          }
        });
        setWeather(res.data);
      } catch (e) {
        console.error("Ошибка загрузки погоды по умолчанию");
      }
    };

    fetch();
  }, [city]);

  if (!weather) return null;

  return (
    <div className="relative bg-blue-100 dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden mb-6 p-4">
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')` }}
      ></div>

      <div className="relative z-10 flex flex-col items-center text-zinc-800 dark:text-white">
        <p className="text-sm uppercase font-semibold mb-1 tracking-wide">Погода в {city}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Иконка погоды"
          className="w-14 h-14"
        />
        <p className="text-lg font-bold">{Math.round(weather.main.temp)}°C — {weather.weather[0].description}</p>
      </div>
    </div>
  );
};

export default DefaultWeather;
