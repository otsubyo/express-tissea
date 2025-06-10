const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./app/config/db');

const authRoutes = require('./app/routes/auth');
const categoryRoutes = require('./app/routes/categories');
const lineRoutes = require('./app/routes/lines');
const statsRoutes = require('./app/routes/stats');
const authMiddleware = require('./app/middlewares/authMiddleware');

dotenv.config();

const app = express();

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/api/users', authRoutes); // signup & login
app.use('/api/categories', authMiddleware, categoryRoutes);
app.use('/api/lines', lineRoutes); // auth inclus dans les routes
app.use('/api/stats', statsRoutes); // auth inclus dans les routes

// Connexion à la DB + lancement du serveur si on n'est pas en test
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to connect to DB:', err);
  });
}

module.exports = app;
