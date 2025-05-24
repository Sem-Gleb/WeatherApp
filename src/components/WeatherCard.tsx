import React from "react";
import "../styles/weatherCard.scss";

type WeatherProps = {
  city: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  pressure: number;
  sunrise: number;
  sunset: number;
};

const WeatherCard: React.FC<WeatherProps> = ({
  city,
  temp,
  feelsLike,
  description,
  icon,
  humidity,
  wind,
  pressure,
  sunrise,
  sunset,
}) => {
  const formattedDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="weather-card">
      <div className="main">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="icon"
        />
        <h1 className="temp">{Math.round(temp)}°</h1>
        <p className="desc">{description}</p>
      </div>

      <div className="meta">
        <h2 className="city">{city}</h2>
        <p className="date">{formattedDate}</p>
      </div>

      <div className="info">
        <div><span>Ощущается как:</span><p>{Math.round(feelsLike)}°</p></div>
        <div><span>Влажность:</span><p>{humidity}%</p></div>
        <div><span>Ветер:</span><p>{wind} м/с</p></div>
        <div><span>Давление:</span><p>{pressure} гПа</p></div>
        <div><span>Восход:</span><p>{formatTime(sunrise)}</p></div>
        <div><span>Закат:</span><p>{formatTime(sunset)}</p></div>
      </div>
    </div>
  );
};

export default WeatherCard;
