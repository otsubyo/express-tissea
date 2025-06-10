from fastapi import APIRouter, HTTPException, Depends
from odmantic import ObjectId
from app.models.line import Line
from app.models.stop import Stop
from app.models.category import Category
from app.schemas.line import LineCreate, LineUpdate
from app.database import engine

router = APIRouter()

@router.get("/{id}")
async def get_line_details(id: str):
    line = await engine.find_one(Line, Line.id == ObjectId(id))
    if not line:
        raise HTTPException(status_code=404, detail="Line not found")
    return line

@router.get("/{id}/stops")
async def get_line_stops(id: str):
    line = await engine.find_one(Line, Line.id == ObjectId(id))
    if not line:
        raise HTTPException(status_code=404, detail="Line not found")
    return line.stops

@router.post("/{id}/stops")
async def add_stop_to_line(id: str, stop: Stop):
    line = await engine.find_one(Line, Line.id == ObjectId(id))
    if not line:
        raise HTTPException(status_code=404, detail="Line not found")
    if len(line.stops) >= 2 and line.stops[0] == line.stops[-1]:
        raise HTTPException(status_code=400, detail="Line already has two terminuses")
    await engine.save(stop)
    line.stops.append(stop)
    await engine.save(line)
    return {"detail": "Stop added"}

@router.put("/{id}")
async def update_line(id: str, update: LineUpdate):
    line = await engine.find_one(Line, Line.id == ObjectId(id))
    if not line:
        raise HTTPException(status_code=404, detail="Line not found")
    line.name = update.name
    line.start_time = update.start_time
    line.end_time = update.end_time
    await engine.save(line)
    return {"detail": "Line updated"}

@router.delete("/{line_id}/stops/{stop_id}")
async def delete_stop_from_line(line_id: str, stop_id: str):
    line = await engine.find_one(Line, Line.id == ObjectId(line_id))
    stop = await engine.find_one(Stop, Stop.id == ObjectId(stop_id))
    if not line or not stop:
        raise HTTPException(status_code=404, detail="Line or stop not found")
    if stop in line.stops:
        line.stops.remove(stop)
        await engine.save(line)
        return {"detail": "Stop removed"}
    raise HTTPException(status_code=400, detail="Stop not in line")
