import React, { useEffect, useState } from 'react';
import fetchWeather from '../services/fetchWeather';
import rainy from '../assets/weatherIcons/rainy.svg';
import cloudy_and_sunny from '../assets/weatherIcons/cloudy_and_sunny.svg';
import cloudy from '../assets/weatherIcons/cloudy.svg';
import sunny from '../assets/weatherIcons/sunny.svg';
import thunderstorm from '../assets/weatherIcons/thunderstorm.svg';
import snowy from '../assets/weatherIcons/snowy.svg';
import '../styles/WeatherWidget.css';

function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await fetchWeather();
      setWeatherData(data);
    };
    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const weatherIcon = weatherData.weather[0].icon;
      if (weatherIcon === '01d' || weatherIcon === '01n') { // Corrected conditional check
        setIcon(sunny);
      } else if (weatherIcon === '02d' || weatherIcon === '02n') {
        setIcon(cloudy_and_sunny);
      } else if (
        weatherIcon === '03d' ||
        weatherIcon === '03n' ||
        weatherIcon === '04d' ||
        weatherIcon === '04n' ||
        weatherIcon === '50d' ||
        weatherIcon === '50n'
      ) {
        setIcon(cloudy);
      } else if (
        weatherIcon === '09d' ||
        weatherIcon === '09n' ||
        weatherIcon === '10d' ||
        weatherIcon === '10n'
      ) {
        setIcon(rainy);
      } else if (weatherIcon === '11d' || weatherIcon === '11n') {
        setIcon(thunderstorm);
      } else if (weatherIcon === '13d' || weatherIcon === '13n') {
        setIcon(snowy);
      }
    }
  }, [weatherData]); // Added weatherData as dependency

  return (
    <div id="weather-widget">
      {weatherData && (
        <>
          <div id="temperature">{`${Math.round(weatherData.main.temp)}°C`}</div>
          <div id="icon">
            <img
              src={icon}
              alt={weatherData.weather[0].description}
            />
          </div>
          <div id="pressure">{`${Math.round(weatherData.main.pressure)} hPa`}</div>
          <div id="wind-speed">{`${weatherData.wind.speed.toFixed(1).replace('.', ',')} m/s`}</div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
