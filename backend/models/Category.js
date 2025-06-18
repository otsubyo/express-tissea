// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['bus', 'metro', 'tram'],
  },
});

export default mongoose.model('Category', categorySchema);
