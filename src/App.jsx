import { useState, useRef, useEffect } from 'react'
import './App.css'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {

  const API_KEY = '9924bb4f893843279f4fba40684331ed';
  const LATITUDE = '48.5833';
  const LONGITUDE = '-4.5667';

  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaIndex, setMediaIndex] = useState(0);  

  const informationsRef = useRef(null);
  const timeRef = useRef(null);
  const dateRef = useRef(null);
  const saintRef = useRef(null);

  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/list-media');
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch media files');
        }
        const data = await response.json();

        const fileNames = data.mediaPaths.map(path => {
          const parts = path.split('/');
          return parts[parts.length - 1];
        });

        // Setting file names in state
        setMediaFiles(fileNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMediaFiles();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          throw new Error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();

    const interval = setInterval(fetchWeatherData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
      adjustTextFontSize('date-time-place', 'div');
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMediaIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [mediaFiles]);

  function adjustTextFontSize(containerId, sub) {
    var container = document.getElementById(containerId);
    var textDivs = container.querySelectorAll(sub);

    textDivs.forEach(function(div) {
        var maxWidth = div.parentElement.offsetWidth;
        var fontSize = 1;
        div.style.fontSize = fontSize + 'px';

        while (true) {
            fontSize++;
            div.style.fontSize = fontSize + 'px';
            if (div.scrollWidth > maxWidth) {
                fontSize--;
                div.style.fontSize = fontSize + 'px';
                break;
            }
        }
    });
  }

  const displayMedia = () => {    
  if (mediaFiles.length === 0) {
    return <div>No media files found</div>;
  }

  const mediaFile = mediaFiles[mediaIndex];
  const fileExtension = mediaFile.split('.').pop().toLowerCase();
  const isImage = ['png', 'jpg', 'jpeg'].includes(fileExtension);
  const isVideo = ['mp4', 'mov'].includes(fileExtension);

  const containerStyle = {
    width: '100%',
    height: 'auto',
  };

  if (isImage) {
    const image = new Image();
    image.src = `media/${mediaFile}`;
    image.onload = () => {
      const aspectRatio = image.width / image.;
      console.log(aspectRatio);
      if (aspectRatio < 1) {
        containerStyle.height = '100%';
        containerStyle.width = 'auto';
      }
    };

    return (
      <img
        src={`media/${mediaFile}`}
        alt="Photo"
        type={`image/${fileExtension}`}
        style={containerStyle}
      />
    );
  } else if (isVideo) {
    return (
      <video
        autoPlay
        loop
        src={`media/${mediaFile}`}
        type={`video/${fileExtension}`}
        style={containerStyle}
      />
    );
  } else {
    return <div>Unsupported media type</div>;
  }
};

  return (
    <>
      <div id="media-side">
        {displayMedia()}
      </div>
      <div id="informations-side" ref={informationsRef}>
        <div id='date-time-place'>
          <div id="date" ref={dateRef}>
            {capitalizeFirstLetter(
              dateTime.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })
            )}
          </div>
          <div id="time" ref={timeRef}>
            {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div id="place" ref={saintRef}>
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
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
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
        <div id="qrcode">
          <img src="fb-qrcode.png" alt="https://www.facebook.com/utile.landeda/" />
        </div>
      </div>
    </>
  )
}

export default App
