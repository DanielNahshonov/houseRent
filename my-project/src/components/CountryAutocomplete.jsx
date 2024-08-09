import React, { useState, useEffect } from 'react';

const CountryAutocomplete = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue.length > 1) { // Начинаем поиск, если введено более одного символа
      const fetchSuggestions = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5001/api/flats/countries?query=${inputValue}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (country) => {
    setInputValue(country);
    setSuggestions([]);
    onSelect(country);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="p-2 border rounded"
        placeholder="Type country name..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching countries: {error}</p>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-60 overflow-auto">
          {suggestions.map((country, index) => (
            <li
              key={index}
              onClick={() => handleSelect(country)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
