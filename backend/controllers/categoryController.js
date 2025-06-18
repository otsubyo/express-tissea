// controllers/categoryController.js
import Category from '../models/Category.js';
import Line from '../models/Line.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (err) {
    console.error("getAllCategories error:", err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getLinesByCategory = async (req, res) => {
  try {
    const lines = await Line.find({ categoryId: req.params.id });
    res.json(lines);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
