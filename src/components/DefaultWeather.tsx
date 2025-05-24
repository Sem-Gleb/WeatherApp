/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/defaultWeather.scss"; 

const API_KEY = "e4e67488a82d1c4e66366cb461522afc";

const DefaultWeather = ({ city }: { city: string }) => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: city,
            units: "metric",
            lang: "ru",
            appid: API_KEY,
          },
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
    <div className="default-weather">
      <div
        className="background"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')`,
        }}
      ></div>

      <div className="content">
        <p className="location">Погода в {city}e</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          className="icon"
        />
        <p className="temperature">
          {Math.round(weather.main.temp)}°C — {weather.weather[0].description}
        </p>
        <p className="temperature">
          Ощущается как - {Math.round(weather.main.feels_like)}
        </p>
      </div>
    </div>
  );
};

export default DefaultWeather;
