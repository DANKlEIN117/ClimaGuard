import React, { useState } from "react";
import API from "../api";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      const { data } = await API.get(`/weather/${city}`);
      setWeather(data);
      setError("");
    } catch (err) {
      setError("Couldn't fetch weather data 😢");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🌍 Climate Resilience Dashboard</h2>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={getWeather} style={{ padding: "0.5rem 1rem" }}>
        Check Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h3>{weather.location}</h3>
          <p>🌡 Temperature: {weather.temperature}°C</p>
          <p>☁️ Condition: {weather.description}</p>
          <p>💧 Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}
