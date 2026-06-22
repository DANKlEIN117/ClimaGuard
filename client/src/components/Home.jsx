import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

// ─── Climate Data ───────────────────────────────────────────────────────────
const CLIMATE_DATA = [
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

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="clima-tooltip">
      <p className="clima-tooltip__label">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="clima-tooltip__value">
          {p.name}: <strong>{p.value}{p.dataKey === "temp" ? "°C" : " mm"}</strong>
        </p>
      ))}
    </div>
  );
};

// ─── Kenya SVG Map ───────────────────────────────────────────────────────────
const KenyaMap = () => (
  <div className="map-wrapper">
    <svg viewBox="0 0 300 280" className="map-svg" aria-label="Map of Kenya showing drought-prone regions">
      <defs>
        <linearGradient id="kenyaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E1F5EE" />
          <stop offset="100%" stopColor="#9FE1CB" />
        </linearGradient>
      </defs>
      {/* Kenya outline */}
      <path
        d="M110 20 L175 15 L210 40 L230 70 L240 110 L250 150 L240 185 L220 210 L200 240 L170 265 L140 268 L120 250 L100 230 L75 200 L60 170 L55 140 L60 110 L70 80 L85 50 Z"
        fill="url(#kenyaBg)"
        stroke="#5DCAA5"
        strokeWidth="1.5"
      />
      {/* Severe drought — ASAL (north-east) */}
      <ellipse cx="200" cy="165" rx="38" ry="50" fill="#F09995" opacity="0.65" />
      <circle cx="182" cy="198" r="20" fill="#E24B4A" opacity="0.55" />
      <circle cx="218" cy="142" r="16" fill="#F7C1C1" opacity="0.6" />
      {/* Moderate drought — south */}
      <circle cx="130" cy="222" r="22" fill="#FAC775" opacity="0.6" />
      <circle cx="97" cy="182" r="14" fill="#EF9F27" opacity="0.5" />
      {/* Low risk — highlands */}
      <circle cx="152" cy="52" r="9" fill="#97C459" opacity="0.8" />
      <circle cx="118" cy="92" r="11" fill="#C0DD97" opacity="0.75" />
      {/* City labels */}
      <g fill="#085041" fontSize="9" fontFamily="sans-serif">
        <text x="128" y="124">Nairobi</text>
        <text x="98" y="153">Nakuru</text>
        <text x="192" y="190">Garissa</text>
        <text x="205" y="140">Wajir</text>
        <text x="122" y="232">Narok</text>
        <text x="148" y="45">Meru</text>
      </g>
      {/* Dots */}
      <circle cx="140" cy="119" r="3" fill="#085041" />
      <circle cx="113" cy="147" r="2.5" fill="#085041" />
      <circle cx="208" cy="183" r="3" fill="#791F1F" />
      <circle cx="210" cy="137" r="3" fill="#791F1F" />
      <circle cx="136" cy="227" r="3" fill="#854F0B" />
    </svg>
    <div className="map-legend">
      <div className="legend-item">
        <span className="legend-dot legend-dot--severe" />
        <span>Severe drought risk (ASAL counties)</span>
      </div>
      <div className="legend-item">
        <span className="legend-dot legend-dot--moderate" />
        <span>Moderate drought risk</span>
      </div>
      <div className="legend-item">
        <span className="legend-dot legend-dot--low" />
        <span>Low risk — highlands</span>
      </div>
    </div>
  </div>
);

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
const BottomNav = ({ active }) => (
  <nav className="cg-bottom-nav" aria-label="Main navigation">
    <Link to="/" className={`cg-bnav-item ${active === "home" ? "cg-bnav-item--active" : ""}`} aria-current={active === "home" ? "page" : undefined}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span>Home</span>
    </Link>
    <Link to="/farmer" className={`cg-bnav-item ${active === "farmer" ? "cg-bnav-item--active" : ""}`} aria-current={active === "farmer" ? "page" : undefined}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
      <span>Farmer</span>
    </Link>
    <Link to="/ai-assistant" className={`cg-bnav-item ${active === "ai" ? "cg-bnav-item--active" : ""}`} aria-current={active === "ai" ? "page" : undefined}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span>AI Assistant</span>
    </Link>
  </nav>
);

