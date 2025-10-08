import React from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const droughtAreas = [
  {
    name: "Turkana County",
    coords: [
      [3.2, 35.5],
      [3.5, 36.0],
      [2.8, 36.2],
      [2.5, 35.7],
    ],
    advice: "Encourage drought-resistant crops like sorghum and millet.",
  },
  {
    name: "Garissa County",
    coords: [
      [0.4, 39.0],
      [0.8, 39.4],
      [0.2, 39.6],
      [-0.1, 39.1],
    ],
    advice: "Promote water harvesting and rotational grazing.",
  },
  {
    name: "Mandera County",
    coords: [
      [3.9, 40.7],
      [4.2, 41.0],
      [3.8, 41.2],
      [3.5, 40.9],
    ],
    advice: "Adopt early warning systems and diversify livelihoods.",
  },
];

function KenyaMap() {
  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/20 shadow-xl">
      <MapContainer
        center={[0.5, 37.9]} // center of Kenya
        zoom={6}
        style={{ width: "100%", height: "100%" }}
        className="rounded-3xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {droughtAreas.map((area, index) => (
          <Polygon
            key={index}
            positions={area.coords}
            pathOptions={{
              color: "red",
              fillColor: "orange",
              fillOpacity: 0.5,
              weight: 2,
            }}
          >
            <Tooltip direction="top">
              <div className="text-sm">
                <strong>{area.name}</strong>
                <br />
                🌾 {area.advice}
              </div>
            </Tooltip>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}

export default KenyaMap;
