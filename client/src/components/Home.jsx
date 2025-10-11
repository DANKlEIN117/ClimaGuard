import React, { useState } from "react";
import axios from "axios";
import KenyaMap from "./KenyaMap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

// ✅ Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  ChartLegend
);

export default function Home() {
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

  const kenyaClimateData = [
    { month: "Jan", temp: 27, rain: 40 },
    { month: "Feb", temp: 28, rain: 20 },
    { month: "Mar", temp: 27, rain: 60 },
    { month: "Apr", temp: 26, rain: 120 },
    { month: "May", temp: 25, rain: 150 },
    { month: "Jun", temp: 24, rain: 90 },
    { month: "Jul", temp: 23, rain: 80 },
    { month: "Aug", temp: 24, rain: 70 },
    { month: "Sep", temp: 26, rain: 60 },
    { month: "Oct", temp: 27, rain: 110 },
    { month: "Nov", temp: 26, rain: 130 },
    { month: "Dec", temp: 27, rain: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-900 via-sky-700 to-green-600 text-white flex flex-col">
      {/* 🔹 Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 px-10 py-10 md:h-[85vh]">
        {/* 🔍 Search Container (Left) */}
        <div className="md:w-1/3 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-600 scrollbar-track-transparent">
          <h2 className="text-2xl font-semibold mb-6 text-center">Search Local Weather</h2>

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

        {/* Charts + Map (Right) */}
        <div className="md:w-2/3 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-600 scrollbar-track-transparent">
          <h2 className="text-2xl font-semibold mb-4 text-center">Kenya Annual Climate Trends</h2>

          <div className="grid grid-cols-1 gap-6">
            {/* 🌡 Temperature Chart */}
            <div className="h-[220px]">
              <h3 className="text-lg mb-2 text-yellow-300 font-semibold">
                🌡 Average Temperature (°C)
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kenyaClimateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="temp" stroke="#facc15" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/*  Rainfall Chart */}
            <div className="h-[220px]">
              <h3 className="text-lg mb-2 text-blue-300 font-semibold">
                🌧 Average Rainfall (mm)
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kenyaClimateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="rain" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/*  Map */}
            <div className="mt-6">
              <h3 className="text-lg mb-2 text-green-300 font-semibold">
                🗺 Drought-Prone Areas in Kenya
              </h3>
              <KenyaMap />
            </div>
          </div>
        </div>
      </div>

      {/* ⚓ Footer */}
      <footer className="text-xs text-gray-200 text-center py-3 border-t border-white/20">
        Made with ❤️ by Team ClimaGuard | Hackathon 2025
      </footer>
    </div>
  );
}
