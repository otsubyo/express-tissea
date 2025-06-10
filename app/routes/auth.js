const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/users/signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, hashedPassword });
    await user.save();

    res.status(201).json({ email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("🔍 utilisateur trouvé :", user);

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides (user inconnu)" });
    }

    const valid = await bcrypt.compare(password, user.hashedPassword);
    console.log("🔐 mot de passe valide ?", valid);

    if (!valid) {
      return res.status(401).json({ error: "Identifiants invalides (mauvais mot de passe)" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });

  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


module.exports = router;
