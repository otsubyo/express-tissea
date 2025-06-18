// routes/lineRoutes.js
import express from 'express';
import { getLineDetails, getLineStopsDetails, addStopToLine, updateLine } from '../controllers/lineController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', authenticateJWT, getLineDetails);
router.get('/:id/stops', authenticateJWT, getLineStopsDetails);
router.post('/:id/stops', authenticateJWT, addStopToLine);
router.put('/:id', authenticateJWT, updateLine);

export default router;
