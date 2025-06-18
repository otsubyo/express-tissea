import express from 'express';
import { getLineDetails } from '../controllers/lineController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getLineStopsDetails } from '../controllers/lineController.js';

const router = express.Router();

router.get('/:id', authenticateJWT, getLineDetails);
router.get('/:id/stops', authenticateJWT, getLineStopsDetails);

export default router;

