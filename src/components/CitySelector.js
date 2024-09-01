import React from 'react';
import Select from 'react-select';

const CitySelector = ({ onCityChange }) => {
    const cities = [
        { value: 'Moscow', label: 'Moscow' },
        { value: 'New York', label: 'New York' },
        { value: 'Tokyo', label: 'Tokyo' },
        { value: 'London', label: 'London' },
    ];

    return (
        <Select options={cities} onChange={onCityChange} />
    );
};

export default CitySelector;
