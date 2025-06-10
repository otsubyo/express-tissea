const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lineController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect all routes
router.use(authMiddleware);

// GET /api/lines/:id - Get line details
router.get('/:id', lineController.getLine);

// GET /api/lines/:id/stops - Get line stops
router.get('/:id/stops', lineController.getLineStops);

// POST /api/lines/:id/stops - Add stop to line
router.post('/:id/stops', lineController.addStopToLine);

// PUT /api/lines/:id - Update line
router.put('/:id', lineController.updateLine);

// DELETE /api/lines/:id/stops/:stopId - Remove stop from line
router.delete('/:id/stops/:stopId', lineController.removeStopFromLine);

module.exports = router;