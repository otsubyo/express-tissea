const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  startTime: { type: String, required: true }, // Format "HH:MM"
  endTime: { type: String, required: true },  // Format "HH:MM"
  createdAt: { type: Date, default: Date.now },
  stops: [{ 
    stop: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
    order: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Line', lineSchema);