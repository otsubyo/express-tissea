const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/:id/lines', categoryController.getLines);

module.exports = router;
