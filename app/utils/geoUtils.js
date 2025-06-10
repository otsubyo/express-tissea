const haversine = require('haversine-distance');

function calculateDistance(lat1, lon1, lat2, lon2) {
  const point1 = { latitude: lat1, longitude: lon1 };
  const point2 = { latitude: lat2, longitude: lon2 };
  
  // Distance in meters, convert to km
  return haversine(point1, point2) / 1000;
}

function distanceBetweenStops(stop1, stop2) {
  return calculateDistance(
    stop1.location.coordinates[1], stop1.location.coordinates[0],
    stop2.location.coordinates[1], stop2.location.coordinates[0]
  );
}

module.exports = {
  calculateDistance,
  distanceBetweenStops
};