const express = require("express");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json({
    message: "Accès autorisé à la route protégée",
    userId: req.user.id,
  });
});

module.exports = router;
