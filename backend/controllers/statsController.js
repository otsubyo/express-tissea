// controllers/statsController.js
import Stop from '../models/Stop.js';
import Line from '../models/Line.js';

const toRad = (value) => (value * Math.PI) / 180;

export const getDistanceBetweenStops = async (req, res) => {
  try {
    const [id1, id2] = [req.params.id1, req.params.id2];
    const [stop1, stop2] = await Promise.all([
      Stop.findById(id1),
      Stop.findById(id2)
    ]);

    if (!stop1 || !stop2) {
      return res.status(404).json({ message: 'One or both stops not found' });
    }

    const R = 6371;
    const dLat = toRad(stop2.lat - stop1.lat);
    const dLon = toRad(stop2.lng - stop1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(stop1.lat)) * Math.cos(toRad(stop2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    res.json({ distance: distance.toFixed(3) + ' km' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLineTotalDistance = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id).lean();
    if (!line) return res.status(404).json({ message: 'Line not found' });

    const orderedStops = line.stops.sort((a, b) => a.order - b.order);
    let total = 0;

    for (let i = 0; i < orderedStops.length - 1; i++) {
      const s1 = await Stop.findById(orderedStops[i].stopId);
      const s2 = await Stop.findById(orderedStops[i + 1].stopId);

      if (!s1 || !s2) continue;

      const dLat = toRad(s2.lat - s1.lat);
      const dLon = toRad(s2.lng - s1.lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(s1.lat)) * Math.cos(toRad(s2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      total += 6371 * c;
    }

    res.json({ distance: total.toFixed(3) + ' km' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};