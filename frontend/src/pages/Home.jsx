import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <img src="logo-tissea.png" alt="Logo Tisséa" className="logo" />
        <h1>Bienvenue sur Tisséa</h1>
        <p>Le réseau intelligent de transports publics — Bus, Métro et Tramway</p>
      </header>

      <main>
        <div className="button-group">
          <Link to="/signup" className="button">Créer un compte</Link>
          <Link to="/login" className="button">Se connecter</Link>
        </div>
      </main>

      <footer>
        <p>© 2025 Tisséa. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
