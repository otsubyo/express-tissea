import Line from '../models/Line.js';
import Stop from '../models/Stop.js';

export const getLineDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const line = await Line.findById(id).lean();
    if (!line) return res.status(404).json({ message: 'Line not found' });

    // Récupération des noms des arrêts dans l’ordre
    const orderedStops = await Promise.all(
      line.stops
        .sort((a, b) => a.order - b.order)
        .map(async ({ stopId }) => {
          const stop = await Stop.findById(stopId);
          return stop?.name || '[unknown stop]';
        })
    );

    res.json({
      createdAt: line.createdAt,
      startTime: line.startTime,
      endTime: line.endTime,
      stopNames: orderedStops
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLineStopsDetails = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id).lean();
    if (!line) return res.status(404).json({ message: 'Line not found' });

    const detailedStops = await Promise.all(
      line.stops
        .sort((a, b) => a.order - b.order)
        .map(async ({ stopId, order }) => {
          const stop = await Stop.findById(stopId).lean();
          if (!stop) return null;
          return {
            name: stop.name,
            lat: stop.lat,
            lng: stop.lng,
            order
          };
        })
    );

    res.json(detailedStops.filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};