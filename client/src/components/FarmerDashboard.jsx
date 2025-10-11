import React, { useState, useEffect } from "react";
import axios from "axios";
import KenyaMap from "./KenyaMap";
import WeatherCard from "./WeatherCard";
import CropAdvice from "./CropAdvice";
import { Link } from "react-router-dom";


function FarmerDashboard() {
  const [county, setCounty] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [advice, setAdvice] = useState("");

  const handleSearch = async () => {
    if (!county.trim()) {
      setError("Please enter a county name");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const response = await fetch(`https://climaguard.onrender.com/api/weather/${county}`);
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


  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
  if (weather && weather.main && typeof weather.main.temp !== "undefined") {
    const temp = Math.round(weather.main.temp);

    if (temp > 33) {
      setAdvice(
        "Hot Conditions Alert (Above 33°C):** High temperatures can cause soil moisture loss and crop stress. " +
        "Farmers should irrigate early in the morning or late in the evening to reduce evaporation. " +
        "Mulching can help retain soil moisture. Focus on drought-tolerant crops like sorghum, millet, or cowpeas."
      );
    } 
    else if (temp >= 28 && temp <= 33) {
      setAdvice(
        "Warm Conditions (28–33°C):** Great for crops like maize, beans, and tomatoes. " +
        "Ensure consistent watering to avoid heat stress, especially during flowering. " +
        "Watch for pests like aphids that thrive in warm conditions."
      );
    } 
    else if (temp >= 20 && temp < 28) {
      setAdvice(
        "Moderate Weather (20–27°C): Perfect for most crops such as potatoes, beans, and vegetables. " +
        "Maintain balanced watering, and consider organic fertilizer to boost growth. " +
        "Monitor humidity to prevent fungal diseases."
      );
    } 
    else if (temp >= 15 && temp < 20) {
      setAdvice(
        "🌤 **Cool Conditions (15–19°C):** Ideal for crops like cabbages, carrots, and peas. " +
        "You can take advantage of the cool environment to plant leafy greens. " +
        "Avoid overwatering as evaporation is slow in this temperature range."
      );
    } 
    else {
      setAdvice(
        "Cold Conditions (Below 15°C): Growth may slow for tropical crops. " +
        "Protect seedlings using greenhouse covers or raised seedbeds. " +
        "Choose cold-tolerant crops like kale, spinach, or barley."
      );
    }
  } else {
    setAdvice("");
  }
}, [weather]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-sky-800 to-sky-600 text-white flex flex-col">
      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white/10 backdrop-blur-md shadow-md border-b border-white/20">
        <h1 className="text-2xl font-bold tracking-wide">Farmer Dashboard</h1>
        <p className="text-sm text-gray-200">Empowering Climate-Smart Farming</p>
        <Link
          to="/ai-assistant"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium text-white"
        >
          AI Agriculture Assistant
        </Link>

      </nav>

      {/* 🔸 Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-10">
        {/* Weather Card */}
        <div className="col-span-1">
          <WeatherCard
            county={county}
            setCounty={setCounty}
            weather={weather}
            handleSearch={handleSearch}
          />
        </div>

        {/* Map */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-center">
            🗺 Drought-Prone Areas in Kenya
          </h3>
          <KenyaMap />
        </div>
      </div>

      {/* Advice Section */}
      <div className="px-10 pb-8">
        <CropAdvice advice={advice} />
      </div>

      {/* Footer */}
      <footer className="text-xs text-gray-200 text-center py-3 border-t border-white/20">
        Made with ❤️ by Team ClimaGuard | Hackathon 2025
      </footer>
    </div>
  );
}

export default FarmerDashboard;
