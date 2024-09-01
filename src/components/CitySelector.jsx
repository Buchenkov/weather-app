import React from 'react';

const CitySelector = ({ cityInput, handleInputChange, handleCitySubmit, cities, handleCitySelect }) => {
    return (
        <div>
            <input 
                type="text" 
                value={cityInput} 
                onChange={handleInputChange} 
                placeholder="Enter city" 
            />
            <button onClick={handleCitySubmit}>Show Weather</button>
            
            <select onChange={handleCitySelect} defaultValue="">
                <option value="" disabled>Select a city</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))}
            </select>
        </div>
    );
};

export default CitySelector;
