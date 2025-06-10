const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /api/categories/ - Get all categories
router.get('/', categoryController.getAllCategories);

// POST /api/categories/ - Create new category
router.post('/', categoryController.createCategory);

// GET /api/categories/:id - Get single category
router.get('/:id', categoryController.getCategoryById);

// PUT /api/categories/:id - Update category
router.put('/:id', categoryController.updateCategory);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', categoryController.deleteCategory);

// GET /api/categories/:id/lines - Get lines for category
router.get('/:id/lines', categoryController.getLines);

module.exports = router;