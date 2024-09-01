import React, { useState, useEffect } from 'react';
import CitySelector from './CitySelector';
import WeatherCard from './WeatherCard';

const WeatherApp = () => {
    const [city, setCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [isFiveDayForecast, setIsFiveDayForecast] = useState(false); // Toggle for forecast mode
    const apiKey = '3cc425734e3331c2422eb5a1ed65eb1f'; // Replace with your actual API key

    useEffect(() => {
        if (city) {
            const apiEndpoint = isFiveDayForecast
                ? `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&units=metric`
                : `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

            fetch(apiEndpoint)
                .then(response => response.json())
                .then(data => {
                    if (isFiveDayForecast) {
                        setForecast(data.list.filter((item, index) => index % 8 === 0)); // Select data every 24 hours for 5-day forecast
                    } else {
                        setWeather({
                            city: city.label,
                            temp: data.main.temp,
                            description: data.weather[0].description,
                            humidity: data.main.humidity,
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [city, isFiveDayForecast, apiKey]);

    const handleCityChange = selectedCity => {
        setCity(selectedCity);
    };

    const toggleForecast = () => {
        setIsFiveDayForecast(!isFiveDayForecast);
        setForecast(null);
        setWeather(null);
    };

    return (
        <div className="weather-app">
            <h1>Weather Forecast</h1>
            <CitySelector onCityChange={handleCityChange} />

            <button onClick={toggleForecast}>
                {isFiveDayForecast ? 'Current Weather' : '5-Day Forecast'}
            </button>

            {isFiveDayForecast ? (
                forecast ? (
                    <div>
                        {forecast.map((day, index) => (
                            <WeatherCard 
                                key={index}
                                weather={{
                                    city: city.label,
                                    temp: day.main.temp,
                                    description: day.weather[0].description,
                                    humidity: day.main.humidity,
                                    date: day.dt_txt.split(' ')[0], // Display date for the forecast
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div>Loading forecast...</div>
                )
            ) : (
                weather ? (
                    <WeatherCard weather={weather} />
                ) : (
                    <div>Loading current weather...</div>
                )
            )}
        </div>
    );
};

export default WeatherApp;
