const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lineController');
const auth = require('../middlewares/authMiddleware');

router.get('/:id', auth, lineController.getLine);
router.get('/:id/stops', auth, lineController.getStops);
router.post('/:id/stops', auth, lineController.addStop);
router.put('/:id', auth, lineController.updateLine);
router.delete('/:id/stops/:stopId', auth, lineController.deleteStop);

module.exports = router;
