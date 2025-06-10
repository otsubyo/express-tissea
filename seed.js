require('dotenv').config();
const db = require('./app/config/db');
const Category = require('./app/models/category');
const Line     = require('./app/models/line');
const Stop     = require('./app/models/stop');

async function seed() {
  await db();
  await Promise.all([ Category.deleteMany(), Line.deleteMany(), Stop.deleteMany() ]);

  const busCat = await Category.create({ name: 'Bus' });
  const tramCat = await Category.create({ name: 'Tram' });

  // Exemple de ligne
  const stop1 = await Stop.create({ name: 'A', order: 1, location: { type: 'Point', coordinates: [2.344, 48.856] } });
  const stop2 = await Stop.create({ name: 'B', order: 2, location: { type: 'Point', coordinates: [2.350, 48.857] } });
  const line = await Line.create({
    name: 'Ligne Test',
    category: busCat._id,
    stops: [stop1._id, stop2._id],
    startTime: '06:00',
    endTime:   '22:00'
  });

  console.log('Seed terminé');
  process.exit();
}

seed();
