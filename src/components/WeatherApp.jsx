
    // const apiKey = '69c17c8531b95d0fd1aba375f13b285e';  // '3cc425734e3331c2422eb5a1ed65eb1f'

    import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard.jsx';
import CitySelector from './CitySelector.jsx';

const WeatherApp = () => {
    const [cityInput, setCityInput] = useState('');
    const [city, setCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [isFiveDayForecast, setIsFiveDayForecast] = useState(false);
    const apiKey = '69c17c8531b95d0fd1aba375f13b285e';

    const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Moscow', 'Sarov']; // Массив предопределенных городов

    useEffect(() => {
        if (city) {
            const apiEndpoint = isFiveDayForecast
                ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
                : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            axios.get(apiEndpoint)
                .then(response => {
                    if (isFiveDayForecast) {
                        setForecast(response.data.list.filter((item, index) => index % 8 === 0));
                    } else {
                        setWeather({
                            city: city,
                            temp: response.data.main.temp,
                            description: response.data.weather[0].description,
                            humidity: response.data.main.humidity,
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [city, isFiveDayForecast, apiKey]);

    const handleInputChange = (e) => {
        setCityInput(e.target.value);
    };

    const handleCitySubmit = () => {
        if (cityInput.trim()) {
            setCity(cityInput.trim());
        }
    };

    const handleCitySelect = (e) => {
        setCity(e.target.value);
    };

    const toggleForecast = () => {
        setIsFiveDayForecast(!isFiveDayForecast);
        setForecast(null);
        setWeather(null);
    };

    return (
        <div className="weather-app">
            <h1>Weather Forecast</h1>
            <CitySelector
                cityInput={cityInput}
                handleInputChange={handleInputChange}
                handleCitySubmit={handleCitySubmit}
                cities={cities}
                handleCitySelect={handleCitySelect}
            />
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
                                    city: city,
                                    temp: day.main.temp,
                                    description: day.weather[0].description,
                                    humidity: day.main.humidity,
                                    date: day.dt_txt.split(' ')[0],
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
