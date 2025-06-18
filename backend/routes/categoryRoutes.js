import express from 'express';
import { getLinesByCategory } from '../controllers/categoryController.js';

const router = express.Router();
router.get('/:id/lines', getLinesByCategory);
export default router;
