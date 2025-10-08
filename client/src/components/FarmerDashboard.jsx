import React, { useState, useEffect } from "react";
import axios from "axios";
import KenyaMap from "./KenyaMap";
import WeatherCard from "./WeatherCard";
import CropAdvice from "./CropAdvice";

function FarmerDashboard() {
  const [city, setCity] = useState("Nairobi");
  const [weather, setWeather] = useState(null);
  const [advice, setAdvice] = useState("");

  const getWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (weather) {
      const temp = Math.round(weather.main.temp);
      if (temp > 30) setAdvice("🔥 It’s quite hot — irrigate early mornings or evenings.");
      else if (temp < 20) setAdvice("🌥 Cool weather — consider crops like potatoes and beans.");
      else setAdvice("🌿 Great weather for most crops — monitor soil moisture levels.");
    }
  }, [weather]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-sky-800 to-sky-600 text-white flex flex-col">
      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white/10 backdrop-blur-md shadow-md border-b border-white/20">
        <h1 className="text-2xl font-bold tracking-wide">Farmer Dashboard</h1>
        <p className="text-sm text-gray-200">Empowering Climate-Smart Farming</p>
      </nav>

      {/* 🔸 Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-10">
        {/* Weather Card */}
        <div className="col-span-1">
          <WeatherCard
            city={city}
            setCity={setCity}
            weather={weather}
            getWeather={getWeather}
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
