import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "10vh", color: "white" }}>
    <h1>404 - Page introuvable</h1>
    <Link to="/" style={{ color: "#1e90ff" }}>Retour à l'accueil</Link>
  </div>
);

export default NotFound;

