const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lineController');
const auth = require('../middlewares/authMiddleware');

router.get('/distance/stops/:id1/:id2', auth, lineController.distanceBetweenStops);
router.get('/distance/lines/:id', auth, lineController.distanceOfLine);

module.exports = router;
