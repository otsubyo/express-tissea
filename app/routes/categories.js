const express = require("express");
const Category = require("../models/category");
const Line = require("../models/line");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// GET /api/categories/:id/lines
router.get("/:id/lines", auth, async (req, res) => {
  try {
    const lines = await Line.find({ category: req.params.id }).populate("stops");
    res.json(lines);
  } catch (err) {
    console.error("Erreur GET /categories/:id/lines :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/categories
router.post("/", auth, async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).json(category);
  } catch (err) {
    console.error("Erreur création catégorie :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/lines
router.post("/create-test", auth, async (req, res) => {
  try {
    const stop1 = await Stop.create({ name: "Jean Jaurès", latitude: 43.6073, longitude: 1.4486 });
    const stop2 = await Stop.create({ name: "Paul Sabatier", latitude: 43.5605, longitude: 1.4663 });

    const line = await Line.create({
      name: "Ligne B",
      createdAt: "2025-06-10",
      startTime: "05:15",
      endTime: "00:30",
      category: req.body.categoryId,
      stops: [stop1._id, stop2._id]
    });

    res.status(201).json(line);
  } catch (err) {
    console.error("Erreur création ligne :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


module.exports = router;
