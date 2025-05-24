/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import Loader from "./Load";
import WeatherCard from "./WeatherCard";
import DefaultWeather from "./DefaultWeather";
import "../styles/weatherScreen.scss";

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="weather-screen">
      <DefaultWeather city="Санкт-Петербург" />

      <div className="weather-box">
        <h1 className="title">Погода</h1>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
          placeholder="Введите город"
        />

        <button onClick={fetchWeather} className="submit-button">
          Узнать погоду
        </button>

        {loading && <Loader />}

        {!loading && error && (
          <p className="error">{error}</p>
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
