const mongoose = require('mongoose');

module.exports = async function connectDB() {
  try {
    // Deprecated options like `useNewUrlParser` and `useUnifiedTopology` are no
    // longer required with Mongoose 6+. The driver uses them by default, so we
    // simply pass the connection string.
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