// ─── Weather Pill ─────────────────────────────────────────────────────────────
const WeatherPill = ({ icon, label }) => (
  <div className="weather-pill">
    <span className="weather-pill__icon">{icon}</span>
    <span>{label}</span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [county, setCounty] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeChart, setActiveChart] = useState("temp");
  const inputRef = useRef(null);

  const handleSearch = async () => {
    const query = county.trim();
    if (!query) {
      setError("Enter a county or city name to search.");
      setWeather(null);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`https://climaguard.onrender.com/api/weather/${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.message === "Error fetching weather data" || data.cod === 401) {
        setError("Could not fetch data for this location. Try another name.");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
      setError("Server not reachable. Please try again later.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const chartTabs = [
    { key: "temp", label: "Temperature" },
    { key: "rain", label: "Rainfall" },
    { key: "both", label: "Combined" },
  ];

  return (
    <div className="cg-root">
      {/* ── Header ── */}
      <header className="cg-header">
        <div className="header-brand">
          <div className="header-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
            </svg>
          </div>
          <div>
            <div className="header-title">ClimaGuard</div>
            <div className="header-sub">Kenya climate intelligence</div>
          </div>
        </div>
        <span className="live-badge">
          <span className="live-dot" aria-hidden="true" />
          Live
        </span>
      </header>

      {/* ── Body ── */}
      <main className="cg-body">

        {/* Search Card */}
        <section className="card" aria-label="Weather search">
          <div className="section-label">Search county or city</div>

          <div className="search-row">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="e.g. Nairobi, Mombasa…"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="County or city name"
            />
            <button
              className={`search-btn ${loading ? "search-btn--loading" : ""}`}
              onClick={handleSearch}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="spinner" aria-hidden="true" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              )}
              {loading ? "Searching…" : "Search"}
            </button>
          </div>

          {error && (
            <div className="error-box" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {!weather && !error && (
            <div className="empty-state" aria-label="No results yet">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              <p>Search a county or city to see live weather</p>
            </div>
          )}

          {weather && (
            <div className="weather-card" aria-live="polite">
              <div className="weather-main">
                <div>
                  <div className="weather-city">{weather.name || county}</div>
                  <div className="weather-desc">{weather?.weather?.[0]?.description || "—"}</div>
                </div>
                <div className="weather-temp">
                  {Math.round(weather?.main?.temp || 0)}<span>°C</span>
                </div>
              </div>
              <div className="weather-pills">
                <WeatherPill icon="💨" label={`${weather?.wind?.speed ?? "—"} m/s wind`} />
                <WeatherPill icon="💧" label={`${weather?.main?.humidity ?? "—"}% humidity`} />
                <WeatherPill icon="👁" label={weather?.visibility ? `${(weather.visibility / 1000).toFixed(1)} km vis.` : "—"} />
              </div>
            </div>
          )}
        </section>

        {/* Stat Row */}
        <div className="stat-row" aria-label="Overview statistics">
          <div className="stat-card">
            <div className="stat-value stat-value--green">47</div>
            <div className="stat-label">Counties tracked</div>
          </div>
          <div className="stat-card">
            <div className="stat-value stat-value--amber">23</div>
            <div className="stat-label">Active drought alerts</div>
          </div>
        </div>

        {/* Charts Card */}
        <section className="card" aria-label="Annual climate trends">
          <div className="section-label">Annual climate trends</div>

          <div className="tab-row" role="tablist" aria-label="Chart type">
            {chartTabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={activeChart === t.key}
                className={`tab-btn ${activeChart === t.key ? "tab-btn--active" : ""}`}
                onClick={() => setActiveChart(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="chart-area" role="region" aria-label={`${activeChart === "temp" ? "Temperature" : activeChart === "rain" ? "Rainfall" : "Combined temperature and rainfall"} chart`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CLIMATE_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#888" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#888" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {(activeChart === "both") && (
                  <Legend
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    formatter={(v) => v === "temp" ? "Temp (°C)" : "Rain (mm)"}
                  />
                )}
                {(activeChart === "temp" || activeChart === "both") && (
                  <Line
                    type="monotone"
                    dataKey="temp"
                    name="temp"
                    stroke="#1D9E75"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#1D9E75", strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                )}
                {(activeChart === "rain" || activeChart === "both") && (
                  <Line
                    type="monotone"
                    dataKey="rain"
                    name="rain"
                    stroke="#378ADD"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#378ADD", strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="chart-note">
            {activeChart === "temp" && "Monthly average temperature across Kenya (°C)"}
            {activeChart === "rain" && "Monthly average rainfall across Kenya (mm)"}
            {activeChart === "both" && "Temperature and rainfall overlaid for the full year"}
          </p>
        </section>

        {/* Map Card */}
        <section className="card" aria-label="Drought map">
          <div className="section-label">Drought-prone regions</div>
          <KenyaMap />
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="cg-footer">
        Made with ❤ by Team ClimaGuard · Hackathon 2025
      </footer>

      {/* ── Mobile bottom nav ── */}
      <BottomNav active="home" />

      {/* ── Styles ── */}
      <style>{`
        /* ── Reset & Base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cg-root {
          min-height: 100vh;
          background: #f0f4f8;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1a1a2e;
          padding-bottom: 68px;
        }
        @media (min-width: 768px) {
          .cg-root { padding-bottom: 0; }
        }

        /* ── Header ── */
        .cg-header {
          padding: 1.25rem 1.25rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #1D9E75 0%, #378ADD 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .header-title {
          font-size: 17px;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1.2;
        }
        .header-sub {
          font-size: 11px;
          color: #6b7280;
          margin-top: 1px;
        }
        .live-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 500;
          color: #0F6E56;
          background: #E1F5EE;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1D9E75;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── Body ── */
        .cg-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem 1.25rem;
          flex: 1;
        }

        /* ── Card ── */
        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.25rem;
          border: 0.5px solid rgba(0,0,0,0.08);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #9ca3af;
          margin-bottom: 0.875rem;
        }

        /* ── Search ── */
        .search-row {
          display: flex;
          gap: 8px;
          margin-bottom: 0.875rem;
        }
        .search-input {
          flex: 1;
          height: 42px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          color: #1a1a2e;
          padding: 0 14px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .search-input::placeholder { color: #9ca3af; }
        .search-input:focus {
          border-color: #1D9E75;
          box-shadow: 0 0 0 3px rgba(29,158,117,.12);
          background: #fff;
        }
        .search-btn {
          height: 42px;
          padding: 0 16px;
          border-radius: 10px;
          border: none;
          background: #1D9E75;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: background 0.15s, transform 0.1s;
          flex-shrink: 0;
        }
        .search-btn:hover { background: #0F6E56; }
        .search-btn:active { transform: scale(0.97); }
        .search-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .search-btn--loading { background: #0F6E56; }

        /* Spinner */
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Error ── */
        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #991b1b;
          background: #fef2f2;
          border: 0.5px solid #fecaca;
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 0.875rem;
        }

        /* ── Empty state ── */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 1.5rem 0 0.5rem;
          color: #9ca3af;
        }
        .empty-state p { font-size: 13px; text-align: center; }

        /* ── Weather Result ── */
        .weather-card {
          background: #f0fdf9;
          border: 0.5px solid #a7f3d0;
          border-radius: 12px;
          padding: 1rem 1.125rem;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

        .weather-main {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.875rem;
        }
        .weather-city {
          font-size: 18px;
          font-weight: 600;
          color: #064e3b;
          line-height: 1.2;
        }
        .weather-desc {
          font-size: 13px;
          color: #059669;
          margin-top: 3px;
          text-transform: capitalize;
        }
        .weather-temp {
          font-size: 42px;
          font-weight: 700;
          color: #064e3b;
          line-height: 1;
        }
        .weather-temp span {
          font-size: 20px;
          font-weight: 400;
          color: #059669;
        }
        .weather-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .weather-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #fff;
          border: 0.5px solid #a7f3d0;
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 12px;
          color: #065f46;
        }
        .weather-pill__icon { font-size: 13px; }

        /* ── Stats ── */
        .stat-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .stat-card {
          background: #fff;
          border-radius: 14px;
          border: 0.5px solid rgba(0,0,0,0.08);
          padding: 1rem 1.125rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .stat-value {
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-value--green { color: #1D9E75; }
        .stat-value--amber { color: #d97706; }
        .stat-label {
          font-size: 11px;
          color: #6b7280;
          font-weight: 500;
        }

        /* ── Tabs ── */
        .tab-row {
          display: flex;
          gap: 4px;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 10px;
          margin-bottom: 1.125rem;
        }
        .tab-btn {
          flex: 1;
          font-size: 12px;
          font-weight: 500;
          padding: 7px 6px;
          border-radius: 7px;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .tab-btn--active {
          background: #fff;
          color: #1a1a2e;
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }
        .tab-btn:not(.tab-btn--active):hover { background: rgba(255,255,255,0.5); color: #374151; }

        /* ── Chart ── */
        .chart-area {
          height: 200px;
          margin-bottom: 0.5rem;
        }
        .chart-note {
          font-size: 11px;
          color: #9ca3af;
          text-align: center;
        }

        /* ── Recharts Tooltip override ── */
        .clima-tooltip {
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.12);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .clima-tooltip__label {
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 4px;
        }
        .clima-tooltip__value { color: #6b7280; }

        /* ── Map ── */
        .map-wrapper { }
        .map-svg {
          display: block;
          width: 100%;
          max-height: 240px;
          background: #f0fdf9;
          border-radius: 12px;
          border: 0.5px solid #a7f3d0;
          margin-bottom: 0.875rem;
        }
        .map-legend {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #4b5563;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .legend-dot--severe { background: #E24B4A; }
        .legend-dot--moderate { background: #EF9F27; }
        .legend-dot--low { background: #639922; }

        /* ── Footer ── */
        .cg-footer {
          font-size: 11px;
          color: #9ca3af;
          text-align: center;
          padding: 1rem 1.25rem 1.5rem;
          border-top: 0.5px solid rgba(0,0,0,0.06);
          margin-top: 0.25rem;
        }

        /* ── Tablet / Desktop ── */
        @media (min-width: 640px) {
          .cg-header { padding: 1.5rem 2rem 0; }
          .cg-body { padding: 1.25rem 2rem; max-width: 860px; margin: 0 auto; width: 100%; }
        }

        @media (min-width: 768px) {
          .cg-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto 1fr;
            gap: 1.25rem;
            align-items: start;
          }
          .cg-body > .card:first-child { grid-column: 1 / 2; }
          .stat-row { grid-column: 1 / 2; }
          .cg-body > .card:nth-child(3) { grid-column: 2 / 3; grid-row: 1 / 3; }
          .cg-body > .card:nth-child(4) { grid-column: 1 / 3; }
          .chart-area { height: 240px; }
          .cg-header { padding: 1.5rem 2rem 0; max-width: 860px; margin: 0 auto; width: 100%; }
          .cg-footer { max-width: 860px; margin: 0 auto; width: 100%; }
        }

        /* ── Accessibility ── */
        @media (prefers-reduced-motion: reduce) {
          .live-dot, .spinner { animation: none; }
          .weather-card { animation: none; }
        }

        /* ── Bottom nav (mobile only) ── */
        .cg-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 62px;
          background: #fff;
          border-top: 0.5px solid rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 0.5rem;
          padding-bottom: env(safe-area-inset-bottom);
          z-index: 200;
        }
        @media (min-width: 768px) {
          .cg-bottom-nav { display: none; }
        }
        .cg-bnav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          text-decoration: none;
          color: #9ca3af;
          font-size: 10px;
          font-weight: 500;
          padding: 6px 20px;
          border-radius: 10px;
          transition: color 0.15s, background 0.15s;
          min-width: 64px;
        }
        .cg-bnav-item:hover { color: #1D9E75; }
        .cg-bnav-item--active {
          color: #1D9E75;
          background: #f0fdf9;
        }

        /* Focus rings */
        .search-input:focus-visible {
          outline: 2px solid #1D9E75;
          outline-offset: 2px;
        }
        .search-btn:focus-visible,
        .tab-btn:focus-visible {
          outline: 2px solid #1D9E75;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}