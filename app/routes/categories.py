from fastapi import APIRouter, HTTPException
from odmantic import ObjectId
from app.models.category import Category
from app.models.line import Line
from app.database import engine

router = APIRouter()

@router.get("/{id}/lines")
async def get_lines_by_category(id: str):
    category = await engine.find_one(Category, Category.id == ObjectId(id))
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    lines = await engine.find(Line, Line.category.id == category.id)
    return lines
