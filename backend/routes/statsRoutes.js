// routes/statsRoutes.js
import express from 'express';
import { getDistanceBetweenStops, getLineTotalDistance } from '../controllers/statsController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/distance/stops/:id1/:id2', authenticateJWT, getDistanceBetweenStops);
router.get('/distance/lines/:id', authenticateJWT, getLineTotalDistance);


export default router;


