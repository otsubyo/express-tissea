// routes/lineRoutes.js
import express from 'express';
import { getLineDetails, getLineStopsDetails, addStopToLine, updateLine, deleteStopFromLine } from '../controllers/lineController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getAllLines } from '../controllers/lineController.js';

const router = express.Router();

router.get('/:id', authenticateJWT, getLineDetails);
router.get('/:id/stops', authenticateJWT, getLineStopsDetails);
router.post('/:id/stops', authenticateJWT, addStopToLine);
router.put('/:id', authenticateJWT, updateLine);
router.delete('/:lineId/stops/:stopId', authenticateJWT, deleteStopFromLine);
router.get('/', authenticateJWT, getAllLines);

export default router;
