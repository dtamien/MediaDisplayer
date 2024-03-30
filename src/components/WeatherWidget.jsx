import React, {useEffect, useState } from 'react';
import fetchWeather from '../services/fetchWeather';
import '../styles/WeatherWidget.css';

function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await fetchWeather();
      setWeatherData(data);
    };
    fetchWeatherData();
  }, []);

  return (
    <div id="weather-widget">
      <div id="temperature">
        {weatherData && `${Math.round(weatherData.main.temp)}°C`}
      </div>
      <div id="icon">
        {weatherData && (
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        )}
      </div>
      <div id="pressure">
        {weatherData && `${Math.round(weatherData.main.pressure)} hPa`}
      </div>
      <div id="wind-speed">
        {weatherData && `${weatherData.wind.speed.toFixed(1).replace('.', ',')} m/s`}
      </div>
    </div>
  );
}

export default WeatherWidget;
