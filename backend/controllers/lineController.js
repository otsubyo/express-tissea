// controllers/lineController.js
import Line from '../models/Line.js';
import Stop from '../models/Stop.js';

export const getLineDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const line = await Line.findById(id).lean();
    if (!line) return res.status(404).json({ message: 'Line not found' });

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

export const addStopToLine = async (req, res) => {
  try {
    const { name, lat, lng, order } = req.body;
    const line = await Line.findById(req.params.id).populate('stops.stopId');

    if (!line) return res.status(404).json({ message: 'Line not found' });

    // Vérifie s’il existe déjà un arrêt avec mêmes coordonnées
    const stopExists = line.stops.some(s =>
      s.stopId.lat === lat &&
      s.stopId.lng === lng
    );

    if (stopExists) {
      return res.status(400).json({ message: 'Stop already exists on this line' });
    }

    const newStop = new Stop({ name, lat, lng });
    await newStop.save();

    // Calcul de l’ordre d’insertion
    const insertOrder = order && Number.isInteger(order) && order > 0 ? order : line.stops.length + 1;

    // Décale tous les arrêts >= à l’ordre souhaité
    line.stops = line.stops.map(s => {
      if (s.order >= insertOrder) {
        return { ...s.toObject(), order: s.order + 1 };
      }
      return s.toObject();
    });

    // Ajoute le nouvel arrêt à la bonne position
    line.stops.push({ stopId: newStop._id, order: insertOrder });

    // Re-tri pour conserver l’ordre croissant
    line.stops.sort((a, b) => a.order - b.order);

    await line.save();

    res.status(201).json({ message: 'Stop added to line', stop: newStop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLine = async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;
    const line = await Line.findById(req.params.id);

    if (!line) {
      return res.status(404).json({ message: 'Line not found' });
    }

    const noChanges =
      line.name === name &&
      line.startTime === startTime &&
      line.endTime === endTime;

    if (noChanges) {
      return res.status(400).json({ message: 'No changes detected' });
    }

    line.name = name || line.name;
    line.startTime = startTime || line.startTime;
    line.endTime = endTime || line.endTime;

    await line.save();

    res.json({ message: 'Line updated', line });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStopFromLine = async (req, res) => {
  try {
    const { lineId, stopId } = req.params;
    const line = await Line.findById(lineId);

    if (!line) return res.status(404).json({ message: 'Line not found' });

    const index = line.stops.findIndex(s => s.stopId.toString() === stopId);
    if (index === -1) return res.status(404).json({ message: 'Stop not found in line' });

    // Supprimer l'arrêt
    line.stops.splice(index, 1);

    // Réajuster les ordres
    line.stops = line.stops
      .sort((a, b) => a.order - b.order)
      .map((s, i) => ({ ...s, order: i + 1 }));

    await line.save();

    res.json({ message: 'Stop removed from line' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllLines = async (req, res) => {
  try {
    const lines = await Line.find({}, '_id name');
    res.json(lines);
  } catch (err) {
    console.error('Erreur getAllLines :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};