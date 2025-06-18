// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import lineRoutes from './routes/lineRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/lines', lineRoutes);
app.use('/api/stats', statsRoutes);

export default app;
