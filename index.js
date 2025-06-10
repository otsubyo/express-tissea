const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./app/config/db');

const authRoutes = require('./app/routes/auth');
const categoryRoutes = require('./app/routes/categories');
const lineRoutes = require('./app/routes/lines');
const statsRoutes = require('./app/routes/stats');
const authMiddleware = require('./app/middlewares/authMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', authRoutes); // signup & login
app.use('/api/categories', authMiddleware, categoryRoutes);
app.use('/api/lines', lineRoutes); // line routes have auth inside
app.use('/api/stats', statsRoutes); // stats routes have auth inside

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
