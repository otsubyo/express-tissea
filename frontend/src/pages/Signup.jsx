import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.message || "Inscription échouée");
      }

      setSuccess(true); // inscription réussie
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      {!success ? (
        <>
          <h1>Créer un compte Tisséa</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit">S'inscrire</button>
            {error && <p className="error">{error}</p>}
          </form>
        </>
      ) : (
        <>
          <h1>Inscription réussie !</h1>
          <p>Votre compte a bien été créé.</p>
          <div className="button-group">
            <Link to="/" className="button">Retour à l'accueil</Link>
            <Link to="/login" className="button">Se connecter</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
