// app/index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API TissÉa - Express backend is running");
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => console.error("Erreur MongoDB :", err));
