import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Kenya SVG Map ────────────────────────────────────────────────────────────
const KenyaMap = () => (
  <div className="map-wrapper">
    <svg
      viewBox="0 0 300 280"
      className="map-svg"
      aria-label="Map of Kenya showing drought-prone regions"
    >
      <defs>
        <linearGradient id="fd-kenyaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E1F5EE" />
          <stop offset="100%" stopColor="#9FE1CB" />
        </linearGradient>
      </defs>
      {/* Kenya outline */}
      <path
        d="M110 20 L175 15 L210 40 L230 70 L240 110 L250 150 L240 185 L220 210 L200 240 L170 265 L140 268 L120 250 L100 230 L75 200 L60 170 L55 140 L60 110 L70 80 L85 50 Z"
        fill="url(#fd-kenyaBg)"
        stroke="#5DCAA5"
        strokeWidth="1.5"
      />
      {/* Severe drought — north-east ASAL */}
      <ellipse cx="200" cy="165" rx="38" ry="50" fill="#F09995" opacity="0.65" />
      <circle cx="182" cy="198" r="20" fill="#E24B4A" opacity="0.55" />
      <circle cx="218" cy="142" r="16" fill="#F7C1C1" opacity="0.6" />
      {/* Moderate drought */}
      <circle cx="130" cy="222" r="22" fill="#FAC775" opacity="0.6" />
      <circle cx="97" cy="182" r="14" fill="#EF9F27" opacity="0.5" />
      {/* Low risk — highlands */}
      <circle cx="152" cy="52" r="9" fill="#97C459" opacity="0.8" />
      <circle cx="118" cy="92" r="11" fill="#C0DD97" opacity="0.75" />
      {/* Labels */}
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

// ─── Advice config ────────────────────────────────────────────────────────────
const getAdvice = (temp) => {
  if (temp > 33)
    return {
      level: "hot",
      icon: "🌡",
      tag: "Hot conditions — above 33°C",
      color: "#dc2626",
      bg: "#fef2f2",
      border: "#fecaca",
      text: "#7f1d1d",
      body:
        "High temperatures cause soil moisture loss and crop stress. Irrigate early morning or late evening to reduce evaporation. Mulching retains soil moisture. Focus on drought-tolerant crops like sorghum, millet, or cowpeas.",
      crops: ["Sorghum", "Millet", "Cowpeas"],
    };
  if (temp >= 28)
    return {
      level: "warm",
      icon: "☀",
      tag: "Warm conditions — 28–33°C",
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
      text: "#78350f",
      body:
        "Great conditions for maize, beans, and tomatoes. Ensure consistent watering to avoid heat stress during flowering. Watch for aphids and other pests that thrive in warm weather.",
      crops: ["Maize", "Beans", "Tomatoes"],
    };
  if (temp >= 20)
    return {
      level: "moderate",
      icon: "🌤",
      tag: "Moderate weather — 20–27°C",
      color: "#1D9E75",
      bg: "#f0fdf9",
      border: "#a7f3d0",
      text: "#064e3b",
      body:
        "Perfect for most crops. Maintain balanced watering and consider organic fertilizer to boost growth. Monitor humidity to prevent fungal diseases.",
      crops: ["Potatoes", "Beans", "Vegetables"],
    };
  if (temp >= 15)
    return {
      level: "cool",
      icon: "🌥",
      tag: "Cool conditions — 15–19°C",
      color: "#378ADD",
      bg: "#eff6ff",
      border: "#bfdbfe",
      text: "#1e3a5f",
      body:
        "Ideal for brassicas and root vegetables. Take advantage of cool temperatures to plant leafy greens. Avoid overwatering as evaporation is slow.",
      crops: ["Cabbages", "Carrots", "Peas"],
    };
  return {
    level: "cold",
    icon: "🌨",
    tag: "Cold conditions — below 15°C",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    text: "#312e81",
    body:
      "Growth may slow for tropical crops. Protect seedlings using greenhouse covers or raised seedbeds. Choose cold-tolerant crops.",
    crops: ["Kale", "Spinach", "Barley"],
  };
};

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
const BottomNav = ({ active }) => (
  <nav className="bottom-nav" aria-label="Main navigation">
    <Link to="/" className={`bnav-item ${active === "home" ? "bnav-item--active" : ""}`} aria-current={active === "home" ? "page" : undefined}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      <span>Home</span>
    </Link>
    <Link to="/farmer" className={`bnav-item ${active === "farmer" ? "bnav-item--active" : ""}`} aria-current={active === "farmer" ? "page" : undefined}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
      <span>Farmer</span>
    </Link>
    <Link to="/ai-assistant" className={`bnav-item ${active === "ai" ? "bnav-item--active" : ""}`} aria-current={active === "ai" ? "page" : undefined}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span>AI Assistant</span>
    </Link>
  </nav>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FarmerDashboard() {
  const [county, setCounty] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
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
      const res = await fetch(
        `https://climaguard.onrender.com/api/weather/${encodeURIComponent(query)}`
      );
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

  useEffect(() => {
    if (weather?.main?.temp !== undefined) {
      setAdvice(getAdvice(Math.round(weather.main.temp)));
    } else {
      setAdvice(null);
    }
  }, [weather]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="fd-root">
      {/* ── Desktop top nav (hidden on mobile) ── */}
      <header className="fd-topnav">
        <div className="fd-topnav__brand">
          <div className="fd-topnav__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <div className="fd-topnav__title">Farmer Dashboard</div>
            <div className="fd-topnav__sub">Climate-smart farming insights</div>
          </div>
        </div>
        <nav className="fd-topnav__links" aria-label="Main navigation">
          <Link to="/" className="fd-topnav__link">Home</Link>
          <Link to="/farmer" className="fd-topnav__link fd-topnav__link--active" aria-current="page">Farmer</Link>
          <Link to="/ai-assistant" className="fd-topnav__link fd-topnav__link--cta">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            AI Assistant
          </Link>
        </nav>
      </header>

      {/* ── Body ── */}
      <main className="fd-body">

        {/* ── Search + Weather ── */}
        <section className="fd-card" aria-label="Weather lookup">
          <div className="fd-section-label">Search county or city</div>

          <div className="fd-search-row">
            <input
              ref={inputRef}
              type="text"
              className="fd-input"
              placeholder="e.g. Nairobi, Kisumu…"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="County or city name"
            />
            <button
              className={`fd-btn ${loading ? "fd-btn--loading" : ""}`}
              onClick={handleSearch}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="fd-spinner" aria-hidden="true" />
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              )}
              {loading ? "Searching…" : "Search"}
            </button>
          </div>

          {error && (
            <div className="fd-error" role="alert">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {!weather && !error && (
            <div className="fd-empty" aria-label="No results">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              <p>Search a county to see weather and crop advice</p>
            </div>
          )}

          {weather && (
            <div className="fd-weather" aria-live="polite">
              <div className="fd-weather__top">
                <div>
                  <div className="fd-weather__city">{weather.name || county}</div>
                  <div className="fd-weather__desc">{weather?.weather?.[0]?.description || "—"}</div>
                </div>
                <div className="fd-weather__temp">
                  {Math.round(weather?.main?.temp || 0)}<span>°C</span>
                </div>
              </div>
              <div className="fd-weather__pills">
                <div className="fd-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
                  {weather?.wind?.speed ?? "—"} m/s
                </div>
                <div className="fd-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  {weather?.main?.humidity ?? "—"}% humidity
                </div>
                <div className="fd-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  {weather?.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : "—"}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Crop Advice ── */}
        {advice && (
          <section
            className="fd-card fd-advice"
            style={{ borderLeft: `3px solid ${advice.color}`, background: advice.bg, borderTop: `0.5px solid ${advice.border}`, borderRight: `0.5px solid ${advice.border}`, borderBottom: `0.5px solid ${advice.border}` }}
            aria-label="Crop advice"
            aria-live="polite"
          >
            <div className="fd-advice__header">
              <span className="fd-advice__icon" aria-hidden="true">{advice.icon}</span>
              <div>
                <div className="fd-advice__tag" style={{ color: advice.color }}>{advice.tag}</div>
                <div className="fd-section-label" style={{ marginBottom: 0 }}>Crop recommendation</div>
              </div>
            </div>
            <p className="fd-advice__body" style={{ color: advice.text }}>{advice.body}</p>
            <div className="fd-advice__crops">
              <span className="fd-crops-label" style={{ color: advice.color }}>Recommended crops:</span>
              <div className="fd-crops-list">
                {advice.crops.map((c) => (
                  <span key={c} className="fd-crop-tag" style={{ background: advice.bg, color: advice.text, borderColor: advice.border }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Map ── */}
        <section className="fd-card" aria-label="Drought-prone regions map">
          <div className="fd-section-label">Drought-prone regions</div>
          <KenyaMap />
        </section>

        {/* ── Quick stat row ── */}
        <div className="fd-stat-row">
          <div className="fd-stat">
            <div className="fd-stat__val" style={{ color: "#1D9E75" }}>47</div>
            <div className="fd-stat__label">Counties tracked</div>
          </div>
          <div className="fd-stat">
            <div className="fd-stat__val" style={{ color: "#d97706" }}>23</div>
            <div className="fd-stat__label">Drought alerts</div>
          </div>
          <div className="fd-stat">
            <div className="fd-stat__val" style={{ color: "#378ADD" }}>6</div>
            <div className="fd-stat__label">Crop advisories</div>
          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="fd-footer">
        Made with ❤ by Team ClimaGuard · Hackathon 2025
      </footer>

      {/* ── Mobile bottom nav ── */}
      <BottomNav active="farmer" />

      {/* ── Styles ── */}
      <style>{`
        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root ── */
        .fd-root {
          min-height: 100vh;
          background: #f0f4f8;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1a1a2e;
          /* space for bottom nav on mobile */
          padding-bottom: 68px;
        }

        /* ── Top nav (desktop only) ── */
        .fd-topnav {
          display: none;
        }
        @media (min-width: 768px) {
          .fd-topnav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            height: 60px;
            background: #fff;
            border-bottom: 0.5px solid rgba(0,0,0,0.08);
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .fd-root { padding-bottom: 0; }
        }
        .fd-topnav__brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .fd-topnav__icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1D9E75, #378ADD);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fd-topnav__title {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1.2;
        }
        .fd-topnav__sub {
          font-size: 11px;
          color: #6b7280;
        }
        .fd-topnav__links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .fd-topnav__link {
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .fd-topnav__link:hover { background: #f3f4f6; color: #1a1a2e; }
        .fd-topnav__link--active { color: #1D9E75; background: #f0fdf9; }
        .fd-topnav__link--cta {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #1D9E75;
          color: #fff;
          margin-left: 8px;
          padding: 7px 14px;
        }
        .fd-topnav__link--cta:hover { background: #0F6E56; color: #fff; }

        /* ── Body ── */
        .fd-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem 1.25rem;
          flex: 1;
        }
        @media (min-width: 640px) {
          .fd-body { padding: 1.25rem 2rem; max-width: 900px; margin: 0 auto; width: 100%; }
        }
        @media (min-width: 768px) {
          .fd-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
            gap: 1.25rem;
            align-items: start;
          }
          /* search + advice stack left; map + stats stack right */
          .fd-body > section:nth-child(1) { grid-column: 1; grid-row: 1; }
          .fd-body > section.fd-advice   { grid-column: 1; grid-row: 2; }
          .fd-body > section:last-of-type { grid-column: 2; grid-row: 1 / 3; }
          .fd-stat-row { grid-column: 1 / 3; grid-row: 3; }
        }

        /* ── Card ── */
        .fd-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.25rem;
          border: 0.5px solid rgba(0,0,0,0.08);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .fd-section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #9ca3af;
          margin-bottom: 0.875rem;
        }

        /* ── Search ── */
        .fd-search-row {
          display: flex;
          gap: 8px;
          margin-bottom: 0.875rem;
        }
        .fd-input {
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
        .fd-input::placeholder { color: #9ca3af; }
        .fd-input:focus {
          border-color: #1D9E75;
          box-shadow: 0 0 0 3px rgba(29,158,117,.12);
          background: #fff;
        }
        .fd-btn {
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
          flex-shrink: 0;
          transition: background 0.15s, transform 0.1s;
        }
        .fd-btn:hover { background: #0F6E56; }
        .fd-btn:active { transform: scale(.97); }
        .fd-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .fd-btn--loading { background: #0F6E56; }
        .fd-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: fd-spin 0.7s linear infinite;
        }
        @keyframes fd-spin { to { transform: rotate(360deg); } }

        /* ── Error ── */
        .fd-error {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #991b1b;
          background: #fef2f2;
          border: 0.5px solid #fecaca;
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 0.5rem;
        }

        /* ── Empty ── */
        .fd-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 1.25rem 0 0.5rem;
          color: #9ca3af;
        }
        .fd-empty p { font-size: 13px; text-align: center; }

        /* ── Weather result ── */
        .fd-weather {
          background: #f0fdf9;
          border: 0.5px solid #a7f3d0;
          border-radius: 12px;
          padding: 1rem 1.125rem;
          animation: fd-fadein 0.2s ease;
        }
        @keyframes fd-fadein { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .fd-weather__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.875rem;
        }
        .fd-weather__city { font-size: 18px; font-weight: 600; color: #064e3b; }
        .fd-weather__desc { font-size: 13px; color: #059669; margin-top: 3px; text-transform: capitalize; }
        .fd-weather__temp { font-size: 40px; font-weight: 700; color: #064e3b; line-height: 1; }
        .fd-weather__temp span { font-size: 18px; font-weight: 400; color: #059669; }
        .fd-weather__pills { display: flex; flex-wrap: wrap; gap: 6px; }
        .fd-pill {
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

        /* ── Crop advice card ── */
        .fd-advice {
          border-radius: 14px;
          padding: 1.125rem 1.25rem;
        }
        .fd-advice__header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 0.75rem;
        }
        .fd-advice__icon { font-size: 26px; flex-shrink: 0; line-height: 1; }
        .fd-advice__tag { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
        .fd-advice__body { font-size: 13px; line-height: 1.65; margin-bottom: 0.875rem; }
        .fd-advice__crops { display: flex; flex-direction: column; gap: 6px; }
        .fd-crops-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
        .fd-crops-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
        .fd-crop-tag {
          font-size: 12px;
          font-weight: 500;
          border: 0.5px solid;
          border-radius: 20px;
          padding: 4px 12px;
        }

        /* ── Map ── */
        .map-wrapper { }
        .map-svg {
          display: block;
          width: 100%;
          max-height: 260px;
          background: #f0fdf9;
          border-radius: 12px;
          border: 0.5px solid #a7f3d0;
          margin-bottom: 0.875rem;
        }
        .map-legend { display: flex; flex-direction: column; gap: 6px; }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #4b5563; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .legend-dot--severe { background: #E24B4A; }
        .legend-dot--moderate { background: #EF9F27; }
        .legend-dot--low { background: #639922; }

        /* ── Stat row ── */
        .fd-stat-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .fd-stat {
          background: #fff;
          border-radius: 14px;
          border: 0.5px solid rgba(0,0,0,0.08);
          padding: 1rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .fd-stat__val { font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
        .fd-stat__label { font-size: 11px; color: #6b7280; font-weight: 500; }

        /* ── Footer ── */
        .fd-footer {
          font-size: 11px;
          color: #9ca3af;
          text-align: center;
          padding: 1rem 1.25rem 0.75rem;
          border-top: 0.5px solid rgba(0,0,0,0.06);
          margin-top: 0.25rem;
        }
        @media (min-width: 768px) {
          .fd-footer { max-width: 900px; margin: 0 auto; width: 100%; padding-bottom: 1.25rem; }
        }

        /* ── Bottom nav (mobile only) ── */
        .bottom-nav {
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
          z-index: 200;
          /* safe area for iPhone home indicator */
          padding-bottom: env(safe-area-inset-bottom);
        }
        @media (min-width: 768px) {
          .bottom-nav { display: none; }
        }
        .bnav-item {
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
        .bnav-item:hover { color: #1D9E75; }
        .bnav-item--active {
          color: #1D9E75;
          background: #f0fdf9;
        }

        /* ── Accessibility ── */
        @media (prefers-reduced-motion: reduce) {
          .fd-spinner { animation: none; }
          .fd-weather { animation: none; }
        }
        .fd-input:focus-visible { outline: 2px solid #1D9E75; outline-offset: 2px; }
        .fd-btn:focus-visible, .bnav-item:focus-visible {
          outline: 2px solid #1D9E75;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}