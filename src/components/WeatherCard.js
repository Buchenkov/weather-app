import React from 'react';

const WeatherCard = ({ weather }) => {
    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-card">
            <h2>{weather.city}</h2>
            {weather.date && <p>Date: {weather.date}</p>} {/* Показываем дату для прогноза на 5 дней */}
            <p>Temperature: {weather.temp}°C</p>
            <p>Weather: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
        </div>
    );
};

export default WeatherCard;
