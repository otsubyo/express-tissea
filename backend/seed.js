// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Stop from './models/Stop.js';
import Line from './models/Line.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Category.deleteMany();
    await Stop.deleteMany();
    await Line.deleteMany();

    const categories = await Category.insertMany([
      { name: 'bus' },
      { name: 'metro' },
      { name: 'tram' },
    ]);

    const stops = await Stop.insertMany([
      { name: 'Stop A', lat: 43.6, lng: 1.44 },
      { name: 'Stop B', lat: 43.61, lng: 1.45 },
      { name: 'Stop C', lat: 43.62, lng: 1.46 },
    ]);

    await Line.create({
      name: 'Ligne 1',
      categoryId: categories[1]._id, // metro
      startTime: '06:00',
      endTime: '22:00',
      stops: [
        { stopId: stops[0]._id, order: 1 },
        { stopId: stops[1]._id, order: 2 },
        { stopId: stops[2]._id, order: 3 },
      ],
    });

    console.log('Seed complete');
    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
