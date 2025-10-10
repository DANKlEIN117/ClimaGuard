import React, { useState } from "react";

function SearchContainer() {
  const [county, setCounty] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!county.trim()) {
      setError("Please enter a county name");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const response = await fetch(`http://localhost:5000/api/weather/${county}`);
      const data = await response.json();

      if (data.message === "Error fetching weather data" || data.cod === 401) {
        setError("Failed to fetch weather data. Try another county.");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Server not reachable 😢");
      setWeather(null);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Check Weather by County</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter county e.g. Nairobi"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg text-black outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium"
        >
          Search
        </button>
      </div>

      {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

      {weather && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold">{weather.location}</h3>
          <p className="text-lg capitalize">{weather.description}</p>
          <p className="text-4xl font-semibold mt-2">
            {Math.round(weather.temperature)}°C
          </p>
          <p className="text-sm text-gray-200 mt-1">
            💧 Humidity: {weather.humidity}%
          </p>
        </div>
      )}

    </div>
  );
}

export default SearchContainer;
