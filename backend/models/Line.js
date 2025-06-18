// models/Line.js
import mongoose from 'mongoose';

const lineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  stops: [
    {
      stopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop',
      },
      order: Number,
    },
  ],
});

export default mongoose.model('Line', lineSchema);