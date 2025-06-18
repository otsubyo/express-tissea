import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [lines, setLines] = useState([]);
  const [stops, setStops] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError("Vous devez être connecté.");
      navigate('/', { replace: true });
      return;
    }

    // Récupère toutes les lignes
    const fetchLines = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/lines', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Données lignes invalides.");
        setLines(data);
      } catch (err) {
        setError("Erreur lors du chargement des lignes.");
        console.error(err);
      }
    };

    fetchLines();
  }, [navigate, token]);

  const fetchStopsForLine = async (lineId) => {
    setStops([]);
    setError("");
    try {
      const res = await fetch(`http://localhost:4000/api/lines/${lineId}/stops`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Données arrêts invalides.");
      setStops(data);
    } catch (err) {
      setStops([]);
      setError("Erreur lors du chargement des arrêts.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  const handleHome = () => {
    navigate('/');
  };

  const lineCoordinates = stops.map(stop => [stop.lat, stop.lng]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h2>Carte interactive</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Liste des lignes */}
      <div style={{ marginBottom: '1rem' }}>
        <h3>Choisissez une ligne :</h3>
        {lines.map(line => (
          <button
            key={line._id}
            onClick={() => fetchStopsForLine(line._id)}
            style={buttonStyle}
          >
            {line.name}
          </button>
        ))}
      </div>

      <MapContainer center={[43.6, 1.44]} zoom={12} style={{ height: '500px', width: '100%', marginTop: '1rem' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={lineCoordinates} pathOptions={{ color: 'blue' }} />
        {stops.map((s, idx) => (
          <Marker key={idx} position={[s.lat, s.lng]}>
            <Popup>
              <div>
                {s.name}<br/>
                Ordre : {s.order}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={handleHome} style={buttonStyle}>Accueil</button>
        <button onClick={handleLogout} style={buttonStyle}>Se déconnecter</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: '0.25rem',
  padding: '0.6rem 1.2rem',
  backgroundColor: '#1e90ff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.9rem',
  cursor: 'pointer'
};

export default MapView;
