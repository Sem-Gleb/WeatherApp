import React from "react";

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
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl shadow-xl p-6">
      <div className="flex flex-col items-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="w-24 h-24"
        />
        <h1 className="text-5xl font-bold">{Math.round(temp)}°</h1>
        <p className="text-xl capitalize">{description}</p>
      </div>

      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">{city}</h2>
        <p className="text-sm">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div>
          <p className="text-zinc-500">Ощущается как:</p>
          <p>{Math.round(feelsLike)}°</p>
        </div>
        <div>
          <p className="text-zinc-500">Влажность:</p>
          <p>{humidity}%</p>
        </div>
        <div>
          <p className="text-zinc-500">Ветер:</p>
          <p>{wind} м/с</p>
        </div>
        <div>
          <p className="text-zinc-500">Давление:</p>
          <p>{pressure} гПа</p>
        </div>
        <div>
          <p className="text-zinc-500">Восход:</p>
          <p>{formatTime(sunrise)}</p>
        </div>
        <div>
          <p className="text-zinc-500 ">Закат:</p>
          <p>{formatTime(sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
