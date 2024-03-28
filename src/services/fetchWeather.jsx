const fetchWeather = async () => {
  const api_key = '9924bb4f893843279f4fba40684331ed';
  const latitude = '48.5833';
  const longitude = '-4.5667';
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return data;
};

export default fetchWeather;
