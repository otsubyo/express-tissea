import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/api/lines/LINE_ID/stops', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setStops(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Carte des arrêts</h2>
      <MapContainer center={[43.6, 1.44]} zoom={12} style={{ height: '500px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stops.map((s, idx) => (
          <Marker key={idx} position={[s.lat, s.lng]}>
            <Popup>{s.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
