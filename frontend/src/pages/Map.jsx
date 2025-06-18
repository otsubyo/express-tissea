import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [stops, setStops] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:4000/api/lines/68521fc2738fb3121daabcc6/stops', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!Array.isArray(data)) {
          setError("Les données reçues ne sont pas valides.");
          setStops([]);
          return;
        }

        setStops(data);
      } catch (err) {
        setError("Erreur lors du chargement des arrêts.");
        setStops([]);
      }
    };

    fetchStops();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const lineCoordinates = stops.map(stop => [stop.lat, stop.lng]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h2>Carte des arrêts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <MapContainer center={[43.6, 1.44]} zoom={12} style={{ height: '500px', width: '100%', marginTop: '1rem' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={lineCoordinates} pathOptions={{ color: 'blue' }} />
        {Array.isArray(stops) &&
          stops.map((s, idx) => (
            <Marker key={idx} position={[s.lat, s.lng]}>
              <Popup>{s.name}</Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Boutons en bas */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={handleHome} style={buttonStyle}>Accueil</button>
        <button onClick={handleLogout} style={buttonStyle}>Se déconnecter</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '0.8rem 1.6rem',
  backgroundColor: '#1e90ff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

export default MapView;
