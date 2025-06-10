const Category = require('../models/category');
const Line = require('../models/line');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Get single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        message: 'Category not found' 
      });
    }
    
    res.json(category);
  } catch (err) {
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Get all lines for a specific category (your existing method)
exports.getLines = async (req, res) => {
  try {
    const lines = await Line.find({ category: req.params.id });
    
    if (!lines || lines.length === 0) {
      return res.status(404).json({ 
        message: 'No lines found for this category' 
      });
    }
    
    res.json(lines);
  } catch (err) {
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error creating category',
      error: err.message 
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedCategory) {
      return res.status(404).json({ 
        message: 'Category not found' 
      });
    }
    
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error updating category',
      error: err.message 
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    
    if (!deletedCategory) {
      return res.status(404).json({ 
        message: 'Category not found' 
      });
    }
    
    res.json({ 
      message: 'Category deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error deleting category',
      error: err.message 
    });
  }
};