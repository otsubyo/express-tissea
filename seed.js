require('dotenv').config();
const connectDB = require('./app/config/db');
const Category = require('./app/models/category');
const Line = require('./app/models/line');
const Stop = require('./app/models/stop');

async function seed() {
  await connectDB();
  await Promise.all([
    Category.deleteMany(),
    Line.deleteMany(),
    Stop.deleteMany()
  ]);

  const bus = await Category.create({ name: 'Bus' });

  const line = await Line.create({
    name: 'Ligne A',
    category: bus._id,
    startTime: '06:00',
    endTime: '22:00'
  });

  const stop1 = await Stop.create({
    line: line._id,
    name: 'Stop 1',
    order: 1,
    location: { type: 'Point', coordinates: [2.344, 48.856] }
  });
  const stop2 = await Stop.create({
    line: line._id,
    name: 'Stop 2',
    order: 2,
    location: { type: 'Point', coordinates: [2.350, 48.857] }
  });
  line.stops.push(stop1._id, stop2._id);
  await line.save();

  console.log('Seeding complete');
  process.exit();
}

seed();
