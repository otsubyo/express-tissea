const Category = require('../models/category');
const Line = require('../models/line');

exports.getLines = async (req, res) => {
  try {
    const lines = await Line.find({ category: req.params.id });
    res.json(lines);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
