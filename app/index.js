// app/index.js
const protectedRoutes = require("./routes/protected");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");


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
  res.send("API Tisséa - Express backend is running");
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.use("/api/users", authRoutes);
    app.use("/api/protected", protectedRoutes);
    app.use("/api/categories", categoryRoutes);
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Serveur lancé sur http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => console.error("Erreur MongoDB :", err));
