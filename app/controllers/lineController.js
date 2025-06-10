const Line = require('../models/line');
const Stop = require('../models/stop');

exports.getLine = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id).populate('category');
    if (!line) return res.status(404).json({ message: 'Line not found' });
    const stops = await Stop.find({ line: line._id }).sort('order');
    res.json({
      id: line._id,
      name: line.name,
      category: line.category,
      createdAt: line.createdAt,
      startTime: line.startTime,
      endTime: line.endTime,
      stops: stops.map(s => s.name)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStops = async (req, res) => {
  try {
    const stops = await Stop.find({ line: req.params.id }).sort('order');
    res.json(stops);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

function haversine(coord1, coord2) {
  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(coord2[1] - coord1[1]);
  const dLon = toRad(coord2[0] - coord1[0]);
  const lat1 = toRad(coord1[1]);
  const lat2 = toRad(coord2[1]);

  const a = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.distanceBetweenStops = async (req, res) => {
  try {
    const stop1 = await Stop.findById(req.params.id1);
    const stop2 = await Stop.findById(req.params.id2);
    if (!stop1 || !stop2) return res.status(404).json({ message: 'Stop not found' });
    const distance = haversine(stop1.location.coordinates, stop2.location.coordinates);
    res.json({ distance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.distanceOfLine = async (req, res) => {
  try {
    const stops = await Stop.find({ line: req.params.id }).sort('order');
    let distance = 0;
    for (let i = 1; i < stops.length; i++) {
      distance += haversine(stops[i - 1].location.coordinates, stops[i].location.coordinates);
    }
    res.json({ distance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addStop = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id);
    if (!line) return res.status(404).json({ message: 'Line not found' });
    const { name, order, coordinates } = req.body;
    const existing = await Stop.findOne({ line: line._id, order });
    if (existing) return res.status(400).json({ message: 'Order already used' });
    const stop = await Stop.create({ line: line._id, name, order, location: { type: 'Point', coordinates } });
    res.status(201).json(stop);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLine = async (req, res) => {
  try {
    const line = await Line.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!line) return res.status(404).json({ message: 'Line not found' });
    res.json(line);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStop = async (req, res) => {
  try {
    const stop = await Stop.findOneAndDelete({ _id: req.params.stopId, line: req.params.id });
    if (!stop) return res.status(404).json({ message: 'Stop not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
