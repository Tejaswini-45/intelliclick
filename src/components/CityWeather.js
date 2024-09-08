import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CityWeather() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67ae6135b6fb0eaff931efb530bdc109&units=metric`
        );
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
    </div>
  );
}

export default CityWeather;
