// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container">
    <h1>Bienvenue sur TissÉa</h1>
    <p>
      <Link to="/signup">Inscription</Link> | <Link to="/login">Connexion</Link> | <Link to="/map">Carte</Link>
    </p>
  </div>
);

export default Home;