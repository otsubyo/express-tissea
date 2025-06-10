// index.js
const express = require('express');
const connectDB = require('./app/config/db');
const authRoutes = require('./app/routes/auth');
const categoryRoutes = require('./app/routes/categories');
const protectedRoutes = require('./app/routes/protected');
const authMiddleware = require('./app/middlewares/authMiddleware');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes publiques
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

// Routes protégées (JWT)
app.use('/api', authMiddleware, protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
