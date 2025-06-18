import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [lines, setLines] = useState([]);
  const [stops, setStops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState(null);

  // Charge l'email depuis le JWT (import dynamique pour éviter tout plantage)
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const jwtModule = await import("jwt-decode");
        const decoded = jwtModule.default(token);
        setUserEmail(decoded.email ?? null);
      } catch (e) {
        console.warn("Impossible de décoder le token:", e);
        setUserEmail(null);
      }
    })();
  }, []);

  // Helper pour fetch et parse JSON
  const fetchJson = async (url, options = {}) => {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      const text = await res.text();
      throw new Error("Réponse non-JSON : " + text);
    }
    return res.json();
  };

  // Charge les catégories (non protégées)
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson("http://localhost:4000/api/categories");
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    })();
  }, []);

  // Récupère les lignes d’une catégorie
  const handleCategoryClick = async (id) => {
    setError("");
    setSelectedCategory(id);
    setSelectedLine(null);
    setStops([]);
    try {
      const data = await fetchJson(
        `http://localhost:4000/api/categories/${id}/lines`
      );
      setLines(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Récupère les arrêts d’une ligne (protégé)
  const handleLineClick = async (id) => {
    setError("");
    setSelectedLine(id);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté pour voir les arrêts.");
      return;
    }
    try {
      const data = await fetchJson(
        `http://localhost:4000/api/lines/${id}/stops`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStops(data);
    } catch (err) {
      console.error(err);
      if (err.message.includes("403")) {
        localStorage.removeItem("token");
        setUserEmail(null);
        setError("Session expirée, veuillez vous reconnecter.");
      } else if (err.message.includes("401")) {
        setError("Non autorisé : veuillez vous connecter.");
      } else {
        setError(err.message);
      }
    }
  };

  // Vérifie si on est connecté
  const isAuthenticated = !!userEmail;

  return (
    <div className="home-container">
      {/* Indicateur utilisateur */}
      <div className="user-info">
        {isAuthenticated ? (
          <span>👤 Connecté : <strong>{userEmail}</strong></span>
        ) : (
          <span>🔒 Non connecté</span>
        )}
      </div>

      <header>
        <img src="/logo-tissea.png" alt="Logo Tisséa" className="logo" />
        <h1>Bienvenue sur Tisséa</h1>
        <p>Le réseau intelligent de transports publics : Bus, Métro et Tramway</p>
      </header>

      <main>
        <div className="button-group">
          <Link to="/signup" className="button">Créer un compte</Link>
          {!isAuthenticated && (
            <Link to="/login" className="button">Se connecter</Link>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <h2>Catégories de transport</h2>
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat._id}
              className="item-button"
              onClick={() => handleCategoryClick(cat._id)}
            >
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </button>
          ))}
        </div>

        {lines.length > 0 && (
          <>
            <h2>Lignes</h2>
            <div className="line-list">
              {lines.map((line) => (
                <button
                  key={line._id}
                  className="item-button"
                  onClick={() => handleLineClick(line._id)}
                >
                  {line.name}
                </button>
              ))}
            </div>
          </>
        )}

        {stops.length > 0 && (
          <>
            <h2>Arrêts</h2>
            <ul className="stop-list">
              {stops.map((stop, idx) => (
                <li key={idx}>
                  {stop.order}. {stop.name} [{stop.lat}, {stop.lng}]
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <footer>
        <p>© 2025 Tisséa. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
