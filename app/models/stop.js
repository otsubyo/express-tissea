const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  line: { type: mongoose.Schema.Types.ObjectId, ref: 'Line', required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  }
});

stopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Stop', stopSchema);
