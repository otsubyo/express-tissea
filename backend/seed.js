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
      { name: 'bus' },       // 0
      { name: 'metro' },     // 1
      { name: 'tram' }       // 2
    ]);

    const stops = await Stop.insertMany([
      { name: 'Stop A', lat: 43.6, lng: 1.44 },   // 0
      { name: 'Stop B', lat: 43.61, lng: 1.45 },  // 1
      { name: 'Stop C', lat: 43.62, lng: 1.46 },  // 2
      { name: 'Stop D', lat: 43.63, lng: 1.47 },  // 3
      { name: 'Stop E', lat: 43.64, lng: 1.48 }   // 4
    ]);

    await Line.insertMany([
      {
        name: 'Metro Ligne A',
        categoryId: categories[1]._id,
        startTime: '06:00',
        endTime: '22:00',
        stops: [
          { stopId: stops[0]._id, order: 1 },
          { stopId: stops[1]._id, order: 2 },
          { stopId: stops[2]._id, order: 3 },
          { stopId: stops[3]._id, order: 4 }
        ]
      },
      {
        name: 'Bus Ligne 17',
        categoryId: categories[0]._id,
        startTime: '05:30',
        endTime: '20:30',
        stops: [
          { stopId: stops[1]._id, order: 1 },
          { stopId: stops[3]._id, order: 2 },
          { stopId: stops[4]._id, order: 3 }
        ]
      },
      {
        name: 'Tram Ligne T2',
        categoryId: categories[2]._id,
        startTime: '07:00',
        endTime: '23:00',
        stops: [
          { stopId: stops[0]._id, order: 1 },
          { stopId: stops[2]._id, order: 2 },
          { stopId: stops[4]._id, order: 3 }
        ]
      }
    ]);

    console.log('✅ Seed complete');
    process.exit();
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
