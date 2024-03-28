import { useState, useEffect } from 'react';
import { MediaDisplay } from './components/MediaDisplay';
import { InformationDisplay } from './components/InformationDisplay';
import { WeatherWidget } from './components/WeatherWidget';
import { QRCode } from './components/QRCode';
import { fetchMedia } from './services/fetchMedia';
import { fetchWeather } from './services/fetchWeather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaIndex, setMediaIndex] = useState(0);

  // useEffect(() => {
  //   const fetchMediaFiles = async () => {
  //     const files = await fetchMedia();
  //     setMediaFiles(files);
  //   };
  //   fetchMediaFiles();
  // }, []);

  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     const data = await fetchWeather();
  //     setWeatherData(data);
  //   };
  //   fetchWeatherData();
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDateTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMediaIndex(prevIndex => (prevIndex + 1) % mediaFiles.length);
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, [mediaFiles]);

  return (
    <>
      <div id="media-side">
        <MediaDisplay mediaFile={mediaFiles[mediaIndex]} />
      </div>
      <InformationDisplay dateTime={dateTime} weatherData={weatherData} />
      <WeatherWidget weatherData={weatherData} />
      <QRCode />
    </>
  );
}

export default App;
