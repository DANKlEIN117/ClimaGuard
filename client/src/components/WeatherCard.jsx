import React from "react";

export default function WeatherCard({ county, setCounty, weather, handleSearch }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-semibold mb-6 text-center">🌦 Weather in Kenya</h2>

      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter county or city..."
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          className="w-2/3 px-4 py-3 rounded-lg bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium"
        >
          Search
        </button>

      </div>

      {/* 🌡 Weather Display */}
      {weather ? (
        <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm text-center">
          <h3 className="text-2xl font-semibold mb-2">
            {weather.name || county}
          </h3>
          <p className="text-lg capitalize">
            {weather?.weather?.[0]?.description || "N/A"}
          </p>
          <p className="text-5xl font-bold mt-3">
            {Math.round(weather?.main?.temp || 0)}°C
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-200">
            <p>💨 {weather?.wind?.speed ?? "--"} m/s</p>
            <p>💧 {weather?.main?.humidity ?? "--"}% humidity</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-300 italic">
          No weather data yet. Try searching for a city or county.
        </div>
      )}
    </div>
  );
}
