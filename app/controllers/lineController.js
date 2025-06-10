const Line = require('../models/line');
const Stop = require('../models/stop');
const Category = require('../models/category');
const { calculateDistance } = require('../utils/geoUtils');

// Get line details
exports.getLine = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id)
      .populate('category', 'name icon')
      .populate('stops.stop', 'name');
    
    if (!line) {
      return res.status(404).json({ message: 'Line not found' });
    }
    
    res.json({
      id: line._id,
      name: line.name,
      category: line.category,
      startTime: line.startTime,
      endTime: line.endTime,
      createdAt: line.createdAt,
      stops: line.stops.map(s => ({
        id: s.stop._id,
        name: s.stop.name,
        order: s.order
      }))
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get line stops with coordinates
exports.getLineStops = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id)
      .populate('stops.stop', 'name location');
    
    if (!line) {
      return res.status(404).json({ message: 'Line not found' });
    }
    
    const stops = line.stops.map(s => ({
      id: s.stop._id,
      name: s.stop.name,
      longitude: s.stop.location.coordinates[0],
      latitude: s.stop.location.coordinates[1],
      order: s.order
    }));
    
    res.json(stops);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add stop to line
exports.addStopToLine = async (req, res) => {
  try {
    const { stopId, order } = req.body;
    
    // Validate stop exists
    const stop = await Stop.findById(stopId);
    if (!stop) {
      return res.status(404).json({ message: 'Stop not found' });
    }
    
    // Get line and update
    const line = await Line.findById(req.params.id);
    if (!line) {
      return res.status(404).json({ message: 'Line not found' });
    }
    
    // Check if order is valid
    if (order < 1 || order > line.stops.length + 1) {
      return res.status(400).json({ message: 'Invalid stop order' });
    }
    
    // Update other stops' orders if needed
    line.stops.forEach(s => {
      if (s.order >= order) s.order += 1;
    });
    
    line.stops.push({ stop: stopId, order });
    await line.save();
    
    res.status(201).json({ message: 'Stop added to line successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Calculate line distance
exports.calculateLineDistance = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id).populate('stops.stop', 'location');
    
    if (!line || line.stops.length < 2) {
      return res.status(400).json({ message: 'Line has insufficient stops' });
    }
    
    let totalDistance = 0;
    for (let i = 0; i < line.stops.length - 1; i++) {
      const stop1 = line.stops[i].stop;
      const stop2 = line.stops[i + 1].stop;
      
      totalDistance += calculateDistance(
        stop1.location.coordinates[1], stop1.location.coordinates[0],
        stop2.location.coordinates[1], stop2.location.coordinates[0]
      );
    }
    
    res.json({ distance: totalDistance, unit: 'km' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};