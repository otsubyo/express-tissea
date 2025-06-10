const mongoose = require("mongoose");

const lineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: String, // format YYYY-MM-DD
    required: true
  },
  startTime: {
    type: String, // format HH:MM
    required: true
  },
  endTime: {
    type: String, // format HH:MM
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  stops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stop"
    }
  ]
});

module.exports = mongoose.model("Line", lineSchema);
