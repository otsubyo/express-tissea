// routes/categoryRoutes.js
import express from 'express';
import { getAllCategories, getLinesByCategory } from '../controllers/categoryController.js';

const router = express.Router();

// GET /api/categories
router.get('/', getAllCategories);

// GET /api/categories/:id/lines
router.get('/:id/lines', getLinesByCategory);

export default router;
