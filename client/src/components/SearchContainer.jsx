import React, { useState } from "react";

export default function SearchContainer() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`http://localhost:5000/api/weather/${cityName}`);
      const data = await response.json();

      if (data.message === "Error fetching weather data") {
        throw new Error("Could not fetch weather data. Try another city.");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">🌦 Search Weather</h2>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city (e.g. Nairobi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-2 rounded-md bg-gray-800 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-3 text-gray-400">Loading...</p>}
      {error && <p className="text-center mt-3 text-red-400">{error}</p>}

      {weather && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold">{weather.location}</h3>
          <p className="text-gray-300 capitalize">{weather.description}</p>
          <p className="mt-2 text-lg">🌡 {weather.temperature}°C</p>
          <p className="text-sm text-gray-400">💧 {weather.humidity}% humidity</p>
        </div>
      )}
    </div>
  );
}
