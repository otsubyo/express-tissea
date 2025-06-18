// src/pages/MapView.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [lines, setLines] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:4000/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(async categories => {
        const allLines = [];
        for (const cat of categories) {
          const res = await fetch(`http://localhost:4000/api/categories/${cat._id}/lines`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const linesOfCat = await res.json();
          for (const line of linesOfCat) {
            const resStops = await fetch(`http://localhost:4000/api/lines/${line._id}/stops`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const stops = await resStops.json();
            allLines.push({ name: line.name, stops });
          }
        }
        setLines(allLines);
      });
  }, [token]);

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[43.6, 1.44]} zoom={12} scrollWheelZoom>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {lines.map((line, idx) => (
          <>
            <Polyline
              key={`line-${idx}`}
              positions={line.stops.map(s => [s.lat, s.lng])}
              color="blue"
            />
            {line.stops.map((s, i) => (
              <Marker key={`stop-${idx}-${i}`} position={[s.lat, s.lng]}>
                <Popup>{line.name} — {s.name}</Popup>
              </Marker>
            ))}
          </>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
