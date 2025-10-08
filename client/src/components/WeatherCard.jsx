import React from "react";

function WeatherCard({ city, setCity, weather, getWeather }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🌦 Local Weather
      </h2>

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city..."
          className="flex-1 px-4 py-3 rounded-lg bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={getWeather}
          className="px-5 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-all"
        >
          Search
        </button>
      </div>

      {weather ? (
        <div className="bg-white/20 p-5 rounded-xl text-center">
          <h3 className="text-xl font-semibold">{weather.name}</h3>
          <p className="capitalize text-sm">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold mt-3">
            {Math.round(weather.main.temp)}°C
          </p>
          <div className="flex justify-center gap-4 mt-3 text-sm text-gray-200">
            <p>💧 {weather.main.humidity}%</p>
            <p>💨 {weather.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-300">
          Enter a location to view live weather
        </p>
      )}
    </div>
  );
}

export default WeatherCard;
