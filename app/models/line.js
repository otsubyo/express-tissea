const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stop" }],
  startTime: { type: String },
  endTime: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Line', lineSchema);
