// src/components/WeatherPage.js
import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../services/WeatherService';

const WeatherPage = ({ match }) => {
  const [weatherData, setWeatherData] = useState(null);
  const cityName = match.params.city;

  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchWeather(cityName);
      setWeatherData(data);
    };

    loadWeather();
  }, [cityName]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather in {cityName}</h1>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      {/* Add more weather data as needed */}
    </div>
  );
};

export default WeatherPage;
