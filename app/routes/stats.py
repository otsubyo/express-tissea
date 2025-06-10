from fastapi import APIRouter, HTTPException
from odmantic import ObjectId
from app.models.stop import Stop
from app.models.line import Line
from app.database import engine
from app.utils.distance import haversine

router = APIRouter()

@router.get("/distance/stops/{id1}/{id2}")
async def get_distance_between_stops(id1: str, id2: str):
    stop1 = await engine.find_one(Stop, Stop.id == ObjectId(id1))
    stop2 = await engine.find_one(Stop, Stop.id == ObjectId(id2))
    if not stop1 or not stop2:
        raise HTTPException(status_code=404, detail="Stop not found")
    distance = haversine(stop1.latitude, stop1.longitude, stop2.latitude, stop2.longitude)
    return {"distance_km": round(distance, 2)}

@router.get("/distance/lines/{id}")
async def get_distance_of_line(id: str):
    line = await engine.find_one(Line, Line.id == ObjectId(id))
    if not line or len(line.stops) < 2:
        raise HTTPException(status_code=400, detail="Line invalid or not enough stops")
    total = 0.0
    for i in range(len(line.stops) - 1):
        a, b = line.stops[i], line.stops[i + 1]
        total += haversine(a.latitude, a.longitude, b.latitude, b.longitude)
    return {"distance_km": round(total, 2)}
