import Line from '../models/Line.js';

export const getLinesByCategory = async (req, res) => {
  try {
    const lines = await Line.find({ categoryId: req.params.id });
    res.json(lines);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
