import React from 'react';

function InformationDisplay({ dateTime, weatherData }) {
  return (
    <div id="informations-side">
      <div id='date-time-place'>
        <div id="date">
          {dateTime.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <div id="time">
          {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div id="place">
          {weatherData && weatherData.name}
        </div>
      </div>
      <div id="weather-widget">
        <div id="row1" className="row">
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
        </div>
        <div id="row2" className="row">
          <div id="pressure">
            {weatherData && `${Math.round(weatherData.main.pressure)} hPa`}
          </div>
          <div id="wind-speed">
            {weatherData && `${weatherData.wind.speed.toFixed(1).replace('.', ',')} m/s`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationDisplay;
